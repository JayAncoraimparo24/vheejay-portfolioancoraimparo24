const HOLD_MS = 700; // how long the finished screen stays
const FALLBACK_MS = 3700; // only if the animations can't be read: go away this long after loading started

// take the loading screen away when the page is built (end of main.js)
// it waits for its own animations to finish, then holds a bit
// not a fixed time from the start, because the animations only start when the styles arrive
// and on slow internet that would cut the words
export function finishSplash() {
  const root = document.documentElement;
  const splash = document.getElementById('splash');
  const hurry = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!splash || root.classList.contains('no-splash') || hurry) {
    root.classList.remove('is-loading');
    splash?.remove();
    return;
  }

  function lift() {
    splash.classList.add('is-done');
    root.classList.remove('is-loading');
    splash.addEventListener('animationend', () => splash.remove(), { once: true });
    try {
      window.sessionStorage.setItem('portfolio-splash-seen', '1');
    } catch (error) {
      // private mode: it just shows again next time
    }
  }

  // animations of the sprout and the words, not the safety one
  const intro = splash.getAnimations({ subtree: true }).filter((animation) => animation.effect?.target !== splash);

  if (intro.length === 0) {
    // performance.now() is the time since loading started
    window.setTimeout(lift, Math.max(0, FALLBACK_MS - performance.now()));
    return;
  }

  Promise.allSettled(intro.map((animation) => animation.finished)).then(() => window.setTimeout(lift, HOLD_MS));
}
