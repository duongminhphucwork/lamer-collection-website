---
phase: 8
title: "Testing & QA"
status: pending
priority: P2
effort: 2h
---

# Phase 8: Testing & QA

## Context Links

- [Overview Plan](./plan.md)

## Overview

Final quality assurance pass. Lighthouse audits, cross-browser testing, mobile testing, accessibility, and content review.

## Scope

This is a branding site, not a SaaS app. Testing focuses on:

- Visual correctness across devices
- Performance (Core Web Vitals)
- Accessibility (WCAG 2.1 AA)
- SEO fundamentals
- Form functionality

NOT in scope: unit tests for business logic (minimal logic), E2E test suites (overkill for branding site).

## QA Checklist

### Performance

- [ ] Lighthouse Performance score 90+ on all pages
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total page weight < 3MB (excluding video)
- [ ] Images optimized (WebP via next/image)
- [ ] Fonts loaded without FOUT

### Accessibility

- [ ] All images have alt text
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works on all interactive elements
- [ ] Focus indicators visible
- [ ] Screen reader announces page structure correctly
- [ ] Form labels associated with inputs
- [ ] Skip to content link present

### Cross-Browser

- [ ] Chrome (latest) - desktop + mobile
- [ ] Safari (latest) - desktop + iOS
- [ ] Firefox (latest) - desktop
- [ ] Samsung Internet - mobile
- [ ] Edge (latest) - desktop

### Mobile Responsiveness

- [ ] 375px (iPhone SE) - all pages
- [ ] 390px (iPhone 14) - all pages
- [ ] 768px (iPad) - all pages
- [ ] 1024px (iPad landscape) - all pages
- [ ] 1440px (desktop) - all pages
- [ ] 1920px (large desktop) - all pages

### Functional

- [ ] All navigation links work
- [ ] Mobile menu opens/closes correctly
- [ ] Collection filter works
- [ ] Gallery filter works
- [ ] Lightbox opens/closes/navigates
- [ ] Contact form validates and submits
- [ ] Google Maps embed loads
- [ ] Zalo button links correctly
- [ ] 404 page renders for invalid routes
- [ ] Sanity Studio accessible at /studio

### SEO

- [ ] All pages have unique title and meta description
- [ ] Open Graph tags present
- [ ] Sitemap.xml accessible
- [ ] Robots.txt correct
- [ ] Structured data validates (schema.org)
- [ ] Canonical URLs set
- [ ] No broken links

### Content

- [ ] All Vietnamese text is correct (no lorem ipsum)
- [ ] Phone numbers/email/address are correct
- [ ] Social media links are correct
- [ ] Images are high quality, correctly cropped
- [ ] Video loads and plays on desktop

## Implementation Steps

1. Run Lighthouse audit on all 7 pages, fix issues
2. Test on real mobile devices (iOS Safari, Android Chrome)
3. Run accessibility audit (axe DevTools)
4. Fix any contrast, focus, or semantic issues
5. Test contact form end-to-end
6. Verify all CMS content displays correctly
7. Check all meta tags and structured data
8. Final visual review on each breakpoint
9. Test reduced motion preference
10. Performance: check for unused CSS/JS, optimize if needed

## Tools

- **Lighthouse**: Built into Chrome DevTools
- **axe DevTools**: Chrome extension for accessibility
- **BrowserStack**: Cross-browser testing (if needed)
- **PageSpeed Insights**: Real-world performance data
- **Schema.org Validator**: Structured data validation

## Todo List

- [ ] Lighthouse audits (all pages)
- [ ] Fix performance issues
- [ ] Accessibility audit + fixes
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Functional testing (all interactions)
- [ ] SEO validation
- [ ] Content review
- [ ] Final visual review

## Success Criteria

- Lighthouse scores: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- Zero broken links
- Contact form works end-to-end
- Site feels premium and polished on all devices
- Content is accurate and complete

## Next Steps (Future Iterations)

After launch, potential enhancements:

- English language support (i18n activation)
- Booking engine integration
- Blog/news section
- Virtual tour (360 photos)
- Analytics (Google Analytics / Plausible)
