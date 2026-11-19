// paths from the site root, so they work from index.html and pages/*.html
const SITE_ROOT = new URL('../', import.meta.url);

export const siteUrl = (path) => new URL(path, SITE_ROOT).href;
// small copy of a picture for tiles (assets/thumbs, 640px wide)
// the full one in assets/images opens on click
export const thumbOf = (path) => path?.replace('assets/images/', 'assets/thumbs/').replace(/\.(png|webp|jpe?g)$/i, '.jpg') ?? path;

export const projectUrl =(id) => siteUrl(`pages/project.html?id=${encodeURIComponent(id)}`);
