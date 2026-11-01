# TanimXploit Company Website

Official corporate website of **TanimXploit Technology Services**.
*Building Skills. Creating Opportunities. Delivering Technology.*

Modular Next.js (App Router) application (public website plus the private staff portal at `/portal`, see `docs/PORTAL.md`): TypeScript, React, Tailwind CSS v4, Zod, optional PostgreSQL via Prisma, transactional email via Resend.

## Quick start

```bash
npm install
cp .env.example .env           # fill in values (Prisma reads only ".env", not ".env.local"). Full guide: docs/LOCAL-RUN.md
npm run dev                    # http://localhost:3000
```

Without any configuration the site runs, and in development the contact form accepts inquiries without storing or emailing them. In production, at least one of email or database must be configured, otherwise the form reports a temporary error.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (validation, rate limiting, email helpers) |
| `npm run db:migrate:dev` | Create/apply migrations locally (needs `DATABASE_URL`) |
| `npm run db:migrate` | Apply migrations in production |
| `npm run db:seed` | Seed portal roles, divisions and the founder account (see `docs/PORTAL.md`) |
| `npm run db:validate` | `prisma validate` |
| `npm run check` | Typecheck + tests + production build in one go (run before publishing) |
| `npm run portal:set-password` | Reset a portal user's password (see `docs/LOCAL-RUN.md`) |

## Pages

`/` Home, `/about`, `/divisions`, `/divisions/learning` (the one division without its own section yet), `/digital` (TanimXploit Digital: overview, `/digital/services`, `/digital/services/[slug]`, `/digital/portfolio`, `/digital/process`), `/technology-support` (overview, `/technology-support/services`, `/technology-support/services/[slug]`, `/technology-support/process`), `/code-academy` (planned: overview, `/code-academy/courses`, `/code-academy/courses/[slug]`, `/code-academy/process`), `/creative-studio` (TanimXploit Creative Studio section: overview, `/creative-studio/services`, `/creative-studio/services/[slug]`, `/creative-studio/portfolio`, `/creative-studio/process`), `/development` (TanimXploit Development section: overview, `/development/services`, `/development/services/[slug]`, `/development/process`), `/services`, `/portfolio`, `/contact`, `/privacy-policy`, `/terms`, custom 404, `/sitemap.xml`, `/robots.txt`.

## Staff portal

`/portal` is a private HR, payroll and project application (login, role-based dashboards, employee directory, organization view) and is **disabled unless `PORTAL_ENABLED=true`**. It needs PostgreSQL. Setup, security design, payroll rules and the phase roadmap are in `docs/PORTAL.md`.

## Where to edit content

| What | File |
|---|---|
| Company name, tagline, contact email, nav, inquiry categories | `src/config/site.ts` |
| Divisions (and Available / Planned status) | `src/data/divisions.ts` |
| Services | `src/data/services.ts` |
| Portfolio projects | `src/data/projects.ts` |
| Values, process, why-choose copy | `src/data/content.ts` |
| Brand colors and fonts (temporary tokens) | `src/app/globals.css` |
| Logo (temporary) | `src/components/ui/Logo.tsx`, `src/app/icon.svg` |

## Items that need Founder & CEO / management action before launch

1. **Approve all copy**, including the hero text, About vision/mission, and division descriptions (all are drafts).
2. **Confirm the Available vs Planned status** of every division and service. Code Academy and Learning are currently marked *Planned* as an assumption.
3. **Replace temporary design tokens and logo** with the approved Brand Identity Guidelines.
4. **Portfolio**: only the internal website project is listed. Add only approved, non-confidential work with verified outcomes.
5. **Legal review** of the Privacy Policy and Terms pages, then remove the draft notices.
6. **Set** `NEXT_PUBLIC_CONTACT_EMAIL`, email provider variables and the production domain.
7. **Verify email deliverability** (SPF/DKIM on the sending domain) and run a real inquiry test in production.

## Documentation

- `docs/LOCAL-RUN.md`: run and test everything on your own PC, quality gate before publishing
- `docs/PORTAL.md`: staff portal setup, security, RBAC, payroll rules, roadmap
- `docs/ARCHITECTURE.md`: architecture, sitemap, folder structure, database design
- `docs/API.md`: `POST /api/inquiries`
- `docs/DEPLOYMENT.md`: environment variables, deployment, DNS, backup, rollback, troubleshooting
- `docs/TESTING.md`: QA checklists and test status

## Git workflow

Branches: `main` (production, protected), `develop` (optional), `feature/*`, `fix/*`. Use descriptive commit messages. Never commit `.env` files or secrets (already in `.gitignore`).
