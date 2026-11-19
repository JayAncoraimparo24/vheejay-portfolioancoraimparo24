const SVG_NS = 'http://www.w3.org/2000/svg';

function shape(tag, attributes) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  return node;
}

/**
 * My own mark: a sprout growing out of the hook of a "J" (growth, and J for Vheejay).
 * It is drawn from plain shapes (no font, no stock picture), so it is fully original.
 * Same drawing as vheejay-logo/improved/vheejay-logo-v2-navy.svg.
 *
 * The leaves and the stem take the text color, so the mark follows the light and dark theme.
 * The two thin veins use the page color, so they look cut out of the leaves.
 */
export function createLogo(height = 38) {
  const svg = shape('svg', {
    viewBox: '14 0 182 196',
    width: Math.round((height * 182) / 196),
    height,
    'aria-hidden': 'true',
    focusable: 'false',
  });

  const leaf = (d) => shape('path', { d, fill: 'currentColor' });
  const vein = (d) => shape('path', { d, fill: 'none', stroke: 'var(--color-white)', 'stroke-width': 3, 'stroke-linecap': 'round' });

  svg.append(
    leaf('M100 90 C80 90 44 82 22 44 C60 36 92 58 100 90 Z'),
    leaf('M100 90 C102 46 138 12 186 6 C188 54 152 92 100 90 Z'),
    shape('path', {
      d: 'M100 86 V152 A30 30 0 0 1 70 182 A30 30 0 0 1 40 152',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': 13,
      'stroke-linecap': 'round',
    }),
    vein('M92 83 Q60 74 36 52'),
    vein('M106 82 Q138 58 174 20'),
  );
  return svg;
}
