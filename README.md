# La Mer Collection Website

Luxury hospitality property management and booking platform for La Mer Collection (villas & hotel rooms).

**Domain:** [lamercollection.com](https://lamercollection.com)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **CMS:** Sanity v5 (Project ID: o2kvv3c9)
- **Package Manager:** Bun
- **Deployment:** Hetzner VPS (Singapore) + Nginx + Let's Encrypt
- **CI/CD:** GitHub Actions

## Quick Start

### Prerequisites

- Node.js 20+ (or use Bun)
- Bun package manager
- Sanity editor token (in `.env.local`)

### Installation

```bash
# Clone repository
git clone https://github.com/duongminhphucwork/lamer-collection-website.git
cd lamer-collection-website

# Install dependencies
bun install

# Setup environment
cp .env.example .env.local
# Add SANITY_API_TOKEN to .env.local
```

### Development

```bash
# Start dev server (port 3456)
bun run dev

# Open browser
open http://localhost:3456
```

### Build & Deploy

```bash
# Build for production
bun run build

# Start production server
bun start
```

CI/CD deploys automatically to VPS on git push to main.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/            # Public pages route group
│   │   ├── layout.tsx     # Navigation + Footer wrapper
│   │   ├── page.tsx       # Home page
│   │   ├── collection/    # Collection pages (all properties, property detail, room detail)
│   │   ├── experience/    # Experience page
│   │   ├── story/         # Story page
│   │   ├── vinh-hy/       # Vĩnh Hỷ page
│   │   ├── gallery/       # Gallery page
│   │   └── lien-he/       # Contact page
│   ├── studio/            # Sanity Studio route
│   └── api/
│       └── revalidate/    # ISR webhook handler
├── components/            # React components
│   ├── Layout/           # Navigation, Footer
│   ├── Features/         # PropertyGallery, CollectionFilters, RoomCard
│   ├── UI/              # ImageCard, CtaBanner, BackLink, etc.
│   └── ScrollReveal.tsx  # useInView + CSS transitions
├── sanity/
│   ├── schemas/         # GROQ document & object schemas
│   ├── queries/         # GROQ query functions
│   └── client.ts        # Sanity client configuration
└── lib/                 # Utilities & types
```

## Key Features

### Property Management

- **38 properties** across 3 categories: heritage (18 villas), mediterranean (14 villas), hotel (6 buildings)
- **90 rooms** with pricing, capacity, view types, creative names
- Dynamic detail pages: `/collection/[slug]` (property) → `/collection/[slug]/[room]` (room)

### CMS Integration

- Sanity v5 headless CMS with embedded Studio at `/studio`
- GROQ queries for efficient data fetching
- ISR webhook revalidation (POST `/api/revalidate`)
- **108 static pages** generated at build time

### Design System

- **Colors:** ocean (#0d2b3e), sand (#c9a87c), ivory (#f7f2ea), gold (#b8945a)
- **Typography:** Cormorant Garamond (headings), Inter (body)
- **Spacing:** Modular scale (--space-1 to --space-32)
- **Animations:** useInView + CSS transitions (no Framer Motion)

### Accessibility & SEO

- Unique title+description per page
- JSON-LD structured data (LodgingBusiness)
- Skip-to-content, form labels, focus-visible
- Keyboard navigation (Escape, arrow keys)

## Documentation

- **[Project Overview & PDR](docs/project-overview-pdr.md)** — Goals, features, requirements
- **[Codebase Summary](docs/codebase-summary.md)** — File structure, modules, data flow
- **[Code Standards](docs/code-standards.md)** — Conventions, naming, patterns
- **[System Architecture](docs/system-architecture.md)** — Architecture, CMS integration
- **[Design Guidelines](docs/design-guidelines.md)** — Design tokens, components
- **[Deployment Guide](docs/deployment-guide.md)** — Server setup, CI/CD, troubleshooting
- **[Project Roadmap](docs/project-roadmap.md)** — Status, completed phases, future plans

## Deployment

### Server Infrastructure

- **Host:** Hetzner CPX22 (2 vCPU, 4GB RAM, Singapore)
- **IP:** 5.223.53.106
- **Service:** systemd `lamer-web` (auto-restart)
- **Reverse Proxy:** Nginx + Let's Encrypt SSL
- **Firewall:** UFW (SSH + Nginx only)

### Environment Variables

```bash
SANITY_PROJECT_ID=o2kvv3c9
SANITY_DATASET=production
SANITY_API_TOKEN=sk...      # Editor token
SANITY_REVALIDATE_SECRET=... # Webhook secret
```

### CI/CD Pipeline

1. Push to main → GitHub Actions
2. Type check (`tsc --noEmit`)
3. SSH to VPS → git pull → bun build
4. Restart systemd service → health check

## Troubleshooting

**Issue:** Sanity content not updating after CMS changes

- **Solution:** Send POST to `/api/revalidate` with `SANITY_REVALIDATE_SECRET` header (webhook automatic)
- **Manual:** Clear `.next/cache` before rebuild

**Issue:** iOS Safari horizontal scroll

- **Solution:** Ensure `overflow-x: hidden` on both `html` and `body` elements

**Issue:** Page shows blank on SSR

- **Solution:** Check ScrollReveal component doesn't use `motion.div` (use CSS transitions instead)

**Issue:** Type errors at build time

- **Solution:** Run `bun run type-check` (runs `tsc --noEmit`); regenerate Sanity types if schema changed

## Scripts

```bash
bun run dev            # Start dev server
bun run build          # Production build
bun run start          # Start production server
bun run type-check     # TypeScript type checking
bun run lint           # ESLint (if configured)

# Seed Sanity CMS (scripts/ folder)
bun scripts/seed-sanity.ts
bun scripts/seed-properties.ts
bun scripts/seed-site-settings.ts
```

## Contributing

1. Create feature branch from main
2. Follow [Code Standards](docs/code-standards.md)
3. Write TypeScript with no type errors
4. Push to GitHub → CI/CD runs automatically
5. Review deployment logs on VPS

## License

Private project. All rights reserved.

## Contact

For questions about the codebase, see [Documentation](docs/) folder.

---

**Last Updated:** March 2026 | **Status:** Live on Production
