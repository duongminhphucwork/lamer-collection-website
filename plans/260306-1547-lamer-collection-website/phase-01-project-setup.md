---
phase: 1
title: "Project Setup & Architecture"
status: pending
priority: P1
effort: 3h
---

# Phase 1: Project Setup & Architecture

## Context Links

- [Overview Plan](./plan.md)

## Overview

Initialize project structure, tooling, design tokens, and development environment. Two sub-projects: static prototype and Next.js app.

## Requirements

### Functional

- Git repository with proper .gitignore
- Static prototype scaffold (HTML/CSS/JS)
- Next.js project scaffold (prepared, not active yet)
- Shared design tokens (colors, typography, spacing)
- Development server for prototype

### Non-Functional

- kebab-case file naming throughout
- Files under 200 lines
- Mobile-first CSS approach

## Architecture

### Directory Structure

```
/
├── prototype/                    # Phase 2-3: static HTML/CSS/JS
│   ├── index.html
│   ├── css/
│   │   ├── reset.css
│   │   ├── tokens.css            # CSS custom properties (design tokens)
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── pages/
│   │       ├── homepage.css
│   │       ├── collection.css
│   │       ├── experience.css
│   │       ├── story.css
│   │       ├── vinh-hy.css
│   │       ├── gallery.css
│   │       └── contact.css
│   ├── js/
│   │   ├── main.js
│   │   ├── navigation.js
│   │   ├── scroll-animations.js
│   │   └── gallery.js
│   ├── assets/
│   │   ├── images/               # Placeholder/sample images
│   │   ├── videos/               # Placeholder videos
│   │   └── fonts/
│   └── pages/
│       ├── collection.html
│       ├── experience.html
│       ├── story.html
│       ├── vinh-hy.html
│       ├── gallery.html
│       └── lien-he.html
├── src/                          # Phase 4+: Next.js app
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── sanity/
├── public/
├── docs/
├── plans/
├── package.json
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/
└── README.md
```

## Implementation Steps

1. Initialize git repo (if not done), create .gitignore
2. Create `prototype/` directory structure
3. Create `css/tokens.css` with design tokens:
   - Colors: ocean-blue, warm-sand, ivory-white, gold-accent
   - Typography: font families, sizes (fluid clamp-based), weights, line-heights
   - Spacing: 4px base scale
   - Breakpoints: 375px, 768px, 1024px, 1440px
   - Transitions: default easing, durations
4. Create `css/reset.css` (modern CSS reset)
5. Create `css/layout.css` (grid system, container, section utilities)
6. Create `css/components.css` (button, nav, footer, card base styles)
7. Create base `index.html` with proper meta tags, font loading, CSS imports
8. Set up simple dev server (live-server or similar via npx)
9. Create `README.md` with project overview, setup instructions

## Design Tokens (css/tokens.css)

```css
:root {
  /* Colors */
  --color-ocean: #0d2b3e;
  --color-sand: #c9a87c;
  --color-ivory: #f7f2ea;
  --color-gold: #b8945a;
  --color-ocean-light: #1a4a63;
  --color-text: #2c2c2c;
  --color-text-light: #6b6b6b;

  /* Typography */
  --font-heading: "Cormorant Garamond", serif;
  --font-body: "Inter", sans-serif;
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.375rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 1.8rem + 3.5vw, 5rem);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 800ms;

  /* Layout */
  --container-max: 1440px;
  --container-padding: clamp(1rem, 3vw, 4rem);
}
```

## Todo List

- [ ] Initialize git, .gitignore
- [ ] Create prototype directory structure
- [ ] Create css/tokens.css with all design tokens
- [ ] Create css/reset.css
- [ ] Create css/layout.css
- [ ] Create css/components.css (base component styles)
- [ ] Create index.html skeleton with meta, fonts, CSS
- [ ] Setup dev server script in package.json
- [ ] Create README.md

## Success Criteria

- `npx live-server prototype/` serves the site
- All design tokens defined and documented
- Base styles render correctly on mobile (375px) and desktop (1440px)
- Clean git history with initial commit

## Risk Assessment

- **Font loading performance**: Use `font-display: swap`, preload critical fonts
- **Large video files**: Use poster images, lazy-load videos

## Next Steps

- Phase 2: Build core page prototypes (Homepage, Collection, Experience)
