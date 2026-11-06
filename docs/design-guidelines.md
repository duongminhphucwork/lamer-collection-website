# Design Guidelines

## Color Palette

### Primary Colors

These colors represent the La Mer brand identity and should be used consistently across all pages.

```css
/* Ocean - Deep, sophisticated blue */
--color-ocean:
  #0d2b3e RGB: (13, 43, 62) Usage: Primary headings, hero text,
  key UI elements /* Sand - Warm, luxurious beige */ --color-sand: #c9a87c
    RGB: (201, 168, 124) Usage: Accents,
  secondary headings, hover states,
  borders /* Ivory - Off-white background */ --color-ivory: #f7f2ea
    RGB: (247, 242, 234) Usage: Page backgrounds,
  card backgrounds,
  light sections /* Gold - Subtle accent for premium feel */
    --color-gold: #b8945a RGB: (184, 148, 90) Usage: Decorative accents,
  icons, special emphasis;
```

### Secondary Colors

```css
/* Dark text */
--color-text: #1a1a1a RGB: (26, 26, 26) /* Light text (for dark backgrounds) */
  --color-text-light: #f7f2ea RGB: (247, 242, 234) /* Borders and dividers */
  --color-border: #d4ccc3 RGB: (212, 204, 195) /* Error state */
  --color-error: #d32f2f RGB: (211, 47, 47) /* Success state */
  --color-success: #388e3c RGB: (56, 142, 60);
```

---

## Typography

### Font Families

#### Display Font: Cormorant Garamond

- **Weight:** Regular (400), Medium (500), Bold (700)
- **Size Range:** 1.5rem - 4rem
- **Usage:** Page titles (h1, h2), hero section, section headings
- **Characteristics:** Elegant, luxurious serif font
- **Google Fonts:** Yes, imported in root layout

```css
/* h1: Page Title */
font-family: "Cormorant Garamond", serif;
font-size: 3.5rem; /* 56px */
font-weight: 700;
line-height: 1.2;
letter-spacing: -0.02em;
color: var(--color-ocean);

/* h2: Section Heading */
font-size: 2.5rem; /* 40px */
font-weight: 700;
line-height: 1.3;
color: var(--color-ocean);

/* h3: Subsection */
font-size: 1.75rem; /* 28px */
font-weight: 600;
color: var(--color-sand);
```

#### Body Font: Inter

- **Weight:** Regular (400), Medium (500), Semibold (600)
- **Size Range:** 0.875rem - 1.125rem
- **Usage:** Paragraph text, labels, UI elements
- **Characteristics:** Clean, readable sans-serif
- **Google Fonts:** Yes, imported in root layout

```css
/* Paragraph */
font-family: "Inter", sans-serif;
font-size: 1rem; /* 16px */
font-weight: 400;
line-height: 1.6;
color: var(--color-text);

/* Small text / Caption */
font-size: 0.875rem; /* 14px */
font-weight: 500;
line-height: 1.5;
color: #666;

/* UI Label */
font-size: 0.75rem; /* 12px */
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
```

### Typography Scale

```css
--font-size-h1: 3.5rem; /* 56px */
--font-size-h2: 2.5rem; /* 40px */
--font-size-h3: 1.75rem; /* 28px */
--font-size-h4: 1.25rem; /* 20px */
--font-size-body: 1rem; /* 16px */
--font-size-small: 0.875rem; /* 14px */
--font-size-xs: 0.75rem; /* 12px */

/* Line heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
```

---

## Spacing System (Modular Scale)

All spacing uses a consistent base unit (4px) with multipliers. This ensures visual harmony.

```css
/* Base unit: 4px */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-24: 6rem; /* 96px */
--space-32: 8rem; /* 128px */
```

### Component-Level Spacing

```css
/* Page padding (top/bottom) */
--section-padding-y: var(--space-16); /* 64px */

/* Container padding (left/right) */
--container-padding: var(--space-6); /* 24px mobile, 32px desktop */

/* Card padding */
--card-padding: var(--space-6); /* 24px */

/* Gap between elements */
--gap-normal: var(--space-6); /* 24px */
--gap-large: var(--space-12); /* 48px */
--gap-small: var(--space-4); /* 16px */
```

### Responsive Spacing

```typescript
// Mobile (< 640px)
padding: var(--space-4);              /* 16px */
gap: var(--space-6);                  /* 24px */

// Tablet (640px - 1024px)
@media (min-width: 640px) {
  padding: var(--space-6);            /* 24px */
  gap: var(--space-8);                /* 32px */
}

// Desktop (> 1024px)
@media (min-width: 1024px) {
  padding: var(--space-8);            /* 32px */
  gap: var(--space-12);               /* 48px */
}
```

---

## Component Patterns

### Buttons

#### Primary Button

```typescript
background-color: var(--color-ocean);
color: var(--color-text-light);
padding: var(--space-3) var(--space-8);
font-size: 1rem;
font-weight: 600;
border: 2px solid var(--color-ocean);
border-radius: 0;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

&:hover {
  background-color: transparent;
  color: var(--color-ocean);
}

&:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 4px;
}
```

#### Secondary Button

```typescript
background-color: transparent;
color: var(--color-ocean);
padding: var(--space-3) var(--space-8);
border: 2px solid var(--color-sand);
border-radius: 0;

&:hover {
  background-color: var(--color-sand);
  color: var(--color-text-light);
}
```

### Cards

#### Property Card

```typescript
background: var(--color-ivory);
border: 1px solid var(--color-border);
padding: var(--space-6);
transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);

&:hover {
  box-shadow: 0 12px 24px rgba(13, 43, 62, 0.15);
}

/* Image aspect ratio: 4/3 */
aspect-ratio: 4 / 3;
overflow: hidden;
border-radius: 2px;
```

#### Room Card (Grid)

```typescript
display: grid;
grid-template-columns: 1fr 1fr;
gap: var(--space-6);

@media (max-width: 768px) {
  grid-template-columns: 1fr;
}

/* Image: 100% width, 300px height */
img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
```

### Hero Section

```typescript
min-height: 600px;
background: linear-gradient(135deg, var(--color-ocean), var(--color-sand));
color: var(--color-text-light);
display: flex;
align-items: center;
justify-content: center;
position: relative;

/* Overlay for text readability */
&::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(13, 43, 62, 0.4);
  z-index: 1;
}

/* Content */
h1 {
  font-size: clamp(2.5rem, 8vw, 4rem);
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Subtitle (before title) */
.subtitle {
  font-size: 1rem;
  color: var(--color-sand);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### Image Gallery

```typescript
/* Scroll-snap container */
display: grid;
grid-auto-flow: column;
overflow-x: auto;
scroll-snap-type: x mandatory;
gap: var(--space-6);

/* Grid items */
.gallery-item {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 100vw;          /* Mobile: full width */

  @media (min-width: 768px) {
    width: 50vw;         /* Tablet: half width */
  }

  @media (min-width: 1024px) {
    width: 33.333vw;     /* Desktop: third width */
  }
}

/* Lightbox styling */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }
}
```

### Filter Bar

```typescript
/* Search input */
input[type="text"] {
  border: none;
  border-bottom: 2px solid var(--color-sand);
  padding: var(--space-3) 0;
  font-size: 1rem;
  width: 100%;
  max-width: 340px;
  text-align: center;

  &:focus-visible {
    outline: none;
    border-bottom-color: var(--color-ocean);
  }

  &::placeholder {
    color: #999;
  }
}

/* Capacity stepper */
.stepper {
  display: flex;
  align-items: center;
  gap: var(--space-2);

  button {
    width: 36px;
    height: 36px;
    border: 1px solid var(--color-border);
    background: transparent;
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
      background: var(--color-ivory);
    }
  }

  .value {
    min-width: 40px;
    text-align: center;
    font-weight: 600;
  }
}

/* Price range slider */
.range-slider {
  width: 100%;
  height: 3px;
  background: var(--color-border);
  border-radius: 4px;
  position: relative;

  .track {
    height: 100%;
    background: var(--color-sand);
    border-radius: 4px;
  }

  .thumb {
    width: 18px;
    height: 18px;
    background: white;
    border: 2px solid var(--color-sand);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
```

---

## Animations & Transitions

### Default Transition

```css
--transition-default: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

/* Applied to: hover states, focus states, smoothly changing properties */
transition: var(--transition-default);
```

### Slow Transition (Scroll Reveals)

```css
--transition-slow: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

/* Applied to: fade-in animations, scroll reveals */
transition: var(--transition-slow);
```

### Scroll Reveal Pattern

```typescript
// Using useInView hook + CSS transitions (NO Framer Motion)

export const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'var(--transition-slow)',
      }}
    >
      {children}
    </div>
  );
};
```

### Hover Effects

```css
/* Subtle scale on hover (cards) */
&:hover {
  transform: scale(1.02);
  transition: var(--transition-default);
}

/* Color change on hover (links) */
&:hover {
  color: var(--color-sand);
  transition: var(--transition-default);
}

/* Background change on hover (buttons) */
&:hover {
  background-color: var(--color-sand);
  transition: var(--transition-default);
}
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles apply to all sizes */

/* Small devices (640px and up) */
@media (min-width: 640px) {
  /* Tablet adjustments */
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  /* Tablet large adjustments */
}

/* Large devices (1024px and up) */
@media (min-width: 1024px) {
  /* Desktop adjustments */
}

/* Extra large devices (1280px and up) */
@media (min-width: 1280px) {
  /* Large desktop adjustments */
}
```

### Mobile-First Component Example

```typescript
export const PropertyGrid: React.FC = () => (
  <div className="
    /* Mobile (default) */
    grid grid-cols-1 gap-4
    /* Tablet (640px) */
    sm:grid-cols-2 sm:gap-6
    /* Desktop (1024px) */
    lg:grid-cols-3 lg:gap-8
    /* Large desktop (1280px) */
    xl:grid-cols-4
  ">
    {/* Property cards */}
  </div>
);
```

---

## Accessibility Standards

### Color Contrast

- **Text on Background:** Minimum 4.5:1 ratio (WCAG AA)
- **Ocean (#0d2b3e) on Ivory (#f7f2ea):** 11:1 ✓
- **Sand (#c9a87c) on White:** 6.8:1 ✓

### Focus States

```css
/* Always provide visible focus indicator */
&:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 4px;
}

/* Never remove outline */
&:focus {
  outline: unset; /* BAD */
}
```

### Semantic HTML

```typescript
// ✅ GOOD
<button onClick={handleClick}>Click me</button>
<a href="/contact">Contact</a>
<h1>Page Title</h1>
<label htmlFor="search">Search</label>
<input id="search" type="text" />

// ❌ BAD
<div onClick={handleClick}>Click me</div>
<span className="button" role="button">Click me</span>
<div className="heading">Page Title</div>
```

### Skip Content Link

```typescript
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>

// CSS
.skip-link {
  position: absolute;
  top: -9999px;
  left: -9999px;

  &:focus {
    top: 0;
    left: 0;
    z-index: 999;
  }
}
```

---

## Grid System

### Container Width

```css
/* Maximum content width */
--max-container-width: 1280px; /* 1280px */

.container {
  max-width: var(--max-container-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}
```

### Grid Columns

```css
/* 12-column grid for complex layouts */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap-normal);
}

.col-6 {
  grid-column: span 6; /* 50% */
}

.col-4 {
  grid-column: span 4; /* 33% */
}

.col-3 {
  grid-column: span 3; /* 25% */
}
```

---

## Common Design Mistakes to Avoid

### ❌ Inconsistent Spacing

```typescript
// BAD - Mixed spacing units
<div style={{ padding: '20px', gap: '1rem', margin: '30px' }}>

// GOOD - Use CSS variables
<div className="p-6 gap-6 m-8">
```

### ❌ Missing Focus States

```typescript
// BAD - No focus indicator
<button>Click me</button>

// GOOD - Visible focus state
<button style={{ outline: '2px solid gold' }} onFocus={...}>
  Click me
</button>
```

### ❌ Non-Semantic HTML

```typescript
// BAD - Div acting as link
<div onClick={() => navigate('/page')} className="button">Link</div>

// GOOD - Use semantic elements
<a href="/page" className="button">Link</a>
```

### ❌ Hardcoded Colors

```typescript
// BAD - Hardcoded hex
<div style={{ backgroundColor: '#0d2b3e' }}>

// GOOD - Use CSS variables
<div style={{ backgroundColor: 'var(--color-ocean)' }}>
```

---

## Usage Examples

### Hero Section with Subtitle

```typescript
<section className="hero">
  <div className="hero-content">
    <p className="subtitle">Welcome to</p>
    <h1>La Mer Collection</h1>
    <p className="description">
      Discover luxury properties in Vĩnh Hỷ
    </p>
  </div>
</section>

<style>{`
  .subtitle {
    font-size: 1rem;
    color: var(--color-sand);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-4);
  }
`}</style>
```

### Property Card Grid

```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {properties.map(property => (
    <div key={property.id} className="card">
      <img src={property.image} alt={property.name} />
      <h3>{property.name}</h3>
      <p>{property.description}</p>
      <a href={`/collection/${property.slug}`} className="button">
        View Details
      </a>
    </div>
  ))}
</div>
```

---

## References

- **Color Palette:** Defined in CSS variables at `src/styles/globals.css`
- **Typography:** Imported from Google Fonts in root layout
- **Component Library:** Tailwind CSS + custom components in `src/components/`
- **Design System:** Prototype at `prototype/` folder (reference for pixel-perfect implementation)

---

**Last Updated:** March 2026 | **Version:** 1.0 | **Accessibility:** WCAG 2.1 AA
