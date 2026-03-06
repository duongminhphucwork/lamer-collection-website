import { groq } from "next-sanity";

/** All experiences ordered by sort order */
export const allExperiencesQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id, name, slug, category, description,
    images[]{ image{ asset->{ url, metadata } }, alt },
    highlights
  }
`;

/** Experiences by category */
export const experiencesByCategoryQuery = groq`
  *[_type == "experience" && category == $category] | order(order asc) {
    _id, name, slug, category, description,
    images[]{ image{ asset->{ url, metadata } }, alt },
    highlights
  }
`;
