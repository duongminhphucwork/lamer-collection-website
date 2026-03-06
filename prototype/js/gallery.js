/**
 * Gallery - filter and lightbox functionality
 */
(function () {
  "use strict";

  // Filter
  var pills = document.querySelectorAll(".filter-nav__pill");
  var items = document.querySelectorAll(".gallery__item");

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      pills.forEach(function (p) {
        p.classList.remove("is-active");
      });
      pill.classList.add("is-active");

      var filter = pill.getAttribute("data-filter");
      items.forEach(function (item) {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.classList.remove("is-hidden");
        } else {
          item.classList.add("is-hidden");
        }
      });
    });
  });

  // Lightbox
  var lightbox = document.getElementById("lightbox");
  var lightboxContent = document.getElementById("lightbox-content");
  var closeBtn = document.querySelector(".lightbox__close");

  if (!lightbox || !lightboxContent) return;

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      var bg = item.getAttribute("style");
      lightboxContent.setAttribute("style", bg);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
