import { sanityFetch } from "./client";
import { allGalleryItemsQuery } from "./queries/gallery-queries";

export interface SanityGalleryItem {
  _id: string;
  title?: { vi?: string; en?: string };
  media?: { asset: { url: string; metadata: Record<string, unknown> } };
  mediaType?: string;
  category?: string;
}

/** Fetch all gallery items from Sanity CMS */
export async function fetchGalleryItems(): Promise<SanityGalleryItem[]> {
  try {
    return await sanityFetch<SanityGalleryItem[]>({
      query: allGalleryItemsQuery,
      tags: ["galleryItem"],
    });
  } catch {
    return [];
  }
}
