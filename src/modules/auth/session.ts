import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { getPortalDb } from "@/lib/portal/db";
import { portalConfig } from "@/lib/portal/config";
import { SESSION_COOKIE_NAME } from "@/lib/portal/constants";
import { ROLE_DEFINITIONS, type RoleKey } from "@/lib/portal/permissions";
import {
  SESSION_ABSOLUTE_MS,
  evaluateSession,
  generateSessionToken,
  hashToken,
  newSessionTimes,
} from "@/lib/portal/session-token";
import type { PortalUser } from "./types";

const INACTIVE_EMPLOYEE_STATUSES = new Set(["RESIGNED", "TERMINATED"]);

export interface RequestMeta {
  ipAddress: string | null;
  userAgent: string | null;
}

/**
 * Client IP for rate limiting and audit. X-Forwarded-For is only trustworthy behind your own proxy
 * or host (Vercel, Nginx...). Configure the proxy to overwrite, not append, this header.
 */
export async function getRequestMeta(): Promise<RequestMeta> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || h.get("x-real-ip") || null;
  return { ipAddress: ip ? ip.slice(0, 64) : null, userAgent: h.get("user-agent") };
}

export async function createSession(userId: string, meta: RequestMeta): Promise<void> {
  const token = generateSessionToken();
  const { expiresAt, absoluteExpiresAt } = newSessionTimes(new Date());
  await getPortalDb().session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      absoluteExpiresAt,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent?.slice(0, 255) ?? null,
    },
  });
  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Server-side idle/absolute limits are authoritative; the cookie just must not outlive them.
    maxAge: Math.floor(SESSION_ABSOLUTE_MS / 1000),
  });
}

export async function destroyCurrentSession(): Promise<{ userId: string; organizationId: string } | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;
  jar.delete(SESSION_COOKIE_NAME);
  if (!token) return null;
  const db = getPortalDb();
  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    select: { id: true, userId: true, revokedAt: true, user: { select: { organizationId: true } } },
  });
  if (!session) return null;
  if (!session.revokedAt) {
    await db.session.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
  }
  return { userId: session.userId, organizationId: session.user.organizationId };
}

/**
 * Current signed-in user, or null. Cached per request. Reads the user, roles and permissions from the
 * database on every request so deactivating an account or removing a role takes effect immediately.
 */
export const getPortalUser = cache(async (): Promise<PortalUser | null> => {
  if (!portalConfig.enabled) return null;
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const db = getPortalDb();
  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: {
        include: {
          employee: true,
          userRoles: {
            include: { role: { include: { permissions: { include: { permission: true } } } } },
          },
        },
      },
    },
  });
  if (!session) return null;

  const now = new Date();
  const state = evaluateSession(session, now);
  if (state.state === "invalid") return null;
  if (state.state === "touch") {
    await db.session.update({
      where: { id: session.id },
      data: { lastUsedAt: now, expiresAt: state.expiresAt },
    });
  }

  const user = session.user;
  if (!user.isActive) return null;
  if (user.employee && INACTIVE_EMPLOYEE_STATUSES.has(user.employee.status)) return null;

  const permissions = new Set<string>();
  const roleKeys: string[] = [];
  const roleNames: string[] = [];
  for (const ur of user.userRoles) {
    roleKeys.push(ur.role.key);
    roleNames.push(ur.role.name);
    for (const rp of ur.role.permissions) permissions.add(rp.permission.key);
  }

  const ledTeams = user.employee
    ? await db.team.findMany({ where: { leaderId: user.employee.id }, select: { id: true } })
    : [];

  const fallbackName =
    (ROLE_DEFINITIONS as Record<string, { name: string } | undefined>)[roleKeys[0] as RoleKey]?.name ?? user.email;

  return {
    userId: user.id,
    organizationId: user.organizationId,
    email: user.email,
    displayName: user.employee ? `${user.employee.firstName} ${user.employee.lastName}` : fallbackName,
    employeeId: user.employee?.id ?? null,
    employeeCode: user.employee?.employeeCode ?? null,
    roleKeys,
    roleNames,
    permissions,
    ledTeamIds: ledTeams.map((t) => t.id),
    mustChangePassword: user.mustChangePassword,
  };
});
