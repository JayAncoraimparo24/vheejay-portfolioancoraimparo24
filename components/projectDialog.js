import { el } from '../js/dom.js';
import { projectUrl } from '../js/config.js';
import { icon } from './icons.js';
import { block, listBlock, openDialog } from './dialog.js';
import { createSlider } from './slider.js';
import { tagList } from './tag.js';

function tagBlock(heading, items) {
  return items?.length ? block(heading, tagList(items)) : null;
}

function fact(label, value) {
  return el('div', { class: 'meta__item' }, el('dt', { text: label }), el('dd', { text: value }));
}

// open the popup with one project's details
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
      // screenshots and team photos one page at a time, keeps the popup short
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
