"use client";

import PropertyGallery from "@/components/ui/property-gallery";
import BackLink from "@/components/ui/back-link";
import PricingTable from "@/components/ui/pricing-table";
import RoomCard from "@/components/ui/room-card";
import CtaBanner from "@/components/ui/cta-banner";
import ScrollReveal from "@/components/shared/scroll-reveal";
import type { PropertyDetail } from "@/types/property";

const CATEGORY_LABELS: Record<string, string> = {
  heritage: "Villa Di Sản",
  mediterranean: "Villa Địa Trung Hải",
  hotel: "Phòng Khách Sạn",
};

const VIEW_LABELS: Record<string, string> = {
  "sea-view": "View Biển",
  "mountain-view": "View Núi",
  "no-view": "Không View",
};

function formatVnd(price?: number): string {
  if (!price) return "—";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export default function PropertyDetailClient({
  property,
}: {
  property: PropertyDetail;
}) {
  const isHotel = property.category === "hotel";
  const room0 = property.rooms?.[0];
  const slug = property.slug.current;

  // Gather unique view types for hotel info
  const viewTypes = isHotel
    ? [
        ...new Set(
          property.rooms?.map((r) => r.viewType).filter(Boolean) as string[],
        ),
      ]
    : [];

  const minPrice = isHotel
    ? Math.min(
        ...(property.rooms?.map((r) => r.priceWeekday || Infinity) || [
          Infinity,
        ]),
      )
    : undefined;

  return (
    <>
      <PropertyGallery images={property.images} propertyName={property.name} />

      <BackLink href="/collection" label="Bộ Sưu Tập" />

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
              {CATEGORY_LABELS[property.category] || property.category}
            </span>
            <h1
              className="font-heading font-normal"
              style={{
                fontSize: "var(--text-2xl)",
                color: "var(--color-ocean)",
                marginBottom: "var(--space-4)",
                lineHeight: 1.15,
              }}
            >
              {property.name}
            </h1>
            {property.description && (
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-light)",
                  lineHeight: 1.8,
                  maxWidth: "700px",
                }}
              >
                {property.description}
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
            {isHotel ? (
              <>
                <InfoItem
                  label="Số phòng"
                  value={`${property.rooms?.length || 0} phòng`}
                />
                {viewTypes.length > 0 && (
                  <InfoItem
                    label="View"
                    value={viewTypes
                      .map((v) => VIEW_LABELS[v] || v)
                      .join(" & ")}
                  />
                )}
                {minPrice && minPrice !== Infinity && (
                  <InfoItem label="Giá từ" value={formatVnd(minPrice)} />
                )}
              </>
            ) : (
              <>
                {room0?.capacity && (
                  <InfoItem
                    label="Sức chứa"
                    value={`${room0.capacity} khách`}
                  />
                )}
                {room0?.viewType && (
                  <InfoItem
                    label="View"
                    value={VIEW_LABELS[room0.viewType] || room0.viewType}
                  />
                )}
              </>
            )}
          </div>
        </ScrollReveal>

        {/* Villa: Pricing + CTA */}
        {!isHotel && room0 && (
          <>
            <PricingTable
              priceWeekday={room0.priceWeekday}
              priceWeekend={room0.priceWeekend}
              priceHoliday={room0.priceHoliday}
            />
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
          </>
        )}

        {/* Hotel: Room Grid */}
        {isHotel && property.rooms && property.rooms.length > 0 && (
          <ScrollReveal>
            <div style={{ marginBottom: "var(--space-8)" }}>
              <h2
                className="font-heading font-normal"
                style={{
                  fontSize: "var(--text-xl)",
                  color: "var(--color-ocean)",
                  marginBottom: "var(--space-6)",
                }}
              >
                Các Phòng
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: "var(--space-6)" }}
              >
                {property.rooms.map((room) => (
                  <RoomCard key={room.slug} room={room} propertySlug={slug} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

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
