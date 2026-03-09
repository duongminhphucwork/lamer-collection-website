---
phase: 1
title: "Schema & Query Updates"
status: pending
effort: 1h
---

# Phase 1: Schema & Query Updates

## Context

- Property schema: `src/sanity/schemas/documents/property.ts`
- Queries: `src/sanity/queries/property-queries.ts`
- Rooms are inline objects (not documents) — no auto slug generation
- `propertyBySlugQuery` exists, fetches single property with rooms

## Overview

Add slug field to room objects, create new GROQ queries for detail pages, and add TypeScript types.

## Requirements

### Functional

- Room slug field (string, kebab-case, unique within property)
- Query: single property by slug with full data
- Query: all property slugs for `generateStaticParams`
- Query: all room slugs per property for `generateStaticParams`
- Query: properties with filter fields (category, viewType, capacity, price range)

### Non-Functional

- Keep existing `allPropertiesQuery` backward compatible
- Room slugs derived from room name (manual in CMS, not auto-generated since rooms are objects not documents)

## Implementation Steps

### 1. Add slug to room schema

**File:** `src/sanity/schemas/documents/property.ts`

Add after room `name` field:

```ts
defineField({
  name: "slug",
  title: "Slug",
  type: "string",
  description: "URL-friendly name (e.g., oc, so, ca-co). Must be unique within this property.",
  validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/),
}),
```

Using `string` type (not `slug` type) because rooms are objects, not documents. Sanity's `slug` type with auto-generate only works on document-level.

### 2. Add new GROQ queries

**File:** `src/sanity/queries/property-queries.ts`

```groq
// Property detail with room slugs
export const propertyDetailQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id, name, slug, category, description, featured,
    thumbnail{ asset->{ url, metadata } },
    images[]{ asset->{ url, metadata } },
    rooms[]{
      name, slug, description, viewType, capacity,
      priceWeekday, priceWeekend, priceHoliday,
      images[]{ asset->{ url, metadata } }
    }
  }
`;

// All property slugs for generateStaticParams
export const allPropertySlugsQuery = groq`
  *[_type == "property" && defined(slug.current)]{
    "slug": slug.current
  }
`;

// Property + specific room by slugs
export const roomDetailQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id, name, slug, category,
    rooms[]{
      name, slug, description, viewType, capacity,
      priceWeekday, priceWeekend, priceHoliday,
      images[]{ asset->{ url, metadata } }
    }
  }
`;

// All property+room slug combos for generateStaticParams
export const allRoomSlugsQuery = groq`
  *[_type == "property" && defined(slug.current) && category == "hotel"] {
    "propertySlug": slug.current,
    "roomSlugs": rooms[defined(slug)].slug
  }
`;

// Enhanced: all properties with filter-friendly fields
export const allPropertiesWithFiltersQuery = groq`
  *[_type == "property"] | order(order asc) {
    _id, name, slug, category, description, featured, order,
    thumbnail{ asset->{ url, metadata } },
    "roomCount": count(rooms),
    "minPrice": math::min(rooms[].priceWeekday),
    "maxPrice": math::max(rooms[].priceWeekday),
    "maxCapacity": math::max(rooms[].capacity),
    "viewTypes": rooms[].viewType
  }
`;
```

### 3. Add TypeScript types

**File:** `src/types/property.ts` (new file)

```ts
export interface SanityImage {
  asset: { url: string; metadata: Record<string, unknown> };
}

export interface Room {
  name: string;
  slug: string;
  description?: string;
  viewType?: "sea-view" | "mountain-view" | "no-view";
  capacity?: number;
  priceWeekday?: number;
  priceWeekend?: number;
  priceHoliday?: number;
  images?: SanityImage[];
}

export interface PropertyDetail {
  _id: string;
  name: string;
  slug: { current: string };
  category: "heritage" | "mediterranean" | "hotel";
  description?: string;
  featured?: boolean;
  thumbnail?: SanityImage;
  images?: SanityImage[];
  rooms?: Room[];
}

export interface PropertyListItem {
  _id: string;
  name: string;
  slug?: { current: string };
  category: string;
  description?: string;
  featured?: boolean;
  thumbnail?: SanityImage;
  roomCount: number;
  minPrice: number;
  maxPrice: number;
  maxCapacity: number;
  viewTypes?: string[];
}
```

### 4. Seed room slugs via script

**File:** `scripts/seed-room-slugs.ts` (one-time migration)

Create a script that:

1. Fetches all properties with rooms
2. For each room without a slug, generates one from the room name (Vietnamese to kebab-case)
3. Patches the property document

Use `slugify` or simple transform: lowercase, replace spaces with hyphens, strip diacritics.

## Todo

- [ ] Add `slug` string field to room object in property schema
- [ ] Add `propertyDetailQuery` to property-queries.ts
- [ ] Add `allPropertySlugsQuery` to property-queries.ts
- [ ] Add `roomDetailQuery` to property-queries.ts
- [ ] Add `allRoomSlugsQuery` to property-queries.ts
- [ ] Add `allPropertiesWithFiltersQuery` to property-queries.ts
- [ ] Create `src/types/property.ts` with shared types
- [ ] Create `scripts/seed-room-slugs.ts` migration script
- [ ] Run migration script to populate room slugs in CMS
- [ ] Verify with `bun run build` (tsc check)

## Success Criteria

- All rooms in CMS have slugs
- Queries return expected data shapes
- TypeScript compiles without errors
- Existing collection page still works

## Risk Assessment

- **Room name collisions within a property**: unlikely given creative names (Oc, So, Cua, etc.) but migration script should detect and suffix
- **Sanity deploy needed**: schema change requires `sanity deploy` for Studio UI update
