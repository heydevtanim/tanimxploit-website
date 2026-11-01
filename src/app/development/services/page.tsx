import Link from "@/components/ui/SiteLink";
import {
  additionalServices,
  afterLaunchSupport,
  developmentQuoteHref,
  developmentServices,
} from "@/data/development";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";
import { DevServiceCard } from "@/components/development/DevServiceCard";

export const metadata = buildMetadata({
  title: "Development Services",
  description:
    "Business websites, e-commerce, custom web applications, full-stack development, API integration, website redesign, and ongoing maintenance from TanimXploit Development.",
  path: "/development/services",
});

export default function DevelopmentServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "TanimXploit Development", path: "/development" },
          { name: "Services", path: "/development/services" },
        ])}
      />
      <PageHeader
        eyebrow="TanimXploit Development"
        title="Development services"
        description="Six core services, plus ongoing support to keep your website or software secure, fast and up to date."
      />

      <Section labelledBy="core-heading">
        <SectionHeading id="core-heading" title="Core services" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {developmentServices.map((s, i) => (
            <DevServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      <Section tone="soft" labelledBy="additional-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading
              id="additional-heading"
              eyebrow="Ongoing support"
              title="Additional services"
            />
            <p className="-mt-4 leading-relaxed text-ink-600">
              After launch, a website or application still needs care. We can stay with you as a long-term
              technical partner:
            </p>
            <ul className="mt-4 space-y-2 text-ink-700">
              {afterLaunchSupport.map((s) => (
                <li key={s} className="flex gap-2">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white lg:col-span-2">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Additional services and how they are engaged</caption>
              <thead className="bg-ink-50 text-ink-600">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Service
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Engagement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {additionalServices.map((s) => (
                  <tr key={s.name}>
                    <th scope="row" className="px-5 py-3 font-medium text-ink-900">
                      {s.name}
                    </th>
                    <td className="px-5 py-3 text-ink-700">{s.engagement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-ink-100 px-5 py-4 text-sm text-ink-600">
              Looking for ongoing help only?{" "}
              <Link
                href="/contact?category=TECHNICAL_SUPPORT"
                className="font-semibold text-brand-700 hover:text-brand-900"
              >
                Ask for technical support
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <CtaSection href={developmentQuoteHref} label="Request a Quote" />
    </>
  );
}
