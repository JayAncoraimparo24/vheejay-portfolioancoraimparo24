import { el } from '../js/dom.js';

const SECONDS_PER_NAME = 4.2; // same speed for any number of names

// slow strip of names, pauses on hover. hidden from screen readers because the Skills popup has the full list
export function createMarquee(names) {
  if (!names.length) return null;

  const makeGroup = () => el('ul', { class: 'marquee__group' }, names.map((name) => el('li', { class: 'marquee__item', text: name })));

  // two identical groups, it moves one group width so the loop has no jump
  const track = el('div', { class: 'marquee__track' }, makeGroup(), makeGroup());
  track.style.animationDuration = `${Math.round(names.length * SECONDS_PER_NAME)}s`;

  return el('div', { class: 'marquee', 'aria-hidden': 'true' }, track);
}
