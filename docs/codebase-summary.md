# Codebase Summary

## Directory Structure

```
src/
├── app/                              # Next.js App Router
│   ├── (site)/                       # Public pages route group
│   │   ├── layout.tsx                # Navigation + Footer wrapper
│   │   ├── page.tsx                  # Home page
│   │   ├── collection/
│   │   │   ├── page.tsx              # Collection browser (all properties)
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx          # Property detail page
│   │   │   │   └── [room]/
│   │   │   │       └── page.tsx      # Room detail page (hotels only)
│   │   ├── experience/
│   │   │   └── page.tsx              # Experience showcase
│   │   ├── story/
│   │   │   └── page.tsx              # Brand story
│   │   ├── vinh-hy/
│   │   │   └── page.tsx              # Location/destination info
│   │   ├── gallery/
│   │   │   └── page.tsx              # Gallery with lightbox
│   │   └── lien-he/
│   │       └── page.tsx              # Contact form
│   ├── studio/
│   │   └── [[...index]]/page.tsx     # Sanity Studio route (CMS)
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts              # ISR webhook handler
│   ├── layout.tsx                    # Root layout (fonts, globals)
│   ├── sitemap.ts                    # Dynamic XML sitemap for SEO
│   └── robots.ts                     # robots.txt for search engines
│
├── components/                       # Reusable React components
│   ├── Layout/
│   │   ├── Navigation.tsx            # Fixed header (scroll-triggered)
│   │   ├── Footer.tsx                # Footer with CMS siteSettings
│   │   └── MobileMenu.tsx            # Mobile hamburger menu
│   ├── Features/
│   │   ├── PropertyGallery.tsx       # Scroll-snap image gallery + lightbox
│   │   ├── CollectionFilters.tsx     # Search, category, capacity, price
│   │   ├── RoomCard.tsx              # Room preview card
│   │   ├── PricingTable.tsx          # Room pricing display
│   │   ├── HeroSection.tsx           # Hero with video/image
│   │   ├── CtaBanner.tsx             # Call-to-action banner
│   │   └── BackLink.tsx              # Navigation breadcrumb
│   ├── UI/
│   │   ├── ImageCard.tsx             # Responsive image card
│   │   ├── FilterBar.tsx             # Search + filters UI
│   │   ├── RangeSlider.tsx           # Price range dual slider
│   │   ├── Stepper.tsx               # Capacity +/- buttons
│   │   └── Lightbox.tsx              # Image modal viewer
│   └── ScrollReveal.tsx              # useInView + CSS transitions
│
├── sanity/                           # CMS configuration
│   ├── schemas/
│   │   ├── property.ts               # Property document schema
│   │   ├── room.ts                   # Room object schema (nested)
│   │   ├── pageContent.ts            # Page content sections
│   │   ├── siteSettings.ts           # Global site settings singleton
│   │   ├── galleryItem.ts            # Gallery image schema
│   │   └── experience.ts             # Experience section schema
│   ├── queries/
│   │   ├── property.ts               # GROQ: single property + rooms
│   │   ├── properties.ts             # GROQ: all properties (paginated)
│   │   ├── pageContent.ts            # GROQ: page sections (home, story, etc)
│   │   ├── siteSettings.ts           # GROQ: phone, email, address
│   │   └── galleryItems.ts           # GROQ: all gallery items
│   └── client.ts                     # Sanity client setup (useCdn: false)
│
├── lib/                              # Utilities & helpers
│   ├── types.ts                      # TypeScript interfaces
│   ├── constants.ts                  # App constants (colors, spacing)
│   ├── utils.ts                      # Helper functions
│   └── hooks/
│       ├── useInView.ts              # Scroll reveal hook
│       └── useMediaQuery.ts          # Responsive breakpoints
│
├── public/                           # Static assets
│   ├── images/                       # Static images (SVG logos, icons)
│   └── fonts/                        # Font files (Cormorant Garamond, Inter)
│
└── styles/
    └── globals.css                   # CSS variables, reset, global styles

scripts/                              # One-off data scripts
├── seed-sanity.ts                    # Initialize CMS content
├── seed-properties.ts                # Populate 38 properties
├── seed-site-settings.ts             # Setup siteSettings singleton
├── seed-page-items.ts                # Populate page content sections
├── seed-room-slugs.ts                # Room slug migration
├── import-room-photos.ts             # Batch upload room images
└── update-categories.ts              # Heritage/mediterranean migration

Config Files (root)
├── package.json                      # Dependencies, scripts
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind CSS config
├── next.config.mjs                   # Next.js config
├── vercel.json                       # Vercel deployment config
├── .env.example                      # Environment template
├── .env.local                        # Local env (git-ignored, with SANITY_API_TOKEN)
├── .eslintrc.json                    # ESLint rules
├── .gitignore                        # Git ignore patterns
└── bun.lock                          # Bun lock file (faster than package-lock.json)
```

---

## Key Modules & Responsibilities

### Pages (App Router)

| File                                       | Purpose                       | Data Source                 | Render Mode     |
| ------------------------------------------ | ----------------------------- | --------------------------- | --------------- |
| `(site)/page.tsx`                          | Home page                     | CMS pageContent             | ISR             |
| `(site)/collection/page.tsx`               | Property browser with filters | CMS properties[]            | ISR             |
| `(site)/collection/[slug]/page.tsx`        | Property detail (villa/hotel) | CMS property + rooms[]      | ISR             |
| `(site)/collection/[slug]/[room]/page.tsx` | Room detail (hotel only)      | CMS property.rooms[room]    | ISR             |
| `(site)/experience/page.tsx`               | Experience showcase           | CMS experience schema       | ISR             |
| `(site)/story/page.tsx`                    | Brand story                   | CMS pageContent             | ISR             |
| `(site)/vinh-hy/page.tsx`                  | Location info                 | CMS pageContent             | ISR             |
| `(site)/gallery/page.tsx`                  | Gallery with lightbox         | CMS galleryItems[]          | ISR             |
| `(site)/lien-he/page.tsx`                  | Contact form                  | CMS siteSettings            | ISR             |
| `api/revalidate/route.ts`                  | Webhook handler               | POST body                   | Server Function |
| `sitemap.ts`                               | XML sitemap (SEO)             | Generated from properties[] | Dynamic         |
| `robots.ts`                                | robots.txt (SEO)              | Hardcoded                   | Dynamic         |

### Components (Features)

#### PropertyGallery

- **Purpose:** Image carousel with scroll-snap + lightbox
- **Props:** images[], title
- **Features:** Mobile menu (Escape to close), keyboard nav
- **Performance:** Next.js Image with WebP, lazy loading

#### CollectionFilters

- **Purpose:** Search + category + capacity stepper + price range
- **State:** searchTerm, selectedCategory, capacity, priceRange
- **Features:** Debounced search, real-time filter updates
- **Design:** Underline search, stepper ±, dual range slider

#### RoomCard

- **Purpose:** Hotel room preview (title, capacity, price, image)
- **Data:** Room object with pricing[weekday, weekend, holiday]
- **Link:** `/collection/[property]/[room]`

#### PricingTable

- **Purpose:** Display weekday/weekend/holiday pricing
- **Data:** pricing object with rates
- **Format:** Formatted currency (VND)

#### HeroSection

- **Purpose:** Page hero with video/image background
- **Data:** CMS hero object (image, title, subtitle, cta)
- **Features:** Parallax scroll effect, responsive video

#### CtaBanner

- **Purpose:** Call-to-action banner
- **Link:** Links to contact page (/lien-he)
- **Design:** Full-width, gradient background, button

#### ScrollReveal

- **Purpose:** Scroll-triggered animations
- **Implementation:** useInView + CSS transitions (NOT Framer Motion)
- **Usage:** Wrap component → fade-in on scroll
- **CSS:** `--reveal-duration: 0.8s`

### Sanity Schemas

#### Property

```
- name: string
- slug: slug (auto-generated from name)
- category: "heritage" | "mediterranean" | "hotel"
- description: rich text
- location: string (address)
- amenities: string[]
- images: image[] (property gallery)
- pricing: { weekday, weekend, holiday }
- rooms: Room[] (nested, hotel only)
- locationCoords: { lat, lng } (for map future feature)
```

#### Room (nested in Property)

```
- name: string (sea creatures: Ốc, Sò, Cua; fish: Cá Cờ, Cá Thu; gems: Ngọc Trai)
- slug: slug (auto-generated from name)
- description: rich text
- capacity: number (persons)
- view: string (sea, mountain, garden)
- pricing: { weekday, weekend, holiday }
- images: image[] (room photos)
```

#### PageContent

```
- _type: "pageContent"
- slug: string (home, story, experience, etc)
- hero: { image, title, subtitle, cta }
- sections: Section[] (type varies: image, gallery, testimonial, features)
```

#### SiteSettings (singleton)

```
- _type: "siteSettings"
- phone: string
- email: string
- zalo: string (WhatsApp-like, Vietnam)
- address: string
- hours: { open, close }
- footerText: string
```

#### GalleryItem

```
- title: string
- slug: slug
- image: image
- description: string
```

### API Routes

#### POST /api/revalidate

- **Trigger:** Sanity webhook on publish/update
- **Headers:** `x-sanity-revalidate-secret` (matches `SANITY_REVALIDATE_SECRET`)
- **Body:** { type, documentId }
- **Action:** Calls `revalidateTag()` with tag "pageContent"
- **Response:** JSON { success: true, revalidated: [] }

---

## Data Flow

### Page Rendering Flow

```
1. User visits /collection/[slug]
   ↓
2. Page component calls getPropertyBySlug(slug)
   ↓
3. Sanity GROQ query fetches property + rooms[] from CMS
   ↓
4. Component renders HTML (server-side)
   ↓
5. Browser receives static HTML
   ↓
6. React hydrates with client-side interactivity
   ↓
7. Next.js caches page for future requests (ISR)
   ↓
8. Webhook revalidates on CMS publish → cache cleared
```

### CMS Content Update Flow

```
Content Manager
   ↓ (edit + publish in Sanity Studio)
Sanity API
   ↓ (triggers webhook)
GitHub Webhook
   ↓ (POST /api/revalidate)
Next.js revalidateTag()
   ↓ (clears cache)
ISR regenerates page
   ↓ (on next request)
Browser loads fresh content
```

### Component Rendering Flow

```
Page Layout
   ↓
Navigation (sticky, scroll-triggered)
   ↓
Hero Section
   ↓
Property Gallery (scroll-snap lightbox)
   ↓
Features Section
   ↓
ScrollReveal (useInView + CSS fade-in)
   ↓
CTA Banner
   ↓
Footer (CMS siteSettings)
```

---

## Design System (CSS Variables)

### Colors

```css
--color-ocean: #0d2b3e /* Deep blue */ --color-sand: #c9a87c /* Warm beige */
  --color-ivory: #f7f2ea /* Off-white */ --color-gold: #b8945a /* Accent gold */
  --color-text: #1a1a1a /* Dark text */ --color-border: #d4ccc3
  /* Light border */;
```

### Typography

```css
--font-serif:
  "Cormorant Garamond", serif /* Headings */ --font-sans: "Inter",
  sans-serif /* Body, UI */ --font-size-h1: 3.5rem /* Page title */
    --font-size-h2: 2.5rem /* Section heading */ --font-size-h3: 1.75rem
    /* Subsection */ --font-size-body: 1rem /* Paragraph */
    --font-size-small: 0.875rem /* Caption, label */;
```

### Spacing (Modular Scale)

```css
--space-1: 0.25rem /* 4px */ --space-2: 0.5rem /* 8px */ --space-4: 1rem
  /* 16px */ --space-6: 1.5rem /* 24px */ --space-8: 2rem /* 32px */
  --space-12: 3rem /* 48px */ --space-16: 4rem /* 64px */ --space-24: 6rem
  /* 96px */ --space-32: 8rem /* 128px */;
```

### Transitions

```css
--transition-default: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)
  --transition-slow: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Key Technologies & Why

| Tech             | Purpose                                                  | Trade-offs                              |
| ---------------- | -------------------------------------------------------- | --------------------------------------- |
| **Next.js 16**   | Framework with ISR, Image optimization, built-in routing | Requires Node.js 20+                    |
| **React 19**     | UI library, state management, hooks                      | Sanity v5 requires React 19+            |
| **TypeScript**   | Type safety, IDE autocompletion, refactoring safety      | Compilation step slows feedback         |
| **Tailwind CSS** | Utility-first CSS, design tokens via CSS vars            | Large CSS bundle if not optimized       |
| **Sanity v5**    | Flexible CMS, GROQ queries, embedded Studio              | API rate limits, requires editor token  |
| **Bun**          | 3x faster package manager, better lock file              | Smaller ecosystem than npm              |
| **Vercel**       | Zero-ops hosting, auto-scaling, global CDN               | Vendor lock-in, Pro tier for commercial |
| **Turbopack**    | 5-10x faster Next.js builds                              | Still maturing (default in Next.js 16)  |

---

## Performance Considerations

### Static Generation (108 pages)

- **What:** All 7 static pages + 38 properties + 90 rooms pre-rendered at build
- **When:** `bun run build`
- **Result:** HTML files in `.next/static/pages/`
- **TTL:** ISR revalidates on CMS webhook (automatic)

### Image Optimization

- **Component:** `<Image>` from `next/image`
- **Features:** WebP conversion, responsive srcSet, lazy loading
- **CDN:** Vercel Edge Network (automatic image optimization + caching)

### Code Splitting

- **Bundling:** Turbopack (Next.js 16 default) bundles code efficiently
- **Lazy Loading:** React.lazy() for heavy components (Lightbox)
- **Result:** ~150KB gzipped JS per page

### Caching Strategy

- **Browser:** 1 hour for CSS, JS, images
- **Vercel Edge:** static assets served from CDN (immutable, fingerprinted)
- **ISR:** 60s revalidation window

---

## Dependencies (Key)

| Package             | Version | Purpose                 |
| ------------------- | ------- | ----------------------- |
| `next`              | 16      | Framework               |
| `react`             | 19      | UI library              |
| `typescript`        | 5+      | Type checking           |
| `tailwindcss`       | 3+      | Styling                 |
| `@sanity/client`    | 6+      | CMS API client          |
| `@sanity/image-url` | Latest  | Image URL builder       |
| `@sanity/vision`    | Latest  | Required for prod build |

See `package.json` for full dependency list.

---

## Common Tasks

### Adding a New Page

1. Create `src/app/(site)/new-page/page.tsx`
2. Define metadata (title, description)
3. Fetch content from CMS (if needed)
4. Add link to Navigation component

### Adding a Property

1. Go to `/studio` → Properties
2. Create new property document
3. Fill: name, slug, category, description, images, pricing, rooms
4. Publish → webhook triggers `/api/revalidate`
5. Page auto-generates and caches

### Updating Design Tokens

1. Edit `src/styles/globals.css` (CSS variables section)
2. All components automatically inherit new values
3. No component file changes needed

### Deploying to Production

1. Push to `main` branch
2. Vercel auto-detects push
3. Vercel builds with Turbopack (`next build`)
4. Vercel deploys to Edge + Serverless Functions
5. HTTPS live within ~2 minutes

---

**Last Updated:** November 6, 2026 (Vercel migration) | **Framework Version:** Next.js 16 | **Status:** Production on Vercel
