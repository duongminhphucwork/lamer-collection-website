"use client";

import { useState, useCallback } from "react";
import HeroSection from "@/components/ui/hero-section";
import FilterBar from "@/components/ui/filter-bar";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { GALLERY_FILTERS, GALLERY_ITEMS } from "@/lib/constants";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === filter);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  return (
    <>
      <HeroSection
        subtitle="Gallery"
        title="Thư Viện"
        backgroundStyle="linear-gradient(135deg, #0d2b3e 0%, #2c5f7a 50%, #c9a87c 100%)"
      />

      <FilterBar
        filters={GALLERY_FILTERS}
        active={filter}
        onChange={setFilter}
        variant="pill"
      />

      <section
        style={{
          paddingInline: "var(--container-padding)",
          paddingBottom: "var(--space-24)",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "var(--space-4)",
            maxWidth: "var(--container-max)",
            marginInline: "auto",
          }}
        >
          {filtered.map((item, i) => (
            <ScrollReveal key={item.title} delay={(i % 3) * 0.1}>
              <div
                onClick={() => setLightboxIdx(i)}
                className={`group relative overflow-hidden cursor-pointer ${
                  "variant" in item && item.variant === "tall"
                    ? "md:row-span-2"
                    : "variant" in item && item.variant === "wide"
                      ? "md:col-span-2"
                      : ""
                }`}
                style={{
                  borderRadius: "2px",
                  aspectRatio:
                    "variant" in item && item.variant === "tall"
                      ? "3/5"
                      : "variant" in item && item.variant === "wide"
                        ? "16/7"
                        : "4/3",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: item.gradient }}
                />
                <div
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,43,62,0.7) 0%, transparent 50%)",
                    padding: "var(--space-6)",
                    transition:
                      "opacity var(--duration-normal) var(--ease-out)",
                  }}
                >
                  <span
                    className="font-heading font-medium"
                    style={{
                      fontSize: "var(--text-lg)",
                      color: "var(--color-white)",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            backgroundColor: "rgba(13,43,62,0.95)",
            transition: "opacity var(--duration-normal)",
          }}
          onClick={closeLightbox}
        >
          <button
            className="absolute z-[201] leading-none"
            style={{
              top: "var(--space-6)",
              right: "var(--space-6)",
              fontSize: "var(--text-2xl)",
              color: "var(--color-white)",
            }}
            onClick={closeLightbox}
            aria-label="Đóng"
          >
            &times;
          </button>
          <div
            style={{
              width: "80vw",
              height: "70vh",
              maxWidth: "1000px",
              borderRadius: "2px",
              background: filtered[lightboxIdx].gradient,
            }}
          />
        </div>
      )}
    </>
  );
}
