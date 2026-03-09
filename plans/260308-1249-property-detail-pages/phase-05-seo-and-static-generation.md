---
phase: 5
title: "SEO & Static Generation"
status: pending
effort: 1h
depends_on: [2, 3]
---

# Phase 5: SEO & Static Generation

## Context

- Existing pages use `export const metadata` for static SEO
- `sitemap.ts` at app root generates sitemap
- `metadataBase` set in root layout
- JSON-LD LodgingBusiness schema on home page
- 38 properties + many rooms = many pages to statically generate

## Overview

Add `generateStaticParams` for SSG, dynamic metadata per property/room, JSON-LD structured data, and sitemap entries.

## Implementation Steps

### 1. generateStaticParams for property pages

**File:** `src/app/(site)/collection/[slug]/page.tsx`

```tsx
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: allPropertySlugsQuery,
    tags: ["property"],
  }).catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}
```

### 2. generateStaticParams for room pages

**File:** `src/app/(site)/collection/[slug]/[room]/page.tsx`

```tsx
export async function generateStaticParams() {
  const data = await sanityFetch<
    { propertySlug: string; roomSlugs: string[] }[]
  >({
    query: allRoomSlugsQuery,
    tags: ["property"],
  }).catch(() => []);

  return data.flatMap(({ propertySlug, roomSlugs }) =>
    (roomSlugs || []).map((room) => ({ slug: propertySlug, room })),
  );
}
```

### 3. Dynamic metadata

Already included in Phase 2 and 3 server pages. Verify:

- Property page: `title: property.name`, `description` from CMS
- Room page: `title: "room.name - property.name"`, `description` from CMS
- Include `openGraph.images` from property/room thumbnail

### 4. JSON-LD for property pages

**File:** `src/app/(site)/collection/[slug]/page.tsx`

Add JSON-LD `LodgingBusiness` or `Hotel` schema:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": property.category === "hotel" ? "Hotel" : "LodgingBusiness",
  name: property.name,
  description: property.description,
  image: property.images?.[0]?.asset?.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vinh Hy",
    addressRegion: "Ninh Thuan",
    addressCountry: "VN",
  },
};
```

Render as `<script type="application/ld+json">` in page.

### 5. Update sitemap

**File:** `src/app/sitemap.ts`

Add property and room URLs:

```tsx
// Fetch all properties
const properties = await sanityFetch(...)

// Add property URLs
properties.forEach(p => {
  urls.push({
    url: `${baseUrl}/collection/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  // Add room URLs for hotels
  if (p.category === "hotel" && p.rooms) {
    p.rooms.forEach(r => {
      urls.push({
        url: `${baseUrl}/collection/${p.slug.current}/${r.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  }
});
```

## Todo

- [ ] Add `generateStaticParams` to property page
- [ ] Add `generateStaticParams` to room page
- [ ] Add OpenGraph images to metadata
- [ ] Add JSON-LD structured data to property page
- [ ] Update sitemap.ts with property/room URLs
- [ ] Test `bun run build` generates all static pages
- [ ] Verify sitemap output includes new URLs

## Success Criteria

- `bun run build` pre-renders all property and room pages
- Each page has unique title/description
- JSON-LD validates (test with Google Rich Results)
- Sitemap includes all property + room URLs
- Build time remains reasonable (<2 min)

## Risk Assessment

- **Build time with 38+ properties**: should be fine, pages are simple
- **Missing slugs**: `generateStaticParams` catches errors gracefully, pages still work with ISR fallback
