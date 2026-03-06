import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { sanityConfig } from "./src/sanity/config";

/** Sanity Studio configuration */
export default defineConfig({
  name: "lamer-collection",
  title: "La Mer Collection",
  ...sanityConfig,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
