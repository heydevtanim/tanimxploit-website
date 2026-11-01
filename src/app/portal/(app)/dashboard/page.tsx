import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageHeader, Stat } from "@/components/portal/ui";
import { formatDateOnly } from "@/lib/portal/dates";
import { requireUser } from "@/modules/auth/guard";
import { getCompanyStats, getMyOverview } from "@/modules/dashboard/service";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUser();
  const [company, me] = await Promise.all([getCompanyStats(user), getMyOverview(user)]);

  return (
    <>
      <PageHeader
        title={`Welcome, ${user.displayName.split(" ")[0]}`}
        description={company ? "Company overview and your own workspace." : "Your workspace."}
      />

      {user.roleKeys.length === 0 ? (
        <p className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No role is assigned to your account yet. Ask an administrator to assign one.
        </p>
      ) : null}

      {company ? (
        <section aria-label="Company overview" className="mb-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Total employees" value={company.totalEmployees} />
            <Stat label="Active employees" value={company.activeEmployees} hint="Active and on probation" />
            <Stat label="Departments" value={company.departments} />
            <Stat label="Teams" value={company.teams} />
            {company.presentToday !== undefined ? (
              <Stat label="Present today" value={company.presentToday} hint={`${company.lateToday ?? 0} late`} />
            ) : null}
            {company.pendingLeave !== undefined ? <Stat label="Pending leave requests" value={company.pendingLeave} /> : null}
            {company.activeProjects !== undefined ? (
              <Stat label="Active projects" value={company.activeProjects} hint={`${company.overdueProjects ?? 0} overdue`} />
            ) : null}
          </div>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {me ? (
          <Card title="My profile">
            <dl className="grid grid-cols-[8rem_1fr] gap-y-2 text-sm">
              <dt className="text-ink-500">Name</dt>
              <dd className="font-medium text-ink-900">{me.fullName}</dd>
              <dt className="text-ink-500">Employee ID</dt>
              <dd>{me.employeeCode}</dd>
              <dt className="text-ink-500">Department</dt>
              <dd>{me.department ?? "-"}</dd>
              <dt className="text-ink-500">Designation</dt>
              <dd>{me.designation ?? "-"}</dd>
              <dt className="text-ink-500">Reports to</dt>
              <dd>{me.manager ?? "-"}</dd>
              <dt className="text-ink-500">Joined</dt>
              <dd>{formatDateOnly(me.joiningDate)}</dd>
            </dl>
            <Link
              href={`/portal/employees/${user.employeeId}`}
              className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Open my profile
            </Link>
          </Card>
        ) : (
          <Card title="My profile">
            <p className="text-sm text-ink-600">No employee profile is linked to this account.</p>
          </Card>
        )}

        <Card title="Coming next">
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-700">
            <li>Check in / out and attendance (Phase 4)</li>
            <li>Leave requests and approvals (Phase 4)</li>
            <li>Payslips and payroll (Phase 5)</li>
            <li>Projects, tasks and timesheets (Phase 6)</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
