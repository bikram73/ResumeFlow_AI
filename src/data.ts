import { Candidate, JobDescription } from './types';

export const initialJobDescription: JobDescription = {
  id: 'jd_1',
  title: 'Senior Product Designer & AI Systems Lead',
  company: 'Apex AI Technologies',
  requiredSkills: ['Figma', 'UX Research', 'Design Systems', 'Prototyping', 'User Testing'],
  preferredSkills: ['HTML/CSS', 'Motion Graphics', 'AI/LLM Workflows', 'Design Ops'],
  experienceRequired: '5+ years in Product Design / Design Systems',
  educationRequired: "Bachelor's degree in Design, HCI, CS or equivalent experience",
  responsibilities: [
    'Architect and maintain enterprise design systems across web and mobile platforms',
    'Conduct user research and translate AI capabilities into intuitive interfaces',
    'Collaborate closely with AI researchers, product managers, and frontend developers',
    'Mentor junior designers and establish design guidelines'
  ],
  keywords: ['figma', 'ux', 'systems', 'prototyping', 'research', 'ai', 'design ops', 'leadership'],
  rawText: `Senior Product Designer & AI Systems Lead
Apex AI Technologies - San Francisco, CA

About the Role:
We are seeking a Senior Product Designer with 5+ years of experience to lead design initiatives for our next-generation AI platforms. You will work at the intersection of AI, user experience, and design systems.

Key Responsibilities:
- Architect enterprise-grade design systems used by millions of users.
- Design complex AI workflows and natural language interfaces.
- Conduct qualitative & quantitative user research.
- Lead cross-functional design sprints with PM and AI engineering teams.

Qualifications:
- 5+ years in product design at scale.
- Expert proficiency in Figma, design systems, and rapid prototyping.
- Experience with AI-driven products or generative interfaces preferred.
- B.S./B.A. in Design, HCI, Computer Science or equivalent practical experience.`
};

export const sampleResumesBatch = [
  {
    fileName: 'Alex_Chen_Staff_Designer.pdf',
    fileType: 'pdf',
    text: `Alex Chen - Staff Product Designer
Email: alex.chen@example.com | Phone: (415) 890-1234 | San Francisco, CA
Summary: Staff Designer with 8 years of experience building design systems and AI-assisted workflows at Scale AI and Figma.
Skills: Figma, Design Systems, UX Research, Rapid Prototyping, HTML/CSS, React, AI Interface Design.
Experience:
- Staff Product Designer @ Scale AI (2021 - Present): Led design for enterprise annotation platforms and LLM evaluation tools.
- Senior UX Designer @ Figma (2018 - 2021): Built component library architecture and collaboration tools.
Education: M.S. Human-Computer Interaction, Carnegie Mellon University.
Certifications: Certified Design Systems Architect (2022).`
  },
  {
    fileName: 'Sophia_Vargas_Senior_UX.docx',
    fileType: 'docx',
    text: `Sophia Vargas - Senior Product Designer
Email: sophia.vargas@example.com | San Francisco, CA
Summary: 6 years of experience specializing in mobile product design, user research, and cross-functional leadership.
Skills: Figma, UX Research, User Testing, Wireframing, Micro-interactions, Agile, Jira.
Experience:
- Senior Product Designer @ Airbnb (2020 - Present): Designed host management tools and messaging hub.
- UX Designer @ Lyft (2018 - 2020): Redesigned driver onboarding flow increasing completion by 24%.
Education: B.S. Cognitive Science, UC Berkeley.`
  },
  {
    fileName: 'Marcus_Brody_UI_Engineer.txt',
    fileType: 'txt',
    text: `Marcus Brody - UI/UX Designer & Developer
Email: marcus.brody@example.com | Austin, TX
Summary: 4 years experience blending UI design with frontend prototyping in React and Tailwind.
Skills: Figma, HTML/CSS, React, Tailwind CSS, Motion Graphics, Wireframing.
Experience:
- Product Designer @ Atlassian (2022 - Present): Designed Jira integration widgets.
- Junior Designer @ Design Studio (2020 - 2022): Built marketing landing pages and brand guidelines.
Education: B.A. Digital Media, University of Texas at Austin.`
  }
];

export const initialCandidates: Candidate[] = [
  {
    id: 'c1',
    rank: 1,
    name: 'Sienna Montgomery',
    email: 'sienna.m@example.com',
    phone: '+1 (415) 902-3381',
    role: 'Senior Product Designer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    matchScore: 98,
    skills: ['Figma', 'Design Systems', 'UX Research', 'AI Interfaces', 'Prototyping'],
    missingSkills: ['Deep Learning Theory'],
    experience: '8 Years (Lead)',
    education: 'M.S. Human-Computer Interaction, Stanford',
    status: 'Shortlisted',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDauEYUGTmCtQJ2rMQy3xJUSOAQ_jI6i36JSU8itJx4F7GJDhjejm9UYG451GXOxtLCiGMVu5yevRZsSEd2g5uD9p08-kSFjlIDNM21nInQxi9Gc37YSaGAaBWbH264y20LkyNPs-dC4Rxsh56lQiuC7bdV8TNYW5KAWnGH_1wRgHcNV3DfZcmtK9Lx-F47NWEnMYwwZ5Vl87sCJpmgLA11JRTGLYOm8MALW6GGkQA-_zNLJH-fMP_9uqMhrxq6wNX24AaSvUw5cA',
    topMatch: true,
    aiVerified: true,
    aiSummary: 'Sienna demonstrates exceptional proficiency in systems thinking, high-fidelity prototyping, and AI-assisted workflows. Her recent tenure at Stripe indicates strong capability in managing complex fintech ecosystems.',
    hiringConfidence: 'High',
    overallMatchNumber: 98,
    recommendation: 'Strongly Recommended',
    scores: {
      skillMatch: 98,
      experienceMatch: 96,
      projectMatch: 98,
      educationMatch: 100,
      certificationMatch: 90,
      softSkillsMatch: 95,
      overallScore: 98,
    },
    timeline: [
      { period: '2021 — Present', role: 'Lead Product Designer', company: 'Stripe · Full-time' },
      { period: '2018 — 2021', role: 'Senior UX Designer', company: 'Airbnb · Full-time' },
    ],
    strengths: ['Design Systems Leadership', 'Figma Architecture', 'User Research Methodologies'],
    growthAreas: ['Backend API Integration'],
  },
  {
    id: 'c2',
    rank: 2,
    name: 'Julian Thorne',
    email: 'julian.thorne@example.com',
    phone: '+1 (415) 773-9012',
    role: 'Sr Product Designer',
    company: 'Meta',
    location: 'San Francisco, CA',
    matchScore: 94,
    skills: ['Figma', 'Cross-Platform Systems', 'Mobile Design', 'User Testing'],
    missingSkills: ['Motion Design'],
    experience: '6 Years (Senior)',
    education: 'B.S. Design, UC Berkeley',
    status: 'Shortlisted',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSTrm2uBLQSuWi9ovvWffYUleWBGmQ2MNvqa3bdzz_PNsUoBGnPNaqM9Fk26FXfQPsDAZdUrMlS5Iw8bJQTgZ1MYi1vTk9zHEXGHi24wLIrFq1qTOW6wNT-f2SontECkzCoDsFnqqqWE2WwT1IpZXAnw6PhK1sbZuRPQj2C5q3vqeZgpfrAg4U5FQxN4M8G-F5nA1U3gQc3w4idHibNhdu5BWDrFX6jdtEks0fDlvJDjnvPk1P5WOpyDUcIEX-beuM5N3osS8qxQ',
    topMatch: false,
    aiVerified: true,
    aiSummary: 'Julian brings deep operational design expertise from Meta, specializing in cross-platform design systems and high-throughput mobile application architecture.',
    hiringConfidence: 'High',
    overallMatchNumber: 94,
    recommendation: 'Strongly Recommended',
    scores: {
      skillMatch: 94,
      experienceMatch: 92,
      projectMatch: 95,
      educationMatch: 90,
      certificationMatch: 85,
      softSkillsMatch: 92,
      overallScore: 94,
    },
    timeline: [
      { period: '2020 — Present', role: 'Sr Product Designer', company: 'Meta · Full-time' },
      { period: '2017 — 2020', role: 'UI Designer', company: 'Uber · Full-time' },
    ],
    strengths: ['Design Ops at Scale', 'Mobile UI Architecture', 'Cross-functional Alignment'],
    growthAreas: ['Motion Prototyping'],
  },
  {
    id: 'c3',
    rank: 3,
    name: 'Maya Sterling',
    email: 'maya.s@example.com',
    phone: '+49 151 2345678',
    role: 'Visual Lead & Designer',
    company: 'Framer',
    location: 'Berlin, DE',
    matchScore: 89,
    skills: ['Figma', 'Motion Graphics', 'Interactive Prototyping', 'UI Design'],
    missingSkills: ['Enterprise Research at Scale'],
    experience: '5 Years (Mid-Senior)',
    education: 'B.A. Graphic & Digital Media, Berlin University',
    status: 'Screened',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL4wI2YmiEo27G2gF7axEMflQSeJOZzU4C_xt9H8Lhkj9j-rmqxnmA-bpT8O4AVN3po4BXPibDh3nc9PtwDlXd8TqLl91pXN2S66dh9DuFS9HaHnsByKczrZ_WMzQgQo1ad95FK9PnuKmjh7wmPTq7SUMnj8WrfaPPCH29BhjRz8fHmbS_Oj5vgBKvf-kek5pNiotWk4YFAX5L0douMk9zD2DMqvvf8Lrgca7Ylaeka-W4xG2bExY9SDerxuOFM6zySa9fPOICrw',
    topMatch: false,
    aiVerified: true,
    aiSummary: 'Maya excels in interactive prototyping, brand-driven digital interfaces, micro-interactions, and rapid visual design iterations.',
    hiringConfidence: 'High',
    overallMatchNumber: 89,
    recommendation: 'Recommended',
    scores: {
      skillMatch: 90,
      experienceMatch: 86,
      projectMatch: 92,
      educationMatch: 85,
      certificationMatch: 80,
      softSkillsMatch: 88,
      overallScore: 89,
    },
    timeline: [
      { period: '2021 — Present', role: 'Visual Lead', company: 'Framer · Full-time' },
      { period: '2019 — 2021', role: 'Interactive Designer', company: 'Studio Design · Full-time' },
    ],
    strengths: ['Micro-interactions', 'Brand & Motion', 'Framer / Prototyping'],
    growthAreas: ['Enterprise Workflows'],
  },
  {
    id: 'c4',
    rank: 4,
    name: 'Michael Chang',
    email: 'm.chang@example.com',
    phone: '+1 (206) 555-0199',
    role: 'Product Designer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    matchScore: 82,
    skills: ['Figma', 'UX Wireframing', 'Accessibility (a11y)', 'User Research'],
    missingSkills: ['AI Native Interfaces', 'Framer Motion'],
    experience: '4 Years (Mid)',
    education: 'B.S. Informatics, University of Washington',
    status: 'New',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelChang',
    topMatch: false,
    aiVerified: true,
    aiSummary: 'Michael has a strong foundation in enterprise accessibility and user testing. Solid candidate for core product workflows with potential to grow in AI design.',
    hiringConfidence: 'Medium',
    overallMatchNumber: 82,
    recommendation: 'Consider',
    scores: {
      skillMatch: 82,
      experienceMatch: 80,
      projectMatch: 83,
      educationMatch: 88,
      certificationMatch: 75,
      softSkillsMatch: 85,
      overallScore: 82,
    },
    timeline: [
      { period: '2022 — Present', role: 'Product Designer', company: 'Microsoft · Full-time' },
      { period: '2020 — 2022', role: 'Associate UX Designer', company: 'Nordstrom Tech · Full-time' },
    ],
    strengths: ['WCAG Accessibility', 'Enterprise UX', 'Design Documentation'],
    growthAreas: ['Generative AI Patterns', 'Motion Design'],
  }
];

