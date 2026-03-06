/**
 * Navigation - scroll behavior and mobile menu toggle
 */
(function () {
  "use strict";

  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".nav__hamburger");
  const overlay = document.querySelector(".nav__overlay");
  const overlayLinks = document.querySelectorAll(".nav__overlay-link");

  if (!nav) return;

  // Scroll listener: add .scrolled after 100px
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 100) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (hamburger && overlay) {
    hamburger.addEventListener("click", function () {
      const isActive = hamburger.classList.toggle("is-active");
      overlay.classList.toggle("is-open", isActive);
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    // Close overlay on link click
    overlayLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("is-active");
        overlay.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        hamburger.classList.remove("is-active");
        overlay.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }
})();
