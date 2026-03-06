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
        className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between transition-all duration-[400ms] ease-smooth container-padding py-4 ${
          scrolled ? "bg-ocean shadow-[0_2px_20px_rgba(0,0,0,0.15)]" : ""
        }`}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-heading text-fluid-xl font-normal text-white tracking-[0.15em] uppercase"
        >
          La Mer
        </Link>

        <div className="hidden lg:flex gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-fluid-xs tracking-[0.1em] uppercase transition-colors duration-200 font-normal ${
                pathname === link.href
                  ? "text-sand"
                  : "text-white hover:text-sand"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="flex lg:hidden flex-col gap-[6px] p-2"
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
