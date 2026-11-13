/* MR Techworks unified Article Library: quick search + optional advanced search.
   All filtering runs locally over published article metadata and guide content.
   No external service or personal data collection. */
(() => {
  "use strict";
  const guideSubjects = {
    "Networking": ["networking"],
    "Security": ["security"],
    "Data Protection": ["data","security"],
    "Buying Advice": ["hardware"],
    "PC Builds": ["hardware","gaming"],
    "Computer Care": ["support","hardware"],
    "Support": ["support"]
  };
  const subjectLabels = {
    ai: "AI & emerging technology",
    cloud: "Cloud & email",
    data: "Backups & data",
    gaming: "Gaming & consoles",
    hardware: "Computer hardware",
    industry: "Industry & business",
    networking: "Networking & internet",
    security: "Cybersecurity & privacy",
    software: "Software & operating systems",
    support: "Repair & troubleshooting"
  };
  const labels = {tech: "Tech News", gaming: "Gaming News", help: "Info & Help"};
  const base = (window.MRTECHWORKS_ARTICLES || []).map(item => ({
    title: item.title,
    summary: item.summary,
    group: "help",
    topic: item.category || "Support",
    subjects: item.subjects || guideSubjects[item.category] || ["support"],
    href: "/articles/" + encodeURIComponent(item.id) + "/",
    date: item.updated || "",
    tags: item.tags || [],
    takeaways: item.keyTakeaways || [],
    contentText: (item.content || []).map(section =>
      [section.heading || "", ...(section.body || [])].join(" ")
    ).join(" "),
    image: item.image ? "/" + item.image.replace(/^\//, "") : "/assets/images/articlesimage.webp",
    imageAlt: item.imageAlt || item.title,
    readTime: item.readTime || ""
  }));
  const extra = (window.MRTECHWORKS_LIBRARY_EXTRA || []).map(item => ({
    ...item,
    subjects: item.subjects || [],
    image: item.image || "/assets/images/articlesimage.webp",
    imageAlt: item.imageAlt || "Abstract technology illustration"
  }));
  const entries = [...base, ...extra].filter(item => item.title && item.href && labels[item.group]);

  const byId = id => document.getElementById(id);
  const grid = byId("articleResults");
  const search = byId("articleSearch");
  const count = byId("articleCount");
  const details = byId("libraryAdvanced");
  const status = byId("libraryAdvancedStatus");
  const subject = byId("subjectSelect");
  const topic = byId("topicSelect");
  const sort = byId("sortSelect");
  const required = byId("requiredWords");
  const any = byId("anyWords");
  const exact = byId("exactPhrase");
  const excluded = byId("excludedWords");
  const from = byId("dateFrom");
  const to = byId("dateTo");
  const dateError = byId("libraryDateError");
  const clearAdvanced = byId("clearAdvanced");
  const resetAll = byId("resetLibrary");
  const loadMore = byId("libraryMore");
  const buttons = [...document.querySelectorAll("[data-library-category]")];
  if (![grid,search,count,details,status,subject,topic,sort,required,any,exact,
    excluded,from,to,dateError,clearAdvanced,resetAll,loadMore].every(Boolean)) return;

  const categories = ["all","tech","gaming","help"];
  const query = new URLSearchParams(window.location.search);
  let group = categories.includes(query.get("category")) ? query.get("category") : "all";
  let visibleLimit = 12;
  const PAGE_SIZE = 12;

  const escapeHTML = value => String(value ?? "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const normalize = value => String(value ?? "").normalize("NFKD")
    .replace(/[\u0300-\u036f]/g,"").toLowerCase()
    .replace(/[-_/]+/g," ").replace(/[^a-z0-9\s]+/g," ")
    .replace(/\s+/g," ").trim();
  const terms = value => normalize(value).split(" ").filter(Boolean);
  const formatDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d || "")
    ? new Date(d+"T12:00:00").toLocaleDateString("en-US",
      {month:"short",day:"numeric",year:"numeric"}) : "";
  const validHref = url => typeof url === "string" &&
    /^\/(?:articles|gaming-news|news)\/[a-z0-9-]+\/$/.test(url);
  const validImage = url => typeof url === "string" && /^\/assets\/images\/[a-z0-9._-]+$/i.test(url);

  entries.forEach(item => {
    item.searchIndex = normalize([item.title,item.summary,item.topic,labels[item.group],
      ...(item.tags || []),...(item.takeaways || []),item.contentText || ""].join(" "));
  });

  function updateSubjects() {
    const prior = subject.value;
    const applicable = entries.filter(item => group === "all" || item.group === group);
    const available = [...new Set(applicable.flatMap(item => item.subjects || []))]
      .filter(value => subjectLabels[value])
      .sort((a,b) => subjectLabels[a].localeCompare(subjectLabels[b]));
    subject.replaceChildren(new Option("All subject areas","all"),
      ...available.map(value => new Option(subjectLabels[value],value)));
    subject.value = available.includes(prior) ? prior : "all";
    updateTopics();
  }
  function updateTopics() {
    const prior = topic.value;
    const area = subject.value;
    const available = [...new Set(entries.filter(item =>
      (group === "all" || item.group === group) &&
      (area === "all" || (item.subjects || []).includes(area)))
      .map(item => item.topic).filter(Boolean))].sort((a,b) => a.localeCompare(b));
    topic.replaceChildren(new Option("All topics","all"),
      ...available.map(value => new Option(value,value)));
    topic.value = available.includes(prior) ? prior : "all";
  }

  function updateAdvancedStatus() {
    const active = [required,any,exact,excluded,from,to].filter(input =>
      input.value.trim()).length +
      (subject.value !== "all" ? 1 : 0) +
      (topic.value !== "all" ? 1 : 0) +
      (sort.value !== "newest" ? 1 : 0);
    status.textContent = active + " active";
    status.hidden = active === 0;
  }

  function render() {
    updateAdvancedStatus();
    const invalidDates = Boolean(from.value && to.value && from.value > to.value);
    dateError.hidden = !invalidDates;
    from.setAttribute("aria-invalid", String(invalidDates));
    to.setAttribute("aria-invalid", String(invalidDates));
    if (invalidDates) {
      count.textContent = "Please correct the date range to see results.";
      grid.innerHTML = '<div class="library-empty"><h2>Invalid date range</h2>' +
        '<p>The start date must be before or the same as the end date.</p></div>';
      loadMore.hidden = true;
      return;
    }

    const quickTerms = terms(search.value);
    const allTerms = terms(required.value);
    const anyTerms = terms(any.value);
    const excludedTerms = terms(excluded.value);
    const phrase = normalize(exact.value);
    const selectedArea = subject.value;
    const selectedTopic = topic.value;
    const filtered = entries.filter(item => {
      const index = item.searchIndex;
      return (group === "all" || item.group === group) &&
        (selectedArea === "all" || (item.subjects || []).includes(selectedArea)) &&
        (selectedTopic === "all" || item.topic === selectedTopic) &&
        (!from.value || (item.date && item.date >= from.value)) &&
        (!to.value || (item.date && item.date <= to.value)) &&
        quickTerms.every(word => index.includes(word)) &&
        allTerms.every(word => index.includes(word)) &&
        (!anyTerms.length || anyTerms.some(word => index.includes(word))) &&
        (!phrase || index.includes(phrase)) &&
        excludedTerms.every(word => !index.includes(word));
    });
    filtered.sort((a,b) => sort.value === "title"
      ? a.title.localeCompare(b.title)
      : sort.value === "oldest"
        ? (a.date || "").localeCompare(b.date || "") || a.title.localeCompare(b.title)
        : (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
    const displayed = filtered.slice(0,visibleLimit);
    count.textContent = "Showing " + displayed.length + " of " + filtered.length +
      " matching articles (" + entries.length + " published)";
    loadMore.hidden = displayed.length >= filtered.length;
    loadMore.textContent = "Load " + Math.min(PAGE_SIZE,filtered.length-displayed.length) + " more articles";

    if (!filtered.length) {
      grid.innerHTML = '<div class="library-empty"><h2>No matching articles</h2>' +
        '<p>Try another keyword, a broader date range, or fewer advanced filters.</p></div>';
      return;
    }
    grid.innerHTML = displayed.map(item => {
      const href = validHref(item.href) ? item.href : "/articles/";
      const image = validImage(item.image) ? item.image : "/assets/images/articlesimage.webp";
      const stamp = formatDate(item.date);
      const dateLabel = stamp ? (item.group === "help" ? "Updated " : "Published ") + stamp : "";
      const meta = [dateLabel,item.readTime].filter(Boolean).join(" · ");
      return '<article class="article-card library-card">' +
        '<img class="article-card-image" loading="lazy" decoding="async" src="' +
          escapeHTML(image) + '" alt="' + escapeHTML(item.imageAlt || item.title) + '"/>' +
        '<div class="article-card-body">' +
        '<p class="eyebrow">' + escapeHTML(labels[item.group]) + ' · ' +
          escapeHTML(item.topic || "") + '</p>' +
        '<h2><a href="' + escapeHTML(href) + '">' + escapeHTML(item.title) + '</a></h2>' +
        '<p class="library-card-meta">' + escapeHTML(meta) + '</p>' +
        '<p class="text-muted">' + escapeHTML(item.summary || "") + '</p>' +
        '<a class="text-link" href="' + escapeHTML(href) + '">Read article</a>' +
        '</div></article>';
    }).join("");
  }

  function refresh() {
    visibleLimit = PAGE_SIZE;
    render();
  }

  function setGroup(next) {
    group = categories.includes(next) ? next : "all";
    buttons.forEach(button => {
      const active = button.dataset.libraryCategory === group;
      button.setAttribute("aria-pressed",String(active));
      button.classList.toggle("is-selected",active);
    });
    const newURL = new URL(window.location.href);
    if (group === "all") newURL.searchParams.delete("category");
    else newURL.searchParams.set("category",group);
    window.history.replaceState(null,"",newURL);
    updateSubjects();
    refresh();
  }

  function clearAdvancedFilters() {
    [required,any,exact,excluded,from,to].forEach(element => {element.value = "";});
    subject.value = "all";
    topic.value = "all";
    sort.value = "newest";
    updateSubjects();
    refresh();
  }

  const totals = {all:entries.length,tech:0,gaming:0,help:0};
  entries.forEach(item => {if (totals[item.group] !== undefined) totals[item.group]++;});
  const fields = {all:"libraryTotal",tech:"libraryTechCount",gaming:"libraryGamingCount",help:"libraryHelpCount"};
  Object.keys(fields).forEach(key => {
    const element = byId(fields[key]);
    if (element) element.textContent = String(totals[key]);
  });
  buttons.forEach(button => button.addEventListener("click",
    () => setGroup(button.dataset.libraryCategory)));
  [search,required,any,exact,excluded,from,to].forEach(input =>
    input.addEventListener("input",refresh));
  subject.addEventListener("change",() => {updateTopics();refresh();});
  topic.addEventListener("change",refresh);
  sort.addEventListener("change",refresh);
  clearAdvanced.addEventListener("click",clearAdvancedFilters);
  resetAll.addEventListener("click",() => {
    search.value = "";
    clearAdvancedFilters();
    details.open = false;
    setGroup("all");
  });
  loadMore.addEventListener("click",() => {visibleLimit += PAGE_SIZE;render();});
  setGroup(group);
})();
