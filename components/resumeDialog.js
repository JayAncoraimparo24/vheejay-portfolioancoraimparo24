import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { profile } from '../data/profile.js';
import { icon } from './icons.js';
import { openDialog } from './dialog.js';

/**
 * Shows the resume on the page itself, in a popup: the page as a picture (it looks the same on every phone and
 * computer), with buttons to download the PDF or open it in its own tab. The PDF has real, selectable text.
 */
export function openResume(trigger) {
  const { url, image } = profile.resume;

  openDialog({
    title: 'Resume',
    subtitle: profile.name,
    trigger,
    wide: true,
    content: [
      el(
        'div',
        { class: 'resume__actions' },
        el('a', { class: 'btn btn--primary btn--small', href: siteUrl(url), download: '' }, icon('file', 16), 'Download PDF'),
        el('a', { class: 'btn btn--secondary btn--small', href: siteUrl(url), target: '_blank', rel: 'noopener noreferrer' }, 'Open in a new tab', icon('external', 16)),
      ),
      // On a phone the page stays big enough to read and slides sideways
      el(
        'div',
        { class: 'resume__scroll' },
        el('img', { class: 'resume__page', src: siteUrl(image), alt: `One-page resume of ${profile.name}`, loading: 'lazy' }),
      ),
    ],
  });
}
