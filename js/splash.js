const HOLD_MS = 700; // how long the finished screen stays before it goes away
const FALLBACK_MS = 3700; // only used if the animations can't be read: go away this long after the page started loading

/**
 * Takes the loading screen away once the page is built (called at the end of main.js).
 * The screen is plain HTML in index.html, so it shows before any script loads.
 * Its CSS also hides it by itself after a few seconds, in case a script fails.
 *
 * It waits for its own animations (the sprout, the motto being written, the role) to finish,
 * then holds for a moment. It doesn't use a fixed time from the start of loading, because the
 * animations only begin when the styles arrive, and on a slow connection that would cut the words off.
 */
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
      // private mode: the loading screen just shows again next time
    }
  }

  // The animations of the sprout and the words. (The screen's own safety animation is not included.)
  const intro = splash.getAnimations({ subtree: true }).filter((animation) => animation.effect?.target !== splash);

  if (intro.length === 0) {
    // performance.now() is the time since the page started loading, so a slow page never waits longer
    window.setTimeout(lift, Math.max(0, FALLBACK_MS - performance.now()));
    return;
  }

  Promise.allSettled(intro.map((animation) => animation.finished)).then(() => window.setTimeout(lift, HOLD_MS));
}
