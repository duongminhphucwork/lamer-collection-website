# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER / CLIENT                         │
│  (Desktop, Tablet, Mobile - iOS Safari, Chrome, Firefox, etc)   │
└────────────────────────────┬──────────────────────────────────┘
                             │
                    HTTPS (TLS 1.3, auto-renewed)
                             │
         ┌───────────────────┴───────────────────┐
         │                                       │
┌────────▼──────────────────────┐    ┌──────────▼──────────┐
│   VERCEL EDGE NETWORK         │    │  GitHub / Vercel   │
│   (Global CDN + Cache)        │    │  Auto-Deploy       │
│ - SSL Termination             │    │ - Push main branch │
│ - Static asset serving        │    │ - Turbopack build  │
│ - Request routing             │    │ - Auto-deploy prod │
└────────┬──────────────────────┘    └────────────────────┘
         │
         │ HTTP to Serverless Functions
         │
┌────────▼──────────────────────────────────────────┐
│     VERCEL SERVERLESS FUNCTIONS (Hobby plan)      │
│     - Next.js 16 App Router                       │
│     - Automatic scaling, zero cold starts         │
│     - Built-in CDN caching                        │
└────────┬──────────────────────────────────────────┘
         │
    ┌────┴─────────────────────────┐
    │                              │
┌───▼──────────────┐      ┌────────▼────────────┐
│ Next.js Runtime  │      │ Environment Vars    │
│ - Pages, API     │      │ (Vercel dashboard)  │
│ - ISR cache      │      │ - API tokens        │
│ - Image opt      │      │ - Secrets           │
└──────────────────┘      └─────────────────────┘
```

---

## Architecture Layers

### 1. Edge Layer (Vercel CDN)

- **Component:** Vercel Edge Network (global CDN)
- **Responsibility:** TLS termination, request routing, static asset serving, caching
- **Features:**
  - SSL certificate (auto-managed, auto-renewed)
  - Gzip compression for HTML/CSS/JS
  - Browser cache headers (optimized per content type)
  - DDoS protection and rate limiting (built-in)
  - Global edge locations for low latency

### 2. Application Layer (Vercel Serverless)

- **Component:** Vercel Serverless Functions (Node.js runtime)
- **Responsibility:** Server-side rendering, API routes, ISR revalidation
- **Runtime:**
  - Framework: Next.js 16 (App Router)
  - Memory: Allocated per request (scales automatically)
  - Process Manager: Vercel (no manual process management)
  - Cold starts: Minimized by Vercel infrastructure

### 3. Framework Layer (Next.js)

- **Component:** Next.js 16 App Router
- **Responsibility:** Page routing, static generation, ISR, image optimization
- **Capabilities:**
  - Static pages: 7 base pages pre-rendered at build
  - Dynamic ISR pages: 38 properties + 90 rooms (revalidate on webhook)
  - API routes: `/api/revalidate` webhook handler
  - Built-in Image optimization: WebP, responsive srcSet

### 4. Presentation Layer (React)

- **Component:** React 19 components
- **Responsibility:** UI rendering, client-side interactivity, state management
- **Patterns:**
  - Server Components (default) for data fetching
  - Client Components ("use client") for interactivity
  - Custom hooks: `useInView` for scroll reveals
  - CSS: Tailwind + CSS Variables for theming

### 5. Data Layer (CMS)

- **Component:** Sanity v5 with GROQ queries
- **Responsibility:** Content management, data modeling, versioning
- **Features:**
  - Embedded Studio at `/studio` route
  - GROQ queries for efficient data fetching
  - Webhook revalidation on publish/update
  - Version control + rollback
  - Editor token authentication

### 6. External APIs

- **Sanity API:** RESTful API for CMS queries
- **GitHub API:** For deployment webhooks and CI/CD
- **DNS/CDN:** Namecheap (domain), Let's Encrypt (SSL)

---

## Data Flow Diagrams

### Page Request Flow (Cached)

```
User Browser Request
       │
       ▼
Vercel Edge Network (CDN)
       │
       ├─ Cache HIT (static / ISR fresh)
       │  └─► Return cached HTML + assets from edge
       │
       └─ Cache MISS or ISR EXPIRED
          │
          ▼
    Vercel Serverless Function (Next.js)
          │
          ├─ Static Page?
          │  └─► Return pre-built HTML
          │
          ├─ ISR Dynamic Page?
          │  └─► Check ISR cache
          │     ├─ Cache valid?
          │     │  └─► Return cached HTML
          │     └─ Cache expired?
          │        └─► Regenerate → Cache → Return
          │
          └─ API Route?
             └─► Execute handler → Return JSON
```

### CMS Content Update Flow

```
Content Manager
       │ (Edit property in Sanity Studio)
       ▼
Sanity API
       │ (Webhook trigger on publish)
       ▼
POST /api/revalidate
(verified via Sanity signed secret / SANITY_REVALIDATE_SECRET)
       │
       ▼
Next.js revalidateTag('pageContent')
       │
       ├─ Clear ISR cache for affected paths
       └─ Return success response
       │
       ▼
User visits page
       │
       ▼
Next.js regenerates page
(fetches fresh data from Sanity)
       │
       ▼
Return fresh HTML + cache for next hour
```

### Build & Deployment Flow

```
Developer
       │ (git push to main)
       ▼
GitHub → Vercel Webhook
       │
       ├─ Step 1: Checkout code
       ├─ Step 2: Install deps (bun install)
       ├─ Step 3: Type check (tsc --noEmit)
       ├─ Step 4: Build with Turbopack (next build)
       │  └─ Generate optimized .next output
       └─ Step 5: Deploy to Edge + Serverless
          │
          ├─ CDN cache invalidated
          ├─ Serverless functions updated
          └─ Health check: automatic
             │
             ▼
          Website live (typically < 2 minutes)
```

### Component Rendering Flow

```
Page Layout
    │
    ├─ <Navigation /> (sticky, scroll-triggered)
    │   └─ useInView hook → CSS fade-in on scroll
    │
    ├─ <HeroSection /> (CMS data)
    │   └─ Next.js Image optimization
    │
    ├─ <PropertyGallery /> (lightbox)
    │   ├─ Scroll-snap carousel
    │   └─ Mobile menu (Escape to close)
    │
    ├─ <ScrollReveal> (children components)
    │   └─ Trigger animations on scroll
    │
    ├─ <Features /> (CMS sections)
    │   └─ Dynamic layout based on section type
    │
    ├─ <CtaBanner />
    │   └─ Link to contact form
    │
    └─ <Footer /> (CMS siteSettings)
        └─ Phone, email, Zalo from CMS
```

---

## Key System Components

### Sanity CMS Integration

#### Document Schema Hierarchy

```
Property (38 total)
├── name: string
├── slug: slug
├── category: "heritage" | "mediterranean" | "hotel"
├── description: rich text
├── images[]: image references
├── pricing: { weekday, weekend, holiday }
├── rooms[]: nested Room documents (hotels only)
│   ├── name: string
│   ├── slug: slug
│   ├── capacity: number
│   ├── pricing: { weekday, weekend, holiday }
│   └── images[]: image references
└── location: string

PageContent (7 documents)
├── slug: "home" | "story" | "experience" | "vinh-hy" | "gallery"
├── hero: { image, title, subtitle, cta }
└── sections[]:
    ├── type: "image" | "gallery" | "text" | "features" | "testimonial"
    ├── content: varies by type
    └── hidden: boolean (for conditional display)

SiteSettings (1 singleton)
├── phone: string
├── email: string
├── zalo: string
├── address: string
├── hours: { open, close }
└── footerText: rich text

GalleryItem (N items)
├── title: string
├── slug: slug
├── image: image reference
└── description: rich text
```

#### GROQ Query Patterns

```typescript
// Single property with rooms
*[_type == "property" && slug.current == $slug][0] {
  ...,
  "rooms": rooms[] { ... }
}

// All properties (paginated)
*[_type == "property"] | order(name asc) {
  ...,
  "thumbnail": images[0]
}[0..19]

// Page content with all sections
*[_type == "pageContent" && slug == $slug][0] {
  ...,
  sections[] { ... }
}
```

### API Route Architecture

#### POST /api/revalidate (Webhook Handler)

```typescript
// src/app/api/revalidate/route.ts

1. Validate webhook secret (SANITY_REVALIDATE_SECRET)
2. Parse request body { type, documentId, documentIds[] }
3. Extract affected page slugs from document type
4. Call revalidateTag('pageContent') - Next.js 16 API
5. Return JSON { success: true, revalidated: [] }
6. Vercel Edge serves the regenerated page on the next request

// Affected routes:
- Property changed → /collection/[slug] revalidated
- PageContent changed → /[slug] revalidated
- SiteSettings changed → all routes affected
- GalleryItem changed → /gallery revalidated
```

### Cache Strategy

| Layer           | TTL        | Key Factors                              |
| --------------- | ---------- | ---------------------------------------- |
| **Browser**     | 1 hour     | Cache-Control headers                    |
| **Vercel Edge** | immutable  | Static assets (.js, .css, images) at CDN |
| **ISR**         | 60 seconds | Next.js revalidateTag() on webhook       |
| **Sanity**      | N/A        | Always fresh (useCdn: false)             |

---

## Performance Characteristics

### Page Load Timeline (Typical)

```
User visits /collection/luxury-villa
        │
        ├─ DNS lookup: 100ms
        ├─ TLS handshake: 150ms
        ├─ HTTP request: 50ms
        │
        ├─ Server response: 100-200ms
        │  (fetch CMS → render React → serialize HTML)
        │
        ├─ Browser parse HTML: 50ms
        ├─ Download CSS/JS: 100-150ms (gzipped)
        ├─ Execute JS: 100ms
        ├─ Render DOM: 100ms
        ├─ Load images (lazy): 300-500ms
        │
        └─ Total (LCP): ~1.5-2.5s on 4G
```

### Concurrent User Capacity

| Metric                 | Value            | Notes                          |
| ---------------------- | ---------------- | ------------------------------ |
| **Memory per request** | ~1-2MB           | Node.js + React hydration      |
| **Requests/second**    | 100-200          | Single VPS (2 vCPU)            |
| **Concurrent users**   | 500-1000         | With caching (ISR)             |
| **Bottleneck**         | ISR regeneration | Takes ~5-10s for complex pages |

---

## Security Architecture

### HTTPS / TLS

- **Protocol:** TLS 1.3 (Vercel Edge)
- **Certificate:** Managed by Vercel (auto-renewed)
- **HSTS:** Enabled (strict-transport-security)

### Authentication

- **CMS Access:** Sanity editor token (only in `.env.local`)
- **Webhook:** SANITY_REVALIDATE_SECRET header validation
- **Deployment:** GitHub token (auto-linked with Vercel)

### Network Security (Vercel)

- No exposed SSH or server ports
- DDoS protection built-in
- Rate limiting and firewall rules managed by Vercel
- Only HTTP(S) ports exposed publicly

### Environment Variables

```bash
# Production (Vercel dashboard → Settings → Environment Variables)
NEXT_PUBLIC_SANITY_PROJECT_ID=o2kvv3c9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...              # Sensitive
SANITY_REVALIDATE_SECRET=...        # Sensitive

# Local development (.env.local - git-ignored)
NEXT_PUBLIC_SANITY_PROJECT_ID=o2kvv3c9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...
SANITY_REVALIDATE_SECRET=...
```

---

## Disaster Recovery

### Backup Strategy

- **CMS Data:** Sanity provides built-in versioning + rollback
- **Code:** GitHub repository (all commits backed up)
- **Static Assets:** Generated from source (no separate backup needed)
- **Database:** N/A (CMS-based, no database)

### Rollback Procedure

**If deployment breaks:**

1. Go to Vercel dashboard → Deployments
2. Find previous good deployment
3. Click ⋯ → Promote to Production (or use CLI: `vercel rollback <deployment-url>`)
4. Verify site is live and working

**If CMS content is wrong:**

- Use Sanity Studio to revert to previous version (built-in versioning)
- Or push new code commit to trigger fresh deployment

---

## Monitoring & Observability

### Health Checks

- **Endpoint:** GET / (home page)
- **Expected:** HTTP 200 + HTML content
- **Frequency:** Vercel monitors all deployments
- **Action on failure:** Vercel notifies via dashboard + email

### Logging

- **Deployment logs:** Vercel dashboard → Deployments → click deployment → Logs
- **Runtime errors:** Vercel dashboard → Functions
- **Build output:** Vercel dashboard → Deployments → Build Logs
- **Retention:** Vercel archives logs; no manual setup needed

### Metrics to Track

- **Core Web Vitals:** Lighthouse score > 90
- **Response time:** < 200ms (p95)
- **Error rate:** < 0.1%
- **Uptime:** Vercel SLA 99.9%
- **Build time:** < 2 minutes (Turbopack)

---

## Deployment Architecture Details

### Vercel Configuration

The site is deployed on Vercel (Hobby plan, free tier). Configuration is managed via:

1. **vercel.json** (repo root)

   ```json
   {
     "framework": "nextjs"
   }
   ```

   This ensures Vercel recognizes the project as Next.js and uses the correct build process.

2. **Environment Variables** (Vercel dashboard)
   - Set in Project → Settings → Environment Variables
   - Applied to production, preview, and development environments
   - Secrets never stored in code or `.env` file

3. **Deployment Trigger**
   - Automatic: push to `main` branch triggers build and deploy
   - Manual: `vercel --prod --yes` (builds on Vercel and promotes)

### Build Process (Vercel)

- **Build Command:** `next build` (Turbopack, Next.js 16 default)
- **Package Manager:** Bun (auto-detected from `bun.lock`)
- **Build Time:** ~1-2 minutes (Turbopack is 5-10x faster than webpack)
- **Output:** Optimized `.next/` directory
- **Deployment:** Vercel Edge Network + Serverless Functions

### Migration Note (VPS → Vercel, 2026-11-06)

The project previously ran on a Hetzner VPS (5.223.53.106) with Nginx + systemd. During the migration to Vercel these artifacts were removed from the repo:

- `nginx/nginx.conf` - old reverse proxy config (removed)
- `.github/workflows/deploy.yml` - old SSH deploy pipeline (removed)
- `next.config.mjs` `output: "standalone"` (removed)

---

## Technology Justification Matrix

| Decision               | Alternatives Considered         | Trade-off                                       |
| ---------------------- | ------------------------------- | ----------------------------------------------- |
| **Next.js 16**         | Nuxt, Remix, Astro              | More ecosystem, wider support                   |
| **React 19**           | Vue 3, Svelte                   | Sanity v5 requires React 19+                    |
| **Sanity v5**          | Contentful, Strapi, Hygraph     | Better for nested content (rooms in properties) |
| **Tailwind CSS**       | CSS-in-JS, BEM, SCSS            | Utility-first is faster for prototyping         |
| **Vercel Serverless**  | AWS Lambda, Netlify, Cloudflare | Zero ops overhead, auto-scaling, free tier      |
| **Bun**                | npm, pnpm, yarn                 | 3x faster, but smaller ecosystem                |
| **Vercel CDN**         | Cloudflare, AWS CloudFront      | Built-in, auto SSL, global edge locations       |
| **GitHub Auto-Deploy** | GitLab CI, Jenkins              | Simple, integrated with repo, no extra config   |

---

## Future Architecture Considerations

### Scaling Opportunities

1. **Caching Layer:** Add Redis for CMS query caching
2. **CDN:** Cloudflare for image optimization + edge caching
3. **Booking Engine:** Separate Next.js app for reservation system
4. **Analytics:** Posthog or Vercel Analytics for user behavior
5. **Search:** Algolia for property search (instead of client-side filters)

### Database (When Needed)

- **Option 1:** Supabase (PostgreSQL + auth)
- **Option 2:** MongoDB (flexible schema)
- **Not needed now:** Sanity + ISR caching sufficient

---

**Last Updated:** November 6, 2026 (Vercel migration) | **Architecture Version:** 2.0 | **Status:** Production on Vercel
