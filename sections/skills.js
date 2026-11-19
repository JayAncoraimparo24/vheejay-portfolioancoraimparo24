import { el } from '../js/dom.js';
import { skillCategories } from '../data/skills.js';
import { createSection } from '../components/section.js';
import { block, openDialog } from '../components/dialog.js';
import { tagList } from '../components/tag.js';

/** Every category with all of its skills, shown in the popup. */
function openAllSkills(trigger) {
  openDialog({
    title: 'Skills',
    trigger,
    content: skillCategories.map(({ title, items }) => block(title, tagList(items))),
  });
}

export function createSkills() {
  // The page shows one line of short names; View opens the full list by category
  const inRow = skillCategories.filter((category) => category.showInRow).flatMap((category) => category.items);

  const viewButton = el(
    'button',
    {
      class: 'btn btn--secondary btn--small',
      type: 'button',
      'aria-label': 'View all skills',
      on: { click: (event) => openAllSkills(event.currentTarget) },
    },
    'View',
  );

  return createSection(
    { id: 'skills', title: 'Skills', iconName: 'tool', narrow: true, action: viewButton },
    tagList(inRow, 'skill-row'),
  );
}
