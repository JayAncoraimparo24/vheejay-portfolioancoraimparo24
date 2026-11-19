import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { icon } from './icons.js';
import { mediaFrame } from './media.js';

const SWIPE_DISTANCE = 40; // how far a finger must travel (px) to turn the page

/**
 * Pictures shown one at a time, with previous / next buttons, a counter, the arrow keys, and swipe.
 *
 * items: [{ src, caption, thumb }]. "thumb" is an optional smaller copy that is shown on the page;
 * the full "src" opens in the full-screen viewer (components/lightbox.js) when a picture is clicked.
 * thumbs: true adds a row of small pictures to jump to any page (used for the work galleries).
 * start: the picture to begin with (0 is the first).
 */
export function createSlider(items, label, { thumbs = false, start = 0 } = {}) {
  if (!items.length) return null;

  const slides = items.map(({ src, thumb, caption }) => {
    const slide = mediaFrame({ src: thumb ?? src, fullSrc: src, alt: `${label} – ${caption}`, label: caption, caption, openFull: true });
    slide.classList.add('slider__slide');
    return slide;
  });

  const count = el('span', { class: 'slider__count', 'aria-live': 'polite' });
  const picker = thumbs && items.length > 1 ? createThumbs(items, (position) => show(position)) : null;
  let index = 0;

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.hidden = position !== index;
    });
    count.textContent = `${index + 1} / ${slides.length}`;
    picker?.select(index);
  }

  const stage = el('div', { class: 'slider__stage' }, slides);

  // Swipe left or right on a touch screen. A swipe must not also count as a click on the picture.
  let startX = null;
  let swiped = false;
  stage.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
    swiped = false;
  });
  stage.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const distance = event.clientX - startX;
    startX = null;
    if (Math.abs(distance) < SWIPE_DISTANCE) return;
    swiped = true;
    show(index + (distance < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => {
    startX = null;
  });
  stage.addEventListener(
    'click',
    (event) => {
      if (swiped) event.preventDefault();
    },
    true,
  );

  const step = (iconName, text, change) =>
    el('button', { class: 'slider__btn', type: 'button', 'aria-label': text, on: { click: () => show(index + change) } }, icon(iconName, 18));

  const slider = el(
    'div',
    {
      class: 'slider',
      role: 'group',
      'aria-roledescription': 'carousel',
      'aria-label': label,
      on: {
        keydown: (event) => {
          if (event.key === 'ArrowLeft') show(index - 1);
          else if (event.key === 'ArrowRight') show(index + 1);
        },
      },
    },
    stage,
    // One picture needs no buttons
    slides.length > 1 ? el('div', { class: 'slider__bar' }, step('back', 'Previous picture', -1), count, step('arrow', 'Next picture', 1)) : null,
    picker?.node,
  );

  show(start);
  return slider;
}

/** The row of small pictures under the slider. Returns the row and a function that marks the current one. */
function createThumbs(items, onPick) {
  const buttons = items.map(({ src, thumb, caption }, position) =>
    el(
      'button',
      { class: 'slider__thumb', type: 'button', 'aria-label': caption, title: caption, on: { click: () => onPick(position) } },
      el('img', { src: siteUrl(thumb ?? src), alt: '', loading: 'lazy', decoding: 'async' }),
    ),
  );
  const node = el('div', { class: 'slider__thumbs' }, buttons);

  const select = (position) => {
    buttons.forEach((button, buttonPosition) => button.setAttribute('aria-current', String(buttonPosition === position)));
    // Slide the row sideways (not the page) so the current picture sits in the middle of it
    const current = buttons[position];
    node.scrollTo({ left: current.offsetLeft - (node.clientWidth - current.clientWidth) / 2, behavior: 'smooth' });
  };

  return { node, select };
}
