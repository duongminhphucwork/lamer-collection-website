"use client";

import { useState, useCallback, useEffect } from "react";
import HeroSection from "@/components/ui/hero-section";
import FilterBar from "@/components/ui/filter-bar";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { GALLERY_FILTERS, GALLERY_ITEMS } from "@/lib/constants";
import type { SanityGalleryItem } from "@/sanity/fetch-gallery-items";

interface GalleryDisplayItem {
  title: string;
  category: string;
  gradient: string;
  variant?: string;
  imageUrl?: string;
}

export default function GalleryClient({
  heroSubtitle,
  heroTitle,
  heroImage,
  cmsItems,
}: {
  heroSubtitle: string;
  heroTitle: string;
  heroImage?: string;
  cmsItems: SanityGalleryItem[];
}) {
  const [filter, setFilter] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const hasCmsData = cmsItems.length > 0;

  const items: GalleryDisplayItem[] = hasCmsData
    ? cmsItems.map((g) => ({
        title: g.title?.vi || g.title?.en || "",
        category: g.category || "villa",
        gradient: "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 100%)",
        imageUrl: g.media?.asset?.url,
      }))
    : GALLERY_ITEMS.map((g) => ({
        title: g.title,
        category: g.category,
        gradient: g.gradient,
        variant: "variant" in g ? g.variant : undefined,
      }));

  const filtered =
    filter === "all" ? items : items.filter((g) => g.category === filter);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  // Close lightbox on Escape key
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIdx, closeLightbox]);

  return (
    <>
      <HeroSection
        subtitle={heroSubtitle}
        title={heroTitle}
        backgroundImage={heroImage}
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
            <ScrollReveal key={item.title + i} delay={(i % 3) * 0.1}>
              <button
                type="button"
                onClick={() => setLightboxIdx(i)}
                aria-label={`Xem ảnh: ${item.title}`}
                className={`group relative overflow-hidden cursor-pointer text-left w-full ${
                  item.variant === "tall"
                    ? "md:row-span-2"
                    : item.variant === "wide"
                      ? "md:col-span-2"
                      : ""
                }`}
                style={{
                  borderRadius: "2px",
                  aspectRatio:
                    item.variant === "tall"
                      ? "3/5"
                      : item.variant === "wide"
                        ? "16/7"
                        : "4/3",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: item.gradient }}
                />
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
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
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightboxIdx].title}
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
            className="relative overflow-hidden"
            style={{
              width: "80vw",
              height: "70vh",
              maxWidth: "1000px",
              borderRadius: "2px",
              background: filtered[lightboxIdx].gradient,
            }}
          >
            {filtered[lightboxIdx].imageUrl && (
              <img
                src={filtered[lightboxIdx].imageUrl}
                alt={filtered[lightboxIdx].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
