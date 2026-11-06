# La Mer Collection - Project Overview & PDR

## Executive Summary

La Mer Collection is a luxury hospitality property management and booking showcase website for high-end Vietnamese villas and boutique hotel experiences. The platform presents 38 curated properties (18 heritage villas, 14 mediterranean villas, 6 hotel buildings with 90 total rooms) through a sophisticated, design-focused web experience.

**Live Domain:** lamercollection.com
**Target Audience:** Luxury travelers, international tourists, property seekers
**Market:** Vietnam luxury hospitality (Vĩnh Hỷ region focus)

---

## Product Vision

Create a world-class digital experience for La Mer Collection properties that:

- Showcases luxury through refined design and seamless interactions
- Enables travelers to explore, compare, and discover properties effortlessly
- Integrates content management for real-time updates without developer intervention
- Delivers SEO excellence for international property discovery
- Provides responsive experiences across all devices (desktop, tablet, mobile)

---

## Functional Requirements

### 1. Property Discovery

- **Collection Page:** Browse all 38 properties with filtering (category, search, capacity, price range)
- **Property Detail Pages:** Full information per property (images, description, amenities, pricing, availability)
- **Room Detail Pages:** Hotel-specific—individual room showcase with pricing tiers (weekday, weekend, holiday)
- **Smart Filtering:** Category (heritage/mediterranean/hotel), search by name, capacity stepper, price range slider

### 2. Content Management

- Sanity v5 CMS for non-developer content updates
- Property schemas: name, slug, description, images, rooms, pricing, amenities, location
- Page content sections (hero, features, gallery, testimonials) managed per page
- Site-wide settings (phone, email, Zalo, hours, address) from siteSettings singleton
- Gallery items with lightbox and mobile menu support

### 3. User Experience

- **Performance:** ISR (Incremental Static Regeneration) for 108 static pages + webhook revalidation
- **Animations:** Scroll-triggered reveals using CSS transitions + useInView (no Framer Motion SSR issues)
- **Responsive Design:** Mobile-first, optimized for iOS Safari (overflow fixes), tablet, desktop
- **Accessibility:** WCAG 2.1 AA - skip-to-content, form labels, focus-visible, keyboard navigation
- **Navigation:** Fixed header (transparent→solid on scroll), mobile hamburger menu, sticky footer with CTA

### 4. SEO & Discoverability

- Unique metadata per page (title, description, og:image, og:url)
- JSON-LD structured data (LodgingBusiness, BreadcrumbList, Product)
- Dynamic sitemap.ts + robots.ts for search engine crawling
- Open Graph + Twitter Card support for social sharing
- Mobile-friendly responsive design

### 5. Contact & Inquiries

- Contact form on "Liên Hệ" page with Sanity-managed contact info
- CMS-driven phone/email/Zalo links
- CTA buttons throughout site linking to contact

---

## Non-Functional Requirements

### Performance

- **Page Load Time:** < 2s on 4G (Core Web Vitals)
- **Static Page Generation:** 108 pages pre-rendered at build time
- **ISR Revalidation:** < 1min after CMS publish
- **Image Optimization:** Next.js Image with WebP, responsive srcSet
- **Bundle Size:** Lighthouse score > 90

### Scalability

- Support up to 100+ properties without performance degradation
- Handle 10k+ concurrent visitors during peak season
- CMS capable of managing 500+ rooms across properties

### Reliability

- 99.9% uptime SLA (Vercel infrastructure)
- Automated health checks and error tracking
- Zero-downtime deployments (push to main → auto-deploy)
- Automated SSL renewal (Vercel managed)

### Security

- HTTPS everywhere (Vercel managed SSL)
- Sanity API token rotation (editor tokens only in .env.local)
- Environment variables stored in Vercel project settings (not in code)
- No database credentials in code
- No exposed server infrastructure (serverless model)

### Maintainability

- TypeScript for type safety
- Clear separation of concerns (components, API, CMS queries)
- Comprehensive documentation (README, code standards, architecture)
- Automated CI/CD (GitHub Actions) for consistent deployments
- Seed scripts for repeatable data seeding

---

## Technical Architecture

### Tech Stack Selection

| Layer           | Choice                       | Rationale                                               |
| --------------- | ---------------------------- | ------------------------------------------------------- |
| Framework       | Next.js 16 (App Router)      | SEO, ISR, built-in optimization                         |
| Runtime         | React 19                     | Latest Sanity v5 compatibility                          |
| Language        | TypeScript                   | Type safety, developer productivity                     |
| Styling         | Tailwind CSS + CSS Variables | Design token consistency, rapid development             |
| CMS             | Sanity v5                    | Flexible schemas, GROQ queries, embedded Studio         |
| Hosting         | Vercel (Hobby plan, free)    | Zero infrastructure management, auto-scaling, free tier |
| Package Manager | Bun                          | 3x faster than npm, better lock file                    |
| CI/CD           | GitHub + Vercel auto-deploy  | Push to main → auto-build & deploy, no SSH needed       |

### Data Model

```
Property (Sanity document)
├── name, slug, category (heritage|mediterranean|hotel)
├── description, location, amenities
├── images[], pricing (weekday, weekend, holiday)
└── rooms[] (Hotel only)
    ├── name, slug, description
    ├── capacity, view type
    ├── pricing (weekday, weekend, holiday)
    └── images[]

Room (nested in Property)
├── name, slug
├── capacity, view type, description
├── pricing tiers
└── images[]

PageContent (per page: home, collection, experience, story, etc.)
├── hero (image, title, subtitle)
├── sections[]
│   ├── type (image, gallery, testimonial, features)
│   └── content (varies per type)

SiteSettings (singleton)
├── phone, email, zalo, address, hours
└── footer metadata
```

### Pages & Routes

| Route                     | Type        | Generated             | Purpose                  |
| ------------------------- | ----------- | --------------------- | ------------------------ |
| /                         | Static      | Yes                   | Home page                |
| /collection               | Static      | Yes                   | All properties browser   |
| /collection/[slug]        | Dynamic ISR | Yes (38)              | Property detail          |
| /collection/[slug]/[room] | Dynamic ISR | Yes (90, hotels only) | Room detail              |
| /experience               | Static      | Yes                   | Experience showcase      |
| /story                    | Static      | Yes                   | Brand story              |
| /vinh-hy                  | Static      | Yes                   | Location info            |
| /gallery                  | Static      | Yes                   | Gallery showcase         |
| /lien-he                  | Static      | Yes                   | Contact form             |
| /studio                   | CMS         | No                    | Sanity Studio (embedded) |
| /api/revalidate           | Webhook     | No                    | ISR revalidation trigger |

---

## Key Decisions & Constraints

### Why Next.js 16 / React 19?

- Sanity v5 requires React 19+
- App Router enables better code organization
- ISR + webhook revalidation eliminate stale content without rebuilds
- Built-in Image optimization for performance

### Why Pure CSS Transitions (Not Framer Motion)?

- Framer Motion motion.div causes SSR hydration mismatch → blank page on first load
- Solution: useInView hook + CSS transitions (custom useInView hook in components/)
- Trade-off: Less complex animations, but better reliability

### Why Vercel (Not Self-Hosted)?

- Removes infrastructure management burden (no VPS, Nginx, systemd, SSL renewal)
- Serverless deployment: push to main → instant auto-build & deploy
- Built-in CDN + Edge caching for global performance
- Free Hobby tier; scales to Pro (~$20/mo) if commercial use grows
- Turbopack for 5-10x faster builds than webpack

### Why CSS Variables (Not Tailwind Gradients)?

- Design tokens from prototype: --color-ocean, --space-24, etc.
- Inline CSS string gradients for card backgrounds (Tailwind gradient classes don't support CSS vars)
- All tokens defined in global CSS, easy to rebrand

### Why Sanity (Not Firebase / Supabase)?

- Better for content modeling (flexible schemas, nested objects)
- GROQ queries more powerful than REST APIs
- Embedded Studio at /studio (no separate CMS tab)
- Version control + rollback capabilities

### Why ISR + Webhook (Not Continuous Rebuilds)?

- Vercel builds are fast (~1min with Turbopack); ISR saves recompile cost
- Static pages served instantly, revalidate on CMS publish
- Webhook: automated revalidation (no manual triggers)
- Fallback: manual revalidation via `/api/revalidate` if webhook fails

---

## Success Metrics

### Business KPIs

- **Property Inquiries:** Track contact form submissions per property
- **Traffic:** Organic search visitors (target: 10k+/month)
- **Bounce Rate:** < 40% (indicates engaging content)
- **Time on Site:** > 2 min avg (indicates property interest)

### Technical KPIs

- **Lighthouse Score:** > 90 (mobile & desktop)
- **Core Web Vitals:** All green (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- **Page Load Time:** < 2s on 4G
- **Deployment Time:** < 2min (git push → live via Vercel)
- **Uptime:** 99.9% (Vercel SLA)

### Content KPIs

- **CMS Update Time:** < 1min (publish → live)
- **Property Coverage:** All 38 properties fully documented
- **Room Coverage:** All 90 rooms with images + pricing
- **SEO:** Rank top 3 for "Vĩnh Hỷ resort", "luxury villas Vietnam"

---

## Roadmap Status

### Completed Phases (✓)

1. **Phase 1-4:** Infrastructure, routing, component setup
2. **Phase 5:** CMS integration (schemas, queries, seed data)
3. **Phase 7:** Deployment (VPS, CI/CD, SSL)
4. **Phase 8:** SEO & Accessibility (metadata, JSON-LD, a11y)

### Current Work (→)

- Property detail pages (villa/hotel, room details, filtering UI)
- Dynamic room pricing display

### Future Phases

- Booking engine integration (property inquiry → reservation)
- Admin dashboard for property managers
- Analytics dashboard (visitor flow, property popularity)
- Multi-language support (en/vi)
- Blog/news section for travel tips

---

## Acceptance Criteria

### Launch Readiness (Phase 8 Complete)

- [ ] All 7 pages live with CMS content
- [ ] 38 properties + 90 rooms indexed
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals all green
- [ ] Mobile responsive tested on iOS Safari
- [ ] Contact form submissions working
- [ ] DNS pointing to Vercel (A `@` → 216.198.79.1, CNAME `www` → cname.vercel-dns.com)
- [ ] SSL certificate valid (auto-renewed by Vercel)
- [ ] Auto-deploy pipeline active (push to main)
- [ ] Uptime monitoring configured

### Post-Launch Maintenance

- [ ] Weekly content audits (broken links, outdated info)
- [ ] Monthly SEO performance review
- [ ] Quarterly performance optimization review
- [ ] Vercel deployment monitoring (auto-alerts on build failures)
- [ ] Backup strategy for CMS data (Sanity provides built-in versioning)

---

## Risk Assessment

| Risk                         | Impact | Mitigation                                                           |
| ---------------------------- | ------ | -------------------------------------------------------------------- |
| Sanity API downtime          | High   | Cache data in Redis (future), fallback content in code               |
| Image optimization failure   | Medium | CDN cache headers, Image component with fallback formats             |
| Deployment failure           | High   | Automated rollback on health check failure, git rollback             |
| SEO ranking delay            | Medium | Submit sitemap to Google Search Console, backlinks strategy          |
| Mobile responsiveness issues | Medium | Regular iOS/Android testing, useMediaQuery hooks for complex layouts |
| Performance degradation      | Medium | Lighthouse monitoring, Core Web Vitals tracking, CDN expansion       |

---

## Team & Responsibilities

| Role               | Responsibility                                           |
| ------------------ | -------------------------------------------------------- |
| Product Owner      | Define features, prioritize roadmap                      |
| Frontend Developer | Implement React components, CMS integration, git push    |
| Content Manager    | Create/update property info, images, CMS content         |
| DevOps             | Monitor Vercel deployments, manage environment variables |
| QA                 | Test responsive design, SEO, performance                 |

---

## References

- **Live Site:** https://lamercollection.com
- **CMS Dashboard:** https://lamercollection.sanity.studio
- **GitHub Repo:** https://github.com/duongminhphucwork/lamer-collection-website
- **Host:** Vercel (Hobby plan, migrated 2026-11-06)
- **Deployment:** Auto-triggered by push to main branch

---

**Last Updated:** November 6, 2026 (Vercel migration) | **Version:** 1.1 | **Status:** Live on Vercel
