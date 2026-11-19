// src: null shows a placeholder
// put real images in assets/images and set src to the path

// ui/ux and Figma work. ratio = width / height so nothing is cropped
// GECAR Calendar 2027 frames, exported from the Figma file
// Figma links show as chips above the gallery. set each file to "Anyone with the link can view" or visitors can't open it
export const figmaLinks = [
  {
    label: 'GECAR Calendar 2027',
    url: 'https://www.figma.com/design/InAAuf2NZPtaxlxlmFPmqG/GECAR-Calendar-2027--Souvenir-Design-By--Vheejay-Sugay',
  },
  {
    label: 'Genesis',
    url: 'https://www.figma.com/design/rlpwnRL2JdkJ2pwwNyiK6u',
  },
  {
    label: 'MHIPCOR Calendar 2027',
    url: 'https://www.figma.com/design/mdC5x6YniUIkYJZEvnhhtg/MHIPCOR-2027-Calendar?node-id=0-1&p=f',
  },
];

// Figma links shown as buttons above the Graphic Design gallery (print work).
// To bring the Mug Wraps button back, add this entry:
//   { label: 'View the Mug Wraps in Figma', url: 'https://www.figma.com/design/qbQdtQJVK7wWPJBZ7Qjevn/Untitled?node-id=1-1118' }
export const graphicFigmaLinks = [
  {
    label: 'Company Uniform & Merch Design',
    url: 'https://www.figma.com/design/gZo7pe6sMBaP0vQLP98mbs/Untitled?node-id=0-1&p=f',
  },
];

const calendarFrame = (name, label, ratio) => ({
  title: `GECAR Calendar 2027: ${label}`,
  src: `assets/images/ui-ux/gecar-calendar-${name}.jpg`,
  ratio,
});

export const uiuxShowcase = [
  calendarFrame('cover', 'cover', '514 / 298'),
  calendarFrame('january', 'January', '517 / 364'),
  calendarFrame('february', 'February', '514 / 364'),
  calendarFrame('march', 'March', '517 / 364'),
  calendarFrame('april', 'April', '517 / 364'),
  calendarFrame('may', 'May', '514 / 364'),
  calendarFrame('june', 'June', '517 / 364'),
  calendarFrame('july', 'July', '517 / 364'),
  calendarFrame('august', 'August', '514 / 364'),
  calendarFrame('september', 'September', '517 / 364'),
  calendarFrame('october', 'October', '517 / 364'),
  calendarFrame('november', 'November', '514 / 364'),
  calendarFrame('december', 'December', '514 / 364'),
];

// graphic design works. ratio = width / height
export const graphicDesignShowcase = [
  { title: 'Profile banner', src: 'assets/images/graphics/profile-banner.jpg', ratio: '1400 / 467' },
  { title: 'Business card', src: 'assets/images/graphics/business-card.jpg', ratio: '1224 / 864' },
  { title: 'Matcha Berry poster', src: 'assets/images/graphics/matcha-berry-poster.jpg', ratio: '933 / 1400' },
  { title: 'T-bone steak ad', src: 'assets/images/graphics/tbone-steak-ad.jpg', ratio: '1400 / 904' },
  { title: 'BINI poster', src: 'assets/images/graphics/bini-poster.jpg', ratio: '872 / 1400' },
  { title: 'Bainary Studio poster', src: 'assets/images/graphics/bainary-studio-poster.jpg', ratio: '1400 / 1018' },
  { title: 'Divina Licious logo', src: 'assets/images/graphics/divina-licious-logo.jpg', ratio: '960 / 697' },
  { title: 'Divina Licious booth design', src: 'assets/images/graphics/divina-licious-booth.jpg', ratio: '720 / 551' },
  { title: 'Success quote', src: 'assets/images/graphics/success-quote.jpg', ratio: '933 / 1400' },
  { title: 'OJT cover', src: 'assets/images/graphics/ojt-cover.jpg', ratio: '933 / 1400' },
  { title: 'System Admin and Maintenance cover', src: 'assets/images/graphics/system-admin-cover.jpg', ratio: '933 / 1400' },
  { title: 'Line-art portrait 1', src: 'assets/images/graphics/line-art-portrait-1-clean.jpg', ratio: '928 / 1152' },
  { title: 'Line-art portrait 2', src: 'assets/images/graphics/line-art-portrait-2-clean.jpg', ratio: '928 / 1152' },
  { title: 'Open to work banner', src: 'assets/images/graphics/open-to-work-banner.webp', ratio: '2000 / 667' },
  { title: 'Birthday cartoon portrait', src: 'assets/images/graphics/birthday-cartoon.webp', ratio: '1086 / 1448' },
  { title: 'Varsity jacket portrait', src: 'assets/images/graphics/varsity-portrait.webp', ratio: '991 / 1587' },
  { title: 'Cry for Justice poster', src: 'assets/images/graphics/cry-for-justice-poster.jpg', ratio: '1414 / 2000' },
  { title: 'Mug Wrap: GECAR Machine Solutions', src: 'assets/images/graphics/mug-wrap-gecar.jpg', ratio: '2000 / 1535' },
  { title: 'Mug Wrap: MHIPCOR', src: 'assets/images/graphics/mug-wrap-mhipcor.jpg', ratio: '2000 / 1535' },
  { title: 'Mug Wrap: Genesis Hydraulics', src: 'assets/images/graphics/mug-wrap-genesis.jpg', ratio: '2000 / 1535' },
];

// photos by Vheejay, add more here
// ratio = width / height
export const photographyShowcase = [
  { title: 'Sunset', src: 'assets/images/photography/sunset.jpg', ratio: '3 / 4' },
  { title: 'Sunset over the road', src: 'assets/images/photography/city-sunset.jpg', ratio: '1 / 1' },
  { title: 'Mountain view', src: 'assets/images/photography/mountain.jpg', ratio: '1600 / 670' },
  { title: 'Snail', src: 'assets/images/photography/snail.jpg', ratio: '3 / 4' },
  { title: 'Pendant lamps', src: 'assets/images/photography/pendant-lamps.jpg', ratio: '1 / 1' },
  { title: 'Pendant lamps in low light', src: 'assets/images/photography/pendant-lamps-low-light.jpg', ratio: '1 / 1' },
  { title: 'Woven pendant lamps', src: 'assets/images/photography/woven-pendant-lamps.jpg', ratio: '1 / 1' },
];

// IT support photos. ratio = width / height
// (the ID badge in the laptop photo is pixelated on purpose)
export const itSupportShowcase = [
  { title: 'Laptop opened for hardware maintenance', src: 'assets/images/it-support/laptop-internals.jpg', ratio: '1400 / 1050' },
  { title: 'Network rack with switches and patch panels', src: 'assets/images/it-support/network-rack.jpg', ratio: '1050 / 1400' },
  { title: 'Printer ink system and print head maintenance', src: 'assets/images/it-support/printer-ink-system.jpg', ratio: '1050 / 1400' },
  { title: 'Refilling a printer ink tank', src: 'assets/images/it-support/printer-ink-refill.jpg', ratio: '1050 / 1400' },
  { title: 'At the server room network rack', src: 'assets/images/it-support/server-room-workstation.jpg', ratio: '1400 / 1050' },
  { title: 'Server room cabling', src: 'assets/images/it-support/server-room-cabling.jpg', ratio: '1400 / 1050' },
  { title: 'Monitor on a mounting arm', src: 'assets/images/it-support/monitor-mount.jpg', ratio: '1050 / 1400' },
  { title: 'CCTV camera and its live feed on a monitor', src: 'assets/images/it-support/cctv-camera-feed.jpg', ratio: '1050 / 1400' },
  { title: 'CCTV camera with its power and video cables', src: 'assets/images/it-support/cctv-camera-cables.jpg', ratio: '1050 / 1400' },
  { title: 'Network cable wired to a DC power connector', src: 'assets/images/it-support/cable-dc-connector.jpg', ratio: '1050 / 1400' },
  { title: 'Video balun and CCTV cabling on the work table', src: 'assets/images/it-support/balun-cabling-table.jpg', ratio: '1050 / 1400' },
  { title: 'Video balun and DC connector wired to a network cable', src: 'assets/images/it-support/video-balun-wiring.jpg', ratio: '1050 / 1400' },
  { title: 'At my workstation', src: 'assets/images/it-support/workstation.jpg', ratio: '1400 / 1050' },
  // short video, no sound, last in the list so it only shows in the popup
  // src is its cover picture. the ID badge in the video is pixelated on purpose
  {
    title: 'Refilling a printer ink tank with a syringe (video)',
    src: 'assets/images/it-support/printer-ink-refill-video.jpg',
    video: 'assets/videos/it-support/printer-ink-refill.mp4',
    ratio: '540 / 960',
  },
];

// Short descriptions shown with each part of the Work Gallery (on the page and in its popup).
// They only use what the picture titles say. Change the wording here any time.
export const showcaseDescriptions = {
  uiux: 'Calendar designs made in Figma. The 2027 GECAR souvenir calendar is shown here, with a cover and a page for each month. The Figma files are in the popup.',
  graphic:
    'A mix of print and social media designs: posters, ads, banners, a business card, logos, booth design, covers, portraits, and mug wraps for GECAR, MHIPCOR, and Genesis. The company uniform and merch design is in Figma.',
  photography: 'Photos taken by Vheejay: sunsets, a mountain view, a snail, and pendant lamps.',
  itSupport:
    'Hands-on IT support work in photos and video: laptop hardware maintenance, network racks and server room cabling, CCTV camera wiring, printer ink system maintenance and refilling, and monitor mounting.',
};
