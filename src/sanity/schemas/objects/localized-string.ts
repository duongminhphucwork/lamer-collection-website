import { defineType } from "sanity";

/** Localized string for future i18n support */
export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    { name: "vi", title: "Vietnamese", type: "string" },
    { name: "en", title: "English", type: "string" },
  ],
});
