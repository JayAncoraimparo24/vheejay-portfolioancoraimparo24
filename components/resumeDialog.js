import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { profile } from '../data/profile.js';
import { icon } from './icons.js';
import { openDialog } from './dialog.js';

// resume in a popup as a picture (looks the same everywhere)
// with buttons to download the PDF or open it in a new tab. the PDF has real text
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
      // phones: keep it readable and scroll sideways
      el(
        'div',
        { class: 'resume__scroll' },
        el('img', { class: 'resume__page', src: siteUrl(image), alt: `One-page resume of ${profile.name}`, loading: 'lazy' }),
      ),
    ],
  });
}
