import {
  agreementCovers,
  developmentQuoteHref,
  lifecycle,
  projectDocumentation,
  projectPractices,
  qualityStandards,
} from "@/data/development";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata = buildMetadata({
  title: "Our Development Process",
  description:
    "How TanimXploit Development delivers projects: nine clear stages from inquiry and requirements to deployment, handover and ongoing support.",
  path: "/development/process",
});

export default function DevelopmentProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "TanimXploit Development", path: "/development" },
          { name: "Our Process", path: "/development/process" },
        ])}
      />
      <PageHeader
        eyebrow="TanimXploit Development"
        title="Our development process"
        description="A standard nine-stage workflow gives every project a clear scope, visible milestones and a proper handover."
      />

      <Section labelledBy="lifecycle-heading">
        <SectionHeading id="lifecycle-heading" eyebrow="Project lifecycle" title="From inquiry to ongoing support" />
        <ol className="space-y-4">
          {lifecycle.map((l) => (
            <li key={l.step} className="flex gap-5 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-sm font-bold text-accent-400">
                {l.step}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink-900">{l.title}</h3>
                <p className="mt-1 leading-relaxed text-ink-600">{l.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="soft" labelledBy="agreement-heading">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading id="agreement-heading" eyebrow="Agreement" title="What your agreement states clearly" />
            <ul className="space-y-3">
              {agreementCovers.map((a) => (
                <li key={a} className="flex gap-3 text-ink-700">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-600">
              Milestones and payment terms are set for each project and written into the agreement.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Organisation" title="How each project is organised" />
            <p className="-mt-4 mb-4 text-ink-600">
              Every project has {projectPractices.join(", ")}, and its documents are kept in a consistent
              folder structure:
            </p>
            <ul className="grid gap-2 font-mono text-sm sm:grid-cols-2">
              {projectDocumentation.map((f) => (
                <li key={f} className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-ink-700">
                  {f}/
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="quality-heading">
        <SectionHeading
          id="quality-heading"
          eyebrow="Quality assurance"
          title="What we check before delivery"
          description="Our standards apply to every project, whatever its size."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualityStandards.map((s) => (
            <li key={s.area} className="rounded-2xl border border-ink-100 bg-white p-5">
              <h3 className="font-semibold text-ink-900">{s.area}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.standard}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection href={developmentQuoteHref} label="Request a Quote" />
    </>
  );
}
