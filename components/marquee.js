import { el } from '../js/dom.js';

const SECONDS_PER_NAME = 4.2; // same speed for any number of names

// one name, with its logo in front when logos has one for it
function makeItem(name, logos) {
  const logo = logos[name];
  // alt is empty on purpose: the strip is hidden from screen readers
  const picture = logo ? el('img', { class: 'marquee__logo', src: logo, alt: '', width: 18, height: 18, decoding: 'async' }) : null;
  return el('li', { class: 'marquee__item' }, el('span', { class: 'marquee__label' }, picture, name));
}

// slow strip of names, pauses on hover. hidden from screen readers because the Skills popup has the full list
// logos is optional: { 'Skill name': 'path/to/logo.svg' }
export function createMarquee(names, logos = {}) {
  if (!names.length) return null;

  const makeGroup = () => el('ul', { class: 'marquee__group' }, names.map((name) => makeItem(name, logos)));

  // two identical groups, it moves one group width so the loop has no jump
  const track = el('div', { class: 'marquee__track' }, makeGroup(), makeGroup());
  track.style.animationDuration = `${Math.round(names.length * SECONDS_PER_NAME)}s`;

  return el('div', { class: 'marquee', 'aria-hidden': 'true' }, track);
}
