import { divisions } from "@/data/divisions";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { PageHeader, Section } from "@/components/ui/Section";
import { DivisionCard } from "@/components/ui/Cards";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "Our Divisions",
  description:
    "Explore the six TanimXploit divisions: Development, Creative Studio, Digital, Technology Support, Code Academy and Learning.",
  path: "/divisions",
});

export default function DivisionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Divisions", path: "/divisions" },
        ])}
      />
      <PageHeader
        eyebrow="Divisions"
        title="Our six divisions"
        description="Each division has its own focus. Divisions marked Planned are initiatives in development, not yet operating services."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d) => (
            <DivisionCard key={d.slug} division={d} />
          ))}
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
