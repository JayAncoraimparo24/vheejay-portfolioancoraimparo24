import { el } from '../js/dom.js';
import { icon } from './icons.js';

const OPEN_BODY_CLASS = 'has-dialog';
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// The popup is built the first time it opens, then reused for every "View" button
let overlay = null;
let panel = null;
let titleNode = null;
let subtitleNode = null;
let body = null;
let closeButton = null;
let opener = null;

/** A titled part of the popup: a small uppercase label, then the content. */
export function block(heading, content) {
  return el('section', { class: 'dialog__block' }, el('h3', { class: 'dialog__heading', text: heading }), content);
}

/** A block with a bullet list, or nothing when the list is empty. */
export function listBlock(heading, items) {
  return items?.length ? block(heading, el('ul', { class: 'bullet-list' }, items.map((text) => el('li', { text })))) : null;
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

  // Clicking the dark area around the popup closes it
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

/**
 * Opens the popup. `content` is a list of elements (empty ones are skipped).
 * `trigger` is the element that gets the focus back when the popup closes.
 * `wide` makes the popup wider.
 */
export function openDialog({ title, subtitle = '', content, trigger, wide = false }) {
  if (!overlay) build();
  opener = trigger;
  // A wide popup is for a whole page, like the resume
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
