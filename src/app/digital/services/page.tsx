import { digitalSection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionServicesPage } from "@/components/division/SectionServicesPage";

export const metadata = buildMetadata({
  title: digitalSection.status === "planned" ? "Planned Curriculum" : `${digitalSection.brand.shortName} Services`,
  description: digitalSection.seo.servicesDescription,
  path: `${digitalSection.basePath}/${digitalSection.servicesSegment}`,
});

export default function DigitalServicesPage() {
  return <SectionServicesPage section={digitalSection} />;
}
