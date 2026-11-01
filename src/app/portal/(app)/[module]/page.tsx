import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Card, PageHeader } from "@/components/portal/ui";
import { canAny } from "@/lib/portal/access";
import { FORBIDDEN_PATH } from "@/lib/portal/constants";
import { findModule } from "@/lib/portal/navigation";
import { requireUser } from "@/modules/auth/guard";

export const metadata: Metadata = { title: "Coming soon" };

/** Roadmap placeholder for modules that are specified but not built yet. Still permission-checked. */
export default async function PlannedModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: key } = await params;
  const mod = findModule(key);
  if (!mod) notFound();

  const user = await requireUser();
  if (mod.anyOf.length > 0 && !canAny(user, mod.anyOf)) redirect(FORBIDDEN_PATH);
  if (mod.status === "live") redirect(mod.href);

  return (
    <>
      <PageHeader title={mod.label} description={mod.description} />
      <Card title={`Planned for ${mod.phase}`}>
        {mod.planned.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-700">
            {mod.planned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        <p className="mt-4 text-sm text-ink-500">This module is part of the approved specification and is not built yet.</p>
      </Card>
      <Link href="/portal/dashboard" className="mt-6 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
        Back to dashboard
      </Link>
    </>
  );
}
