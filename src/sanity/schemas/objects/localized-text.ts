import { defineType } from "sanity";

/** Localized rich text for future i18n support */
export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    { name: "vi", title: "Vietnamese", type: "text" },
    { name: "en", title: "English", type: "text" },
  ],
});
