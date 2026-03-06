import { defineType, defineField } from "sanity";

/** Site settings singleton - global config */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "localizedString" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "zaloUrl", title: "Zalo URL", type: "url" }),
    defineField({ name: "address", title: "Address", type: "localizedText" }),
    defineField({
      name: "hours",
      title: "Business Hours",
      type: "string",
      description: 'e.g. "Thứ Hai – Chủ Nhật: 07:00 – 22:00"',
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
      ],
    }),
    defineField({
      name: "googleMapsEmbed",
      title: "Google Maps Embed URL",
      type: "url",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    select: { title: "siteName" },
  },
});
