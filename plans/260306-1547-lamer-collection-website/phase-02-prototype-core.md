---
phase: 2
title: "HTML/CSS Prototype - Core Pages"
status: pending
priority: P1
effort: 8h
---

# Phase 2: HTML/CSS Prototype - Core Pages

## Context Links

- [Overview Plan](./plan.md)
- [Phase 1: Setup](./phase-01-project-setup.md)

## Overview

Build the three most important pages as static HTML/CSS/JS. These establish the visual language and UX patterns for the entire site.

## Pages in This Phase

### 1. Homepage (`index.html`)

The hero moment. Full cinematic experience.

**Sections:**

1. **Hero** - Full-viewport video background with logo overlay, subtle scroll indicator
2. **Story Intro** - Brief text: "A collection of places, woven into the soul of Vinh Hy Bay" with fade-in
3. **Collection Preview** - 3-4 featured properties as large image cards with hover parallax
4. **Experience Teaser** - Split-screen: left image, right text about dining/spa
5. **Location Teaser** - Map/aerial view of Vinh Hy Bay with "Discover" CTA
6. **Footer** - Logo, nav links, contact info, social links

**Key Interactions:**

- Video autoplay (muted), with poster fallback on mobile
- Scroll-driven fade/parallax on Story Intro section
- Image cards with subtle scale on hover
- Smooth scroll to sections

### 2. Collection Page (`pages/collection.html`)

Showcase all property types.

**Sections:**

1. **Hero** - Full-width image with page title overlay "Bo Su Tap" (The Collection)
2. **Filter/Category Nav** - Horizontal pills: All | Heritage Villas | Mediterranean | Vietnamese | Hotel Rooms
3. **Property Grid** - Masonry or alternating layout (large/small cards)
4. **Property Card** - Image, name, brief description, capacity icon, area icon
5. **CTA Banner** - "Lien he de dat phong" (Contact to book) with link to /lien-he

**Key Interactions:**

- Category filter with CSS transitions (no JS framework needed, simple show/hide)
- Card hover: image zoom, overlay with details
- Alternating card sizes for visual rhythm

### 3. Experience Page (`pages/experience.html`)

Restaurant, cafe, spa, activities.

**Sections:**

1. **Hero** - Full-width image with title "Trai Nghiem" (Experiences)
2. **Dining Section** - Restaurant + cafe with image gallery strip, description
3. **Spa Section** - Full-width image background with overlaid text
4. **Activities** - Grid of activity cards (kayaking, snorkeling, fishing, sunset cruise)
5. **CTA** - Link to contact page

**Key Interactions:**

- Horizontal scroll gallery for dining images (touch-friendly)
- Activity cards with icon overlays

## Shared Components

### Navigation

- Fixed top, transparent on hero → solid on scroll
- Logo left, nav links right
- Mobile: hamburger → full-screen overlay menu
- Links: Trang Chu | Bo Su Tap | Trai Nghiem | Cau Chuyen | Vinh Hy | Thu Vien | Lien He

### Footer

- Dark background (ocean blue)
- 3 columns: Brand/About | Quick Links | Contact Info
- Social icons row
- Copyright

## Related Code Files

### Create

- `prototype/index.html` - Homepage
- `prototype/pages/collection.html` - Collection page
- `prototype/pages/experience.html` - Experience page
- `prototype/css/pages/homepage.css` - Homepage-specific styles
- `prototype/css/pages/collection.css` - Collection-specific styles
- `prototype/css/pages/experience.css` - Experience-specific styles
- `prototype/js/navigation.js` - Nav scroll behavior, mobile menu
- `prototype/js/scroll-animations.js` - IntersectionObserver-based reveals

### Modify

- `prototype/css/components.css` - Add nav, footer, card components

## Implementation Steps

### Navigation (shared)

1. Create nav HTML structure: logo, links, hamburger button
2. Style desktop nav: fixed, transparent, transition to solid
3. Style mobile nav: hamburger icon, full-screen overlay
4. `navigation.js`: scroll listener for nav background, hamburger toggle

### Scroll Animations (shared)

5. `scroll-animations.js`: IntersectionObserver utility
   - `.reveal` class: opacity 0 → 1, translateY 30px → 0
   - `.reveal-left` / `.reveal-right` for directional reveals
   - Stagger support via `data-delay` attribute

### Homepage

6. Hero section: video element with poster, overlay gradient, logo, scroll indicator
7. Story intro section: centered text with `.reveal`
8. Collection preview: CSS grid, 3-4 large image cards
9. Experience teaser: CSS grid 2-col split
10. Location teaser: full-width aerial/map image with overlay text
11. Footer: 3-column grid layout

### Collection Page

12. Hero: full-width image with text overlay
13. Filter nav: horizontal scrollable pills
14. Property grid: CSS grid with `grid-row: span 2` for featured items
15. Property card component: image, overlay, details
16. Filter JS: simple class toggle show/hide by `data-category`
17. CTA banner section

### Experience Page

18. Hero section
19. Dining section with horizontal scroll gallery
20. Spa section: full-width parallax-style image
21. Activities grid: icon + image + title cards
22. CTA section

## Todo List

- [ ] Build navigation component (HTML + CSS + JS)
- [ ] Build footer component
- [ ] Create scroll-animations.js utility
- [ ] Homepage: hero section with video
- [ ] Homepage: story intro section
- [ ] Homepage: collection preview cards
- [ ] Homepage: experience teaser
- [ ] Homepage: location teaser
- [ ] Collection: hero + filter nav
- [ ] Collection: property grid + cards
- [ ] Collection: filter functionality
- [ ] Collection: CTA banner
- [ ] Experience: hero
- [ ] Experience: dining section with gallery
- [ ] Experience: spa section
- [ ] Experience: activities grid
- [ ] Test all pages on mobile (375px)
- [ ] Test all pages on tablet (768px)
- [ ] Test all pages on desktop (1440px)

## Success Criteria

- All 3 pages render beautifully on mobile, tablet, desktop
- Navigation works: transparent→solid, mobile hamburger menu
- Scroll reveal animations are smooth (60fps)
- Video hero loads with poster fallback
- Collection filter works without page reload
- No horizontal scroll issues on mobile
- Page load under 3s on 4G (excluding large media)

## Design Notes

- **Image placeholders**: Use `placehold.co` or solid color blocks with aspect ratios
- **Video placeholder**: Use a short stock ocean/beach video or static poster
- **Typography hierarchy**: H1 = text-3xl serif, H2 = text-2xl serif, body = text-base sans
- **Spacing rhythm**: Sections separated by space-24 to space-32
- **Mobile navigation**: Full-screen overlay with large tap targets (min 48px)

## Risk Assessment

- **Video performance on mobile**: Use `preload="none"` on mobile, poster image instead
- **Horizontal scroll gallery**: Test touch scrolling on real devices
- **Image-heavy pages**: Lazy load all below-fold images

## Next Steps

- Phase 3: Build secondary pages (Story, Vinh Hy, Gallery, Contact)
