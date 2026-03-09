---
title: "Property Detail Pages"
description: "Add property detail, room detail, and collection filtering for La Mer Collection"
status: pending
priority: P1
effort: 8h
branch: main
tags: [feature, collection, property, rooms, filtering]
created: 2026-03-08
---

# Property Detail Pages

## Overview

Add browsable detail pages for properties (villas/hotels) and hotel rooms, plus filtering on collection page. Three routing levels: `/collection` (list + filter), `/collection/[slug]` (property detail), `/collection/[slug]/[room]` (room detail, hotels only).

## Phases

| #   | Phase                              | Status  | Effort |
| --- | ---------------------------------- | ------- | ------ |
| 1   | Schema & Query Updates             | pending | 1h     |
| 2   | Property Detail Page               | pending | 2.5h   |
| 3   | Room Detail Page                   | pending | 2h     |
| 4   | Collection Page Filter Enhancement | pending | 1.5h   |
| 5   | SEO & Static Generation            | pending | 1h     |

## Key Dependencies

- Sanity schema needs `slug` field on rooms (currently missing)
- Room slugs must be unique within a property (not globally)
- `propertyBySlugQuery` already exists but needs room slug projection
- Lightbox pattern from `gallery-client.tsx` can be reused for property galleries

## Architecture

```
/collection                    -> page.tsx (server) + collection-client.tsx (client)
/collection/[slug]             -> [slug]/page.tsx (server) + property-detail-client.tsx (client)
/collection/[slug]/[room]      -> [slug]/[room]/page.tsx (server) + room-detail-client.tsx (client)
```

Shared components:

- `property-gallery.tsx` — swipeable image gallery with lightbox
- `pricing-table.tsx` — weekday/weekend/holiday price display
- `back-link.tsx` — breadcrumb-style back navigation
- `room-card.tsx` — room preview card for hotel property pages

## Files to Create

```
src/app/(site)/collection/[slug]/page.tsx
src/app/(site)/collection/[slug]/property-detail-client.tsx
src/app/(site)/collection/[slug]/[room]/page.tsx
src/app/(site)/collection/[slug]/[room]/room-detail-client.tsx
src/components/ui/property-gallery.tsx
src/components/ui/pricing-table.tsx
src/components/ui/back-link.tsx
src/components/ui/room-card.tsx
```

## Files to Modify

```
src/sanity/schemas/documents/property.ts       (add room slug)
src/sanity/queries/property-queries.ts         (add queries)
src/app/(site)/collection/collection-client.tsx (add links, enhanced filters)
src/components/ui/image-card.tsx               (add href prop)
```
