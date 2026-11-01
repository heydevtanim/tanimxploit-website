/**
 * Portal navigation registry. `status: "live"` pages exist; `"planned"` pages render a roadmap
 * placeholder (from the approved project specification) until their phase is built.
 * The menu is filtered by permission, but each page still enforces its own permission check.
 */
import type { PermissionKey } from "./permissions";

export interface PortalModule {
  key: string;
  label: string;
  href: string;
  description: string;
  /** User needs ANY of these permissions. Empty = every signed-in user. */
  anyOf: readonly PermissionKey[];
  status: "live" | "planned";
  phase: string;
  planned: readonly string[];
}

export const PORTAL_MODULES: readonly PortalModule[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/portal/dashboard",
    description: "Role-based overview.",
    anyOf: [],
    status: "live",
    phase: "Phase 1",
    planned: [],
  },
  {
    key: "organization",
    label: "Organization",
    href: "/portal/organization",
    description: "Divisions, departments, teams and designations.",
    anyOf: ["organization.view"],
    status: "live",
    phase: "Phase 3",
    planned: [],
  },
  {
    key: "employees",
    label: "Employees",
    href: "/portal/employees",
    description: "Employee directory and profiles.",
    anyOf: ["employee.view_own", "employee.view_team", "employee.view_directory", "employee.view_all"],
    status: "live",
    phase: "Phase 3",
    planned: [],
  },
  {
    key: "attendance",
    label: "Attendance",
    href: "/portal/attendance",
    description: "Check in / out, corrections and attendance reports.",
    anyOf: ["attendance.view_own", "attendance.view_team", "attendance.view_all", "attendance.check_in"],
    status: "planned",
    phase: "Phase 4",
    planned: [
      "Online check in / out with server timestamps",
      "Optional office location check (no continuous tracking)",
      "Correction requests with approval; original punches always kept",
      "Work schedules, holidays and attendance reports",
    ],
  },
  {
    key: "leaves",
    label: "Leave",
    href: "/portal/leaves",
    description: "Leave requests, balances and approvals.",
    anyOf: ["leave.request", "leave.view_own", "leave.view_team", "leave.view_all"],
    status: "planned",
    phase: "Phase 4",
    planned: [
      "Leave types, policies and balances",
      "Request, manager approval and HR approval",
      "Leave calendar and history",
    ],
  },
  {
    key: "payroll",
    label: "Payroll",
    href: "/portal/payroll",
    description: "Salary structures, payroll runs and payslips.",
    anyOf: ["payroll.view_own_payslip", "payroll.view_salary", "payroll.manage", "payroll.approve"],
    status: "planned",
    phase: "Phase 5",
    planned: [
      "Component-based salary structures with history",
      "Payroll period -> review -> approval -> payment record -> lock",
      "Approved adjustments only; locked periods are immutable",
      "Payslip PDF in private storage",
    ],
  },
  {
    key: "projects",
    label: "Projects",
    href: "/portal/projects",
    description: "Clients, projects and teams.",
    anyOf: ["project.view_assigned", "project.view_all", "project.create"],
    status: "planned",
    phase: "Phase 6",
    planned: ["Client records and project creation", "Project teams across divisions", "Project reports"],
  },
  {
    key: "tasks",
    label: "Tasks",
    href: "/portal/tasks",
    description: "Task board, lists and details.",
    anyOf: ["task.update_own", "task.update_team", "task.assign"],
    status: "planned",
    phase: "Phase 6",
    planned: ["Kanban board: Backlog, To Do, In Progress, In Review, Completed", "Comments, attachments, dependencies"],
  },
  {
    key: "timesheets",
    label: "Timesheets",
    href: "/portal/timesheets",
    description: "Work logs and approvals.",
    anyOf: ["timesheet.submit", "timesheet.approve"],
    status: "planned",
    phase: "Phase 6",
    planned: ["Time entries per task", "Weekly timesheets and approvals", "Workload view"],
  },
  {
    key: "announcements",
    label: "Announcements",
    href: "/portal/announcements",
    description: "Company announcements.",
    anyOf: ["announcement.view", "announcement.manage"],
    status: "planned",
    phase: "Phase 7",
    planned: ["Publish and read announcements", "Optional email alerts"],
  },
  {
    key: "documents",
    label: "Documents",
    href: "/portal/documents",
    description: "Policies, contracts and files.",
    anyOf: ["document.view_company", "document.manage", "employee.documents.view"],
    status: "planned",
    phase: "Phase 3",
    planned: ["Private storage only; no public URLs", "Per-file access policy", "Document expiry reminders"],
  },
  {
    key: "reports",
    label: "Reports",
    href: "/portal/reports",
    description: "HR, attendance, payroll and project reports.",
    anyOf: ["report.view_hr", "report.view_payroll", "report.view_projects"],
    status: "planned",
    phase: "Phase 7",
    planned: ["Headcount, attendance, leave, payroll summary, project performance", "Permission-controlled CSV / PDF export"],
  },
  {
    key: "notifications",
    label: "Notifications",
    href: "/portal/notifications",
    description: "In-app alerts.",
    anyOf: [],
    status: "planned",
    phase: "Phase 7",
    planned: ["Task, leave, attendance and payroll notifications", "Per-user preferences"],
  },
  {
    key: "settings",
    label: "Settings",
    href: "/portal/settings",
    description: "Roles, policies, audit logs.",
    anyOf: ["settings.manage", "role.manage", "user.manage", "audit.view"],
    status: "planned",
    phase: "Phase 2",
    planned: [
      "User invitations, password reset, MFA for admin accounts",
      "Roles and permissions editor",
      "Audit log viewer, work schedules, holidays, policies",
    ],
  },
];

export function visibleModules(permissions: ReadonlySet<string>): PortalModule[] {
  return PORTAL_MODULES.filter((m) => m.anyOf.length === 0 || m.anyOf.some((p) => permissions.has(p)));
}

export function findModule(key: string): PortalModule | undefined {
  return PORTAL_MODULES.find((m) => m.key === key);
}
