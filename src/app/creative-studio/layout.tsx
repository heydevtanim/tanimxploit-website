import type { ReactNode } from "react";
import { DivisionHeader, type DivisionNavItem } from "@/components/navigation/DivisionHeader";
import { DivisionShell } from "@/components/layout/DivisionShell";
import { creativeQuoteHref } from "@/data/creative-studio";

const items: DivisionNavItem[] = [
  { label: "Overview", path: "", match: "exact" },
  { label: "Services", path: "/services", match: "prefix" },
  { label: "Portfolio", path: "/portfolio", match: "prefix" },
  { label: "Our Process", path: "/process", match: "prefix" },
  { label: "Contact", site: "/contact", match: "none" },
];

export default function CreativeStudioLayout({ children }: { children: ReactNode }) {
  return (
    <DivisionShell
      header={
        <DivisionHeader
          division="creative-studio"
          label="Creative Studio"
          ariaLabel="TanimXploit Creative Studio"
          items={items}
          quoteHref={creativeQuoteHref}
        />
      }
    >
      {children}
    </DivisionShell>
  );
}
