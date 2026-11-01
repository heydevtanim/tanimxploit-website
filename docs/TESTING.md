# Testing Summary and QA Checklists

## Status at handover

| Check | Status |
|---|---|
| Source code written for all pages, API, SEO and security items | Done |
| `npm install`, `npm run typecheck`, `npm test`, `npm run build` | **Not yet run.** The environment where this code was generated had no access to the npm registry, so nothing was compiled or executed. Run these first and fix any issue they report. |
| Manual QA, browser and responsive testing | Pending |
| Lighthouse (Performance, Accessibility, Best Practices, SEO) | Pending |
| Real email delivery test | Pending (needs provider credentials) |

## Automated tests (`npm test`)

`tests/inquiry.test.ts` covers: valid input normalization, rejection of invalid email / short message / bad category / missing consent, control-character stripping, length limits, rate-limiter window behavior, duplicate guard, HTML escaping and header-injection stripping.

## Functional

- [ ] Every nav and footer link works; mobile menu opens/closes (button and Escape)
- [ ] All pages load: `/`, `/about`, `/divisions`, six `/divisions/<slug>`, `/services`, `/portfolio`, `/contact`, `/privacy-policy`, `/terms`
- [ ] Unknown URL shows custom 404 with status 404
- [ ] Valid inquiry succeeds and shows success message
- [ ] Invalid inquiry shows field errors; server rejects bad data when client checks are bypassed (use curl)
- [ ] `?category=WEBSITE_DEVELOPMENT` preselects the category
- [ ] Notification and acknowledgment emails arrive; inquiry stored if DB enabled
- [ ] Double click on Send creates only one inquiry

## Responsive (widths 360, 390, 768, 1024, 1280, 1536)

- [ ] No horizontal scroll; readable text; cards stack properly
- [ ] Header, mobile menu, hero, forms and footer usable

## Browsers

- [ ] Chrome, Firefox, Edge, Safari (if available)

## Accessibility

- [ ] Keyboard-only navigation with visible focus; skip link works
- [ ] One `h1` per page, logical headings
- [ ] Form labels, error messages announced (screen reader spot check)
- [ ] Color contrast check

## Security

- [ ] Server validation (curl with invalid payloads) returns 422
- [ ] Rate limit returns 429 after limit
- [ ] Cross-origin POST (wrong `Origin`) returns 403
- [ ] `GET /api/inquiries` returns 405
- [ ] No secrets in repository (`git grep -i "re_"`, check `.env` ignored)
- [ ] Security headers present (check in browser dev tools or securityheaders.com)
- [ ] HTTPS enforced in production

## SEO and performance

- [ ] Unique title and description per page; canonical URLs
- [ ] `/sitemap.xml` and `/robots.txt` correct for production and staging
- [ ] Structured data validates (Organization, WebSite, BreadcrumbList)
- [ ] Lighthouse run on desktop and mobile; fix issues found

## Staff portal tests

`npm test` also runs `tests/portal.test.ts`: role permission matrix (HR cannot see salary, only the founder can approve/lock payroll),
record-level access (own / team / directory / full), password hashing, session expiry and lockout, safe redirects, Dhaka dates, payroll
calculation and period rules.

Still to automate with Playwright once the app runs against a test database (from the specification checklist): employee sees only the
employee dashboard; employee opening a payroll URL is denied; HR cannot open finance data; double check-in policy; missed check-out
correction; leave approval flow; locked payroll rejects edits; offboarded user loses access; database restore.
