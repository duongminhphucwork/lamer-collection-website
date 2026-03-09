---
phase: 3
title: "Room Detail Page"
status: pending
effort: 2h
depends_on: [1, 2]
---

# Phase 3: Room Detail Page

## Context

- Route: `/collection/[slug]/[room]` (hotel category only)
- Reuses components from Phase 2: PropertyGallery, PricingTable, BackLink
- Room data is inline in property document (not separate Sanity document)
- Need to extract specific room from property's rooms array by slug

## Overview

Build room detail pages for hotel properties. Server component fetches property + extracts room by slug. Client component renders room gallery, info, pricing, and sibling room navigation.

## Architecture

```
[slug]/[room]/page.tsx (server)
  -> Fetches property via roomDetailQuery
  -> Finds room by slug param
  -> 404 if property not hotel OR room not found
  -> Renders RoomDetailClient

[slug]/[room]/room-detail-client.tsx (client)
  -> Room gallery
  -> Room info (name, view badge, capacity)
  -> PricingTable
  -> Booking CTA
  -> "Other rooms" horizontal scroll section
```

## Implementation Steps

### 1. Server page

**`src/app/(site)/collection/[slug]/[room]/page.tsx`** (~60 lines)

```tsx
export async function generateMetadata({ params }) {
  const property = await fetchProperty(params.slug);
  const room = property?.rooms?.find((r) => r.slug === params.room);
  if (!room) return {};
  return {
    title: `${room.name} - ${property.name}`,
    description:
      room.description ||
      `${room.name} tai ${property.name}, La Mer Collection`,
  };
}

export default async function RoomPage({ params }) {
  const property = await fetchProperty(params.slug);
  if (!property || property.category !== "hotel") notFound();

  const room = property.rooms?.find((r) => r.slug === params.room);
  if (!room) notFound();

  const siblingRooms =
    property.rooms?.filter((r) => r.slug !== params.room) || [];

  return (
    <RoomDetailClient
      room={room}
      propertyName={property.name}
      propertySlug={property.slug.current}
      siblingRooms={siblingRooms}
    />
  );
}
```

### 2. Client component

**`src/app/(site)/collection/[slug]/[room]/room-detail-client.tsx`** (~140 lines)

Layout:

1. **BackLink** — "{Property Name}" back to `/collection/[slug]`
2. **PropertyGallery** — room images
3. **Room Info Section**:
   - Room name (h1, Cormorant Garamond)
   - View type badge (pill: "View Bien" / "View Nui" / no badge)
   - Capacity: "Toi da X khach"
   - Description paragraph
4. **PricingTable** — room prices
5. **CTA** — "Lien He Dat Phong" button linking to /lien-he
6. **"Cac Phong Khac" Section** (if siblings exist):
   - SectionHeading
   - Horizontal scroll of RoomCards (reuse from Phase 2)
   - Each links to `/collection/[slug]/[siblingSlug]`
7. **CtaBanner**

View type badge mapping:

```ts
const VIEW_LABELS: Record<string, string> = {
  "sea-view": "View Bien",
  "mountain-view": "View Nui",
  "no-view": "", // no badge shown
};
```

### 3. Guard non-hotel routes

If someone navigates to `/collection/heritage-villa-1/some-room`, the server page should return `notFound()` since only hotel properties have room sub-pages.

Villa URLs like `/collection/heritage-grand-villa` should work (Phase 2) but `/collection/heritage-grand-villa/anything` returns 404.

## Design Specifications

- Same spacing/typography as property detail page
- View badge: small pill, ocean-light bg, white text, rounded
- Sibling rooms section: horizontal scroll strip (snap-x), same as dining gallery
- RoomCard in siblings: 280px wide mobile, 350px desktop
- Max 2 rows of info before description

## Todo

- [ ] Create `src/app/(site)/collection/[slug]/[room]/page.tsx`
- [ ] Create `src/app/(site)/collection/[slug]/[room]/room-detail-client.tsx`
- [ ] Add VIEW_LABELS constant to appropriate location
- [ ] Test hotel room navigation flow
- [ ] Test 404 for non-hotel property room URLs
- [ ] Verify build compiles

## Success Criteria

- Room page shows gallery, info, pricing for correct room
- Back link goes to parent property
- Sibling rooms section shows other rooms in same property
- Non-hotel property room URLs return 404
- Mobile responsive
- ScrollReveal animations consistent with site

## Risk Assessment

- **Room without images**: fallback to property thumbnail or gradient
- **Room without prices**: show "Lien he" instead of price
- **Large sibling list** (Homestay Lang Chai has 22 rooms): horizontal scroll handles gracefully
