---
phase: 4
title: "Collection Page Filter Enhancement"
status: pending
effort: 1.5h
depends_on: [1]
---

# Phase 4: Collection Page Filter Enhancement

## Context

- Current collection page: category filter only (all/heritage/mediterranean/hotel)
- Uses `FilterBar` component with `variant="square"`
- Properties displayed as ImageCard grid (no links currently)
- Prototype finalized: `prototype/pages/collection-filter.html`
- Prototype CSS: `prototype/css/pages/collection-detail.css`

## Overview

Enhance collection page with search, capacity stepper, and price range slider while keeping luxury aesthetic. Add links from property cards to detail pages.

## Prototype Design (Finalized)

Layout structure (top to bottom):

```
[Category FilterBar]          — existing pills, keep as-is
[Category Description]        — italic Cormorant Garamond, changes per category
[Search Bar]                  — underline style, centered, max-width 340px
[Capacity Stepper | Price Range Slider]  — inline row, centered, divider between
[Results Count]               — italic, light
[Property Grid]               — existing cards with links added
```

### Search Bar

- Underline style (border-bottom only, transparent bg)
- Cormorant Garamond font, italic placeholder
- Search icon (SVG) left-aligned
- Sand accent on focus

### Capacity Stepper

- Label "SỐ KHÁCH" (uppercase, xs)
- `[−]` value `[+]` buttons (36px square, ocean border)
- Value: "—" when unset, number when selected
- Hover: sand border + color

### Price Range Slider (Dual thumb)

- Label "MỨC GIÁ" (uppercase, xs)
- Inline layout: label → min value → track → max value
- Track: 3px rounded, sand fill between thumbs
- Thumbs: 18px white circles, sand border (hover: gold border)
- 11 price steps: 0, 500k, 1tr, 1.5tr, 2tr, 3tr, 4tr, 5tr, 6tr, 8tr, 10tr+
- Hover: thumb scales 1.15x

### Category Descriptions

```
all:           "Khám phá bộ sưu tập villa và phòng nghỉ..."
heritage:      "Những căn villa mang hồn cốt di sản Chăm Pa..."
mediterranean: "Phong cách Địa Trung Hải giữa lòng vịnh..."
hotel:         "Những căn phòng ấm cúng mang tên sinh vật biển..."
```

### NO view type filter (removed from design)

## Implementation Steps

### 1. Update collection page data fetching

**File:** `src/app/(site)/collection/page.tsx`

Add `minPrice`, `maxGuests` fields to property query for filtering.

### 2. Create filter components

**File:** `src/components/ui/collection-filters.tsx` (new, ~150 lines)

Extract all filter UI into dedicated client component:

- `CollectionFilters` component with props: `onSearchChange`, `onCapacityChange`, `onPriceRangeChange`, `activeCategory`
- Category description text (already exists in production — keep as-is)
- Search input (underline style)
- Capacity stepper (−/+/value)
- Price range dual slider

### 3. Update collection client

**File:** `src/app/(site)/collection/collection-client.tsx`

```ts
const filtered = items
  .filter((p) => filter === "all" || p.category === filter)
  .filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase()),
  )
  .filter((p) => !capacity || p.guests >= capacity)
  .filter((p) => {
    if (priceMin === 0 && priceMax >= 10000000) return true;
    return p.minPrice >= priceMin && p.minPrice <= priceMax;
  });
```

### 4. Add property card links

**File:** `src/components/ui/image-card.tsx`

Add optional `href?: string` prop. When provided, wrap in `<Link>`.

**File:** `src/app/(site)/collection/collection-client.tsx`

Pass `href={/collection/${p.slug}}` to each ImageCard.

### 5. Empty state + results count

When filters produce no results:

```
"Không tìm thấy kết quả phù hợp. Hãy thử thay đổi bộ lọc."
```

Results count: italic Cormorant Garamond, e.g. "Hiển thị 38 chỗ nghỉ"

### 6. Mobile responsive

- Filters row stacks vertically
- Search bar full width
- Divider becomes horizontal
- Range slider track 140px

## Todo

- [ ] Update `SanityProperty` type with `minPrice`, `maxGuests` fields
- [ ] Create `src/components/ui/collection-filters.tsx`
- [ ] Keep existing category descriptions (already in production)
- [ ] Add search input (underline style)
- [ ] Add capacity stepper (−/+)
- [ ] Add price range dual slider
- [ ] Integrate filters into collection-client.tsx
- [ ] Add `href` prop to ImageCard
- [ ] Pass slug-based hrefs to ImageCard instances
- [ ] Add empty state + results count UI
- [ ] Mobile responsive (stack, full width)
- [ ] Keep files under 200 lines
- [ ] Verify build compiles

## Success Criteria

- Search, capacity, price range filters work independently and combined
- Search is case-insensitive, matches property names
- Category descriptions change when switching pills
- Property cards link to detail pages
- Mobile: filters stack vertically
- Empty state displayed when no results
- Existing category filter still works
- Matches prototype pixel-perfect

## Risk Assessment

- **collection-client.tsx over 200 lines**: mitigated by extracting filter UI to separate component
- **Hardcoded fallback properties have no slugs**: only show links for CMS properties
- **Dual range slider complexity**: use two overlapping `<input type="range">` (proven in prototype)
