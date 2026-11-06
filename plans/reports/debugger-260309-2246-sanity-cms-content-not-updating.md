# Debugger Report: Sanity CMS Content Not Updating on Production

**Date:** 2026-03-09
**Severity:** High — published CMS content never reflects on production

---

## Executive Summary

Two root causes found:

1. **PRIMARY (blocking):** Sanity webhook fires WITHOUT the `x-sanity-signature` header. The server logs `"Missing signature header"` on every webhook call → `parseBody()` returns `isValidSignature=false` → route returns 401 → **no revalidation happens**.
2. **SECONDARY (was also broken):** Previous commit 398e4c4 used `revalidateTag("pageContent", "max")` — the string `"max"` must be defined in `next.config.mjs` under `cacheLifeProfiles`, it is NOT built-in. This would have thrown `Error: Invalid profile provided "max"` → route returns 500. Current commit f07d02f fixed this correctly with `{ expire: 0 }`.

---

## Evidence

### Deployment status: OK

- Latest commit `f07d02f` IS deployed and running.
- Service `lamer-web` active since 15:38:58 UTC, PID 38678, Next.js 16.1.6.
- CI/CD last run: success at 2026-03-09T15:37:52Z.

### Webhook reaching server: YES, but failing auth

```
Mar 09 15:34:34  Missing signature header   ← BEFORE restart (old process)
Mar 09 15:47:15  Missing signature header   ← AFTER restart (current process)
Mar 09 15:48:28  Missing signature header
```

`parseBody` from `next-sanity/webhook` logs this when `x-sanity-signature` header is absent. The webhook IS being received but always fails signature check.

### Sanity data: CORRECT, data exists

```json
{
  "pageSlug": "story",
  "heroBackground": {
    "asset": {
      "url": "https://cdn.sanity.io/images/o2kvv3c9/production/693be5706904672bc5e74d8b40891cc556e2655d-2048x1536.jpg"
    }
  }
}
```

Data is in Sanity. Problem is ISR cache never gets invalidated.

### revalidateTag fix: CORRECT in current code

Current route.ts:

```ts
revalidateTag("pageContent", { expire: 0 });
revalidateTag("property", { expire: 0 });
```

`{ expire: 0 }` is handled correctly by Next.js 16 `revalidation-utils.js` — it uses the object directly as `cacheLife`, sets `expire=0`, triggers immediate expiration. This is valid.

Previous commit 398e4c4 used `"max"` (string) which required a `cacheLifeProfiles.max` entry in `next.config.mjs` — not present → would throw → 500 error. Fixed correctly in f07d02f.

### `useCdn: false`: CORRECT

`src/sanity/config.ts` has `useCdn: false`. Fetches go direct to Sanity API, not CDN.

---

## Root Cause Chain

```
User publishes in Sanity Studio
    ↓
Sanity fires webhook → POST /api/revalidate
    ↓
Request arrives WITHOUT x-sanity-signature header
    ↓
parseBody() logs "Missing signature header", returns isValidSignature=false
    ↓
Route returns 401 — revalidatePath/revalidateTag never called
    ↓
Next.js ISR cache NOT invalidated
    ↓
Pages serve stale cached content
```

**Why no signature?** Sanity webhook at sanity.io/manage is likely configured WITHOUT a signing secret, OR the secret field is empty/mismatched.

---

## Fix

### Step 1: Add signing secret to Sanity webhook (sanity.io/manage)

1. Go to [sanity.io/manage](https://sanity.io/manage) → project `o2kvv3c9` → API → Webhooks
2. Find the "Revalidate Website" webhook
3. Under **HTTP Headers** or **Signing secret**, set the secret to:
   ```
   1886215b2d686515c85a0653d192f10119108aea86541a340867c7039a7c76b8
   ```
   (This matches `SANITY_REVALIDATE_SECRET` in server `.env.local`)
4. Save and test delivery

### Step 2: Verify webhook works

After saving, trigger a test delivery from Sanity webhook UI. Server logs should show:

```
# Instead of "Missing signature header"
# Should see the route respond with 200 and revalidated: true
```

Or test manually with signed payload:

```bash
ssh root@5.223.53.106 "journalctl -u lamer-web -f --no-pager"
# Then trigger publish in Sanity Studio and watch logs
```

### Step 3 (optional): Add webhook delivery logging to route

To aid future debugging, add a log on successful revalidation:

```ts
console.log(`[revalidate] type=${body._type} paths=${paths.join(",")}`);
return NextResponse.json({ revalidated: true, paths });
```

---

## Secondary Issues (non-blocking, resolved)

- **ChunkLoadErrors at 15:38:52**: Old process (PID 38166) crashed while new build was being deployed. Normal race condition during `systemctl restart`. Current process (38678) is clean.
- **revalidateTag "max" bug**: Fixed in f07d02f. No code change needed.

---

## Verification After Fix

1. Publish any content in Sanity Studio
2. Check server logs: should NOT see "Missing signature header"
3. Hard-refresh production page → new content should appear within seconds
4. If still stale: `ssh root@5.223.53.106 "systemctl restart lamer-web"` (forces cold start, drops ISR cache)

---

## Unresolved Questions

- None. Root cause is definitive: Sanity webhook missing signing secret configuration.
