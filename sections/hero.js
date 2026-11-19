import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { icon } from '../components/icons.js';
import { createFlipCard } from '../components/flipCard.js';
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
 * The portrait. Tap it to turn it over (toga and barong). The Enlarge button below it opens the picture
 * that is showing in the full-screen viewer (components/lightbox.js), where the arrows go to the other one.
 */
function createPortrait() {
  if (!profile.photo) {
    return el('div', { class: 'hero__photo' }, el('span', { class: 'hero__initials', text: profile.initials }));
  }

  const pictures = [
    { src: profile.photo, alt: `Portrait of ${profile.name}`, caption: 'Portrait' },
    profile.photoBack ? { src: profile.photoBack.src, alt: profile.photoBack.alt, caption: profile.photoBack.caption } : null,
  ].filter(Boolean);

  const face = ({ src, alt }, modifier = '') =>
    el('div', { class: `hero__photo ${modifier}`.trim() }, el('img', { class: 'hero__img', src: siteUrl(src), alt, loading: modifier ? 'lazy' : null }));

  // Hidden links, one per picture: the full-screen viewer reads them (it shows the caption too)
  const viewerLinks = pictures.map(({ src, alt, caption }) =>
    el(
      'figure',
      { class: 'portrait__viewer', hidden: true },
      el('a', { class: 'media__link', href: siteUrl(src), target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open larger: ${caption}` }, el('img', { alt })),
      el('figcaption', { text: caption }),
    ),
  );

  const card =
    pictures.length > 1
      ? createFlipCard({
          front: face(pictures[0]),
          back: face(pictures[1], 'hero__photo--back'),
          label: 'Turn the photo over to see the other one',
          hint: 'Tap to flip',
        })
      : face(pictures[0]);

  const enlarge = el(
    'button',
    {
      class: 'portrait__enlarge',
      type: 'button',
      'aria-label': 'Enlarge the photo',
      on: {
        click: () => {
          const flipped = card.classList.contains('is-flipped');
          viewerLinks[flipped ? 1 : 0].querySelector('a').click();
        },
      },
    },
    'Enlarge',
  );

  return el('div', { class: 'portrait' }, card, enlarge, viewerLinks);
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
