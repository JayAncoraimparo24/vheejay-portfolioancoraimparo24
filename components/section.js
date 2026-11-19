import { el } from '../js/dom.js';
import { icon } from './icons.js';

/**
 * Standard page section with a heading. `nav` links the section to a navbar link for scroll-spy.
 * tone: light, tint or dark. narrow: true gives the short resume-style column.
 * iconName puts a small icon before the title. action is an element (like a View button) at the right of the title.
 */
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

/** Short note shown where the real content isn't provided yet. */
export function placeholderNote(text) {
  return el('p', { class: 'placeholder-note', text });
}
