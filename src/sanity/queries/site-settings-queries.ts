import { groq } from "next-sanity";

/** Site settings singleton */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, tagline, phone, email, zaloUrl,
    address, socialLinks, googleMapsEmbed,
    logo{ asset->{ url } },
    defaultSeo
  }
`;
