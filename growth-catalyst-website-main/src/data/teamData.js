const base = import.meta.env.BASE_URL;

export const teamMembers = [
  {
    id: 'lorenzo-francisco',
    name: 'Lorenzo Francisco',
    role: 'Founder & Growth Operations Strategist',
    image: `${base}lorenzo.jpeg`,
    tagline: 'Architecting high-growth systems and operational infrastructure for modern enterprises.',
    bio: 'Lorenzo Francisco is the Founder and Growth Operations Strategist at Growth Catalyst Global. With extensive experience in organizational scaling, process optimization, and growth strategy, Lorenzo specializes in turning complex operational challenges into streamlined engines for sustainable revenue. He believes that true growth occurs at the intersection of robust operational frameworks, empowered talent, and data-backed execution.',
    bibliography: [
      'Founded Growth Catalyst Global to empower businesses with scalable growth systems and strategic clarity.',
      'Pioneered proprietary Growth Operations (GrowthOps) methodologies integrating marketing, sales, and operations.',
      'Advised and scaled operations for high-growth ventures across technology, professional services, and e-commerce.',

    ],
    expertise: [
      'Growth Operations & Architecture',
      'Strategic Business Scaling',
      'Process & Workflow Automation',
      'Revenue Engine Optimization',
      'Executive & Organizational Leadership'
    ],
    quote: 'Growth isn\'t just about moving fast, it\'s about building resilient systems that allow high performance to be repeatable and sustainable.',
    education: 'Automation & SEO Specialist',
    experienceYears: '2 years Experience',
    linkedin: 'https://linkedin.com',
    email: 'lorenzo@growthcatalyst.studio'
  },
  {
    id: 'lyka-bernandez',
    name: 'Angelika Bernadez',
    role: 'Growth Catalyst Brand Specialist',
    image: `${base}lyka.jpeg`,
    tagline: 'Clarity in operations. Creativity in content. Confidence in growth.',
    bio: 'Angelika Bernadez is the reliable backend support behind organized operations and consistent content at Growth Catalyst. Combining administrative precision with a creative eye, Angelika helps startups, small businesses, and solo entrepreneurs stay organized, produce impactful content, and streamline digital workflows, using AI-assisted tools alongside careful human review to keep every output accurate and on-brand.',
    bibliography: [
      'Organized 10,000+ TikTok affiliate profiles and generated 8,165+ creator leads through research and data management.',
      'Delivered administrative, creative, and workflow support across e-commerce, coaching, architecture, and agency clients.',
      'Produced graphics, presentations, newsletters, and marketing materials while improving workflows to reduce repetitive tasks without sacrificing accuracy or quality.'
    ],
    expertise: [
      'Brand Operations & Support',
      'Creative Content & Graphics',
      'Workflow & Process Optimization',
      'Data Research & Lead Generation',
      'AI-Assisted Content Production'
    ],
    quote: 'I believe AI works best when combined with human judgment and creativity, using it to support research and content, then applying critical thinking to make sure the final output is accurate, relevant, and aligned with each client\'s goals.',
    education: 'B.F.A. in Advertising Arts',
    experienceYears: '3+ Years Experience',
    linkedin: 'https://linkedin.com',
    email: 'angelika@growthcatalyst.studio'
  },
  {
    id: 'kevin-nacague',
    name: 'Kevin Nacague',
    role: 'Business Development Specialist',
    image: `${base}Kevin.jpeg`,
    tagline: 'Efficient systems and clear communication are the foundation of any business that runs smoothly behind the scenes.',
    bio: 'Kevin Nacague is a Freelance Video Editor and Operations Manager who keeps client operations running smoothly from behind the scenes. He manages customer support, oversees email and communication systems, and coordinates with suppliers to keep the day-to-day moving backed by hands-on Shopify management experience. His creative background in video editing brings a unique blend of operational precision and creative execution to every project.',
    bibliography: [
      'Managed customer support operations and email/communication systems across multiple client accounts.',
      'Coordinated with suppliers to keep day-to-day business operations running smoothly.',
      'Combined hands-on Shopify management with a video editing background to deliver both operational and creative support.'
    ],
    expertise: [
      'Operations Management & Systems',
      'Customer Support & Communication',
      'Shopify & E-Commerce Management',
      'Supplier Coordination & Logistics',
      'Creative Video Editing & Production'
    ],
    quote: 'The best operations are the ones clients never have to think about clear systems, responsive support, and everything running on time.',
    education: ' Virtual Assistant & Operations Specialist | Video Editing.',
    experienceYears: '2+ Years Experience',
    linkedin: 'https://linkedin.com',
    email: 'kevin@growthcatalyst.studio'
  },
  {
    id: 'jeune-senarlo',
    name: 'Jeune Senarlo',
    role: 'Client Success & Operation Specialist',
    image: `${base}jenu.jpeg`,
    tagline: 'Support. Solve. Improve.',
    bio: 'Jeune Senarlo is the reliable customer support behind Growth Catalyst\'s client operations. With a service-oriented foundation from hospitality and hands-on e-commerce experience, Jeune handles order concerns, returns, and refunds with care, while building the tracking systems that turn customer feedback into real operational improvement.',
    bibliography: [
      'Managed end-to-end customer concerns including returns, refunds, exchanges, and replacements for an e-commerce business.',
      'Tracked orders and delivered logistics updates using Shopify and 17Track, following up on unresolved issues until completion.',
      'Built complaint tracking systems to identify recurring product, logistics, and CX issues, providing business owners with actionable customer feedback.'
    ],
    expertise: [
      'Client Success & Support',
      'E-Commerce Operations & Logistics',
      'Order Resolution & Returns Management',
      'Shopify & Tracking Systems',
      'Customer Experience (CX) Optimization'
    ],
    quote: 'Great customer support isn\'t just answering questions, it\'s resolving issues, documenting the pattern, and using it to make the whole experience better next time.',
    education: 'Customer Experience Specialist',
    experienceYears: '1+ Year Experience',
    linkedin: 'https://linkedin.com',
    email: 'jeune@growthcatalyst.studio'
  },
  {
    id: 'kristoffer-layos',
    name: 'Kristoffer Layos',
    role: 'Web Developer Specialist',
    image: `${base}layos.jpeg`,
    tagline: 'Building digital experiences that drive growth and deliver results.',
    bio: 'Kristoffer Layos is the Web Developer Specialist at Growth Catalyst Global. With a strong foundation in modern web technologies and a passion for clean, performant code, Kristoffer transforms creative visions into fully functional digital experiences. From responsive landing pages to complex web applications, he ensures every project is built with scalability, speed, and user experience at its core.',
    bibliography: [
      'Designed and developed responsive, high-performance websites and web applications for diverse clients.',
      'Implemented modern front-end architectures using React, JavaScript, and CSS to deliver seamless user experiences.',
      'Collaborated with design and operations teams to translate business requirements into polished digital products.'
    ],
    expertise: [
      'Front-End Web Development',
      'React & JavaScript Applications',
      'Responsive & Mobile-First Design',
      'Web Performance Optimization',
      'UI/UX Implementation'
    ],
    quote: 'Great code is invisible to the user, they just feel the experience. That\'s the standard I build to.',
    education: 'Web Development Specialist | IT Specialist',
    experienceYears: '1+ Year Experience',
    linkedin: 'https://linkedin.com',
    email: 'kristoffer@growthcatalyst.studio'
  }
];

export const getMemberById = (id) => {
  return teamMembers.find(member => member.id === id);
};
