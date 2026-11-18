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

/** The portrait. Click it to turn it over and see the second picture (components/flipCard.js). */
function createPortrait() {
  const front = el(
    'div',
    { class: 'hero__photo' },
    profile.photo
      ? el('img', { class: 'hero__img', src: siteUrl(profile.photo), alt: `Portrait of ${profile.name}` })
      : el('span', { class: 'hero__initials', text: profile.initials }),
  );
  if (!profile.photo || !profile.photoBack) return front;

  const { src, alt, caption } = profile.photoBack;
  const back = el(
    'div',
    { class: 'hero__photo hero__photo--back' },
    el('img', { class: 'hero__img', src: siteUrl(src), alt, loading: 'lazy' }),
    el('span', { class: 'hero__caption', text: caption }),
  );
  return createFlipCard({ front, back, label: 'Turn the photo over to see the other side', hint: 'Tap to flip' });
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
