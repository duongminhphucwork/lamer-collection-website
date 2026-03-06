---
phase: 3
title: "HTML/CSS Prototype - Secondary Pages"
status: pending
priority: P1
effort: 6h
---

# Phase 3: HTML/CSS Prototype - Secondary Pages

## Context Links

- [Overview Plan](./plan.md)
- [Phase 2: Core Pages](./phase-02-prototype-core.md)

## Overview

Build remaining 4 pages reusing components established in Phase 2. These pages are content-heavier, less interaction-heavy.

## Pages in This Phase

### 1. Story Page (`pages/story.html`)

Brand narrative, heritage preservation, community integration.

**Sections:**

1. **Hero** - Full-width image, title "Cau Chuyen Cua Chung Toi" (Our Story)
2. **Brand Origin** - Text-heavy section with side image. How La Mer Collection began.
3. **Heritage Preservation** - Before/after images of renovated local homes. Timeline or side-by-side layout.
4. **Community Integration** - Photo grid of local life, fishermen, markets. Text about how resort weaves into community.
5. **Vision** - Quote/statement about the future. Full-width image background.
6. **CTA** - "Kham Pha Bo Su Tap" (Explore The Collection) → /collection

**Key Interactions:**

- Timeline scroll animation for heritage section
- Before/after image slider (CSS + minimal JS)
- Quote section parallax

### 2. Vinh Hy Page (`pages/vinh-hy.html`)

Destination guide for Vinh Hy Bay.

**Sections:**

1. **Hero** - Aerial/panoramic bay image, title "Vinh Hy"
2. **Introduction** - Why Vinh Hy is special. Geography, climate, accessibility.
3. **Local Cuisine** - Grid of food photos with names: banh can, hai san, nuoc mam
4. **Nature & Activities** - Coral reefs, Nui Chua National Park, fishing villages
5. **Getting Here** - Simple directions from major cities (Ho Chi Minh, Da Lat, Nha Trang) with drive times
6. **Map Section** - Embedded Google Maps or static map image

**Key Interactions:**

- Food photo hover with dish name overlay
- Smooth accordion for "Getting Here" directions

### 3. Gallery Page (`pages/gallery.html`)

Visual showcase - photos and videos.

**Sections:**

1. **Hero** - Minimal, title "Thu Vien Hinh Anh" (Gallery)
2. **Filter Bar** - Categories: All | Villas | Views | Dining | Activities | Videos
3. **Masonry Grid** - Responsive masonry layout for photos
4. **Lightbox** - Full-screen image/video viewer with navigation

**Key Interactions:**

- Masonry grid with CSS columns (no JS library needed)
- Category filter (reuse pattern from collection page)
- Lightbox: pure CSS + JS, no library
  - Click image → full-screen overlay
  - Left/right navigation
  - Close button
  - Keyboard support (ESC, arrows)

### 4. Contact Page (`pages/lien-he.html`)

Contact form and resort information.

**Sections:**

1. **Hero** - Smaller hero, title "Lien He" (Contact)
2. **Contact Info Grid** - Phone, Zalo, Email, Address in card layout
3. **Contact Form** - Name, email, phone, message, submit button
4. **Google Maps Embed** - Interactive map showing resort location
5. **Social Links** - Facebook, Instagram, TikTok, Zalo

**Key Interactions:**

- Form validation (HTML5 + minimal JS)
- Map embed (iframe, no API key needed for embed)
- Zalo chat button (floating)

## Related Code Files

### Create

- `prototype/pages/story.html`
- `prototype/pages/vinh-hy.html`
- `prototype/pages/gallery.html`
- `prototype/pages/lien-he.html`
- `prototype/css/pages/story.css`
- `prototype/css/pages/vinh-hy.css`
- `prototype/css/pages/gallery.css`
- `prototype/css/pages/contact.css`
- `prototype/js/gallery.js` - Lightbox + masonry filter

### Modify

- `prototype/css/components.css` - Add form, accordion, lightbox component styles

## Implementation Steps

### Story Page

1. Hero section (reuse pattern from collection/experience)
2. Brand origin: 2-column text + image layout
3. Heritage section: before/after image pairs, optional slider
4. Community section: photo grid (3-col desktop, 2-col mobile)
5. Vision quote: full-width background image with centered text
6. CTA section

### Vinh Hy Page

7. Hero section
8. Introduction: centered text block with side decorative elements
9. Local cuisine: 3-column food card grid with image + name
10. Nature section: alternating image/text blocks
11. Getting here: accordion with city routes
12. Map embed section

### Gallery Page

13. Minimal hero
14. Filter bar (reuse collection filter pattern)
15. Masonry grid using CSS `columns` property
16. Build lightbox component:
    - Overlay with backdrop blur
    - Image display with caption
    - Prev/next buttons
    - Close button (X + ESC key)
    - Touch swipe support
17. `gallery.js`: filter logic + lightbox controller

### Contact Page

18. Small hero section
19. Contact info cards: 4-card grid with icons
20. Contact form with styled inputs
21. Form validation (required fields, email format)
22. Google Maps iframe embed
23. Floating Zalo button (fixed position, bottom-right)

## Todo List

- [ ] Story: hero + brand origin section
- [ ] Story: heritage preservation section
- [ ] Story: community integration photo grid
- [ ] Story: vision quote section
- [ ] Vinh Hy: hero + introduction
- [ ] Vinh Hy: local cuisine grid
- [ ] Vinh Hy: nature & activities
- [ ] Vinh Hy: getting here accordion
- [ ] Vinh Hy: map embed
- [ ] Gallery: filter bar + masonry grid
- [ ] Gallery: lightbox component
- [ ] Gallery: gallery.js (filter + lightbox)
- [ ] Contact: info cards
- [ ] Contact: form with validation
- [ ] Contact: map + Zalo button
- [ ] Mobile test all 4 pages
- [ ] Cross-browser test (Chrome, Safari, Firefox)

## Success Criteria

- All 4 pages match design language from Phase 2
- Gallery lightbox works on mobile (swipe) and desktop (click/keyboard)
- Contact form validates required fields
- Masonry grid responsive at all breakpoints
- All 7 pages navigable via nav links
- Total prototype feels cohesive as a luxury resort site

## Risk Assessment

- **Lightbox complexity**: Keep it simple - CSS overlay + JS controller. No touch gesture library.
- **Masonry layout**: CSS `columns` property sufficient; avoid JS-based masonry.
- **Google Maps embed**: Use simple iframe, no API key required for basic embed.

## Next Steps

- Phase 4: Convert prototype to Next.js (App Router)
