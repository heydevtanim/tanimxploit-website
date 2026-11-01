import type { DivisionSection } from "./types";

/**
 * TanimXploit Technology Support: a division of TanimXploit Technology Services.
 *
 * NOT published (internal planning): BDT price ranges, hourly rates, revenue model, team roles,
 * financial metrics, KPIs, roadmap, 30-day plan, client-acquisition plan, internal SLA targets.
 * Honest scope: no website is "100% secure", and response times are never presented as guaranteed.
 */
export const technologySupportSection: DivisionSection = {
  key: "technology-support",
  basePath: "/technology-support",
  servicesSegment: "services",
  itemLabel: { singular: "service", plural: "services" },
  processLabel: "Support Process",
  hasPortfolio: false,
  category: "TECHNICAL_SUPPORT",
  status: "available",
  statusNote: "Currently available for support inquiries.",
  quoteHref: "/contact?category=TECHNICAL_SUPPORT",
  ctaLabel: "Ask for Technical Support",
  navCtaLabel: "Request Support",
  navLabel: "Technology Support",

  brand: {
    name: "TanimXploit Technology Support",
    shortName: "Technology Support",
    parent: "TanimXploit Technology Services",
    tagline: "Keeping Your Digital Business Running Smoothly.",
    positioning:
      "TanimXploit Technology Support is a technical support division focused on helping businesses maintain reliable, secure and well-performing websites and digital systems.",
    intro:
      "Many businesses have a website but no IT department or technical team. When something breaks, an update fails or email stops working, they are stuck. We provide regular maintenance, monitoring and technical assistance so you can focus on your business.",
    legalNote:
      "TanimXploit Technology Support is a division of TanimXploit Technology Services. Your agreement and client relationship are with the parent company.",
  },

  seo: {
    overviewDescription:
      "TanimXploit Technology Support provides WordPress and WooCommerce website maintenance, security monitoring, bug fixing, hosting and domain assistance and business email setup.",
    servicesDescription:
      "Website maintenance, security monitoring, bug fixing, hosting and domain assistance, business email setup and technical support from TanimXploit Technology Support.",
    processDescription:
      "How TanimXploit Technology Support works: a nine-step support workflow with priority levels, backups before changes, testing, documentation and clear service agreements.",
  },

  hero: {
    panelLabel: "What we keep running",
    panelItems: ["WordPress and WooCommerce sites", "Backups and security monitoring", "Hosting, domains and business email"],
  },

  about: {
    eyebrow: "About Technology Support",
    title: "Reliable help when your website needs it",
    objectivesTitle: "What we aim to do",
    objectives: [
      "Maintain your website regularly",
      "Monitor website security and availability",
      "Identify and help resolve technical issues quickly",
      "Support WordPress and WooCommerce websites",
      "Assist with hosting and domain management",
      "Help configure business email",
      "Offer monthly maintenance plans",
      "Keep websites built by TanimXploit Development well supported over the long term",
    ],
    responsibilitiesTitle: "What Technology Support does",
    responsibilities: [
      "Website maintenance",
      "Security monitoring",
      "Technical troubleshooting",
      "Backup management",
      "Hosting and domain assistance",
      "Email configuration",
      "Website performance monitoring",
      "Technical documentation and client support",
    ],
  },

  focus: {
    title: "Three things we focus on first",
    description:
      "We start with the services where we can deliver the most dependable value, and add others as we grow.",
    items: [
      {
        icon: "refresh",
        title: "WordPress and WooCommerce maintenance",
        text: "Scheduled updates, health checks and a monthly report, with a backup taken before every change.",
      },
      {
        icon: "shield",
        title: "Security and backup monitoring",
        text: "Regular monitoring, backup management and security configuration that reduce risk.",
      },
      {
        icon: "wrench",
        title: "Troubleshooting and bug fixing",
        text: "Root-cause diagnosis and tested fixes for errors, plugin conflicts, forms and checkout issues.",
      },
    ],
  },

  services: [
    {
      slug: "website-maintenance",
      title: "Website Maintenance",
      shortTitle: "Maintenance",
      icon: "refresh",
      objective: "Keep your website updated, checked and healthy.",
      services: [
        "WordPress core updates",
        "Theme updates",
        "Plugin updates",
        "Website health checks",
        "Database maintenance",
        "Broken link checks",
        "Website error troubleshooting",
        "Form testing",
        "Website content updates",
        "Routine maintenance",
      ],
      deliverables: [
        "Scheduled website updates",
        "A monthly website health report",
        "Basic error monitoring",
        "A maintenance activity log",
        "Technical recommendations",
      ],
      note: "We take a backup and check compatibility before updating. Risky updates are tested in a staging environment instead of directly on your live website.",
      category: "TECHNICAL_SUPPORT",
    },
    {
      slug: "website-security-monitoring",
      title: "Website Security Monitoring",
      shortTitle: "Security",
      icon: "shield",
      objective: "Find and reduce security risks through regular technical monitoring.",
      services: [
        "Security configuration review",
        "SSL certificate monitoring",
        "Malware scan",
        "Suspicious activity review",
        "Login security improvement",
        "Vulnerability checks",
        "Security plugin configuration",
        "File permission review",
        "Security incident assistance",
        "Recovery support",
      ],
      note: "No website can be guaranteed to be 100% secure. Security monitoring helps reduce risk but does not promise complete protection.",
      category: "TECHNICAL_SUPPORT",
    },
    {
      slug: "bug-fixing-troubleshooting",
      title: "Bug Fixing and Troubleshooting",
      shortTitle: "Bug Fixing",
      icon: "wrench",
      objective: "Identify and fix functional and technical problems on your website.",
      services: [
        "WordPress error fixing",
        "WooCommerce issue resolution",
        "PHP error troubleshooting",
        "CSS layout fixes",
        "JavaScript error fixes",
        "Plugin conflict resolution",
        "Theme compatibility issues",
        "Broken forms",
        "Checkout issues",
        "Mobile responsiveness fixes",
        "Database error assistance",
      ],
      note: "Before changing anything we reproduce the error, take a backup and analyze the root cause.",
      category: "TECHNICAL_SUPPORT",
    },
    {
      slug: "hosting-domain-assistance",
      title: "Hosting and Domain Assistance",
      shortTitle: "Hosting & Domain",
      icon: "server",
      objective: "Help with the technical configuration of your hosting and domain.",
      services: [
        "Domain DNS configuration",
        "Hosting setup assistance",
        "cPanel assistance",
        "SSL installation assistance",
        "Website migration",
        "DNS troubleshooting",
        "Domain connection",
        "Server configuration assistance",
        "Hosting performance review",
        "Backup configuration",
      ],
      note: "Hosting and domain renewal fees are your own cost and are separate from our service.",
      category: "TECHNICAL_SUPPORT",
    },
    {
      slug: "business-email-setup",
      title: "Business Email Setup",
      shortTitle: "Business Email",
      icon: "mail",
      objective: "Set up and troubleshoot a professional email system for your business.",
      services: [
        "Business email account setup",
        "Domain-based email configuration",
        "Email client configuration",
        "SMTP setup",
        "Email delivery troubleshooting",
        "SPF configuration",
        "DKIM configuration",
        "DMARC configuration",
        "Email forwarding",
        "Email migration assistance",
      ],
      highlights: [
        {
          title: "Example addresses",
          items: ["info@yourcompany.com", "support@yourcompany.com", "sales@yourcompany.com", "admin@yourcompany.com"],
        },
      ],
      note: "Email hosting subscriptions and provider charges are separate.",
      category: "TECHNICAL_SUPPORT",
    },
    {
      slug: "technical-support",
      title: "Technical Support",
      shortTitle: "Technical Support",
      icon: "lifebuoy",
      objective: "Help with day-to-day website and IT-related problems.",
      services: [
        "Website troubleshooting",
        "WordPress dashboard assistance",
        "WooCommerce configuration support",
        "Website content upload assistance",
        "Technical consultation",
        "Plugin configuration",
        "Website backup assistance",
        "Website migration support",
        "Basic hosting troubleshooting",
        "Website recovery assistance",
      ],
      category: "TECHNICAL_SUPPORT",
    },
  ],
  servicesHeading: {
    eyebrow: "Services",
    title: "Six core technical services",
    description: "Choose a monthly plan, or ask for help only when you need it.",
    pageDescription:
      "Six core services covering maintenance, security, bug fixing, hosting and domain help, business email and everyday technical support.",
  },
  detailLabels: {
    included: "What is included",
    deliverables: "What you receive",
    targetClients: "Who it is for",
    requestLabel: "Request support",
    asideText:
      "Describe what is happening with your website or system. We will assess the issue and suggest the next step.",
  },

  offerings: {
    id: "packages",
    eyebrow: "Monthly maintenance",
    title: "Maintenance plans for every kind of website",
    description:
      "Four plans from basic care to e-commerce care. Support hours, response time, content update limit, backup retention and excluded services are stated in writing in each agreement.",
    tone: "soft",
    groups: [
      {
        title: "Basic Care",
        target: "Small business website",
        points: [
          "WordPress core update",
          "Theme and plugin updates",
          "Scheduled backup",
          "Basic security check",
          "Website uptime check",
          "Basic website health check",
          "Monthly maintenance report",
        ],
        excluded: [
          "Custom development",
          "Major bug fixing",
          "Website redesign",
          "Emergency recovery",
          "Premium plugin licenses (unless specified)",
        ],
      },
      {
        title: "Standard Care",
        target: "Business website",
        text: "Everything in Basic Care, plus:",
        points: [
          "More frequent backups",
          "Security monitoring",
          "Broken link check",
          "Basic content updates (limited scope)",
          "Performance check",
          "Form testing",
          "Priority support",
        ],
      },
      {
        title: "Premium Care",
        target: "Business-critical website",
        text: "Everything in Standard Care, plus:",
        points: [
          "Enhanced monitoring",
          "Performance optimization review",
          "Advanced troubleshooting allowance",
          "Staging update workflow",
          "Priority technical support",
          "Detailed monthly report",
        ],
      },
      {
        title: "E-commerce Care",
        target: "WooCommerce stores",
        points: [
          "WordPress and WooCommerce updates",
          "Plugin compatibility review",
          "Scheduled backups",
          "Checkout testing",
          "Cart and order flow testing",
          "Payment gateway health check",
          "Security monitoring",
          "Performance review",
          "Priority support",
        ],
      },
    ],
    note: "Other ways to work together: hourly or on-demand support, emergency support, migration and recovery projects, and white-label support for agencies.",
  },

  additional: {
    eyebrow: "Expanding services",
    title: "More services as we grow",
    description: "These services are added when we have the skills and resources to deliver them well.",
    items: [
      "Website performance optimization (images, caching, CSS and JavaScript, database)",
      "Website migration (hosting, WordPress, domain, database, email, post-migration testing)",
      "WooCommerce technical support (cart, checkout, payment gateway, shipping, orders)",
      "Website recovery (backup restoration, malware cleanup assistance, database recovery)",
      "Basic business IT assistance (software setup, printer configuration, basic network troubleshooting, remote help)",
    ],
    note: "Advanced server administration, network security and enterprise IT support are offered only once the right skills and resources are in place.",
  },

  whyChoose: [
    {
      icon: "refresh",
      title: "Backup before every change",
      text: "We take a backup and a rollback plan before touching a live website, and test afterwards.",
    },
    {
      icon: "lock",
      title: "Least-privilege access",
      text: "We use only the access we need, with two-factor authentication, and remove it when work ends.",
    },
    {
      icon: "layers",
      title: "Built and supported together",
      text: "Websites built by TanimXploit Development can continue with the same company after launch.",
    },
    {
      icon: "compass",
      title: "Honest about limits",
      text: "No website is 100% secure and no response time is guaranteed unless it is written in your agreement.",
    },
  ],
  whyTitle: "Why TanimXploit Technology Support",

  audience: {
    eyebrow: "Who we support",
    title: "Websites and teams without in-house IT",
    description: "We support clients in Bangladesh and internationally.",
    items: [
      {
        title: "Existing website owners",
        text: "You have a website but no team to maintain it.",
        services: ["Maintenance", "Security monitoring", "Bug fixing", "Backups"],
      },
      {
        title: "Small businesses",
        text: "Your website holds customer information, services or operations.",
        services: ["Website maintenance", "Hosting assistance", "Email configuration", "Technical support"],
      },
      {
        title: "E-commerce stores",
        text: "You manage orders, payments and customers online.",
        services: ["WooCommerce maintenance", "Checkout troubleshooting", "Payment gateway support", "Performance"],
      },
      {
        title: "Companies without IT staff",
        text: "You have no IT department.",
        services: ["Remote technical support", "Business email support", "Hosting assistance", "Consultation"],
      },
      {
        title: "Agencies and freelancers",
        text: "You need ongoing technical help for your own clients.",
        services: ["White-label maintenance", "WordPress support", "Bug fixing", "Emergency troubleshooting"],
      },
    ],
  },

  extras: [
    {
      id: "priority",
      eyebrow: "Support priorities",
      title: "How we prioritize issues",
      description:
        "Every issue is classified so the most serious problems are handled first. Response targets are set in your agreement.",
      tone: "light",
      groups: [
        { title: "Critical", text: "Website down or checkout unavailable.", points: [] },
        { title: "High", text: "A major function is broken.", points: [] },
        { title: "Medium", text: "A feature partly works.", points: [] },
        { title: "Low", text: "A minor interface or content issue.", points: [] },
      ],
      note: "Response targets are planning targets set in each agreement. They are not guaranteed resolution times.",
    },
  ],

  workflow: [
    {
      step: "01",
      title: "Support request",
      text: "You submit your issue by email, support form or ticket.",
    },
    {
      step: "02",
      title: "Issue classification",
      text: "We classify the issue as critical, high, medium or low.",
    },
    {
      step: "03",
      title: "Initial diagnosis",
      text: "We check error logs, the browser console, server status and the steps to reproduce.",
    },
    {
      step: "04",
      title: "Backup and safety check",
      text: "We confirm a backup and a rollback plan before any production change.",
    },
    {
      step: "05",
      title: "Troubleshooting",
      text: "We find the root cause and fix it.",
    },
    {
      step: "06",
      title: "Testing",
      text: "We test on desktop, on mobile and the relevant functions.",
    },
    {
      step: "07",
      title: "Client update",
      text: "We tell you the issue, the solution and any remaining risks.",
    },
    {
      step: "08",
      title: "Documentation",
      text: "We record what happened, what changed and how it was solved.",
    },
    {
      step: "09",
      title: "Follow-up",
      text: "We confirm with you and close the ticket.",
    },
  ],
  workflowHeading: {
    eyebrow: "Support process",
    title: "How a support request is handled",
    description: "Nine steps from your request to a documented, closed ticket.",
    pageDescription:
      "Every support request follows the same workflow, so changes are safe, tested and documented.",
  },

  standards: [
    {
      eyebrow: "Production safety",
      title: "How we protect your live website",
      items: [
        "A backup before every change to a live website",
        "A staging environment where possible",
        "No direct edits to WordPress core files",
        "Your approval before critical changes",
        "Documentation of every important change",
      ],
    },
    {
      eyebrow: "Backups",
      title: "Our backup approach",
      items: [
        "Backup frequency matches your website's risk",
        "Both the database and website files are backed up",
        "Backups are kept in a separate storage location",
        "Recovery is tested by restoring a backup",
        "Retention period is written into your agreement",
      ],
    },
    {
      eyebrow: "Security",
      title: "Security standards",
      items: [
        "Strong and two-factor authentication",
        "Least-privilege access and secure password management",
        "SSL certificate monitoring",
        "Plugin and theme update review",
        "Malware and error log monitoring",
        "Access removed when service ends",
      ],
    },
    {
      eyebrow: "Agreement",
      title: "What your support agreement states",
      intro: "Every support contract defines:",
      items: [
        "Support availability and channels",
        "Response time targets by priority",
        "Issue priority and resolution process",
        "Included support hours",
        "Emergency support policy",
        "Maintenance schedule and backup responsibility",
        "Excluded services",
      ],
    },
  ],
  tools: {
    title: "Tools we use",
    items: [
      "WordPress and WooCommerce",
      "WP-CLI",
      "cPanel",
      "UpdraftPlus",
      "Wordfence / Solid Security",
      "Google PageSpeed Insights",
      "GTmetrix",
      "UptimeRobot / Better Stack",
      "Google Search Console",
      "Chrome DevTools",
      "Git and GitHub",
    ],
    note: "Before installing a plugin on your website we check compatibility, license, security and performance impact.",
  },
  documentation: {
    intro:
      "Each client's website and support history is stored separately. Passwords and secret keys are never kept in ordinary documents or spreadsheets; we use a password manager and secure access management.",
    folders: [
      "01-Client-Information",
      "02-Website-Access-Records",
      "03-Hosting-Domain-Information",
      "04-Backup-Records",
      "05-Maintenance-Logs",
      "06-Security-Reports",
      "07-Bug-Fix-Records",
      "08-Performance-Reports",
      "09-Support-Tickets",
      "10-Agreements",
    ],
  },

  collaboration: [
    { division: "Development", slug: "development", work: "Maintenance and support for websites we built" },
    { division: "Creative Studio", slug: "creative-studio", work: "Technical implementation of design and creative assets" },
    { division: "Digital", slug: "digital", work: "SEO technical issues, analytics and tracking support" },
    { division: "Code Academy", slug: "code-academy", work: "Technical learning environment support (planned)" },
    { division: "Learning", slug: "learning", work: "Learning platform and website maintenance (planned)" },
  ],
  journeys: [
    {
      title: "New website",
      steps: [
        { division: "Development", work: "Builds the website" },
        { division: "Technology Support", work: "Optional ongoing maintenance plan" },
      ],
    },
    {
      title: "Online business",
      steps: [
        { division: "Development", work: "E-commerce website" },
        { division: "Digital", work: "SEO and marketing" },
        { division: "Technology Support", work: "Maintenance, backups and security" },
      ],
    },
  ],
  collaborationHeading: {
    eyebrow: "One company, multiple solutions",
    title: "Support that stays with your website",
    description: "Websites built by TanimXploit can continue under the same team's care after launch.",
  },

  faq: [
    {
      q: "Is TanimXploit Technology Support a separate company?",
      a: "It is a division of TanimXploit Technology Services. Your agreement and client relationship are with the parent company.",
    },
    {
      q: "Can you support a website that someone else built?",
      a: "Yes, for WordPress and WooCommerce websites we begin with a technical review so we understand the site before we maintain it.",
    },
    {
      q: "Do you guarantee that my website will be 100% secure?",
      a: "No website can be guaranteed to be completely secure. We monitor, configure and maintain it to reduce risk.",
    },
    {
      q: "Do you take a backup before updating?",
      a: "Yes. We take a backup, check compatibility and use a staging environment where possible before risky updates.",
    },
    {
      q: "What is not included in a maintenance plan?",
      a: "Items such as custom development, major bug fixing, redesign and emergency recovery are not part of a basic plan unless written in your agreement.",
    },
    {
      q: "Are hosting and domain fees included?",
      a: "No. Hosting, domain renewal, email hosting and premium plugin licenses are your own costs unless the agreement says otherwise.",
    },
    {
      q: "How quickly will you respond?",
      a: "Response targets depend on the priority of the issue and on your agreement. They are targets, not guaranteed resolution times.",
    },
    {
      q: "Do you offer white-label support for agencies?",
      a: "Yes. We can support an agency's clients under the agency's brand, with confidentiality and a clear service agreement.",
    },
  ],
  cta: {
    title: "Need technical help?",
    text: "Tell us what is happening with your website or system. We will assess it and suggest the next step.",
  },
  homeBand: {
    eyebrow: "TanimXploit Technology Support",
    title: "Keeping your digital business running smoothly",
    text: "WordPress and WooCommerce maintenance, backups, security monitoring, bug fixing, hosting help and business email setup.",
    exploreLabel: "Explore Technology Support",
    secondaryLabel: "See services",
  },
};
