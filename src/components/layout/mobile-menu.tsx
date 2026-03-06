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
      className={`fixed inset-0 flex flex-col items-center justify-center gap-8 z-[99] transition-opacity duration-[400ms] ease-smooth ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "var(--color-overlay-dark)" }}
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-heading text-fluid-xl tracking-[0.1em] transition-colors duration-200 ${
            pathname === link.href ? "text-sand" : "text-white hover:text-sand"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
