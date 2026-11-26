export const profile = {
  name: 'Vheejay Delacruz Sugay',
  initials: 'VS',
  photo: 'assets/profile.jpg', // null shows the initials instead
  // shown on the back of the portrait when it is clicked. remove the line to turn the flip off
  photoBack: {
    src: 'assets/profile-barong.jpg',
    alt: 'Portrait of Vheejay Delacruz Sugay in a barong',
    caption: 'In barong',
  },
  roles: ['Junior IT Specialist'],
  // the small label above the name. remove the line to hide it
  status: 'Open to work',
  verse: { text: 'Commit your work to the Lord.', reference: 'Proverbs 16:3' },
  // personal statement in the hero, under the verse
  quote: {
    text: 'Success, for me, is about what you have done to help others, your community, and your family to improve their lives. It’s not about having the things that I have. It’s about making them proud as time goes by and creating a positive change in their lives. That, for me, is the true meaning of success. You are successful because you helped them on their journey and contributed to their growth and achievements.',
    author: 'Vheejay Sugay',
  },
  location: 'Caloocan City',
  email: 'sugayvheejay7@gmail.com',
  phone: '0919-764-3393',
  phoneHref: '+639197643393',
  linkedin: {
    label: 'Vheejay Sugay',
    url: 'https://www.linkedin.com/in/vheejay-sugay-ab219a398/',
  },
  // put the real GitHub url here, null shows a placeholder
  github: { label: 'JayAncoraimparo24', url: 'https://github.com/JayAncoraimparo24' },
  // the resume (one page). the Resume button shows image in a popup with a download button, Contact has a Download link. null hides both
  // to change the words edit tools/resume-source.html and save the PDF and the picture over these two files
  resume: { url: 'assets/resume/Vheejay-Sugay-Resume.pdf', image: 'assets/resume/Vheejay-Sugay-Resume.webp' },
  summary:
    'Information Technology professional with experience in IT assistance, web development, and UI/UX. Builds user-friendly websites and writes technical documentation. Has led IT team projects and works well with different teams. Communicates in both English and Filipino. Fast learner, detail-oriented, adaptable, and responsible, with a willingness to learn new technologies.',
};

// same order as the sections on the page, so the links and the scrolling follow each other
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
