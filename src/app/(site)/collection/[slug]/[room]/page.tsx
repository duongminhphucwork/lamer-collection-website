import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/client";
import {
  roomDetailQuery,
  allRoomSlugsQuery,
} from "@/sanity/queries/property-queries";
import type { PropertyDetail } from "@/types/property";
import RoomDetailClient from "./room-detail-client";

interface PageProps {
  params: Promise<{ slug: string; room: string }>;
}

export async function generateStaticParams() {
  const data = await sanityFetch<
    { propertySlug: string; roomSlugs: string[] }[]
  >({
    query: allRoomSlugsQuery,
    tags: ["property"],
  }).catch(() => []);

  return data.flatMap(({ propertySlug, roomSlugs }) =>
    (roomSlugs || []).map((room) => ({ slug: propertySlug, room })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, room: roomSlug } = await params;
  const property = await sanityFetch<PropertyDetail | null>({
    query: roomDetailQuery,
    params: { slug },
    tags: ["property"],
  });
  const room = property?.rooms?.find((r) => r.slug === roomSlug);
  if (!room || !property) return {};
  const image = room.images?.[0]?.asset?.url;
  return {
    title: `${room.name} - ${property.name} | La Mer Collection`,
    description:
      room.description ||
      `${room.name} tại ${property.name}, La Mer Collection, Vĩnh Hy Bay.`,
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function RoomPage({ params }: PageProps) {
  const { slug, room: roomSlug } = await params;
  const property = await sanityFetch<PropertyDetail | null>({
    query: roomDetailQuery,
    params: { slug },
    tags: ["property"],
  });

  if (!property || property.category !== "hotel") notFound();

  const room = property.rooms?.find((r) => r.slug === roomSlug);
  if (!room) notFound();

  const siblingRooms = property.rooms?.filter((r) => r.slug !== roomSlug) || [];

  return (
    <RoomDetailClient
      room={room}
      propertyName={property.name}
      propertySlug={property.slug.current}
      siblingRooms={siblingRooms}
    />
  );
}
