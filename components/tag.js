import { el } from '../js/dom.js';

// +3 more is a count, not a tool
export const tag = (text) => el('li', { class: /^\+\d+ more$/.test(text) ? 'tag tag--more' : 'tag', text });

export function tagList(items, modifier = '') {
  return el('ul', { class: `tag-list ${modifier}`.trim() }, items.map(tag));
}
