import { setActiveNavLink } from '../components/navbar.js';

// a section is the current one once its top goes above this line (just under the navbar)
const LINE = 120;

// highlight the navbar link of the section that is at the top of the screen
export function initScrollSpy() {
  const sections = [...document.querySelectorAll('section[data-nav]')];
  if (!sections.length) return;

  let waiting = false;

  function update() {
    waiting = false;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= LINE) current = section;
    });
    // at the very bottom the last section wins, even if it is too short to reach the line
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) current = sections[sections.length - 1];
    setActiveNavLink(current.dataset.nav);
  }

  window.addEventListener(
    'scroll',
    () => {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  window.addEventListener('resize', update);
  update();
}
