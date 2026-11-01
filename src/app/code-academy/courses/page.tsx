import { codeAcademySection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionServicesPage } from "@/components/division/SectionServicesPage";

export const metadata = buildMetadata({
  title: codeAcademySection.status === "planned" ? "Planned Curriculum" : `${codeAcademySection.brand.shortName} Services`,
  description: codeAcademySection.seo.servicesDescription,
  path: `${codeAcademySection.basePath}/${codeAcademySection.servicesSegment}`,
});

export default function CodeAcademyServicesPage() {
  return <SectionServicesPage section={codeAcademySection} />;
}
