import { defineType, defineField } from "sanity";

// Which section keys use which optional fields
const SECTIONS_WITH_IMAGE = ["origin", "experience", "location"];
const SECTIONS_WITH_IMAGES = ["collection", "dining"];
const SECTIONS_WITH_ITEMS = [
  "collection",
  "activities",
  "community",
  "highlights",
  "transport",
];

function hideUnless(allowedKeys: string[]) {
  return ({ parent }: { parent?: { key?: string } }) =>
    !parent?.key || !allowedKeys.includes(parent.key);
}

/** Generic page content document — manages hero, intro text, and sections per page */
export const pageContent = defineType({
  name: "pageContent",
  title: "Page Content",
  type: "document",
  fields: [
    defineField({
      name: "pageSlug",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Trang Chủ", value: "home" },
          { title: "Bộ Sưu Tập", value: "collection" },
          { title: "Trải Nghiệm", value: "experience" },
          { title: "Câu Chuyện", value: "story" },
          { title: "Vĩnh Hy", value: "vinh-hy" },
          { title: "Thư Viện", value: "gallery" },
          { title: "Liên Hệ", value: "lien-he" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      description: "Small text above hero title (e.g. 'The Collection')",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main hero heading",
    }),
    defineField({
      name: "heroBackground",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional hero background image (falls back to gradient)",
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "contentSection",
          title: "Section",
          fields: [
            defineField({
              name: "key",
              title: "Section Key",
              type: "string",
              description:
                "Identifier to match in code (e.g. 'intro', 'dining', 'spa')",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Body Text",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "image",
              title: "Section Image",
              type: "image",
              options: { hotspot: true },
              hidden: hideUnless(SECTIONS_WITH_IMAGE),
            }),
            defineField({
              name: "images",
              title: "Gallery Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              description: "Multiple images for gallery/carousel sections",
              hidden: hideUnless(SECTIONS_WITH_IMAGES),
            }),
            defineField({
              name: "items",
              title: "Content Items",
              type: "array",
              description:
                "Repeatable items (activities, highlights, transport, etc.)",
              hidden: hideUnless(SECTIONS_WITH_ITEMS),
              of: [
                {
                  type: "object",
                  name: "contentItem",
                  title: "Item",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 3,
                    }),
                    defineField({
                      name: "gradient",
                      title: "Gradient / Background",
                      type: "string",
                      description: "CSS gradient string",
                    }),
                    defineField({
                      name: "iconPath",
                      title: "Icon SVG Path",
                      type: "string",
                      description: "SVG path data for icon",
                    }),
                    defineField({
                      name: "iconCircle",
                      title: "Icon Circle (cx,cy,r)",
                      type: "string",
                      description: 'Optional circle e.g. "12,12,4"',
                    }),
                    defineField({
                      name: "extraField",
                      title: "Extra Field",
                      type: "string",
                      description:
                        "Flexible field (e.g. distance for transport)",
                    }),
                    defineField({
                      name: "image",
                      title: "Item Image",
                      type: "image",
                      options: { hotspot: true },
                    }),
                  ],
                  preview: {
                    select: { title: "title", subtitle: "description" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "key" },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    select: { title: "pageSlug" },
    prepare({ title }) {
      const labels: Record<string, string> = {
        home: "Trang Chủ",
        collection: "Bộ Sưu Tập",
        experience: "Trải Nghiệm",
        story: "Câu Chuyện",
        "vinh-hy": "Vĩnh Hy",
        gallery: "Thư Viện",
        "lien-he": "Liên Hệ",
      };
      return { title: labels[title] || title };
    },
  },
});
