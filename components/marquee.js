import { el } from '../js/dom.js';

const SECONDS_PER_NAME = 4.2; // keeps the speed the same however many names there are

/**
 * A slowly scrolling strip of names (the tools and skills). It pauses when the pointer is over it.
 * Decorative only (hidden from screen readers), since the full list is in the Skills popup.
 */
export function createMarquee(names) {
  if (!names.length) return null;

  const makeGroup = () => el('ul', { class: 'marquee__group' }, names.map((name) => el('li', { class: 'marquee__item', text: name })));

  // Two identical groups: the track moves by exactly one group width, so the loop is seamless.
  const track = el('div', { class: 'marquee__track' }, makeGroup(), makeGroup());
  track.style.animationDuration = `${Math.round(names.length * SECONDS_PER_NAME)}s`;

  return el('div', { class: 'marquee', 'aria-hidden': 'true' }, track);
}
