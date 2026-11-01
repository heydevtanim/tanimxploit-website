import type { DivisionSection } from "./types";

/**
 * TanimXploit Code Academy: a division of TanimXploit Technology Services.
 *
 * STATUS: planned. Enrollment is NOT open. Keep `status: "planned"` until the Founder & CEO confirms
 * the first course or free content is actually live.
 *
 * NOT published (internal planning): course and cohort prices, revenue model, team and family roles,
 * finance, KPIs, roadmap, 30-day plan.
 * Honest scope: certificates are completion certificates only (never an accredited qualification),
 * no job placement is promised, YouTube income is never presented as certain.
 * Curriculum policy: WordPress and WooCommerce are not part of the Academy curriculum.
 */
export const codeAcademySection: DivisionSection = {
  key: "code-academy",
  basePath: "/code-academy",
  servicesSegment: "courses",
  itemLabel: { singular: "course", plural: "courses" },
  processLabel: "Learning Method",
  hasPortfolio: false,
  category: "EDUCATION_LEARNING",
  status: "planned",
  statusNote: "In planning. Enrollment is not open yet.",
  quoteHref: "/contact?category=EDUCATION_LEARNING",
  ctaLabel: "Register Your Interest",
  navCtaLabel: "Register Interest",
  navLabel: "Code Academy",

  brand: {
    name: "TanimXploit Code Academy",
    shortName: "Code Academy",
    parent: "TanimXploit Technology Services",
    tagline: "Learn to Code. Build Real Projects. Become a Developer.",
    positioning:
      "TanimXploit Code Academy is a planned practical coding education platform focused on teaching modern web development and software engineering through structured learning, hands-on projects and real-world development practices.",
    intro:
      "The Academy is being planned as more than an online course platform: a practical, project-based and career-oriented place to learn modern full-stack web development, from your first line of HTML to deploying a complete application.",
    legalNote:
      "TanimXploit Code Academy is a division of TanimXploit Technology Services. It is in planning and is not yet open for enrollment.",
  },

  seo: {
    overviewDescription:
      "TanimXploit Code Academy is a planned practical coding education initiative teaching modern web development: HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL and full-stack projects. Not yet open for enrollment.",
    servicesDescription:
      "The planned TanimXploit Code Academy curriculum: ten courses from web fundamentals to full-stack development and professional workflow.",
    processDescription:
      "How TanimXploit Code Academy plans to teach: practical, project-based learning, assessment, completion certificates and a free-content-first approach.",
  },

  hero: {
    panelLabel: "Planned learning path",
    panelItems: ["HTML, CSS and JavaScript", "TypeScript, React and Next.js", "Node.js, PostgreSQL and full-stack projects"],
  },

  about: {
    eyebrow: "About Code Academy",
    title: "Learn by building real projects",
    objectivesTitle: "What the Academy aims to do",
    objectives: [
      "Give beginners a solid programming foundation",
      "Teach modern web development",
      "Make learning practical and project-based",
      "Build full-stack development skills",
      "Help learners build a portfolio",
      "Improve technical problem-solving",
      "Teach a professional development workflow",
      "Offer free content first, then structured courses and live cohorts",
    ],
    responsibilitiesTitle: "What the Academy will do",
    responsibilities: [
      "Curriculum development and course planning",
      "Programming instruction",
      "Practical project development",
      "Student assessment",
      "Learning materials",
      "Mentorship",
      "Course quality control",
      "Educational content production",
    ],
  },

  focus: {
    title: "Where the Academy starts",
    description:
      "The first step is free, practical content that builds trust, before structured paid programs are offered.",
    items: [
      {
        icon: "play",
        title: "Free YouTube lessons",
        text: "Practical tutorials and course series with source code on GitHub, planned as the starting point.",
      },
      {
        icon: "code",
        title: "Modern web foundations",
        text: "Web fundamentals, HTML, CSS, JavaScript, TypeScript, then React and Next.js.",
      },
      {
        icon: "layers",
        title: "Full-stack projects",
        text: "Node.js, PostgreSQL, APIs, authentication and deployment, practiced through real projects.",
      },
    ],
  },

  services: [
    {
      slug: "web-development-fundamentals",
      title: "Web Development Fundamentals",
      shortTitle: "Fundamentals",
      icon: "globe",
      objective: "Understand how the web works before writing code.",
      services: [
        "How the internet works",
        "Website and web application concepts",
        "Client-server architecture",
        "HTTP and HTTPS",
        "Domain and hosting basics",
        "Browser and developer tools",
        "Introduction to web technologies",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "html-css",
      title: "HTML and CSS",
      shortTitle: "HTML & CSS",
      icon: "layout",
      objective: "Build clean, responsive and accessible web pages.",
      services: [
        "HTML fundamentals",
        "Semantic HTML",
        "Forms and input elements",
        "CSS fundamentals",
        "Selectors and specificity",
        "Box model",
        "Flexbox",
        "CSS Grid",
        "Responsive web design",
        "CSS animations",
        "Accessibility fundamentals",
      ],
      deliverables: [
        "Personal portfolio",
        "Business landing page",
        "Responsive multi-section website",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "javascript",
      title: "JavaScript",
      shortTitle: "JavaScript",
      icon: "terminal",
      objective: "Learn the language of the web and make pages interactive.",
      services: [
        "JavaScript fundamentals",
        "Variables and data types",
        "Operators",
        "Conditions and loops",
        "Functions",
        "Arrays and objects",
        "DOM manipulation",
        "Events",
        "ES6+",
        "Modules",
        "Asynchronous JavaScript",
        "Promises",
        "Async/Await",
        "Fetch API",
        "Error handling",
      ],
      deliverables: [
        "Calculator",
        "Todo application",
        "Weather application",
        "Interactive dashboard",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "typescript",
      title: "TypeScript",
      shortTitle: "TypeScript",
      icon: "code",
      objective: "Write safer, more maintainable JavaScript with types.",
      services: [
        "TypeScript fundamentals",
        "Type annotations",
        "Interfaces and types",
        "Functions and generics",
        "Union and intersection types",
        "Type narrowing",
        "Utility types",
        "TypeScript with React",
        "TypeScript project structure",
      ],
      deliverables: [
        "Typed task manager",
        "API-driven application",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "react",
      title: "React.js",
      shortTitle: "React",
      icon: "layers",
      objective: "Build modern user interfaces with components.",
      services: [
        "React fundamentals",
        "Components",
        "JSX",
        "Props and state",
        "Event handling",
        "Hooks",
        "useEffect",
        "Context API",
        "React Router",
        "Form handling",
        "API integration",
        "State management",
        "Component architecture",
      ],
      deliverables: [
        "Product listing application",
        "Dashboard",
        "E-commerce frontend",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "nextjs",
      title: "Next.js",
      shortTitle: "Next.js",
      icon: "rocket",
      objective: "Build fast, SEO-friendly full-stack React applications.",
      services: [
        "Next.js fundamentals",
        "App Router",
        "Layouts and pages",
        "Server Components",
        "Client Components",
        "Routing",
        "Data fetching",
        "Route Handlers",
        "Authentication",
        "Metadata and SEO",
        "Rendering strategies",
        "Deployment",
      ],
      deliverables: [
        "Business website",
        "Blog platform",
        "E-commerce frontend",
        "Full-stack application",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      shortTitle: "Backend",
      icon: "server",
      objective: "Create servers and REST APIs with Node.js and Express.js.",
      services: [
        "Node.js fundamentals",
        "NPM",
        "Express.js",
        "REST API",
        "Middleware",
        "Routing",
        "Request and response",
        "Validation",
        "Error handling",
        "File upload",
        "Authentication",
        "Authorization",
        "Security fundamentals",
      ],
      deliverables: [
        "REST API",
        "User authentication system",
        "Product management API",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "database-api-development",
      title: "Database and API Development",
      shortTitle: "Database & API",
      icon: "database",
      objective: "Design relational databases and well-documented APIs.",
      services: [
        "Database fundamentals",
        "Relational database concepts",
        "PostgreSQL",
        "SQL",
        "Table relationships",
        "Primary and foreign keys",
        "Joins",
        "Indexing",
        "Transactions",
        "Prisma ORM",
        "Database migrations",
        "API design",
        "API documentation",
      ],
      deliverables: [
        "User management system",
        "Inventory management API",
        "E-commerce database",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "full-stack-development",
      title: "Full-Stack Development",
      shortTitle: "Full-Stack",
      icon: "layers",
      objective: "Bring frontend, backend and database together into complete applications.",
      services: [
        "Frontend and backend integration",
        "Authentication and authorization",
        "Database integration",
        "API integration",
        "Form validation",
        "Error handling",
        "Security",
        "Role-based access control",
        "File management",
        "Payment integration concepts",
        "Testing",
        "Production deployment",
      ],
      deliverables: [
        "Full-stack blog application",
        "Task management system",
        "E-commerce platform",
        "Business management application",
      ],
      category: "EDUCATION_LEARNING",
    },
    {
      slug: "professional-development-workflow",
      title: "Professional Development Workflow",
      shortTitle: "Dev Workflow",
      icon: "branch",
      objective: "Work the way professional development teams work.",
      services: [
        "Git and GitHub",
        "Git branching",
        "Pull requests",
        "Code review",
        "Debugging",
        "Testing fundamentals",
        "Environment variables",
        "Deployment",
        "CI/CD fundamentals",
        "Project documentation",
        "Clean code",
        "Software development best practices",
      ],
      category: "EDUCATION_LEARNING",
    },
  ],
  servicesHeading: {
    eyebrow: "Planned curriculum",
    title: "Ten courses, from beginner to full-stack",
    description:
      "The curriculum is arranged step by step. It is a plan and may change before launch. Courses are not open for enrollment yet.",
    pageDescription:
      "The planned TanimXploit Code Academy curriculum, arranged from web fundamentals to advanced full-stack development.",
  },
  detailLabels: {
    included: "Topics covered",
    deliverables: "Projects you will build",
    targetClients: "Who it is for",
    requestLabel: "Register your interest",
    asideText:
      "This course is in planning and not open for enrollment yet. Register your interest and we will let you know when it is available.",
  },

  offerings: {
    id: "delivery",
    eyebrow: "How learning will be delivered",
    title: "Five planned ways to learn",
    description: "From free videos to mentorship. Formats will launch step by step.",
    tone: "soft",
    groups: [
      {
        title: "Free YouTube courses",
        text: "Free tutorials, course series, coding exercises, project tutorials and career guidance.",
        points: [],
      },
      {
        title: "Self-paced courses",
        text: "Recorded lessons, course materials, assignments, project files, progress tracking and a completion assessment.",
        points: [],
      },
      {
        title: "Live cohort programs",
        text: "Instructor-led live classes with weekly assignments, discussion, practical projects, code review, live Q&A and a final assessment.",
        points: [],
      },
      {
        title: "Mentorship",
        text: "Individual or small-group guidance on roadmap, projects, code review, portfolio and technical interview preparation.",
        points: [],
      },
      {
        title: "Workshops",
        text: "Short programs on one topic: Git and GitHub, React fundamentals, API development, Next.js or a full-stack project.",
        points: [],
      },
    ],
    note: "Formats, schedules and enrollment details will be announced when they are ready.",
  },

  whyChoose: [
    {
      icon: "code",
      title: "Practical, not memorized",
      text: "You write code yourself, debug it and see how every topic is used in a real project.",
    },
    {
      icon: "branch",
      title: "Professional workflow",
      text: "Git, pull requests, code review, testing and deployment are part of the learning path.",
    },
    {
      icon: "layers",
      title: "Learning from real development",
      text: "Project ideas and technical guidance connect to the work of TanimXploit Development.",
    },
    {
      icon: "compass",
      title: "Honest promises",
      text: "Certificates show course completion only. We do not promise a job or present a certificate as an accredited degree.",
    },
  ],
  whyTitle: "Why TanimXploit Code Academy",

  audience: {
    eyebrow: "Who it is for",
    title: "Five kinds of learners",
    description: "The Academy is planned for people at different stages of their programming journey.",
    items: [
      {
        title: "Programming beginners",
        text: "You want to learn programming from the very beginning.",
        services: ["Programming fundamentals", "HTML", "CSS", "JavaScript", "Problem solving"],
      },
      {
        title: "University students",
        text: "You want practical development skills next to your academic education.",
        services: ["Web development", "Database", "API development", "Git and GitHub", "Real-world projects"],
      },
      {
        title: "Job seekers",
        text: "You want a career in web or software development.",
        services: ["Frontend", "Backend", "Full-stack", "Portfolio", "Interview preparation"],
      },
      {
        title: "Aspiring freelancers",
        text: "You want to offer web development on freelancing marketplaces.",
        services: ["Client requirements", "Project development", "Git and GitHub", "Portfolio", "Freelance workflow"],
      },
      {
        title: "Junior developers",
        text: "You want to improve your technical skills.",
        services: ["Advanced JavaScript", "TypeScript", "React and Next.js", "Backend architecture", "Deployment"],
      },
    ],
  },

  extras: [
    {
      id: "youtube",
      eyebrow: "Free learning",
      title: "A planned YouTube education channel",
      description:
        "Practical modern web development education for beginners and aspiring full-stack developers. Quality and practical value matter more than the number of videos.",
      tone: "light",
      groups: [
        {
          title: "Planned topics",
          points: [
            "Web development fundamentals",
            "HTML and CSS",
            "JavaScript and TypeScript",
            "React and Next.js",
            "Node.js and Express.js",
            "PostgreSQL and Prisma",
            "REST API development",
            "Authentication and security",
            "Full-stack projects",
            "Git and GitHub",
            "Deployment and DevOps fundamentals",
          ],
        },
        {
          title: "Planned formats",
          points: [
            "Complete course series",
            "Step-by-step tutorials",
            "Short technical explanations",
            "Coding challenges",
            "Project development series",
            "Debugging tutorials",
            "Developer career guidance",
          ],
        },
      ],
      note: "Source code for lessons will be shared on GitHub.",
    },
    {
      id: "certificate",
      eyebrow: "Assessment and certificates",
      title: "How progress will be measured",
      description: "Learning is assessed in several ways, and a certificate requires meeting set criteria.",
      tone: "soft",
      groups: [
        {
          title: "Assessment methods",
          points: [
            "MCQ tests",
            "Short answer questions",
            "Coding exercises",
            "Practical assignments",
            "Mini projects",
            "Code review",
            "Final capstone project",
            "Technical viva",
          ],
        },
        {
          title: "Completion certificate",
          text: "A certificate can be issued when completion and assessment criteria are met. It shows the student name, course name, completion date, course duration, assessment status, a certificate ID and a verification method.",
          points: [],
        },
      ],
      note: "A certificate is not an accredited academic qualification and is not a guarantee of a job.",
    },
  ],

  workflow: [
    { step: "01", title: "Concept explanation", text: "Each topic starts with a clear explanation." },
    { step: "02", title: "Instructor demonstration", text: "The instructor shows how it works in practice." },
    { step: "03", title: "Code-along practice", text: "You code together with the instructor." },
    { step: "04", title: "Individual exercises", text: "You practice on your own." },
    { step: "05", title: "Practical assignments", text: "You apply the topic to a realistic task." },
    { step: "06", title: "Mini projects", text: "Small projects connect several topics." },
    { step: "07", title: "Real-world projects", text: "Larger projects go into your portfolio." },
    { step: "08", title: "Code review", text: "Your code quality and structure are reviewed." },
    { step: "09", title: "Technical assessment", text: "Your understanding is tested." },
    { step: "10", title: "Final project evaluation", text: "A final project shows what you can build." },
  ],
  workflowHeading: {
    eyebrow: "Learning method",
    title: "Practical and project-based",
    description: "A ten-step learning process, from the first explanation to a final project.",
    pageDescription:
      "The Academy's teaching system is practical and project-based. These are the planned principles and learning process.",
  },

  standards: [
    {
      eyebrow: "Teaching principles",
      title: "How we plan to teach",
      items: [
        "Code is understood, not memorized.",
        "Every topic shows its practical application.",
        "Learners build the habit of writing code themselves.",
        "Debugging and problem solving are taught.",
        "Code quality and project structure are assessed.",
        "Reading English technical documentation is encouraged as needed.",
      ],
    },
    {
      eyebrow: "Portfolio",
      title: "Projects for your portfolio",
      intro: "Every project is planned to include a GitHub repository, a README, screenshots and a live demo. Example projects:",
      items: [
        "Personal portfolio website",
        "Responsive business website",
        "JavaScript task manager",
        "Weather application",
        "React dashboard",
        "E-commerce frontend",
        "REST API and authentication system",
        "Database-driven application",
        "Full-stack e-commerce platform",
      ],
    },
    {
      eyebrow: "Curriculum focus",
      title: "What the Academy does not cover",
      items: [
        "WordPress and WooCommerce are not part of the core curriculum.",
        "The primary focus is modern full-stack web development and software engineering.",
      ],
    },
  ],
  tools: {
    title: "Tools learners will use",
    items: [
      "Visual Studio Code",
      "Git and GitHub",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Browser developer tools",
    ],
    note: "Learning platform features such as a student dashboard, quizzes and certificates will be built only after demand for paid courses is confirmed.",
  },

  collaboration: [
    { division: "Development", slug: "development", work: "Real-world project ideas, technical mentorship and development workflow" },
    { division: "Creative Studio", slug: "creative-studio", work: "Academy branding, course graphics and thumbnails" },
    { division: "Digital", slug: "digital", work: "YouTube promotion, SEO and content marketing" },
    { division: "Technology Support", slug: "technology-support", work: "Learning platform maintenance and technical support" },
    { division: "Learning", slug: "learning", work: "English communication and career skills (planned)" },
  ],
  journeys: [
    {
      title: "Aspiring developer",
      steps: [
        { division: "Code Academy", work: "Web development learning path" },
        { division: "Learning", work: "English communication and career skills (planned)" },
      ],
    },
  ],
  collaborationHeading: {
    eyebrow: "One company, multiple divisions",
    title: "Learning connected to real work",
    description:
      "Code Academy learners may also benefit from English communication and career development training through TanimXploit Learning, once it is available.",
  },

  faq: [
    {
      q: "Can I enroll in a course now?",
      a: "Not yet. The Academy is in planning. You can register your interest and we will contact you when something opens.",
    },
    {
      q: "Is TanimXploit Code Academy a separate company?",
      a: "It is a division of TanimXploit Technology Services.",
    },
    {
      q: "Will there be free content?",
      a: "Free YouTube lessons are the planned starting point. Structured paid courses, live cohorts and mentorship are planned later.",
    },
    {
      q: "Do I need any programming experience?",
      a: "No. The learning path begins with web fundamentals, HTML and CSS for complete beginners.",
    },
    {
      q: "Will I get a certificate?",
      a: "A completion certificate can be issued when completion and assessment criteria are met. It is not an accredited academic qualification.",
    },
    {
      q: "Do you guarantee a job?",
      a: "No. We help you build skills, projects and a portfolio, but we do not promise a job or job placement.",
    },
    {
      q: "Will WordPress be taught?",
      a: "No. WordPress and WooCommerce are not part of the core curriculum. The focus is modern full-stack web development.",
    },
    {
      q: "Can my company train its developers with you?",
      a: "Customized technical training for companies is a possible future offering. Contact us to discuss your needs.",
    },
  ],
  cta: {
    title: "Interested in learning with us?",
    text: "Register your interest and we will tell you when the first free content and courses are available.",
  },
  homeBand: {
    eyebrow: "TanimXploit Code Academy · Planned",
    title: "Learn to code. Build real projects. Become a developer.",
    text: "A planned practical coding education initiative: modern full-stack web development through free lessons and project-based courses.",
    exploreLabel: "Explore Code Academy",
    secondaryLabel: "See planned curriculum",
  },
};
