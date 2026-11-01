/**
 * Resource-level authorization (pure functions, unit tested).
 *
 * Role permissions answer "may this kind of user do this kind of thing?".
 * These functions answer "may THIS user do it to THIS record?" (own record, own team, direct report).
 */
import type { PermissionKey } from "./permissions";

export interface Actor {
  userId: string;
  organizationId: string;
  /** Employee profile linked to the login, if any. */
  employeeId: string | null;
  permissions: ReadonlySet<string>;
  /** Teams this employee leads. */
  ledTeamIds: readonly string[];
}

export function can(actor: Pick<Actor, "permissions">, permission: PermissionKey): boolean {
  return actor.permissions.has(permission);
}

export function canAny(actor: Pick<Actor, "permissions">, permissions: readonly PermissionKey[]): boolean {
  return permissions.some((p) => actor.permissions.has(p));
}

/** How much of an employee record an actor may see. Higher = more. */
export type EmployeeAccess = "NONE" | "DIRECTORY" | "TEAM" | "OWN" | "FULL";

export interface EmployeeTarget {
  id: string;
  managerId: string | null;
  teamId: string | null;
}

export function employeeAccess(actor: Actor, target: EmployeeTarget): EmployeeAccess {
  if (can(actor, "employee.view_all")) return "FULL";
  if (actor.employeeId && target.id === actor.employeeId && can(actor, "employee.view_own")) return "OWN";
  if (
    can(actor, "employee.view_team") &&
    actor.employeeId &&
    (target.managerId === actor.employeeId || (target.teamId !== null && actor.ledTeamIds.includes(target.teamId)))
  ) {
    return "TEAM";
  }
  if (can(actor, "employee.view_directory")) return "DIRECTORY";
  return "NONE";
}

export interface VisibleSections {
  directory: boolean; // name, code, department, designation, status
  employment: boolean; // work mode, joining date, employment type, manager
  contact: boolean; // phone
  personal: boolean; // date of birth, address
}

export function visibleSections(level: EmployeeAccess): VisibleSections {
  switch (level) {
    case "FULL":
    case "OWN":
      return { directory: true, employment: true, contact: true, personal: true };
    case "TEAM":
      return { directory: true, employment: true, contact: true, personal: false };
    case "DIRECTORY":
      return { directory: true, employment: false, contact: false, personal: false };
    default:
      return { directory: false, employment: false, contact: false, personal: false };
  }
}

/** Reading someone else's personal data must be written to the audit log. */
export function isAuditedEmployeeRead(level: EmployeeAccess, actor: Actor, targetId: string): boolean {
  return (level === "FULL" || level === "TEAM") && actor.employeeId !== targetId;
}

export type EmployeeListScope =
  | { kind: "ALL" }
  | { kind: "TEAM"; employeeId: string; teamIds: readonly string[] }
  | { kind: "OWN"; employeeId: string }
  | { kind: "NONE" };

/**
 * Which rows an actor may list. The directory permission shows everyone but with directory-only
 * columns; the page decides columns from `employeeAccess`.
 */
export function employeeListScope(actor: Actor): EmployeeListScope {
  if (can(actor, "employee.view_all") || can(actor, "employee.view_directory")) return { kind: "ALL" };
  if (can(actor, "employee.view_team") && actor.employeeId) {
    return { kind: "TEAM", employeeId: actor.employeeId, teamIds: actor.ledTeamIds };
  }
  if (can(actor, "employee.view_own") && actor.employeeId) return { kind: "OWN", employeeId: actor.employeeId };
  return { kind: "NONE" };
}

/** Leave approval is scoped: an approver may not approve own leave, and team leads only their scope. */
export function canApproveLeaveFor(actor: Actor, target: EmployeeTarget): boolean {
  if (!can(actor, "leave.approve")) return false;
  if (actor.employeeId && target.id === actor.employeeId) return false;
  if (can(actor, "leave.view_all")) return true;
  if (!actor.employeeId) return false;
  return target.managerId === actor.employeeId || (target.teamId !== null && actor.ledTeamIds.includes(target.teamId));
}
