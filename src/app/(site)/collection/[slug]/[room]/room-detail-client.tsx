"use client";

import PropertyGallery from "@/components/ui/property-gallery";
import BackLink from "@/components/ui/back-link";
import PricingTable from "@/components/ui/pricing-table";
import RoomCard from "@/components/ui/room-card";
import CtaBanner from "@/components/ui/cta-banner";
import ScrollReveal from "@/components/shared/scroll-reveal";
import type { Room } from "@/types/property";

const VIEW_LABELS: Record<string, string> = {
  "sea-view": "View Biển",
  "mountain-view": "View Núi",
};

interface RoomDetailClientProps {
  room: Room;
  propertyName: string;
  propertySlug: string;
  siblingRooms: Room[];
}

export default function RoomDetailClient({
  room,
  propertyName,
  propertySlug,
  siblingRooms,
}: RoomDetailClientProps) {
  const viewLabel = room.viewType ? VIEW_LABELS[room.viewType] : null;

  return (
    <>
      <PropertyGallery images={room.images} propertyName={room.name} />

      <BackLink href={`/collection/${propertySlug}`} label={propertyName} />

      <div
        style={{
          padding: "0 var(--container-padding) var(--space-16)",
          maxWidth: "900px",
          marginInline: "auto",
        }}
      >
        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: "var(--space-8)" }}>
            {viewLabel && (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-sand)",
                  border: "1px solid var(--color-sand)",
                  padding: "var(--space-1) var(--space-4)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {viewLabel}
              </span>
            )}
            <h1
              className="font-heading font-normal"
              style={{
                fontSize: "var(--text-2xl)",
                color: "var(--color-ocean)",
                marginBottom: "var(--space-4)",
                lineHeight: 1.15,
              }}
            >
              {room.name}
            </h1>
            {room.description && (
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-light)",
                  lineHeight: 1.8,
                  maxWidth: "700px",
                }}
              >
                {room.description}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Info Grid */}
        <ScrollReveal>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-6)",
              padding: "var(--space-6) 0",
              borderTop: "1px solid rgba(13,43,62,0.1)",
              borderBottom: "1px solid rgba(13,43,62,0.1)",
              marginBottom: "var(--space-8)",
            }}
          >
            {room.capacity && (
              <InfoItem label="Sức chứa" value={`${room.capacity} khách`} />
            )}
            {viewLabel && <InfoItem label="View" value={viewLabel} />}
          </div>
        </ScrollReveal>

        {/* Pricing */}
        <PricingTable
          priceWeekday={room.priceWeekday}
          priceWeekend={room.priceWeekend}
          priceHoliday={room.priceHoliday}
        />

        {/* CTA */}
        <ScrollReveal>
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-8) 0",
              borderTop: "1px solid rgba(13,43,62,0.1)",
            }}
          >
            <a
              href="/lien-he"
              className="inline-block font-medium uppercase"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.15em",
                padding: "var(--space-4) var(--space-8)",
                background: "var(--color-ocean)",
                color: "var(--color-white)",
                border: "1px solid var(--color-ocean)",
                minWidth: "200px",
                transition: "all var(--duration-normal) var(--ease-out)",
              }}
            >
              Đặt Phòng
            </a>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-light)",
                marginTop: "var(--space-3)",
              }}
            >
              Liên hệ trực tiếp để được tư vấn và đặt phòng
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Sibling Rooms */}
      {siblingRooms.length > 0 && (
        <div
          style={{
            padding: "var(--space-24) var(--container-padding)",
            backgroundColor: "var(--color-ivory)",
            maxWidth: "var(--container-max)",
            marginInline: "auto",
          }}
        >
          <ScrollReveal>
            <h2
              className="font-heading font-normal"
              style={{
                fontSize: "var(--text-xl)",
                color: "var(--color-ocean)",
                textAlign: "center",
                marginBottom: "var(--space-12)",
              }}
            >
              Các Phòng Khác
            </h2>
          </ScrollReveal>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "var(--space-6)" }}
          >
            {siblingRooms.slice(0, 6).map((sibling, i) => (
              <ScrollReveal key={sibling.slug} delay={(i % 3) * 0.1}>
                <RoomCard room={sibling} propertySlug={propertySlug} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      <CtaBanner
        title="Liên Hệ Để Đặt Phòng"
        text="Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn lựa chọn không gian nghỉ dưỡng phù hợp nhất."
        href="/lien-he"
        linkLabel="Liên Hệ Ngay"
      />
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-1)",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-xs)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-text-light)",
        }}
      >
        {label}
      </span>
      <span
        className="font-heading"
        style={{
          fontSize: "var(--text-lg)",
          color: "var(--color-ocean)",
          fontWeight: 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}
