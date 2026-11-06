# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER / CLIENT                         │
│  (Desktop, Tablet, Mobile - iOS Safari, Chrome, Firefox, etc)   │
└────────────────────────────┬──────────────────────────────────┘
                             │
                    HTTPS (TLS 1.3)
                             │
         ┌───────────────────┴───────────────────┐
         │                                       │
┌────────▼──────────────┐            ┌──────────▼─────────┐
│   NGINX REVERSE      │            │  GitHub Actions    │
│   PROXY (Port 443)   │            │  CI/CD Pipeline    │
│ - SSL Termination   │            │ - Type Check       │
│ - Gzip Compression  │            │ - Build            │
│ - Cache Headers     │            │ - Deploy via SSH   │
│ - Static Assets     │            │ - Health Check     │
└────────┬──────────────┘            └────────────────────┘
         │
         │ HTTP (Port 3000)
         │
┌────────▼──────────────────────────────────────┐
│     HETZNER VPS (5.223.53.106)                │
│     CPX22: 2 vCPU, 4GB RAM, Singapore        │
│     systemd service: lamer-web               │
└────────┬──────────────────────────────────────┘
         │
    ┌────┴─────┬──────────────┬──────────────┐
    │           │              │              │
┌───▼───┐  ┌────▼──────┐  ┌────▼──────┐  ┌──▼────────┐
│ Node  │  │ .next/    │  │node_      │  │.env       │
│.js    │  │standalone │  │modules    │  │(secrets)  │
│server │  │(app code) │  │(deps)     │  │           │
└───────┘  └───────────┘  └───────────┘  └───────────┘
```

---

## Architecture Layers

### 1. Edge Layer (CDN / Reverse Proxy)

- **Component:** Nginx
- **Responsibility:** TLS termination, request routing, static asset serving, compression
- **Features:**
  - SSL certificate (Let's Encrypt, auto-renewed via certbot)
  - Gzip compression for HTML/CSS/JS
  - Browser cache headers (1 hour for assets)
  - Rate limiting (optional)
  - DDoS protection via UFW firewall

### 2. Application Server Layer

- **Component:** Node.js + Next.js standalone
- **Responsibility:** Server-side rendering, API routes, ISR revalidation
- **Runtime:**
  - Process: `node .next/standalone/server.js`
  - Port: 3000 (internal, proxied via Nginx)
  - Memory: ~500MB typical
  - Process Manager: systemd `lamer-web` service

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
Nginx (Check Cache)
       │
       ├─ Cache HIT (< 1 hour old)
       │  └─► Return cached HTML + assets
       │
       └─ Cache MISS or EXPIRED
          │
          ▼
    Node.js App Server
          │
          ├─ Static Page?
          │  └─► Return pre-built HTML from .next/standalone
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
(with SANITY_REVALIDATE_SECRET header)
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
GitHub Actions
       │
       ├─ Step 1: Checkout code
       ├─ Step 2: Setup Bun
       ├─ Step 3: bun install
       ├─ Step 4: bun run type-check (tsc --noEmit)
       ├─ Step 5: bun run build
       │  └─ Generate .next/standalone + static assets
       └─ Step 6: SSH to VPS
          │
          ├─ git pull origin main
          ├─ bun install
          ├─ rm -rf .next/cache (clear ISR cache)
          ├─ bun run build
          ├─ cp .next/static to /opt/lamer-website/.next/static
          └─ systemctl restart lamer-web
             │
             ▼
          Health check: curl localhost:3000
             │
             └─ Success? → Website live
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
6. Nginx caches the response

// Affected routes:
- Property changed → /collection/[slug] revalidated
- PageContent changed → /[slug] revalidated
- SiteSettings changed → all routes affected
- GalleryItem changed → /gallery revalidated
```

### Cache Strategy

| Layer       | TTL        | Key Factors                        |
| ----------- | ---------- | ---------------------------------- |
| **Browser** | 1 hour     | Cache-Control headers from Nginx   |
| **Nginx**   | 24 hours   | Static assets (.js, .css, images)  |
| **ISR**     | 60 seconds | Next.js revalidateTag() on webhook |
| **Sanity**  | N/A        | Always fresh (useCdn: false)       |

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

- **Protocol:** TLS 1.3 (Nginx)
- **Certificate:** Let's Encrypt (auto-renewed via certbot)
- **HSTS:** Enabled (strict-transport-security)

### Authentication

- **CMS Access:** Sanity editor token (only in .env.local)
- **Webhook:** SANITY_REVALIDATE_SECRET header validation
- **SSH Deploy:** GitHub Actions SSH key (stored in Secrets)

### Firewall (UFW)

```
Allow: SSH (22/tcp) - from GitHub Actions IPs only
Allow: HTTP (80/tcp) - Nginx redirect to HTTPS
Allow: HTTPS (443/tcp) - Public access
Deny: All else
```

### Environment Variables

```bash
# Server (.env file)
SANITY_PROJECT_ID=o2kvv3c9
SANITY_DATASET=production
SANITY_API_TOKEN=sk...        # Sensitive: systemd EnvironmentFile
SANITY_REVALIDATE_SECRET=...  # Sensitive: webhook validation

# Local (.env.local - git-ignored)
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

```bash
# 1. SSH to VPS
ssh root@5.223.53.106

# 2. Check systemd logs
journalctl -u lamer-web -n 50

# 3. Rollback to previous commit
cd /opt/lamer-website/repo
git log --oneline | head -5
git reset --hard <previous-commit-hash>
git clean -fd

# 4. Rebuild and restart
bun install
bun run build
systemctl restart lamer-web

# 5. Verify
curl localhost:3000
```

**If CMS content is wrong:**

- Use Sanity Studio to revert to previous version
- Or rollback to previous git commit if code changed

---

## Monitoring & Observability

### Health Checks

- **Endpoint:** GET / (home page)
- **Expected:** HTTP 200 + HTML content
- **Frequency:** Every 5 minutes (GitHub Actions)
- **Action on failure:** Alert via GitHub Secrets notification

### Logging

- **Application:** systemd journalctl (stored in /var/log/)
- **Nginx:** /var/log/nginx/access.log, error.log
- **Retention:** 2 weeks (logrotate)

### Metrics to Track

- **Core Web Vitals:** Lighthouse score > 90
- **Response time:** < 200ms (p95)
- **Error rate:** < 0.1%
- **Uptime:** > 99.9%

---

## Deployment Architecture Details

### Directory Structure on VPS

```
/opt/lamer-website/
├── repo/                      # Git repository
│   ├── .next/standalone/     # Next.js standalone runtime
│   ├── public/               # Static assets
│   ├── package.json
│   └── .git/
├── .env                       # Environment file (secrets)
└── systemd service logs/     # Via journalctl
```

### systemd Service Configuration

```ini
[Unit]
Description=La Mer Collection Website
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/lamer-website/repo
EnvironmentFile=/opt/lamer-website/.env
ExecStart=/usr/bin/node .next/standalone/server.js
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

### Nginx Configuration

```nginx
upstream app_server {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name lamercollection.com www.lamercollection.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lamercollection.com www.lamercollection.com;

    ssl_certificate /etc/letsencrypt/live/lamercollection.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lamercollection.com/privkey.pem;
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers on;

    gzip on;
    gzip_types text/html text/css application/javascript;
    gzip_min_length 1000;

    location / {
        proxy_pass http://app_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1h;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Technology Justification Matrix

| Decision               | Alternatives Considered       | Trade-off                                       |
| ---------------------- | ----------------------------- | ----------------------------------------------- |
| **Next.js 16**         | Nuxt, Remix, Astro            | More ecosystem, wider support                   |
| **React 19**           | Vue 3, Svelte                 | Sanity v5 requires React 19+                    |
| **Sanity v5**          | Contentful, Strapi, Hygraph   | Better for nested content (rooms in properties) |
| **Tailwind CSS**       | CSS-in-JS, BEM, SCSS          | Utility-first is faster for prototyping         |
| **Standalone Next.js** | Docker, Vercel                | Self-hosted, no serverless cold starts          |
| **Bun**                | npm, pnpm, yarn               | 3x faster, but smaller ecosystem                |
| **Hetzner VPS**        | AWS EC2, Linode, DigitalOcean | Cost-effective, good Singapore region           |
| **Nginx**              | Apache, Caddy                 | Lightweight, proven, easy config                |

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

**Last Updated:** March 2026 | **Architecture Version:** 1.0 | **Status:** Production
