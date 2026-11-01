import { codeAcademySection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionProcessPage } from "@/components/division/SectionProcessPage";

export const metadata = buildMetadata({
  title: codeAcademySection.processLabel,
  description: codeAcademySection.seo.processDescription,
  path: `${codeAcademySection.basePath}/process`,
});

export default function CodeAcademyProcessPage() {
  return <SectionProcessPage section={codeAcademySection} />;
}
