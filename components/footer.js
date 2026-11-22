import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';

export function createFooter() {
  return el(
    'footer',
    { class: 'site-footer' },
    el(
      'div',
      { class: 'container container--narrow site-footer__inner' },
      el('p', { class: 'site-footer__name', text: `© ${new Date().getFullYear()} ${profile.name}` }),
      // scroll to the very top (project pages have no #home)
      el('a', {
        class: 'site-footer__top',
        href: '#',
        'aria-label': 'Back to top',
        on: {
          click: (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
        },
      }, 'Back to top ↑'),
    ),
  );
}
