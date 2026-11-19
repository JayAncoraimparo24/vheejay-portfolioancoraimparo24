import { el } from '../js/dom.js';
import { listBlock, openDialog } from './dialog.js';

const MAX_POINTS = 3; // the page shows the first few points; View shows all of them

function openJob(job, trigger) {
  openDialog({
    title: job.company,
    subtitle: `${job.position} · ${job.period}`,
    trigger,
    content: [
      el(
        'dl',
        { class: 'meta' },
        el('div', { class: 'meta__item' }, el('dt', { text: 'Location' }), el('dd', { text: job.location })),
        job.note ? el('div', { class: 'meta__item' }, el('dt', { text: 'Note' }), el('dd', { text: job.note })) : null,
      ),
      listBlock('Responsibilities', job.responsibilities),
    ],
  });
}

/**
 * One entry in the experience timeline.
 * When a job has no responsibilities listed yet, nothing is shown there (no "to be announced" text).
 * View appears only when there are more points than the page shows.
 */
export function timelineItem(job) {
  const points = job.responsibilities.slice(0, MAX_POINTS);
  const view =
    job.responsibilities.length > MAX_POINTS
      ? el(
          'button',
          {
            class: 'btn btn--secondary btn--small',
            type: 'button',
            'aria-label': `View details: ${job.company}`,
            on: { click: (event) => openJob(job, event.currentTarget) },
          },
          'View',
        )
      : null;

  return el(
    'article',
    { class: 'timeline__item' },
    el(
      'div',
      { class: 'timeline__head' },
      el(
        'div',
        { class: 'timeline__summary' },
        el('p', { class: 'timeline__period', text: job.period }),
        el('h3', { class: 'timeline__title', text: job.company }),
        el('p', { class: 'timeline__meta', text: job.location }),
        el('p', { class: 'timeline__position', text: job.position }),
        job.note ? el('p', { class: 'timeline__note', text: job.note }) : null,
      ),
      view,
    ),
    points.length ? el('ul', { class: 'bullet-list' }, points.map((text) => el('li', { text }))) : null,
  );
}
