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
          { title: "Villa", value: "villa" },
          { title: "Trải Nghiệm", value: "experience" },
          { title: "Vĩnh Hy", value: "vinh-hy" },
          { title: "Ẩm Thực", value: "cuisine" },
        ],
      },
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "title.vi", subtitle: "category", media: "media" },
  },
});
