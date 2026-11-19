import { el } from '../js/dom.js';
import { projects } from '../data/projects.js';
import { projectUrl } from '../js/config.js';
import { createSection } from '../components/section.js';
import { tagList } from '../components/tag.js';
import { openProject } from '../components/projectDialog.js';

const MAX_TOOLS = 6; // the project page lists every tool
const MAX_POINTS = 3; // and every contribution

// The other work sections, so a visitor can jump straight to them from here
const MORE_WORK = [
  { id: 'ui-ux-showcase', label: 'UI/UX Design' },
  { id: 'graphic-design', label: 'Graphic Design' },
  { id: 'photography', label: 'Photography' },
  { id: 'it-support-showcase', label: 'IT Support' },
];

/** One project as a row: title and dates, a View button, the main tools, and a few key points. */
function projectRow(project) {
  const allTools = [...project.techStack, ...project.designTools];
  const hiddenTools = allTools.length - MAX_TOOLS;
  const tools = hiddenTools > 0 ? [...allTools.slice(0, MAX_TOOLS), `+${hiddenTools} more`] : allTools;
  // A project that is still in progress has no contributions yet, so its overview is shown instead
  const points = project.contributions.length ? project.contributions.slice(0, MAX_POINTS) : [project.overview];

  return el(
    'article',
    { class: 'project-row' },
    el(
      'div',
      { class: 'project-row__head' },
      el(
        'div',
        {},
        el('h3', { class: 'project-row__title', text: project.title }),
        el('p', { class: 'project-row__meta', text: [project.type, project.date].filter(Boolean).join(' · ') }),
      ),
      // View opens the details in a popup. The link still goes to the full page when it is opened in a new tab.
      el(
        'a',
        {
          class: 'btn btn--secondary btn--small',
          href: projectUrl(project.id),
          'aria-label': `View details: ${project.title}`,
          on: {
            click: (event) => {
              if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) return;
              event.preventDefault();
              openProject(project, event.currentTarget);
            },
          },
        },
        'View',
      ),
    ),
    tools.length ? tagList(tools) : null,
    el('ul', { class: 'bullet-list' }, points.map((text) => el('li', { text }))),
  );
}

function createMoreWork() {
  return el(
    'nav',
    { class: 'jump-links', 'aria-label': 'More of my work' },
    el('span', { class: 'jump-links__label', text: 'More of my work' }),
    MORE_WORK.map(({ id, label }) => el('a', { class: 'btn btn--secondary btn--small', href: `#${id}`, text: label })),
  );
}

export function createProjects() {
  return createSection(
    { id: 'projects', title: 'Project Experience', iconName: 'folder', narrow: true },
    el('div', { class: 'project-rows' }, projects.map(projectRow)),
    createMoreWork(),
  );
}
