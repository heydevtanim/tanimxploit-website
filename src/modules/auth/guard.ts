import "server-only";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { canAny } from "@/lib/portal/access";
import { FORBIDDEN_PATH, LOGIN_PATH } from "@/lib/portal/constants";
import type { PermissionKey } from "@/lib/portal/permissions";
import { getPortalUser } from "./session";
import type { PortalUser } from "./types";

/** For pages and server actions: signed-in users only. */
export async function requireUser(): Promise<PortalUser> {
  const user = await getPortalUser();
  if (!user) redirect(LOGIN_PATH);
  return user;
}

/** For pages and server actions: the user needs ANY of the listed permissions. */
export async function requirePermission(...anyOf: PermissionKey[]): Promise<PortalUser> {
  const user = await requireUser();
  if (!canAny(user, anyOf)) redirect(FORBIDDEN_PATH);
  return user;
}

/** For route handlers: returns the user or a ready 401/403 response. */
export async function authorizeApi(
  ...anyOf: PermissionKey[]
): Promise<{ user: PortalUser; response?: undefined } | { user?: undefined; response: NextResponse }> {
  const user = await getPortalUser();
  const noStore = { "Cache-Control": "no-store" };
  if (!user) return { response: NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noStore }) };
  if (anyOf.length > 0 && !canAny(user, anyOf)) {
    return { response: NextResponse.json({ error: "Forbidden" }, { status: 403, headers: noStore }) };
  }
  return { user };
}
