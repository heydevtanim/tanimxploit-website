import { technologySupportSection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionProcessPage } from "@/components/division/SectionProcessPage";

export const metadata = buildMetadata({
  title: technologySupportSection.processLabel,
  description: technologySupportSection.seo.processDescription,
  path: `${technologySupportSection.basePath}/process`,
});

export default function TechnologySupportProcessPage() {
  return <SectionProcessPage section={technologySupportSection} />;
}
