import { el } from '../js/dom.js';
import { uiuxShowcase, figmaLinks, graphicFigmaLinks, graphicDesignShowcase, photographyShowcase, itSupportShowcase } from '../data/showcases.js';
import { createSection } from '../components/section.js';
import { createTabs } from '../components/tabs.js';
import { icon } from '../components/icons.js';
import { createSlider } from '../components/slider.js';
import { thumbOf } from '../js/config.js';

/**
 * Each kind of work is shown one picture at a time, with a row of small pictures under it to jump around.
 * The page shows a small copy of the picture, and the full picture opens when it is clicked.
 */
const createGallery = (items, label) =>
  createSlider(
    items.map(({ title, src }) => ({ src, thumb: thumbOf(src), caption: title })),
    label,
    { thumbs: true },
  );

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
      eyebrow: 'Gallery',
      title: 'Work Gallery',
      intro: 'Design, photography, and IT support work. Pick a tab to browse.',
      tone: 'tint',
    },
    createTabs({
      label: 'Work categories',
      tabs: [
        {
          id: 'ui-ux-showcase',
          label: 'UI/UX Design',
          icon: 'layout',
          content: [createFigmaButtons(figmaLinks), createGallery(uiuxShowcase, 'UI/UX design')],
        },
        {
          id: 'graphic-design',
          label: 'Graphic Design',
          icon: 'palette',
          content: [createFigmaButtons(graphicFigmaLinks), createGallery(graphicDesignShowcase, 'Graphic design')],
        },
        { id: 'photography', label: 'Photography', icon: 'camera', content: createGallery(photographyShowcase, 'Photography') },
        { id: 'it-support-showcase', label: 'IT Support', icon: 'headset', content: createGallery(itSupportShowcase, 'IT support') },
      ],
    }),
  );
}
