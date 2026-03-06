"use client";

import { useRef, CSSProperties } from "react";
import { useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  style,
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -50px 0px",
  });

  const transform =
    direction === "left"
      ? "translateX(-40px)"
      : direction === "right"
        ? "translateX(40px)"
        : "translateY(30px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : transform,
        transition: `opacity var(--duration-slow) var(--ease-out) ${delay}s, transform var(--duration-slow) var(--ease-out) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
