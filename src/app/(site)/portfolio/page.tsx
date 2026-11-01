import { projects } from "@/data/projects";
import { getDivision } from "@/data/divisions";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { PageHeader, Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "Portfolio",
  description: "Selected approved projects from TanimXploit.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="We publish only approved work. Confidential client work and unverified results are never shown."
      />

      <Section>
        {projects.length === 0 ? (
          <p className="text-lg text-ink-600">Our portfolio is being prepared. Please check back soon.</p>
        ) : (
          <div className="space-y-12">
            {projects.map((p) => (
              <article
                key={p.slug}
                id={p.slug}
                className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm"
              >
                <div className="grid lg:grid-cols-3">
                  <div
                    className="flex min-h-48 items-center justify-center bg-ink-950 bg-grid text-brand-300"
                    role="img"
                    aria-label={p.imageAlt ?? `Placeholder visual for ${p.name}`}
                  >
                    <Icon name="code" className="h-16 w-16" />
                  </div>
                  <div className="p-6 sm:p-8 lg:col-span-2">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">{p.category}</span>
                      <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">
                        {p.classification} project
                      </span>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-900">{p.status}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-ink-900">{p.name}</h2>
                    <p className="mt-3 leading-relaxed text-ink-600">{p.overview}</p>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Objectives</h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-700">
                          {p.objectives.map((o) => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                          Key deliverables
                        </h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-700">
                          {p.deliverables.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-500">
                      Technologies
                    </h3>
                    <p className="mt-2 text-ink-700">{p.technologies.join(", ")}</p>

                    {p.outcome ? (
                      <>
                        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-500">Outcome</h3>
                        <p className="mt-2 text-ink-700">{p.outcome}</p>
                      </>
                    ) : null}

                    <p className="mt-6 text-sm text-ink-500">
                      Division: {getDivision(p.divisionSlug)?.name ?? "TanimXploit"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <CtaSection title="Have a project in mind?" text="Let us talk about what you want to build." />
    </>
  );
}
