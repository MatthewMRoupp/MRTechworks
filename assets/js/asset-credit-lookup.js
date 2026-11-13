/* MR Techworks article-media attribution.
 * Reads assets/data/image-credits.json when a page uses an asset-library image.
 * It does nothing for existing site images and never inserts a broken credit.
 */
(() => {
  "use strict";
  function attachCredits() {
    const images = [...document.querySelectorAll('article figure img, figure.editorial-illustrative-image img')]
      .filter(img => (img.getAttribute("src") || "").startsWith("/assets/images/article-library/"));
    if (!images.length) return;
    fetch("/assets/data/image-credits.json", { cache: "force-cache" })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (!data || !Array.isArray(data.entries)) return;
        const entries = new Map(data.entries.map(item => [item.path, item]));
        for (const image of images) {
          const item = entries.get(image.getAttribute("src"));
          const figure = image.closest("figure");
          if (!item || !figure || !item.creditLine) continue;
          let caption = figure.querySelector("figcaption");
          if (!caption) {
            caption = document.createElement("figcaption");
            figure.appendChild(caption);
          }
          if (caption.querySelector(".asset-media-credit") ||
              caption.textContent.includes(item.creditLine)) continue;
          const span = document.createElement("span");
          span.className = "asset-media-credit";
          span.textContent = (caption.textContent.trim() ? " · " : "") + item.creditLine;
          caption.appendChild(span);
          if (item.sourceUrl) {
            const link = document.createElement("a");
            link.href = item.sourceUrl;
            link.textContent = " Source";
            link.rel = "noopener noreferrer";
            link.target = "_blank";
            span.appendChild(link);
          }
        }
      })
      .catch(() => { /* Optional asset index not uploaded yet. */ });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachCredits, { once: true });
  } else {
    attachCredits();
  }
})();
