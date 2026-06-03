const articleSearch = document.getElementById("articleSearch");
const articleResults = document.getElementById("articleResults");
const articleCount = document.getElementById("articleCount");

/* 
============================================================
Article Cards 
============================================================
Article cards are built from this list.
The id connects each card to the full article in article-reader.js.
Tags help the search box find matching articles.
*/

const articles = [
  {
    id: "home-wifi-basics",
    title: "Home Wi-Fi Basics",
    category: "Networking",
    summary: "A simple guide to routers, mesh systems, Ethernet, and why Wi-Fi can feel unreliable.",
    image: "assets/images/articlesimage.png",
    tags: ["wifi", "router", "mesh", "ethernet", "networking"]
  },
  {
    id: "choosing-a-computer",
    title: "How to Choose the Right Computer",
    category: "Buying Advice",
    summary: "A beginner-friendly guide to picking a computer based on what someone actually needs.",
    image: "assets/images/servicesimage.png",
    tags: ["computer", "laptop", "desktop", "buying", "specs"]
  },
  {
    id: "pc-build-vs-prebuilt",
    title: "Custom PC vs. Prebuilt PC",
    category: "PC Builds",
    summary: "A simple comparison of building a computer yourself versus buying one already assembled.",
    image: "assets/images/projectsimage.png",
    tags: ["pc", "custom build", "prebuilt", "gaming", "hardware"]
  }
];

function displayArticles(articleList) {
  articleResults.innerHTML = "";

  if (articleList.length === 0) {
    articleResults.innerHTML = `
      <article class="card">
        <h2>No articles found</h2>
        <p class="text-muted">
          Try searching for something else, like Wi-Fi, computer, router, PC, or troubleshooting.
        </p>
      </article>
    `;

    articleCount.textContent = "No articles found.";
    return;
  }

  articleList.forEach(article => {
    const card = document.createElement("article");
    card.className = "article-card reveal";

    card.innerHTML = `
      <a href="article.html?id=${article.id}" class="article-card-link">
        <img src="${article.image}" alt="${article.title}" class="article-card-image" />

        <div class="article-card-body">
          <p class="preview-kicker">${article.category}</p>
          <h2>${article.title}</h2>
          <p class="text-muted">${article.summary}</p>
          <span class="text-link">Read article</span>
        </div>
      </a>
    `;

    articleResults.appendChild(card);
  });

  articleCount.textContent = `${articleList.length} article${articleList.length === 1 ? "" : "s"} found.`;
}

function searchArticles() {
  const searchTerm = articleSearch.value.toLowerCase().trim();

  const filteredArticles = articles.filter(article => {
    const searchableText = `
      ${article.title}
      ${article.category}
      ${article.summary}
      ${article.tags.join(" ")}
    `.toLowerCase();

    return searchableText.includes(searchTerm);
  });

  displayArticles(filteredArticles);
}

articleSearch.addEventListener("input", searchArticles);

displayArticles(articles);
