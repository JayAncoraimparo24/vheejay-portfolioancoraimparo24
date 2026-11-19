import { el } from '../js/dom.js';
import { skillCategories } from '../data/skills.js';
import { createSection } from '../components/section.js';
import { block, openDialog } from '../components/dialog.js';
import { createMarquee } from '../components/marquee.js';
import { tagList } from '../components/tag.js';

// every category with all its skills, for the popup
function openAllSkills(trigger) {
  openDialog({
    title: 'Skills',
    trigger,
    content: skillCategories.map(({ title, items }) => block(title, tagList(items))),
  });
}

export function createSkills() {
  // the page shows a moving strip of the main skills, View opens the full list
  const inStrip = skillCategories.filter((category) => category.showInStrip).flatMap((category) => category.items);

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
    createMarquee(inStrip),
  );
}
