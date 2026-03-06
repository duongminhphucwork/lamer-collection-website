import { defineType } from "sanity";

/** SEO metadata fields for pages and documents */
export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    { name: "metaTitle", title: "Meta Title", type: "string" },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
    },
    { name: "ogImage", title: "OG Image", type: "image" },
  ],
});
