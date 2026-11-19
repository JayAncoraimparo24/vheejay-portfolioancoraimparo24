const MIN_VISIBLE_MS = 1900; // long enough to see the sprout grow and the motto being written, never longer than the page needs

/**
 * Lifts the loading screen away once the page is built (called at the end of main.js).
 * The screen itself is plain HTML in index.html, so it shows before any script has loaded;
 * its CSS also hides it by itself after a few seconds, in case a script fails.
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

  // performance.now() is the time since the page started loading, so a slow page never waits any longer
  window.setTimeout(() => {
    splash.classList.add('is-done');
    root.classList.remove('is-loading');
    splash.addEventListener('animationend', () => splash.remove(), { once: true });
    try {
      window.sessionStorage.setItem('portfolio-splash-seen', '1');
    } catch (error) {
      // private mode: the loading screen simply shows again next time
    }
  }, Math.max(0, MIN_VISIBLE_MS - performance.now()));
}
