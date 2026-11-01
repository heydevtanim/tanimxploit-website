import type { ReactNode } from "react";
import type { DivisionSection } from "@/data/sections/types";
import { DivisionHeader, type DivisionNavItem } from "@/components/navigation/DivisionHeader";
import { DivisionShell } from "@/components/layout/DivisionShell";

export function SectionLayout({ section: s, children }: { section: DivisionSection; children: ReactNode }) {
  const listLabel = s.itemLabel.plural.charAt(0).toUpperCase() + s.itemLabel.plural.slice(1);
  const items: DivisionNavItem[] = [
    { label: "Overview", path: "", match: "exact" },
    { label: listLabel, path: `/${s.servicesSegment}`, match: "prefix" },
    ...(s.hasPortfolio ? [{ label: "Portfolio", path: "/portfolio", match: "prefix" as const }] : []),
    { label: s.processLabel, path: "/process", match: "prefix" },
    { label: "Contact", site: "/contact", match: "none" },
  ];
  return (
    <DivisionShell
      header={
        <DivisionHeader
          division={s.key}
          label={s.navLabel}
          ariaLabel={s.brand.name}
          items={items}
          quoteHref={s.quoteHref}
          ctaLabel={s.navCtaLabel}
        />
      }
    >
      {children}
    </DivisionShell>
  );
}
