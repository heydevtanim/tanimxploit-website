import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ALL_PERMISSION_KEYS,
  ROLE_DEFINITIONS,
  ROLE_KEYS,
  isPermissionKey,
  permissionsForRoles,
} from "../src/lib/portal/permissions";
import {
  canApproveLeaveFor,
  employeeAccess,
  employeeListScope,
  isAuditedEmployeeRead,
  visibleSections,
  type Actor,
} from "../src/lib/portal/access";
import { burnPasswordCheck, hashPassword, needsRehash, passwordPolicyProblems, verifyPassword } from "../src/lib/portal/password";
import {
  LOCKOUT_MS,
  MAX_FAILED_LOGINS,
  SESSION_ABSOLUTE_MS,
  SESSION_IDLE_MS,
  evaluateSession,
  generateSessionToken,
  hashToken,
  isLocked,
  newSessionTimes,
  nextLockState,
  safePortalRedirect,
} from "../src/lib/portal/session-token";
import { dhakaDateKey, dhakaWorkDate } from "../src/lib/portal/dates";
import { visibleModules, PORTAL_MODULES } from "../src/lib/portal/navigation";
import { PayrollError, calculatePayrollItem, formatBdt, toMinor } from "../src/modules/payroll/calculate";
import {
  assertPayrollEditable,
  assertPayrollTransition,
  assertSeparationOfDuties,
} from "../src/modules/payroll/period";

function actorFor(roles: string[], extra: Partial<Actor> = {}): Actor {
  return {
    userId: "u1",
    organizationId: "o1",
    employeeId: "e1",
    permissions: permissionsForRoles(roles),
    ledTeamIds: [],
    ...extra,
  };
}

describe("RBAC catalog", () => {
  it("every role only references known permissions", () => {
    for (const key of ROLE_KEYS) {
      for (const p of ROLE_DEFINITIONS[key].permissions) assert.ok(isPermissionKey(p), `${key}: ${p}`);
    }
  });

  it("super admin has every permission", () => {
    assert.equal(permissionsForRoles(["SUPER_ADMIN"]).size, ALL_PERMISSION_KEYS.length);
  });

  it("HR and Finance salary visibility is separated", () => {
    const hr = permissionsForRoles(["HR_MANAGER"]);
    const fin = permissionsForRoles(["FINANCE_MANAGER"]);
    assert.equal(hr.has("payroll.view_salary"), false);
    assert.equal(hr.has("payroll.manage"), false);
    assert.equal(fin.has("payroll.view_salary"), true);
    assert.equal(fin.has("employee.view_all"), false);
    assert.equal(fin.has("employee.view_directory"), true);
  });

  it("only the founder can approve, lock and reopen payroll by default", () => {
    for (const key of ROLE_KEYS) {
      const p = permissionsForRoles([key]);
      const founder = key === "SUPER_ADMIN";
      assert.equal(p.has("payroll.approve"), founder, key);
      assert.equal(p.has("payroll.lock"), founder, key);
      assert.equal(p.has("payroll.reopen"), founder, key);
    }
  });

  it("an employee has no company-wide or salary access", () => {
    const p = permissionsForRoles(["EMPLOYEE"]);
    for (const denied of ["employee.view_all", "payroll.view_salary", "dashboard.view_company", "settings.manage"]) {
      assert.equal((p as ReadonlySet<string>).has(denied), false, denied);
    }
  });

  it("multiple roles combine (project manager who is also team leader)", () => {
    const p = permissionsForRoles(["PROJECT_MANAGER", "TEAM_LEADER"]);
    assert.ok(p.has("project.create") && p.has("employee.view_team"));
  });

  it("unknown roles grant nothing", () => {
    assert.equal(permissionsForRoles(["NOPE"]).size, 0);
  });
});

describe("resource-level access", () => {
  const target = { id: "e2", managerId: "e1", teamId: "t1" };
  const stranger = { id: "e9", managerId: "e7", teamId: "t9" };

  it("employee sees only their own record", () => {
    const a = actorFor(["EMPLOYEE"]);
    assert.equal(employeeAccess(a, { id: "e1", managerId: null, teamId: null }), "OWN");
    assert.equal(employeeAccess(a, target), "NONE");
    assert.deepEqual(employeeListScope(a), { kind: "OWN", employeeId: "e1" });
  });

  it("team leader sees direct reports and led teams, not strangers", () => {
    const a = actorFor(["TEAM_LEADER"], { ledTeamIds: ["t5"] });
    assert.equal(employeeAccess(a, target), "TEAM");
    assert.equal(employeeAccess(a, { id: "e3", managerId: null, teamId: "t5" }), "TEAM");
    assert.equal(employeeAccess(a, stranger), "NONE");
  });

  it("HR sees full profiles; finance sees directory only", () => {
    assert.equal(employeeAccess(actorFor(["HR_MANAGER"]), stranger), "FULL");
    assert.equal(employeeAccess(actorFor(["FINANCE_MANAGER"]), stranger), "DIRECTORY");
    assert.equal(visibleSections("DIRECTORY").personal, false);
    assert.equal(visibleSections("DIRECTORY").contact, false);
    assert.equal(visibleSections("TEAM").personal, false);
    assert.equal(visibleSections("FULL").personal, true);
    assert.equal(visibleSections("NONE").directory, false);
  });

  it("reads of other people's personal data are audited, own reads are not", () => {
    const hr = actorFor(["HR_MANAGER"]);
    assert.equal(isAuditedEmployeeRead("FULL", hr, "e9"), true);
    assert.equal(isAuditedEmployeeRead("FULL", hr, "e1"), false);
    assert.equal(isAuditedEmployeeRead("DIRECTORY", hr, "e9"), false);
  });

  it("nobody approves their own leave; team leads only their scope", () => {
    const tl = actorFor(["TEAM_LEADER"]);
    assert.equal(canApproveLeaveFor(tl, { id: "e1", managerId: null, teamId: null }), false);
    assert.equal(canApproveLeaveFor(tl, target), true);
    assert.equal(canApproveLeaveFor(tl, stranger), false);
    assert.equal(canApproveLeaveFor(actorFor(["HR_MANAGER"]), stranger), true);
    assert.equal(canApproveLeaveFor(actorFor(["EMPLOYEE"]), target), false);
  });

  it("a user without an employee profile gets no own-scope list", () => {
    assert.deepEqual(employeeListScope(actorFor(["EMPLOYEE"], { employeeId: null })), { kind: "NONE" });
  });
});

describe("navigation", () => {
  it("employee menu hides finance, reports and settings", () => {
    const keys = visibleModules(permissionsForRoles(["EMPLOYEE"])).map((m) => m.key);
    assert.ok(keys.includes("dashboard") && keys.includes("payroll"));
    for (const hidden of ["reports", "settings"]) assert.equal(keys.includes(hidden), false, hidden);
  });
  it("module keys and hrefs are unique and live under /portal", () => {
    assert.equal(new Set(PORTAL_MODULES.map((m) => m.key)).size, PORTAL_MODULES.length);
    for (const m of PORTAL_MODULES) assert.ok(m.href.startsWith("/portal/"));
  });
});

describe("passwords", () => {
  it("hashes, verifies and rejects wrong passwords", async () => {
    const hash = await hashPassword("correct horse battery staple");
    assert.ok(hash.startsWith("scrypt$"));
    assert.equal(await verifyPassword("correct horse battery staple", hash), true);
    assert.equal(await verifyPassword("wrong password here!", hash), false);
    assert.equal(needsRehash(hash), false);
  });
  it("uses a different salt every time", async () => {
    assert.notEqual(await hashPassword("same-password-123"), await hashPassword("same-password-123"));
  });
  it("rejects malformed or weak stored hashes", async () => {
    assert.equal(await verifyPassword("x", "not-a-hash"), false);
    assert.equal(await verifyPassword("x", "scrypt$2$8$1$YWFhYWFhYWFhYQ$YQ"), false);
    assert.equal(needsRehash("scrypt$1024$8$1$YWFhYWFhYWFhYWFhYWFhYQ$" + Buffer.alloc(64).toString("base64url")), true);
  });
  it("burn check does not throw", async () => {
    await burnPasswordCheck("anything");
  });
  it("policy", () => {
    assert.ok(passwordPolicyProblems("short").length > 0);
    assert.ok(passwordPolicyProblems("aaaaaaaaaaaaaa").length > 0);
    assert.ok(passwordPolicyProblems("tanimxploit123").length > 0);
    assert.ok(passwordPolicyProblems("rahimuddin-2026-x", { email: "rahimuddin@x.com" }).length > 0);
    assert.deepEqual(passwordPolicyProblems("a-long-unusual-passphrase", { email: "me@x.com" }), []);
  });
});

describe("sessions and lockout", () => {
  const t0 = new Date("2026-11-01T00:00:00Z");
  it("tokens are random and only their hash is comparable", () => {
    const a = generateSessionToken();
    const b = generateSessionToken();
    assert.notEqual(a, b);
    assert.ok(a.length >= 43);
    assert.equal(hashToken(a).length, 64);
    assert.notEqual(hashToken(a), a);
  });
  it("expires after idle time and absolute time, and when revoked", () => {
    const { expiresAt, absoluteExpiresAt } = newSessionTimes(t0);
    const base = { expiresAt, absoluteExpiresAt, revokedAt: null, lastUsedAt: t0 };
    assert.equal(evaluateSession(base, new Date(t0.getTime() + 60_000)).state, "valid");
    assert.equal(evaluateSession(base, new Date(t0.getTime() + SESSION_IDLE_MS + 1)).state, "invalid");
    assert.equal(evaluateSession({ ...base, revokedAt: t0 }, t0).state, "invalid");
    const late = new Date(t0.getTime() + SESSION_ABSOLUTE_MS + 1);
    assert.equal(evaluateSession({ ...base, expiresAt: new Date(late.getTime() + 1e6) }, late).state, "invalid");
  });
  it("slides the idle window but never past the absolute limit", () => {
    const { expiresAt, absoluteExpiresAt } = newSessionTimes(t0);
    const now = new Date(t0.getTime() + 10 * 60_000);
    const r = evaluateSession({ expiresAt, absoluteExpiresAt, revokedAt: null, lastUsedAt: t0 }, now);
    assert.equal(r.state, "touch");
    const nearEnd = new Date(absoluteExpiresAt.getTime() - 60_000);
    const r2 = evaluateSession(
      { expiresAt: new Date(nearEnd.getTime() + 30_000), absoluteExpiresAt, revokedAt: null, lastUsedAt: t0 },
      nearEnd,
    );
    assert.equal(r2.state, "touch");
    if (r2.state === "touch") assert.ok(r2.expiresAt.getTime() <= absoluteExpiresAt.getTime());
  });
  it("locks after repeated failures", () => {
    let failures = 0;
    for (let i = 1; i < MAX_FAILED_LOGINS; i++) {
      const s = nextLockState(failures, t0);
      assert.equal(s.lockedUntil, null);
      failures = s.failedLoginCount;
    }
    const last = nextLockState(failures, t0);
    assert.ok(last.lockedUntil);
    assert.equal(isLocked(last.lockedUntil, new Date(t0.getTime() + LOCKOUT_MS - 1)), true);
    assert.equal(isLocked(last.lockedUntil, new Date(t0.getTime() + LOCKOUT_MS + 1)), false);
  });
  it("blocks open redirects", () => {
    assert.equal(safePortalRedirect("/portal/employees?page=2"), "/portal/employees?page=2");
    for (const bad of ["//evil.com", "https://evil.com", "/other", "/portal\\..", "", null, undefined, "/portal/login"]) {
      assert.equal(safePortalRedirect(bad as string | null), "/portal/dashboard", String(bad));
    }
  });
});

describe("Asia/Dhaka dates", () => {
  it("uses the Dhaka calendar day, not UTC", () => {
    // 20:30 UTC on 31 Oct is already 1 Nov in Dhaka (UTC+6)
    assert.equal(dhakaDateKey(new Date("2026-10-31T20:30:00Z")), "2026-11-01");
    assert.equal(dhakaDateKey(new Date("2026-10-31T17:59:00Z")), "2026-10-31");
    assert.equal(dhakaWorkDate(new Date("2026-10-31T20:30:00Z")).toISOString(), "2026-11-01T00:00:00.000Z");
  });
});

describe("payroll calculation", () => {
  const lines = [
    { name: "Basic Salary", type: "EARNING" as const, amountMinor: toMinor("20000") },
    { name: "House Allowance", type: "EARNING" as const, amountMinor: toMinor("5000") },
    { name: "Medical Allowance", type: "EARNING" as const, amountMinor: toMinor("1000") },
    { name: "Transport Allowance", type: "EARNING" as const, amountMinor: toMinor("1000") },
  ];

  it("matches the illustrative example: 27,000 gross - 1,000 approved deduction = 26,000 net", () => {
    const r = calculatePayrollItem(lines, [
      { type: "DEDUCTION", amountMinor: toMinor("1000"), reason: "Approved advance recovery", status: "APPROVED" },
    ]);
    assert.equal(r.grossMinor, 2_700_000);
    assert.equal(r.deductionsMinor, 100_000);
    assert.equal(r.netMinor, 2_600_000);
    assert.equal(formatBdt(r.netMinor), "৳26,000.00");
  });

  it("does not deduct anything on its own", () => {
    const r = calculatePayrollItem(lines);
    assert.equal(r.netMinor, r.grossMinor);
  });

  it("approved bonus increases gross", () => {
    const r = calculatePayrollItem(lines, [
      { type: "ADDITION", amountMinor: toMinor("2500.50"), reason: "Bonus", status: "APPROVED" },
    ]);
    assert.equal(r.grossMinor, 2_950_050);
  });

  it("refuses unapproved adjustments instead of ignoring them", () => {
    for (const status of ["PENDING", "REJECTED"] as const) {
      assert.throws(
        () => calculatePayrollItem(lines, [{ type: "DEDUCTION", amountMinor: 100, reason: "x", status }]),
        (e: unknown) => e instanceof PayrollError && e.code === "UNAPPROVED_ADJUSTMENT",
      );
    }
  });

  it("flags a negative net and invalid amounts", () => {
    assert.throws(
      () => calculatePayrollItem(lines, [{ type: "DEDUCTION", amountMinor: toMinor("30000"), reason: "x", status: "APPROVED" }]),
      (e: unknown) => e instanceof PayrollError && e.code === "NEGATIVE_NET",
    );
    assert.throws(() => calculatePayrollItem([{ name: "x", type: "EARNING", amountMinor: -1 }]));
    assert.throws(() => calculatePayrollItem([{ name: "x", type: "EARNING", amountMinor: 1.5 }]));
  });

  it("parses money exactly with no floating point error", () => {
    assert.equal(toMinor("0.10") + toMinor("0.20"), 30);
    assert.equal(toMinor("19999.99"), 1_999_999);
    for (const bad of ["-1", "1.234", "abc", "", "1e5"]) assert.throws(() => toMinor(bad), PayrollError, bad);
  });
});

describe("payroll period rules", () => {
  it("locked and paid payroll cannot be edited", () => {
    assertPayrollEditable("DRAFT");
    assertPayrollEditable("REVIEW");
    for (const s of ["APPROVED", "PAID", "LOCKED"] as const) assert.throws(() => assertPayrollEditable(s), PayrollError);
  });
  it("follows draft -> review -> approved -> paid -> locked", () => {
    assertPayrollTransition("DRAFT", "REVIEW");
    assertPayrollTransition("REVIEW", "APPROVED");
    assertPayrollTransition("APPROVED", "PAID");
    assertPayrollTransition("PAID", "LOCKED");
    assert.throws(() => assertPayrollTransition("DRAFT", "PAID"), PayrollError);
    assert.throws(() => assertPayrollTransition("PAID", "REVIEW"), PayrollError);
  });
  it("reopening a locked period needs the explicit reopen flag", () => {
    assert.throws(() => assertPayrollTransition("LOCKED", "REVIEW"), PayrollError);
    assertPayrollTransition("LOCKED", "REVIEW", { reopen: true });
    assert.throws(() => assertPayrollTransition("LOCKED", "DRAFT", { reopen: true }), PayrollError);
  });
  it("separation of duties", () => {
    assert.throws(() => assertSeparationOfDuties("u1", "u1"), PayrollError);
    assertSeparationOfDuties("u1", "u2");
    assertSeparationOfDuties("u1", "u1", true);
  });
});
