/** Session token helpers and rules (pure/testable). Only the SHA-256 hash is stored in the database. */
import { createHash, randomBytes } from "node:crypto";

/** Session ends after this much inactivity. */
export const SESSION_IDLE_MS = 12 * 60 * 60 * 1000;
/** Session can never live longer than this, however active. */
export const SESSION_ABSOLUTE_MS = 7 * 24 * 60 * 60 * 1000;
/** Only write "last used" to the database this often. */
export const SESSION_TOUCH_INTERVAL_MS = 5 * 60 * 1000;

export const MAX_FAILED_LOGINS = 5;
export const LOCKOUT_MS = 15 * 60 * 1000;

export function generateSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export interface SessionTimes {
  expiresAt: Date;
  absoluteExpiresAt: Date;
  revokedAt: Date | null;
  lastUsedAt: Date;
}

export function newSessionTimes(now: Date): { expiresAt: Date; absoluteExpiresAt: Date } {
  const absoluteExpiresAt = new Date(now.getTime() + SESSION_ABSOLUTE_MS);
  const expiresAt = new Date(Math.min(now.getTime() + SESSION_IDLE_MS, absoluteExpiresAt.getTime()));
  return { expiresAt, absoluteExpiresAt };
}

export type SessionState =
  | { state: "invalid" }
  | { state: "valid" }
  | { state: "touch"; expiresAt: Date };

export function evaluateSession(s: SessionTimes, now: Date): SessionState {
  const t = now.getTime();
  if (s.revokedAt) return { state: "invalid" };
  if (s.expiresAt.getTime() <= t || s.absoluteExpiresAt.getTime() <= t) return { state: "invalid" };
  if (t - s.lastUsedAt.getTime() >= SESSION_TOUCH_INTERVAL_MS) {
    const next = Math.min(t + SESSION_IDLE_MS, s.absoluteExpiresAt.getTime());
    return { state: "touch", expiresAt: new Date(next) };
  }
  return { state: "valid" };
}

export function nextLockState(
  previousFailures: number,
  now: Date,
): { failedLoginCount: number; lockedUntil: Date | null } {
  const failedLoginCount = previousFailures + 1;
  if (failedLoginCount >= MAX_FAILED_LOGINS) {
    return { failedLoginCount: 0, lockedUntil: new Date(now.getTime() + LOCKOUT_MS) };
  }
  return { failedLoginCount, lockedUntil: null };
}

export function isLocked(lockedUntil: Date | null, now: Date): boolean {
  return lockedUntil !== null && lockedUntil.getTime() > now.getTime();
}

/** Only allow redirects back to portal pages (blocks open redirects such as //evil.com). */
export function safePortalRedirect(next: string | null | undefined, fallback = "/portal/dashboard"): string {
  if (!next || typeof next !== "string") return fallback;
  if (!next.startsWith("/portal")) return fallback;
  if (next.startsWith("//") || next.includes("\\") || /[\u0000-\u001f]/.test(next)) return fallback;
  if (next === "/portal/login" || next.startsWith("/portal/login?")) return fallback;
  return next;
}
