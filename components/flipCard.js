import { el } from '../js/dom.js';
import { isEditing } from '../js/editStorage.js';

const FLIPPED_CLASS = 'is-flipped';

// front and back face in a card that flips on click, tap or Enter/Space
// flipping is off while editing (a click there replaces the picture)
export function createFlipCard({ front, back, label, hint }) {
  const hintNode = el('span', { class: 'flip-card__hint', text: hint });
  const card = el(
    'div',
    { class: 'flip-card', role: 'button', tabindex: '0', 'aria-pressed': 'false', 'aria-label': label },
    el('div', { class: 'flip-card__inner' }, front, back),
    hintNode,
  );

  const toggle = () => {
    if (isEditing()) return;
    const flipped = card.classList.toggle(FLIPPED_CLASS);
    card.setAttribute('aria-pressed', String(flipped));
  };

  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggle();
  });
  return card;
}
