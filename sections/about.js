import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { createSection } from '../components/section.js';

export function createAbout() {
  const { quote } = profile;

  return createSection(
    { id: 'about', title: 'About Me', iconName: 'user', narrow: true },
    el('p', { class: 'about__summary', text: profile.summary }),
    quote
      ? el(
          'blockquote',
          { class: 'about__quote' },
          el('p', { text: quote.text }),
          el('footer', { text: `— ${quote.author}` }),
        )
      : null,
  );
}
