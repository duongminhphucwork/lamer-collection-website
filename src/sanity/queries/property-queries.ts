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
