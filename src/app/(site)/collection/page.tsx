"use client";

import { useState } from "react";
import HeroSection from "@/components/ui/hero-section";
import FilterBar from "@/components/ui/filter-bar";
import ImageCard from "@/components/ui/image-card";
import CtaBanner from "@/components/ui/cta-banner";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { PROPERTIES, COLLECTION_FILTERS } from "@/lib/constants";

export default function CollectionPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category === filter);

  return (
    <>
      <HeroSection
        subtitle="The Collection"
        title="Bộ Sưu Tập"
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
              key={p.title}
              delay={(i % 3) * 0.1}
              className={p.featured ? "row-span-2" : ""}
            >
              <ImageCard
                gradient={p.gradient}
                image={"image" in p ? (p as { image: string }).image : null}
                category={p.categoryLabel}
                title={p.title}
                description={p.description}
                details={{ guests: p.guests, area: p.area }}
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
