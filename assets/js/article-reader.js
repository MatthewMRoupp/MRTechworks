/*
  MR Techworks Article Reader
  ---------------------------
  Load after article-data.js on article.html.

  Required HTML:
  <main id="articleReader"></main>
*/

const articleReader = document.getElementById("articleReader");
const articles = window.MRTECHWORKS_ARTICLES || [];

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderParagraphs(body) {
  if (!body) return "";

  const paragraphs = Array.isArray(body) ? body : [body];

  return paragraphs
    .map(paragraph => `<p>${escapeHTML(paragraph)}</p>`)
    .join("");
}

function renderList(items, className = "article-list") {
  if (!items || items.length === 0) return "";

  return `
    <ul class="${className}">
      ${items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
    </ul>
  `;
}

function renderArticleSections(content) {
  return content
    .map(section => {
      return `
        <section class="article-section">
          <h2>${escapeHTML(section.heading)}</h2>
          ${renderParagraphs(section.body)}
          ${renderList(section.bullets)}
        </section>
      `;
    })
    .join("");
}

function renderKeyTakeaways(article) {
  if (!article.keyTakeaways || article.keyTakeaways.length === 0) return "";

  return `
    <aside class="article-callout">
      <h2>Key takeaways</h2>
      ${renderList(article.keyTakeaways, "article-check-list")}
    </aside>
  `;
}

function renderChecklist(article) {
  if (!article.checklist || article.checklist.length === 0) return "";

  return `
    <section class="article-checklist-card">
      <h2>${escapeHTML(article.checklistTitle || "Practical checklist")}</h2>
      ${renderList(article.checklist, "article-check-list")}
    </section>
  `;
}

function renderReferences(references) {
  if (!references || references.length === 0) return "";

  return `
    <section class="article-references">
      <h2>References</h2>
      <p>
        These sources were used to support the article and give readers a place to verify or learn more.
      </p>
      <ul>
        ${references
          .map(reference => {
            return `
              <li>
                <a href="${escapeHTML(reference.url)}" target="_blank" rel="noopener noreferrer">
                  ${escapeHTML(reference.label)}
                </a>
              </li>
            `;
          })
          .join("")}
      </ul>
    </section>
  `;
}

function renderTags(tags) {
  if (!tags || tags.length === 0) return "";

  return `
    <div class="article-tag-row" aria-label="Article tags">
      ${tags.map(tag => `<span class="article-tag">${escapeHTML(tag)}</span>`).join("")}
    </div>
  `;
}

function renderArticleNotFound() {
  articleReader.innerHTML = `
    <p class="eyebrow">Article Not Found</p>
    <h1>Sorry, this article could not be found.</h1>
    <p class="lead">
      The article may have moved, or the link may be incorrect.
    </p>
    <p>
      <a class="text-link" href="articles.html">Back to articles</a>
    </p>
  `;
}

function renderArticle(article) {
  document.title = `${article.title} | MR Techworks`;

  articleReader.innerHTML = `
    <article class="article-layout">
      <p class="eyebrow">${escapeHTML(article.category)}</p>

      <h1>${escapeHTML(article.title)}</h1>

      <div class="article-meta-row">
        <span>${escapeHTML(article.difficulty || "Beginner")}</span>
        <span>${escapeHTML(article.readTime || "Quick read")}</span>
        <span>Updated ${escapeHTML(article.updated || "")}</span>
      </div>

      <p class="lead">${escapeHTML(article.summary)}</p>

      ${renderTags(article.tags)}

      <img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.title)}" class="article-hero-image" />

      ${renderKeyTakeaways(article)}

      <div class="article-body">
        ${renderArticleSections(article.content || [])}
      </div>

      ${renderChecklist(article)}

      ${renderReferences(article.references)}

      <p class="article-back-link">
        <a class="text-link" href="articles.html">Back to articles</a>
      </p>
    </article>
  `;
}

const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");
const article = articles.find(item => item.id === articleId);

if (!articleReader) {
  console.warn("MR Techworks: articleReader element was not found.");
} else if (!article) {
  renderArticleNotFound();
} else {
  renderArticle(article);
}
