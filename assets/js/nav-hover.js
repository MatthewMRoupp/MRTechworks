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
