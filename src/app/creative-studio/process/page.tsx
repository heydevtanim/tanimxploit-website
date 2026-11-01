import {
  creativeDocumentation,
  creativeQuality,
  creativeQuoteHref,
  creativeWorkflow,
  deliveryFormats,
  designTools,
  packagePolicy,
} from "@/data/creative-studio";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata = buildMetadata({
  title: "Our Creative Process",
  description:
    "How TanimXploit Creative Studio works: eleven clear steps from inquiry and research to design, revision, delivery and follow-up.",
  path: "/creative-studio/process",
});

function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-ink-700">
          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export default function CreativeProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "TanimXploit Creative Studio", path: "/creative-studio" },
          { name: "Our Process", path: "/creative-studio/process" },
        ])}
      />
      <PageHeader
        eyebrow="TanimXploit Creative Studio"
        title="Our creative process"
        description="Every design project follows the same workflow, so scope, feedback and delivery are always clear."
      />

      <Section labelledBy="workflow-heading">
        <SectionHeading id="workflow-heading" eyebrow="Workflow" title="From inquiry to follow-up" />
        <ol className="space-y-4">
          {creativeWorkflow.map((l) => (
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

      <Section tone="soft" labelledBy="scope-heading">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading id="scope-heading" eyebrow="Scope" title="How we scope and price work" />
            <Checks items={packagePolicy} />
          </div>
          <div>
            <SectionHeading eyebrow="Delivery" title="What you receive" />
            <p className="-mt-4 mb-4 text-ink-600">Final files in the formats your project needs:</p>
            <ul className="flex flex-wrap gap-2">
              {deliveryFormats.map((f) => (
                <li key={f} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink-700 ring-1 ring-ink-100">
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 mb-3 text-ink-600">Every project is organised in a consistent folder structure:</p>
            <ul className="grid gap-2 font-mono text-sm sm:grid-cols-2">
              {creativeDocumentation.map((f) => (
                <li key={f} className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-ink-700">
                  {f}/
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="quality-heading">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              id="quality-heading"
              eyebrow="Quality standards"
              title="What we check on every project"
            />
            <Checks items={creativeQuality} />
            <p className="mt-6 text-sm text-ink-600">
              We never copy another brand's logo, template or design. Commercial licences for stock assets, fonts
              and software are verified before use.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Tools" title="Design tools" />
            <ul className="flex flex-wrap gap-2">
              {designTools.map((t) => (
                <li key={t} className="rounded-full bg-ink-50 px-4 py-2 text-sm font-medium text-ink-700">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaSection href={creativeQuoteHref} label="Request a Quote" />
    </>
  );
}
