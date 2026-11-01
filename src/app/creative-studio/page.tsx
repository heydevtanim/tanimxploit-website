import Link from "@/components/ui/SiteLink";
import {
  creativeBrand,
  creativeClients,
  creativeFaq,
  creativeFocus,
  creativeJourneys,
  creativeObjectives,
  creativePackages,
  creativeQuoteHref,
  creativeResponsibilities,
  creativeServices,
  creativeWhyChoose,
  creativeWorkflow,
  designDirection,
  divisionCollaboration,
  packagePolicy,
} from "@/data/creative-studio";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { DevServiceCard } from "@/components/development/DevServiceCard";
import { Faq } from "@/components/development/Faq";

export const metadata = buildMetadata({
  title: "TanimXploit Creative Studio",
  description:
    "TanimXploit Creative Studio builds memorable brand identities and professional visual experiences: logo design, brand identity, stationery, social media design, UI/UX and marketing materials.",
  path: "/creative-studio",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: creativeFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CreativeStudioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Divisions", path: "/divisions" },
          { name: "TanimXploit Creative Studio", path: "/creative-studio" },
        ])}
      />
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white" aria-labelledby="cs-hero-heading">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-accent-400/15 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 text-sm font-medium text-brand-200">
              {creativeBrand.parent}
            </p>
            <h1 id="cs-hero-heading" className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Tanim<span className="text-brand-400">Xploit</span>{" "}
              <span className="text-accent-400">Creative Studio</span>
            </h1>
            <p className="mt-5 text-xl font-medium text-white sm:text-2xl">{creativeBrand.tagline}</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-200">{creativeBrand.positioning}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={creativeQuoteHref} variant="onDark">
                Request a Quote
              </Button>
              <Button href="/creative-studio/services" variant="onDarkOutline">
                Explore Services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2" aria-hidden="true">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Brand palette</p>
              <ul className="mt-4 grid grid-cols-5 gap-2">
                {designDirection.palette.map((c) => (
                  <li key={c.hex}>
                    <span
                      className="block aspect-square rounded-lg ring-1 ring-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-300">Typography</p>
              <p className="mt-2 text-2xl font-semibold">Inter · Poppins</p>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <Section labelledBy="cs-about-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">About Creative Studio</p>
            <h2 id="cs-about-heading" className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Design that communicates, not just decorates
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{creativeBrand.intro}</p>
            <h3 className="mt-8 text-xl font-semibold text-ink-900">What we aim to do</h3>
            <ul className="mt-3 space-y-2">
              {creativeObjectives.map((o) => (
                <li key={o} className="flex gap-3 text-ink-700">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-ink-900">What the Creative Studio does</h3>
              <ul className="mt-4 space-y-3">
                {creativeResponsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-ink-700">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-ink-500">{creativeBrand.legalNote}</p>
          </div>
        </div>
      </Section>

      {/* Focus */}
      <Section tone="soft" labelledBy="cs-focus-heading">
        <SectionHeading
          id="cs-focus-heading"
          eyebrow="Our focus"
          title="Three things we do best"
          description="We concentrate on a clear set of offers rather than promoting every possible design service at once."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {creativeFocus.map((f) => (
            <div key={f.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-accent-400">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section labelledBy="cs-services-heading">
        <SectionHeading
          id="cs-services-heading"
          eyebrow="Services"
          title="Six core creative services"
          description="Choose a single service, or combine them into a complete brand."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creativeServices.map((s, i) => (
            <DevServiceCard key={s.slug} service={s} index={i} basePath="/creative-studio/services" />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href="/creative-studio/services"
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            All services and client types <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      {/* Packages */}
      <Section tone="soft" labelledBy="cs-packages-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading id="cs-packages-heading" eyebrow="Branding packages" title="Packages that fit your stage" />
            <ul className="space-y-2 text-sm text-ink-700">
              {packagePolicy.map((p) => (
                <li key={p} className="flex gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:col-span-2">
            {creativePackages.map((pkg) => (
              <div key={pkg.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-ink-900">{pkg.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{pkg.intro}</p>
                <ol className="mt-4 space-y-2">
                  {pkg.tiers.map((t, i) => (
                    <li key={t} className="flex items-center gap-3 rounded-lg bg-ink-50 px-3 py-2 text-sm font-medium text-ink-800">
                      <span className="text-xs font-bold text-brand-700">{String(i + 1).padStart(2, "0")}</span>
                      {t}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-ink-500">Details are provided in your quotation.</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why choose */}
      <Section tone="dark" labelledBy="cs-why-heading">
        <SectionHeading id="cs-why-heading" tone="dark" eyebrow="Why choose us" title="Why TanimXploit Creative Studio" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creativeWhyChoose.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-400/15 text-accent-400">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-200">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clients */}
      <Section labelledBy="cs-clients-heading">
        <SectionHeading
          id="cs-clients-heading"
          eyebrow="Who we design for"
          title="Brands at every stage"
          description="We work with clients in Bangladesh and internationally."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creativeClients.map((c) => (
            <div key={c.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Design direction */}
      <Section tone="soft" labelledBy="cs-direction-heading">
        <SectionHeading id="cs-direction-heading" eyebrow="Design direction" title="Our own visual character" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <h3 className="font-semibold text-ink-900">Colour palette</h3>
            <ul className="mt-3 space-y-2">
              {designDirection.palette.map((c) => (
                <li key={c.hex} className="flex items-center gap-3 text-sm text-ink-700">
                  <span
                    className="h-8 w-8 rounded-md ring-1 ring-ink-200"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  <span className="font-medium">{c.name}</span>
                  <span className="font-mono text-ink-500">{c.hex}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink-900">Style and typography</h3>
            <p className="mt-3 text-sm text-ink-600">Typography: {designDirection.typography.join(" and ")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {designDirection.style.map((s) => (
                <li key={s} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink-700 ring-1 ring-ink-100">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink-900">Brand personality</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {designDirection.personality.map((s) => (
                <li key={s} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink-700 ring-1 ring-ink-100">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Portfolio */}
      <Section labelledBy="cs-portfolio-heading">
        <div className="rounded-3xl bg-ink-50 p-8 sm:p-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">Portfolio and case studies</p>
          <h2 id="cs-portfolio-heading" className="max-w-2xl text-3xl font-bold tracking-tight text-ink-900">
            Our portfolio is being built
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
            We publish only approved work. Concept and self-initiated projects are always labelled clearly and are
            never shown as client work.
          </p>
          <Button href="/creative-studio/portfolio" variant="secondary" className="mt-6">
            View portfolio plan
          </Button>
        </div>
      </Section>

      {/* Process */}
      <Section tone="soft" labelledBy="cs-process-heading">
        <SectionHeading
          id="cs-process-heading"
          eyebrow="Our process"
          title="How a design project works"
          description="Eleven steps from your first inquiry to follow-up after delivery."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creativeWorkflow.map((p) => (
            <li key={p.step} className="rounded-2xl border border-ink-100 bg-white p-5">
              <span className="text-sm font-bold text-brand-700">{p.step}</span>
              <h3 className="mt-1 font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link
            href="/creative-studio/process"
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            See the full process <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      {/* Collaboration */}
      <Section labelledBy="cs-collab-heading">
        <SectionHeading
          id="cs-collab-heading"
          eyebrow="One company, multiple solutions"
          title="Design that connects with every division"
          description="Start with a logo and continue to a website, marketing and support, or the other way round. One company coordinates the work."
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-3">
            {divisionCollaboration.map((d) => (
              <li
                key={d.slug}
                className="flex items-center justify-between gap-4 rounded-xl border border-ink-100 bg-white px-5 py-4"
              >
                <span className="font-semibold text-ink-900">{d.division}</span>
                <span className="text-right text-sm text-ink-600">{d.work}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            {creativeJourneys.map((j) => (
              <div key={j.title} className="rounded-2xl border border-ink-100 bg-ink-50 p-5">
                <h3 className="font-semibold text-ink-900">Example: {j.title}</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  {j.steps.map((s) => (
                    <li key={s.division}>
                      <span className="font-medium">{s.division}:</span> {s.work}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="soft" labelledBy="cs-faq-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading id="cs-faq-heading" eyebrow="FAQ" title="Common questions" />
          </div>
          <div className="lg:col-span-2">
            <Faq items={creativeFaq} />
          </div>
        </div>
      </Section>

      <CtaSection
        title="Let's build your brand"
        text="Tell us about your business and what you need. We will suggest the right scope, deliverables and timeline."
        href={creativeQuoteHref}
        label="Request a Quote"
      />

      <Section tone="soft">
        <p className="text-ink-700">
          {creativeBrand.name} is part of {creativeBrand.parent}.{" "}
          <Link href="/divisions" className="font-semibold text-brand-700 hover:text-brand-900">
            See all divisions
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
