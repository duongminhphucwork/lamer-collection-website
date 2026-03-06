import type { SchemaTypeDefinition } from "sanity";

// Object types
import { localizedString } from "./objects/localized-string";
import { localizedText } from "./objects/localized-text";
import { imageWithAlt } from "./objects/image-with-alt";
import { seoFields } from "./objects/seo-fields";
import { priceRange } from "./objects/price-range";

// Document types
import { property } from "./documents/property";
import { experience } from "./documents/experience";
import { galleryItem } from "./documents/gallery-item";
import { siteSettings } from "./documents/site-settings";

/** All Sanity schema types */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  localizedString,
  localizedText,
  imageWithAlt,
  seoFields,
  priceRange,
  // Documents
  property,
  experience,
  galleryItem,
  siteSettings,
];
