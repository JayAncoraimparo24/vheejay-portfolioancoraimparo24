import { el } from './dom.js';
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { createScrollProgress } from '../components/scrollProgress.js';
import { createHero } from '../sections/hero.js';
import { createAbout } from '../sections/about.js';
import { createSkills } from '../sections/skills.js';
import { createProjects } from '../sections/projects.js';
import { createWorkGallery } from '../sections/galleries.js';
import { createExperience, createEducation } from '../sections/experience.js';
import { createContact } from '../sections/contact.js';
import { initReveal } from './reveal.js';
import { initScrollSpy } from './scrollSpy.js';
import { initEditMode } from './editMode.js';
import { initScrollState } from './scrollState.js';
import { finishSplash } from './splash.js';
import { initLightbox } from '../components/lightbox.js';

// Short resume-style page first (about, education, skills, experience, projects), then the work galleries
const SECTION_FACTORIES = [
  createHero,
  createAbout,
  createEducation,
  createSkills,
  createExperience,
  createProjects,
  createWorkGallery,
  createContact,
];

function mountPage() {
  document.body.prepend(createScrollProgress());
  document.getElementById('site-header').replaceWith(createNavbar({ isHome: true }));
  document.getElementById('main').append(...SECTION_FACTORIES.map((create) => create()).filter(Boolean));
  document.getElementById('site-footer').replaceWith(createFooter());
  initReveal();
  initScrollSpy();
  initLightbox();
  initEditMode();
  initScrollState();
  scrollToHash();
  finishSplash();
}

/**
 * The page is built by JavaScript, so the browser can't jump to #projects (or any #section)
 * on its own when coming back from the project page's "Back" link. Do it here, right away.
 */
function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  requestAnimationFrame(() => {
    const top = target.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top, behavior: 'instant' });
  });
}

try {
  mountPage();
} catch (error) {
  console.error('Failed to render the portfolio:', error);
  document.getElementById('main').replaceChildren(
    el('p', { class: 'container error-message', text: 'Something went wrong while loading this page. Please refresh.' }),
  );
}
