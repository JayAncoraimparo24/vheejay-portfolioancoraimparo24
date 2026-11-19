# Vheejay Delacruz Sugay – Portfolio

My personal portfolio website. Live site: https://jayancoraimparo24.github.io/vheejay-portfolioancoraimparo24/

It is plain HTML, CSS and JavaScript (ES modules). No build step, no dependencies, no framework.

## Run it on your computer

The site uses ES modules, so it needs a web server. Double-clicking `index.html` will not work.
Use any static server, for example the VS Code "Live Server" extension, or this one from the project folder:

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Folders

| Folder        | What is inside                                                          |
| ------------- | ----------------------------------------------------------------------- |
| `data/`       | All the text and links: profile, skills, experience, projects, galleries |
| `sections/`   | One file for each part of the page (hero, about, skills, and so on)     |
| `components/` | Small reusable pieces: navbar, buttons, popup, slider, tabs, lightbox   |
| `js/`         | Page startup and behavior: loading screen, theme, scroll reveal, edit mode |
| `styles/`     | The CSS, one file for each part of the page                             |
| `pages/`      | The project detail page (`project.html?id=<project id>`)                |
| `assets/`     | Pictures, icons, the resume (PDF and picture), the font, one video      |

`styles/main.css` loads all the other stylesheets in order: tokens and base first, then the
components, then the page sections, then the special cases (dark theme and edit mode).

## Changing the content

Almost everything you read on the site is in `data/`.

- `profile.js` – name, role, contact details, links, resume files
- `skills.js`, `experience.js`, `projects.js` – the resume-style sections
- `showcases.js` – the work galleries (UI/UX, graphic design, photography, IT support)

Put new pictures in `assets/images/` and add an entry in the matching data file with its path.
The small copy used on the page goes in `assets/thumbs/` (same file name, 640px wide).

## Resume

The resume is one page: `assets/resume/Vheejay-Sugay-Resume.pdf`, with a picture of it
(`Vheejay-Sugay-Resume.webp`) that is shown in the popup on the page.

## Credits

- Icons: free icons from Flaticon (flaticon.com)
- Font for the loading screen: Great Vibes, SIL Open Font License (`assets/fonts/GreatVibes-OFL.txt`)
- The logo, the loading screen and everything else were made for this site
