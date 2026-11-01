import type { ReactNode } from "react";
import { DivisionHeader, type DivisionNavItem } from "@/components/navigation/DivisionHeader";
import { DivisionShell } from "@/components/layout/DivisionShell";
import { developmentQuoteHref } from "@/data/development";

const items: DivisionNavItem[] = [
  { label: "Overview", path: "", match: "exact" },
  { label: "Services", path: "/services", match: "prefix" },
  { label: "Portfolio", site: "/portfolio", match: "none" },
  { label: "Our Process", path: "/process", match: "prefix" },
  { label: "Contact", site: "/contact", match: "none" },
];

export default function DevelopmentLayout({ children }: { children: ReactNode }) {
  return (
    <DivisionShell
      header={
        <DivisionHeader
          division="development"
          label="Development"
          ariaLabel="TanimXploit Development"
          items={items}
          quoteHref={developmentQuoteHref}
        />
      }
    >
      {children}
    </DivisionShell>
  );
}
