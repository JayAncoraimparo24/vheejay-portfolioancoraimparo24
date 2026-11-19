import { el } from '../js/dom.js';
import { icon } from './icons.js';

const OPEN_BODY_CLASS = 'has-dialog';
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// built the first time it opens, reused for every View button
let overlay = null;
let panel = null;
let titleNode = null;
let subtitleNode = null;
let body = null;
let closeButton = null;
let opener = null;

export function block(heading, content) {
  return el('section', { class: 'dialog__block' }, el('h3', { class: 'dialog__heading', text: heading }), content);
}

export function listBlock(heading, items) {
  return items?.length ? block(heading, el('ul', { class: 'bullet-list' }, items.map((text) => el('li', { text })))) : null;
}

function close() {
  overlay.hidden = true;
  document.body.classList.remove(OPEN_BODY_CLASS);
  opener?.focus({ preventScroll: true });
}

// keep Tab inside the popup while it is open
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
  titleNode = el('h2', { class: 'dialog__title', id: 'dialog-title' });
  subtitleNode = el('p', { class: 'dialog__meta' });
  body = el('div', { class: 'dialog__body' });
  closeButton = el('button', { class: 'dialog__close', type: 'button', 'aria-label': 'Close', on: { click: close } }, icon('close', 18));
  panel = el(
    'div',
    { class: 'dialog__panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dialog-title' },
    el('header', { class: 'dialog__header' }, el('div', {}, titleNode, subtitleNode), closeButton),
    body,
  );
  overlay = el('div', { class: 'dialog', hidden: true }, panel);
  document.body.append(overlay);

  // a click on the dark area closes it
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener('keydown', (event) => {
    // when the picture viewer is open its keys come first
    if (overlay.hidden || event.defaultPrevented || document.querySelector('.lightbox.is-open')) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'Tab') keepFocusInside(event);
  });
}

// open the popup. content = list of elements (empty ones are skipped)
// trigger gets the focus back on close, wide = wider popup
export function openDialog({ title, subtitle = '', content, trigger, wide = false }) {
  if (!overlay) build();
  opener = trigger;
  // wide is for a whole page, like the resume
  panel.classList.toggle('dialog__panel--wide', wide);
  titleNode.textContent = title;
  subtitleNode.textContent = subtitle;
  subtitleNode.hidden = !subtitle;
  body.replaceChildren(...content.filter(Boolean));
  body.scrollTop = 0;
  overlay.hidden = false;
  document.body.classList.add(OPEN_BODY_CLASS);
  closeButton.focus();
}
