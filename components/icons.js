import { siteUrl } from '../js/config.js';

/**
 * Every icon on the site is an SVG file in assets/icons/, taken from the free UIcons set by Flaticon
 * (https://www.flaticon.com/uicons). To change one, replace its file.
 *
 * The file is used as a mask, so the icon is painted in the surrounding text colour
 * and follows the light and dark theme (see .icon-file in base.css).
 */
export function icon(name, size = 20) {
  const span = document.createElement('span');
  span.className = 'icon-file';
  span.setAttribute('aria-hidden', 'true');
  span.style.setProperty('--icon-url', `url("${siteUrl(`assets/icons/${name}.svg`)}")`);
  span.style.width = `${size}px`;
  span.style.height = `${size}px`;
  return span;
}
