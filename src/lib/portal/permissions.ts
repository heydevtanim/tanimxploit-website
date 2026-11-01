/**
 * Permission catalog and default role definitions for the staff portal.
 *
 * This file is the SOURCE OF TRUTH for the seed script (`prisma/seed.ts`), which writes roles and
 * permissions into the database. At runtime the database is read, so an authorized administrator
 * can adjust non-system roles later without a deploy.
 *
 * Rules:
 *  - Permissions are verbs on a resource, never a role name ("payroll.manage", not "isFinance").
 *  - Salary-related permissions are separate from HR permissions on purpose (see ROLE_DEFINITIONS).
 *  - Hiding a menu item is NOT security. Every page, server action and API route must check.
 */

export const PERMISSIONS = {
  // Dashboards
  "dashboard.view_company": "See the company-wide dashboard (headcount, attendance, projects)",

  // Employees
  "employee.view_directory": "See the basic directory (name, code, department, designation)",
  "employee.view_team": "See employees in teams the user leads or manages",
  "employee.view_all": "See full employee profiles company-wide",
  "employee.view_own": "See own employee profile",
  "employee.create": "Create employee records",
  "employee.edit": "Edit any employee record",
  "employee.edit_own_basic": "Edit own basic contact information",
  "employee.documents.view": "View employee documents (CV, identity, contracts)",
  "employee.documents.manage": "Upload and remove employee documents",

  // Organization
  "organization.view": "See divisions, departments, teams and designations",
  "organization.manage": "Create and edit divisions, departments, teams and designations",

  // Attendance
  "attendance.check_in": "Check in and out for yourself",
  "attendance.view_own": "See own attendance",
  "attendance.view_team": "See attendance of own team",
  "attendance.view_all": "See company-wide attendance",
  "attendance.manage": "Correct attendance records (with history)",
  "attendance.correction.request": "Request an attendance correction",
  "attendance.correction.approve": "Approve or reject attendance corrections",

  // Leave
  "leave.request": "Request leave",
  "leave.view_own": "See own leave",
  "leave.view_team": "See leave of own team",
  "leave.view_all": "See company-wide leave",
  "leave.approve": "Approve or reject leave (scope enforced per request)",
  "leave.manage_policy": "Manage leave types, policies and balances",

  // Payroll (sensitive)
  "payroll.view_own_payslip": "See own payslips",
  "payroll.view_salary": "See salary structures and payroll amounts of others",
  "payroll.manage": "Prepare payroll runs, adjustments and payment records",
  "payroll.approve": "Approve a payroll run",
  "payroll.lock": "Lock a payroll period",
  "payroll.reopen": "Reopen a locked payroll period (documented reason required)",

  // Projects and tasks
  "project.view_assigned": "See projects the user manages or belongs to",
  "project.view_all": "See all projects",
  "project.create": "Create projects",
  "project.manage": "Edit projects the user manages",
  "task.assign": "Assign tasks",
  "task.update_own": "Update own tasks",
  "task.update_team": "Update tasks of own team",
  "timesheet.submit": "Submit own timesheets",
  "timesheet.approve": "Approve timesheets",

  // Communication and documents
  "announcement.view": "Read announcements",
  "announcement.manage": "Publish announcements",
  "document.view_company": "Read company policies and shared documents",
  "document.manage": "Manage company documents",

  // Reports
  "report.view_hr": "HR and attendance reports",
  "report.view_payroll": "Payroll reports",
  "report.view_projects": "Project and task reports",
  "report.export": "Export reports to CSV / PDF",

  // Administration
  "user.manage": "Invite users, activate and deactivate accounts",
  "role.manage": "Manage roles and permissions",
  "settings.manage": "Manage company, attendance, leave and payroll settings",
  "audit.view": "View audit logs",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

export const ALL_PERMISSION_KEYS = Object.keys(PERMISSIONS) as PermissionKey[];

export function isPermissionKey(value: string): value is PermissionKey {
  return Object.prototype.hasOwnProperty.call(PERMISSIONS, value);
}

export const ROLE_KEYS = [
  "SUPER_ADMIN",
  "ADMIN",
  "HR_MANAGER",
  "FINANCE_MANAGER",
  "PROJECT_MANAGER",
  "TEAM_LEADER",
  "EMPLOYEE",
  "AUDITOR",
] as const;

export type RoleKey = (typeof ROLE_KEYS)[number];

export interface RoleDefinition {
  name: string;
  description: string;
  permissions: readonly PermissionKey[];
}

/** Everything every signed-in employee gets. */
const EMPLOYEE_BASE: PermissionKey[] = [
  "employee.view_own",
  "employee.edit_own_basic",
  "organization.view",
  "attendance.check_in",
  "attendance.view_own",
  "attendance.correction.request",
  "leave.request",
  "leave.view_own",
  "payroll.view_own_payslip",
  "project.view_assigned",
  "task.update_own",
  "timesheet.submit",
  "announcement.view",
  "document.view_company",
];

const TEAM_LEAD_EXTRA: PermissionKey[] = [
  "employee.view_team",
  "attendance.view_team",
  "attendance.correction.approve",
  "leave.view_team",
  "leave.approve",
  "task.update_team",
  "timesheet.approve",
];

export const ROLE_DEFINITIONS: Record<RoleKey, RoleDefinition> = {
  SUPER_ADMIN: {
    name: "Super Admin / Founder",
    description: "Full company access, including payroll approval, locking and role management.",
    permissions: ALL_PERMISSION_KEYS,
  },
  ADMIN: {
    name: "Admin",
    description: "General company operations. No payroll or salary access by default.",
    permissions: [
      ...EMPLOYEE_BASE,
      "dashboard.view_company",
      "employee.view_all",
      "employee.create",
      "employee.edit",
      "organization.manage",
      "attendance.view_all",
      "leave.view_all",
      "project.view_all",
      "project.create",
      "project.manage",
      "task.assign",
      "announcement.manage",
      "document.manage",
      "report.view_hr",
      "report.view_projects",
      "user.manage",
      "settings.manage",
      "audit.view",
    ],
  },
  HR_MANAGER: {
    name: "HR Manager",
    description: "Employees, attendance, leave and recruitment. No salary visibility by default.",
    permissions: [
      ...EMPLOYEE_BASE,
      "dashboard.view_company",
      "employee.view_all",
      "employee.create",
      "employee.edit",
      "employee.documents.view",
      "employee.documents.manage",
      "organization.manage",
      "attendance.view_all",
      "attendance.manage",
      "attendance.correction.approve",
      "leave.view_all",
      "leave.approve",
      "leave.manage_policy",
      "announcement.manage",
      "document.manage",
      "report.view_hr",
      "report.export",
    ],
  },
  FINANCE_MANAGER: {
    name: "Finance Manager",
    description:
      "Salary structures, payroll preparation and payment records. Cannot approve or lock payroll (separation of duties).",
    permissions: [
      ...EMPLOYEE_BASE,
      "dashboard.view_company",
      "employee.view_directory",
      "payroll.view_salary",
      "payroll.manage",
      "report.view_payroll",
      "report.export",
    ],
  },
  PROJECT_MANAGER: {
    name: "Project Manager",
    description: "Projects, teams and task assignment.",
    permissions: [
      ...EMPLOYEE_BASE,
      ...TEAM_LEAD_EXTRA,
      "employee.view_directory",
      "project.create",
      "project.manage",
      "task.assign",
      "report.view_projects",
    ],
  },
  TEAM_LEADER: {
    name: "Team Leader",
    description: "Manages the assigned team (scope is enforced per record).",
    permissions: [...EMPLOYEE_BASE, ...TEAM_LEAD_EXTRA],
  },
  EMPLOYEE: {
    name: "Employee",
    description: "Own profile, tasks, attendance, leave and payslips.",
    permissions: EMPLOYEE_BASE,
  },
  AUDITOR: {
    name: "Auditor / Viewer",
    description: "Read-only access to permitted reports and audit logs.",
    permissions: [
      "employee.view_own",
      "organization.view",
      "dashboard.view_company",
      "employee.view_directory",
      "announcement.view",
      "report.view_hr",
      "report.view_payroll",
      "report.view_projects",
      "audit.view",
    ],
  },
};

/** Union of the permissions granted by a set of role keys (unknown role keys are ignored). */
export function permissionsForRoles(roleKeys: readonly string[]): Set<PermissionKey> {
  const out = new Set<PermissionKey>();
  for (const key of roleKeys) {
    const def = (ROLE_DEFINITIONS as Record<string, RoleDefinition | undefined>)[key];
    if (!def) continue;
    for (const p of def.permissions) out.add(p);
  }
  return out;
}
