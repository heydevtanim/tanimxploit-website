import Link from "@/components/ui/SiteLink";
import { siteConfig } from "@/config/site";
import { divisions } from "@/data/divisions";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { divisionSections } from "@/data/sections";
import { targetAudiences, whyChoose, workingProcess } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { DivisionCard, ProjectCard, ServiceCard } from "@/components/ui/Cards";
import { Icon } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  const featuredServices = services.filter((s) => s.status === "available").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white" aria-labelledby="hero-heading">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 text-sm font-medium text-brand-200">
              {siteConfig.legalName}
            </p>
            <h1 id="hero-heading" className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Building Digital Solutions. Empowering Ideas. Creating Opportunities.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
              TanimXploit brings together technology, creative services, and learning to help businesses and
              individuals move forward in a digital world.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/services" variant="onDark">
                Explore Our Services
              </Button>
              <Button href="/contact" variant="onDarkOutline">
                Start a Project
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2" aria-hidden="true">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-4 flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
              </div>
              <ul className="space-y-3 font-mono text-sm text-brand-200">
                <li>&gt; build.skills()</li>
                <li>&gt; create.opportunities()</li>
                <li>&gt; deliver.technology()</li>
                <li className="text-white/60">&gt; ready_</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Company introduction */}
      <Section labelledBy="intro-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">Who we are</p>
            <h2 id="intro-heading" className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              A technology-focused brand with six connected divisions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              TanimXploit offers digital development, creative services, digital growth, technical support and
              education. We work with clients in Bangladesh and internationally.
            </p>
            <Button href="/about" variant="secondary" className="mt-6">
              About TanimXploit
            </Button>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500">Who we work with</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {targetAudiences.map((a) => (
                <li key={a} className="rounded-full bg-ink-50 px-4 py-2 text-sm font-medium text-ink-700">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Divisions */}
      <Section tone="soft" labelledBy="divisions-heading">
        <SectionHeading
          id="divisions-heading"
          eyebrow="Our divisions"
          title="Six divisions, one direction"
          description="Some divisions are available today and others are planned initiatives. Each card shows its current status."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d) => (
            <DivisionCard key={d.slug} division={d} />
          ))}
        </div>
      </Section>

      {/* TanimXploit Development highlight */}
      <Section labelledBy="dev-highlight-heading">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-8 text-white sm:p-12">
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-300">
                Division 01 · TanimXploit Development
              </p>
              <h2 id="dev-highlight-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Building digital solutions that move businesses forward
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-200">
                Business websites, e-commerce, custom web applications, full-stack development, API integration
                and website redesign, delivered with clear scope and long-term support.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button href="/development" variant="onDark">
                Explore Development
              </Button>
              <Button href="/development/services" variant="onDarkOutline">
                See all services
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* TanimXploit Creative Studio highlight */}
      <Section tone="soft" labelledBy="cs-highlight-heading">
        <div className="grid gap-8 rounded-3xl border border-ink-100 bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
              TanimXploit Creative Studio
            </p>
            <h2 id="cs-highlight-heading" className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Creating meaningful brands through strategic design
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
              Logo design, brand identity, business stationery, social media design, UI/UX and marketing
              materials, designed to work together with your website.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button href="/creative-studio">Explore Creative Studio</Button>
            <Button href="/creative-studio/services" variant="secondary">
              See design services
            </Button>
          </div>
        </div>
      </Section>

      {/* More divisions: Digital, Technology Support, Code Academy */}
      <Section labelledBy="more-divisions-heading">
        <SectionHeading
          id="more-divisions-heading"
          eyebrow="More from TanimXploit"
          title="Grow it, keep it running, learn to build it"
          description="Marketing, ongoing support and technology education, each with its own section."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {divisionSections.map((d) => (
            <article
              key={d.key}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">{d.homeBand.eyebrow}</p>
              <h3 className="mt-3 text-xl font-semibold text-ink-900">{d.homeBand.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-ink-600">{d.homeBand.text}</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
                <Button href={d.basePath}>{d.homeBand.exploreLabel}</Button>
                <Button href={`${d.basePath}/${d.servicesSegment}`} variant="secondary">
                  {d.homeBand.secondaryLabel}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Featured services */}
      <Section labelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="Featured services"
          title="What we can help you with"
          description="Practical services delivered with clear scope and honest expectations."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900">
            See all services <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </p>
      </Section>

      {/* Why choose */}
      <Section tone="dark" labelledBy="why-heading">
        <SectionHeading
          id="why-heading"
          tone="dark"
          eyebrow="Why TanimXploit"
          title="Why choose TanimXploit"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-400/15 text-brand-300">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-200">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Selected projects */}
      <Section labelledBy="projects-heading">
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected projects"
          title="Our work"
          description="We publish only approved work samples. More projects will be added as they are completed and approved."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* Working process */}
      <Section tone="soft" labelledBy="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="Working process"
          title="How we work with you"
        />
        <ol className="grid gap-6 md:grid-cols-5">
          {workingProcess.map((p) => (
            <li key={p.step} className="rounded-2xl border border-ink-100 bg-white p-5">
              <span className="text-sm font-bold text-brand-700">{p.step}</span>
              <h3 className="mt-2 font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Learning and development */}
      <Section labelledBy="learning-heading">
        <div className="rounded-3xl bg-ink-50 p-8 sm:p-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
            Learning and development
          </p>
          <h2 id="learning-heading" className="max-w-2xl text-3xl font-bold tracking-tight text-ink-900">
            Building skills is part of our name
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
            TanimXploit Code Academy and TanimXploit Learning are planned education initiatives for students,
            tutors and educators. They are still in development and not yet open for enrollment, but you can
            register your interest.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/code-academy" variant="secondary">
              Code Academy
            </Button>
            <Button href="/divisions/learning" variant="secondary">
              TanimXploit Learning
            </Button>
          </div>
        </div>
      </Section>

      <CtaSection />

      {/* Contact section */}
      <Section labelledBy="home-contact-heading">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 id="home-contact-heading" className="text-3xl font-bold tracking-tight text-ink-900">
              Get in touch
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{siteConfig.responseTime}</p>
          </div>
          <div className="space-y-4">
            {siteConfig.contactEmail ? (
              <p className="flex items-center gap-3 text-ink-800">
                <Icon name="mail" className="h-5 w-5 text-brand-700" />
                <a className="font-medium text-brand-700 hover:text-brand-900" href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>
              </p>
            ) : null}
            <Button href="/contact">Send an inquiry</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
