import type { Division } from "@/types";

/**
 * CONTENT NOTE (needs Founder & CEO approval before launch):
 * `status` controls whether a division is presented as operating now ("available")
 * or as a future initiative ("planned"). Do not mark a division "available"
 * unless the company is ready and authorized to deliver it.
 */
export const divisions: Division[] = [
  {
    slug: "development",
    name: "TanimXploit Development",
    icon: "code",
    summary:
      "Building digital solutions that move businesses forward: websites, web applications and software.",
    description:
      "TanimXploit Development is Division 01 of TanimXploit Technology Services. It builds websites, web applications and software solutions that help businesses operate smarter, serve customers better and grow digitally, with a focus on clean architecture, security and long-term maintainability.",
    mainFocus: "Web, software and application development",
    activities: [
      "Business website development",
      "E-commerce development",
      "Custom web applications (CRM, ERP, booking, dashboards, SaaS)",
      "Full-stack development",
      "API development and integration",
      "Website redesign",
    ],
    capabilities: [
      "React, Next.js and TypeScript",
      "Node.js, Express.js and REST APIs",
      "PostgreSQL, MySQL, MongoDB and Prisma",
      "Security-minded, accessible, SEO-ready builds",
    ],
    status: "available",
    statusNote: "Currently available for project inquiries.",
    category: "WEBSITE_DEVELOPMENT",
    ctaLabel: "Request a quote",
    href: "/development",
  },
  {
    slug: "creative-studio",
    name: "TanimXploit Creative Studio",
    icon: "palette",
    summary: "Creating meaningful brands through strategic design: logos, brand identity and visual design.",
    description:
      "TanimXploit Creative Studio is a creative design division focused on building memorable brand identities and professional visual experiences for modern businesses, startups, personal brands and e-commerce brands.",
    mainFocus: "Brand identity, graphic design and creative solutions",
    activities: [
      "Logo design",
      "Brand identity design",
      "Business stationery",
      "Social media design",
      "UI/UX design",
      "Marketing materials",
    ],
    capabilities: [
      "Brand research and design strategy",
      "Typography and colour systems",
      "Figma, Illustrator, Photoshop and InDesign",
    ],
    status: "available",
    statusNote: "Currently available for project inquiries.",
    category: "BRANDING_DESIGN",
    ctaLabel: "Request a quote",
    href: "/creative-studio",
  },
  {
    slug: "digital",
    name: "TanimXploit Digital",
    icon: "megaphone",
    summary: "Social media management and SEO: growing businesses through smarter digital marketing.",
    description:
      "TanimXploit Digital helps businesses strengthen their online presence, reach the right audience and achieve sustainable digital growth. We start with social media management and search engine optimization, and add content marketing, paid advertising and email marketing as we grow. We do not promise rankings, sales or specific business results.",
    mainFocus: "Social media management and search engine optimization",
    activities: [
      "Social media management and content calendars",
      "Technical, on-page and local SEO",
      "Search Console and analytics reporting",
      "Digital presence audit and strategy",
    ],
    capabilities: [
      "Marketing strategy built on your goals and budget",
      "SEO-friendly website structure with TanimXploit Development",
      "Clear monthly reporting focused on business goals",
    ],
    status: "available",
    statusNote: "Currently available for project inquiries.",
    category: "DIGITAL_MARKETING",
    ctaLabel: "Discuss digital growth",
    href: "/digital",
  },
  {
    slug: "technology-support",
    name: "TanimXploit Technology Support",
    icon: "lifebuoy",
    summary: "Keeping your digital business running smoothly: website maintenance, security and technical support.",
    description:
      "TanimXploit Technology Support helps businesses maintain reliable, secure and well-performing websites and digital systems through WordPress and WooCommerce maintenance, backups, security monitoring, bug fixing, hosting and domain help and business email setup.",
    mainFocus: "Website maintenance and technical support",
    activities: [
      "WordPress and WooCommerce maintenance",
      "Backup and security monitoring",
      "Bug fixing and troubleshooting",
      "Hosting, domain and business email assistance",
    ],
    capabilities: [
      "Backup and rollback plan before every live change",
      "Monthly maintenance plans with written scope",
      "Technical documentation and support records",
    ],
    status: "available",
    statusNote: "Currently available for support inquiries.",
    category: "TECHNICAL_SUPPORT",
    ctaLabel: "Ask for technical support",
    href: "/technology-support",
  },
  {
    slug: "code-academy",
    name: "TanimXploit Code Academy",
    icon: "graduation",
    summary: "A planned practical coding academy: modern web development through free lessons and projects.",
    description:
      "TanimXploit Code Academy is a planned initiative to teach modern web development and software engineering through structured learning, hands-on projects and real-world practice. It begins with free content and is under development. It is not yet open for enrollment.",
    mainFocus: "Modern web development and software engineering education",
    activities: [
      "Planned free YouTube lessons",
      "Planned project-based courses from HTML to full-stack",
      "Planned live cohorts and mentorship",
    ],
    capabilities: [
      "Ten-course curriculum plan",
      "Project-based learning with portfolio work",
      "Learning from real development projects",
    ],
    status: "planned",
    statusNote: "In planning. Enrollment is not open yet.",
    category: "EDUCATION_LEARNING",
    ctaLabel: "Register your interest",
    href: "/code-academy",
  },
  {
    slug: "learning",
    name: "TanimXploit Learning",
    icon: "book",
    summary: "A planned learning and tutoring support initiative for students and educators.",
    description:
      "TanimXploit Learning is a planned initiative focused on learning support, tutoring and educational resources for students, tutors and educators. It is under development and not yet operating as a full service.",
    mainFocus: "Learning and tutoring support",
    activities: [
      "Planned learning resources",
      "Planned tutoring support",
      "Planned collaboration with tutors and educators",
    ],
    capabilities: ["Program design in progress", "Educator partnership discussions welcome"],
    status: "planned",
    statusNote: "In planning. Not yet available as a full service.",
    category: "EDUCATION_LEARNING",
    ctaLabel: "Register your interest",
  },
];

/** Public URL of a division page (Development has its own section). */
export const divisionHref = (d: Division) => d.href ?? `/divisions/${d.slug}`;

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);
