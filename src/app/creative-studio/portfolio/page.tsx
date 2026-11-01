import {
  caseStudyStructure,
  creativeQuoteHref,
  plannedConceptProjects,
} from "@/data/creative-studio";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata = buildMetadata({
  title: "Creative Studio Portfolio",
  description:
    "The TanimXploit Creative Studio portfolio is being built. Concept projects are always labelled and never shown as client work.",
  path: "/creative-studio/portfolio",
});

export default function CreativePortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "TanimXploit Creative Studio", path: "/creative-studio" },
          { name: "Portfolio", path: "/creative-studio/portfolio" },
        ])}
      />
      <PageHeader
        eyebrow="TanimXploit Creative Studio"
        title="Portfolio and case studies"
        description="Our portfolio is being prepared. We publish only approved work, and concept projects are always labelled as concepts."
      />

      <Section labelledBy="planned-heading">
        <SectionHeading
          id="planned-heading"
          eyebrow="In preparation"
          title="Concept and self-initiated projects"
          description="These projects are in preparation. They are concept work and are not client projects."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plannedConceptProjects.map((p) => (
            <li key={p} className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5">
              <span className="w-fit rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                Concept / Self-initiated
              </span>
              <h3 className="font-semibold text-ink-900">{p}</h3>
              <p className="text-sm text-ink-500">Case study coming soon</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" labelledBy="casestudy-heading">
        <SectionHeading
          id="casestudy-heading"
          eyebrow="Case studies"
          title="What every case study will show"
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudyStructure.map((c) => (
            <li key={c} className="flex gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-ink-700">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection
        title="Have a brand in mind?"
        text="Tell us about your business and we will suggest the right design approach."
        href={creativeQuoteHref}
        label="Request a Quote"
      />
    </>
  );
}
