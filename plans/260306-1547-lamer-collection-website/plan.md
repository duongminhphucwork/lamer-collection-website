---
title: "La Mer Collection - Luxury Resort Website"
description: "Branding/showcase website for La Mer Collection resort at Vinh Hy Bay, Vietnam"
status: pending
priority: P1
effort: 40h
branch: master
tags: [nextjs, sanity, tailwind, framer-motion, resort, branding]
created: 2026-03-06
---

# La Mer Collection Website

## Overview

Luxury coastal branding website for La Mer Collection - a unique resort concept in Vinh Hy Bay, Ninh Thuan. Properties scattered along the bay, integrated into local community. Heritage-preserved homes, Mediterranean and Vietnamese-style villas, hotel rooms.

**Approach:** HTML/CSS/JS prototype first to validate design, then convert to Next.js + Sanity CMS.

## Tech Stack

| Layer     | Technology                                    |
| --------- | --------------------------------------------- |
| Framework | Next.js 14 (App Router)                       |
| CMS       | Sanity v3 (headless)                          |
| Styling   | Tailwind CSS                                  |
| Animation | Framer Motion                                 |
| Deploy    | Hetzner VPS + Docker + Nginx + GitHub Actions |
| Future    | i18n, booking engine                          |

## Color Palette

- Deep Ocean Blue: `#0D2B3E`
- Warm Sand: `#C9A87C`
- Ivory White: `#F7F2EA`
- Gold Accent: `#B8945A`

## Typography

- Headlines: Cormorant Garamond (serif)
- Body: Inter (sans-serif)

## Phases

| #   | Phase                                                                     | Status          | Effort |
| --- | ------------------------------------------------------------------------- | --------------- | ------ |
| 1   | [Project Setup & Architecture](./phase-01-project-setup.md)               | pending         | 3h     |
| 2   | [HTML/CSS Prototype - Core Pages](./phase-02-prototype-core.md)           | pending         | 8h     |
| 3   | [HTML/CSS Prototype - Secondary Pages](./phase-03-prototype-secondary.md) | pending         | 6h     |
| 4   | [Next.js Conversion](./phase-04-nextjs-conversion.md)                     | pending         | 6h     |
| 5   | [Sanity CMS Integration](./phase-05-sanity-cms.md)                        | 95% in-progress | 6h     |
| 6   | [Animations & Polish](./phase-06-animations-polish.md)                    | pending         | 5h     |
| 7   | [Deployment & CI/CD](./phase-07-deployment.md)                            | pending         | 4h     |
| 8   | [Testing & QA](./phase-08-testing-qa.md)                                  | pending         | 2h     |

## Site Map

```
/                  Homepage (hero video, story intro, collection preview)
/collection        All accommodations (heritage, Mediterranean, Vietnamese, hotel)
/experience        Restaurant, cafe, spa, activities
/story             Heritage preservation, community, brand story
/vinh-hy           Destination info, local cuisine, nature
/gallery           Photo/video gallery
/lien-he           Contact form + info
```

## Key Dependencies

- Professional photos/videos (already available)
- Sanity account setup
- Hetzner VPS access
- Domain DNS configuration (lamercollection.com)
- Google Maps API key (contact page)

## Architecture Decisions

1. **Prototype first** - Validate design direction with static HTML before framework overhead
2. **App Router** - Next.js 14 app directory for RSC, layouts, metadata
3. **Sanity** - Content team can update without deploys; future booking data modeling
4. **i18n-ready** - All text via constants/CMS, locale routing structure prepared but only Vietnamese active
5. **Mobile-first** - 70%+ Vietnamese mobile users, design from 375px up
6. **Image optimization** - Next/Image + Sanity CDN for responsive images
7. **No booking engine** - Clean separation so booking can be added as independent module later
