import type { Metadata } from "next";
import Link from "@/components/ui/SiteLink";
import { notFound, redirect } from "next/navigation";
import { divisionHref, divisions, getDivision } from "@/data/divisions";
import { getProjectsForDivision } from "@/data/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/Cards";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  // Divisions with their own section (href) are not rendered here.
  return divisions.filter((d) => !d.href).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};
  return buildMetadata({
    title: division.name,
    description: division.summary,
    path: `/divisions/${division.slug}`,
  });
}

export default async function DivisionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();
  if (division.href) redirect(divisionHref(division));

  const related = getProjectsForDivision(division.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Divisions", path: "/divisions" },
          { name: division.name, path: `/divisions/${division.slug}` },
        ])}
      />
      <PageHeader eyebrow="Division" title={division.name} description={division.summary} />

      <Section labelledBy="intro-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 id="intro-heading" className="text-3xl font-bold tracking-tight text-ink-900">
              Division introduction
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{division.description}</p>
            <h3 className="mt-8 text-xl font-semibold text-ink-900">Main focus</h3>
            <p className="mt-2 text-ink-600">{division.mainFocus}</p>
          </div>
          <aside className="h-fit rounded-2xl border border-ink-100 bg-ink-50 p-6" aria-label="Division status">
            <div className="flex items-center justify-between gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={division.icon} />
              </span>
              <StatusBadge status={division.status} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">{division.statusNote}</p>
            <Button href={`/contact?category=${division.category}`} className="mt-5 w-full">
              {division.ctaLabel}
            </Button>
          </aside>
        </div>
      </Section>

      <Section tone="soft" labelledBy="activities-heading">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              id="activities-heading"
              title={division.status === "available" ? "Services and activities" : "Planned activities"}
            />
            <ul className="space-y-3">
              {division.activities.map((a) => (
                <li key={a} className="flex gap-3 text-ink-700">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Relevant capabilities" />
            <ul className="space-y-3">
              {division.capabilities.map((c) => (
                <li key={c} className="flex gap-3 text-ink-700">
                  <Icon name="spark" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section labelledBy="related-heading">
          <SectionHeading id="related-heading" title="Related projects" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="soft">
        <p className="text-ink-700">
          Looking for something else?{" "}
          <Link href="/divisions" className="font-semibold text-brand-700 hover:text-brand-900">
            See all divisions
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
