# Technical Architecture

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Next.js App Router, TypeScript, React | Matches company stack; SSR/SSG for SEO |
| Styling | Tailwind CSS v4 with temporary design tokens in `globals.css` | Fast, consistent, small CSS |
| Backend | Next.js Route Handler (`/api/inquiries`) | Brief: no separate Express server, Redis, microservices or admin dashboard without a demonstrated need |
| Database | PostgreSQL + Prisma, **optional** | Enabled only when `DATABASE_URL` is set |
| Validation | Zod, server-side authoritative | Required by brief |
| Email | Resend REST API via `fetch` (no extra dependency) | Approved provider can be swapped in `src/lib/email/send.ts` |
| Fonts | System font stack | No external font requests, no layout shift |
| Images | None required for V1 (SVG/CSS visuals); use `next/image` when photos are added | Performance |

## Rendering strategy

- All public content pages are statically generated (company info is stable).
- `/divisions/[slug]` uses `generateStaticParams` with `dynamicParams = false` (unknown slugs return 404).
- Client Components only where needed: `Header` (mobile menu), `DivisionHeader` (the division's own header and menu, active link state) and `ContactForm`.
- `POST /api/inquiries` is dynamic and Node runtime.

## Sitemap (Version 1)

```
/                       Home
/about                  About Us
/divisions              Divisions index
  /development            (own section; /divisions/development redirects here)
  /development/services
  /development/services/[slug]   (6 core services)
  /development/process
  /creative-studio        (own section; /divisions/creative-studio redirects here)
  /creative-studio/services
  /creative-studio/services/[slug]   (6 core services)
  /creative-studio/portfolio
  /creative-studio/process
  /digital                (own section; /divisions/digital redirects here)
  /digital/services
  /digital/services/[slug]           (2 core services)
  /digital/portfolio
  /digital/process
  /technology-support     (own section; /divisions/technology-support redirects here)
  /technology-support/services
  /technology-support/services/[slug] (6 core services)
  /technology-support/process
  /code-academy           (PLANNED, enrollment not open; /divisions/code-academy redirects here)
  /code-academy/courses
  /code-academy/courses/[slug]       (10 planned courses)
  /code-academy/process              (learning method)
  /divisions/learning
/services               Services
/portfolio              Portfolio
/contact                Contact
/privacy-policy         Privacy Policy (draft, legal review needed)
/terms                  Terms and Conditions (draft, legal review needed)
/sitemap.xml  /robots.txt
```

Not yet built (brief says "according to business readiness"): Careers, Blog, FAQ, standalone Learning page.

## Folder structure

```
src/
  app/                    routes, metadata, sitemap.ts, robots.ts, api/inquiries/route.ts
  components/
    layout/ navigation/   Footer, Header (client)
    sections/             CtaSection
    ui/                   Button, Cards, Icon, Logo, Section, StatusBadge, JsonLd
    forms/                ContactForm (client)
  features/inquiries/     service.ts: duplicate detection and persistence
  lib/
    validation/           Zod schema and sanitizers
    email/                provider call and templates
    database/             Prisma client (optional)
    utils/                rate limiter, SEO helpers
  data/                   divisions, services, projects, content
  config/                 site config
  types/
prisma/schema.prisma
tests/
docs/
```

## Inquiry workflow

1. Visitor submits the form. Client validates, locks against double-submit with a ref (not just a disabled button), and shows loading state.
2. `POST /api/inquiries`: same-origin check, JSON content-type check, per-IP rate limit, body size cap (20 KB), JSON parse.
3. Zod validation and sanitization (control characters stripped, whitespace normalized, lengths capped).
4. Spam signals (honeypot field filled, or form submitted faster than 2.5 s) return a normal-looking success without storing or sending.
5. Duplicate detection (same email, category, subject, message within 10 minutes): in-memory fingerprint, plus a database lookup when persistence is on. Duplicates return success without re-sending.
6. Store in PostgreSQL if configured, then send notification email to `INQUIRY_NOTIFY_TO`, then optional visitor acknowledgment.
7. Success if at least one durable channel (database or notification email) succeeded; otherwise a generic 503. Internal errors are never exposed.

## Database design

`Inquiry` (see `prisma/schema.prisma`): `id`, `fullName`, `email`, `companyName?`, `category`, `subject`, `message`, `status` (NEW, REVIEWING, REPLIED, QUALIFIED, CLOSED, SPAM), `createdAt`, `updatedAt`. IP addresses are **not** stored. There is no public retrieval endpoint; read access is via the database only (authorized personnel).

## Known limitations (by design for V1)

- The in-memory rate limiter and duplicate guard are per server instance. On serverless/multi-instance hosting, add the hosting provider's WAF/rate limiting if abuse appears.
- No admin dashboard: inquiries are reviewed in email or the database.
- CSP allows `'unsafe-inline'` scripts/styles because Next.js injects inline scripts. A nonce-based CSP can be introduced later.


## Division sections (Digital, Technology Support, Code Academy)

These three sections share one set of generic components so they stay consistent:

```
src/data/sections/            types.ts, digital.ts, technology-support.ts, code-academy.ts, index.ts
src/components/division/      SectionOverview, SectionServicesPage, SectionServiceDetail,
                              SectionProcessPage, SectionPortfolioPage, SectionLayout, shared
src/app/<division>/...        thin route wrappers (metadata + one component each)
```

All text lives in `src/data/sections/*.ts`. To change wording, edit only those files.
Adding a service or course: add an entry to the `services` array of that section; its page, sitemap
entry and /services card are generated automatically.
Development and Creative Studio still use their own earlier pages and data files.

## Staff portal (added)

The private workforce application lives in the same Next.js app under `/portal` (modular monolith, same PostgreSQL). Public pages and
the root layout has no header or footer. The main site (`src/app/(site)/layout.tsx`) renders `Header` + `Footer`, each division renders its own `DivisionHeader` through `DivisionShell`, and `/portal` renders neither. See `docs/PORTAL.md`.
