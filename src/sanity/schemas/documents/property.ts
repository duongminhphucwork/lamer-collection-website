import { defineType, defineField } from "sanity";

/** Property document - villas, rooms, heritage homes */
export const property = defineType({
  name: "property",
  title: "Property",
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
          { title: "Heritage", value: "heritage" },
          { title: "Mediterranean", value: "mediterranean" },
          { title: "Vietnamese", value: "vietnamese" },
          { title: "Hotel", value: "hotel" },
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
    defineField({ name: "capacity", title: "Max Guests", type: "number" }),
    defineField({ name: "area", title: "Area (m²)", type: "number" }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "priceRange",
      title: "Price Range",
      type: "priceRange",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "name.vi", subtitle: "category", media: "images.0.image" },
  },
});
