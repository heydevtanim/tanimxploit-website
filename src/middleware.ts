import { NextResponse, type NextRequest } from "next/server";
import { LOGIN_PATH, SESSION_COOKIE_NAME } from "@/lib/portal/constants";
import { siteConfig } from "@/config/site";
import {
  divisionOrigin,
  findDivisionByHost,
  findDivisionByPath,
  isOwnedPath,
  subdomainMode,
} from "@/config/division-hosts";

/**
 * 1. DIVISION SUBDOMAINS (only when NEXT_PUBLIC_ROOT_DOMAIN is set)
 *    - development.example.com/services      -> serves the page at /development/services
 *    - development.example.com/development/x -> redirected to the clean URL /x
 *    - development.example.com/contact (or any non-division page) -> redirected to the main site
 *    - example.com/development/...           -> redirected to development.example.com/...
 *
 * 2. STAFF PORTAL GATE for /portal/*: no session cookie -> login. This only checks that a cookie EXISTS.
 *    Real authentication and authorization happen on the server in every page, action and API route
 *    (src/modules/auth/guard.ts). Middleware also keeps portal pages out of search engines and caches.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (subdomainMode) {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
    const division = findDivisionByHost(host);

    if (division) {
      // Old-style path on the division's own host: send to the clean URL.
      if (pathname === division.basePath || pathname.startsWith(`${division.basePath}/`)) {
        const clean = pathname.slice(division.basePath.length) || "/";
        return NextResponse.redirect(new URL(`${divisionOrigin(division)}${clean}${search}`), 308);
      }
      // A page of this division: serve it from the division folder.
      if (isOwnedPath(division, pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = `${division.basePath}${pathname === "/" ? "" : pathname}`;
        return NextResponse.rewrite(url);
      }
      // Anything else (contact, about, portal ...) lives on the main site.
      return NextResponse.redirect(new URL(`${siteConfig.url}${pathname}${search}`), 308);
    }

    // Main site: division pages now live on their subdomains.
    const target = findDivisionByPath(pathname);
    if (target) {
      const clean = pathname.slice(target.basePath.length) || "/";
      return NextResponse.redirect(new URL(`${divisionOrigin(target)}${clean}${search}`), 308);
    }
  }

  if (!(pathname === "/portal" || pathname.startsWith("/portal/"))) return NextResponse.next();

  const hasCookie = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);

  let response: NextResponse;
  if (pathname !== LOGIN_PATH && !hasCookie) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = "";
    url.searchParams.set("next", `${pathname}${search}`);
    response = NextResponse.redirect(url);
  } else {
    response = NextResponse.next();
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

/** Every page request except Next internals, API routes and files with an extension (robots.txt, icon.svg ...). */
export const config = { matcher: ["/((?!_next/|api/|.*\\..*).*)"] };
