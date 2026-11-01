import type { ReactNode } from "react";
import { codeAcademySection } from "@/data/sections";
import { SectionLayout } from "@/components/division/SectionLayout";

export default function CodeAcademyLayout({ children }: { children: ReactNode }) {
  return <SectionLayout section={codeAcademySection}>{children}</SectionLayout>;
}
