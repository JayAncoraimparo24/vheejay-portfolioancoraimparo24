import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { icon } from './icons.js';
import { mediaFrame, videoFrame } from './media.js';

const SWIPE_DISTANCE = 40; // px a finger must move to turn the page

// one picture at a time with arrows, counter, keys and swipe
// items: [{ src, caption, thumb, video }]. thumb = smaller copy, src opens in the lightbox
// video item: src is the cover picture, it plays in the slider
// thumbs: true = row of small pictures. start = first picture (0)
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
      // a video stops when you turn the page
      if (position !== index) slide.querySelector('video')?.pause();
    });
    count.textContent = `${index + 1} / ${slides.length}`;
    picker?.select(index);
  }

  const stage = el('div', { class: 'slider__stage' }, slides);

  // swipe on touch screens, a swipe shouldn't count as a click
  let startX = null;
  let swiped = false;
  stage.addEventListener('pointerdown', (event) => {
    swiped = false;
    // dragging the video time bar shouldn't turn the page
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
    // one picture needs no buttons
    slides.length > 1 ? el('div', { class: 'slider__bar' }, step('back', 'Previous picture', -1), count, step('arrow', 'Next picture', 1)) : null,
    picker?.node,
  );

  show(start);
  return slider;
}

// row of small pictures under the slider. returns the row and a function that marks the current one
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
    // slide the row, not the page, so the current one is in the middle
    const current = buttons[position];
    node.scrollTo({ left: current.offsetLeft - (node.clientWidth - current.clientWidth) / 2, behavior: 'smooth' });
  };

  return { node, select };
}
