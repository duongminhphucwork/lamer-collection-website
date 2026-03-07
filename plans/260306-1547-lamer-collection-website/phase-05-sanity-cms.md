---
phase: 5
title: "Sanity CMS Integration"
status: in-progress
priority: P1
effort: 6h
progress: 95%
---

# Phase 5: Sanity CMS Integration

## Context Links

- [Overview Plan](./plan.md)
- [Phase 4: Next.js](./phase-04-nextjs-conversion.md)

## Overview

Integrate Sanity v3 as headless CMS. Content team can manage properties, experiences, gallery, and page content without developer deploys. Schema designed for future booking engine and i18n.

## Requirements

### Functional

- Sanity Studio embedded at `/studio` route
- All dynamic content managed via CMS
- Real-time content preview in development
- Image CDN via Sanity for all CMS images
- Webhook for revalidation on content change

### Non-Functional

- Schema supports future i18n (localized string fields)
- Schema supports future booking engine (property metadata)
- Content editing UX is intuitive for non-technical staff

## Architecture

### Sanity Project Structure

```
src/sanity/
├── config.ts               # Sanity client config
├── client.ts               # Sanity client instance
├── image.ts                # Image URL builder
├── schemas/
│   ├── index.ts            # Schema registry
│   ├── documents/
│   │   ├── property.ts     # Villa/room document
│   │   ├── experience.ts   # Restaurant/spa/activity
│   │   ├── gallery-item.ts # Photo/video item
│   │   ├── page-content.ts # Generic page sections
│   │   └── site-settings.ts # Global settings (logo, contact, social)
│   └── objects/
│       ├── localized-string.ts  # {vi: "...", en: "..."} for future i18n
│       ├── localized-text.ts    # Rich text variant
│       ├── image-with-alt.ts    # Image + alt text
│       ├── seo-fields.ts        # Meta title, description, og:image
│       └── price-range.ts       # Min/max price (for future booking)
├── queries/
│   ├── property-queries.ts
│   ├── experience-queries.ts
│   ├── gallery-queries.ts
│   └── page-queries.ts
└── studio/
    └── [[...tool]]/
        └── page.tsx         # Sanity Studio route
```

## Content Schemas

### Property Document

```typescript
{
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    { name: 'name', type: 'localizedString' },         // Villa name
    { name: 'slug', type: 'slug' },
    { name: 'category', type: 'string',                 // heritage | mediterranean | vietnamese | hotel
      options: { list: [...] } },
    { name: 'description', type: 'localizedText' },
    { name: 'images', type: 'array', of: ['imageWithAlt'] },
    { name: 'capacity', type: 'number' },               // Max guests
    { name: 'area', type: 'number' },                    // Square meters
    { name: 'amenities', type: 'array', of: ['string'] },
    { name: 'priceRange', type: 'priceRange' },          // Future booking
    { name: 'featured', type: 'boolean' },               // Show on homepage
    { name: 'order', type: 'number' },                   // Sort order
    { name: 'seo', type: 'seoFields' },
  ]
}
```

### Experience Document

```typescript
{
  name: 'experience',
  title: 'Experience',
  fields: [
    { name: 'name', type: 'localizedString' },
    { name: 'slug', type: 'slug' },
    { name: 'category', type: 'string',                 // dining | spa | activity
      options: { list: [...] } },
    { name: 'description', type: 'localizedText' },
    { name: 'images', type: 'array', of: ['imageWithAlt'] },
    { name: 'highlights', type: 'array', of: ['string'] },
    { name: 'order', type: 'number' },
    { name: 'seo', type: 'seoFields' },
  ]
}
```

### Gallery Item Document

```typescript
{
  name: 'galleryItem',
  title: 'Gallery Item',
  fields: [
    { name: 'title', type: 'localizedString' },
    { name: 'media', type: 'image' | 'file' },          // Photo or video
    { name: 'mediaType', type: 'string',                 // photo | video
      options: { list: [...] } },
    { name: 'category', type: 'string',                  // villas | views | dining | activities
      options: { list: [...] } },
    { name: 'order', type: 'number' },
  ]
}
```

### Site Settings (Singleton)

```typescript
{
  name: 'siteSettings',
  title: 'Site Settings',
  fields: [
    { name: 'logo', type: 'image' },
    { name: 'siteName', type: 'string' },
    { name: 'tagline', type: 'localizedString' },
    { name: 'phone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'zaloUrl', type: 'url' },
    { name: 'address', type: 'localizedText' },
    { name: 'socialLinks', type: 'object', fields: [
      { name: 'facebook', type: 'url' },
      { name: 'instagram', type: 'url' },
      { name: 'tiktok', type: 'url' },
    ]},
    { name: 'googleMapsEmbed', type: 'url' },
    { name: 'defaultSeo', type: 'seoFields' },
  ]
}
```

## Implementation Steps

1. Install Sanity dependencies: `npm install next-sanity @sanity/image-url @sanity/vision`
2. Create Sanity project via `npx sanity@latest init` or manual config
3. Create `src/sanity/config.ts` with project ID, dataset, API version
4. Create `src/sanity/client.ts` with configured client
5. Create `src/sanity/image.ts` with image URL builder
6. Create object schemas: localized-string, localized-text, image-with-alt, seo-fields, price-range
7. Create document schemas: property, experience, gallery-item, page-content, site-settings
8. Create schema index registering all schemas
9. Create Sanity Studio route at `src/app/studio/[[...tool]]/page.tsx`
10. Create GROQ queries for each content type
11. Update page components to fetch from Sanity instead of constants
12. Add `revalidateTag` to fetch calls for ISR
13. Create API route for Sanity webhook → revalidation
14. Seed initial content in Sanity Studio
15. Test content changes reflect on site

## Data Fetching Pattern

```typescript
// src/sanity/queries/property-queries.ts
export const allPropertiesQuery = groq`
  *[_type == "property"] | order(order asc) {
    _id, name, slug, category, description,
    images[]{ asset->{ url, metadata } },
    capacity, area, featured
  }
`;

// src/app/collection/page.tsx
export default async function CollectionPage() {
  const properties = await sanityFetch<Property[]>({
    query: allPropertiesQuery,
    tags: ["property"],
  });
  // render...
}
```

## Todo List

- [x] Install Sanity dependencies
- [x] Create Sanity config + client
- [x] Create image URL builder
- [x] Create object schemas (localized-string, image-with-alt, seo, price-range)
- [x] Create document schemas (property, experience, gallery-item, page-content, site-settings)
- [x] Register all schemas
- [x] Setup Sanity Studio route
- [x] Write GROQ queries for all content types
- [x] Create sanityFetch wrapper with revalidation tags
- [x] Update Homepage to fetch from CMS
- [x] Update Collection page to fetch from CMS
- [x] Update Experience page to fetch from CMS
- [x] Update Gallery page to fetch from CMS
- [x] Update Contact page with site settings from CMS
- [x] Create webhook API route for revalidation
- [ ] Run seed script with Sanity API token
- [ ] Manual e2e test (verify all pages render CMS content)

## Success Criteria

- Sanity Studio accessible at /studio
- All dynamic content editable via CMS
- Content changes reflect on site after revalidation
- Images served via Sanity CDN with responsive sizes
- Schema supports future i18n and booking fields
- Non-technical user can add a new property without developer help

## Risk Assessment

- **Sanity free tier limits**: Free plan supports 1 project, 2 datasets, 500k API requests/mo. Sufficient for branding site.
- **Preview mode complexity**: Skip live preview for now; ISR with webhook revalidation is sufficient.
- **Schema migrations**: Design schema carefully upfront; Sanity schema changes are non-destructive but field renames need data migration.

## Completion Status

**Session Work (260306):**

- Created `page-content` document schema for managing hero text and page sections
- Registered schema and created GROQ query
- Built shared fetch helper (`fetchPageContent()`, `getSection()`)
- Updated all 7 pages (homepage, collection, experience, story, vinh-hy, gallery, contact) to fetch from Sanity CMS
- Split collection, gallery, contact pages into server/client components
- Updated webhook revalidation to include `pageContent` type
- Created seed script (`scripts/seed-sanity.ts`) for initial CMS content
- Build passes successfully

**Remaining:**

- Run seed script with Sanity API token to populate initial content
- Manual end-to-end test to verify all pages render CMS content correctly

## Next Steps

- Phase 6: Add Framer Motion animations and visual polish
