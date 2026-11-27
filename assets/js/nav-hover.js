/* Prefer one clear Articles link. The Article Library includes tech, gaming, help and project stories; preserve old URLs for direct links and no-JS visitors. */
(() => {
  document.querySelectorAll('.site-nav > ul').forEach((list) => {
    list.querySelectorAll(':scope > li.nav-resources, :scope > li[data-resources-menu]').forEach(el => el.remove());
    const topLinks = () => Array.from(list.querySelectorAll(':scope > li > a'));
    let articleLink = topLinks().find(link => link.getAttribute('href') === '/articles/');
    if (!articleLink) {
      const item = document.createElement('li');
      articleLink = document.createElement('a');
      articleLink.href = '/articles/'; articleLink.textContent = 'Articles';
      item.appendChild(articleLink);
      const contact = topLinks().find(link => link.getAttribute('href') === '/contact/');
      const about = list.querySelector(':scope > li.nav-dropdown');
      list.insertBefore(item, about || (contact && contact.parentElement) || null);
    }
    if (/^\/(?:articles|news|gaming-news|projects)\//.test(location.pathname)) articleLink.setAttribute('aria-current','page');
    topLinks().forEach(link => {
      const href = link.getAttribute('href');
      if (['/projects/','/gaming-news/','/news/'].includes(href)) link.parentElement.remove();
    });
    // Keep Certifications under About, rather than removing this route.
    const aboutDetails = Array.from(list.querySelectorAll('.nav-dropdown details')).find(entry => entry.querySelector('.nav-dropdown-menu a[href="/about/"]'));
    if (aboutDetails) {
      const aboutMenu = aboutDetails.querySelector('.nav-dropdown-menu');
      let cert = aboutMenu.querySelector('a[href="/certifications/"]');
      if (!cert) {
        cert = document.createElement('a'); cert.href='/certifications/'; cert.textContent='Certifications & Training';
        const contact = aboutMenu.querySelector('a[href="/contact/"]');
        if (contact) aboutMenu.insertBefore(cert,contact); else aboutMenu.append(cert);
      }
      if (location.pathname.startsWith('/certifications/')) {cert.setAttribute('aria-current','page');aboutDetails.classList.add('nav-current');}
      list.querySelectorAll(':scope > li > a[href="/certifications/"]').forEach(link=>link.parentElement.remove());
    }
  });
})();

/* Compact mobile navigation: progressive enhancement keeps desktop and no-JS navigation intact. */
(() => {
  document.querySelectorAll('.site-header .header-inner').forEach((header) => {
    const nav = header.querySelector('.site-nav');
    if (!nav || header.querySelector('.mobile-menu-toggle')) return;
    if (!nav.id) nav.id = 'site-mobile-nav';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.innerHTML = '<span class="mobile-menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>';
    header.insertBefore(toggle, nav);
    const setOpen = (open) => {
      header.classList.toggle('mobile-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      if (!open) nav.querySelectorAll('details[open]').forEach((details) => { details.open = false; });
    };
    toggle.addEventListener('click', () => setOpen(!header.classList.contains('mobile-menu-open')));
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    header.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && header.classList.contains('mobile-menu-open')) {
        setOpen(false); toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (header.classList.contains('mobile-menu-open') && !header.contains(event.target)) setOpen(false);
    });
    const desktop = window.matchMedia('(min-width: 821px)');
    const reset = () => { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', reset);
    else desktop.addListener(reset);
    header.classList.add('mobile-menu-ready');
  });
})();

/* Keyboard dismissal works on all devices; hover behavior is desktop-only. */
(() => {
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.querySelectorAll('.site-nav .nav-dropdown details').forEach((menu) => {
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary')?.focus();
        event.preventDefault();
      }
    });
    if (!hasHover) return;
    menu.addEventListener('mouseenter', () => { menu.open = true; });
    menu.addEventListener('mouseleave', () => {
      if (!menu.contains(document.activeElement) || !document.activeElement.matches(':focus-visible')) menu.open = false;
    });
    menu.addEventListener('focusout', (event) => {
      if (!menu.contains(event.relatedTarget) && !menu.matches(':hover')) menu.open = false;
    });
  });
})();

/* Common News nav and time-limited alert from the news/alert.json record. */
(() => {
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

/* Load optional image credits only when approved asset-library images are present.
 * The existing live articles keep using their current images until upload is verified. */
(() => {
  if (!document.querySelector('article img[src^="/assets/images/article-library/"]')) return;
  const script = document.createElement("script");
  script.src = "/assets/js/asset-credit-lookup.js";
  script.defer = true;
  document.head.appendChild(script);
})();
