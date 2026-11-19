import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { icon } from './icons.js';
function createPlaceholder(label) {
  return el(
    'div',
    { class: 'media__placeholder' },
    icon('image', 28),
    el('span', { class: 'media__label', text: label }),
    el('span', { class: 'media__hint', text: 'Image placeholder' }),
  );
}

/**
 * Figure with a short video (no sound). It shows `poster` until it is played, and loads only its first frame
 * until then. Played with the controls, so it is never started by itself.
 */
export function videoFrame({ video, poster, alt, caption }) {
  const frame = el('figure', { class: 'media' });
  const player = el('video', {
    class: 'media__video',
    src: siteUrl(video),
    poster: siteUrl(poster),
    controls: true,
    loop: true,
    playsinline: true,
    preload: 'metadata',
    'aria-label': alt,
  });
  // The file has no sound track; this makes sure the player is muted too
  player.muted = true;
  frame.append(el('div', { class: 'media__box' }, player));
  if (caption) frame.append(el('figcaption', { class: 'media__caption', text: caption }));
  return frame;
}

/**
 * Figure that shows an image when `src` is set and loads, otherwise a placeholder.
 */
export function mediaFrame({ src, fullSrc = src, alt, label, caption, ratio = '16 / 10', openFull = false }) {
  const frame = el('figure', { class: 'media', style: `--media-ratio: ${ratio}` });
  const placeholder = createPlaceholder(label ?? alt);
  const box = el('div', { class: 'media__box' });

  if (src) {
    // `src` is what the tile shows (a small copy); `fullSrc` is the full picture, used when it is opened
    const image = el('img', { class: 'media__img', src: siteUrl(src), alt, loading: 'lazy', decoding: 'async' });
    image.addEventListener('error', () => {
      // If the small copy is missing, fall back to the full picture before giving up
      if (fullSrc && fullSrc !== src && !image.dataset.triedFull) {
        image.dataset.triedFull = 'true';
        image.src = siteUrl(fullSrc);
        return;
      }
      box.replaceChildren(placeholder);
    });
    // With openFull, clicking the picture opens it at full size in a new tab.
    box.append(
      openFull
        ? el(
            'a',
            { class: 'media__link', href: siteUrl(fullSrc), target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open full image: ${alt}` },
            image,
          )
        : image,
    );
  } else {
    box.append(placeholder);
  }

  frame.append(box);
  if (caption) frame.append(el('figcaption', { class: 'media__caption', text: caption }));
  return frame;
}
