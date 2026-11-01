import type { Metadata } from "next";
import Link from "@/components/ui/SiteLink";
import { notFound } from "next/navigation";
import {
  developmentServices,
  getDevService,
  lifecycle,
} from "@/data/development";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return developmentServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getDevService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.objective,
    path: `/development/services/${service.slug}`,
  });
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-700">
          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function DevelopmentServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getDevService(slug);
  if (!service) notFound();

  const index = developmentServices.findIndex((s) => s.slug === service.slug);
  const others = developmentServices.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "TanimXploit Development", path: "/development" },
          { name: "Services", path: "/development/services" },
          { name: service.title, path: `/development/services/${service.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        title={service.title}
        description={service.objective}
      />

      <Section labelledBy="scope-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 id="scope-heading" className="text-3xl font-bold tracking-tight text-ink-900">
              What is included
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              <CheckList items={service.services} />
            </div>
            {service.note ? (
              <p className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-5 text-ink-800">{service.note}</p>
            ) : null}
          </div>
          <aside className="h-fit rounded-2xl border border-ink-100 bg-ink-50 p-6" aria-label="Request this service">
            <p className="text-sm leading-relaxed text-ink-700">
              Tell us what you need and we will propose the right solution, timeline and next step.
            </p>
            <Button href={`/contact?category=${service.category}`} className="mt-5 w-full">
              Request this service
            </Button>
          </aside>
        </div>
      </Section>

      {service.targetClients || service.deliverables ? (
        <Section tone="soft" labelledBy="fit-heading">
          <h2 id="fit-heading" className="sr-only">
            Who it is for and what you receive
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {service.targetClients ? (
              <div>
                <SectionHeading title="Who it is for" />
                <CheckList items={service.targetClients} />
              </div>
            ) : null}
            {service.deliverables ? (
              <div>
                <SectionHeading title="What you receive" />
                <CheckList items={service.deliverables} />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {service.highlights ? (
        <Section tone={service.targetClients || service.deliverables ? "light" : "soft"} labelledBy="more-heading">
          <h2 id="more-heading" className="sr-only">
            Integrations
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
          eyebrow="How it works"
          title="Every project follows the same lifecycle"
          description="From first inquiry to ongoing support."
        />
        <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {lifecycle.map((l) => (
            <li key={l.step} className="rounded-xl border border-ink-100 bg-white p-4 text-sm">
              <span className="font-bold text-brand-700">{l.step}</span>
              <p className="mt-1 font-semibold text-ink-900">{l.title}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6">
          <Link
            href="/development/process"
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            See the full process <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      <Section labelledBy="other-heading">
        <SectionHeading id="other-heading" title="Other development services" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/development/services/${s.slug}`}
                className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 font-medium text-ink-800 hover:border-brand-300"
              >
                <Icon name={s.icon} className="h-5 w-5 text-brand-700" />
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection href={`/contact?category=${service.category}`} label="Request this service" />
    </>
  );
}
