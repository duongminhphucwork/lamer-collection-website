/**
 * Scroll Animations - IntersectionObserver for reveal elements
 */
(function () {
  "use strict";

  var revealSelectors = ".reveal, .reveal-left, .reveal-right";
  var elements = document.querySelectorAll(revealSelectors);

  if (!elements.length) return;

  // Check for reduced motion preference
  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) {
    elements.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-delay") || "0", 10);

          if (delay > 0) {
            setTimeout(function () {
              el.classList.add("is-visible");
            }, delay);
          } else {
            el.classList.add("is-visible");
          }

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
