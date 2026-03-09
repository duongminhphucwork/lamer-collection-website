# Property Detail Prototype Pages - Design Report

## Files Created

### Shared CSS

- `/prototype/css/pages/collection-detail.css` — shared styles for all detail pages

### HTML Pages

1. `/prototype/pages/collection-detail-villa.html` — Villa detail page
2. `/prototype/pages/collection-detail-hotel.html` — Hotel building detail page with room grid
3. `/prototype/pages/collection-filter.html` — Enhanced collection page with search + filters
4. `/prototype/pages/collection-room-detail.html` — Individual room detail page

## Design Decisions

### Layout Structure

- All pages reuse existing nav, footer, CSS (tokens, components, layout, navigation, footer)
- New `collection-detail.css` contains all detail-specific styles: gallery, back link, header, info grid, pricing table, CTA, related section, room cards, filter UI
- Mobile-first responsive: single column mobile, multi-column desktop

### Image Gallery

- Horizontal scroll with snap, prev/next arrows, dot navigation
- Mobile: full-width slides; tablet: 60%; desktop: 50%
- Gradient placeholders matching existing site palette
- Vanilla JS for navigation (no frameworks)

### Page Hierarchy

- Collection Filter → links to Villa Detail or Hotel Detail
- Hotel Detail → links to Room Detail (via room cards)
- Room Detail → back link to parent Hotel
- Villa Detail → back link to Collection

### Typography & Tokens

- All design tokens from existing `tokens.css` (colors, fonts, spacing, transitions)
- Cormorant Garamond for headings, Inter for body
- Badge: uppercase + letter-spacing + sand border (matches existing card category style)
- Pricing: heading font at `--text-xl` weight 500

### Filter Page Features

- Search input with SVG icon
- Category pill tabs (reuses existing `.filter-nav__pill`)
- Secondary filters: view type, capacity, price range (custom select dropdowns)
- Results count updates dynamically
- Data attributes on cards: `data-name`, `data-view`, `data-capacity`, `data-price`
- All filters combine (AND logic)

### Room Cards (Hotel Detail)

- Anchor tags for full-card clickability
- View type + amenity badges
- Capacity text, price with "Tu X d/dem" format
- Hover: sand border + subtle shadow

### Vietnamese Text

- All text uses proper Vietnamese diacriticals (a, a, d, e, o, o, u)
- Price format: dot separator (1.500.000d)

## Consistency with Existing Prototype

- Same nav structure (scrolled state, hamburger, overlay)
- Same footer structure (3-column grid, brand, links, contact)
- Same card pattern (image + gradient overlay + category + title + desc)
- Same button styles (`.btn`, `.btn--filled`, `.btn--white`)
- Same reveal animation classes
- Same gradient placeholders using project palette colors
