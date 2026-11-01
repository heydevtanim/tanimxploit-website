import Link from "@/components/ui/SiteLink";
import type { DivisionSection } from "@/data/sections/types";
import { breadcrumbJsonLd } from "@/lib/utils/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CtaSection } from "@/components/sections/CtaSection";
import { DevServiceCard } from "@/components/development/DevServiceCard";
import { Faq } from "@/components/development/Faq";
import { Checks, ExtraBlock } from "@/components/division/shared";

export function SectionOverview({ section: s }: { section: DivisionSection }) {
  const k = s.key;
  const servicesBase = `${s.basePath}/${s.servicesSegment}`;


  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Divisions", path: "/divisions" },
          { name: s.brand.name, path: s.basePath },
        ])}
      />
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white" aria-labelledby={`${k}-hero-heading`}>
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-accent-400/15 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-sm font-medium text-brand-200">
                {s.brand.parent}
              </span>
              <StatusBadge status={s.status} />
            </p>
            <h1 id={`${k}-hero-heading`} className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Tanim<span className="text-brand-400">Xploit</span>{" "}
              <span className="text-accent-400">{s.brand.shortName}</span>
            </h1>
            <p className="mt-5 text-xl font-medium text-white sm:text-2xl">{s.brand.tagline}</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-200">{s.brand.positioning}</p>
            {s.status === "planned" ? (
              <p className="mt-4 max-w-2xl rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                {s.statusNote}
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={s.quoteHref} variant="onDark">
                {s.ctaLabel}
              </Button>
              <Button href={servicesBase} variant="onDarkOutline">
                {s.status === "planned" ? "See the curriculum" : "Explore Services"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2" aria-hidden="true">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">{s.hero.panelLabel}</p>
              <ul className="mt-4 space-y-3">
                {s.hero.panelItems.map((i) => (
                  <li key={i} className="flex gap-3 text-lg font-semibold">
                    <Icon name="spark" className="mt-1 h-5 w-5 shrink-0 text-accent-400" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <Section labelledBy={`${k}-about-heading`}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">{s.about.eyebrow}</p>
            <h2 id={`${k}-about-heading`} className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {s.about.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{s.brand.intro}</p>
            <h3 className="mt-8 text-xl font-semibold text-ink-900">{s.about.objectivesTitle}</h3>
            <div className="mt-3">
              <Checks items={s.about.objectives} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-ink-900">{s.about.responsibilitiesTitle}</h3>
              <div className="mt-4">
                <Checks items={s.about.responsibilities} />
              </div>
            </div>
            <p className="text-sm text-ink-500">{s.brand.legalNote}</p>
          </div>
        </div>
      </Section>

      {/* Focus */}
      <Section tone="soft" labelledBy={`${k}-focus-heading`}>
        <SectionHeading
          id={`${k}-focus-heading`}
          eyebrow="Our focus"
          title={s.focus.title}
          description={s.focus.description}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {s.focus.items.map((f) => (
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

      {/* Services / courses */}
      <Section labelledBy={`${k}-services-heading`}>
        <SectionHeading
          id={`${k}-services-heading`}
          eyebrow={s.servicesHeading.eyebrow}
          title={s.servicesHeading.title}
          description={s.servicesHeading.description}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.services.map((svc, i) => (
            <DevServiceCard key={svc.slug} service={svc} index={i} basePath={servicesBase} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href={servicesBase}
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            All {s.itemLabel.plural} <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      {s.offerings ? <ExtraBlock extra={s.offerings} defaultTone="soft" /> : null}

      {s.additional ? (
        <Section labelledBy={`${k}-additional-heading`}>
          <SectionHeading
            id={`${k}-additional-heading`}
            eyebrow={s.additional.eyebrow}
            title={s.additional.title}
            description={s.additional.description}
          />
          <Checks items={s.additional.items} />
          {s.additional.note ? <p className="mt-6 max-w-3xl text-sm text-ink-600">{s.additional.note}</p> : null}
        </Section>
      ) : null}

      {/* Why choose */}
      <Section tone="dark" labelledBy={`${k}-why-heading`}>
        <SectionHeading id={`${k}-why-heading`} tone="dark" eyebrow="Why choose us" title={s.whyTitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.whyChoose.map((item) => (
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

      {/* Audience */}
      <Section labelledBy={`${k}-audience-heading`}>
        <SectionHeading
          id={`${k}-audience-heading`}
          eyebrow={s.audience.eyebrow}
          title={s.audience.title}
          description={s.audience.description}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.audience.items.map((c) => (
            <div key={c.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {s.extras?.map((extra) => <ExtraBlock key={extra.id} extra={extra} />)}

      {/* Portfolio teaser */}
      {s.portfolio ? (
        <Section labelledBy={`${k}-portfolio-heading`}>
          <div className="rounded-3xl bg-ink-50 p-8 sm:p-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">{s.portfolio.eyebrow}</p>
            <h2 id={`${k}-portfolio-heading`} className="max-w-2xl text-3xl font-bold tracking-tight text-ink-900">
              {s.portfolio.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">{s.portfolio.text}</p>
            <Button href={`${s.basePath}/portfolio`} variant="secondary" className="mt-6">
              View portfolio plan
            </Button>
          </div>
        </Section>
      ) : null}

      {/* Process */}
      <Section tone="soft" labelledBy={`${k}-process-heading`}>
        <SectionHeading
          id={`${k}-process-heading`}
          eyebrow={s.workflowHeading.eyebrow}
          title={s.workflowHeading.title}
          description={s.workflowHeading.description}
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.workflow.map((p) => (
            <li key={p.step} className="rounded-2xl border border-ink-100 bg-white p-5">
              <span className="text-sm font-bold text-brand-700">{p.step}</span>
              <h3 className="mt-1 font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link
            href={`${s.basePath}/process`}
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            See the full {s.processLabel.toLowerCase()} <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      {/* Collaboration */}
      <Section labelledBy={`${k}-collab-heading`}>
        <SectionHeading
          id={`${k}-collab-heading`}
          eyebrow={s.collaborationHeading.eyebrow}
          title={s.collaborationHeading.title}
          description={s.collaborationHeading.description}
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-3">
            {s.collaboration.map((d) => (
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
            {s.journeys.map((j) => (
              <div key={j.title} className="rounded-2xl border border-ink-100 bg-ink-50 p-5">
                <h3 className="font-semibold text-ink-900">Example: {j.title}</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  {j.steps.map((st) => (
                    <li key={st.division}>
                      <span className="font-medium">{st.division}:</span> {st.work}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="soft" labelledBy={`${k}-faq-heading`}>
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading id={`${k}-faq-heading`} eyebrow="FAQ" title="Common questions" />
          </div>
          <div className="lg:col-span-2">
            <Faq items={s.faq} />
          </div>
        </div>
      </Section>

      <CtaSection title={s.cta.title} text={s.cta.text} href={s.quoteHref} label={s.ctaLabel} />

      <Section tone="soft">
        <p className="text-ink-700">
          {s.brand.name} is part of {s.brand.parent}.{" "}
          <Link href="/divisions" className="font-semibold text-brand-700 hover:text-brand-900">
            See all divisions
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
