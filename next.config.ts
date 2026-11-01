import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * `next dev` evaluates code in the browser (React debugging, webpack eval source maps) and talks to
 * the dev server over a WebSocket. A strict production CSP blocks both and the page never hydrates.
 * So the relaxed rules below apply ONLY outside production builds.
 */
const scriptSrc = isProd ? "script-src 'self' 'unsafe-inline'" : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
const connectSrc = isProd ? "connect-src 'self'" : "connect-src 'self' ws: wss:";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HTTPS only. Add "; preload" later ONLY if you deliberately submit the domain to the HSTS preload list
  // (it is very hard to undo, and it covers every subdomain).
  ...(isProd
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : []),
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      connectSrc,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/divisions/development", destination: "/development", permanent: true },
      {
        source: "/development/request-a-quote",
        destination: "/contact?category=WEBSITE_DEVELOPMENT",
        permanent: false,
      },
      { source: "/development/contact", destination: "/contact?category=WEBSITE_DEVELOPMENT", permanent: false },
      { source: "/development/portfolio", destination: "/portfolio", permanent: false },
      { source: "/divisions/creative-studio", destination: "/creative-studio", permanent: true },
      {
        source: "/creative-studio/request-a-quote",
        destination: "/contact?category=BRANDING_DESIGN",
        permanent: false,
      },
      { source: "/creative-studio/contact", destination: "/contact?category=BRANDING_DESIGN", permanent: false },
      { source: "/divisions/digital", destination: "/digital", permanent: true },
      { source: "/digital/contact", destination: "/contact?category=DIGITAL_MARKETING", permanent: false },
      { source: "/digital/request-a-consultation", destination: "/contact?category=DIGITAL_MARKETING", permanent: false },
      { source: "/divisions/technology-support", destination: "/technology-support", permanent: true },
      { source: "/technology-support/contact", destination: "/contact?category=TECHNICAL_SUPPORT", permanent: false },
      { source: "/technology-support/support-request", destination: "/contact?category=TECHNICAL_SUPPORT", permanent: false },
      { source: "/divisions/code-academy", destination: "/code-academy", permanent: true },
      { source: "/code-academy/services", destination: "/code-academy/courses", permanent: false },
      { source: "/code-academy/contact", destination: "/contact?category=EDUCATION_LEARNING", permanent: false },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
