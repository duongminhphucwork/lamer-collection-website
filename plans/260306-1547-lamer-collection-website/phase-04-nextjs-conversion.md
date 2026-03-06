---
phase: 4
title: "Next.js Conversion"
status: pending
priority: P1
effort: 6h
---

# Phase 4: Next.js Conversion

## Context Links

- [Overview Plan](./plan.md)
- [Phase 2-3: Prototype](./phase-02-prototype-core.md)

## Overview

Convert validated HTML/CSS prototype into Next.js 14 App Router application. Tailwind CSS replaces custom CSS. Components extracted from page sections.

## Requirements

### Functional

- All 7 pages converted to Next.js routes
- Shared layout with navigation and footer
- SEO metadata on every page
- Image optimization via next/image
- Font optimization via next/font
- i18n-ready routing structure (Vietnamese only initially)

### Non-Functional

- Lighthouse score 90+ on all metrics
- Core Web Vitals passing
- Files under 200 lines each

## Architecture

### Route Structure

```
src/app/
├── layout.tsx              # Root layout: fonts, nav, footer
├── page.tsx                # Homepage
├── collection/
│   └── page.tsx            # Collection page
├── experience/
│   └── page.tsx            # Experience page
├── story/
│   └── page.tsx            # Story page
├── vinh-hy/
│   └── page.tsx            # Vinh Hy page
├── gallery/
│   └── page.tsx            # Gallery page
├── lien-he/
│   └── page.tsx            # Contact page
├── globals.css             # Tailwind base + custom utilities
└── not-found.tsx           # 404 page
```

### Component Structure

```
src/components/
├── layout/
│   ├── navigation.tsx      # Fixed nav with scroll behavior
│   ├── mobile-menu.tsx     # Full-screen mobile overlay
│   └── footer.tsx          # Site footer
├── ui/
│   ├── hero-section.tsx    # Reusable hero (video or image)
│   ├── section-heading.tsx # Consistent heading style
│   ├── image-card.tsx      # Property/activity card
│   ├── cta-banner.tsx      # Call-to-action section
│   ├── filter-bar.tsx      # Category filter pills
│   └── contact-form.tsx    # Form with validation
├── gallery/
│   ├── masonry-grid.tsx    # Photo grid
│   └── lightbox.tsx        # Full-screen viewer
└── shared/
    ├── scroll-reveal.tsx   # Framer Motion reveal wrapper
    ├── parallax-image.tsx  # Parallax background image
    └── zalo-button.tsx     # Floating Zalo CTA
```

### Lib Structure

```
src/lib/
├── constants.ts            # Site metadata, nav links, contact info
├── types.ts                # TypeScript types for content
└── utils.ts                # Helper functions
```

## Implementation Steps

### Project Init

1. Initialize Next.js 14: `npx create-next-app@latest . --typescript --tailwind --app --src-dir`
2. Configure `tailwind.config.ts` with design tokens from prototype
3. Setup `next.config.ts` (image domains, etc.)
4. Install dependencies: `framer-motion`
5. Configure fonts via `next/font/google` (Cormorant Garamond + Inter)
6. Create `src/lib/constants.ts` with site data

### Tailwind Config

7. Map CSS custom properties to Tailwind theme:
   ```
   colors: { ocean, sand, ivory, gold }
   fontFamily: { heading, body }
   fontSize: { fluid scale }
   ```

### Layout Components

8. Build `navigation.tsx` - Client component for scroll behavior
9. Build `mobile-menu.tsx` - Client component with state
10. Build `footer.tsx` - Server component
11. Build root `layout.tsx` - Fonts, metadata, nav + footer wrapper

### Shared Components

12. `hero-section.tsx` - Props: type (video|image), src, title, subtitle
13. `section-heading.tsx` - Consistent styled headings
14. `image-card.tsx` - Props: image, title, description, category
15. `scroll-reveal.tsx` - Framer Motion wrapper (client component)
16. `cta-banner.tsx` - Reusable CTA section

### Page Conversion (in order)

17. Homepage `page.tsx` - Convert each section, use components
18. Collection `page.tsx` - Filter bar + property grid
19. Experience `page.tsx` - Dining gallery, spa, activities
20. Story `page.tsx` - Heritage timeline, community
21. Vinh Hy `page.tsx` - Destination guide
22. Gallery `page.tsx` - Masonry grid + lightbox (client components)
23. Contact `page.tsx` - Form + map embed
24. 404 `not-found.tsx` - Branded error page

### SEO & Metadata

25. Add metadata export to each page (title, description, og:image)
26. Create `src/app/sitemap.ts` - Auto sitemap generation
27. Create `src/app/robots.ts` - Robots.txt generation
28. Add structured data (JSON-LD) for Organization + LocalBusiness

## i18n Preparation (Structure Only)

Prepare structure but don't activate multi-language:

- All user-facing strings in `constants.ts` or CMS
- Route structure supports future `[locale]` prefix
- `<html lang="vi">` set in layout
- No hardcoded Vietnamese text in components (pass via props)

## Related Code Files

### Create

- All files listed in Architecture section above
- `tailwind.config.ts` (customized)
- `src/app/globals.css`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

### Preserve

- `prototype/` directory (keep for reference)

## Todo List

- [ ] Initialize Next.js project
- [ ] Configure Tailwind with design tokens
- [ ] Setup fonts via next/font
- [ ] Create constants.ts with all site data
- [ ] Build navigation component
- [ ] Build mobile menu component
- [ ] Build footer component
- [ ] Build root layout
- [ ] Build shared UI components (hero, card, CTA, etc.)
- [ ] Build scroll-reveal component with Framer Motion
- [ ] Convert Homepage
- [ ] Convert Collection page
- [ ] Convert Experience page
- [ ] Convert Story page
- [ ] Convert Vinh Hy page
- [ ] Convert Gallery page (with lightbox)
- [ ] Convert Contact page (with form)
- [ ] Create 404 page
- [ ] Add metadata to all pages
- [ ] Create sitemap.ts and robots.ts
- [ ] Verify all pages render correctly
- [ ] Run Lighthouse audit, fix issues

## Success Criteria

- All pages render identically to HTML prototype
- Lighthouse: Performance 90+, Accessibility 90+, SEO 95+
- `next build` succeeds with no errors
- Images optimized via next/image
- Fonts loaded efficiently (no FOUT)
- Mobile responsive at all breakpoints
- No hydration errors

## Risk Assessment

- **Client vs Server components**: Only use `'use client'` where needed (nav, gallery, form, scroll-reveal)
- **Image optimization**: All images through next/image with proper width/height
- **Bundle size**: Keep Framer Motion imports tree-shaken

## Next Steps

- Phase 5: Integrate Sanity CMS for content management
