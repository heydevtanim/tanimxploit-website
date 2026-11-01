# TanimXploit Workforce Portal (`/portal`)

Private company management application (HR, attendance, leave, payroll, projects) built as a **modular
monolith** inside this Next.js project and the same PostgreSQL database as the public website.
It follows the approved "Final project specification". Primary URL: `https://tanimxploit.com/portal/`.

## Status by phase

| Phase | Scope | Status in this update |
|---|---|---|
| 1 Foundation | Next.js, Prisma, PostgreSQL, portal layout | **Done** |
| 2 Authentication and RBAC | Login/logout, hashed passwords, DB sessions, roles, permission checks, audit log foundation | **Done** (login, logout, lockout, RBAC, audit). **Not yet:** invitations, password-reset screens, MFA (tables and columns exist) |
| 3 Organization and Employee HR | Organization view, employee directory and profile with scoped access | **Partly done** (read-only). **Not yet:** create/edit forms, documents, history screens |
| 4 Attendance and Leave | Schema only | Planned |
| 5 Payroll | Schema, calculation engine and state rules with unit tests | Engine done; screens, payslips and storage planned |
| 6 to 8 | Projects, tasks, reports, notifications, deployment hardening | Schema only / planned |

Unbuilt menu items open a roadmap page (still permission-checked) so navigation matches the final design.

## Turning it on

1. Set `DATABASE_URL` (PostgreSQL) and the portal variables in `.env.example` (`PORTAL_ENABLED=true`, `SEED_*`).
2. `npm install`
3. `npx prisma migrate dev --name portal_foundation` (creates the first migration; commit the `prisma/migrations` folder)
4. `npx prisma db seed` creates the organization, roles, permissions, the six divisions, example teams, designations, leave **types** and the founder (Super Admin) account.
5. `npm run dev`, open `http://localhost:3000/portal`.

`PORTAL_ENABLED` defaults to off: with it off, every `/portal` URL returns 404, so the public site can be deployed alone.
The old public-site rule "database is optional" still holds; the portal itself requires the database.

## Security design

| Topic | What is implemented |
|---|---|
| Passwords | scrypt (N=32768, r=8, p=1), random salt, parameters stored per hash, automatic rehash on login when parameters rise. Policy: 12 to 128 characters |
| Sessions | Random 256-bit token in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie (`__Host-` prefix in production). Only the SHA-256 hash is stored. 12 h idle timeout, 7 day absolute limit, revocable (logout sets `revokedAt`) |
| Login | Generic error message, equal work for unknown/disabled/locked accounts (no user enumeration), IP and email rate limits, 5 failures lock the account for 15 minutes, every attempt is audit-logged |
| Authorization | Role permissions (`src/lib/portal/permissions.ts`) plus record-level checks (`src/lib/portal/access.ts`): own record, direct reports, led teams. Checked in every page, server action and API route; the menu is only a convenience |
| Offboarding | A deactivated user or an employee with status Resigned/Terminated is rejected on the next request. Historical records remain (User and Employee are separate tables) |
| Sensitive data | Salary is never selected by the employee views. Reading another person's personal data writes an `employee.view` audit entry |
| Search engines and caches | `robots.txt` disallows `/portal/`, pages send `noindex` and `no-store`, canonical URL removed |
| Public site | Header, footer and company structured data are not rendered under `/portal` (the public header/footer live in the `(site)` route group and `DivisionShell`) |

### Default role design (adjust in `permissions.ts`, then re-run the seed)

* **Super Admin / Founder**: everything.
* **HR Manager**: employees, attendance, leave. **No** salary or payroll access.
* **Finance Manager**: salary structures and payroll preparation, directory-only employee view. **Cannot** approve, lock or reopen payroll (separation of duties). If the founder is the only approver, that is the intended workflow.
* **Admin**: general operations, users, settings, audit. No payroll.
* **Project Manager / Team Leader**: team-scoped access and approvals.
* **Employee**: own profile, attendance, leave, payslips, tasks.
* **Auditor**: read-only reports and audit log.

A user can hold several roles; permissions are the union.

## Payroll rules already enforced in code (`src/modules/payroll`)

* Money is integer poisha in code and `Decimal(12,2)` in the database. Never floating point.
* `net = gross - deductions`; the spec's illustration (27,000 gross, 1,000 approved deduction, 26,000 net) is a unit test.
* **No automatic attendance deductions.** A deduction exists only as an explicit, **approved** adjustment. Pending or rejected adjustments make the calculation fail instead of being silently ignored.
* A negative net is an error that requires review.
* State machine `DRAFT -> REVIEW -> APPROVED -> PAID -> LOCKED`; approved, paid and locked payroll cannot be edited; reopening needs an explicit reopen flag (guard it with `payroll.reopen` and a recorded reason).
* Each payroll item stores a frozen snapshot of the components used.

**Before building payroll screens**, management must write down the salary rules, leave-without-pay handling and statutory
deductions (Bangladesh labour and tax rules). Those rules are intentionally not guessed here.

## Database

`prisma/schema.prisma` now contains the public-site `Inquiry` model plus the portal schema: organization, users and
sessions, roles and permissions, departments/teams/designations/locations, employees and documents, attendance
(punches are append-only; corrections keep the original), leave, payroll, projects/tasks/time entries,
announcements/notifications, audit log, file assets and settings. Conventions:

* UTC timestamps; dates that are calendar days use `@db.Date`; the UI formats in `Asia/Dhaka`.
* Actor columns named `...ById` are plain ids so the audit trail survives user anonymisation.
* Files are metadata rows (`FileAsset`) pointing at **private** object storage; never expose `storageKey` as a URL.
* Recommended extra step before launch: a PostgreSQL trigger or restricted DB role that blocks `UPDATE`/`DELETE` on
  `PayrollItem` rows of locked periods, so immutability does not depend on application code alone.
* Not modelled yet: expenses (the spec lists an expense report), project attachments, recruitment.

## Folder map

```
prisma/schema.prisma, prisma/seed.ts
src/middleware.ts                      first gate: cookie present? plus noindex/no-store headers
src/lib/portal/                        permissions, access (record-level), password, session-token, dates, navigation, config
src/modules/auth/                      session, guard, actions (login/logout), audit
src/modules/employees|dashboard|organization/service.ts   database access with scope rules
src/modules/payroll/                   calculate.ts, period.ts (pure, unit tested)
src/components/portal/                 PortalNav, LoginForm, ui
src/app/portal/                        login, (app) shell, dashboard, employees, organization, forbidden, [module] roadmap
src/app/api/portal/employees/route.ts  example protected API (401/403/400 handling)
tests/portal.test.ts                   RBAC, access scope, passwords, sessions, dates, payroll
```

## Known limits and next steps

1. **Run `npm install`, `npm run typecheck`, `npm run build` and `npx prisma validate` first.** This update was written and its pure logic unit-tested without network access, so the Next.js and Prisma integration code has not been compiled yet.
2. The login rate limiter is in memory (per server instance). Add a shared store or WAF rule if you run several instances.
3. Add MFA (TOTP) for Admin/Founder accounts, invitation emails and password-reset screens (Phase 2 remainder).
4. `X-Forwarded-For` is trusted for IP logging; make sure your host or proxy overwrites it.
5. Set up backups, restore tests and private file storage before any real employee data is entered.
