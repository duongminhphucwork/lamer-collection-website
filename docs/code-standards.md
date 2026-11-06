# Code Standards & Conventions

## Overview

This document defines coding conventions, patterns, and best practices for La Mer Collection website. All code should follow these standards for consistency, maintainability, and performance.

---

## File Naming Conventions

### TypeScript/JavaScript Files

- Use **kebab-case** for filenames
- Be descriptive (priority over brevity)
- Examples: `property-gallery.tsx`, `use-in-view.ts`, `format-price.ts`

### Component Files

- One component per file
- Match component name with filename
- Examples:
  - Component: `<PropertyGallery />` → File: `property-gallery.tsx`
  - Hook: `useInView()` → File: `use-in-view.ts`

### Utility/Helper Files

- Prefix functions with action: `format-*`, `parse-*`, `validate-*`
- Examples: `format-price.ts`, `validate-email.ts`, `parse-room-slug.ts`

### Test Files

- Suffix with `.test.ts` or `.test.tsx`
- Match source file name: `property-gallery.tsx` → `property-gallery.test.tsx`

### Directory Names

- Use **kebab-case** for folders
- Keep 2-3 levels deep max
- Examples: `src/components/`, `src/sanity/queries/`, `src/lib/hooks/`

---

## TypeScript Standards

### Type Definitions

#### Always Define Types for Props

```typescript
interface PropertyCardProps {
  propertyId: string;
  title: string;
  imageUrl: string;
  price: number;
  onSelect?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  propertyId,
  title,
  imageUrl,
  price,
  onSelect,
}) => {
  // ...
};
```

#### Use Strict Type Checking

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

#### Export Types from Shared Files

```typescript
// lib/types.ts
export interface Property {
  id: string;
  name: string;
  slug: string;
  category: "heritage" | "mediterranean" | "hotel";
  pricing: PricingTier;
  rooms?: Room[];
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  capacity: number;
  pricing: PricingTier;
}

export interface PricingTier {
  weekday: number;
  weekend: number;
  holiday: number;
}
```

### Enums vs Union Types

```typescript
// Prefer union types for simple values
type PropertyCategory = "heritage" | "mediterranean" | "hotel";
type ViewType = "sea" | "mountain" | "garden";

// Use enums for complex constants
enum HTTPStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
}
```

### Avoid `any` Type

```typescript
// ❌ BAD
const handleResponse = (data: any) => {
  return data.property.name;
};

// ✅ GOOD
const handleResponse = (data: Property) => {
  return data.name;
};
```

---

## React Component Standards

### Functional Components with TypeScript

```typescript
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  cta?: {
    text: string;
    href: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageUrl,
  cta,
}) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {cta && <a href={cta.href}>{cta.text}</a>}
    </section>
  );
};
```

### Props Destructuring

```typescript
// ✅ GOOD - Destructure all props
export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  onSelect,
}) => {
  return <div onClick={() => onSelect?.(id)}>{title}</div>;
};

// ❌ BAD - Use props object
export const PropertyCard: React.FC<PropertyCardProps> = (props) => {
  return <div onClick={() => props.onSelect?.(props.id)}>{props.title}</div>;
};
```

### Use React Hooks Properly

#### Custom Hooks

```typescript
// hooks/use-in-view.ts
import { useRef, useEffect, useState } from "react";

export const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};
```

#### Hook Rules

- Only call hooks at top level (not in loops/conditions)
- Only call hooks from React functions or custom hooks
- Use ESLint plugin `eslint-plugin-react-hooks`

### Prefer Composition Over Inheritance

```typescript
// ✅ GOOD - Composition
interface ImageCardProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

export const ImageCard: React.FC<ImageCardProps> = ({ src, alt, children }) => (
  <figure>
    <img src={src} alt={alt} />
    {children}
  </figure>
);

// Usage: Compose with other components
<ImageCard src="..." alt="...">
  <figcaption>Caption text</figcaption>
</ImageCard>
```

### Event Handlers

```typescript
// ✅ GOOD - Arrow function captures context
export const PropertyCard: React.FC<PropertyCardProps> = ({ onSelect, id }) => {
  const handleClick = () => {
    onSelect?.(id);
  };

  return <button onClick={handleClick}>Select</button>;
};

// ✅ GOOD - Inline arrow for simple cases
<button onClick={() => setOpen(!open)}>Toggle</button>
```

---

## State Management

### Prefer Local State

```typescript
// ✅ GOOD - Local state for component-level concerns
export const CollectionFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<PropertyCategory | null>(null);

  const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!category || p.category === category)
  );

  return (
    <>
      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      {/* filter UI */}
    </>
  );
};
```

### Use Context for Global State (Sparingly)

```typescript
// ✅ GOOD - Context for truly global concerns
interface SiteContextValue {
  siteSettings: SiteSettings;
  isLoading: boolean;
}

const SiteContext = React.createContext<SiteContextValue | undefined>(
  undefined,
);

export const useSiteSettings = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within SiteProvider");
  }
  return context;
};
```

---

## CSS & Styling

### Tailwind CSS with CSS Variables

#### Use CSS Variable Tokens

```typescript
// ✅ GOOD - CSS variables for consistent spacing/colors
<div className="p-[var(--space-6)] bg-[var(--color-ivory)]">
  Content
</div>

// Color tokens
<div className="text-[var(--color-ocean)]">Ocean text</div>
```

#### Inline Styles for Dynamic Values

```typescript
// ✅ GOOD - Dynamic CSS with CSS variables
interface CardProps {
  gradientAngle?: number;
}

export const GradientCard: React.FC<CardProps> = ({ gradientAngle = 135 }) => (
  <div
    style={{
      background: `linear-gradient(${gradientAngle}deg,
        var(--color-ocean), var(--color-sand))`,
    }}
  >
    Content
  </div>
);
```

#### Avoid Inline Styles for Static Values

```typescript
// ❌ BAD - Use Tailwind instead
<div style={{ padding: '1rem', backgroundColor: '#f7f2ea' }}>

// ✅ GOOD
<div className="p-4 bg-[var(--color-ivory)]">
```

### Class Names Organization

```typescript
// ✅ GOOD - Organize classes logically
<div
  className={
    // Layout
    'flex flex-col items-center justify-between ' +
    // Spacing
    'p-6 m-4 gap-4 ' +
    // Colors
    'bg-[var(--color-ivory)] text-[var(--color-ocean)] ' +
    // Responsive
    'md:flex-row lg:gap-8'
  }
>
  Content
</div>

// Or use clsx for conditional classes
<div className={clsx(
  'flex items-center p-6',
  isActive && 'bg-[var(--color-sand)]',
  hasError && 'border border-red-500',
)}>
  Content
</div>
```

---

## API & Data Fetching

### Sanity Queries

```typescript
// ✅ GOOD - GROQ query in separate file
// sanity/queries/property.ts
export const getPropertyBySlug = async (slug: string) => {
  const query = `
    *[_type == "property" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      category,
      pricing,
      "rooms": rooms[] {
        _id,
        name,
        slug,
        capacity,
        pricing
      }
    }
  `;

  return sanityClient.fetch(query, { slug });
};

// Usage in page
export const PropertyPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const property = await getPropertyBySlug(params.slug);
  // ...
};
```

### Error Handling

```typescript
// ✅ GOOD - Try-catch with proper error types
export const getPropertyBySlug = async (slug: string) => {
  try {
    const query = `*[_type == "property" && slug.current == $slug][0]`;
    const property = await sanityClient.fetch(query, { slug });

    if (!property) {
      throw new Error(`Property not found: ${slug}`);
    }

    return property;
  } catch (error) {
    console.error(`Error fetching property ${slug}:`, error);
    // Return fallback or throw for page to handle
    throw error;
  }
};
```

### Environment Variables

```typescript
// ✅ GOOD - Type-safe env access
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  throw new Error("Missing required Sanity environment variables");
}

// ❌ BAD - No validation
const token = process.env.SOME_TOKEN; // Could be undefined
```

---

## Next.js Specific Patterns

### Metadata Definition

```typescript
// ✅ GOOD - Static metadata
export const metadata: Metadata = {
  title: "La Mer Collection | Luxury Villas & Hotel",
  description: "Discover 38 curated luxury properties in Vĩnh Hỷ",
  openGraph: {
    title: "La Mer Collection",
    description: "Luxury villas and hotel rooms",
    url: "https://lamercollection.com",
    type: "website",
  },
};

export default function Home() {
  // ...
}
```

### Dynamic Metadata

```typescript
// ✅ GOOD - Metadata from CMS
export async function generateMetadata({ params }): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);

  return {
    title: `${property.name} | La Mer Collection`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.name,
      images: [property.images[0]?.url || ''],
    },
  };
}

export default async function PropertyPage({ params }) {
  const property = await getPropertyBySlug(params.slug);
  return <PropertyDetail property={property} />;
}
```

### Image Component

```typescript
// ✅ GOOD - Next.js Image optimization
import Image from 'next/image';

export const PropertyGallery: React.FC<{ images: any[] }> = ({ images }) => (
  <div className="grid grid-cols-3 gap-4">
    {images.map((img, i) => (
      <Image
        key={i}
        src={img.url}
        alt={img.alt || 'Property image'}
        width={400}
        height={300}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={i === 0} // Prioritize first image
      />
    ))}
  </div>
);
```

---

## Code Organization

### Import Organization

```typescript
// ✅ GOOD - Organize imports in this order
import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { PropertyCard } from "@/components/property-card";
import { useInView } from "@/lib/hooks/use-in-view";
import { formatPrice } from "@/lib/format-price";

import type { Property } from "@/lib/types";
```

### Function Order in Files

```typescript
// ✅ GOOD - Organize in this order
// 1. Imports
import React from 'react';

// 2. Type definitions
interface MyComponentProps {
  title: string;
}

// 3. Constants
const DEFAULT_DELAY = 300;

// 4. Helper functions
const calculateTotal = (items: any[]) => items.reduce((a, b) => a + b.price, 0);

// 5. Main component
export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  const [count, setCount] = useState(0);
  return <div>{title}</div>;
};

// 6. Subcomponents (if any)
const Subcomponent = () => <div>Sub</div>;
```

---

## Performance Best Practices

### Code Splitting

```typescript
// ✅ GOOD - Lazy load heavy components
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('@/components/lightbox'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Don't render on server
});

export const Gallery = () => (
  <>
    {/* Regular components */}
    <Lightbox /> {/* Only loaded when needed */}
  </>
);
```

### Memoization

```typescript
// ✅ GOOD - Memoize expensive components
import { memo } from 'react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = memo<PropertyCardProps>(({ property }) => {
  return (
    <div>
      <h3>{property.name}</h3>
      <p>{formatPrice(property.pricing.weekday)}</p>
    </div>
  );
});

PropertyCard.displayName = 'PropertyCard';
```

### Debouncing

```typescript
// ✅ GOOD - Debounce search input
import { useRef, useState } from 'react';

export const SearchInput = () => {
  const [value, setValue] = useState('');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      // Perform search
      console.log('Search:', e.target.value);
    }, 300);
  };

  return <input value={value} onChange={handleChange} />;
};
```

---

## Testing Standards

### Unit Test Structure

```typescript
// property-card.test.tsx
import { render, screen } from '@testing-library/react';
import { PropertyCard } from './property-card';

describe('PropertyCard', () => {
  const mockProperty = {
    id: '1',
    name: 'Ocean View Villa',
    price: 5000,
  };

  it('renders property name', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('Ocean View Villa')).toBeInTheDocument();
  });

  it('displays formatted price', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('$5,000')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <PropertyCard property={mockProperty} onClick={handleClick} />
    );
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## Documentation Standards

### Code Comments

```typescript
// ✅ GOOD - Explain WHY, not WHAT
// Prioritize first image for LCP (Largest Contentful Paint)
<Image priority src={images[0]} alt="..." />

// ❌ BAD - State the obvious
// Set the image source
<img src={...} />
```

### JSDoc Comments for Exported Functions

```typescript
/**
 * Formats a price value to VND currency string
 * @param price - Price in numeric format (e.g., 5000000)
 * @param options - Optional formatting options
 * @returns Formatted price string (e.g., "5.000.000 ₫")
 */
export const formatPrice = (
  price: number,
  options?: { showCurrency?: boolean },
): string => {
  // Implementation
};
```

---

## Git & Commits

### Commit Message Format

Use conventional commits:

```
feat: add property detail page with room listing
fix: correct ISR revalidation tag issue
docs: update deployment guide
refactor: simplify CollectionFilters component
test: add PropertyCard unit tests
chore: upgrade Next.js to 16.0.1
```

### Branch Naming

- Feature: `feature/property-detail-pages`
- Fix: `fix/isr-revalidation-bug`
- Docs: `docs/deployment-guide`

---

## Pre-Commit Checklist

Before committing code:

- [ ] No `console.log()` statements (use proper logging)
- [ ] No commented-out code
- [ ] TypeScript: no errors (`bun run type-check`)
- [ ] ESLint: no errors (`bun run lint`)
- [ ] Tests: all pass (`bun test`)
- [ ] No sensitive data (API keys, tokens)
- [ ] Code follows standards in this document

---

## Common Anti-Patterns

### ❌ Prop Drilling

```typescript
// BAD - Props passed through many levels
<GrandParent>
  <Parent data={data}>
    <Child data={data}>
      <GrandChild data={data} /> {/* Only this needs it */}
    </Child>
  </Parent>
</GrandParent>

// GOOD - Use Context or custom hooks
const useData = () => useContext(DataContext);

<DataProvider>
  <GrandParent />
</DataProvider>
```

### ❌ Unnecessary useEffect

```typescript
// BAD
useEffect(() => {
  setFiltered(properties.filter((p) => p.price < maxPrice));
}, [properties, maxPrice]); // Recalculates on every render

// GOOD
const filtered = useMemo(
  () => properties.filter((p) => p.price < maxPrice),
  [properties, maxPrice],
);
```

### ❌ Missing Error Boundaries

```typescript
// GOOD - Wrap risky components
<ErrorBoundary fallback={<ErrorPage />}>
  <PropertyGallery />
</ErrorBoundary>
```

---

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Last Updated:** March 2026 | **Framework:** Next.js 16 + React 19 | **Enforced via:** ESLint + TypeScript + CI/CD
