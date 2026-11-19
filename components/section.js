import { el } from '../js/dom.js';
import { icon } from './icons.js';

// page section with a heading. nav links it to the navbar for scroll-spy
// tone: light, tint or dark. narrow: true = resume-style column
// iconName = icon before the title, action = element at the right of the title
export function createSection({ id, nav = id, title, intro, iconName, action, tone = 'light', narrow = false }, ...content) {
  const heading = el('h2', { class: 'section__title', id: `${id}-title` }, iconName ? icon(iconName, 22) : null, title);

  const header = el(
    'header',
    { class: 'section__header' },
    action ? el('div', { class: 'section__headline' }, heading, action) : heading,
    intro ? el('p', { class: 'section__intro', text: intro }) : null,
  );

  return el(
    'section',
    {
      class: `section section--${tone}`,
      id,
      'data-nav': nav,
      'aria-labelledby': `${id}-title`,
    },
    el('div', { class: narrow ? 'container container--narrow' : 'container' }, header, content),
  );
}

// short note for content that isn't provided yet
export function placeholderNote(text) {
  return el('p', { class: 'placeholder-note', text });
}
