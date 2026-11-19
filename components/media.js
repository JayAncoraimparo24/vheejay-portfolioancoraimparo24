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

// figure with a short video (no sound). shows the poster and loads only the first frame until played
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
  // no sound track, muted anyway
  player.muted = true;
  frame.append(el('div', { class: 'media__box' }, player));
  if (caption) frame.append(el('figcaption', { class: 'media__caption', text: caption }));
  return frame;
}

// figure with an image, or a placeholder if there is no src
export function mediaFrame({ src, fullSrc = src, alt, label, caption, ratio = '16 / 10', openFull = false }) {
  const frame = el('figure', { class: 'media', style: `--media-ratio: ${ratio}` });
  const placeholder = createPlaceholder(label ?? alt);
  const box = el('div', { class: 'media__box' });

  if (src) {
    // src is the small copy, fullSrc is the full picture
    const image = el('img', { class: 'media__img', src: siteUrl(src), alt, loading: 'lazy', decoding: 'async' });
    image.addEventListener('error', () => {
      // small copy missing: use the full one
      if (fullSrc && fullSrc !== src && !image.dataset.triedFull) {
        image.dataset.triedFull = 'true';
        image.src = siteUrl(fullSrc);
        return;
      }
      box.replaceChildren(placeholder);
    });
    // openFull: a click opens it full size in a new tab
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
