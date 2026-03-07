import type { Metadata } from "next";
import { fetchPageContent } from "@/sanity/fetch-page-content";
import { fetchGalleryItems } from "@/sanity/fetch-gallery-items";
import GalleryClient from "./gallery-client";

export const metadata: Metadata = {
  title: "Thư Viện",
  description:
    "Thư viện hình ảnh La Mer Collection - villa, trải nghiệm, ẩm thực và phong cảnh Vĩnh Hy Bay.",
};

export default async function GalleryPage() {
  const [cms, cmsGallery] = await Promise.all([
    fetchPageContent("gallery"),
    fetchGalleryItems(),
  ]);

  return (
    <GalleryClient
      heroSubtitle={cms?.heroSubtitle || "Gallery"}
      heroTitle={cms?.heroTitle || "Thư Viện"}
      heroImage={cms?.heroBackground?.asset?.url}
      cmsItems={cmsGallery}
    />
  );
}
