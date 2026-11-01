import Link from "@/components/ui/SiteLink";
import { getProjectsForDivision, projects } from "@/data/projects";
import {
  afterLaunchSupport,
  clientSegments,
  crossDivisionJourney,
  developmentBrand,
  developmentFaq,
  developmentQuoteHref,
  developmentServices,
  developmentWhyChoose,
  divisionResponsibilities,
  lifecycle,
  qualityStandards,
  techStack,
} from "@/data/development";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/Cards";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { DevServiceCard } from "@/components/development/DevServiceCard";
import { Faq } from "@/components/development/Faq";

export const metadata = buildMetadata({
  title: "TanimXploit Development",
  description:
    "TanimXploit Development builds websites, web applications and software solutions: business websites, e-commerce, custom web apps, full-stack development, API integration and website redesign.",
  path: "/development",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: developmentFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function DevelopmentPage() {
  const related = getProjectsForDivision("development");
  const shownProjects = related.length > 0 ? related : projects;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Divisions", path: "/divisions" },
          { name: "TanimXploit Development", path: "/development" },
        ])}
      />
      <JsonLd data={faqJsonLd} />

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white" aria-labelledby="dev-hero-heading">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 text-sm font-medium text-brand-200">
              {developmentBrand.parent} · {developmentBrand.divisionNumber}
            </p>
            <h1 id="dev-hero-heading" className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Tanim<span className="text-brand-400">Xploit</span>{" "}
              <span className="text-accent-400">Development</span>
            </h1>
            <p className="mt-5 text-xl font-medium text-white sm:text-2xl">{developmentBrand.tagline}</p>
            <p className="mt-4 text-sm font-medium uppercase tracking-wider text-ink-300">
              {developmentBrand.scope}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={developmentQuoteHref} variant="onDark">
                Request a Quote
              </Button>
              <Button href="/development/services" variant="onDarkOutline">
                Explore Services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">What we build</p>
              <ul className="mt-4 space-y-3">
                {developmentServices.map((s) => (
                  <li key={s.slug} className="flex items-center gap-3 text-sm text-ink-100">
                    <Icon name={s.icon} className="h-5 w-5 shrink-0 text-accent-400" />
                    {s.shortTitle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. About Development */}
      <Section labelledBy="dev-about-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">About Development</p>
            <h2 id="dev-about-heading" className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Technology solutions that serve your business
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{developmentBrand.message}</p>
            <p className="mt-4 leading-relaxed text-ink-600">
              Business management, finance, sales, marketing and administration are handled centrally by{" "}
              {developmentBrand.parent}. The Development Division focuses on delivering technology solutions.
            </p>
            <p className="mt-4 text-sm text-ink-500">{developmentBrand.legalNote}</p>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-ink-900">What the Development Division does</h3>
            <ul className="mt-4 space-y-3">
              {divisionResponsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-ink-700">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 3. Services */}
      <Section tone="soft" labelledBy="dev-services-heading">
        <SectionHeading
          id="dev-services-heading"
          eyebrow="Services"
          title="Six core development services"
          description="Each service has a clear objective and scope. Pick one, or combine them as your project needs."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {developmentServices.map((s, i) => (
            <DevServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href="/development/services"
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            All services and ongoing support <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      {/* 4. Why choose us */}
      <Section tone="dark" labelledBy="dev-why-heading">
        <SectionHeading id="dev-why-heading" tone="dark" eyebrow="Why choose us" title="Trust and differentiation" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {developmentWhyChoose.map((item) => (
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

      {/* 5. Technology stack */}
      <Section labelledBy="dev-stack-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading id="dev-stack-heading" eyebrow="Technology stack" title="Tools and technologies" />
            <p className="-mt-4 leading-relaxed text-ink-600">
              We do not use every technology on every project. We select the stack that fits your requirements,
              prioritising maintainability and business value.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink-100 lg:col-span-2">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Technology stack by layer</caption>
              <thead className="bg-ink-50 text-ink-600">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Layer
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Technology
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {techStack.map((row) => (
                  <tr key={row.layer}>
                    <th scope="row" className="px-5 py-3 font-medium text-ink-900">
                      {row.layer}
                    </th>
                    <td className="px-5 py-3 text-ink-700">{row.technology}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Quality standards */}
      <Section tone="soft" labelledBy="dev-standards-heading">
        <SectionHeading
          id="dev-standards-heading"
          eyebrow="Quality standards"
          title="Standards every project follows"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualityStandards.map((s) => (
            <li key={s.area} className="rounded-2xl border border-ink-100 bg-white p-5">
              <h3 className="font-semibold text-ink-900">{s.area}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.standard}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Portfolio */}
      <Section labelledBy="dev-portfolio-heading">
        <SectionHeading
          id="dev-portfolio-heading"
          eyebrow="Portfolio"
          title="Real projects"
          description="We publish only approved work samples. More projects will be added as they are completed and approved."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shownProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* 7. Development process */}
      <Section tone="soft" labelledBy="dev-process-heading">
        <SectionHeading
          id="dev-process-heading"
          eyebrow="Development process"
          title="How we work"
          description="Every project follows the same nine-stage lifecycle, so you always know what happens next."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lifecycle.map((p) => (
            <li key={p.step} className="rounded-2xl border border-ink-100 bg-white p-5">
              <span className="text-sm font-bold text-brand-700">{p.step}</span>
              <h3 className="mt-1 font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link
            href="/development/process"
            className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
          >
            See the full process <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      {/* 8. Industries */}
      <Section labelledBy="dev-industries-heading">
        <SectionHeading
          id="dev-industries-heading"
          eyebrow="Industries and clients"
          title="Who we build for"
          description="We work with clients in Bangladesh and internationally."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clientSegments.map((seg) => (
            <div key={seg.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-ink-900">{seg.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-700">
                {seg.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* One company, multiple solutions */}
      <Section tone="soft" labelledBy="dev-journey-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="dev-journey-heading"
              eyebrow="One company, multiple solutions"
              title="More than a website"
            />
            <p className="-mt-4 leading-relaxed text-ink-600">
              TanimXploit works as one integrated service provider, not a collection of separate agencies. Your
              relationship stays with TanimXploit, and the right divisions are involved as your project needs them.
              For example, a fashion business could be supported like this:
            </p>
          </div>
          <ul className="space-y-3">
            {crossDivisionJourney.map((j) => (
              <li
                key={j.slug}
                className="flex items-center justify-between gap-4 rounded-xl border border-ink-100 bg-white px-5 py-4"
              >
                <span className="font-semibold text-ink-900">{j.division}</span>
                <span className="text-right text-sm text-ink-600">{j.work}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 9. Testimonials */}
      <Section labelledBy="dev-testimonials-heading">
        <SectionHeading id="dev-testimonials-heading" eyebrow="Client feedback" title="Genuine feedback only" />
        <p className="-mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          We publish testimonials only when they come from real clients and have been approved for publication.
          Client feedback will appear here as projects are completed.
        </p>
      </Section>

      {/* 10. FAQ */}
      <Section tone="soft" labelledBy="dev-faq-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading id="dev-faq-heading" eyebrow="FAQ" title="Common questions" />
          </div>
          <div className="lg:col-span-2">
            <Faq items={developmentFaq} />
          </div>
        </div>
      </Section>

      {/* After launch */}
      <Section labelledBy="dev-support-heading">
        <div className="rounded-3xl bg-ink-950 p-8 text-white sm:p-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-300">After launch</p>
          <h2 id="dev-support-heading" className="max-w-2xl text-3xl font-bold tracking-tight">
            A website is the start of a long-term technical relationship
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {afterLaunchSupport.map((s) => (
              <li key={s} className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-ink-100">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 11. Contact */}
      <CtaSection
        title="Tell us about your project"
        text="Share your requirements and we will recommend the right technical solution, timeline and next step."
        href={developmentQuoteHref}
        label="Request a Quote"
      />

      {/* 12. Parent company */}
      <Section tone="soft">
        <p className="text-ink-700">
          {developmentBrand.name} is part of {developmentBrand.parent}.{" "}
          <Link href="/divisions" className="font-semibold text-brand-700 hover:text-brand-900">
            See all divisions
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
