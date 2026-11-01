import { siteConfig } from "@/config/site";
import { approachSteps, coreValues } from "@/data/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about TanimXploit Technology Services: our vision, mission, core values and how we work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <PageHeader
        eyebrow="About us"
        title="About TanimXploit"
        description={siteConfig.tagline}
      />

      <Section labelledBy="overview-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="overview-heading" className="text-3xl font-bold tracking-tight text-ink-900">
              Company overview
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              {siteConfig.legalName} is a technology-focused business brand offering digital development,
              creative services, digital growth, technical support and education.
            </p>
            <p className="mt-4 leading-relaxed text-ink-600">
              We serve startups, small and medium-sized businesses, e-commerce businesses and corporate
              organizations, as well as students, tutors and educators, in Bangladesh and internationally.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-ink-100 p-6">
              <h3 className="text-lg font-semibold text-ink-900">Vision</h3>
              <p className="mt-2 leading-relaxed text-ink-600">
                To be a trusted technology brand that turns skills into opportunities for businesses and
                individuals.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 p-6">
              <h3 className="text-lg font-semibold text-ink-900">Mission</h3>
              <p className="mt-2 leading-relaxed text-ink-600">
                To deliver reliable digital solutions and accessible learning, built with quality, honesty and
                care.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-500">
          Vision and mission wording is a draft and must be approved by the Founder &amp; CEO before launch.
        </p>
      </Section>

      <Section tone="soft" labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="Core values" title="What guides our work" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v) => (
            <li key={v.title} className="rounded-2xl border border-ink-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-ink-900">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="philosophy-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="philosophy-heading" className="text-3xl font-bold tracking-tight text-ink-900">
              Business philosophy
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              Technology should solve a real problem. We prefer clear scope, simple architecture and honest
              communication over inflated promises, so clients know exactly what they are getting.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink-900">Working approach</h2>
            <ol className="mt-4 space-y-4">
              {approachSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-900">{s.title}</h3>
                    <p className="text-ink-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="soft" labelledBy="direction-heading">
        <SectionHeading
          id="direction-heading"
          eyebrow="Direction"
          title="Company development direction"
          description="We are growing step by step. Development, creative, digital and support services come first, followed by our education initiatives, TanimXploit Code Academy and TanimXploit Learning, which are currently in planning."
        />
      </Section>

      <CtaSection title="Want to work with us?" text="Tell us about your project, partnership idea or learning interest." />
    </>
  );
}
