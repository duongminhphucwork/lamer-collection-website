import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { sanityFetch } from "@/sanity/client";
import { groq } from "next-sanity";

/** Fetch all properties with slugs and room slugs for sitemap */
const sitemapPropertiesQuery = groq`
  *[_type == "property" && defined(slug.current)] | order(order asc) {
    "slug": slug.current,
    category,
    "roomSlugs": rooms[defined(slug)].slug
  }
`;

interface SitemapProperty {
  slug: string;
  category: string;
  roomSlugs?: string[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/collection",
    "/experience",
    "/story",
    "/vinh-hy",
    "/gallery",
    "/lien-he",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Add property and room URLs
  const properties = await sanityFetch<SitemapProperty[]>({
    query: sitemapPropertiesQuery,
    tags: ["property"],
  }).catch(() => []);

  for (const p of properties) {
    entries.push({
      url: `${SITE.url}/collection/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    if (p.category === "hotel" && p.roomSlugs) {
      for (const roomSlug of p.roomSlugs) {
        entries.push({
          url: `${SITE.url}/collection/${p.slug}/${roomSlug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
