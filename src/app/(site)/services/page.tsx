import { services } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/Cards";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Websites, e-commerce, custom software, API integration, logo and brand identity, social media and UI/UX design, social media management and SEO, website maintenance and technical support from TanimXploit.",
  path: "/services",
});

export default function ServicesPage() {
  const available = services.filter((s) => s.status === "available");
  const planned = services.filter((s) => s.status === "planned");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHeader
        eyebrow="Services"
        title="Services"
        description="Practical technology, creative and support services with clear scope. We do not guarantee rankings, sales or specific business results."
      />

      <Section labelledBy="available-heading">
        <SectionHeading
          id="available-heading"
          title="Available now"
          description="Services we are ready to deliver. Services come from TanimXploit Development, Creative Studio, Digital and Technology Support."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {available.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section tone="soft" labelledBy="planned-heading">
        <SectionHeading
          id="planned-heading"
          title="Planned initiatives"
          description="These are in development and are not yet operating services. You can register your interest."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {planned.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
