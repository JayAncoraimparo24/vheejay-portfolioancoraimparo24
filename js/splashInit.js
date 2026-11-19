/*
 * runs in <head> before paint (classic script, like themeInit.js)
 * the splash shows once per tab, add ?splash to see it again
 */
(function () {
  var seen = false;
  try {
    seen = window.sessionStorage.getItem('portfolio-splash-seen') === '1';
  } catch (error) {
    seen = false;
  }
  var forced = /[?&]splash\b/.test(window.location.search);
  // is-loading stops scrolling behind the splash, no-splash hides it
  document.documentElement.classList.add(seen && !forced ? 'no-splash' : 'is-loading');
})();
