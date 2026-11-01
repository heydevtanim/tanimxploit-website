import type { DivisionSection } from "@/data/sections/types";
import { breadcrumbJsonLd } from "@/lib/utils/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";
import { DevServiceCard } from "@/components/development/DevServiceCard";
import { Checks, ExtraBlock } from "@/components/division/shared";

export function SectionServicesPage({ section: s }: { section: DivisionSection }) {
  const servicesBase = `${s.basePath}/${s.servicesSegment}`;
  const listLabel = s.itemLabel.plural.charAt(0).toUpperCase() + s.itemLabel.plural.slice(1);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: s.brand.name, path: s.basePath },
          { name: listLabel, path: servicesBase },
        ])}
      />
      <PageHeader
        eyebrow={s.brand.name}
        title={s.status === "planned" ? "Planned curriculum" : `${s.brand.shortName} ${s.itemLabel.plural}`}
        description={s.servicesHeading.pageDescription}
      />

      <Section labelledBy="core-heading">
        <SectionHeading id="core-heading" title={s.servicesHeading.title} description={s.servicesHeading.description} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.services.map((svc, i) => (
            <DevServiceCard key={svc.slug} service={svc} index={i} basePath={servicesBase} />
          ))}
        </div>
      </Section>

      {s.offerings ? <ExtraBlock extra={s.offerings} defaultTone="soft" /> : null}

      {s.additional ? (
        <Section labelledBy="additional-heading">
          <SectionHeading
            id="additional-heading"
            eyebrow={s.additional.eyebrow}
            title={s.additional.title}
            description={s.additional.description}
          />
          <Checks items={s.additional.items} />
          {s.additional.note ? <p className="mt-6 max-w-3xl text-sm text-ink-600">{s.additional.note}</p> : null}
        </Section>
      ) : null}

      <Section tone="soft" labelledBy="clients-heading">
        <SectionHeading
          id="clients-heading"
          eyebrow={s.audience.eyebrow}
          title={s.audience.title}
          description={s.audience.description}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.audience.items.map((c) => (
            <div key={c.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{c.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.services.map((x) => (
                  <li key={x} className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-700">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection title={s.cta.title} text={s.cta.text} href={s.quoteHref} label={s.ctaLabel} />
    </>
  );
}
