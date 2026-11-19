import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { createSection } from '../components/section.js';
import { createContactForm } from '../components/contactForm.js';
import { icon } from '../components/icons.js';
import { siteUrl } from '../js/config.js';

function contactRow({ iconName, label, value, href, external = false, download = false }) {
  const content = href
    ? el('a', { href, text: value, ...(external && { target: '_blank', rel: 'noopener noreferrer' }), ...(download && { download: '' }) })
    : el('span', { class: 'placeholder-note', text: value });

  return el(
    'li',
    { class: 'contact__row' },
    el('span', { class: 'contact__icon' }, icon(iconName, 20)),
    el('div', {}, el('p', { class: 'contact__label', text: label }), content),
  );
}

function createContactList() {
  const { github } = profile;
  return el('ul', { class: 'contact__list' }, [
    contactRow({ iconName: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` }),
    contactRow({ iconName: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` }),
    contactRow({
      iconName: 'linkedin',
      label: 'LinkedIn',
      value: profile.linkedin.label,
      href: profile.linkedin.url,
      external: true,
    }),
    // Shown only once a real GitHub address is set in data/profile.js (no "to be added" note for visitors).
    github.url
      ? contactRow({ iconName: 'github', label: 'GitHub', value: github.label ?? github.url, href: github.url, external: true })
      : null,
    // Shown only when a resume file is set in data/profile.js
    profile.resume?.url
      ? contactRow({ iconName: 'file', label: 'Resume', value: 'Download PDF', href: siteUrl(profile.resume.url), download: true })
      : null,
  ]);
}

export function createContact() {
  return createSection(
    {
      id: 'contact',
      eyebrow: 'Contact',
      title: "Let's Connect",
      intro: 'Reach out by email, phone, or LinkedIn, or use the form below.',
      tone: 'dark',
      narrow: true,
    },
    el('div', { class: 'contact' }, createContactList(), createContactForm()),
  );
}
