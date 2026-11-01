import { siteConfig } from "@/config/site";

/**
 * Division subdomains.
 *
 * Set NEXT_PUBLIC_ROOT_DOMAIN (for example "tanimxploit.com") and every division is served from its own
 * subdomain (development.tanimxploit.com, creativestudio.tanimxploit.com, ...). Leave it empty and the
 * site keeps working on plain paths (/development, /creative-studio, ...), which is what local development
 * and preview deployments use.
 *
 * To rename a subdomain, change `subdomain` below and nothing else.
 * This file is imported by the middleware (Edge runtime): keep it free of Node-only code.
 */

export type DivisionKey = "development" | "creative-studio" | "digital" | "technology-support" | "code-academy";

export interface DivisionHost {
  key: DivisionKey;
  /** Subdomain label, e.g. "development" -> development.<root domain>. */
  subdomain: string;
  /** Internal route folder in src/app, e.g. "/development". */
  basePath: string;
  /**
   * Paths that belong to the division itself, as seen on its subdomain ("/" = overview).
   * Anything else typed on a division subdomain (/contact, /about, /portfolio ...) is sent to the main site.
   */
  owned: string[];
}

export const divisionHosts: DivisionHost[] = [
  { key: "development", subdomain: "development", basePath: "/development", owned: ["/", "/services", "/process"] },
  {
    key: "creative-studio",
    subdomain: "creativestudio",
    basePath: "/creative-studio",
    owned: ["/", "/services", "/portfolio", "/process"],
  },
  { key: "digital", subdomain: "digital", basePath: "/digital", owned: ["/", "/services", "/portfolio", "/process"] },
  {
    key: "technology-support",
    subdomain: "techsupport",
    basePath: "/technology-support",
    owned: ["/", "/services", "/process"],
  },
  { key: "code-academy", subdomain: "academy", basePath: "/code-academy", owned: ["/", "/courses", "/process"] },
];

export const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "").trim().toLowerCase();
export const subdomainMode = rootDomain.length > 0;

const protocol = siteConfig.url.startsWith("https") ? "https" : "http";

export const getDivisionHost = (key: DivisionKey) => divisionHosts.find((d) => d.key === key) as DivisionHost;

export function divisionOrigin(d: DivisionHost): string {
  return `${protocol}://${d.subdomain}.${rootDomain}`;
}

/** Which division does this Host header belong to? (only in subdomain mode) */
export function findDivisionByHost(host: string): DivisionHost | undefined {
  if (!subdomainMode) return undefined;
  const h = host.toLowerCase();
  return divisionHosts.find((d) => h === `${d.subdomain}.${rootDomain}`);
}

/** Does this internal path live inside a division folder? ("/development/services" -> development) */
export function findDivisionByPath(pathname: string): DivisionHost | undefined {
  return divisionHosts.find((d) => pathname === d.basePath || pathname.startsWith(`${d.basePath}/`));
}

/** Is `pathname` (as seen on the division's own subdomain) a page of that division? */
export function isOwnedPath(d: DivisionHost, pathname: string): boolean {
  return d.owned.some((p) => (p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(`${p}/`)));
}

/**
 * Always-absolute URL for an internal path (canonical URLs, sitemap, structured data).
 * "/development/services" -> "https://development.example.com/services" in subdomain mode.
 */
export function absoluteUrl(path: string): string {
  const clean = path === "/" ? "" : path;
  if (subdomainMode) {
    const d = findDivisionByPath(clean || "/");
    if (d) {
      const rest = clean.slice(d.basePath.length);
      return `${divisionOrigin(d)}${rest}`;
    }
  }
  return `${siteConfig.url}${clean}`;
}

/**
 * Link target for an internal href. Plain path in path mode; in subdomain mode a link to another host
 * becomes absolute so it is one direct hop (no redirect). Query strings and #hashes are kept.
 */
export function resolveHref(href: string): string {
  if (!subdomainMode || !href.startsWith("/") || href.startsWith("//")) return href;
  const match = /^([^?#]*)(.*)$/.exec(href);
  const path = match?.[1] ?? href;
  const tail = match?.[2] ?? "";
  const d = findDivisionByPath(path);
  if (d) return `${divisionOrigin(d)}${path.slice(d.basePath.length) || "/"}${tail}`;
  return `${siteConfig.url}${path === "/" ? "/" : path}${tail}`;
}
