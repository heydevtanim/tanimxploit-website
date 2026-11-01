import type { IconName, InquiryCategoryKey } from "@/types";

/**
 * TanimXploit Development: a Business Division of TanimXploit Technology Services.
 * It is NOT a separate legal entity. Ownership, finance, marketing and administration are handled by
 * the parent company; the Development Division delivers web and software solutions.
 *
 * CONTENT RULES:
 * - Internal planning material (price ranges, revenue model, team plan, finance, sales channels) is
 *   deliberately NOT published on the website.
 * - Do not add testimonials or results unless they are genuine and approved.
 */

export const developmentBrand = {
  name: "TanimXploit Development",
  parent: "TanimXploit Technology Services",
  divisionNumber: "Division 01",
  tagline: "Building Digital Solutions That Move Businesses Forward.",
  scope: "Web Development · Software Solutions · Digital Experiences",
  message:
    "We build websites, web applications and software solutions that help businesses operate smarter, serve customers better and grow digitally.",
  legalNote:
    "TanimXploit Development is a business division of TanimXploit Technology Services. It is not a separate legal entity.",
} as const;

/** Where every "Request a Quote" button leads (pre-selects the website development category). */
export const developmentQuoteHref = "/contact?category=WEBSITE_DEVELOPMENT";

/** What the Development Division does for every client. */
export const divisionResponsibilities = [
  "Understand your requirements",
  "Propose the right technical solution",
  "Prepare project estimates and timelines",
  "Develop websites and software",
  "Test and quality-check every project",
  "Deliver the finished project",
  "Provide maintenance and technical support",
] as const;

export interface DevService {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  objective: string;
  services: string[];
  targetClients?: string[];
  deliverables?: string[];
  /** Extra detail blocks shown on the service page. */
  highlights?: { title: string; items: string[]; note?: string }[];
  note?: string;
  category: InquiryCategoryKey;
}

export const developmentServices: DevService[] = [
  {
    slug: "business-website-development",
    title: "Business Website Development",
    shortTitle: "Business Website",
    icon: "globe",
    objective: "Create a professional online presence for your business.",
    services: [
      "Corporate Website Development",
      "Business Portfolio Website",
      "Company Profile Website",
      "Service-based Website",
      "Landing Page Development",
      "Personal Portfolio Website",
      "Multi-page Business Website",
      "Responsive Website Development",
    ],
    targetClients: [
      "Small and medium businesses",
      "Corporate companies",
      "Consultants",
      "Professionals",
      "Agencies",
      "Local service providers",
    ],
    deliverables: [
      "Responsive frontend",
      "Required pages",
      "Contact forms",
      "SEO-ready structure",
      "Basic performance optimization",
      "Admin/CMS integration where required",
    ],
    category: "WEBSITE_DEVELOPMENT",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    shortTitle: "E-commerce",
    icon: "cart",
    objective: "Build an online store for your business.",
    services: [
      "Custom E-commerce Website",
      "Online Store Development",
      "Product Management System",
      "Shopping Cart and Checkout",
      "Payment Gateway Integration",
      "Order Management",
      "Customer Account System",
      "Inventory Integration",
      "E-commerce Dashboard",
    ],
    highlights: [
      {
        title: "Bangladesh market (as required)",
        items: ["bKash", "Nagad", "SSLCommerz", "Cash on Delivery", "Pathao", "Steadfast", "RedX"],
        note: "Integrations are chosen according to your business requirements.",
      },
      {
        title: "International market",
        items: [
          "Payment and shipping integration based on the client's country and business requirements",
        ],
      },
    ],
    category: "WEBSITE_DEVELOPMENT",
  },
  {
    slug: "custom-web-application",
    title: "Custom Web Application",
    shortTitle: "Custom Web App",
    icon: "layers",
    objective: "Build business-specific software.",
    services: [
      "CRM Development",
      "ERP Solutions",
      "Inventory Management Software",
      "Booking Management Systems",
      "HR Management Systems",
      "Employee Management Systems",
      "Customer Portals",
      "Admin Dashboards",
      "SaaS Applications",
    ],
    note: "This is more than a website: business process automation is a major part of what we build.",
    category: "SOFTWARE_DEVELOPMENT",
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    shortTitle: "Full-Stack",
    icon: "code",
    objective: "Complete application development, from frontend to backend.",
    services: [
      "Frontend interfaces with React and Next.js",
      "Backend services with Node.js and Express.js",
      "Database design with PostgreSQL, MySQL or MongoDB",
      "REST API design and development",
      "Secure authentication",
      "Deployment and environment setup",
    ],
    note: "We do not use every technology on every project. The stack is chosen to fit your requirements.",
    category: "SOFTWARE_DEVELOPMENT",
  },
  {
    slug: "api-development-integration",
    title: "API Development and Integration",
    shortTitle: "API & Integration",
    icon: "plug",
    objective: "Connect your software, websites and external services so they can communicate.",
    services: [
      "REST API Development",
      "Third-party API Integration",
      "Payment API Integration",
      "Authentication API",
      "Database API",
      "Webhook Integration",
      "CRM Integration",
      "Shipping API Integration",
      "Custom Backend Services",
    ],
    category: "SOFTWARE_DEVELOPMENT",
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    shortTitle: "Website Redesign",
    icon: "refresh",
    objective: "Turn an old website into a modern, responsive and user-friendly one.",
    services: [
      "UI/UX Redesign",
      "Website Modernization",
      "Mobile Responsiveness",
      "Navigation Improvement",
      "Performance Optimization",
      "Conversion-focused Layout",
      "Technical SEO Improvements",
      "Accessibility Improvements",
    ],
    category: "WEBSITE_DEVELOPMENT",
  },
];

export const getDevService = (slug: string) => developmentServices.find((s) => s.slug === slug);

export const additionalServices: { name: string; engagement: string }[] = [
  { name: "Website Maintenance", engagement: "Monthly" },
  { name: "Website Security Monitoring", engagement: "Monthly" },
  { name: "Website Backup Management", engagement: "Monthly" },
  { name: "Bug Fixing", engagement: "Hourly or fixed" },
  { name: "Website Migration", engagement: "Project-based" },
  { name: "Feature Development", engagement: "Project-based" },
  { name: "Hosting Setup", engagement: "One-time setup" },
  { name: "Domain and Business Email Setup", engagement: "One-time setup" },
  { name: "Technical Consultation", engagement: "Hourly" },
];

export const afterLaunchSupport = [
  "Website maintenance",
  "Security monitoring",
  "Feature updates",
  "Performance optimization",
  "Technical support",
] as const;

export const techStack: { layer: string; technology: string }[] = [
  { layer: "Frontend", technology: "HTML, CSS, JavaScript" },
  { layer: "UI development", technology: "React, Next.js" },
  { layer: "Programming", technology: "TypeScript" },
  { layer: "Styling", technology: "Tailwind CSS" },
  { layer: "Backend", technology: "Node.js, Express.js" },
  { layer: "Database", technology: "PostgreSQL, MySQL, MongoDB" },
  { layer: "ORM", technology: "Prisma" },
  { layer: "API", technology: "REST API" },
  { layer: "Authentication", technology: "Secure authentication solutions" },
  { layer: "Deployment", technology: "Vercel, suitable cloud or server hosting" },
  { layer: "Version control", technology: "Git and GitHub" },
];

export const qualityStandards: { area: string; standard: string }[] = [
  { area: "Code quality", standard: "Clean, reusable, maintainable code" },
  { area: "Security", standard: "Input validation, secure authentication, access control" },
  { area: "Performance", standard: "Optimized assets, caching, efficient queries" },
  { area: "SEO", standard: "Semantic HTML, metadata, sitemap" },
  { area: "Accessibility", standard: "Keyboard navigation, labels, contrast" },
  { area: "Responsive design", standard: "Mobile, tablet and desktop" },
  { area: "Testing", standard: "Functional, integration and regression testing" },
  { area: "Deployment", standard: "Environment separation and backups" },
  { area: "Documentation", standard: "Setup, API and handover documentation" },
];

export const clientSegments: { title: string; items: string[] }[] = [
  {
    title: "Small and medium businesses",
    items: ["Business website", "Company profile", "Service website", "Website maintenance"],
  },
  {
    title: "E-commerce business owners",
    items: ["Online store", "Payment integration", "Order management", "Store optimization"],
  },
  {
    title: "Startups",
    items: ["MVP development", "SaaS applications", "Custom dashboards", "API development"],
  },
  {
    title: "International clients",
    items: ["Full-stack development", "Business websites", "E-commerce", "Custom software"],
  },
];

export const developmentWhyChoose: { title: string; text: string; icon: IconName }[] = [
  {
    icon: "compass",
    title: "Business goals first",
    text: "We start from what your business needs, not from a favourite tool. Technology is added only where it creates value.",
  },
  {
    icon: "layers",
    title: "Right-sized technology",
    text: "We pick the stack that fits your project and avoid unnecessary complexity, so your system stays maintainable.",
  },
  {
    icon: "shield",
    title: "Quality and security standards",
    text: "Every project follows defined standards for code quality, security, performance, accessibility and testing.",
  },
  {
    icon: "users",
    title: "A long-term technical partner",
    text: "After launch we can continue with maintenance, monitoring, feature updates and technical support.",
  },
];

export const lifecycle: { step: string; title: string; text: string }[] = [
  { step: "01", title: "Inquiry", text: "You reach out through an inquiry, referral or direct contact." },
  {
    step: "02",
    title: "Requirement analysis",
    text: "We study your business goals, features, scope and budget.",
  },
  {
    step: "03",
    title: "Proposal and agreement",
    text: "You receive a quotation with timeline, deliverables and payment terms.",
  },
  {
    step: "04",
    title: "Project planning",
    text: "We define tasks, milestones and responsibilities.",
  },
  {
    step: "05",
    title: "UI/UX and development",
    text: "We design, code and integrate in reviewable stages.",
  },
  {
    step: "06",
    title: "Quality assurance",
    text: "Functional, responsive, security and performance checks.",
  },
  {
    step: "07",
    title: "Client review",
    text: "You give feedback, we handle revisions, and you approve.",
  },
  {
    step: "08",
    title: "Deployment and handover",
    text: "Live launch, documentation and credentials handover.",
  },
  {
    step: "09",
    title: "Maintenance and support",
    text: "Monthly support or an agreed service contract.",
  },
];

export const projectDocumentation = [
  "01-Requirements",
  "02-Proposal-Agreement",
  "03-Design",
  "04-Development",
  "05-Testing",
  "06-Delivery",
  "07-Documentation",
  "08-Maintenance",
] as const;

export const projectPractices = [
  "a dedicated GitHub repository",
  "issue tracking",
  "backups",
  "access control",
] as const;

export const agreementCovers = [
  "Scope",
  "Revision limit",
  "Client responsibilities",
  "Payment deadlines",
  "Ownership transfer",
  "Support period",
] as const;

/** One company, several solutions: example journey (from the Development Division plan). */
export const crossDivisionJourney: { division: string; slug: string; work: string }[] = [
  { division: "Creative Studio", slug: "creative-studio", work: "Logo and brand identity" },
  { division: "Development", slug: "development", work: "Website or e-commerce store" },
  { division: "Digital", slug: "digital", work: "SEO and social media marketing" },
  { division: "Technology Support", slug: "technology-support", work: "Website maintenance" },
  { division: "Code Academy", slug: "code-academy", work: "Staff training when needed (planned)" },
];

export const developmentFaq: { q: string; a: string }[] = [
  {
    q: "Is TanimXploit Development a separate company?",
    a: "No. It is a business division of TanimXploit Technology Services. Your agreement, invoicing and relationship are with the parent company, and the Development Division delivers the technical work.",
  },
  {
    q: "Which technologies do you use?",
    a: "Our core stack includes React, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, PostgreSQL, MySQL, MongoDB and Prisma. We do not use all of them on every project. We choose what fits your requirements.",
  },
  {
    q: "Do you work with clients outside Bangladesh?",
    a: "Yes. We work with clients in Bangladesh and internationally. Payment and shipping integrations are chosen according to the client's country and business requirements.",
  },
  {
    q: "Which payment and delivery services can you integrate for a store in Bangladesh?",
    a: "As required by the project: bKash, Nagad, SSLCommerz, Cash on Delivery, and delivery services such as Pathao, Steadfast and RedX.",
  },
  {
    q: "What does the project agreement cover?",
    a: "Scope, revision limit, client responsibilities, payment deadlines, ownership transfer and support period are stated clearly in the agreement.",
  },
  {
    q: "How are payments structured?",
    a: "Payments are usually tied to project milestones. The exact milestones and payment terms are set per project and written into the agreement.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We can provide monthly maintenance, security monitoring, backup management, bug fixing and feature updates under an agreed service arrangement.",
  },
  {
    q: "What do I receive when the project is finished?",
    a: "The live project, setup and handover documentation, and handover of credentials. Ownership transfer terms are stated in your agreement.",
  },
];
