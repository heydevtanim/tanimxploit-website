import { digitalSection } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionPortfolioPage } from "@/components/division/SectionPortfolioPage";

export const metadata = buildMetadata({
  title: "Digital Portfolio",
  description: digitalSection.seo.portfolioDescription ?? digitalSection.seo.overviewDescription,
  path: `${digitalSection.basePath}/portfolio`,
});

export default function DigitalPortfolioPage() {
  return <SectionPortfolioPage section={digitalSection} />;
}
