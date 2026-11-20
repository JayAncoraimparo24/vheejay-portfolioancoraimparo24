import { el } from '../js/dom.js';
import { projects } from '../data/projects.js';
import { projectUrl, siteUrl } from '../js/config.js';
import { createSection } from '../components/section.js';
import { tagList } from '../components/tag.js';
import { icon } from '../components/icons.js';
import { openProject } from '../components/projectDialog.js';

const MAX_TOOLS = 6; // the project page lists every tool
const MAX_POINTS = 3; // and every contribution

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

export function createProjects() {
  return createSection(
    { id: 'projects', title: 'Project Experience', iconName: 'folder', narrow: true },
    el('div', { class: 'project-cards' }, projects.map(projectCard)),
  );
}
