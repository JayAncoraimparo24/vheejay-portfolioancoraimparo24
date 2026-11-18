import { el } from '../js/dom.js';
import { skillCategories } from '../data/skills.js';
import { createSection } from '../components/section.js';
import { icon } from '../components/icons.js';
import { tagList } from '../components/tag.js';

/** One line of the skills list: the category name, then its skills as small chips. */
function skillGroup({ title, icon: iconName, items }) {
  return el(
    'div',
    { class: 'skill-group' },
    el('h3', { class: 'skill-group__title' }, icon(iconName, 16), title),
    tagList(items),
  );
}

export function createSkills() {
  return createSection(
    { id: 'skills', title: 'Skills', iconName: 'tool', narrow: true },
    el('div', { class: 'skill-groups' }, skillCategories.map(skillGroup)),
  );
}
