import { defineType } from "sanity";

/** Image with required alt text for accessibility */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with Alt",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "alt", title: "Alt Text", type: "string" },
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});
