import { el } from '../js/dom.js';
import { projects } from '../data/projects.js';
import { projectUrl, siteUrl } from '../js/config.js';
import { createSection } from '../components/section.js';
import { tagList } from '../components/tag.js';
import { icon } from '../components/icons.js';
import { openProject } from '../components/projectDialog.js';

const MAX_TOOLS = 6; // the project page lists every tool
const MAX_POINTS = 3; // and every contribution

// links to the other work sections
const MORE_WORK = [
  { id: 'ui-ux-showcase', label: 'UI/UX Design' },
  { id: 'graphic-design', label: 'Graphic Design' },
  { id: 'photography', label: 'Photography' },
  { id: 'it-support-showcase', label: 'IT Support' },
];

// one project card: cover picture, title, dates, View button, main tools, a few key points
function projectCard(project) {
  const allTools = [...project.techStack, ...project.designTools];
  const hiddenTools = allTools.length - MAX_TOOLS;
  const tools = hiddenTools > 0 ? [...allTools.slice(0, MAX_TOOLS), `+${hiddenTools} more`] : allTools;
  // project still in progress: show the overview instead
  const points = project.contributions.length ? project.contributions.slice(0, MAX_POINTS) : [project.overview];

  // View and the cover open the details in a popup, the link still goes to the full page in a new tab
  const open = (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    openProject(project, event.currentTarget);
  };

  // the cover is only a shortcut for the mouse, the View button is the one for the keyboard
  const cover = project.cover
    ? el(
        'a',
        { class: 'project-card__cover', href: projectUrl(project.id), tabindex: '-1', 'aria-hidden': 'true', on: { click: open } },
        el('img', { src: siteUrl(project.cover), alt: '', loading: 'lazy', decoding: 'async' }),
      )
    : null;

  return el(
    'article',
    { class: 'project-card' },
    cover,
    el(
      'div',
      { class: 'project-card__body' },
      el(
        'div',
        { class: 'project-card__head' },
        el(
          'div',
          {},
          el('h3', { class: 'project-card__title', text: project.title }),
          el('p', { class: 'project-card__meta', text: [project.type, project.date].filter(Boolean).join(' · ') }),
        ),
        el(
          'a',
          {
            class: 'btn btn--primary btn--small',
            href: projectUrl(project.id),
            'aria-label': `View details: ${project.title}`,
            on: { click: open },
          },
          'View',
        ),
      ),
      project.achievement
        ? el('p', { class: 'project-card__badge' }, icon('award', 14), el('span', { text: project.achievement }))
        : null,
      tools.length ? tagList(tools) : null,
      el('ul', { class: 'bullet-list' }, points.map((text) => el('li', { text }))),
    ),
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
    el('div', { class: 'project-cards' }, projects.map(projectCard)),
    createMoreWork(),
  );
}
