/*
 * Runs in <head> before the page paints (a classic script, like themeInit.js).
 * The loading screen shows once per visit (per browser tab), so going back from a project page or
 * reloading doesn't show it again. Add ?splash to the address to see it again.
 */
(function () {
  var seen = false;
  try {
    seen = window.sessionStorage.getItem('portfolio-splash-seen') === '1';
  } catch (error) {
    seen = false;
  }
  var forced = /[?&]splash\b/.test(window.location.search);
  // is-loading stops the page from scrolling behind the loading screen, no-splash hides it
  document.documentElement.classList.add(seen && !forced ? 'no-splash' : 'is-loading');
})();
