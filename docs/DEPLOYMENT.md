# Deployment and Handover Guide

Fill in the blanks (marked `TBD`) at handover. Never put secret values in this document.

| Item | Value |
|---|---|
| Hosting provider | TBD (any Next.js-compatible host, e.g. Vercel or a Node server) |
| Repository | TBD |
| Production domain | TBD |
| Email provider | Resend (replaceable in `src/lib/email/send.ts`) |
| Database | Optional PostgreSQL (managed provider recommended) |

## Environment variables (names only)

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs, sitemap, structured data (no trailing slash) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | yes | `true` **only** on real production; anything else sets noindex and `Disallow: /` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | recommended | Public contact email (hidden if empty) |
| `RESEND_API_KEY` | for email | Provider key (secret) |
| `EMAIL_FROM` | for email | Sender on a verified domain |
| `INQUIRY_NOTIFY_TO` | for email | Authorized recipient of notifications |
| `SEND_VISITOR_ACKNOWLEDGMENT` | optional | `false` disables visitor acknowledgment |
| `DATABASE_URL` | optional | Enables PostgreSQL persistence (secret) |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_SECONDS` | optional | Defaults 5 and 600 |
| `PORTAL_ENABLED` | portal | `true` enables `/portal` (needs `DATABASE_URL`); anything else returns 404 |
| `PORTAL_ORG_SLUG` | portal | Organization slug, default `tanimxploit` |
| `SEED_FOUNDER_EMAIL`, `SEED_FOUNDER_PASSWORD`, `SEED_FOUNDER_NAME` | seed only | Used by `npx prisma db seed`; remove afterwards |

Set these in the host's secret/environment manager. `NEXT_PUBLIC_*` values are baked in at build time, so rebuild after changing them.

## Build and deploy

```bash
npm install            # first time only; commit the generated package-lock.json, then use `npm ci` in CI/hosting
npm run typecheck && npm test
npm run build
npm run db:migrate   # only if DATABASE_URL is set
npm start
```

On Vercel or similar: connect the repo, set environment variables, set the production branch to `main`, deploy.

## Database setup (if used)

1. Create a PostgreSQL database and set `DATABASE_URL`.
2. First time locally: `npm run db:migrate:dev -- --name init` (commits a `prisma/migrations` folder).
3. Production: `npm run db:migrate` (applies committed migrations).

## Domain and DNS

1. Add the domain in the hosting provider and create the DNS records it asks for.
2. Confirm HTTPS is active and HTTP redirects to HTTPS.
3. For email: add the SPF, DKIM (and ideally DMARC) records from the email provider so messages are delivered.
4. After launch, verify the domain in Google Search Console and submit `/sitemap.xml`.

## Production checklist

- [ ] Production build succeeds
- [ ] Environment variables set; `NEXT_PUBLIC_ALLOW_INDEXING=true`
- [ ] Domain connected and HTTPS active
- [ ] Database configured and migrated (if used)
- [ ] Real inquiry submitted; notification email received; acknowledgment received
- [ ] Public pages load; `/robots.txt` and `/sitemap.xml` correct
- [ ] Custom 404 works
- [ ] Draft notices removed from legal pages after legal review
- [ ] Temporary logo and design tokens replaced with approved brand

## Backup and restore (database)

Enable automated daily backups with point-in-time recovery at the database provider, and test a restore before launch. Restore into a new instance, update `DATABASE_URL`, redeploy. Define a retention period for inquiries and delete older records on schedule.

## Rollback

Redeploy the previous successful deployment from the host (instant rollback), or revert the offending commit on `main` and redeploy. Database migrations are forward-only: write a corrective migration rather than editing history.

## Troubleshooting

| Symptom | Check |
|---|---|
| Form shows "could not send" | `RESEND_API_KEY`, `EMAIL_FROM` domain verified, `INQUIRY_NOTIFY_TO` set, or `DATABASE_URL` reachable |
| 429 errors for real users | Raise `RATE_LIMIT_MAX`; many users behind one IP |
| 403 on submit | Origin differs from host (check proxy forwards `Host`/`X-Forwarded-Host`) |
| Site not indexed | `NEXT_PUBLIC_ALLOW_INDEXING` must be `true` at build time |
| Emails in spam | SPF/DKIM/DMARC for sender domain |

## Maintenance

Monthly: review and update dependencies (`npm outdated`, `npm audit`), check Search Console, review inquiry backlog. Rotate any credential immediately if exposed. Transfer production credentials only through an approved secure channel, and ensure the company owns the repository, domain, hosting and email accounts.


## Division subdomains (development.example.com, creativestudio.example.com ...)

1. Set `NEXT_PUBLIC_ROOT_DOMAIN=example.com` (bare domain, no `https://`, no `www`) and `NEXT_PUBLIC_SITE_URL` on the same domain, then rebuild (both are inlined at build time).
2. DNS: add one record per subdomain (or one wildcard `*.example.com`) pointing at the same app as the main domain.
   Subdomain names are defined in `src/config/division-hosts.ts` (development, creativestudio, digital, techsupport, academy).
3. Hosting: add every subdomain as a domain on the same project (Vercel/Netlify) or as a `server_name` in the reverse proxy
   (it must forward the original `Host` / `X-Forwarded-Host` header). TLS certificate must cover the subdomains (wildcard or one per name).
4. Behaviour: `development.example.com/services` serves the page at `/development/services`; `example.com/development/...` and
   `development.example.com/development/...` redirect (308) to the clean URL; non-division pages (`/contact`, `/about`, `/portfolio` ...) opened
   on a division subdomain redirect to the main site.
5. Local test: `NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, open `http://development.localhost:3000`.
