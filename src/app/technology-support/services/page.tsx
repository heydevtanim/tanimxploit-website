import { technologySupportSection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionServicesPage } from "@/components/division/SectionServicesPage";

export const metadata = buildMetadata({
  title: technologySupportSection.status === "planned" ? "Planned Curriculum" : `${technologySupportSection.brand.shortName} Services`,
  description: technologySupportSection.seo.servicesDescription,
  path: `${technologySupportSection.basePath}/${technologySupportSection.servicesSegment}`,
});

export default function TechnologySupportServicesPage() {
  return <SectionServicesPage section={technologySupportSection} />;
}
