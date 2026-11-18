import { el } from '../js/dom.js';
import { icon } from './icons.js';

/**
 * Standard page section with a heading. `nav` maps the section to a navbar link for scroll-spy.
 * tone: 'light' | 'tint' | 'dark'.  narrow: true gives the short, resume-style column.
 * iconName puts a small icon in front of the title.
 */
export function createSection({ id, nav = id, eyebrow, title, intro, iconName, tone = 'light', narrow = false }, ...content) {
  const heading = el('h2', { class: 'section__title', id: `${id}-title` }, iconName ? icon(iconName, 22) : null, title);

  const header = el(
    'header',
    { class: 'section__header' },
    eyebrow ? el('p', { class: 'eyebrow', text: eyebrow }) : null,
    heading,
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

/** Short note shown wherever real content has not been provided yet. */
export function placeholderNote(text) {
  return el('p', { class: 'placeholder-note', text });
}
