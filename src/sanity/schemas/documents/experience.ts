import { defineType, defineField } from "sanity";

/** Experience document - dining, spa, activities */
export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localizedString" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.vi" },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Dining", value: "dining" },
          { title: "Spa", value: "spa" },
          { title: "Activity", value: "activity" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "name.vi", subtitle: "category", media: "images.0.image" },
  },
});
