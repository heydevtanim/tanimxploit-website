import type { ReactNode } from "react";
import { digitalSection } from "@/data/sections";
import { SectionLayout } from "@/components/division/SectionLayout";

export default function DigitalLayout({ children }: { children: ReactNode }) {
  return <SectionLayout section={digitalSection}>{children}</SectionLayout>;
}
