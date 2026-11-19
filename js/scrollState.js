// adds is-scrolling on <html> while scrolling, so the CSS can pause the looping animations
// they continue after, so nothing jumps
export function initScrollState() {
  const root = document.documentElement;
  let timer = 0;

  // stop the hero and skills loops when off screen, start again when back
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
