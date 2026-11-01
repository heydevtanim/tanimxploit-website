# Run and test on your own PC

Needs **Node.js 20 or newer** (22 is fine) and an internet connection for the first `npm install` and first build
(the Inter and Poppins fonts are downloaded once by Next.js and then served from your own site).

## A. Public website only (no database)

```bash
npm install
cp .env.example .env          # Windows CMD: copy .env.example .env
```

Edit `.env`: set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` and leave everything else as is. Then:

```bash
npm run dev                   # open http://localhost:3000
```

In development the contact form accepts inquiries without storing or emailing them.

## B. Website + staff portal (needs PostgreSQL)

1. Start a local database (Docker is the easiest): `docker compose up -d`
   (no Docker? install PostgreSQL 16 yourself and create a database `tanimxploit`.)
2. In `.env` set:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://txp:txp_local_only@localhost:5432/tanimxploit
PORTAL_ENABLED=true
PORTAL_ORG_SLUG=tanimxploit
SEED_FOUNDER_EMAIL=you@yourcompany.com
SEED_FOUNDER_PASSWORD=choose-a-long-password-12+
SEED_FOUNDER_NAME="Your Name"
```

> Use **`.env`**, not `.env.local`. Prisma (migrate, seed) only reads `.env`; Next.js reads both.

3. Create the tables (first time only; this also creates the `prisma/migrations` folder, **commit it to Git**):

```bash
npx prisma migrate dev --name init
npm run db:seed
```

4. `npm run dev`, then open http://localhost:3000/portal and sign in with the founder email and password.
5. After seeding, delete the three `SEED_FOUNDER_*` lines from `.env`.

Forgot or need to change a password? There is no screen for it yet. Put `RESET_EMAIL` and `RESET_PASSWORD`
in `.env`, run `npm run portal:set-password`, then remove those two lines again.

## C. Quality gate (run this before you publish)

```bash
npm run check          # typecheck + unit tests + production build
```

Fix anything it reports before going further. Then test the production build locally:

```bash
npm run build && npm start
```

Production mode sets a `__Host-` session cookie that requires HTTPS. Chrome and Firefox accept it on
`http://localhost`; Safari does not. If portal login "does nothing" in `npm start`, use `npm run dev` or Chrome.

## D. Manual test list

- Every page in the menu and footer opens; unknown URL shows the 404 page; mobile width has no sideways scroll.
- Contact form: valid message shows success; empty or short fields show errors.
- Bad requests are rejected (run in a second terminal while the site is running):

```bash
curl -i -X POST http://localhost:3000/api/inquiries -H "Content-Type: application/json" -d "{}"    # expect 422
curl -i http://localhost:3000/api/inquiries                                                          # expect 405
curl -i -X POST http://localhost:3000/api/inquiries -H "Content-Type: application/json" -H "Origin: https://evil.example" -d "{}"   # expect 403
```

- Portal (only with section B): wrong password shows a generic error; 5 wrong attempts lock the account for 15 minutes;
  `/portal/dashboard` without login redirects to the login page; Sign out really ends the session
  (back button then redirects to login).
- With `PORTAL_ENABLED=false` (or unset), `/portal` must return 404.

## E. Common problems

| Problem | Fix |
|---|---|
| Page loads but is unstyled/unclickable in dev | Hard refresh; check the browser console for CSP errors (dev needs `next.config.ts` as shipped) |
| `Environment variable not found: DATABASE_URL` | The value is in `.env.local`; move it to `.env` |
| `Can't reach database server` | `docker compose up -d`, check port 5432 is free |
| Fonts fail to download during build | You are offline, or a firewall blocks fonts.googleapis.com |
| Port 3000 busy | `npx next dev -p 3001` and update `NEXT_PUBLIC_SITE_URL` |
