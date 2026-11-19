import { el } from '../js/dom.js';
import {
  uiuxShowcase,
  figmaLinks,
  graphicFigmaLinks,
  graphicDesignShowcase,
  photographyShowcase,
  itSupportShowcase,
  showcaseDescriptions,
} from '../data/showcases.js';
import { createSection } from '../components/section.js';
import { createTabs } from '../components/tabs.js';
import { icon } from '../components/icons.js';
import { createSlider } from '../components/slider.js';
import { openDialog } from '../components/dialog.js';
import { siteUrl, thumbOf } from '../js/config.js';

const PREVIEW_COUNT = 6; // small pictures shown on the page; View opens all of them

/**
 * One kind of work: a short row of small pictures on the page, and a View button.
 * View (or any small picture) opens the popup with the big picture, one at a time, and the row of small ones to jump around.
 * The Figma files of that kind of work (if any) are inside the popup, under the pictures.
 */
function createGallery(items, label, description, figma = []) {
  const pictures = items.map(({ title, src, video }) => ({ src, thumb: thumbOf(src), caption: title, video }));
  const figmaCount = `${figma.length} Figma ${figma.length === 1 ? 'file' : 'files'}`;
  const summary = figma.length ? `${pictures.length} pictures · ${figmaCount}` : `${pictures.length} pictures`;

  const open = (start, trigger) =>
    openDialog({
      title: label,
      subtitle: summary,
      trigger,
      content: [
        createSlider(pictures, label, { thumbs: true, start }),
        el('p', { class: 'dialog__overview', text: description }),
        createFigmaButtons(figma),
      ],
    });

  const previews = pictures.slice(0, PREVIEW_COUNT).map(({ thumb, caption }, index) =>
    el(
      'button',
      {
        class: 'gallery-preview__item',
        type: 'button',
        'aria-label': `Open: ${caption}`,
        title: caption,
        on: { click: (event) => open(index, event.currentTarget) },
      },
      el('img', { src: siteUrl(thumb), alt: '', loading: 'lazy', decoding: 'async' }),
    ),
  );

  // "+7" opens the popup at the first picture that is not shown here
  const hidden = pictures.length - PREVIEW_COUNT;
  if (hidden > 0) {
    previews.push(
      el(
        'button',
        {
          class: 'gallery-preview__item gallery-preview__more',
          type: 'button',
          'aria-label': `Open the other ${hidden} pictures`,
          on: { click: (event) => open(PREVIEW_COUNT, event.currentTarget) },
        },
        `+${hidden}`,
      ),
    );
  }

  return el(
    'div',
    { class: 'gallery-preview' },
    el(
      'div',
      { class: 'gallery-preview__head' },
      el('p', { class: 'gallery-preview__count', text: summary }),
      el(
        'button',
        {
          class: 'btn btn--secondary btn--small',
          type: 'button',
          'aria-label': `View all: ${label}`,
          on: { click: (event) => open(0, event.currentTarget) },
        },
        'View',
      ),
    ),
    el('p', { class: 'gallery-preview__text', text: description }),
    el('div', { class: 'gallery-preview__row' }, previews),
  );
}

/**
 * A row of small, equal chips that open the Figma files in a new tab.
 * Each chip: a design icon on the left, the name, and an "opens in a new tab" arrow on the right.
 */
function createFigmaButtons(links) {
  if (!links.length) return null; // no links yet: show no empty row
  return el(
    'div',
    { class: 'figma-links' },
    el('span', { class: 'figma-links__label', text: 'Figma files' }),
    el(
      'ul',
      { class: 'figma-links__list' },
      links.map(({ label, url }) =>
        el(
          'li',
          {},
          el(
            'a',
            { class: 'figma-chip', href: url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${label} (opens in Figma, new tab)` },
            icon('layout', 16),
            el('span', { text: label }),
            icon('external', 15),
          ),
        ),
      ),
    ),
  );
}

/**
 * One "Work Gallery" section with a tab for each kind of work.
 * The tab ids double as link targets, so #photography etc. open the right tab.
 */
export function createWorkGallery() {
  return createSection(
    {
      id: 'work-gallery',
      nav: 'projects',
      title: 'Work Gallery',
      iconName: 'image',
      narrow: true,
    },
    createTabs({
      label: 'Work categories',
      tabs: [
        {
          id: 'ui-ux-showcase',
          label: 'UI/UX Design',
          icon: 'layout',
          content: createGallery(uiuxShowcase, 'UI/UX Design', showcaseDescriptions.uiux, figmaLinks),
        },
        {
          id: 'graphic-design',
          label: 'Graphic Design',
          icon: 'palette',
          content: createGallery(graphicDesignShowcase, 'Graphic Design', showcaseDescriptions.graphic, graphicFigmaLinks),
        },
        {
          id: 'photography',
          label: 'Photography',
          icon: 'camera',
          content: createGallery(photographyShowcase, 'Photography', showcaseDescriptions.photography),
        },
        {
          id: 'it-support-showcase',
          label: 'IT Support',
          icon: 'headset',
          content: createGallery(itSupportShowcase, 'IT Support', showcaseDescriptions.itSupport),
        },
      ],
    }),
  );
}
