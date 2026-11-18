import { el } from '../js/dom.js';
import { projectUrl } from '../js/config.js';
import { icon } from './icons.js';
import { createSlider } from './slider.js';
import { tagList } from './tag.js';

const OPEN_BODY_CLASS = 'has-dialog';
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// The popup is built the first time a project is opened, then reused
let overlay = null;
let panel = null;
let title = null;
let meta = null;
let body = null;
let closeButton = null;
let opener = null;

function block(heading, content) {
  return el('section', { class: 'dialog__block' }, el('h3', { class: 'dialog__heading', text: heading }), content);
}

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

function fill(project) {
  title.textContent = project.title;
  meta.textContent = [project.type, project.date].filter(Boolean).join(' · ');

  const facts = [
    fact('My role', project.role),
    project.subject ? fact('Subject', project.subject) : null,
    project.achievement ? fact('Achievement', project.achievement) : null,
  ];

  body.replaceChildren(
    // The screenshots and the team photos are turned one page at a time, so the popup stays short
    createSlider([...project.screenshots, ...(project.photos ?? [])], project.title),
    el('p', { class: 'dialog__overview', text: project.overview }),
    el('dl', { class: 'meta' }, facts),
    tagBlock('Tech stack', project.techStack),
    tagBlock('Design tools', project.designTools),
    listBlock('Key contributions', project.contributions),
    listBlock('Key features', project.features),
    listBlock('Project documentation', project.documentation),
    project.highlight ? block('Project highlight', el('p', { class: 'achievement' }, icon('award', 22), project.highlight)) : null,
    el('a', { class: 'btn btn--secondary btn--small dialog__full', href: projectUrl(project.id) }, 'Open full page', icon('external', 16)),
  );
  body.scrollTop = 0;
}

function close() {
  overlay.hidden = true;
  document.body.classList.remove(OPEN_BODY_CLASS);
  opener?.focus({ preventScroll: true });
}

/** Keeps Tab and Shift+Tab inside the popup while it is open. */
function keepFocusInside(event) {
  const items = [...panel.querySelectorAll(FOCUSABLE)];
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function build() {
  title = el('h2', { class: 'dialog__title', id: 'project-dialog-title' });
  meta = el('p', { class: 'dialog__meta' });
  body = el('div', { class: 'dialog__body' });
  closeButton = el('button', { class: 'dialog__close', type: 'button', 'aria-label': 'Close', on: { click: close } }, icon('close', 18));
  panel = el(
    'div',
    { class: 'dialog__panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'project-dialog-title' },
    el('header', { class: 'dialog__header' }, el('div', {}, title, meta), closeButton),
    body,
  );
  overlay = el('div', { class: 'dialog', hidden: true }, panel);
  document.body.append(overlay);

  // A click on the dark area around the popup closes it
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener('keydown', (event) => {
    // While the full-screen picture viewer is open, its own keys come first
    if (overlay.hidden || event.defaultPrevented || document.querySelector('.lightbox.is-open')) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'Tab') keepFocusInside(event);
  });
}

/** Opens the popup with the details of one project. `trigger` is the element to give focus back to. */
export function openProject(project, trigger) {
  if (!overlay) build();
  opener = trigger;
  fill(project);
  overlay.hidden = false;
  document.body.classList.add(OPEN_BODY_CLASS);
  closeButton.focus();
}
