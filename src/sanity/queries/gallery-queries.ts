import { groq } from "next-sanity";

/** All gallery items ordered by sort order */
export const allGalleryItemsQuery = groq`
  *[_type == "galleryItem"] | order(order asc) {
    _id, title, media{ asset->{ url, metadata } },
    mediaType, category
  }
`;

/** Gallery items by category */
export const galleryByCategoryQuery = groq`
  *[_type == "galleryItem" && category == $category] | order(order asc) {
    _id, title, media{ asset->{ url, metadata } },
    mediaType, category
  }
`;
