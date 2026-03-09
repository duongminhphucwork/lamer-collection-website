import { defineType, defineField } from "sanity";

/** Property document - a location/building containing multiple rooms */
export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Villa Di Sản", value: "heritage" },
          { title: "Villa Địa Trung Hải", value: "mediterranean" },
          { title: "Phòng Khách Sạn", value: "hotel" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "rooms",
      title: "Rooms",
      type: "array",
      of: [
        {
          type: "object",
          name: "room",
          title: "Room",
          fields: [
            defineField({
              name: "name",
              title: "Room Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "string",
              description:
                "URL-friendly name (e.g., oc, so, ca-co). Must be unique within this property.",
              validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "viewType",
              title: "View Type",
              type: "string",
              options: {
                list: [
                  { title: "View biển", value: "sea-view" },
                  { title: "View núi", value: "mountain-view" },
                  { title: "Không view", value: "no-view" },
                ],
              },
            }),
            defineField({
              name: "capacity",
              title: "Max Guests",
              type: "number",
            }),
            defineField({
              name: "priceWeekday",
              title: "Price T2-T5 (VND)",
              type: "number",
            }),
            defineField({
              name: "priceWeekend",
              title: "Price T6-CN (VND)",
              type: "number",
            }),
            defineField({
              name: "priceHoliday",
              title: "Price Lễ/Tết (VND)",
              type: "number",
            }),
            defineField({
              name: "images",
              title: "Room Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "description",
            },
            prepare({ title, subtitle }) {
              return { title, subtitle };
            },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
    prepare({ title, subtitle }) {
      const labels: Record<string, string> = {
        heritage: "Villa Di Sản",
        mediterranean: "Villa Địa Trung Hải",
        hotel: "Phòng Khách Sạn",
      };
      return { title, subtitle: labels[subtitle] || subtitle };
    },
  },
});
