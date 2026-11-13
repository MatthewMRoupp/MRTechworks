/* Open the existing native About details menu on desktop hover.
   Native click/tap and keyboard activation still work without JavaScript. */
(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.site-nav .nav-dropdown details').forEach((menu) => {
    menu.addEventListener('mouseenter', () => { menu.open = true; });
    menu.addEventListener('mouseleave', () => {
      if (!menu.contains(document.activeElement) || !document.activeElement.matches(':focus-visible')) menu.open = false;
    });
    menu.addEventListener('focusout', (event) => {
      if (!menu.contains(event.relatedTarget) && !menu.matches(':hover')) menu.open = false;
    });
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menu.open = false;
        menu.querySelector('summary')?.focus();
      }
    });
  });
})();

/* Common News nav and time-limited alert from the news/alert.json record. */
(() => {
  document.querySelectorAll(".site-nav ul").forEach((list) => {
    if (list.querySelector('a[href="/news/"]')) return;
    const articleLink = list.querySelector('a[href="/articles/"]');
    if (!articleLink) return;
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "/news/"; link.textContent = "Tech News";
    if (location.pathname.startsWith("/news/")) link.setAttribute("aria-current","page");
    li.append(link);
    list.insertBefore(li,articleLink.closest("li"));
  });
  const header=document.querySelector(".site-header");
  if (!header) return;
  fetch("/news/alert.json",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(a=>{
    if (!a || a.active!==true || !a.message || !a.expiresAt || !(Date.now()<Date.parse(a.expiresAt)))return;
    const bar=document.createElement("aside");bar.className="site-service-alert";bar.setAttribute("role","status");bar.setAttribute("aria-label","Technology service alert");
    const inner=document.createElement("div");inner.className="container site-service-alert-inner";
    const content=document.createElement("div");content.className="site-service-alert-copy";
    const heading=document.createElement("strong");heading.textContent=a.title||"Service alert";
    const message=document.createElement("span");message.textContent=a.message;
    content.append(heading,message);
    if (typeof a.url==="string" && a.url.startsWith("https://")){
      const more=document.createElement("div");const link=document.createElement("a");link.href=a.url;link.target="_blank";link.rel="noopener noreferrer";link.textContent="View source and current status";more.append(link);content.append(more);
    }
    if(a.observedAt&&!isNaN(Date.parse(a.observedAt))){const stamp=document.createElement("small");stamp.textContent="Source update: "+new Date(a.observedAt).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short",timeZone:"America/New_York"})+" ET";content.append(stamp);}
    const close=document.createElement("button");close.type="button";close.className="site-service-alert-close";close.textContent="Dismiss";close.setAttribute("aria-label","Dismiss alert");close.addEventListener("click",()=>bar.remove());
    inner.append(content,close);bar.append(inner);header.insertAdjacentElement("afterend",bar);
  }).catch(()=>{});
})();
