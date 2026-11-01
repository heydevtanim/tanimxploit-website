import { codeAcademySection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionOverview } from "@/components/division/SectionOverview";

export const metadata = buildMetadata({
  title: codeAcademySection.brand.name,
  description: codeAcademySection.seo.overviewDescription,
  path: codeAcademySection.basePath,
});

export default function CodeAcademyPage() {
  return <SectionOverview section={codeAcademySection} />;
}
