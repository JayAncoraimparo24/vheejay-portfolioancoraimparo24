/**
 * Adds `is-scrolling` to <html> while the page is scrolling, and removes it a moment after.
 * The CSS uses it to pause the looping animations during scroll so scrolling stays smooth.
 * (They continue from where they stopped, so nothing jumps.)
 */
export function initScrollState() {
  const root = document.documentElement;
  let timer = 0;

  // The looping animations in the hero and the skills strip stop while off screen
  // (nobody can see them) and start again when they come back.
  if ('IntersectionObserver' in window) {
    const watcher = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => target.toggleAttribute('data-offscreen', !isIntersecting));
    });
    document.querySelectorAll('.hero, .marquee').forEach((section) => watcher.observe(section));
  }

  window.addEventListener(
    'scroll',
    () => {
      root.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = setTimeout(() => root.classList.remove('is-scrolling'), 160);
    },
    { passive: true },
  );
}
