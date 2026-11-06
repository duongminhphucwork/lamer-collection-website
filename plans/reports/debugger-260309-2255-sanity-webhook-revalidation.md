# Debugger Report: Sanity Webhook Revalidation Fix

**Date:** 2026-03-09
**Status:** RESOLVED

---

## Executive Summary

Sanity webhook revalidation was returning 401 "Invalid signature" on every request. Root cause: `SANITY_REVALIDATE_SECRET` was set correctly in `/opt/lamer-website/repo/.env.local` but the systemd service loads `/opt/lamer-website/.env` — which had an **empty value** for that variable. Fixed by populating the correct secret in the systemd EnvironmentFile and restarting the service.

---

## Root Cause

| File                                                | Value                                    |
| --------------------------------------------------- | ---------------------------------------- |
| `/opt/lamer-website/repo/.env.local`                | `SANITY_REVALIDATE_SECRET=1886215b...` ✓ |
| `/opt/lamer-website/.env` (systemd EnvironmentFile) | `SANITY_REVALIDATE_SECRET=` **EMPTY** ✗  |

The standalone Next.js server (systemd ExecStart: `node /opt/.../standalone/server.js`) does **not** auto-load `.env.local`. It relies entirely on environment variables injected by systemd via `EnvironmentFile=/opt/lamer-website/.env`. Because that file had an empty secret, `process.env.SANITY_REVALIDATE_SECRET` was `undefined` at runtime, causing every signature check to fail.

---

## Evidence

**journalctl output:**

```
Mar 09 15:34:34 lamer-web node[38166]: Missing signature header
```

→ This message is logged by `next-sanity/webhook` when it receives the header but process.env secret is falsy — the library skips HMAC verification and returns `isValidSignature: null`, which the route handler treats as invalid.

**Nginx access log:**

```
35.205.99.116 - "POST /api/revalidate HTTP/1.1" 401 28 "-" "Sanity.io webhook delivery"
```

→ All Sanity deliveries were failing with 401.

**Signature format confirmed (from compiled chunk):**

- Header name: `sanity-webhook-signature` (no `x-` prefix)
- Header format: `t=<unix_ms>,v1=<base64url(HMAC-SHA256(secret, timestamp_ms+"."+body))>`
- Timestamp must be **milliseconds** (validated: must be > Jan 1 2021 in ms = 1609459200000)

---

## Fix Applied

```bash
# On server:
sed -i 's/^SANITY_REVALIDATE_SECRET=$/SANITY_REVALIDATE_SECRET=1886215b2d686515c85a0653d192f10119108aea86541a340867c7039a7c76b8/' /opt/lamer-website/.env
systemctl daemon-reload && systemctl restart lamer-web
```

---

## Verification

Production endpoint now returns 200:

```json
{
  "revalidated": true,
  "paths": [
    "/",
    "/collection",
    "/experience",
    "/story",
    "/vinh-hy",
    "/gallery",
    "/lien-he"
  ]
}
```

---

## Additional Findings

**revalidateTag({ expire: 0 }) — is it correct?**
The current code uses `revalidateTag("pageContent", { expire: 0 })`. Analysis of compiled Next.js 16 code shows this IS valid — when r is an object, it's used as cacheLifeProfile directly, and `expire: 0` triggers `ActionDidRevalidateStaticAndDynamic`. No change needed.

**Nginx header forwarding — not the issue.**
The `/api/revalidate` nginx location block has explicit `proxy_set_header` directives but nginx still forwards all original request headers by default (explicit proxy_set_header does not strip other headers). Confirmed: `sanity-webhook-signature` header reaches the app correctly.

**App directory is `/opt/lamer-website/repo/`**, not `/var/www/lamer-web` as noted in some docs. The systemd EnvironmentFile is `/opt/lamer-website/.env`.

---

## Preventive Measures

1. **CI/CD pipeline should verify env parity** — after deploy, check that `/opt/lamer-website/.env` has all required keys non-empty.
2. Consider symlinking or copying `.env.local` → `/opt/lamer-website/.env` as part of the deploy script, or maintaining a single source of truth.
3. Add monitoring for consecutive 401s on `/api/revalidate` → alert.

---

## Unresolved Questions

None — issue fully diagnosed and resolved.
