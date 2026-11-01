import { digitalSection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionOverview } from "@/components/division/SectionOverview";

export const metadata = buildMetadata({
  title: digitalSection.brand.name,
  description: digitalSection.seo.overviewDescription,
  path: digitalSection.basePath,
});

export default function DigitalPage() {
  return <SectionOverview section={digitalSection} />;
}
