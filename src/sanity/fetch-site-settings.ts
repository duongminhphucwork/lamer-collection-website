import { sanityFetch } from "./client";
import { siteSettingsQuery } from "./queries/site-settings-queries";

export interface SiteSettings {
  siteName?: string;
  tagline?: { vi?: string; en?: string };
  phone?: string;
  email?: string;
  zaloUrl?: string;
  address?: { vi?: string; en?: string };
  hours?: string;
  socialLinks?: { facebook?: string; instagram?: string; tiktok?: string };
  googleMapsEmbed?: string;
  logo?: { asset: { url: string } };
  defaultSeo?: { metaTitle?: string; metaDescription?: string };
}

/** Fetch site settings singleton from Sanity CMS */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
  } catch {
    return null;
  }
}
