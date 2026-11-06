# Deployment Guide

## Overview

La Mer Collection website is deployed on **Vercel** with automatic deployments from GitHub. Every push to the `main` branch triggers a build on Vercel's infrastructure (Turbopack) and, on success, promotes it to production. There is no server to manage — no SSH, Nginx, systemd, or manual SSL.

> Migrated from a self-managed Hetzner VPS on 2026-11-06. The old SSH/`deploy.yml` pipeline has been removed.

---

## Architecture at a Glance

- **Host:** Vercel (Hobby plan)
- **Framework:** Next.js 16 (App Router) — declared in `vercel.json` as `{ "framework": "nextjs" }`
- **Build:** `next build` (Turbopack, the Next.js 16 default)
- **Package manager:** Bun (Vercel auto-detects `bun.lock`)
- **CMS:** Sanity (content fetched server-side via GROQ)
- **Production URL:** `lamer-collection-website.vercel.app`
- **Custom domain:** `lamercollection.com` (DNS at Namecheap)
- **HTTPS:** issued and renewed automatically by Vercel

---

## First-Time Setup

Already done once; documented for reference / disaster recovery.

### 1. Link the project

```bash
npm i -g vercel
vercel login                       # Continue with GitHub
vercel link --yes --project lamer-collection-website
```

This creates/links the Vercel project and connects the GitHub repo. From then on, pushes to `main` auto-deploy.

### 2. Set environment variables

Push the required variables to all environments (values live in local `.env.local`):

| Variable                        | Example / Value | Sensitive |
| ------------------------------- | --------------- | --------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `o2kvv3c9`      | no        |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`    | no        |
| `SANITY_API_TOKEN`              | `sk...`         | **yes**   |
| `SANITY_REVALIDATE_SECRET`      | random string   | **yes**   |

```bash
# Example for one variable (repeat per env: production / preview / development)
printf '%s' "<value>" | vercel env add NEXT_PUBLIC_SANITY_DATASET production
```

Or add them in the Vercel dashboard: Project → Settings → Environment Variables.

> `NEXT_PUBLIC_SITE_URL` appears in `.env.example` but is **not read** by the code (the canonical URL is hardcoded in `src/app/layout.tsx` and `src/lib/constants.ts`). It is optional.

---

## Deployment Process

### Automatic (normal path)

```bash
git add .
git commit -m "feat: ..."
git push origin main
```

Vercel then automatically: installs deps (`bun install`), runs `next build` (Turbopack), and promotes the result to production. Watch progress in the Vercel dashboard (Deployments) or:

```bash
vercel ls lamer-collection-website        # recent deployments + status
vercel inspect <deployment-url> --logs    # build logs for one deployment
```

### Manual (rarely needed)

```bash
vercel --prod --yes    # builds on Vercel and promotes to production
```

Note: `vercel --prod` still builds on Vercel's servers, not locally — it is just a manual trigger.

### Rollback

Promote a previous good deployment from the dashboard (Deployments → ⋯ → Promote to Production), or:

```bash
vercel rollback <previous-deployment-url>
```

---

## Fonts — IMPORTANT

Fonts are **self-hosted via Fontsource**, not `next/font/google`:

- `@fontsource-variable/inter` (body, variable font)
- `@fontsource/cormorant-garamond` (headings, incl. italic + Vietnamese subset)

Imported in `src/app/layout.tsx`; the CSS variables `--font-heading` / `--font-body` are defined in `src/app/globals.css`.

**Do not switch back to `next/font/google`.** It fetches fonts from Google _at build time_, which fails on Vercel's build environment (the fetch returns empty/invalid → `@next/font` loader crashes). This failure occurs with **both** Turbopack and webpack and does not reproduce locally. Self-hosting removes the build-time network dependency entirely.

---

## Custom Domain (lamercollection.com)

The domain is registered at **Namecheap** and keeps Namecheap DNS (because it hosts **email forwarding** — MX `eforward*.registrar-servers.com` + SPF/Google-verification TXT that must stay intact).

**Do NOT switch nameservers to Vercel** (that would drop the email/TXT records). Instead, point only the website records in Namecheap → Advanced DNS:

| Type  | Host  | Value                                                   | Note                               |
| ----- | ----- | ------------------------------------------------------- | ---------------------------------- |
| A     | `@`   | Vercel apex IP (see dashboard; typically `76.76.21.21`) | replaces old VPS IP `5.223.53.106` |
| CNAME | `www` | `cname.vercel-dns.com`                                  | replaces old `www` A record        |

Leave MX and TXT records untouched. After DNS propagates, Vercel auto-issues HTTPS.

Add the domain to the project (already done) and check status:

```bash
vercel domains add lamercollection.com lamer-collection-website
vercel domains inspect lamercollection.com    # shows required config / verification
```

Always confirm the exact A record value against Project → Settings → Domains in the dashboard.

---

## Environment Variables (reference)

- **Server-side (runtime on Vercel):** `SANITY_API_TOKEN`, `SANITY_REVALIDATE_SECRET`.
- **Public (inlined at build):** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`.
- Never commit `.env.local`; it is gitignored. The real secrets live only there and in Vercel's env settings.

---

## ISR Webhook Revalidation

When content changes in Sanity, a webhook calls the site so pages regenerate.

### Sanity webhook setup

1. Go to [sanity.io/manage](https://sanity.io/manage) → project `o2kvv3c9`
2. API → Webhooks → Create webhook:
   - **Name:** Revalidate Website
   - **URL:** `https://lamercollection.com/api/revalidate` (or the `*.vercel.app` URL until the domain is live)
   - **Trigger:** all document types
   - **HTTP method:** POST
   - **HTTP header:** `x-sanity-revalidate-secret` = your `SANITY_REVALIDATE_SECRET`
3. Publish any document in Studio to test.

### Handler

File: `src/app/api/revalidate/route.ts` — validates the secret header, then revalidates affected tags/paths. Returns 401 if the secret is missing/wrong.

### Manual revalidation

```bash
curl -X POST https://lamercollection.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-revalidate-secret: YOUR_SECRET" \
  -d '{"type": "property"}'
```

---

## Monitoring & Health Checks

- **Deployments & logs:** Vercel dashboard → Deployments, or `vercel inspect <url> --logs`.
- **Runtime logs:** Vercel dashboard → project → Logs (or `vercel logs <url>`).
- **Quick check:** `curl -I https://lamercollection.com` → expect `HTTP 200`.
- **Build failures** email the account owner automatically.

---

## Troubleshooting

### Build fails with a `next/font` / Turbopack font error

Cause: something reintroduced `next/font/google`. Fix: use the self-hosted Fontsource fonts (see **Fonts** above). Do not re-add `next/font/google`.

### `STATIC_BUILD_NO_OUT_DIR` / site treated as static

Cause: Vercel did not detect Next.js. Fix: ensure `vercel.json` contains `{ "framework": "nextjs" }`.

### New CMS content not showing

Check the Sanity webhook history (dashboard → Webhooks), confirm the URL and secret, or trigger a manual revalidation (see above).

### Custom domain not resolving / no HTTPS

Run `vercel domains inspect lamercollection.com`. Verify the Namecheap A (`@`) and CNAME (`www`) records match the dashboard, and that MX/TXT were left intact. DNS can take minutes to hours to propagate.

---

## Backups

- **CMS (Sanity):** automatic, real-time version history; restore via Studio.
- **Code (Git/GitHub):** every commit; restore with `git reset --hard <commit>`.
- **No traditional database** — content lives in Sanity.

---

## References

- Vercel deployments: https://vercel.com/docs/deployments
- Vercel custom domains: https://vercel.com/docs/projects/domains
- Fontsource: https://fontsource.org/
- Next.js on Vercel: https://nextjs.org/docs/app/building-your-application/deploying
- Sanity webhooks: https://www.sanity.io/docs/webhooks

---

**Last Updated:** November 2026 | **Host:** Vercel | **Status:** Production
