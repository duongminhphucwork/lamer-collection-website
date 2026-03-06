"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import MobileMenu from "./mobile-menu";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between ${
          scrolled ? "bg-ocean shadow-[0_2px_20px_rgba(0,0,0,0.15)]" : ""
        }`}
        style={{
          padding: "var(--space-4) var(--container-padding)",
          transition:
            "background-color var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out)",
        }}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-heading font-normal text-white uppercase"
          style={{
            fontSize: "var(--text-xl)",
            letterSpacing: "0.15em",
          }}
        >
          La Mer
        </Link>

        <div className="hidden lg:flex" style={{ gap: "var(--space-8)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`uppercase font-normal transition-colors ${
                pathname === link.href
                  ? "text-sand"
                  : "text-white hover:text-sand"
              }`}
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.1em",
                transitionDuration: "var(--duration-fast)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="flex lg:hidden flex-col"
          style={{ gap: "6px", padding: "var(--space-2)" }}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-7 h-[1.5px] bg-white transition-transform duration-[400ms] ease-smooth ${
              menuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-7 h-[1.5px] bg-white transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-[1.5px] bg-white transition-transform duration-[400ms] ease-smooth ${
              menuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </nav>

      <MobileMenu open={menuOpen} pathname={pathname} />
    </>
  );
}
