"use client";

import Link from "@/components/ui/SiteLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { getDivisionHost, type DivisionKey } from "@/config/division-hosts";

export interface DivisionNavItem {
  label: string;
  /** Path INSIDE the division: "" = overview, "/services", "/process". Use `site` for main-site pages. */
  path?: string;
  /** Main-site path such as "/contact" or "/portfolio". */
  site?: string;
  /** exact: only this page; prefix: this page and its children; none: never highlighted */
  match: "exact" | "prefix" | "none";
}

/**
 * The ONE header of a division site (Development, Creative Studio, Digital, Technology Support, Code Academy).
 * Logo (back to the main site) + division name + the division's own menu + request button.
 * It replaces the main-site header on division pages, so there are never two stacked headers.
 */
export function DivisionHeader({
  division,
  label,
  ariaLabel,
  items,
  quoteHref,
  ctaLabel = "Request a Quote",
}: {
  division: DivisionKey;
  label: string;
  ariaLabel: string;
  items: DivisionNavItem[];
  quoteHref: string;
  ctaLabel?: string;
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const { basePath } = getDivisionHost(division);

  // The browser path is "/development/services" on the main domain but "/services" on the division's own
  // subdomain. Normalise both to the path inside the division ("" = overview).
  const inside = pathname === basePath || pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname;
  const current = inside === "/" ? "" : inside;

  const hrefOf = (item: DivisionNavItem) => (item.path !== undefined ? `${basePath}${item.path}` : (item.site ?? "/"));
  const isActive = (item: DivisionNavItem) => {
    if (item.path === undefined || item.match === "none") return false;
    return item.match === "exact" ? current === item.path : current === item.path || current.startsWith(`${item.path}/`);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="TanimXploit main website" className="shrink-0">
            <Logo />
          </Link>
          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-ink-200" />
          <Link
            href={basePath}
            aria-label={`${label} overview`}
            className="truncate rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800 hover:bg-brand-100"
          >
            {label}
          </Link>
        </div>

        <nav aria-label={ariaLabel} className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.label}
                href={hrefOf(item)}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-brand-50 text-brand-800" : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={quoteHref}
            className="ml-3 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
          >
            {ctaLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink-800 hover:bg-ink-50 md:hidden"
          aria-expanded={open}
          aria-controls="division-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open ? (
        <nav id="division-mobile-menu" aria-label={`${ariaLabel} mobile`} className="border-t border-ink-100 bg-white md:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
            {items.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.label}>
                  <Link
                    href={hrefOf(item)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 text-base font-medium ${
                      active ? "bg-brand-50 text-brand-800" : "text-ink-800 hover:bg-ink-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href={quoteHref}
                className="block rounded-lg bg-brand-700 px-4 py-3 text-center text-base font-semibold text-white hover:bg-brand-800"
              >
                {ctaLabel}
              </Link>
            </li>
            <li className="mt-2 flex items-center justify-between border-t border-ink-100 px-3 pt-3 text-sm">
              <Link href="/" className="font-medium text-ink-600 hover:text-ink-900">
                TanimXploit main site
              </Link>
              <Link href="/divisions" className="font-medium text-ink-600 hover:text-ink-900">
                All divisions
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
