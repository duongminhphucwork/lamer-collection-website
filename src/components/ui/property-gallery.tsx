"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { SanityImage } from "@/types/property";

interface PropertyGalleryProps {
  images?: SanityImage[];
  propertyName: string;
}

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #1a4a63 0%, #0d2b3e 60%, #0a1f2e 100%)",
  "linear-gradient(135deg, #0d2b3e 0%, #1a4a63 50%, #2c5f7a 100%)",
  "linear-gradient(135deg, #2c5f7a 0%, #1a4a63 60%, #0d2b3e 100%)",
  "linear-gradient(135deg, #0a1f2e 0%, #0d2b3e 50%, #1a4a63 100%)",
];

export default function PropertyGallery({
  images,
  propertyName,
}: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const slides = images?.length ? images : FALLBACK_GRADIENTS.map(() => null);
  const total = slides.length;

  const scrollToSlide = useCallback(
    (index: number) => {
      const wrapped = ((index % total) + total) % total;
      setCurrentIndex(wrapped);
      const track = trackRef.current;
      if (!track) return;
      const slideEl = track.children[wrapped] as HTMLElement;
      slideEl?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [total],
  );

  // Update dots on manual scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const slideWidth = (track.children[0] as HTMLElement)?.offsetWidth || 1;
        const newIdx = Math.round(track.scrollLeft / slideWidth);
        if (newIdx !== currentIndex && newIdx >= 0 && newIdx < total) {
          setCurrentIndex(newIdx);
        }
      }, 100);
    };
    track.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timeout);
      track.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex, total]);

  // Lightbox keyboard
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft")
        setLightboxIdx((p) => (p !== null ? (p - 1 + total) % total : null));
      if (e.key === "ArrowRight")
        setLightboxIdx((p) => (p !== null ? (p + 1) % total : null));
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIdx, total]);

  return (
    <>
      <div style={{ height: "var(--nav-height)" }} />
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {slides.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIdx(i)}
              aria-label={`${propertyName} - Ảnh ${i + 1}`}
              className="detail-gallery__slide"
              style={{
                flex: "0 0 100%",
                scrollSnapAlign: "start",
                aspectRatio: "16 / 9",
                minHeight: "300px",
                background: img
                  ? undefined
                  : FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length],
                cursor: "pointer",
                border: "none",
                padding: 0,
                position: "relative",
              }}
            >
              {img && (
                <img
                  src={img.asset.url}
                  alt={`${propertyName} - ${i + 1}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={() => scrollToSlide(currentIndex - 1)}
              aria-label="Ảnh trước"
              style={{
                position: "absolute",
                top: "50%",
                left: "var(--space-4)",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(13,43,62,0.5)",
                color: "var(--color-white)",
                fontSize: "1.25rem",
                cursor: "pointer",
                border: "none",
                zIndex: 2,
                padding: 0,
              }}
            >
              &#8249;
            </button>
            <button
              onClick={() => scrollToSlide(currentIndex + 1)}
              aria-label="Ảnh tiếp"
              style={{
                position: "absolute",
                top: "50%",
                right: "var(--space-4)",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(13,43,62,0.5)",
                color: "var(--color-white)",
                fontSize: "1.25rem",
                cursor: "pointer",
                border: "none",
                zIndex: 2,
                padding: 0,
              }}
            >
              &#8250;
            </button>
          </>
        )}

        {/* Dots */}
        {total > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "var(--space-4)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "var(--space-2)",
              zIndex: 2,
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                aria-label={`Ảnh ${i + 1}`}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    i === currentIndex
                      ? "var(--color-white)"
                      : "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "background var(--duration-fast)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${propertyName} - Ảnh ${lightboxIdx + 1}`}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(13,43,62,0.95)" }}
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute z-[201] leading-none"
            style={{
              top: "var(--space-6)",
              right: "var(--space-6)",
              fontSize: "var(--text-2xl)",
              color: "var(--color-white)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setLightboxIdx(null)}
            aria-label="Đóng"
          >
            &times;
          </button>

          {/* Prev/Next in lightbox */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((lightboxIdx - 1 + total) % total);
                }}
                aria-label="Ảnh trước"
                style={{
                  position: "absolute",
                  left: "var(--space-4)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "2rem",
                  color: "var(--color-white)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  zIndex: 201,
                }}
              >
                &#8249;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((lightboxIdx + 1) % total);
                }}
                aria-label="Ảnh tiếp"
                style={{
                  position: "absolute",
                  right: "var(--space-4)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "2rem",
                  color: "var(--color-white)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  zIndex: 201,
                }}
              >
                &#8250;
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "80vw",
              height: "70vh",
              maxWidth: "1000px",
              borderRadius: "2px",
              overflow: "hidden",
              background: images?.[lightboxIdx]
                ? undefined
                : FALLBACK_GRADIENTS[lightboxIdx % FALLBACK_GRADIENTS.length],
            }}
          >
            {images?.[lightboxIdx] && (
              <img
                src={images[lightboxIdx].asset.url}
                alt={`${propertyName} - ${lightboxIdx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
