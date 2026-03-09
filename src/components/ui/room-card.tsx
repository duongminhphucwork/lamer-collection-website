"use client";

import Link from "next/link";
import type { Room } from "@/types/property";

interface RoomCardProps {
  room: Room;
  propertySlug: string;
}

const VIEW_LABELS: Record<string, string> = {
  "sea-view": "View Biển",
  "mountain-view": "View Núi",
  "no-view": "Không View",
};

function formatVnd(price?: number): string {
  if (!price) return "—";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

const ROOM_GRADIENTS = [
  "linear-gradient(135deg, #1a4a63 0%, #2c5f7a 100%)",
  "linear-gradient(135deg, #0d2b3e 0%, #1a4a63 100%)",
  "linear-gradient(135deg, #2a5570 0%, #3a6b82 100%)",
  "linear-gradient(135deg, #3a6b82 0%, #0d2b3e 100%)",
];

export default function RoomCard({ room, propertySlug }: RoomCardProps) {
  const image = room.images?.[0];
  const gradientIdx =
    room.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) %
    ROOM_GRADIENTS.length;

  return (
    <Link
      href={`/collection/${propertySlug}/${room.slug}`}
      style={{
        border: "1px solid rgba(13,43,62,0.1)",
        borderRadius: "2px",
        overflow: "hidden",
        transition:
          "border-color var(--duration-fast), box-shadow var(--duration-fast)",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
      className="hover:!border-[var(--color-sand)] hover:shadow-[0_4px_20px_rgba(13,43,62,0.08)]"
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          background: image ? undefined : ROOM_GRADIENTS[gradientIdx],
          position: "relative",
          overflow: "hidden",
        }}
      >
        {image && (
          <img
            src={image.asset.url}
            alt={room.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
      <div style={{ padding: "var(--space-6)" }}>
        <h3
          className="font-heading"
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: 500,
            color: "var(--color-ocean)",
            marginBottom: "var(--space-2)",
          }}
        >
          {room.name}
        </h3>
        {room.viewType && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
              marginBottom: "var(--space-3)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.05em",
                color: "var(--color-text-light)",
                padding: "var(--space-1) var(--space-3)",
                background: "rgba(13,43,62,0.04)",
                borderRadius: "2px",
              }}
            >
              {VIEW_LABELS[room.viewType] || room.viewType}
            </span>
          </div>
        )}
        {room.capacity && (
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-light)",
              marginBottom: "var(--space-3)",
            }}
          >
            Tối đa {room.capacity} khách
          </p>
        )}
        <p
          className="font-heading"
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-sand)",
            fontWeight: 500,
          }}
        >
          Từ {formatVnd(room.priceWeekday)}
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-body)",
              color: "var(--color-text-light)",
              fontWeight: 400,
            }}
          >
            {" "}
            / đêm
          </span>
        </p>
      </div>
    </Link>
  );
}
