import type { ReactNode } from "react";
import { technologySupportSection } from "@/data/sections";
import { SectionLayout } from "@/components/division/SectionLayout";

export default function TechnologySupportLayout({ children }: { children: ReactNode }) {
  return <SectionLayout section={technologySupportSection}>{children}</SectionLayout>;
}
