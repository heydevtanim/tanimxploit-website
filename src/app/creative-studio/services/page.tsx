import { Icon } from "@/components/ui/Icon";
import {
  creativeClients,
  creativeQuoteHref,
  creativeServices,
  designSupportExamples,
  individualDesignServices,
  uiuxProjects,
} from "@/data/creative-studio";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";
import { DevServiceCard } from "@/components/development/DevServiceCard";

export const metadata = buildMetadata({
  title: "Creative Studio Services",
  description:
    "Logo design, brand identity, business stationery, social media design, UI/UX design and marketing materials from TanimXploit Creative Studio.",
  path: "/creative-studio/services",
});

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-ink-700">
      {items.map((i) => (
        <li key={i} className="flex gap-2">
          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export default function CreativeServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "TanimXploit Creative Studio", path: "/creative-studio" },
          { name: "Services", path: "/creative-studio/services" },
        ])}
      />
      <PageHeader
        eyebrow="TanimXploit Creative Studio"
        title="Creative services"
        description="Six core design services, from a single logo to a complete brand identity and ongoing design support."
      />

      <Section labelledBy="core-heading">
        <SectionHeading id="core-heading" title="Core services" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creativeServices.map((s, i) => (
            <DevServiceCard key={s.slug} service={s} index={i} basePath="/creative-studio/services" />
          ))}
        </div>
      </Section>

      <Section tone="soft" labelledBy="ways-heading">
        <SectionHeading
          id="ways-heading"
          eyebrow="Ways to work with us"
          title="Packages, single services and monthly support"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h3 className="text-lg font-semibold text-ink-900">Individual design services</h3>
            <Bullets items={individualDesignServices} />
          </div>
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h3 className="text-lg font-semibold text-ink-900">Monthly design support</h3>
            <Bullets items={designSupportExamples} />
          </div>
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h3 className="text-lg font-semibold text-ink-900">UI/UX projects</h3>
            <Bullets items={uiuxProjects} />
          </div>
        </div>
      </Section>

      <Section labelledBy="clients-heading">
        <SectionHeading id="clients-heading" eyebrow="Who we design for" title="Services by client type" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creativeClients.map((c) => (
            <div key={c.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{c.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.services.map((s) => (
                  <li key={s} className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-700">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection href={creativeQuoteHref} label="Request a Quote" />
    </>
  );
}
