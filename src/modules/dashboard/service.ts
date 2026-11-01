import "server-only";
import { can } from "@/lib/portal/access";
import { dhakaWorkDate } from "@/lib/portal/dates";
import { getPortalDb } from "@/lib/portal/db";
import type { PortalUser } from "@/modules/auth/types";

export interface CompanyStats {
  totalEmployees: number;
  activeEmployees: number;
  departments: number;
  teams: number;
  /** Only present when the user has the matching permission. */
  presentToday?: number;
  lateToday?: number;
  pendingLeave?: number;
  activeProjects?: number;
  overdueProjects?: number;
}

export interface MyOverview {
  fullName: string;
  employeeCode: string;
  department: string | null;
  designation: string | null;
  manager: string | null;
  joiningDate: Date;
}

export async function getCompanyStats(user: PortalUser): Promise<CompanyStats | null> {
  if (!can(user, "dashboard.view_company")) return null;
  const db = getPortalDb();
  const org = user.organizationId;
  const today = dhakaWorkDate();

  const [totalEmployees, activeEmployees, departments, teams] = await Promise.all([
    db.employee.count({ where: { organizationId: org } }),
    db.employee.count({ where: { organizationId: org, status: { in: ["ACTIVE", "PROBATION"] } } }),
    db.department.count({ where: { organizationId: org, isActive: true } }),
    db.team.count({ where: { organizationId: org } }),
  ]);

  const stats: CompanyStats = { totalEmployees, activeEmployees, departments, teams };

  if (can(user, "attendance.view_all")) {
    const [present, late] = await Promise.all([
      db.attendanceRecord.count({
        where: { workDate: today, status: { in: ["PRESENT", "LATE"] }, employee: { organizationId: org } },
      }),
      db.attendanceRecord.count({ where: { workDate: today, status: "LATE", employee: { organizationId: org } } }),
    ]);
    stats.presentToday = present;
    stats.lateToday = late;
  }
  if (can(user, "leave.approve") && can(user, "leave.view_all")) {
    stats.pendingLeave = await db.leaveRequest.count({
      where: { status: "PENDING", employee: { organizationId: org } },
    });
  }
  if (can(user, "project.view_all")) {
    const [active, overdue] = await Promise.all([
      db.project.count({ where: { organizationId: org, status: "IN_PROGRESS" } }),
      db.project.count({
        where: { organizationId: org, dueDate: { lt: today }, status: { notIn: ["COMPLETED", "CANCELLED"] } },
      }),
    ]);
    stats.activeProjects = active;
    stats.overdueProjects = overdue;
  }
  return stats;
}

export async function getMyOverview(user: PortalUser): Promise<MyOverview | null> {
  if (!user.employeeId) return null;
  const e = await getPortalDb().employee.findFirst({
    where: { id: user.employeeId, organizationId: user.organizationId },
    include: {
      department: { select: { name: true } },
      designation: { select: { title: true } },
      manager: { select: { firstName: true, lastName: true } },
    },
  });
  if (!e) return null;
  return {
    fullName: `${e.firstName} ${e.lastName}`,
    employeeCode: e.employeeCode,
    department: e.department?.name ?? null,
    designation: e.designation?.title ?? null,
    manager: e.manager ? `${e.manager.firstName} ${e.manager.lastName}` : null,
    joiningDate: e.joiningDate,
  };
}
