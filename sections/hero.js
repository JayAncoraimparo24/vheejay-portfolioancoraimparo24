import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { icon } from '../components/icons.js';
import { siteUrl } from '../js/config.js';

/** A small pill-shaped link with an icon in front: View My Work, Message, GitHub, LinkedIn. */
function linkButton({ label, href, iconName, variant = 'secondary', external = false }) {
  const props = { class: `btn btn--${variant} btn--small`, href };
  if (external) Object.assign(props, { target: '_blank', rel: 'noopener noreferrer' });
  return el('a', props, icon(iconName, 16), label);
}

function createLinks() {
  const links = [
    { label: 'View My Work', href: '#projects', iconName: 'folder', variant: 'primary' },
    // The message button goes to the contact form (a plain mailto: link does nothing without a mail app)
    profile.email && { label: 'Message', href: '#contact', iconName: 'mail' },
    profile.github?.url && { label: 'GitHub', href: profile.github.url, iconName: 'github', external: true },
    profile.linkedin?.url && { label: 'LinkedIn', href: profile.linkedin.url, iconName: 'linkedin', external: true },
  ].filter(Boolean);

  return el('div', { class: 'hero__links' }, links.map(linkButton));
}

/**
 * The portrait. Clicking it opens the picture big in the full-screen viewer (components/lightbox.js),
 * where the arrows go to the second picture (in barong). Only the first picture shows on the page.
 */
function createPortrait() {
  if (!profile.photo) {
    return el('div', { class: 'hero__photo' }, el('span', { class: 'hero__initials', text: profile.initials }));
  }

  const pictures = [
    { src: profile.photo, alt: `Portrait of ${profile.name}`, caption: 'Portrait' },
    profile.photoBack ? { src: profile.photoBack.src, alt: profile.photoBack.alt, caption: profile.photoBack.caption } : null,
  ].filter(Boolean);

  const items = pictures.map(({ src, alt, caption }, position) =>
    el(
      'figure',
      { class: 'portrait__item', hidden: position > 0 },
      el(
        'div',
        { class: 'hero__photo' },
        el(
          'a',
          { class: 'media__link', href: siteUrl(src), target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open larger: ${caption}` },
          el('img', { class: 'hero__img', src: siteUrl(src), alt, loading: position > 0 ? 'lazy' : null }),
        ),
      ),
      // The viewer shows this caption; it is not shown on the page
      el('figcaption', { class: 'portrait__caption', text: caption }),
    ),
  );

  return el('div', { class: 'portrait' }, items, el('span', { class: 'portrait__hint', text: 'Tap to enlarge' }));
}

export function createHero() {
  return el(
    'section',
    { class: 'hero', id: 'home', 'data-nav': 'home', 'aria-labelledby': 'hero-title' },
    el(
      'div',
      { class: 'container container--narrow hero__inner' },
      createPortrait(),
      el(
        'div',
        { class: 'hero__content' },
        el('h1', { class: 'hero__title', id: 'hero-title', text: profile.name }),
        el('p', { class: 'hero__roles', text: profile.roles.join(' | ') }),
        el('p', { class: 'hero__location' }, icon('pin', 16), el('span', { text: profile.location })),
        profile.verse
          ? el(
              'p',
              { class: 'hero__verse' },
              el('q', { text: profile.verse.text }),
              el('cite', { text: profile.verse.reference }),
            )
          : null,
        createLinks(),
      ),
    ),
  );
}
