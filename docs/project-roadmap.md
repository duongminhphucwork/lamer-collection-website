# Project Roadmap

## Current Status

**Phase:** 8 (Post-Launch) - Property Detail Pages Implementation
**Status:** Live on Production (lamercollection.com)
**Last Updated:** March 11, 2026

---

## Completed Phases

### Phase 1-4: Foundation ✓ (Completed)

- **Timeline:** January - February 2026
- **Deliverables:**
  - Project setup (Next.js 16, React 19, TypeScript)
  - Route structure with route groups ((site), studio)
  - Component library foundation (Layout, Navigation, Footer)
  - CSS design system with tokens
  - Tailwind CSS + CSS Variables integration

### Phase 5: CMS Integration ✓ (Completed)

- **Timeline:** February - early March 2026
- **Deliverables:**
  - Sanity v5 CMS setup (project: o2kvv3c9)
  - Property schema (38 properties, 90 rooms)
  - PageContent schema for all pages
  - SiteSettings singleton (phone, email, Zalo, address)
  - GalleryItem schema for gallery showcase
  - GROQ queries in src/sanity/queries/
  - Seed scripts for reproducible data
  - Embedded Sanity Studio at /studio
  - Data migration (properties, rooms, categories)

### Phase 6: Animations (Skipped - Already Working) ✓

- **Why Skipped:** ScrollReveal animations already implemented using useInView hook + CSS transitions
- **Rationale:** Pure CSS transitions avoid Framer Motion SSR hydration issues
- **Decision:** Preferred stability over complex animation framework

### Phase 7: Deployment ✓ (Completed - Vercel, migrated 2026-11-06)

- **Timeline:** Early March 2026 (VPS); November 6, 2026 (Vercel migration)
- **Deliverables:**
  - Vercel (Hobby plan, free tier) setup
  - Auto-deploy from GitHub (push main → build & deploy)
  - Automatic SSL certificate management
  - Global CDN + Edge caching
  - Serverless function scaling (zero cold starts)
  - ISR webhook revalidation (Sanity → /api/revalidate)
  - Zero infrastructure management needed

### Phase 8: SEO & Accessibility ✓ (Completed)

- **Timeline:** Early March 2026
- **Deliverables:**
  - Unique metadata per page (title, description, og:image)
  - JSON-LD structured data (LodgingBusiness, BreadcrumbList)
  - Dynamic sitemap.ts + robots.ts at app root
  - Skip-to-content link
  - Form labels with htmlFor/id
  - Focus-visible styles for keyboard navigation
  - Gallery lightbox: role=dialog, aria-modal, Escape key support
  - Accessibility testing on iOS Safari
  - Mobile responsiveness fixes (overflow-x: hidden)
  - Next.js 16 compatibility (revalidateTag with 2 args)

---

## Current Work: Phase 9 (In Progress)

### Property Detail Pages & Filtering

**Status:** Implementation Phase
**Target Completion:** March 15, 2026

#### Components to Implement

- [x] Property detail page template (`src/app/(site)/collection/[slug]/page.tsx`)
- [x] Room detail page template (hotel only) (`src/app/(site)/collection/[slug]/[room]/page.tsx`)
- [x] CollectionFilters component (search, category, capacity, price range)
- [x] Property/Room card components
- [x] Filter UI: search input, capacity stepper, price range slider
- [x] Dynamic room pricing display (weekday, weekend, holiday)

#### Data Requirements

- [x] Property queries (single, all, paginated)
- [x] Room queries (by property, single room)
- [x] Filter logic (search, category, capacity, price)
- [x] Pricing tier display (VND currency formatting)

#### Prototypes Ready

- `prototype/pages/collection-detail-villa.html` - Villa detail page
- `prototype/pages/collection-detail-hotel.html` - Hotel building detail
- `prototype/pages/collection-room-detail.html` - Individual room detail
- `prototype/pages/collection-filter.html` - Filter UI redesign
- `prototype/css/pages/collection-detail.css` - All styling

#### Filter UI Redesign (Approved March 8-9)

- Removed view type filter dropdown
- Search: underline style (border-bottom only), centered, max-width 340px
- Capacity: stepper with −/+ buttons (36px), "—" when unset
- Price: dual range slider, 11 steps (0→10tr+), track 3px rounded, thumbs 18px transparent/sand-border
- Category description: already in production, keep as-is
- Layout: pills → description → search → [capacity | divider | price] → results

---

## Upcoming Phases

### Phase 10: Advanced Filtering (Q2 2026)

**Estimated:** April-May 2026
**Priority:** Medium

#### Features

- [ ] Availability calendar (check-in/check-out dates)
- [ ] Advanced price filters (min/max per night)
- [ ] Amenity filters (WiFi, Pool, Kitchen, etc)
- [ ] Room view type filters (Sea, Mountain, Garden)
- [ ] Sort options (Price ASC/DESC, Rating, Newest)
- [ ] Save filter preferences (local storage)

#### Requirements

- [ ] Extend Property/Room schema with amenities
- [ ] Add availability data model
- [ ] Implement filter state management (URL params)
- [ ] Performance optimization for large result sets

### Phase 11: Booking Engine Foundation (Q2-Q3 2026)

**Estimated:** May-June 2026
**Priority:** High

#### Features

- [ ] Inquiry form (property → contact form)
- [ ] Inquiry submission to CMS or database
- [ ] Email notifications to management
- [ ] Booking timeline (instant quote vs. request approval)
- [ ] Reservation system (check availability)
- [ ] Payment integration (Stripe or local payment gateway)

#### Architecture Decisions Needed

- Database: Supabase PostgreSQL or MongoDB?
- Payment processor: Stripe, Paypal, or local VN processor?
- Separate app or same Next.js app?

### Phase 12: Admin Dashboard (Q3 2026)

**Estimated:** July-August 2026
**Priority:** Medium

#### Features

- [ ] Property manager dashboard
- [ ] Booking management (view, approve, cancel)
- [ ] Availability calendar management
- [ ] Pricing management (seasonal rates)
- [ ] Inquiry/message inbox
- [ ] Analytics (occupancy, revenue, views)
- [ ] Document management (policies, terms)

#### Requirements

- [ ] Authentication system (Supabase Auth or Sanity tokens)
- [ ] Role-based access (admin, property manager, staff)
- [ ] Analytics SDK integration

### Phase 13: Multi-Language Support (Q3-Q4 2026)

**Estimated:** August-September 2026
**Priority:** Medium

#### Languages

- Vietnamese (vi)
- English (en)
- (Future: Chinese simplified, Japanese)

#### Implementation Options

- [ ] next-i18next (recommended for Next.js)
- [ ] i18next standalone
- [ ] Sanity localization

#### Requirements

- [ ] Translate all CMS content
- [ ] URL routing: /en/_, /vi/_ or subdomain
- [ ] Language selector component
- [ ] SEO hreflang tags

### Phase 14: Blog & Content Hub (Q4 2026)

**Estimated:** October-November 2026
**Priority:** Low

#### Features

- [ ] Blog post schema in Sanity
- [ ] Article listing page
- [ ] Article detail page with comments
- [ ] Travel tips section
- [ ] Destination guides
- [ ] Search + filtering by category/tag
- [ ] Related articles recommendations

#### Content Strategy

- 2-4 articles per month
- SEO-optimized titles and descriptions
- Social sharing cards

### Phase 15: Analytics & Monitoring (Q4 2026)

**Estimated:** November-December 2026
**Priority:** High

#### Tools & Integrations

- [ ] Vercel Analytics (Page speed, Core Web Vitals)
- [ ] Google Analytics 4 (GA4)
- [ ] Google Search Console (SEO monitoring)
- [ ] Hotjar (user behavior, heatmaps)
- [ ] Sentry (error tracking)
- [ ] Custom dashboards

#### Metrics to Track

- [ ] Page load time (target: < 2s)
- [ ] Core Web Vitals (LCP, CLS, FID)
- [ ] Conversion funnel (property view → inquiry)
- [ ] Traffic sources (organic, paid, direct)
- [ ] User engagement (time on site, scroll depth)
- [ ] Error rates (5xx, client-side errors)

---

## Known Issues & Bugs

### Fixed

- ✓ Next.js 16 `revalidateTag` requires 2nd arg "max"
- ✓ iOS Safari horizontal scroll (overflow-x hidden on html + body)
- ✓ Sanity activity name typo (Chèo Kayak → Chèo SUP)

### Backlog

- [ ] Gallery fallback: villa detail uses room[0].images when property.images empty (works but could be improved)
- [ ] Mobile menu: hamburger animation could be smoother
- [ ] Form validation: add client-side validation before CMS submission

---

## Technical Debt

### Priority: High

- [ ] Add unit tests for components (PropertyCard, RoomCard, etc)
- [ ] Add integration tests for GROQ queries
- [ ] Document complex hooks (useInView)
- [ ] Performance audit: measure Core Web Vitals on production
- [ ] Error handling: add error boundaries to all pages

### Priority: Medium

- [ ] Refactor CollectionFilters (currently 300+ lines, split into subcomponents)
- [ ] Extract utility functions from components (formatPrice, formatDate)
- [ ] Add logging/monitoring (Sentry integration)
- [ ] Cache strategy documentation (ISR, browser cache, Vercel Edge cache)
- [ ] Type safety: some any types in API responses

### Priority: Low

- [ ] Code comments: add JSDoc for complex functions
- [ ] README: update with property detail page instructions
- [ ] Storybook: create component library for team visibility
- [ ] Performance optimization: defer non-critical JS loading

---

## Decisions & Constraints

### Architecture Decisions

1. **Next.js 16 / React 19** over Next.js 14 / React 18
   - Reason: Sanity v5 compatibility required React 19+
   - Impact: Requires Node.js 20+, some older packages incompatible

2. **Vercel hosting** (migrated from a self-managed VPS, 2026-11-06)
   - Reason: Zero-ops, native Next.js support, free Hobby tier, automatic HTTPS + CDN
   - Impact: No server/Nginx/systemd to manage; builds run on Vercel (Turbopack)

3. **Sanity v5 CMS** over custom database
   - Reason: Content-first architecture, flexible schemas for nested properties/rooms
   - Impact: Vendor lock-in, but great for content marketing

4. **CSS Variables + Tailwind** over CSS-in-JS
   - Reason: Design token consistency, easy rebranding
   - Impact: Some CSS limitations (Tailwind gradients don't support CSS vars)

5. **Pure CSS Transitions** over Framer Motion
   - Reason: Avoid SSR hydration mismatch causing blank pages
   - Impact: Less complex animations, but more reliable

### Known Constraints

- **Vercel Hobby Tier:** Free but non-commercial; upgrade to Pro (~$20/mo) if commercial scale grows
- **Build Time:** ~1-2 minutes for 108 pages (Turbopack is fast)
- **ISR Window:** 60 seconds before content becomes stale
- **Image Optimization:** Next.js Image requires loader config for external CDN

---

## Team & Responsibilities

| Role                   | Responsibility                                | Current Owner           |
| ---------------------- | --------------------------------------------- | ----------------------- |
| **Product Owner**      | Feature prioritization, roadmap               | duongminhphucwork       |
| **Frontend Developer** | React components, CMS integration, git push   | duongminhphucwork       |
| **DevOps**             | Vercel deployments, env vars, monitoring      | duongminhphucwork       |
| **Content Manager**    | Property data, CMS updates                    | (External content team) |
| **QA / Testing**       | Responsive design, performance, accessibility | Needed for Phase 10+    |

---

## Success Metrics (Phase 9+)

### User Engagement

- [ ] Average time on property detail page: > 2 minutes
- [ ] Inquiry form submission rate: > 5% of detail page visitors
- [ ] Filter usage: > 40% of collection page visitors use filters
- [ ] Mobile traffic: > 60% of total traffic (responsive design essential)

### Technical Metrics

- [ ] Lighthouse score: > 90 (mobile & desktop)
- [ ] Core Web Vitals: All green (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- [ ] Property detail page load: < 2s on 4G
- [ ] Filter response: < 300ms for filter updates
- [ ] Uptime: > 99.9% (no unexpected downtime)

### Business Metrics

- [ ] Organic search traffic: 5,000+ monthly visitors
- [ ] Property inquiry volume: 50-100 inquiries/month
- [ ] Conversion rate: 1-2% of visitors → inquiries
- [ ] Average inquiry value: > $50k USD (property pricing)

---

## Risk Management

### High-Risk Items

1. **Database scaling** - If booking engine integrated, may need PostgreSQL
   - Mitigation: Plan database schema early, use Supabase for rapid setup
2. **Payment processing** - Complex international payments
   - Mitigation: Use Stripe (supports VN), test thoroughly
3. **SEO competition** - Luxury property market is competitive
   - Mitigation: Backlink strategy, content marketing, local SEO

### Medium-Risk Items

1. **VPS capacity** - Memory limits may hit during peak season
   - Mitigation: Monitor closely, plan VPS upgrade before capacity issues
2. **CMS dependency** - Heavy reliance on Sanity API
   - Mitigation: Implement caching layer (Redis) in Phase 10
3. **Mobile responsiveness** - Complex layouts hard to make responsive
   - Mitigation: Mobile-first development approach, iOS Safari testing

---

## Budget & Resources

### Development Estimate

- **Phase 9 (Property Detail):** 20-30 hours
- **Phase 10 (Advanced Filtering):** 15-20 hours
- **Phase 11 (Booking Engine):** 40-50 hours (complex)
- **Phase 12 (Admin Dashboard):** 30-40 hours
- **Phase 13 (Multi-Language):** 20-30 hours
- **Total Phase 9-13:** 125-170 hours (~3-4 developer months)

### Infrastructure Costs

- **Hosting (Vercel Hobby):** Free (non-commercial); Pro $20/month if needed
- **Domain (Namecheap):** €10/year
- **SSL (Vercel):** Free (auto-managed)
- **CMS (Sanity):** Free (within usage limits) / $99+/month for premium
- **CDN (Vercel):** Included (no extra cost)
- **Total Monthly:** Free (Hobby) → ~€20/month + €0.83/year (Pro + domain)

### Third-Party Services (Future)

- **Payment Processing (Stripe):** 2.2% + $0.30 per transaction
- **Analytics (Vercel Analytics):** Free
- **Error Tracking (Sentry):** Free / $29+/month
- **Email Service (SendGrid):** Free / paid based on volume

---

## Stakeholder Feedback

### User Feedback (From Early Access)

- Property listings are beautiful and easy to navigate
- Filter system is intuitive (from prototype feedback)
- Mobile experience is smooth (especially on iOS Safari)
- Want to see more property photos and virtual tours (Phase 10+)
- Inquire button should be more prominent (implemented)

### Business Feedback

- Need booking functionality ASAP (Phase 11)
- Multi-language Vietnamese essential for local market
- Analytics dashboard to track inquiries and conversions
- Admin panel for property managers to manage availability

---

## Key Dates & Milestones

| Date         | Milestone                   | Status        |
| ------------ | --------------------------- | ------------- |
| Jan 31, 2026 | Project kickoff + setup     | ✓ Complete    |
| Feb 28, 2026 | CMS integration complete    | ✓ Complete    |
| Mar 7, 2026  | Deployment to production    | ✓ Complete    |
| Mar 15, 2026 | Property detail pages live  | → In Progress |
| Apr 30, 2026 | Advanced filtering feature  | Planned       |
| Jun 30, 2026 | Booking engine MVP          | Planned       |
| Sep 30, 2026 | Admin dashboard + analytics | Planned       |
| Dec 31, 2026 | Multi-language + blog       | Planned       |

---

## Lessons Learned (So Far)

### What Went Well

1. Sanity CMS choice - flexible for nested property/rooms
2. CSS Variables + Tailwind - easy theming
3. Next.js ISR - no need for continuous rebuilds
4. Vercel deployment - zero ops overhead, instant auto-deploy
5. Turbopack builds - 5-10x faster than webpack

### What Could Be Better

1. Docker complexity - standalone Next.js was right choice
2. Framer Motion SSR issues - CSS transitions better
3. Testing - should have written tests earlier
4. Documentation - created docs after deployment (should be earlier)
5. Prototype → Code - some design details were ambiguous

### For Future Projects

- Start with comprehensive documentation
- Write tests as features are built (not after)
- Use design tokens from day 1 (easier than retrofitting)
- Avoid vendor lock-in where possible
- Plan database schema early (even if not used initially)

---

## References & Links

- **Live Site:** https://lamercollection.com
- **CMS:** https://lamercollection.sanity.studio
- **GitHub:** https://github.com/duongminhphucwork/lamer-collection-website
- **Host:** Vercel (Hobby plan, migrated 2026-11-06)
- **Email Contact:** duongminhphuc@example.com

---

**Last Updated:** November 6, 2026 (Vercel migration) | **Next Review:** December 6, 2026 | **Status:** Live on Vercel
