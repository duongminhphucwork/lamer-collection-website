---
phase: 6
title: "Animations & Polish"
status: pending
priority: P2
effort: 5h
---

# Phase 6: Animations & Polish

## Context Links

- [Overview Plan](./plan.md)
- [Phase 4: Next.js](./phase-04-nextjs-conversion.md)

## Overview

Elevate the site from functional to cinematic. Scroll-driven animations, page transitions, micro-interactions, and visual refinements using Framer Motion.

## Requirements

### Animation Principles

- **Subtle over flashy** - Luxury = restraint. No bouncy or playful animations.
- **Performance first** - GPU-accelerated properties only (transform, opacity)
- **60fps minimum** - Use `will-change` hints, avoid layout thrashing
- **Respect motion preferences** - Honor `prefers-reduced-motion`
- **Purpose-driven** - Every animation must serve UX (guide attention, reveal content, create depth)

## Animation Inventory

### 1. Page-Level Transitions

- Fade-in on route change (Framer Motion AnimatePresence)
- Duration: 400ms, ease-out

### 2. Scroll Reveal Animations

- **Fade up**: Default for text sections. Opacity 0→1, translateY 40px→0
- **Fade in**: For images. Opacity 0→1 only
- **Stagger**: Child elements animate sequentially (50ms delay each)
- **Scale reveal**: Image cards scale from 0.95→1 with opacity
- Trigger: When 20% of element enters viewport
- Duration: 600-800ms

### 3. Hero Animations

- **Homepage**: Logo fade-in after 500ms, tagline slide up after 800ms, scroll indicator pulse
- **Subpages**: Title slide up with clip-path reveal (text appears line by line)

### 4. Parallax Effects

- **Image sections**: Background moves at 0.5x scroll speed (subtle)
- **Story page**: Heritage photos with depth layers
- Use `useScroll` + `useTransform` from Framer Motion

### 5. Navigation

- Background: transparent → blur backdrop + solid on scroll (CSS transition, 300ms)
- Mobile menu: overlay slides in from right, links stagger in
- Active link indicator: underline slides to current item

### 6. Hover Interactions

- **Property cards**: Image scale 1→1.05, overlay gradient appears, text slides up
- **Experience cards**: Subtle lift (translateY -4px) + shadow increase
- **Buttons**: Background color transition, slight scale (1.02)
- **Gallery thumbnails**: Brightness 1→1.1, scale 1→1.03
- Duration: 300ms for all hovers

### 7. Gallery Lightbox

- Open: Backdrop blur-in (300ms), image scale from thumbnail position
- Close: Reverse animation
- Navigate: Cross-fade between images (200ms)

### 8. Contact Form

- Focus: Input border color transition, label float animation
- Submit: Button loading state with subtle pulse
- Success: Checkmark draw animation

## Related Code Files

### Create

- `src/components/shared/page-transition.tsx` - AnimatePresence wrapper
- `src/components/shared/parallax-section.tsx` - Parallax background wrapper
- `src/components/shared/stagger-children.tsx` - Stagger animation wrapper
- `src/components/shared/text-reveal.tsx` - Clip-path text reveal

### Modify

- `src/components/shared/scroll-reveal.tsx` - Enhance with variants
- `src/components/layout/navigation.tsx` - Add scroll-based transitions
- `src/components/layout/mobile-menu.tsx` - Add entrance animation
- `src/components/ui/image-card.tsx` - Add hover animations
- `src/components/gallery/lightbox.tsx` - Add open/close animations
- `src/components/ui/contact-form.tsx` - Add focus/submit animations
- `src/app/layout.tsx` - Wrap with AnimatePresence for page transitions

## Implementation Steps

1. Create `scroll-reveal.tsx` variants (fadeUp, fadeIn, scaleIn)
2. Create `stagger-children.tsx` with configurable delay
3. Create `text-reveal.tsx` using clip-path animation
4. Create `parallax-section.tsx` using `useScroll` + `useTransform`
5. Create `page-transition.tsx` with AnimatePresence
6. Update navigation with scroll-based background transition
7. Add mobile menu stagger animation
8. Add hover animations to all interactive cards
9. Enhance hero sections with entrance animations
10. Add parallax to Story page heritage section
11. Animate gallery lightbox open/close/navigate
12. Add form micro-interactions
13. Add `prefers-reduced-motion` checks to all animations
14. Performance audit: check for layout shifts, jank
15. Fine-tune timing and easing curves

## Reduced Motion Strategy

```typescript
// src/lib/utils.ts
export const getMotionProps = (animation: MotionProps) => {
  // Check if user prefers reduced motion
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return { initial: false }; // No animation
  }
  return animation;
};
```

## Todo List

- [ ] Build scroll-reveal variants (fadeUp, fadeIn, scaleIn)
- [ ] Build stagger-children component
- [ ] Build text-reveal (clip-path) component
- [ ] Build parallax-section component
- [ ] Build page-transition wrapper
- [ ] Animate navigation (scroll background + mobile menu)
- [ ] Add hover animations to cards
- [ ] Animate hero sections
- [ ] Add parallax to image sections
- [ ] Animate gallery lightbox transitions
- [ ] Add form micro-interactions
- [ ] Implement prefers-reduced-motion support
- [ ] Performance audit (60fps check)
- [ ] Cross-browser animation testing

## Success Criteria

- All animations run at 60fps on mid-range mobile
- `prefers-reduced-motion: reduce` disables all motion
- Animations feel "luxury" - smooth, slow, deliberate
- No Cumulative Layout Shift from animations
- Page transitions feel seamless, not jarring
- Gallery lightbox transitions are smooth

## Risk Assessment

- **Framer Motion bundle size**: ~30kb gzipped. Acceptable. Tree-shake unused features.
- **Mobile performance**: Test on real devices. Disable parallax on mobile if laggy.
- **iOS Safari quirks**: Test backdrop-filter, position:fixed animations.

## Next Steps

- Phase 7: Docker deployment and CI/CD pipeline
