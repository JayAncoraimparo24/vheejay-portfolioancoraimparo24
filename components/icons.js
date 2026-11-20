import { siteUrl } from '../js/config.js';

// icons are PNG files in assets/icons (black on clear)
// used as a mask so they take the text color, see .icon-file in base.css
export function icon(name, size = 20) {
  const span = document.createElement('span');
  span.className = 'icon-file';
  span.setAttribute('aria-hidden', 'true');
  span.style.setProperty('--icon-url', `url("${siteUrl(`assets/icons/${name}.png`)}")`);
  span.style.width = `${size}px`;
  span.style.height = `${size}px`;
  return span;
}
