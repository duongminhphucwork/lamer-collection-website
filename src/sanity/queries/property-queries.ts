import { groq } from "next-sanity";

/** All properties ordered by sort order */
export const allPropertiesQuery = groq`
  *[_type == "property"] | order(order asc) {
    _id, name, slug, category, description, featured, order,
    thumbnail{ asset->{ url, metadata } },
    "roomCount": count(rooms),
    "minPrice": math::min(rooms[].priceWeekday),
    "maxCapacity": math::max(rooms[].capacity)
  }
`;

/** Single property by slug with full room details */
export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id, name, slug, category, description, featured,
    thumbnail{ asset->{ url, metadata } },
    images[]{ asset->{ url, metadata } },
    rooms[]{ name, description, viewType, capacity, priceWeekday, priceWeekend, priceHoliday, images[]{ asset->{ url, metadata } } }
  }
`;

/** Property detail with room slugs for detail page */
export const propertyDetailQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id, name, slug, category, description, featured,
    thumbnail{ asset->{ url, metadata } },
    images[]{ asset->{ url, metadata } },
    rooms[]{
      name, slug, description, viewType, capacity,
      priceWeekday, priceWeekend, priceHoliday,
      images[]{ asset->{ url, metadata } }
    }
  }
`;

/** All property slugs for generateStaticParams */
export const allPropertySlugsQuery = groq`
  *[_type == "property" && defined(slug.current)]{
    "slug": slug.current
  }
`;

/** Property + rooms by slug for room detail page */
export const roomDetailQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id, name, slug, category,
    rooms[]{
      name, slug, description, viewType, capacity,
      priceWeekday, priceWeekend, priceHoliday,
      images[]{ asset->{ url, metadata } }
    }
  }
`;

/** All property+room slug combos for generateStaticParams (hotels only) */
export const allRoomSlugsQuery = groq`
  *[_type == "property" && defined(slug.current) && category == "hotel"] {
    "propertySlug": slug.current,
    "roomSlugs": rooms[defined(slug)].slug
  }
`;

/** All properties with filter-friendly fields */
export const allPropertiesWithFiltersQuery = groq`
  *[_type == "property"] | order(order asc) {
    _id, name, slug, category, description, featured, order,
    thumbnail{ asset->{ url, metadata } },
    "roomCount": count(rooms),
    "minPrice": math::min(rooms[].priceWeekday),
    "maxPrice": math::max(rooms[].priceWeekday),
    "maxCapacity": math::max(rooms[].capacity),
    "viewTypes": rooms[].viewType
  }
`;
