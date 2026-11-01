import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Card, EmploymentBadge, PageHeader, titleCase } from "@/components/portal/ui";
import { formatDateOnly } from "@/lib/portal/dates";
import { requirePermission } from "@/modules/auth/guard";
import { getEmployeeProfile } from "@/modules/employees/service";

export const metadata: Metadata = { title: "Employee profile" };

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-ink-900">{children}</dd>
    </>
  );
}

export default async function EmployeeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requirePermission("employee.view_own", "employee.view_team", "employee.view_directory", "employee.view_all");
  const { id } = await params;
  const profile = await getEmployeeProfile(user, id);
  // Same response for "does not exist" and "not allowed": record existence is not revealed.
  if (!profile) notFound();

  return (
    <>
      <PageHeader
        title={profile.directory.fullName}
        description={`${profile.directory.employeeCode}${profile.directory.designation ? ` · ${profile.directory.designation}` : ""}`}
        actions={<EmploymentBadge status={profile.directory.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Directory">
          <dl className="grid grid-cols-[9rem_1fr] gap-y-2 text-sm">
            <Row label="Employee ID">{profile.directory.employeeCode}</Row>
            <Row label="Department">{profile.directory.department ?? "-"}</Row>
            <Row label="Designation">{profile.directory.designation ?? "-"}</Row>
          </dl>
        </Card>

        {profile.employment ? (
          <Card title="Employment">
            <dl className="grid grid-cols-[9rem_1fr] gap-y-2 text-sm">
              <Row label="Team">{profile.employment.team ?? "-"}</Row>
              <Row label="Reports to">{profile.employment.manager ?? "-"}</Row>
              <Row label="Work mode">{titleCase(profile.employment.workMode)}</Row>
              <Row label="Employment type">{titleCase(profile.employment.employmentType)}</Row>
              <Row label="Work location">{profile.employment.workLocation ?? "-"}</Row>
              <Row label="Joined">{formatDateOnly(profile.employment.joiningDate)}</Row>
            </dl>
          </Card>
        ) : null}

        {profile.contact ? (
          <Card title="Contact">
            <dl className="grid grid-cols-[9rem_1fr] gap-y-2 text-sm">
              <Row label="Phone">{profile.contact.phone ?? "-"}</Row>
            </dl>
          </Card>
        ) : null}

        {profile.personal ? (
          <Card title="Personal">
            <dl className="grid grid-cols-[9rem_1fr] gap-y-2 text-sm">
              <Row label="Date of birth">{profile.personal.dateOfBirth ? formatDateOnly(profile.personal.dateOfBirth) : "-"}</Row>
              <Row label="Address">{profile.personal.address ?? "-"}</Row>
            </dl>
            <p className="mt-3 text-xs text-ink-400">Access to personal data is logged.</p>
          </Card>
        ) : null}
      </div>

      <Link href="/portal/employees" className="mt-6 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
        Back to employees
      </Link>
    </>
  );
}
