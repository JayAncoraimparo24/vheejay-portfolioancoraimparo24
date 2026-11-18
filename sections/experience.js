import { el } from '../js/dom.js';
import { experience, education } from '../data/experience.js';
import { createSection } from '../components/section.js';
import { timelineItem } from '../components/timelineItem.js';

export function createExperience() {
  return createSection(
    { id: 'experience', title: 'Work Experience', iconName: 'briefcase', narrow: true },
    el('div', { class: 'timeline' }, experience.map(timelineItem)),
  );
}

export function createEducation() {
  const details = education.details.map(({ label, value }) =>
    el('li', {}, el('strong', { text: `${label}: ` }), el('span', { text: value })),
  );

  return createSection(
    { id: 'education', nav: 'about', title: 'Education', iconName: 'education', narrow: true },
    el(
      'article',
      { class: 'education' },
      el('h3', { class: 'education__school', text: education.school }),
      el('p', { class: 'education__degree', text: education.degree }),
      el('p', { class: 'education__meta', text: `${education.period} · ${education.location}` }),
      el('ul', { class: 'bullet-list' }, details),
    ),
  );
}
