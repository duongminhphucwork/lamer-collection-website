import { groq } from "next-sanity";

/** All properties ordered by sort order */
export const allPropertiesQuery = groq`
  *[_type == "property"] | order(order asc) {
    _id, name, slug, category, description,
    images[]{ image{ asset->{ url, metadata } }, alt },
    capacity, area, amenities, featured
  }
`;

/** Featured properties for homepage */
export const featuredPropertiesQuery = groq`
  *[_type == "property" && featured == true] | order(order asc) {
    _id, name, slug, category,
    images[0]{ image{ asset->{ url, metadata } }, alt }
  }
`;

/** Properties filtered by category */
export const propertiesByCategoryQuery = groq`
  *[_type == "property" && category == $category] | order(order asc) {
    _id, name, slug, category, description,
    images[]{ image{ asset->{ url, metadata } }, alt },
    capacity, area, amenities
  }
`;
