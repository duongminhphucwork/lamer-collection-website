import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { sanityConfig } from "./src/sanity/config";

/** Custom Studio structure with singleton support */
function deskStructure(S: StructureBuilder) {
  return S.list()
    .title("Nội Dung")
    .items([
      // Site Settings singleton
      S.listItem()
        .title("Cài Đặt Website")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Cài Đặt Website"),
        ),
      S.divider(),
      // Page Content
      S.listItem()
        .title("Nội Dung Trang")
        .child(S.documentTypeList("pageContent").title("Nội Dung Trang")),
      S.divider(),
      // Properties
      S.listItem()
        .title("Bất Động Sản")
        .child(S.documentTypeList("property").title("Bất Động Sản")),
      // Gallery
      S.listItem()
        .title("Thư Viện Ảnh")
        .child(S.documentTypeList("galleryItem").title("Thư Viện Ảnh")),
      // Experiences
      S.listItem()
        .title("Trải Nghiệm")
        .child(S.documentTypeList("experience").title("Trải Nghiệm")),
    ]);
}

/** Sanity Studio configuration */
export default defineConfig({
  name: "lamer-collection",
  title: "La Mer Collection",
  ...sanityConfig,
  basePath: "/studio",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: { types: schemaTypes },
});
