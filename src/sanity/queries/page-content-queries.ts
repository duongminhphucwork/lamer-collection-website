import { groq } from "next-sanity";

/** Fetch page content by slug */
export const pageContentQuery = groq`
  *[_type == "pageContent" && pageSlug == $pageSlug][0] {
    heroSubtitle, heroTitle,
    heroBackground{ asset->{ url, metadata } },
    sections[]{
      key, subtitle, title, body,
      image{ asset->{ url, metadata } },
      images[]{ asset->{ url, metadata } },
      items[]{ title, description, gradient, iconPath, iconCircle, extraField, image{ asset->{ url, metadata } } }
    },
    seo
  }
`;
