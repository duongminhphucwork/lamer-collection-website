"use client";

import { useState } from "react";
import HeroSection from "@/components/ui/hero-section";
import FilterBar from "@/components/ui/filter-bar";
import ImageCard from "@/components/ui/image-card";
import CtaBanner from "@/components/ui/cta-banner";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { PROPERTIES, COLLECTION_FILTERS } from "@/lib/constants";
import type { SanityProperty } from "./page";

const CATEGORY_LABELS: Record<string, string> = {
  heritage: "Villa Di Sản",
  mediterranean: "Villa Địa Trung Hải",
  vietnamese: "Villa Việt Nam",
  hotel: "Phòng Khách Sạn",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  heritage:
    "Nhà cũ của cư dân Vĩnh Hy, được phục dựng và cải tạo cẩn thận — nơi di sản kiến trúc bản địa gặp gỡ sự tinh tế của nghỉ dưỡng đương đại.",
  mediterranean:
    "Đường nét Địa Trung Hải hòa vào khung cảnh vịnh biển — không gian thoáng đãng, sắc ấm của đá và gỗ, mở ra tầm nhìn không giới hạn.",
  hotel:
    "Phòng nghỉ hướng biển với thiết kế tối giản, tận dụng ánh sáng tự nhiên và chất liệu địa phương cho trải nghiệm nghỉ dưỡng trọn vẹn.",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  heritage: "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 80%)",
  mediterranean: "linear-gradient(180deg, #c9a87c 0%, #b8945a 100%)",
  vietnamese: "linear-gradient(180deg, #2c5f7a 0%, #1a4a63 100%)",
  hotel: "linear-gradient(180deg, #3a6b82 0%, #0d2b3e 100%)",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export default function CollectionClient({
  heroSubtitle,
  heroTitle,
  heroImage,
  properties,
}: {
  heroSubtitle: string;
  heroTitle: string;
  heroImage?: string;
  properties: SanityProperty[];
}) {
  const [filter, setFilter] = useState("all");

  const hasCmsData = properties.length > 0;

  // Use CMS data if available, otherwise fall back to hardcoded
  const items = hasCmsData
    ? properties.map((p) => ({
        key: p._id,
        title: p.name,
        category: p.category,
        categoryLabel: CATEGORY_LABELS[p.category] || p.category,
        description:
          p.description ||
          `${p.roomCount} phòng · từ ${formatPrice(p.minPrice)}/đêm`,
        gradient: CATEGORY_GRADIENTS[p.category] || CATEGORY_GRADIENTS.hotel,
        image: p.thumbnail?.asset?.url || null,
        guests: p.maxCapacity,
        featured: p.featured || false,
      }))
    : PROPERTIES.map((p) => ({
        key: p.title,
        title: p.title,
        category: p.category,
        categoryLabel: p.categoryLabel,
        description: p.description,
        gradient: p.gradient,
        image: "image" in p ? (p as { image: string }).image : null,
        guests: p.guests,
        featured: p.featured || false,
      }));

  const filtered =
    filter === "all" ? items : items.filter((p) => p.category === filter);

  return (
    <>
      <HeroSection
        subtitle={heroSubtitle}
        title={heroTitle}
        backgroundImage={heroImage}
        backgroundStyle="linear-gradient(135deg, #0d2b3e 0%, #1a4a63 50%, #0a1f2e 100%)"
      />

      <ScrollReveal>
        <FilterBar
          filters={COLLECTION_FILTERS}
          active={filter}
          onChange={setFilter}
          variant="square"
        />
      </ScrollReveal>

      {filter !== "all" && CATEGORY_DESCRIPTIONS[filter] && (
        <div
          className="text-center"
          style={{
            padding: "0 var(--container-padding)",
            maxWidth: "var(--container-max)",
            marginInline: "auto",
            marginBottom: "var(--space-4)",
          }}
        >
          <p
            className="font-heading font-normal italic"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-light)",
              lineHeight: 1.8,
              maxWidth: "640px",
              marginInline: "auto",
            }}
          >
            {CATEGORY_DESCRIPTIONS[filter]}
          </p>
        </div>
      )}

      <section
        style={{
          padding: "var(--space-8) var(--container-padding) var(--space-24)",
          maxWidth: "var(--container-max)",
          marginInline: "auto",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "var(--space-6)" }}
        >
          {filtered.map((p, i) => (
            <ScrollReveal
              key={p.key}
              delay={(i % 3) * 0.1}
              className={p.featured ? "row-span-2" : ""}
            >
              <ImageCard
                gradient={p.gradient}
                image={p.image}
                category={p.categoryLabel}
                title={p.title}
                description={p.description}
                details={{ guests: p.guests, area: "" }}
                featured={p.featured}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Liên Hệ Để Đặt Phòng"
        text="Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn lựa chọn không gian nghỉ dưỡng phù hợp nhất."
        href="/lien-he"
        linkLabel="Liên Hệ Ngay"
      />
    </>
  );
}
