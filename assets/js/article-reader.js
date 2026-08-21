/*
  MR Techworks Article Reader
  ---------------------------
  Loads an article from article-data.js based on the ?id=
  parameter in the URL.

  Example:
  /articles/read/?id=home-wifi-basics

  Load this file AFTER:
  /assets/js/article-data.js
*/

const articleReader = document.getElementById("articleReader");
const articles = window.MRTECHWORKS_ARTICLES || [];


/* ===== Safely display text inside generated HTML ===== */

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ===== Metadata helpers ===== */

function setMetaTag(selector, attribute, value) {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");

    if (selector.includes("property=")) {
      const propertyName = selector.match(/property="([^"]+)"/)?.[1];

      if (propertyName) {
        element.setAttribute("property", propertyName);
      }
    } else if (selector.includes("name=")) {
      const name = selector.match(/name="([^"]+)"/)?.[1];

      if (name) {
        element.setAttribute("name", name);
      }
    }

    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
}


function setCanonicalURL(url) {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}


function updateArticleMetadata(article) {
  const articleURL =
    `https://mrtechworks.com/articles/read/?id=${encodeURIComponent(article.id)}`;

  const description =
    article.summary ||
    "Read practical technology articles and guides from MR Techworks.";

  const imageURL = article.image
    ? new URL(article.image, "https://mrtechworks.com").href
    : "https://mrtechworks.com/assets/images/articlesimage.png";

  document.title = `${article.title} | MR Techworks`;

  setMetaTag(
    'meta[name="description"]',
    "content",
    description
  );

  setCanonicalURL(articleURL);

  setMetaTag(
    'meta[property="og:type"]',
    "content",
    "article"
  );

  setMetaTag(
    'meta[property="og:title"]',
    "content",
    `${article.title} | MR Techworks`
  );

  setMetaTag(
    'meta[property="og:description"]',
    "content",
    description
  );

  setMetaTag(
    'meta[property="og:url"]',
    "content",
    articleURL
  );

  setMetaTag(
    'meta[property="og:site_name"]',
    "content",
    "MR Techworks"
  );

  setMetaTag(
    'meta[property="og:image"]',
    "content",
    imageURL
  );

  setMetaTag(
    'meta[name="twitter:card"]',
    "content",
    "summary_large_image"
  );

  setMetaTag(
    'meta[name="twitter:title"]',
    "content",
    `${article.title} | MR Techworks`
  );

  setMetaTag(
    'meta[name="twitter:description"]',
    "content",
    description
  );

  setMetaTag(
    'meta[name="twitter:image"]',
    "content",
    imageURL
  );
}


/* ===== Paragraph rendering ===== */

function renderParagraphs(body) {
  if (!body) {
    return "";
  }

  const paragraphs = Array.isArray(body)
    ? body
    : [body];

  return paragraphs
    .map(paragraph => `<p>${escapeHTML(paragraph)}</p>`)
    .join("");
}


/* ===== List rendering ===== */

function renderList(items, className = "article-list") {
  if (!items || items.length === 0) {
    return "";
  }

  return `
    <ul class="${className}">
      ${items
        .map(item => `<li>${escapeHTML(item)}</li>`)
        .join("")}
    </ul>
  `;
}


/* ===== Main article sections ===== */

function renderArticleSections(content) {
  if (!content || content.length === 0) {
    return "";
  }

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


/* ===== Key takeaways ===== */

function renderKeyTakeaways(article) {
  if (!article.keyTakeaways || article.keyTakeaways.length === 0) {
    return "";
  }

  return `
    <aside class="article-callout">
      <h2>Key Takeaways</h2>

      ${renderList(
        article.keyTakeaways,
        "article-check-list"
      )}
    </aside>
  `;
}


/* ===== Checklist ===== */

function renderChecklist(article) {
  if (!article.checklist || article.checklist.length === 0) {
    return "";
  }

  return `
    <section class="article-checklist-card">
      <h2>
        ${escapeHTML(
          article.checklistTitle || "Practical Checklist"
        )}
      </h2>

      ${renderList(
        article.checklist,
        "article-check-list"
      )}
    </section>
  `;
}


/* ===== References ===== */

function renderReferences(references) {
  if (!references || references.length === 0) {
    return "";
  }

  return `
    <section class="article-references">
      <h2>References</h2>

      <p>
        These sources were used to support the article and give
        readers a place to verify information or learn more.
      </p>

      <ul>
        ${references
          .map(reference => {
            return `
              <li>
                <a
                  href="${escapeHTML(reference.url)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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


/* ===== Article tags ===== */

function renderTags(tags) {
  if (!tags || tags.length === 0) {
    return "";
  }

  return `
    <div
      class="article-tag-row"
      aria-label="Article tags"
    >
      ${tags
        .map(
          tag =>
            `<span class="article-tag">${escapeHTML(tag)}</span>`
        )
        .join("")}
    </div>
  `;
}


/* ===== Article not found ===== */

function renderArticleNotFound() {
  document.title = "Article Not Found | MR Techworks";

  setMetaTag(
    'meta[name="description"]',
    "content",
    "The requested MR Techworks article could not be found."
  );

  setCanonicalURL(
    "https://mrtechworks.com/articles/"
  );

  articleReader.innerHTML = `
    <article class="article-layout">
      <p class="eyebrow">Article Not Found</p>

      <h1>
        Sorry, this article could not be found.
      </h1>

      <p class="lead">
        The article may have moved, or the link may be incorrect.
      </p>

      <p class="article-back-link">
        <a class="text-link" href="/articles/">
          Back to Articles
        </a>
      </p>
    </article>
  `;

  articleReader.setAttribute("aria-busy", "false");
}


/* ===== Render selected article ===== */

function renderArticle(article) {
  updateArticleMetadata(article);

  articleReader.innerHTML = `
    <article class="article-layout">

      <p class="eyebrow">
        ${escapeHTML(article.category)}
      </p>

      <h1>
        ${escapeHTML(article.title)}
      </h1>

      <div class="article-meta-row">
        <span>
          ${escapeHTML(article.difficulty || "Beginner")}
        </span>

        <span>
          ${escapeHTML(article.readTime || "Quick read")}
        </span>

        ${
          article.updated
            ? `<span>Updated ${escapeHTML(article.updated)}</span>`
            : ""
        }
      </div>

      <p class="lead">
        ${escapeHTML(article.summary)}
      </p>

      ${renderTags(article.tags)}

      ${
        article.image
          ? `
            <img
              src="${escapeHTML(article.image)}"
              alt="${escapeHTML(
                article.imageAlt || article.title
              )}"
              class="article-hero-image"
            />
          `
          : ""
      }

      ${renderKeyTakeaways(article)}

      <div class="article-body">
        ${renderArticleSections(article.content || [])}
      </div>

      ${renderChecklist(article)}

      ${renderReferences(article.references)}

      <p class="article-back-link">
        <a class="text-link" href="/articles/">
          Back to Articles
        </a>
      </p>

    </article>
  `;

  articleReader.setAttribute("aria-busy", "false");
}


/* ===== Find requested article ===== */

const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

const article = articles.find(
  item => item.id === articleId
);


/* ===== Start reader ===== */

if (!articleReader) {
  console.warn(
    "MR Techworks: articleReader element was not found."
  );
} else if (!article) {
  renderArticleNotFound();
} else {
  renderArticle(article);
}
