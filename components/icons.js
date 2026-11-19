import { siteUrl } from '../js/config.js';

/**
 * Every icon on the site is a PNG picture in assets/icons/ (black on a clear background), taken from the free Lineal set by one Flaticon author
 * (flaticon.com/icons). To change one, replace its file.
 *
 * The picture is used as a mask, so the icon is painted in the surrounding text colour
 * and follows the light and dark theme (see .icon-file in base.css).
 */
export function icon(name, size = 20) {
  const span = document.createElement('span');
  span.className = 'icon-file';
  span.setAttribute('aria-hidden', 'true');
  span.style.setProperty('--icon-url', `url("${siteUrl(`assets/icons/${name}.png`)}")`);
  span.style.width = `${size}px`;
  span.style.height = `${size}px`;
  return span;
}
