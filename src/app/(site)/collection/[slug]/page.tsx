import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/client";
import {
  propertyDetailQuery,
  allPropertySlugsQuery,
} from "@/sanity/queries/property-queries";
import type { PropertyDetail } from "@/types/property";
import PropertyDetailClient from "./property-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: allPropertySlugsQuery,
    tags: ["property"],
  }).catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await sanityFetch<PropertyDetail | null>({
    query: propertyDetailQuery,
    params: { slug },
    tags: ["property"],
  });
  if (!property) return {};
  const image = property.images?.[0]?.asset?.url;
  return {
    title: `${property.name} | La Mer Collection`,
    description:
      property.description ||
      `${property.name} tại La Mer Collection, Vĩnh Hy Bay.`,
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await sanityFetch<PropertyDetail | null>({
    query: propertyDetailQuery,
    params: { slug },
    tags: ["property"],
  });
  if (!property) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": property.category === "hotel" ? "Hotel" : "LodgingBusiness",
    name: property.name,
    description: property.description,
    image: property.images?.[0]?.asset?.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vĩnh Hy",
      addressRegion: "Ninh Thuận",
      addressCountry: "VN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient property={property} />
    </>
  );
}
