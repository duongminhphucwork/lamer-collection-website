"use client";

import { useCallback } from "react";

/** Price steps: 0, 500k, 1tr, 1.5tr, 2tr, 3tr, 4tr, 5tr, 6tr, 8tr, 10tr+ */
export const PRICE_STEPS = [
  0, 500000, 1000000, 1500000, 2000000, 3000000, 4000000, 5000000, 6000000,
  8000000, 10000000,
];

function formatPriceLabel(val: number): string {
  if (val === 0) return "0đ";
  if (val >= 10000000) return "10tr+";
  if (val >= 1000000) return val / 1000000 + "tr";
  return val / 1000 + "k";
}

interface CollectionFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  capacity: number;
  onCapacityChange: (v: number) => void;
  priceMinIdx: number;
  priceMaxIdx: number;
  onPriceMinChange: (v: number) => void;
  onPriceMaxChange: (v: number) => void;
}

export default function CollectionFilters({
  search,
  onSearchChange,
  capacity,
  onCapacityChange,
  priceMinIdx,
  priceMaxIdx,
  onPriceMinChange,
  onPriceMaxChange,
}: CollectionFiltersProps) {
  const incCapacity = useCallback(() => {
    onCapacityChange(capacity === 0 ? 1 : Math.min(capacity + 1, 10));
  }, [capacity, onCapacityChange]);

  const decCapacity = useCallback(() => {
    onCapacityChange(capacity <= 1 ? 0 : capacity - 1);
  }, [capacity, onCapacityChange]);

  const fillLeft = (priceMinIdx / 10) * 100;
  const fillWidth = ((priceMaxIdx - priceMinIdx) / 10) * 100;

  return (
    <div
      style={{
        padding: "var(--space-8) var(--container-padding) 0",
        maxWidth: "var(--container-max)",
        marginInline: "auto",
      }}
    >
      {/* Search */}
      <div
        style={{
          position: "relative",
          maxWidth: "340px",
          margin: "0 auto var(--space-8)",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-text-light)",
            pointerEvents: "none",
            lineHeight: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="6.5" cy="6.5" r="5.5" />
            <line x1="10.5" y1="10.5" x2="15" y2="15" />
          </svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm theo tên..."
          aria-label="Tìm kiếm chỗ nghỉ"
          className="font-heading"
          style={{
            width: "100%",
            padding: "var(--space-2) 0",
            paddingLeft: "calc(var(--space-6) + 4px)",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            border: "none",
            borderBottom: "1px solid rgba(13,43,62,0.2)",
            background: "transparent",
            color: "var(--color-ocean)",
            outline: "none",
            letterSpacing: "0.02em",
          }}
        />
      </div>

      {/* Controls row */}
      <div
        className="filter-controls-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-8)",
          marginBottom: "var(--space-6)",
          paddingBottom: "var(--space-6)",
          borderBottom: "1px solid rgba(13,43,62,0.08)",
        }}
      >
        {/* Capacity stepper */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-ocean)",
              fontWeight: 500,
            }}
          >
            Số khách
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            <button
              onClick={decCapacity}
              disabled={capacity <= 0}
              aria-label="Giảm số khách"
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(13,43,62,0.2)",
                background: "transparent",
                color: "var(--color-ocean)",
                cursor: capacity <= 0 ? "default" : "pointer",
                opacity: capacity <= 0 ? 0.25 : 1,
                padding: 0,
              }}
            >
              <svg width="12" height="2" viewBox="0 0 12 2">
                <line
                  x1="0"
                  y1="1"
                  x2="12"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <span
              className="font-heading"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 500,
                color: "var(--color-ocean)",
                minWidth: 48,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {capacity === 0 ? "—" : capacity}
            </span>
            <button
              onClick={incCapacity}
              disabled={capacity >= 10}
              aria-label="Tăng số khách"
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(13,43,62,0.2)",
                background: "transparent",
                color: "var(--color-ocean)",
                cursor: capacity >= 10 ? "default" : "pointer",
                opacity: capacity >= 10 ? 0.25 : 1,
                padding: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="6"
                  x2="12"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <span
          className="filter-divider"
          style={{
            width: 1,
            height: 40,
            background: "rgba(13,43,62,0.1)",
            flexShrink: 0,
          }}
        />

        {/* Price range */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-ocean)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Mức giá
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            <span
              className="font-heading"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-ocean)",
                fontWeight: 500,
                minWidth: 32,
                whiteSpace: "nowrap",
              }}
            >
              {formatPriceLabel(PRICE_STEPS[priceMinIdx])}
            </span>
            <div
              style={{
                position: "relative",
                width: 180,
                height: 36,
                display: "flex",
                alignItems: "center",
              }}
              className="price-track-wrap"
            >
              {/* Background track */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "rgba(13,43,62,0.1)",
                  transform: "translateY(-50%)",
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              />
              {/* Fill */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${fillLeft}%`,
                  width: `${fillWidth}%`,
                  height: 3,
                  background: "var(--color-sand)",
                  transform: "translateY(-50%)",
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              />
              {/* Min slider */}
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={priceMinIdx}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v <= priceMaxIdx) onPriceMinChange(v);
                }}
                aria-label="Giá tối thiểu"
                className="price-range-input"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  WebkitAppearance: "none",
                  appearance: "none" as const,
                  background: "transparent",
                  pointerEvents: "none",
                  margin: 0,
                  padding: 0,
                }}
              />
              {/* Max slider */}
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={priceMaxIdx}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v >= priceMinIdx) onPriceMaxChange(v);
                }}
                aria-label="Giá tối đa"
                className="price-range-input"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  WebkitAppearance: "none",
                  appearance: "none" as const,
                  background: "transparent",
                  pointerEvents: "none",
                  margin: 0,
                  padding: 0,
                }}
              />
            </div>
            <span
              className="font-heading"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-ocean)",
                fontWeight: 500,
                minWidth: 32,
                whiteSpace: "nowrap",
              }}
            >
              {formatPriceLabel(PRICE_STEPS[priceMaxIdx])}
            </span>
          </div>
        </div>
      </div>

      {/* Range slider styles (CSS-in-JS for thumb) */}
      <style>{`
        .price-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid var(--color-sand);
          cursor: pointer;
          pointer-events: all;
        }
        .price-range-input::-webkit-slider-thumb:hover {
          border-color: var(--color-gold, var(--color-sand));
        }
        .price-range-input::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid var(--color-sand);
          cursor: pointer;
          pointer-events: all;
        }
        .price-range-input::-webkit-slider-runnable-track {
          background: transparent;
        }
        .price-range-input::-moz-range-track {
          background: transparent;
        }
        @media (max-width: 767px) {
          .filter-controls-row {
            flex-direction: column !important;
            gap: var(--space-6) !important;
          }
          .filter-divider {
            width: 60px !important;
            height: 1px !important;
          }
          .price-track-wrap {
            width: 140px !important;
          }
        }
      `}</style>
    </div>
  );
}
