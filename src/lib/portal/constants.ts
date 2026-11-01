/** Edge-safe constants (imported by middleware; must not import Node-only modules). */
const isProd = process.env.NODE_ENV === "production";

/**
 * In production the `__Host-` prefix makes browsers require Secure + Path=/ + no Domain, which
 * prevents subdomain cookie injection. It needs HTTPS, so local `next start` over http:// will not
 * keep the cookie; use `npm run dev` locally.
 */
export const SESSION_COOKIE_NAME = isProd ? "__Host-txp_session" : "txp_session";
export const LOGIN_PATH = "/portal/login";
export const FORBIDDEN_PATH = "/portal/forbidden";
export const DEFAULT_LANDING_PATH = "/portal/dashboard";
