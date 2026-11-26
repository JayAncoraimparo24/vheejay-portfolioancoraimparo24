export const projects = [
  {
    id: 'rbm-motorparts',
    number: '01',
    cover: 'assets/images/rbm/login.jpg', // picture on the project card
    // Same title as the capstone paper.
    title: 'Development of a Web Application Sales & Inventory System for RBM Motorparts, Accessories, & Services',
    type: 'Capstone Project · Team Collaboration',
    role: 'Lead UI/UX Designer, Front-End Developer, Manual QA Tester & Technical Documentation',
    date: 'January 2025 – May 2026',
    overview:
      'A web-based sales and inventory system developed to streamline sales transactions, product management, inventory monitoring, and business reporting.',
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
    designTools: ['Figma', 'Canva', 'Adobe Photoshop'],
    features: [
      'Login with user authentication.',
      'Dashboard with a monthly executive summary: products, low stock, out of stock, defective units, sales revenue, units sold, gross profit, and service profits.',
      'Product and inventory management: add, stock in, edit, adjust, defective units, and delete.',
      'Barcode-enabled sales transactions with automatic receipts.',
      'Service transactions.',
      'Refund processing from order details.',
      'Supplier records.',
      'Employee account management.',
      'User accounts with two-factor authentication.',
      'Sales, services, and inventory reports in PDF for a chosen date range.',
      'History of product and sales activity.',
      'System log with filters by user role, module, action type, and date.',
      'Data backup.',
    ],
    contributions: [
      'Designed 9 system interfaces and supported front-end implementation.',
      'Prepared complete SDLC documentation (Chapters I–V).',
      'Created 5 system diagrams and a 19-table data dictionary.',
      'Conducted manual testing, debugging, and system refinement.',
      'Contributed to software quality evaluation using ISO/IEC 25010.',
    ],
    highlight: 'Evaluated using ISO/IEC 25010, achieving an Overall Mean Rating of 5.0 (Acceptable).',
    // Optional: photos of the team and the presentation.
    photos: [
      { src: 'assets/images/rbm/defense-team-1.jpg', caption: 'Capstone 1 Defense' },
      { src: 'assets/images/rbm/defense-team-2.jpg', caption: 'Capstone 2 Defense' },
    ],
    // Screenshots taken from the capstone documentation.
    screenshots: [
      { src: 'assets/images/rbm/dashboard.png', caption: 'Dashboard: monthly executive summary' },
      { src: 'assets/images/rbm/login.jpg', caption: 'Login page' },
      { src: 'assets/images/rbm/products.png', caption: 'Products page and Add Product form' },
      { src: 'assets/images/rbm/sales-checkout.png', caption: 'Sales: barcode checkout' },
      { src: 'assets/images/rbm/refund-order-details.png', caption: 'Order details and refund' },
      { src: 'assets/images/rbm/history.png', caption: 'History: product activity' },
      { src: 'assets/images/rbm/report-generation.png', caption: 'Report generation page' },
      { src: 'assets/images/rbm/inventory-report.png', caption: 'Generated inventory report (PDF)' },
      { src: 'assets/images/rbm/system-log.png', caption: 'System log' },
    ],
  },
  {
    id: 'seafood-price-tracking',
    number: '02',
    cover: 'assets/images/seafood/home.jpg',
    title: 'Local Seafood Market Price Monitoring System',
    type: 'Hackathon Project · Team Collaboration',
    role: 'UI/UX Designer & Presenter',
    date: 'April 2025',
    overview:
      'An interactive website that allows Filipinos to check updated seafood prices online. It provides daily price updates for different types of fish and mollusks, making it easier for users to monitor seafood prices.',
    achievement: 'Top 5 Finalist — GENNOTECH Creativity Hackathon 2025',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    designTools: ['Figma', 'Canva', 'Adobe Photoshop'],
    features: [
      'Seafood price list with search, location filter, and sorting options.',
      'Seafood details displaying Tagalog, English, and scientific names, along with short descriptions.',
      'Daily seafood price updates with the date of the latest update.',
      'Separate pages for Home, Description, Prices, and About.',
    ],
    contributions: [
      'Designed 8 mobile and web interfaces.',
      'Helped design the website layout and seafood price-tracking features.',
      'Tested more than 5 key system features.',
      'Collaborated with a 3-member team to develop the platform.',
      'Presented the website to the hackathon judges.',
    ],
    highlight: 'Recognized as a Top 5 Finalist in the GENNOTECH Creativity Hackathon 2025.',
    // Screens of the website (cropped from the design view) and the hackathon poster.
    screenshots: [
      { src: 'assets/images/seafood/home.jpg', caption: 'Home page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/prices.jpg', caption: 'Prices page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/price-detail.jpg', caption: 'Fish details pop-up', ratio: '818 / 453' },
      { src: 'assets/images/seafood/description.jpg', caption: 'Description page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/about.jpg', caption: 'About page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/gennotech-poster.jpg', caption: 'GENNOTECH hackathon poster', ratio: '1200 / 1604' },
    ],
  },
  {
    id: 'automated-itemization-system',
    number: '03',
    cover: 'assets/images/ais/user-manual-cover.jpg',
    title: 'Automated Itemization System (AIS)',
    type: 'Academic Project · System Integration Architecture',
    role: 'UI/UX Designer · Manual QA Tester · Technical Documentation · Hardware Installation',
    date: '2024–2025',
    subject: 'System Integration Architecture',
    overview:
      'An inventory management system designed to help users track products, monitor item quantities, update prices, and generate monthly reports. The system also uses a barcode scanner to support product identification and inventory management.',
    techStack: [],
    designTools: [],
    features: [
      'Product tracking and inventory management.',
      'Product quantity monitoring.',
      'Product price updating.',
      'Monthly report generation.',
      'Barcode scanning for product identification.',
    ],
    contributions: [
      'Designed the front and back covers and page layouts of the AIS User Manual.',
      'Created step-by-step instructions to guide users in operating the system.',
      'Prepared technical documentation covering system workflows, requirements, and functionalities.',
      'Created 5 system diagrams and flowcharts.',
      'Conducted manual testing to check system functions.',
      'Assisted in hardware installation and barcode scanner setup.',
    ],
    documentation: [
      'AIS User Manual design and layout.',
      'Step-by-step user instructions.',
      '5 system diagrams and flowcharts.',
      'Technical documentation of system workflows and requirements.',
    ],
    highlight:
      'Combined inventory management functions with barcode scanning and hardware setup, supported by a user manual and technical documentation.',
    // `ratio` is width / height of each picture, so tall photos aren't squeezed into a wide box.
    screenshots: [
      { src: 'assets/images/ais/user-manual-cover.jpg', caption: 'User manual: front cover', ratio: '1236 / 1600' },
      { src: 'assets/images/ais/user-manual-back-cover.jpg', caption: 'User manual: back cover', ratio: '1236 / 1600' },
      { src: 'assets/images/ais/user-manual-printed.jpg', caption: 'Printed user manual: title page and cover', ratio: '1200 / 1600' },
      { src: 'assets/images/ais/mobile-menu.jpg', caption: 'System menu on mobile', ratio: '920 / 1600' },
      { src: 'assets/images/ais/add-product-scanner.jpg', caption: 'Barcode scanner and laptop running the system', ratio: '1200 / 1600' },
      { src: 'assets/images/ais/demo-table.jpg', caption: 'Barcode scanner, laptop, and printed manuals', ratio: '1200 / 1600' },
    ],
  },
  {
    id: 'portfolio-website',
    number: '04',
    cover: 'assets/images/portfolio/home.jpg',
    title: 'Personal Portfolio Website',
    type: 'Personal Project · Portfolio Website',
    role: 'UI/UX Designer & Front-End Developer',
    date: 'November 2026 – Present',
    overview:
      'A responsive personal website that brings my profile, work experience, projects, resume, and creative work together in one place. It is built with plain HTML, CSS, and JavaScript, with no framework, and is published online with GitHub Pages.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Git & GitHub'],
    designTools: [],
    features: [
      'Sections for About, Education, Skills, Work Experience, Project Experience, Work Gallery, and Contact.',
      'A popup and a separate page for every project, with screenshots, tech stack, features, and contributions.',
      'Work Gallery with tabs for UI/UX Design, Graphic Design, Photography, and IT Support, with a picture viewer and a video.',
      'Resume popup with a one-page preview and a PDF download.',
      'Light and dark theme, and a layout that fits phones and computers.',
      'Portrait that flips to a second photo and can be enlarged.',
      'Loading screen, scroll animations, a progress bar, and a menu that highlights the current section.',
      'Contact form that prepares the message and sends it through Gmail or the email app, or copies it.',
      'Popups, the picture viewer, and the menu can be used with the keyboard, and pictures have text descriptions.',
      'All text is kept in separate data files, so the content can be updated without changing the layout code.',
    ],
    contributions: [
      'Designed the layout, colors, and the light and dark themes.',
      'Planned the structure and prepared the content for every section.',
      'Built the pages with HTML, CSS, and JavaScript, with no framework.',
      'Tested on phone and computer sizes, and fixed spacing, alignment, and text problems.',
      'Published the site on GitHub Pages and kept it updated with Git and GitHub Desktop.',
    ],
    highlight: 'Published online with GitHub Pages, so my resume, projects, and gallery are in one link for employers.',
    // `ratio` is width / height of each picture. The first item is a screen recording of the whole site.
    screenshots: [
      {
        src: 'assets/images/portfolio/tour-poster.jpg',
        video: 'assets/videos/portfolio/website-tour.mp4',
        caption: 'Website tour (screen recording)',
      },
      { src: 'assets/images/portfolio/home.jpg', caption: 'Home page: portrait, introduction, and links', ratio: '1280 / 800' },
      { src: 'assets/images/portfolio/experience.jpg', caption: 'Work Experience', ratio: '1280 / 800' },
      { src: 'assets/images/portfolio/projects.jpg', caption: 'Project Experience cards', ratio: '1280 / 800' },
      { src: 'assets/images/portfolio/gallery.jpg', caption: 'Work Gallery with its four tabs', ratio: '1280 / 800' },
      { src: 'assets/images/portfolio/resume-popup.jpg', caption: 'Resume popup with PDF download', ratio: '1280 / 800' },
      { src: 'assets/images/portfolio/dark-mode.jpg', caption: 'Dark mode', ratio: '1280 / 800' },
      { src: 'assets/images/portfolio/mobile-home.jpg', caption: 'Phone view: home', ratio: '780 / 1560' },
      { src: 'assets/images/portfolio/mobile-experience.jpg', caption: 'Phone view: Work Experience', ratio: '780 / 1560' },
    ],
  },
  // Taken out for now. To show it again, remove the "//" in front of each line below
  // (the `screenshots` helper at the very bottom is part of it).
  // {
  //   id: 'peso-wifi-system',
  //   number: '05',
  //   title: 'PESO WiFi System',
  //   type: 'Ongoing project',
  //   role: 'UI/UX Design, Front-End Development, System Development Support',
  //   date: 'Ongoing',
  //   overview:
  //     'A community-based public WiFi management platform. This project is still in progress, so features, tools, and results will be added once it is completed.',
  //   techStack: [],
  //   designTools: [],
  //   features: [],
  //   contributions: [],
  //   screenshots: screenshots(3, 'Screenshot'),
  // },
];

// Used by the PESO WiFi project above: placeholder screenshots until real pictures are added.
// const screenshots = (count, label) =>
//   Array.from({ length: count }, (_, index) => ({ src: null, caption: `${label} ${index + 1}` }));
