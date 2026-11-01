import "server-only";
import type { Prisma } from "@prisma/client";
import {
  employeeAccess,
  employeeListScope,
  isAuditedEmployeeRead,
  visibleSections,
  type EmployeeAccess,
} from "@/lib/portal/access";
import { getPortalDb } from "@/lib/portal/db";
import { writeAudit } from "@/modules/auth/audit";
import { getRequestMeta } from "@/modules/auth/session";
import type { PortalUser } from "@/modules/auth/types";

export interface EmployeeListQuery {
  q?: string;
  status?: "ACTIVE" | "PROBATION" | "ON_LEAVE" | "SUSPENDED" | "RESIGNED" | "TERMINATED";
  page: number;
  pageSize: number;
}

export interface EmployeeListRow {
  id: string;
  employeeCode: string;
  fullName: string;
  department: string | null;
  designation: string | null;
  status: string;
  workMode: string;
}

export interface EmployeeListResult {
  rows: EmployeeListRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Server-side pagination, search and scope. Salary data is never selected here. */
export async function listEmployees(actor: PortalUser, query: EmployeeListQuery): Promise<EmployeeListResult> {
  const empty: EmployeeListResult = { rows: [], total: 0, page: query.page, pageSize: query.pageSize, totalPages: 0 };
  const scope = employeeListScope(actor);
  if (scope.kind === "NONE") return empty;

  const and: Prisma.EmployeeWhereInput[] = [{ organizationId: actor.organizationId }];

  if (scope.kind === "OWN") {
    and.push({ id: scope.employeeId });
  } else if (scope.kind === "TEAM") {
    const or: Prisma.EmployeeWhereInput[] = [{ id: scope.employeeId }, { managerId: scope.employeeId }];
    if (scope.teamIds.length > 0) or.push({ teamId: { in: [...scope.teamIds] } });
    and.push({ OR: or });
  }

  if (query.status) and.push({ status: query.status });
  if (query.q) {
    and.push({
      OR: [
        { firstName: { contains: query.q, mode: "insensitive" } },
        { lastName: { contains: query.q, mode: "insensitive" } },
        { employeeCode: { contains: query.q, mode: "insensitive" } },
      ],
    });
  }

  const where: Prisma.EmployeeWhereInput = { AND: and };
  const db = getPortalDb();
  const [total, items] = await Promise.all([
    db.employee.count({ where }),
    db.employee.findMany({
      where,
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      select: {
        id: true,
        employeeCode: true,
        firstName: true,
        lastName: true,
        status: true,
        workMode: true,
        department: { select: { name: true } },
        designation: { select: { title: true } },
      },
    }),
  ]);

  return {
    rows: items.map((e) => ({
      id: e.id,
      employeeCode: e.employeeCode,
      fullName: `${e.firstName} ${e.lastName}`,
      department: e.department?.name ?? null,
      designation: e.designation?.title ?? null,
      status: e.status,
      workMode: e.workMode,
    })),
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages: Math.ceil(total / query.pageSize),
  };
}

export interface EmployeeProfile {
  id: string;
  access: EmployeeAccess;
  directory: {
    employeeCode: string;
    fullName: string;
    department: string | null;
    designation: string | null;
    status: string;
  };
  employment: {
    workMode: string;
    employmentType: string;
    joiningDate: Date;
    team: string | null;
    workLocation: string | null;
    manager: string | null;
  } | null;
  contact: { phone: string | null } | null;
  personal: { dateOfBirth: Date | null; address: string | null } | null;
}

/**
 * Returns only the sections the actor may see, or null when the record does not exist OR the actor has
 * no access (same answer for both, so record existence is not revealed). Salary is never part of this.
 */
export async function getEmployeeProfile(actor: PortalUser, id: string): Promise<EmployeeProfile | null> {
  const e = await getPortalDb().employee.findFirst({
    where: { id, organizationId: actor.organizationId },
    include: {
      department: { select: { name: true } },
      designation: { select: { title: true } },
      team: { select: { name: true } },
      workLocation: { select: { name: true } },
      manager: { select: { firstName: true, lastName: true } },
    },
  });
  if (!e) return null;

  const access = employeeAccess(actor, { id: e.id, managerId: e.managerId, teamId: e.teamId });
  const sections = visibleSections(access);
  if (!sections.directory) return null;

  if (isAuditedEmployeeRead(access, actor, e.id)) {
    const meta = await getRequestMeta();
    await writeAudit({
      organizationId: actor.organizationId,
      actorUserId: actor.userId,
      action: "employee.view",
      entityType: "Employee",
      entityId: e.id,
      metadata: { access },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  }

  return {
    id: e.id,
    access,
    directory: {
      employeeCode: e.employeeCode,
      fullName: `${e.firstName} ${e.lastName}`,
      department: e.department?.name ?? null,
      designation: e.designation?.title ?? null,
      status: e.status,
    },
    employment: sections.employment
      ? {
          workMode: e.workMode,
          employmentType: e.employmentType,
          joiningDate: e.joiningDate,
          team: e.team?.name ?? null,
          workLocation: e.workLocation?.name ?? null,
          manager: e.manager ? `${e.manager.firstName} ${e.manager.lastName}` : null,
        }
      : null,
    contact: sections.contact ? { phone: e.phone } : null,
    personal: sections.personal ? { dateOfBirth: e.dateOfBirth, address: e.address } : null,
  };
}
