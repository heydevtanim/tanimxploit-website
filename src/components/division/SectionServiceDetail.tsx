import Link from "@/components/ui/SiteLink";
import type { DivisionSection } from "@/data/sections/types";
import type { DevService } from "@/data/development";
import { breadcrumbJsonLd } from "@/lib/utils/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";
import { Checks } from "@/components/division/shared";

export function SectionServiceDetail({ section: s, service }: { section: DivisionSection; service: DevService }) {
  const servicesBase = `${s.basePath}/${s.servicesSegment}`;
  const listLabel = s.itemLabel.plural.charAt(0).toUpperCase() + s.itemLabel.plural.slice(1);
  const index = s.services.findIndex((x) => x.slug === service.slug);
  const others = s.services.filter((x) => x.slug !== service.slug);
  const L = s.detailLabels;
  const requestHref = s.quoteHref;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: s.brand.name, path: s.basePath },
          { name: listLabel, path: servicesBase },
          { name: service.title, path: `${servicesBase}/${service.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={`${s.itemLabel.singular.charAt(0).toUpperCase()}${s.itemLabel.singular.slice(1)} ${String(index + 1).padStart(2, "0")}`}
        title={service.title}
        description={service.objective}
      />

      <Section labelledBy="scope-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 id="scope-heading" className="text-3xl font-bold tracking-tight text-ink-900">
              {L.included}
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              <Checks items={service.services} />
            </div>
            {service.note ? (
              <p className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-5 text-ink-800">{service.note}</p>
            ) : null}
          </div>
          <aside className="h-fit rounded-2xl border border-ink-100 bg-ink-50 p-6" aria-label={L.requestLabel}>
            <p className="text-sm leading-relaxed text-ink-700">{L.asideText}</p>
            <Button href={requestHref} className="mt-5 w-full">
              {L.requestLabel}
            </Button>
          </aside>
        </div>
      </Section>

      {service.targetClients || service.deliverables ? (
        <Section tone="soft" labelledBy="fit-heading">
          <h2 id="fit-heading" className="sr-only">
            {L.targetClients} and {L.deliverables}
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {service.targetClients ? (
              <div>
                <SectionHeading title={L.targetClients} />
                <Checks items={service.targetClients} />
              </div>
            ) : null}
            {service.deliverables ? (
              <div>
                <SectionHeading title={L.deliverables} />
                <Checks items={service.deliverables} />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {service.highlights ? (
        <Section tone={service.targetClients || service.deliverables ? "light" : "soft"} labelledBy="more-heading">
          <h2 id="more-heading" className="sr-only">
            More details
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {service.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-ink-900">{h.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {h.items.map((i) => (
                    <li key={i} className="rounded-full bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-700">
                      {i}
                    </li>
                  ))}
                </ul>
                {h.note ? <p className="mt-4 text-sm text-ink-600">{h.note}</p> : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="soft" labelledBy="how-heading">
        <SectionHeading
          id="how-heading"
          eyebrow={s.workflowHeading.eyebrow}
          title={s.workflowHeading.title}
          description={s.workflowHeading.description}
        />
        <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {s.workflow.map((l) => (
            <li key={l.step} className="rounded-xl border border-ink-100 bg-white p-4 text-sm">
              <span className="font-bold text-brand-700">{l.step}</span>
              <p className="mt-1 font-semibold text-ink-900">{l.title}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6">
          <Link
            href={`${s.basePath}/process`}
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            See the full {s.processLabel.toLowerCase()} <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      <Section labelledBy="other-heading">
        <SectionHeading id="other-heading" title={`Other ${s.itemLabel.plural}`} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`${servicesBase}/${o.slug}`}
                className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 font-medium text-ink-800 hover:border-brand-300"
              >
                <Icon name={o.icon} className="h-5 w-5 text-brand-700" />
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection title={s.cta.title} text={s.cta.text} href={requestHref} label={L.requestLabel} />
    </>
  );
}
