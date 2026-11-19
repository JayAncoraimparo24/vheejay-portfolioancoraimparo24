/*
 * runs in <head> before paint so dark visitors don't see a white flash
 * classic script on purpose, same logic as getInitialTheme() in theme.js
 */
(function () {
  var theme = null;
  try {
    theme = window.localStorage.getItem('portfolio-theme');
  } catch (error) {
    theme = null;
  }
  if (theme !== 'dark' && theme !== 'light') {
    var hour = new Date().getHours();
    theme = hour >= 18 || hour < 6 ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
