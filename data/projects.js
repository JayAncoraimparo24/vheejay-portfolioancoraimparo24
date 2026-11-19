export const projects = [
  {
    id: 'rbm-motorparts',
    number: '01',
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
      'Designed 9 system interfaces and supported frontend implementation.',
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
      'Collaborated with a three-member team to develop the platform.',
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
      'Created five system diagrams and flowcharts.',
      'Conducted manual testing to check system functions.',
      'Assisted in hardware installation and barcode scanner setup.',
    ],
    documentation: [
      'AIS User Manual design and layout.',
      'Step-by-step user instructions.',
      'Five system diagrams and flowcharts.',
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
  // Taken out for now. To show it again, remove the "//" in front of each line below
  // (the `screenshots` helper at the very bottom is part of it).
  // {
  //   id: 'peso-wifi-system',
  //   number: '04',
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
