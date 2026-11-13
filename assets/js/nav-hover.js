/* Consolidate site navigation without editing individual page headers. */
(() => {
  document.querySelectorAll('.site-nav > ul').forEach((list) => {
    if (list.querySelector('[data-resources-menu]')) return;
    const items = [
      {href:'/news/',label:'Tech News'},
      {href:'/articles/',label:'Articles'},
      {href:'/projects/',label:'Projects'}
    ];
    const li=document.createElement('li');
    li.className='nav-dropdown nav-resources';
    li.dataset.resourcesMenu='true';
    const details=document.createElement('details');
    const summary=document.createElement('summary');
    summary.append(document.createTextNode('Resources '));
    const chevron=document.createElement('span');
    chevron.className='nav-chevron';chevron.setAttribute('aria-hidden','true');
    summary.append(chevron);
    const menu=document.createElement('div');
    menu.className='nav-dropdown-menu';
    items.forEach(({href,label})=>{
      const link=document.createElement('a');link.href=href;link.textContent=label;
      if(location.pathname.startsWith(href)) {link.setAttribute('aria-current','page');li.classList.add('nav-current');}
      menu.append(link);
      list.querySelectorAll('li > a').forEach(existing=>{
        if(existing.getAttribute('href')===href) existing.closest('li').remove();
      });
    });
    // Certifications is part of About, not the general Resources menu.
    const aboutDetails = Array.from(list.querySelectorAll('.nav-dropdown details')).find(
      (entry) => entry.querySelector('.nav-dropdown-menu a[href="/about/"]')
    );
    if (aboutDetails) {
      const aboutMenu = aboutDetails.querySelector('.nav-dropdown-menu');
      let certificateLink = aboutMenu.querySelector('a[href="/certifications/"]');
      if (!certificateLink) {
        certificateLink = document.createElement('a');
        certificateLink.href = '/certifications/';
        certificateLink.textContent = 'Certifications & Training';
        const contactLink = aboutMenu.querySelector('a[href="/contact/"]');
        if (contactLink) aboutMenu.insertBefore(certificateLink, contactLink);
        else aboutMenu.append(certificateLink);
      }
      if (location.pathname.startsWith('/certifications/')) {
        certificateLink.setAttribute('aria-current', 'page');
        aboutDetails.classList.add('nav-current');
      }
      list.querySelectorAll(':scope > li > a[href="/certifications/"]').forEach(
        (link) => link.closest('li').remove()
      );
    }
    details.append(summary,menu);li.append(details);
    const about=list.querySelector('.nav-dropdown');
    if(about)list.insertBefore(li,about);else list.append(li);
  });
})();

/* Desktop hover support; native details remains keyboard/touch accessible. */
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
      if (event.key === 'Escape') { menu.open = false; menu.querySelector('summary')?.focus(); }
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
