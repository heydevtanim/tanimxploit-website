import type { DivisionSection } from "@/data/sections/types";
import { breadcrumbJsonLd } from "@/lib/utils/seo";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";

export function SectionPortfolioPage({ section: s }: { section: DivisionSection }) {
  const p = s.portfolio;
  if (!p) return null;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: s.brand.name, path: s.basePath },
          { name: "Portfolio", path: `${s.basePath}/portfolio` },
        ])}
      />
      <PageHeader eyebrow={s.brand.name} title="Portfolio and case studies" description={p.text} />

      <Section labelledBy="planned-heading">
        <SectionHeading
          id="planned-heading"
          eyebrow="In preparation"
          title={p.plannedTitle}
          description={p.plannedDescription}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.concepts.map((c) => (
            <li key={c} className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5">
              <span className="w-fit rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                {p.conceptLabel}
              </span>
              <h3 className="font-semibold text-ink-900">{c}</h3>
              <p className="text-sm text-ink-500">Case study coming soon</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" labelledBy="casestudy-heading">
        <SectionHeading id="casestudy-heading" eyebrow="Case studies" title={p.caseStudyTitle} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {p.caseStudy.map((c) => (
            <li key={c} className="flex gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-ink-700">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection title={p.ctaTitle} text={p.ctaText} href={s.quoteHref} label={s.ctaLabel} />
    </>
  );
}
