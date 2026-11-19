import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { icon } from './icons.js';
import { mediaFrame, videoFrame } from './media.js';

const SWIPE_DISTANCE = 40; // how far a finger must move (px) to turn the page

/**
 * Pictures shown one at a time, with previous / next buttons, a counter, arrow keys and swipe.
 *
 * items: [{ src, caption, thumb, video }]. "thumb" is an optional smaller copy shown on the page.
 * The full "src" opens in the full-screen viewer (components/lightbox.js) when a picture is clicked.
 * An item with "video" is a short video: "src" is then its cover picture, and it plays in the slider.
 * thumbs: true adds a row of small pictures to jump to any page (used in the work galleries).
 * start: the picture to begin with (0 is the first).
 */
export function createSlider(items, label, { thumbs = false, start = 0 } = {}) {
  if (!items.length) return null;

  const slides = items.map(({ src, thumb, caption, video }) => {
    const alt = `${label} – ${caption}`;
    const slide = video
      ? videoFrame({ video, poster: thumb ?? src, alt, caption })
      : mediaFrame({ src: thumb ?? src, fullSrc: src, alt, label: caption, caption, openFull: true });
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
      // A video stops when its page is turned
      if (position !== index) slide.querySelector('video')?.pause();
    });
    count.textContent = `${index + 1} / ${slides.length}`;
    picker?.select(index);
  }

  const stage = el('div', { class: 'slider__stage' }, slides);

  // Swipe left or right on a touch screen. A swipe must not also count as a click on the picture.
  let startX = null;
  let swiped = false;
  stage.addEventListener('pointerdown', (event) => {
    swiped = false;
    // Dragging the video's own time bar must not turn the page
    startX = event.target.closest('video') ? null : event.clientX;
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
  const buttons = items.map(({ src, thumb, caption, video }, position) =>
    el(
      'button',
      {
        class: video ? 'slider__thumb slider__thumb--video' : 'slider__thumb',
        type: 'button',
        'aria-label': video ? `${caption} (video)` : caption,
        title: caption,
        on: { click: () => onPick(position) },
      },
      el('img', { src: siteUrl(thumb ?? src), alt: '', loading: 'lazy', decoding: 'async' }),
    ),
  );
  const node = el('div', { class: 'slider__thumbs' }, buttons);

  const select = (position) => {
    buttons.forEach((button, buttonPosition) => button.setAttribute('aria-current', String(buttonPosition === position)));
    // Slide the row sideways (not the page) so the current picture is in the middle
    const current = buttons[position];
    node.scrollTo({ left: current.offsetLeft - (node.clientWidth - current.clientWidth) / 2, behavior: 'smooth' });
  };

  return { node, select };
}
