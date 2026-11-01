# Development Division update

Applied from the "TanimXploit Development" division plan.

## New
- `/development` overview (hero, about, 6 services, why choose us, tech stack, quality standards,
  portfolio, process, industries, cross-division journey, client feedback note, FAQ, contact CTA)
- `/development/services` (6 core + additional/ongoing services)
- `/development/services/[slug]` (one page per core service)
- `/development/process` (9-stage lifecycle, agreement, QA)
- `src/data/development.ts` holds ALL division content: edit text there.
- Home page: new Development highlight band.

## Changed
- Brand tokens: primary #0B1220, accent #3B82F6, secondary #22D3EE; fonts Inter (text) + Poppins (headings) via next/font.
- `/services` now lists the 6 development services (linked to detail pages).
- `/divisions/development` permanently redirects to `/development`.
- Sitemap, footer, division cards, README and architecture docs updated.

## Deliberately NOT published (internal planning)
Price ranges, revenue model, payment percentages, team structure, finance/reporting, sales channels.
No testimonials were invented: the section states that only genuine, approved feedback will be shown.

## After unzipping
npm install && npm run typecheck && npm run build

---

# Creative Studio update

Applied from the "TanimXploit Creative Studio" business plan.

## New
- `/creative-studio` overview (hero, about, focus, 6 services, packages, why choose us, clients, design direction,
  portfolio note, process, cross-division collaboration, FAQ, CTA)
- `/creative-studio/services`, `/creative-studio/services/[slug]` (6 services), `/creative-studio/process`,
  `/creative-studio/portfolio`
- `src/data/creative-studio.ts` holds ALL Creative Studio content: edit text there.
- Home page: Creative Studio highlight band.

## Changed
- `/services` now lists the 6 Creative Studio services (replacing the single "Branding and Creative Design").
- `/divisions/creative-studio` permanently redirects to `/creative-studio`.
- `DevelopmentNav` is now a generic section nav used by both division sections.
- Sitemap, README and architecture docs updated; 4 new icons (pen, idcard, share, layout).

## Deliberately NOT published (internal planning)
Price list (BDT ranges), 50/50 payment split, revenue model, team and family roles, finance, KPIs,
12-month roadmap, 30-day plan, client-acquisition channels.
Portfolio: the 9 planned projects are shown only as "Concept / Self-initiated, case study coming soon",
never as client work. No testimonials were invented.

---

# Digital, Technology Support and Code Academy update

Applied from the three division business plans (Digital, Technology Support, Code Academy).
The Code Academy plan was supplied twice with identical content, so it was applied once.

## New
- `/digital`: overview, `/digital/services` and `/digital/services/[slug]` (Social Media Management, SEO),
  `/digital/portfolio` (demonstration projects, labelled), `/digital/process` (10 steps, security, ethics).
- `/technology-support`: overview, `/technology-support/services` and `[slug]` (6 core services),
  `/technology-support/process` (9-step workflow, production safety, backups, security, agreement items).
  Four maintenance plans are shown by name and inclusions, without prices.
- `/code-academy` (status PLANNED): overview, `/code-academy/courses` and `[slug]` (10 planned courses with
  topics and projects), `/code-academy/process` (learning method, teaching principles, portfolio projects).
- One shared set of components in `src/components/division/` and all text in `src/data/sections/*.ts`.
- New icons: search, chart, wrench, play, database, branch, lock, cloud, terminal.
- Home page: a three-card band for the new divisions.

## Changed
- `src/data/divisions.ts`: Digital, Technology Support and Code Academy now link to their own sections.
- `/services` lists the Digital and Technology Support services (linked to detail pages); Code Academy stays "planned".
- `/divisions/digital`, `/divisions/technology-support`, `/divisions/code-academy` redirect permanently to the new sections.
- Sitemap, nav component (configurable CTA label), README and architecture docs updated.

## Deliberately NOT published (internal planning)
All BDT price ranges and hourly rates, revenue models, team structures (including family roles), financial
tracking, KPIs, 12-month roadmaps, 30-day plans, client / student acquisition plans, internal SLA response targets.
Honesty rules kept: no ranking, sales, uptime or job-placement guarantees; no website "100% secure";
certificates are completion certificates, not accredited qualifications; YouTube income is not presented as revenue;
no testimonials invented; concept projects labelled as concepts.

## Needs your decision before launch
- Code Academy is marked `planned` in `src/data/divisions.ts` and `src/data/sections/code-academy.ts`.
  Change both to `available` only when the first course or free content is really live.
- Learning division (`/divisions/learning`) has no plan yet, so it stays a simple planned page.

## After unzipping
npm install && npm run typecheck && npm run build

---

# Staff Portal foundation (TanimXploit Workforce) update

Applied from the "Final project specification" (Approved Architecture Direction). Full details: `docs/PORTAL.md`.

## New
- `/portal`: login, role-based dashboard, employee directory and profile (scoped by role and record), organization view,
  permission-checked roadmap pages for modules not built yet. Disabled unless `PORTAL_ENABLED=true`.
- `prisma/schema.prisma`: full portal schema (51 models) beside the existing `Inquiry` model; `prisma/seed.ts`.
- Authentication: scrypt password hashing, DB-backed sessions (hashed token, HttpOnly cookie), lockout, audit log.
- RBAC: 8 roles, 50+ permissions, record-level access rules, salary visibility separated from HR.
- Payroll engine (pure, tested): integer-minor-unit math, approved-adjustments-only, state machine, locked = immutable.
- `GET /api/portal/employees` (example protected API), `src/middleware.ts` (login gate, noindex, no-store).
- `tests/portal.test.ts`: 36 unit tests (all passing when run in isolation).

## Changed
- `src/app/layout.tsx`: public Header/Footer/JsonLd now render through `SiteChrome` and are skipped under `/portal`.
- `robots.ts` disallows `/portal/`; `package.json` (new scripts, `server-only`, prisma seed); `.env.example`; README.

## Not done yet (be aware)
- Not compiled against Next.js/Prisma here (no network): run `npm install && npx prisma validate && npm run typecheck && npm run build`.
- Create the first migration yourself: `npx prisma migrate dev --name portal_foundation`.
- Invitations, password-reset screens, MFA, employee create/edit forms, attendance, leave, payroll screens, projects, reports.
- Payroll policy (deductions, leave without pay, statutory rules) must be approved in writing before payroll screens are built.


---

# One header per division + division subdomains

## Problem fixed
Division pages showed TWO headers: the main-site header (Home / About / Divisions / ...) plus the division menu bar under it.

## Changed
- `src/components/navigation/DivisionHeader.tsx` (new): ONE header per division = logo (back to main site) + division name + the division's own menu + request button, with a mobile menu. Replaces `DevelopmentNav`.
- `src/components/layout/DivisionShell.tsx` (new): division page frame (own header + footer). The main-site `Header` is no longer rendered on division pages.
- Route group `src/app/(site)/` (new): holds the main-site pages (home, about, contact, divisions, services, portfolio, terms, privacy) with the global Header/Footer. Division folders and `/portal` sit outside it. `SiteChrome` removed; `src/app/layout.tsx` is now bare. `not-found.tsx` renders Header/Footer itself.
- Division layouts (`development`, `creative-studio`, `SectionLayout` for digital / technology-support / code-academy) use `DivisionShell` + `DivisionHeader`.
- Subdomains: `src/config/division-hosts.ts`, `src/middleware.ts`, `src/components/ui/SiteLink.tsx` (drop-in for next/link used site-wide). Active only when `NEXT_PUBLIC_ROOT_DOMAIN` is set; otherwise paths work exactly as before. Canonical URLs, breadcrumbs and sitemap use the subdomain URLs in that mode. See `docs/DEPLOYMENT.md`.

## After unzipping
npm install && npm run typecheck && npm run build   (not compiled here: no network in the build sandbox)
