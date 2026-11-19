import { el } from '../js/dom.js';
import { projectUrl } from '../js/config.js';
import { icon } from './icons.js';
import { block, openDialog } from './dialog.js';
import { createSlider } from './slider.js';
import { tagList } from './tag.js';

/** A block with a bullet list, or nothing when the list is empty. */
function listBlock(heading, items) {
  return items?.length ? block(heading, el('ul', { class: 'bullet-list' }, items.map((text) => el('li', { text })))) : null;
}

function tagBlock(heading, items) {
  return items?.length ? block(heading, tagList(items)) : null;
}

function fact(label, value) {
  return el('div', { class: 'meta__item' }, el('dt', { text: label }), el('dd', { text: value }));
}

/** Opens the popup with the details of one project. `trigger` is the element to give focus back to. */
export function openProject(project, trigger) {
  const facts = [
    fact('My role', project.role),
    project.subject ? fact('Subject', project.subject) : null,
    project.achievement ? fact('Achievement', project.achievement) : null,
  ];

  openDialog({
    title: project.title,
    subtitle: [project.type, project.date].filter(Boolean).join(' · '),
    trigger,
    content: [
      // The screenshots and the team photos are turned one page at a time, so the popup stays short
      createSlider([...project.screenshots, ...(project.photos ?? [])], project.title),
      el('p', { class: 'dialog__overview', text: project.overview }),
      el('dl', { class: 'meta' }, facts.filter(Boolean)),
      tagBlock('Tech stack', project.techStack),
      tagBlock('Design tools', project.designTools),
      listBlock('Key contributions', project.contributions),
      listBlock('Key features', project.features),
      listBlock('Project documentation', project.documentation),
      project.highlight ? block('Project highlight', el('p', { class: 'achievement' }, icon('award', 22), project.highlight)) : null,
      el('a', { class: 'btn btn--secondary btn--small dialog__full', href: projectUrl(project.id) }, 'Open full page', icon('external', 16)),
    ],
  });
}
