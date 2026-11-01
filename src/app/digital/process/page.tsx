import { digitalSection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionProcessPage } from "@/components/division/SectionProcessPage";

export const metadata = buildMetadata({
  title: digitalSection.processLabel,
  description: digitalSection.seo.processDescription,
  path: `${digitalSection.basePath}/process`,
});

export default function DigitalProcessPage() {
  return <SectionProcessPage section={digitalSection} />;
}
