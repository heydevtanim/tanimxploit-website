import { technologySupportSection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionOverview } from "@/components/division/SectionOverview";

export const metadata = buildMetadata({
  title: technologySupportSection.brand.name,
  description: technologySupportSection.seo.overviewDescription,
  path: technologySupportSection.basePath,
});

export default function TechnologySupportPage() {
  return <SectionOverview section={technologySupportSection} />;
}
