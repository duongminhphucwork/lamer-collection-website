# Debugger Report: Sanity Webhook Revalidation Not Working

**Date:** 2026-03-09
**Scope:** Production webhook ISR revalidation for La Mer Collection website

---

## Executive Summary

Two bugs prevent Sanity webhook revalidation from updating the production site. The webhook endpoint itself is reachable (returns 401 without signature, correct behavior), but even when the webhook fires successfully, pages don't show fresh Sanity content due to:

1. **`useCdn: true` in production** — Sanity's CDN serves stale data when Next.js re-fetches after revalidation, so the "fresh" fetch still returns old content.
2. **`revalidateTag("pageContent", "max")` uses SWR semantics** — With `"max"` profile, pages are marked stale but continue serving stale data until next visitor triggers background revalidation. This is the correct API call for Next.js 16, BUT combined with bug #1, the re-fetch always pulls CDN-cached (stale) data from Sanity.

Root cause chain: webhook fires → `revalidateTag` marks cache stale (SWR) → next visitor triggers background refetch → `sanityClient.fetch` with `useCdn: true` → Sanity CDN returns old cached data → cache entry updated with same stale data → user never sees new content.

---

## Findings

### Bug 1 — `useCdn: true` in Production (CRITICAL)

**File:** `src/sanity/config.ts`

```ts
useCdn: process.env.NODE_ENV === "production",  // ← true in prod
```

When Next.js revalidates and refetches from Sanity, it hits Sanity's CDN instead of the API server. Sanity's CDN has its own caching layer (~1–2 minute propagation delay after publish). The refetch returns the same stale data, effectively writing stale content back into the Next.js Data Cache.

**Fix:** Set `useCdn: false` unconditionally (or only enable it for non-ISR contexts).

---

### Bug 2 — `revalidateTag("pageContent", "max")` — SWR vs Immediate Expiry

**File:** `src/app/api/revalidate/route.ts`

```ts
revalidateTag("pageContent", "max"); // ← SWR semantics
```

`"max"` profile = stale-while-revalidate. Pages marked stale but served as-is until next visitor triggers background re-fetch. This is acceptable behavior IF the underlying data fetch (Sanity) returns fresh content. Because of Bug 1, it doesn't.

Additionally, per Next.js 16 docs: calling `revalidateTag` in a **Route Handler** (not a Server Action) does NOT immediately invalidate the Router Cache. The Router Cache continues serving the previous RSC payload until a hard refresh or the automatic invalidation period elapses.

**Fix option A:** Change `"max"` to `{ expire: 0 }` for immediate expiry semantics (per Next.js 16 docs: "when external systems call your Route Handlers and require data to expire immediately").
**Fix option B:** Keep `"max"` but fix Bug 1 first — the SWR re-fetch will then get fresh Sanity data.

---

### Architecture Observation — `sanityFetch` + `next.tags`

**File:** `src/sanity/client.ts`

```ts
return sanityClient.fetch<T>(query, params, {
  next: {
    revalidate: tags.length ? undefined : 60,
    tags,
  },
});
```

Using `sanityClient.fetch` with `next.tags` is the correct approach for tag-based revalidation in Next.js 16 — this part of the code is fine. The tags are registered with the Data Cache correctly. The `revalidateTag("pageContent", "max")` call in the webhook IS consistent with the tags used in `fetchPageContent` (tag: `"pageContent"`).

---

### Webhook Endpoint Status

- `POST /api/revalidate` without signature → `401 Invalid signature` ✓ correct
- Sanity webhook format: sends `_type` field in body, handler reads `body._type` ✓ correct
- `TYPE_TO_PATHS["pageContent"]` → all 7 pages + `revalidatePath` calls ✓ correct
- `parseBody` from `next-sanity/webhook` handles signature verification ✓ correct

Webhook handler logic itself is correct. The problem is upstream (CDN) and downstream (SWR timing).

---

## Root Cause Summary

| #   | Location                             | Issue                                                         | Impact                                                                |
| --- | ------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | `src/sanity/config.ts:6`             | `useCdn: true` in prod — CDN serves stale data on refetch     | Critical — new content never reaches Next.js cache                    |
| 2   | `src/app/api/revalidate/route.ts:38` | `"max"` profile = SWR, not immediate expiry, in Route Handler | Medium — compounds Bug 1, correct fix is `{ expire: 0 }` for webhooks |

---

## Recommended Fixes (Priority Order)

### Fix 1 — Disable Sanity CDN (required)

```ts
// src/sanity/config.ts
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o2kvv3c9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Must be false for ISR/webhook revalidation to work
} as const;
```

### Fix 2 — Use Immediate Expiry in Webhook Handler (recommended)

```ts
// src/app/api/revalidate/route.ts
revalidateTag("pageContent", { expire: 0 }); // immediate expiry, correct for webhooks
```

Per Next.js 16 docs: "For webhooks or third-party services that need immediate expiration, you can pass `{ expire: 0 }` as the second argument."

---

## No-Change Verification

These are confirmed correct and need no changes:

- Webhook signature verification logic (`parseBody`)
- Tag name consistency (`"pageContent"` in both fetch and revalidate)
- `sanityFetch` `next.tags` usage
- `revalidatePath` calls in webhook handler
- TypeScript types and imports

---

## Unresolved Questions

1. Does the Sanity webhook have a filter configured (e.g., only fires on `pageContent` type)? If filter is missing, it fires on ALL document changes including drafts — could cause revalidation noise. Worth checking at sanity.io/manage.
2. Has the webhook ever shown `200 OK` in Sanity's webhook delivery logs? Checking the webhook attempt history in Sanity Studio would confirm whether the handler is being reached at all.
3. Are there multiple Next.js instances (e.g., during deploy) that could split the cache state?

Sources:

- [Next.js 16 revalidateTag docs](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Next.js 16 Caching Guide](https://nextjs.org/docs/app/guides/caching)
- [useCdn and ISR compatibility](https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs)
