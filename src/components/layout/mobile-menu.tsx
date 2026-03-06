"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  pathname: string;
}

export default function MobileMenu({ open, pathname }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-[99] ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        backgroundColor: "var(--color-overlay-dark)",
        gap: "var(--space-8)",
        transition: "opacity var(--duration-normal) var(--ease-out)",
      }}
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-heading transition-colors ${
            pathname === link.href ? "text-sand" : "text-white hover:text-sand"
          }`}
          style={{
            fontSize: "var(--text-xl)",
            letterSpacing: "0.1em",
            transitionDuration: "var(--duration-fast)",
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
