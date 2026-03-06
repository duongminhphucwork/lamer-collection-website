"use client";

import { useState } from "react";

interface ImageCardProps {
  gradient: string;
  image?: string | null;
  category: string;
  title: string;
  description: string;
  details?: { guests: number; area: string };
  featured?: boolean;
  className?: string;
}

export default function ImageCard({
  gradient,
  image,
  category,
  title,
  description,
  details,
  featured,
  className = "",
}: ImageCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "2px",
        height: featured ? "100%" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image ?? undefined}
        alt={title}
        style={{
          width: "100%",
          aspectRatio: featured ? "3 / 5" : "4 / 3",
          height: featured ? "100%" : undefined,
          objectFit: "cover",
          background: gradient,
          transition: "transform var(--duration-slow) var(--ease-out)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "var(--space-6)",
          background:
            "linear-gradient(to top, rgba(13,43,62,0.7), transparent 60%)",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-sand)",
            marginBottom: "var(--space-2)",
          }}
        >
          {category}
        </span>
        <h3
          className="font-heading"
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-white)",
            fontWeight: 500,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.8)",
            marginTop: "var(--space-2)",
          }}
        >
          {description}
        </p>
        {details && (
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              marginTop: "var(--space-3)",
              fontSize: "var(--text-xs)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <span>{details.guests} khách</span>
            <span>{details.area}</span>
          </div>
        )}
      </div>
    </div>
  );
}
