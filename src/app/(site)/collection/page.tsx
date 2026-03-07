import type { Metadata } from "next";
import { fetchPageContent } from "@/sanity/fetch-page-content";
import { sanityFetch } from "@/sanity/client";
import { allPropertiesQuery } from "@/sanity/queries/property-queries";
import CollectionClient from "./collection-client";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập",
  description:
    "Khám phá bộ sưu tập villa di sản, villa Địa Trung Hải và phòng khách sạn sang trọng tại La Mer Collection, Vĩnh Hy Bay.",
};

export default async function CollectionPage() {
  const [cms, properties] = await Promise.all([
    fetchPageContent("collection"),
    sanityFetch<SanityProperty[]>({
      query: allPropertiesQuery,
      tags: ["property"],
    }).catch(() => []),
  ]);

  return (
    <CollectionClient
      heroSubtitle={cms?.heroSubtitle || "The Collection"}
      heroTitle={cms?.heroTitle || "Bộ Sưu Tập"}
      heroImage={cms?.heroBackground?.asset?.url}
      properties={properties}
    />
  );
}

export interface SanityProperty {
  _id: string;
  name: string;
  slug?: { current: string };
  category: string;
  description?: string;
  featured?: boolean;
  thumbnail?: { asset: { url: string } };
  roomCount: number;
  minPrice: number;
  maxCapacity: number;
}
