import { el } from '../js/dom.js';
import { skillCategories, skillLogos } from '../data/skills.js';
import { createSection } from '../components/section.js';
import { block, openDialog } from '../components/dialog.js';
import { createMarquee } from '../components/marquee.js';
import { tag } from '../components/tag.js';

// a skill tag, with its logo in front when it has one
function skillTag(name) {
  const item = tag(name);
  const logo = skillLogos[name];
  if (logo) {
    item.classList.add('tag--logo');
    // alt is empty on purpose: the name is right beside the logo, so a screen reader would read it twice
    item.prepend(el('img', { class: 'tag__logo', src: logo, alt: '', width: 16, height: 16, decoding: 'async' }));
  }
  return item;
}

// every category with all its skills, for the popup
function openAllSkills(trigger) {
  openDialog({
    title: 'Skills',
    trigger,
    content: skillCategories.map(({ title, items }) => block(title, el('ul', { class: 'tag-list' }, items.map((name) => skillTag(name))))),
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
    createMarquee(inStrip, skillLogos),
  );
}
