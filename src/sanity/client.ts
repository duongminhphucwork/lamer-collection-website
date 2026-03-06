import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

/** Sanity client for data fetching */
export const sanityClient = createClient(sanityConfig);

/** Fetch wrapper with revalidation tags for ISR */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? undefined : 60,
      tags,
    },
  });
}
