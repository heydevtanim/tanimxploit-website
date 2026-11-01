"use server";

import { redirect } from "next/navigation";
import { getPortalDb } from "@/lib/portal/db";
import { portalConfig } from "@/lib/portal/config";
import { LOGIN_PATH } from "@/lib/portal/constants";
import { burnPasswordCheck, hashPassword, needsRehash, verifyPassword } from "@/lib/portal/password";
import { isLocked, nextLockState, safePortalRedirect } from "@/lib/portal/session-token";
import { loginSchema } from "@/lib/portal/validation";
import { createRateLimiter } from "@/lib/utils/rate-limit";
import { writeAudit } from "./audit";
import { createSession, destroyCurrentSession, getRequestMeta } from "./session";
import type { LoginState } from "./types";

// First line of defense only (per server instance). The database lockout below is shared.
const ipLimiter = createRateLimiter({ max: 30, windowMs: 10 * 60 * 1000 });
const emailLimiter = createRateLimiter({ max: 8, windowMs: 10 * 60 * 1000 });

const GENERIC_ERROR = "Sign-in failed. Check your email and password, or try again later.";
const INACTIVE_EMPLOYEE_STATUSES = ["RESIGNED", "TERMINATED"];

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  if (!portalConfig.enabled) return { error: "The staff portal is not available." };

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const next = safePortalRedirect(typeof formData.get("next") === "string" ? String(formData.get("next")) : null);
  if (!parsed.success) return { error: GENERIC_ERROR };

  const { email, password } = parsed.data;
  const meta = await getRequestMeta();

  const ipKey = meta.ipAddress ?? "unknown";
  if (!ipLimiter.check(ipKey).allowed || !emailLimiter.check(email).allowed) {
    return { error: "Too many attempts. Please wait a few minutes and try again." };
  }

  const db = getPortalDb();
  const organization = await db.organization.findUnique({ where: { slug: portalConfig.organizationSlug } });
  if (!organization) return { error: GENERIC_ERROR };

  const user = await db.user.findUnique({
    where: { organizationId_email: { organizationId: organization.id, email } },
    include: { employee: { select: { status: true } } },
  });
  const now = new Date();

  if (
    !user ||
    !user.passwordHash ||
    !user.isActive ||
    (user.employee !== null && INACTIVE_EMPLOYEE_STATUSES.includes(user.employee.status)) ||
    isLocked(user.lockedUntil, now)
  ) {
    // Same work and same message whether or not the account exists, is disabled or is locked.
    await burnPasswordCheck(password);
    await writeAudit({
      organizationId: organization.id,
      actorUserId: user?.id ?? null,
      action: "auth.login_failed",
      metadata: { reason: !user ? "unknown_email" : isLocked(user.lockedUntil, now) ? "locked" : "unusable" },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
    return { error: GENERIC_ERROR };
  }

  const storedHash = user.passwordHash;
  const valid = await verifyPassword(password, storedHash);
  if (!valid) {
    const lock = nextLockState(user.failedLoginCount, now);
    await db.user.update({ where: { id: user.id }, data: lock });
    await writeAudit({
      organizationId: organization.id,
      actorUserId: user.id,
      action: lock.lockedUntil ? "auth.account_locked" : "auth.login_failed",
      metadata: { reason: "bad_password" },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
    return { error: GENERIC_ERROR };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: now,
      ...(needsRehash(storedHash) ? { passwordHash: await hashPassword(password) } : {}),
    },
  });
  await createSession(user.id, meta);
  await writeAudit({
    organizationId: organization.id,
    actorUserId: user.id,
    action: "auth.login",
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  });

  redirect(next); // redirect() throws; keep it outside any try/catch
}

export async function logoutAction(): Promise<void> {
  const ended = await destroyCurrentSession();
  if (ended) {
    const meta = await getRequestMeta();
    await writeAudit({
      organizationId: ended.organizationId,
      actorUserId: ended.userId,
      action: "auth.logout",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  }
  redirect(LOGIN_PATH);
}
