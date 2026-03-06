import { defineType, defineField } from "sanity";

/** Gallery item - photos and videos */
export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "media",
      title: "Media",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Video", value: "video" },
        ],
      },
      initialValue: "photo",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Villas", value: "villas" },
          { title: "Views", value: "views" },
          { title: "Dining", value: "dining" },
          { title: "Activities", value: "activities" },
        ],
      },
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "title.vi", subtitle: "category", media: "media" },
  },
});
