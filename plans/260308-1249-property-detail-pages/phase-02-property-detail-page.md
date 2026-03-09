---
phase: 2
title: "Property Detail Page"
status: pending
effort: 2.5h
depends_on: [1]
---

# Phase 2: Property Detail Page

## Context

- Route: `/collection/[slug]`
- Two property types with different layouts: villas (single unit) vs hotels (building with rooms)
- Existing patterns: HeroSection, ScrollReveal, CtaBanner, SectionHeading
- Gallery pattern: horizontal scroll from experience page, lightbox from gallery page
- Existing `ImageCard` component for room cards

## Overview

Build the property detail page with conditional layout for villas vs hotels. Server component fetches data, client component renders interactive gallery and content.

## Architecture

```
[slug]/page.tsx (server)
  -> Fetches property via propertyDetailQuery
  -> Generates metadata
  -> Renders PropertyDetailClient

[slug]/property-detail-client.tsx (client)
  -> Property gallery with lightbox
  -> Property info section
  -> Villa: pricing table + booking CTA
  -> Hotel: room grid with cards linking to /collection/[slug]/[room]
  -> Back link + CTA banner
```

## Implementation Steps

### 1. Create shared UI components

**`src/components/ui/back-link.tsx`** (~30 lines)

- Left arrow + text link
- Sand color, uppercase, small text
- Props: `href`, `label`

**`src/components/ui/pricing-table.tsx`** (~60 lines)

- 3-column table: Thứ 2-5 | Thứ 6-CN | Le/Tet
- VND formatting with dot separator
- Props: `priceWeekday`, `priceWeekend`, `priceHoliday`
- Style: ocean borders, sand header accents, Cormorant headings

**`src/components/ui/property-gallery.tsx`** (~120 lines, client)

- Horizontal scroll strip (snap-x) showing images
- Click opens lightbox overlay (reuse pattern from gallery-client.tsx)
- Left/right arrow navigation in lightbox
- Escape to close, click backdrop to close
- Touch swipe on mobile
- Gradient placeholder if no images
- Props: `images: SanityImage[]`, `propertyName: string`

**`src/components/ui/room-card.tsx`** (~80 lines, client)

- Card with room image (or gradient), room name, view badge, capacity, price
- Hover zoom effect (same as ImageCard)
- Wrapped in Next.js Link
- Props: `room: Room`, `propertySlug: string`
- View type badges: "View Bien" (sea), "View Nui" (mountain)

### 2. Create server page

**`src/app/(site)/collection/[slug]/page.tsx`** (~50 lines)

```tsx
// Server component
import { sanityFetch } from "@/sanity/client";
import { propertyDetailQuery } from "@/sanity/queries/property-queries";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./property-detail-client";

export async function generateMetadata({ params }) {
  const property = await sanityFetch({
    query: propertyDetailQuery,
    params: { slug: params.slug },
  });
  if (!property) return {};
  return {
    title: property.name,
    description:
      property.description ||
      `${property.name} tai La Mer Collection, Vinh Hy Bay`,
  };
}

export default async function PropertyPage({ params }) {
  const property = await sanityFetch({
    query: propertyDetailQuery,
    params: { slug: params.slug },
  });
  if (!property) notFound();
  return <PropertyDetailClient property={property} />;
}
```

### 3. Create client component

**`src/app/(site)/collection/[slug]/property-detail-client.tsx`** (~150 lines)

Layout structure:

1. **BackLink** — "Bộ Sưu Tập" back to /collection
2. **PropertyGallery** — hero gallery section
3. **Property Info** — name, category badge, description
4. **Conditional content:**
   - **Villa**: capacity info, PricingTable (rooms[0] prices), booking CTA
   - **Hotel**: SectionHeading "Danh Sách Phòng", room grid with RoomCards
5. **CtaBanner** — "Lien He De Dat Phong"

Category badge styling:

- Small uppercase text, sand border pill
- Heritage: ocean bg, Mediterranean: sand bg, Hotel: ocean-light bg

Villa layout:

```
[Gallery]
[Name + Badge + Description]
[Capacity: X khach | Pricing Table]
[CTA Button -> /lien-he]
```

Hotel layout:

```
[Gallery]
[Name + Badge + Description]
[Section: "Cac Phong" heading]
[Grid 1-2-3 cols of RoomCards]
```

### 4. Add ImageCard href support

**File:** `src/components/ui/image-card.tsx`

Add optional `href` prop. When provided, wrap the card in a Next.js `Link`. This enables collection page cards to link to property detail.

## Design Specifications

- Gallery height: `50vh` min `350px` on desktop, `40vh` on mobile
- Gallery thumbnails: `280px` wide on mobile, `400px` on desktop (same as dining gallery)
- Lightbox: same overlay style as gallery page (ocean 95% opacity)
- Content max-width: `var(--container-max)` with `var(--container-padding)`
- Section spacing: `var(--space-24)` between major sections
- Room grid: 1 col mobile, 2 col tablet, 3 col desktop
- All text in Vietnamese

## Todo

- [ ] Create `src/components/ui/back-link.tsx`
- [ ] Create `src/components/ui/pricing-table.tsx`
- [ ] Create `src/components/ui/property-gallery.tsx`
- [ ] Create `src/components/ui/room-card.tsx`
- [ ] Create `src/app/(site)/collection/[slug]/page.tsx`
- [ ] Create `src/app/(site)/collection/[slug]/property-detail-client.tsx`
- [ ] Add `href` prop to `src/components/ui/image-card.tsx`
- [ ] Update `collection-client.tsx` to pass href linking to `/collection/${slug}`
- [ ] Verify build compiles

## Success Criteria

- Villa detail page shows gallery, info, pricing, CTA
- Hotel detail page shows gallery, info, room list
- Room cards link to `/collection/[slug]/[room]`
- Back link returns to /collection
- ScrollReveal animations work
- Mobile responsive (gallery swipeable)
- No Framer Motion motion.div usage

## Risk Assessment

- **Large client component**: keep under 200 lines by extracting gallery/pricing to shared components
- **Room images missing**: use gradient fallback (same pattern as ImageCard)
- **Villa with multiple rooms**: some "villas" have 1 room entry for pricing — treat rooms[0] as the villa itself
