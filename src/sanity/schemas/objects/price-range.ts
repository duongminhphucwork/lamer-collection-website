import { defineType } from "sanity";

/** Price range for future booking engine */
export const priceRange = defineType({
  name: "priceRange",
  title: "Price Range",
  type: "object",
  fields: [
    { name: "min", title: "Min Price (VND)", type: "number" },
    { name: "max", title: "Max Price (VND)", type: "number" },
    {
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "VND",
    },
  ],
});
