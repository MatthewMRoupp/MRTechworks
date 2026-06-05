/*
  MR Techworks Article Library Cards
  ----------------------------------
  Load after article-data.js on articles.html.

  Recommended HTML:
  <input type="search" id="articleSearch" class="article-search" placeholder="Search Wi-Fi, backups, scams...">
  <div id="articleGrid" class="article-grid"></div>
*/

const articles = window.MRTECHWORKS_ARTICLES || [];
const articleGrid =
  document.getElementById("articleGrid") ||
  document.getElementById("articlesGrid") ||
  document.getElementById("articleLibrary") ||
  document.querySelector(".article-grid");

const articleSearch = document.getElementById("articleSearch");

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function articleMatchesSearch(article, searchTerm) {
  if (!searchTerm) return true;

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

function renderArticleCards(searchTerm = "") {
  if (!articleGrid) {
    console.warn("MR Techworks: article grid element was not found.");
    return;
  }

  const filteredArticles = articles.filter(article => articleMatchesSearch(article, searchTerm));

  if (filteredArticles.length === 0) {
    articleGrid.innerHTML = `
      <article class="article-card article-card-empty">
        <p class="eyebrow">No Results</p>
        <h3>No matching articles found.</h3>
        <p>Try searching for Wi-Fi, backups, scams, computer, security, or support.</p>
      </article>
    `;
    return;
  }

  articleGrid.innerHTML = filteredArticles
    .map(article => {
      const topTags = (article.tags || []).slice(0, 4);

      return `
        <article class="article-card reveal">
          <img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.title)}" class="article-card-image" />

          <div class="article-card-content">
            <p class="eyebrow">${escapeHTML(article.category)}</p>
            <h3>${escapeHTML(article.title)}</h3>

            <div class="article-card-meta">
              <span>${escapeHTML(article.difficulty || "Beginner")}</span>
              <span>${escapeHTML(article.readTime || "Quick read")}</span>
            </div>

            <p>${escapeHTML(article.summary)}</p>

            <div class="article-tag-row">
              ${topTags.map(tag => `<span class="article-tag">${escapeHTML(tag)}</span>`).join("")}
            </div>

            <a class="text-link article-card-link" href="article.html?id=${encodeURIComponent(article.id)}">
              Read article
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

if (articleSearch) {
  articleSearch.addEventListener("input", event => {
    renderArticleCards(event.target.value.trim());
  });
}

renderArticleCards();
