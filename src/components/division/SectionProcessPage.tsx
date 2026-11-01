import type { DivisionSection } from "@/data/sections/types";
import { breadcrumbJsonLd } from "@/lib/utils/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";
import { Checks, Chips } from "@/components/division/shared";

export function SectionProcessPage({ section: s }: { section: DivisionSection }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: s.brand.name, path: s.basePath },
          { name: s.processLabel, path: `${s.basePath}/process` },
        ])}
      />
      <PageHeader
        eyebrow={s.brand.name}
        title={s.processLabel}
        description={s.workflowHeading.pageDescription}
      />

      <Section labelledBy="workflow-heading">
        <SectionHeading id="workflow-heading" eyebrow={s.workflowHeading.eyebrow} title={s.workflowHeading.title} />
        <ol className="space-y-4">
          {s.workflow.map((l) => (
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

      {s.standards.map((block, i) => (
        <Section key={block.title} tone={i % 2 === 0 ? "soft" : "light"} labelledBy={`standard-${i}-heading`}>
          <SectionHeading
            id={`standard-${i}-heading`}
            eyebrow={block.eyebrow}
            title={block.title}
            description={block.intro}
          />
          <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
            <Checks items={block.items} />
          </div>
        </Section>
      ))}

      <Section tone={s.standards.length % 2 === 0 ? "soft" : "light"} labelledBy="tools-heading">
        <div className={`grid gap-10 ${s.documentation ? "md:grid-cols-2" : ""}`}>
          <div>
            <SectionHeading id="tools-heading" eyebrow="Tools" title={s.tools.title} />
            <Chips items={s.tools.items} />
            {s.tools.note ? <p className="mt-4 text-sm text-ink-600">{s.tools.note}</p> : null}
          </div>
          {s.documentation ? (
            <div>
              <SectionHeading eyebrow="Documentation" title="Organized records" />
              <p className="-mt-4 mb-4 text-ink-600">{s.documentation.intro}</p>
              <ul className="grid gap-2 font-mono text-sm sm:grid-cols-2">
                {s.documentation.folders.map((f) => (
                  <li key={f} className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-ink-700">
                    {f}/
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      <CtaSection title={s.cta.title} text={s.cta.text} href={s.quoteHref} label={s.ctaLabel} />
    </>
  );
}
