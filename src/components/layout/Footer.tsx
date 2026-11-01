import Link from "@/components/ui/SiteLink";
import { footerLegalNav, mainNav, siteConfig } from "@/config/site";
import { divisionHref, divisions } from "@/data/divisions";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{siteConfig.tagline}</p>
          {siteConfig.contactEmail ? (
            <p className="mt-4 text-sm">
              <a className="font-medium text-brand-300 hover:text-brand-200" href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>
            </p>
          ) : null}
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Divisions">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Divisions</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link className="hover:text-white" href={divisionHref(d)}>
                  {d.name.replace("TanimXploit ", "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {footerLegalNav.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
