import { sanityFetch } from "./client";
import { pageContentQuery } from "./queries/page-content-queries";

export interface ContentItem {
  title?: string;
  description?: string;
  gradient?: string;
  iconPath?: string;
  iconCircle?: string;
  extraField?: string;
  image?: { asset: { url: string; metadata: Record<string, unknown> } };
}

export interface ContentSection {
  key: string;
  subtitle?: string;
  title?: string;
  body?: string;
  image?: { asset: { url: string; metadata: Record<string, unknown> } };
  images?: { asset: { url: string; metadata: Record<string, unknown> } }[];
  items?: ContentItem[];
}

export interface PageContent {
  heroSubtitle?: string;
  heroTitle?: string;
  heroBackground?: {
    asset: { url: string; metadata: Record<string, unknown> };
  };
  sections?: ContentSection[];
  seo?: { metaTitle?: string; metaDescription?: string };
}

/** Fetch page content from Sanity CMS, returns null if not found */
export async function fetchPageContent(
  pageSlug: string,
): Promise<PageContent | null> {
  try {
    return await sanityFetch<PageContent | null>({
      query: pageContentQuery,
      params: { pageSlug },
      tags: ["pageContent"],
    });
  } catch {
    return null;
  }
}

/** Get a section by key from page content, returns undefined if not found */
export function getSection(
  content: PageContent | null,
  key: string,
): ContentSection | undefined {
  return content?.sections?.find((s) => s.key === key);
}
