"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface PortalNavItem {
  key: string;
  label: string;
  href: string;
  planned: boolean;
}

export function PortalNav({ items }: { items: PortalNavItem[] }) {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label="Portal navigation">
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-brand-500/20 text-white" : "text-ink-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {item.planned ? (
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-300">
                    Soon
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
