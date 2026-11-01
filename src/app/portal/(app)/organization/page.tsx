import type { Metadata } from "next";
import { Card, PageHeader } from "@/components/portal/ui";
import { requirePermission } from "@/modules/auth/guard";
import { getOrganizationOverview } from "@/modules/organization/service";

export const metadata: Metadata = { title: "Organization" };

export default async function OrganizationPage() {
  const user = await requirePermission("organization.view");
  const { departments, designations } = await getOrganizationOverview(user);

  return (
    <>
      <PageHeader title="Organization" description="Divisions (departments), their teams and designations." />
      {departments.length === 0 ? (
        <Card>
          <p className="text-sm text-ink-600">No departments yet. Run the seed script or add them here once management screens are built.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {departments.map((d) => (
            <Card key={d.id} title={`${d._count.employees} employee${d._count.employees === 1 ? "" : "s"}`}>
              <h2 className="font-display text-lg font-semibold text-ink-900">{d.name}</h2>
              {d.teams.length > 0 ? (
                <ul className="mt-3 divide-y divide-ink-100 text-sm">
                  {d.teams.map((t) => (
                    <li key={t.id} className="flex items-center justify-between py-2">
                      <span className="text-ink-800">{t.name}</span>
                      <span className="text-xs text-ink-500">
                        {t.leader ? `Lead: ${t.leader.firstName} ${t.leader.lastName} · ` : ""}
                        {t._count.members} member{t._count.members === 1 ? "" : "s"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-500">No teams yet.</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {designations.length > 0 ? (
        <Card title="Designations" className="mt-6">
          <p className="text-sm text-ink-700">{designations.map((x) => x.title).join(" · ")}</p>
        </Card>
      ) : null}
    </>
  );
}
