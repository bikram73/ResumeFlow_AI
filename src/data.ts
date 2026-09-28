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

export const sampleJobDescriptions: JobDescription[] = [
  initialJobDescription,
  {
    id: 'jd_2',
    title: 'Full-Stack AI Software Engineer',
    company: 'NextGen Autonomous Labs',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    preferredSkills: ['LangChain', 'Vector DBs (Pinecone/Chroma)', 'GraphQL', 'Tailwind CSS', 'AWS'],
    experienceRequired: '4+ years in Full-Stack Web Development & AI APIs',
    educationRequired: "Bachelor's or Master's degree in Computer Science or Software Engineering",
    responsibilities: [
      'Architect resilient frontend and backend services integrating LLM orchestration APIs',
      'Build scalable REST and GraphQL APIs with FastAPI and Node.js microservices',
      'Implement real-time vector search and retrieval-augmented generation (RAG) pipelines',
      'Write clean, modular TypeScript and Python code with rigorous unit and integration tests'
    ],
    keywords: ['react', 'typescript', 'python', 'fastapi', 'llm', 'rag', 'docker', 'postgresql', 'apis'],
    rawText: `Full-Stack AI Software Engineer
NextGen Autonomous Labs - New York, NY (Hybrid)

About the Role:
We are looking for an experienced Full-Stack AI Software Engineer to build scalable customer-facing applications powered by large language models and intelligent automation.

Responsibilities:
- Design and implement modern React/TypeScript user interfaces backed by performant FastAPI/Node.js microservices.
- Integrate vector search indexing, embeddings, and RAG architectures using Python and modern LLM frameworks.
- Optimize database performance in PostgreSQL and manage containerized deployments with Docker and AWS.
- Collaborate with AI researchers and product managers to deliver rapid features with high test coverage.

Requirements:
- 4+ years of professional full-stack software development experience.
- Strong proficiency in TypeScript, React, Python, and modern web frameworks (FastAPI/Express).
- Experience integrating RESTful/GraphQL APIs and AI inference pipelines.
- Solid understanding of relational databases (PostgreSQL), Docker, and Git workflows.
- B.S. or M.S. in Computer Science or related technical discipline.`
  },
  {
    id: 'jd_3',
    title: 'Senior Machine Learning & NLP Engineer',
    company: 'Cognitive Intelligence Corp',
    requiredSkills: ['Python', 'PyTorch', 'Hugging Face', 'NLP / Transformers', 'MLOps', 'CUDA'],
    preferredSkills: ['TensorRT', 'vLLM', 'Kubernetes', 'Ray', 'Weights & Biases', 'Fine-Tuning'],
    experienceRequired: '5+ years in Machine Learning, Deep Learning, and NLP',
    educationRequired: "Master's or Ph.D. in Computer Science, Machine Learning, or AI",
    responsibilities: [
      'Train, fine-tune, and evaluate transformer models and LLMs for domain-specific NLP benchmarks',
      'Optimize model inference latency, quantization, and GPU throughput using vLLM and TensorRT',
      'Design end-to-end MLOps pipelines for continuous dataset curation, evaluation, and deployment',
      'Publish internal benchmarks and collaborate with engineering teams on production integration'
    ],
    keywords: ['pytorch', 'nlp', 'transformers', 'hugging face', 'llm', 'fine-tuning', 'mlops', 'python'],
    rawText: `Senior Machine Learning & NLP Engineer
Cognitive Intelligence Corp - San Francisco, CA

About the Role:
Join our Applied AI Core team to train, fine-tune, and deploy high-throughput generative models and NLP pipelines for enterprise reasoning.

Key Responsibilities:
- Lead model training, LoRA/PEFT fine-tuning, and alignment for state-of-the-art open source LLMs.
- Build resilient MLOps pipelines covering automated data preprocessing, synthetic dataset generation, and evaluation harness.
- Optimize production inference on NVIDIA GPUs using TensorRT-LLM, vLLM, and distributed Ray clusters.
- Partner with security and compliance teams to enforce safety filters and guardrails.

Qualifications:
- 5+ years building and deploying deep learning and NLP architectures in production.
- Deep expertise with PyTorch, Hugging Face Transformers, Tokenizers, and CUDA acceleration.
- Hands-on experience with LLM fine-tuning, quantization (AWQ/GPTQ), and evaluation metrics.
- M.S. or Ph.D. in Computer Science, Machine Learning, AI, or equivalent quantitative discipline.`
  },
  {
    id: 'jd_4',
    title: 'Cloud DevOps & Infrastructure Architect',
    company: 'CloudScale Global Infrastructure',
    requiredSkills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD (GitHub Actions)', 'Linux', 'Docker'],
    preferredSkills: ['Helm', 'Prometheus / Grafana', 'ArgoCD', 'Python/Go scripting', 'SOC2 / ISO 27001'],
    experienceRequired: '6+ years in DevOps, SRE, or Cloud Infrastructure Architecture',
    educationRequired: "Bachelor's degree in Computer Science, IT, or equivalent practical experience",
    responsibilities: [
      'Design multi-region, highly available cloud infrastructure across AWS using Infrastructure-as-Code (Terraform)',
      'Manage production Kubernetes (EKS) clusters, autoscaling policies, and container security',
      'Build zero-downtime CI/CD pipelines with automated vulnerability scanning and blue/green deployments',
      'Implement enterprise observability, synthetic monitoring, SLA alerts, and incident response runbooks'
    ],
    keywords: ['aws', 'kubernetes', 'terraform', 'ci/cd', 'docker', 'helm', 'prometheus', 'sre', 'devops'],
    rawText: `Cloud DevOps & Infrastructure Architect
CloudScale Global Infrastructure - Austin, TX (Remote)

About the Role:
We are seeking a senior Cloud DevOps Architect to spearhead our multi-tenant cloud platform, automated deployment infrastructure, and 99.99% reliability SLAs.

Key Responsibilities:
- Author and maintain declarative Terraform modules for VPCs, EKS clusters, RDS instances, and IAM security perimeters.
- Maintain high-scale Kubernetes workloads, service meshes, ingress controllers, and GPU compute pools.
- Construct resilient GitOps workflows using ArgoCD, GitHub Actions, and artifact registries.
- Establish observability dashboards using Prometheus, Grafana, OpenTelemetry, and automated paging.

Requirements:
- 6+ years of hands-on experience in DevOps, Site Reliability Engineering, or Cloud Architecture.
- Mastery of AWS core services (EKS, VPC, IAM, RDS, Route53, S3, CloudFront).
- Strong proficiency with Terraform, Kubernetes, Docker, and Linux systems administration.
- Experience with GitOps, container security scanning (Trivy/Snyk), and compliance frameworks.`
  },
  {
    id: 'jd_5',
    title: 'Senior Technical Product Manager - AI & SaaS',
    company: 'Vanguard Enterprise Solutions',
    requiredSkills: ['Product Strategy', 'Technical Roadmapping', 'AI/ML Product Lifecycle', 'User Research', 'Agile / Scrum'],
    preferredSkills: ['SQL & Data Analytics', 'API Architecture', 'B2B Enterprise SaaS', 'GTM Strategy'],
    experienceRequired: '5+ years in Product Management for Enterprise Software / AI Products',
    educationRequired: "Bachelor's degree in Business, Computer Science, Engineering, or MBA",
    responsibilities: [
      'Define product vision, quarterly roadmap, and PRDs for flagship AI workflow automation products',
      'Conduct customer discovery interviews with Fortune 500 enterprise HR and talent leaders',
      'Work side-by-side with engineering, ML research, and design teams to drive sprint execution',
      'Track north-star product metrics, adoption funnels, retention, and enterprise customer satisfaction'
    ],
    keywords: ['product management', 'ai', 'saas', 'roadmapping', 'prd', 'agile', 'user stories', 'strategy'],
    rawText: `Senior Technical Product Manager - AI & Enterprise SaaS
Vanguard Enterprise Solutions - Boston, MA (Hybrid)

About the Role:
We are seeking a high-impact Technical Product Manager to lead the evolution of our enterprise AI platform. You will bridge customer needs, AI model capabilities, and commercial strategy.

Responsibilities:
- Own the end-to-end product roadmap from discovery to launch for AI-powered enterprise modules.
- Translate ambiguous client requirements into clear, prioritized engineering specs and user stories.
- Partner closely with UX designers to craft seamless product experiences for enterprise users.
- Drive cross-functional alignment across Engineering, Data Science, Marketing, and Sales.

Requirements:
- 5+ years of software product management experience, preferably in B2B SaaS or AI-driven platforms.
- Strong technical fluency with APIs, cloud architectures, and machine learning fundamentals.
- Proven track record of shipping complex software products with measurable business impact.
- Exceptional analytical skills with proficiency in SQL, amplitude, and quantitative user data.`
  },
  {
    id: 'jd_6',
    title: 'Senior Cybersecurity & DevSecOps Engineer',
    company: 'Fortress Threat Intelligence',
    requiredSkills: ['Cloud Security', 'Vulnerability Assessment', 'SIEM / SOC', 'DevSecOps', 'IAM / Zero Trust', 'Python/Bash'],
    preferredSkills: ['AWS Security Hub', 'Snyk / SonarQube', 'Incident Response', 'CISSP / CEH', 'Kubernetes Security'],
    experienceRequired: '5+ years in Information Security, Application Security, or DevSecOps',
    educationRequired: "Bachelor's in Cybersecurity, Computer Science, Information Security, or equivalent",
    responsibilities: [
      'Implement Zero Trust security architecture and automated cloud security guardrails across AWS/GCP',
      'Embed static (SAST), dynamic (DAST), and container security scanners directly into developer CI/CD pipelines',
      'Conduct threat modeling, penetration test reviews, and vulnerability remediations with engineering teams',
      'Manage security telemetry, SIEM logging, incident response procedures, and audit compliance'
    ],
    keywords: ['cybersecurity', 'devsecops', 'siem', 'zero trust', 'cloud security', 'penetration testing', 'iam'],
    rawText: `Senior Cybersecurity & DevSecOps Engineer
Fortress Threat Intelligence - Seattle, WA (Remote)

About the Role:
Fortress is looking for a Senior Cybersecurity Engineer to champion our application security posture, cloud compliance, and automated DevSecOps pipelines.

Key Responsibilities:
- Integrate automated SAST, DAST, SCA, and secret detection tools into developer pull-request workflows.
- Architect cloud security policies, least-privilege IAM roles, KMS encryption, and network segmentation.
- Monitor threat detection logs, SIEM dashboards, and coordinate emergency incident response.
- Perform security architecture reviews for new cloud services and AI integrations.

Qualifications:
- 5+ years of cybersecurity and application security experience.
- In-depth understanding of OWASP Top 10, cloud security best practices (AWS/GCP), and Zero Trust principles.
- Experience with security tooling: Snyk, Trivy, SonarQube, AWS GuardDuty, Splunk/Datadog.
- Industry certifications like CISSP, CISM, AWS Certified Security Specialist, or CEH are highly valued.`
  }
];

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

