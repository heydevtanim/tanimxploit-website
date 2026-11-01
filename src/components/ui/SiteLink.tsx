import NextLink from "next/link";
import type { ComponentProps } from "react";
import { resolveHref } from "@/config/division-hosts";

/**
 * Drop-in replacement for next/link. Internal paths are resolved so that, when division subdomains are
 * enabled, links between the main site and the divisions point straight at the right host.
 * With NEXT_PUBLIC_ROOT_DOMAIN empty it behaves exactly like next/link.
 */
export default function SiteLink({ href, ...rest }: ComponentProps<typeof NextLink>) {
  return <NextLink href={typeof href === "string" ? resolveHref(href) : href} {...rest} />;
}
