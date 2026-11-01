import type { DivisionSection } from "./types";

/**
 * TanimXploit Digital: a division of TanimXploit Technology Services.
 *
 * NOT published (internal planning): price ranges, revenue streams, team roles, financial tracking,
 * KPIs, 12-month roadmap, 30-day plan, client-acquisition channels.
 * Honest scope: no guaranteed rankings, sales or lead numbers. Concept projects are always labelled.
 */
export const digitalSection: DivisionSection = {
  key: "digital",
  basePath: "/digital",
  servicesSegment: "services",
  itemLabel: { singular: "service", plural: "services" },
  processLabel: "Our Process",
  hasPortfolio: true,
  category: "DIGITAL_MARKETING",
  status: "available",
  statusNote: "Currently available for project inquiries.",
  quoteHref: "/contact?category=DIGITAL_MARKETING",
  ctaLabel: "Discuss Digital Growth",
  navCtaLabel: "Request a Consultation",
  navLabel: "Digital",

  brand: {
    name: "TanimXploit Digital",
    shortName: "Digital",
    parent: "TanimXploit Technology Services",
    tagline: "Growing Businesses Through Smarter Digital Marketing.",
    positioning:
      "TanimXploit Digital is a digital marketing division focused on helping businesses strengthen their online presence, reach the right audience and achieve sustainable digital growth.",
    intro:
      "We improve the online presence of businesses, e-commerce stores, startups and service providers, and support their growth through practical digital marketing. Every strategy starts from your business goals, target audience, market position and marketing budget, not from a fixed template.",
    legalNote:
      "TanimXploit Digital is a division of TanimXploit Technology Services. Your agreement and client relationship are with the parent company.",
  },

  seo: {
    overviewDescription:
      "TanimXploit Digital helps businesses strengthen their online presence through social media management, search engine optimization, content marketing, paid advertising support and email marketing. No guaranteed rankings or sales.",
    servicesDescription:
      "Social media management and SEO from TanimXploit Digital, with content marketing, paid advertising, email marketing and strategy consultation as expanding services.",
    processDescription:
      "How TanimXploit Digital works: ten clear steps from inquiry and audit to strategy, execution, reporting and monthly review, with secure account access and ethical marketing standards.",
    portfolioDescription:
      "The TanimXploit Digital portfolio is being built. Demonstration and concept projects are always labelled and never shown as client results.",
  },

  hero: {
    panelLabel: "What we focus on",
    panelItems: ["Social media management", "Search engine optimization", "Honest, measurable reporting"],
  },

  about: {
    eyebrow: "About Digital",
    title: "Marketing that is planned, measured and honest",
    objectivesTitle: "What we aim to do",
    objectives: [
      "Increase your business's online visibility",
      "Build and manage your social media presence",
      "Improve organic traffic through search engine optimization",
      "Run targeted digital advertising",
      "Plan content that your audience finds useful",
      "Support qualified leads and customer acquisition",
      "Work together with the other TanimXploit divisions for complete digital solutions",
    ],
    responsibilitiesTitle: "What the Digital division does",
    responsibilities: [
      "Digital marketing strategy",
      "SEO management",
      "Social media management",
      "Content planning",
      "Advertising campaign management",
      "Marketing analytics and performance reporting",
      "Client marketing consultation",
    ],
  },

  focus: {
    title: "Two services we start with",
    description:
      "We concentrate on two core services and add others as demand, skills and resources allow, instead of promising every marketing service at once.",
    items: [
      {
        icon: "share",
        title: "Social media management",
        text: "Regular, planned management of your accounts, with a content calendar and a monthly performance report.",
      },
      {
        icon: "search",
        title: "Search engine optimization",
        text: "Technical, on-page and local SEO that improves how your website is found and understood by search engines.",
      },
      {
        icon: "chart",
        title: "Clear reporting",
        text: "Monthly reports focused on your business goals, not only followers, likes or impressions.",
      },
    ],
  },

  services: [
    {
      slug: "social-media-management",
      title: "Social Media Management",
      shortTitle: "Social Media",
      icon: "share",
      objective:
        "Regular management of your social media accounts, with content planning and audience engagement.",
      services: [
        "Social media strategy",
        "Monthly content calendar",
        "Content planning",
        "Post scheduling",
        "Caption writing",
        "Hashtag research",
        "Social media page optimization",
        "Audience engagement",
        "Performance monitoring",
        "Monthly reporting",
      ],
      targetClients: [
        "Local businesses such as restaurants, clothing stores, salons and training centers",
        "E-commerce businesses and online stores",
        "Growing brands that already have a presence",
      ],
      deliverables: [
        "A monthly content calendar",
        "Planned and scheduled posts",
        "Caption and hashtag research",
        "A monthly performance report",
      ],
      highlights: [
        {
          title: "Platforms",
          items: ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube"],
          note: "Platforms and the number of posts depend on the package agreed with you.",
        },
      ],
      note: "Every package states the number of posts, platforms and revisions, the approval process and whether design work is included, so scope is always clear.",
      category: "DIGITAL_MARKETING",
    },
    {
      slug: "search-engine-optimization",
      title: "Search Engine Optimization (SEO)",
      shortTitle: "SEO",
      icon: "search",
      objective:
        "Improve your website's organic visibility and attract relevant traffic from search engines.",
      services: [
        "Technical SEO audit",
        "Target keyword research and search intent analysis",
        "Competitor keyword analysis and keyword mapping",
        "On-page SEO: titles, meta descriptions, headings, internal links, image alt text, URLs",
        "Technical SEO: sitemap, robots.txt, canonical tags, structured data, mobile usability",
        "Core Web Vitals and page speed review",
        "Local SEO and Google Business Profile optimization",
        "Monthly SEO reporting and recommendations",
      ],
      targetClients: [
        "Business websites that want to be found more easily",
        "E-commerce stores that need product and category page optimization",
        "Local businesses that serve customers in a specific area",
        "Service providers that want qualified inquiries",
      ],
      deliverables: [
        "An SEO audit with a prioritized issue list",
        "A keyword plan mapped to your pages",
        "Implemented or recommended on-page and technical fixes",
        "Monthly organic traffic, keyword and Search Console reporting",
      ],
      highlights: [
        {
          title: "Reporting covers",
          items: [
            "Organic traffic",
            "Keyword performance",
            "Search Console data",
            "Indexing status",
            "Technical issues",
            "Monthly recommendations",
          ],
        },
        {
          title: "Works together with",
          items: ["TanimXploit Development", "TanimXploit Technology Support"],
          note: "Development builds SEO-friendly websites and Technology Support helps with tracking and technical issues.",
        },
      ],
      note: "SEO results depend on competition, the scope of work and search engine changes. We do not guarantee rankings or results within a fixed time.",
      category: "DIGITAL_MARKETING",
    },
  ],
  servicesHeading: {
    eyebrow: "Core services",
    title: "Two core digital services",
    description: "Start with one, or combine them. Other services are added as we grow.",
    pageDescription:
      "Social media management and search engine optimization are our two core services, with more marketing services expanding over time.",
  },
  detailLabels: {
    included: "What is included",
    deliverables: "What you receive",
    targetClients: "Who it is for",
    requestLabel: "Discuss this service",
    asideText:
      "Tell us about your business and goals. We will review where you are today and propose a realistic scope.",
  },

  offerings: {
    id: "ways",
    eyebrow: "Ways to work with us",
    title: "Monthly support, campaigns and one-time projects",
    description: "The right model depends on your goals and resources. Scope and reporting are agreed in writing.",
    tone: "soft",
    groups: [
      {
        title: "Monthly retainers",
        text: "Ongoing management with regular reporting.",
        points: ["Social media management", "SEO retainer", "Content marketing", "Email marketing"],
      },
      {
        title: "Campaign management",
        text: "Planning, setup, monitoring and optimization of paid campaigns.",
        points: ["Meta Ads (Facebook and Instagram)", "Google Ads", "Conversion tracking", "Performance reporting"],
      },
      {
        title: "One-time projects",
        text: "A defined piece of work with a clear result.",
        points: ["SEO audit", "Digital marketing audit", "Marketing strategy and consultation", "Competitor analysis"],
      },
    ],
    note: "Advertising spend is separate from our service fee and is paid by you. Whenever possible, campaigns run in your own ad account, so you keep ownership.",
  },

  additional: {
    eyebrow: "Expanding services",
    title: "More services as we grow",
    description:
      "These services are added step by step as client demand, team skills and resources grow. Ask us if you need one of them.",
    items: [
      "Content marketing (strategy, blog planning, SEO content briefs)",
      "Digital advertising (Meta Ads, Google Ads, LinkedIn Ads, TikTok Ads)",
      "Email marketing (campaigns, newsletters, welcome sequences, automation setup)",
      "Marketing strategy and consultation (audit, audience research, channel selection, funnel planning)",
    ],
    note: "We start with the services we can deliver well and expand only when we are ready.",
  },

  whyChoose: [
    {
      icon: "compass",
      title: "Strategy before tactics",
      text: "We start from your goals, audience and budget before choosing channels or content.",
    },
    {
      icon: "chart",
      title: "Goal-based reporting",
      text: "We report on what matters to your business, not only followers, likes or impressions.",
    },
    {
      icon: "layers",
      title: "Connected with development and design",
      text: "Website, brand and marketing are coordinated by one company, so they work together.",
    },
    {
      icon: "shield",
      title: "Ethical marketing",
      text: "No fake reviews, no fake followers, no misleading ads and no unsolicited bulk messaging.",
    },
  ],
  whyTitle: "Why TanimXploit Digital",

  audience: {
    eyebrow: "Who we help",
    title: "Businesses that want to be found and chosen",
    description: "We work with clients in Bangladesh and internationally.",
    items: [
      {
        title: "Local businesses",
        text: "Businesses that want to reach more customers online.",
        services: ["Facebook page management", "Local SEO", "Google Business Profile", "Local advertising"],
      },
      {
        title: "E-commerce businesses",
        text: "Online stores that want more visibility and customers.",
        services: ["E-commerce SEO", "Product page optimization", "Social media", "Conversion tracking"],
      },
      {
        title: "Service providers",
        text: "Agencies, consultants, real estate, IT companies and educational institutes seeking qualified inquiries.",
        services: ["SEO", "Content marketing", "LinkedIn marketing", "Email marketing"],
      },
      {
        title: "Growing brands",
        text: "Brands with an online presence that need a better marketing system.",
        services: ["Marketing strategy", "Social media management", "SEO retainer", "Marketing analytics"],
      },
    ],
  },

  portfolio: {
    eyebrow: "Portfolio and case studies",
    title: "Our portfolio is being built",
    text: "We publish only approved work. Demonstration and concept projects are always labelled clearly and are never shown as real client results.",
    plannedTitle: "Demonstration and concept projects",
    plannedDescription:
      "These projects are in preparation. They are sample strategies, not client work, and show no real performance data.",
    concepts: [
      "Local business social media strategy",
      "E-commerce SEO audit",
      "Clothing brand social media campaign",
      "Restaurant local SEO strategy",
      "Startup digital marketing strategy",
      "Website SEO improvement case study",
      "Email marketing campaign concept",
      "Meta Ads campaign strategy",
    ],
    conceptLabel: "Demonstration / Concept",
    caseStudyTitle: "What every case study will show",
    caseStudy: [
      "Business overview",
      "Marketing challenge",
      "Target audience",
      "Strategy",
      "Execution plan",
      "Tools used",
      "Performance metrics (only when real data exists)",
      "Key learnings",
      "Next steps",
    ],
    ctaTitle: "Want a review of your online presence?",
    ctaText: "Tell us about your business and we will suggest a realistic next step.",
  },

  workflow: [
    { step: "01", title: "Client inquiry", text: "You tell us about your business and marketing needs." },
    {
      step: "02",
      title: "Business audit",
      text: "We review your website, social media, competitors and existing marketing.",
    },
    {
      step: "03",
      title: "Strategy development",
      text: "We build a marketing strategy around your business goals.",
    },
    {
      step: "04",
      title: "Proposal and agreement",
      text: "Scope, deliverables, timeline and reporting frequency are agreed in writing.",
    },
    {
      step: "05",
      title: "Account access",
      text: "You give secure, role-based access to the accounts we need, and you stay the owner.",
    },
    {
      step: "06",
      title: "Marketing setup",
      text: "Tracking, content calendar, SEO setup or campaign configuration.",
    },
    { step: "07", title: "Execution", text: "We carry out the approved marketing plan." },
    {
      step: "08",
      title: "Monitoring and optimization",
      text: "We analyze performance data and make improvements.",
    },
    { step: "09", title: "Monthly reporting", text: "You receive a clear performance report." },
    { step: "10", title: "Strategy review", text: "We plan the next month together." },
  ],
  workflowHeading: {
    eyebrow: "Our process",
    title: "How a marketing engagement works",
    description: "Ten steps from your first inquiry to a monthly review.",
    pageDescription:
      "Every engagement follows the same workflow, so scope, access, reporting and approvals are always clear.",
  },

  standards: [
    {
      eyebrow: "Scope",
      title: "How we scope work",
      items: [
        "Agency service fee and advertising budget are kept separate.",
        "Whether design cost is included is stated up front.",
        "SEO packages state whether technical development is included.",
        "Social media packages state the number of posts, platforms and revisions.",
        "Account access and the approval process are agreed before work starts.",
        "We do not guarantee a ranking, a sales figure or a number of leads.",
      ],
    },
    {
      eyebrow: "Security",
      title: "How we protect your accounts",
      items: [
        "Role-based access instead of collecting passwords",
        "Two-factor authentication kept on",
        "Only the permissions the work needs",
        "Advertising account ownership stays with you",
        "Website and analytics access kept limited",
        "Unneeded access removed when work ends",
      ],
    },
    {
      eyebrow: "Ethics",
      title: "Our marketing ethics",
      items: [
        "No fake reviews or fake followers",
        "No misleading advertising",
        "No email marketing without permission",
        "No spam or unsolicited bulk messaging",
        "Your data stays confidential",
        "No copyrighted content without permission",
        "Truthful reporting of results",
      ],
    },
  ],
  tools: {
    title: "Tools we use",
    items: [
      "Google Search Console",
      "Google Analytics 4",
      "Google Keyword Planner",
      "Bing Webmaster Tools",
      "Meta Business Suite",
      "Meta Ads Manager",
      "Google Ads",
      "Google Tag Manager",
      "Canva",
      "Mailchimp / Brevo / MailerLite",
    ],
    note: "We start with free tools and the resources you already have, and add paid tools only when they clearly help.",
  },
  documentation: {
    intro: "Every client has an organized folder, so work and reports are easy to find.",
    folders: [
      "01-Client-Brief",
      "02-Business-Audit",
      "03-Competitor-Research",
      "04-Marketing-Strategy",
      "05-Content-Calendar",
      "06-SEO-Documents",
      "07-Campaign-Assets",
      "08-Analytics-Reports",
      "09-Monthly-Reports",
      "10-Client-Communication",
    ],
  },

  collaboration: [
    { division: "Development", slug: "development", work: "SEO-friendly websites, landing pages and conversion optimization" },
    { division: "Creative Studio", slug: "creative-studio", work: "Social media graphics, branding and marketing creatives" },
    { division: "Technology Support", slug: "technology-support", work: "Website tracking, analytics and technical marketing support" },
    { division: "Code Academy", slug: "code-academy", work: "Educational content and promotion (planned)" },
    { division: "Learning", slug: "learning", work: "Learning product promotion and content marketing (planned)" },
  ],
  journeys: [
    {
      title: "New business",
      steps: [
        { division: "Creative Studio", work: "Brand identity" },
        { division: "Development", work: "Business website" },
        { division: "Digital", work: "SEO and social media" },
        { division: "Technology Support", work: "Maintenance and tracking" },
      ],
    },
    {
      title: "Existing website",
      steps: [
        { division: "Digital", work: "SEO audit and strategy" },
        { division: "Technology Support", work: "Fix technical issues" },
        { division: "Development", work: "Improve pages and conversion" },
      ],
    },
  ],
  collaborationHeading: {
    eyebrow: "One company, multiple solutions",
    title: "Marketing that connects with every division",
    description:
      "Development builds the website, Creative Studio creates the brand and graphics, and Digital works on their online growth.",
  },

  faq: [
    {
      q: "Is TanimXploit Digital a separate company?",
      a: "It is a division of TanimXploit Technology Services. Your agreement and client relationship are with the parent company.",
    },
    {
      q: "Do you guarantee rankings, sales or leads?",
      a: "No. Results depend on competition, scope and search engine changes. We report truthfully and focus on work we can control.",
    },
    {
      q: "Which services do you offer first?",
      a: "Social media management and SEO. Content marketing, paid advertising, email marketing and strategy consultation are added as we grow.",
    },
    {
      q: "Is the advertising budget included in your fee?",
      a: "No. Your ad spend is separate from our service fee and is paid by you. Campaigns should run in your own ad account.",
    },
    {
      q: "Do you need my passwords?",
      a: "No. We use role-based access with two-factor authentication, take only the permissions needed and remove access when work ends.",
    },
    {
      q: "How do you measure success?",
      a: "By your business objective: for example qualified inquiries, cost per lead or organic landing page performance, not only followers or impressions.",
    },
    {
      q: "Are the portfolio projects real client results?",
      a: "Our portfolio is being built. Demonstration and concept projects are always labelled and are never presented as real client results.",
    },
    {
      q: "Can you work with the website you already have?",
      a: "Yes. We start with an audit of your current website, social media and competitors, then recommend what to improve first.",
    },
  ],
  cta: {
    title: "Let's grow your online presence",
    text: "Tell us about your business. We will review where you are today and suggest a realistic plan.",
  },
  homeBand: {
    eyebrow: "TanimXploit Digital",
    title: "Growing businesses through smarter digital marketing",
    text: "Social media management and search engine optimization, planned around your goals and reported honestly.",
    exploreLabel: "Explore Digital",
    secondaryLabel: "See services",
  },
};
