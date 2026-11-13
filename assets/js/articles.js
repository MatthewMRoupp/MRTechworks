/* One searchable article library. 13 evergreen guides in article-data.js;
   standalone help and current news in library-data.js. */
(() => {
  "use strict";
  const base = (window.MRTECHWORKS_ARTICLES || []).map(item => ({
    title:item.title, summary:item.summary, group:"help", topic:item.category || "Support",
    href:"/articles/" + encodeURIComponent(item.id) + "/", date:item.updated || "",
    tags:item.tags || [], takeaways:item.keyTakeaways || [],
    image:item.image ? "/" + item.image.replace(/^\//,"") : "/assets/images/articlesimage.webp",
    imageAlt:item.imageAlt || item.title, readTime:item.readTime || ""
  }));
  const extra = (window.MRTECHWORKS_LIBRARY_EXTRA || []).map(item => ({
    ...item, image:item.image || "/assets/images/articlesimage.webp",
    imageAlt:item.imageAlt || "Abstract technology illustration"
  }));
  const entries = [...base, ...extra].filter(item => item.title && item.href && item.group);
  const labels = {tech:"Tech News",gaming:"Gaming News",help:"Info & Help"};
  const grid = document.getElementById("articleResults");
  const search = document.getElementById("articleSearch");
  const count = document.getElementById("articleCount");
  const topic = document.getElementById("topicSelect");
  const sort = document.getElementById("sortSelect");
  const buttons = [...document.querySelectorAll("[data-library-category]")];
  if (!grid || !search || !count || !topic || !sort) return;
  const categories = ["all","tech","gaming","help"];
  const params = new URLSearchParams(window.location.search);
  let group = categories.includes(params.get("category")) ? params.get("category") : "all";

  const escapeHTML = (v) => String(v == null ? "" : v)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const norm = (v) => String(v == null ? "" : v).toLowerCase().trim();
  const formatDate = (d) => d && d.length === 10
    ? new Date(d + "T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})
    : "";
  const validHref = (url) => typeof url === "string" && url.startsWith("/") && !url.includes("..") && !url.includes('"');

  function updateTopics() {
    const previous = topic.value;
    const available = [...new Set(entries.filter(item => group === "all" || item.group === group)
      .map(item => item.topic).filter(Boolean))].sort((a,b) => a.localeCompare(b));
    topic.replaceChildren(new Option("All topics","all"), ...available.map(v => new Option(v,v)));
    topic.value = available.includes(previous) ? previous : "all";
  }

  function render() {
    const phrase = norm(search.value);
    const selected = topic.value;
    const results = entries.filter(item =>
      (group === "all" || item.group === group) &&
      (selected === "all" || item.topic === selected) &&
      (!phrase || norm([item.title,item.summary,item.topic,labels[item.group],
        ...(item.tags || []),...(item.takeaways || [])].join(" ")).includes(phrase))
    );
    results.sort((a,b) => sort.value === "title"
      ? a.title.localeCompare(b.title)
      : sort.value === "oldest"
        ? (a.date || "").localeCompare(b.date || "") || a.title.localeCompare(b.title)
        : (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
    count.textContent = results.length + " of " + entries.length + " published articles shown";
    if (!results.length) {
      grid.innerHTML = '<div class="library-empty"><h2>No matching articles</h2><p>Try different search terms or choose All articles.</p></div>';
      return;
    }
    grid.innerHTML = results.map(item => {
      const href = validHref(item.href) ? item.href : "/articles/";
      const stamp = formatDate(item.date);
      const dateLabel = stamp ? (item.group === "help" ? "Updated " : "Published ") + stamp : "";
      const meta = [dateLabel,item.readTime].filter(Boolean).join(" · ");
      return '<article class="article-card library-card">' +
        '<img class="article-card-image" loading="lazy" decoding="async" src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.imageAlt || item.title) + '"/>' +
        '<div class="article-card-body">' +
        '<p class="eyebrow">' + escapeHTML(labels[item.group]) + ' · ' + escapeHTML(item.topic || "") + '</p>' +
        '<h2><a href="' + escapeHTML(href) + '">' + escapeHTML(item.title) + '</a></h2>' +
        '<p class="library-card-meta">' + escapeHTML(meta) + '</p>' +
        '<p class="text-muted">' + escapeHTML(item.summary || "") + '</p>' +
        '<a class="text-link" href="' + escapeHTML(href) + '">Read article</a>' +
        '</div></article>';
    }).join("");
  }

  function setGroup(next) {
    group = categories.includes(next) ? next : "all";
    buttons.forEach(btn => {
      const active = btn.dataset.libraryCategory === group;
      btn.setAttribute("aria-pressed", String(active));
      btn.classList.toggle("is-selected",active);
    });
    const newURL = new URL(window.location.href);
    if (group === "all") newURL.searchParams.delete("category");
    else newURL.searchParams.set("category",group);
    window.history.replaceState(null,"",newURL);
    updateTopics();
    render();
  }

  const totals = {all:entries.length,tech:0,gaming:0,help:0};
  entries.forEach(item => {if (Object.hasOwn(totals,item.group)) totals[item.group]++;});
  const fields = {all:"libraryTotal",tech:"libraryTechCount",gaming:"libraryGamingCount",help:"libraryHelpCount"};
  Object.keys(fields).forEach(key => {
    const element = document.getElementById(fields[key]);
    if (element) element.textContent = String(totals[key]);
  });
  buttons.forEach(btn => btn.addEventListener("click",() => setGroup(btn.dataset.libraryCategory)));
  search.addEventListener("input",render);
  topic.addEventListener("change",render);
  sort.addEventListener("change",render);
  setGroup(group);
})();
