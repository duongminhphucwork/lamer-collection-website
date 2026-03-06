import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

/** Build optimized image URL from Sanity image reference */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
