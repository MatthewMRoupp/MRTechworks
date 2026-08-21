/*
  MR Techworks Article Library
  ----------------------------
  Loads article data from article-data.js and displays searchable
  article cards on /articles/.

  Load this file AFTER:
  /assets/js/article-data.js
*/

const articles = window.MRTECHWORKS_ARTICLES || [];

const articleGrid =
  document.getElementById("articleResults") ||
  document.getElementById("articleGrid") ||
  document.getElementById("articlesGrid") ||
  document.getElementById("articleLibrary") ||
  document.querySelector(".article-grid");

const articleSearch = document.getElementById("articleSearch");
const articleCount = document.getElementById("articleCount");


/* ===== Safely display text inside generated HTML ===== */

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ===== Search matching ===== */

function articleMatchesSearch(article, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const searchableText = [
    article.title,
    article.category,
    article.summary,
    article.difficulty,
    article.readTime,
    ...(article.tags || []),
    ...(article.keyTakeaways || [])
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(searchTerm.toLowerCase());
}


/* ===== Update article count ===== */

function updateArticleCount(visibleCount, totalCount, searchTerm = "") {
  if (!articleCount) {
    return;
  }

  if (searchTerm) {
    articleCount.textContent =
      `${visibleCount} of ${totalCount} article${totalCount === 1 ? "" : "s"} shown`;
  } else {
    articleCount.textContent =
      `${totalCount} article${totalCount === 1 ? "" : "s"} available`;
  }
}


/* ===== Render article cards ===== */

function renderArticleCards(searchTerm = "") {
  if (!articleGrid) {
    console.warn("MR Techworks: article grid element was not found.");
    return;
  }

  const normalizedSearch = searchTerm.trim();

  const filteredArticles = articles.filter(article =>
    articleMatchesSearch(article, normalizedSearch)
  );

  updateArticleCount(
    filteredArticles.length,
    articles.length,
    normalizedSearch
  );


  /* No results */

  if (filteredArticles.length === 0) {
    articleGrid.innerHTML = `
      <article class="article-card article-card-empty">
        <div class="article-card-content">
          <p class="eyebrow">No Results</p>

          <h3>No matching articles found.</h3>

          <p class="text-muted">
            Try searching for Wi-Fi, backups, scams, computers,
            security, networking, or support.
          </p>
        </div>
      </article>
    `;

    return;
  }


  /* Article cards */

  articleGrid.innerHTML = filteredArticles
    .map(article => {
      const topTags = (article.tags || []).slice(0, 4);

      const articleURL =
        `/articles/read/?id=${encodeURIComponent(article.id)}`;

      return `
        <article class="article-card reveal">

          <img
            src="${escapeHTML(article.image)}"
            alt="${escapeHTML(article.imageAlt || article.title)}"
            class="article-card-image"
            loading="lazy"
          />

          <div class="article-card-content">

            <p class="eyebrow">
              ${escapeHTML(article.category)}
            </p>

            <h3>
              ${escapeHTML(article.title)}
            </h3>

            <div class="article-card-meta">
              <span>
                ${escapeHTML(article.difficulty || "Beginner")}
              </span>

              <span>
                ${escapeHTML(article.readTime || "Quick read")}
              </span>
            </div>

            <p class="text-muted">
              ${escapeHTML(article.summary)}
            </p>

            <div class="article-tag-row">
              ${topTags
                .map(
                  tag =>
                    `<span class="article-tag">${escapeHTML(tag)}</span>`
                )
                .join("")}
            </div>

            <a
              class="text-link article-card-link"
              href="${articleURL}"
            >
              Read article
            </a>

          </div>
        </article>
      `;
    })
    .join("");
}


/* ===== Search field ===== */

if (articleSearch) {
  articleSearch.addEventListener("input", event => {
    renderArticleCards(event.target.value);
  });
}


/* ===== Initial page load ===== */

renderArticleCards();
