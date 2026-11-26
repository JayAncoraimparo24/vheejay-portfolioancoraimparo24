import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { icon } from '../components/icons.js';
import { createFlipCard } from '../components/flipCard.js';
import { openResume } from '../components/resumeDialog.js';
import { siteUrl } from '../js/config.js';

// pill link with an icon (View My Work, Message, Resume, GitHub, LinkedIn)
// with onOpen a plain click runs that, the link is still there for a new tab
function linkButton({ label, href, iconName, variant = 'secondary', external = false, onOpen }) {
  const props = { class: `btn btn--${variant} btn--small`, href };
  if (external) Object.assign(props, { target: '_blank', rel: 'noopener noreferrer' });
  if (onOpen) {
    props.on = {
      click: (event) => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) return;
        event.preventDefault();
        onOpen(event.currentTarget);
      },
    };
  }
  return el('a', props, icon(iconName, 16), label);
}

function createLinks() {
  const links = [
    { label: 'View My Work', href: '#projects', iconName: 'folder', variant: 'primary' },
    // message goes to the contact form (mailto does nothing without a mail app)
    profile.email && { label: 'Message', href: '#contact', iconName: 'mail' },
    // resume opens in a popup, the link goes to the PDF in a new tab
    profile.resume?.url && { label: 'Resume', href: siteUrl(profile.resume.url), iconName: 'file', onOpen: openResume },
    profile.github?.url && { label: 'GitHub', href: profile.github.url, iconName: 'github', external: true },
    profile.linkedin?.url && { label: 'LinkedIn', href: profile.linkedin.url, iconName: 'linkedin', external: true },
  ].filter(Boolean);

  return el('div', { class: 'hero__links' }, links.map(linkButton));
}

// portrait: tap to flip (toga and barong). Enlarge opens the one that is showing in the full-screen viewer, the arrows go to the other
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

  // hidden links, one per picture, the viewer reads them (and the caption)
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
        profile.status ? el('p', { class: 'hero__status', text: profile.status }) : null,
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
