import type { IconName } from "@/types";
import type { DevService } from "@/data/development";

/**
 * TanimXploit Creative Studio: a division of TanimXploit Technology Services.
 *
 * CONTENT RULES:
 * - Internal planning material (price ranges, revenue model, team and family roles, finance, KPIs,
 *   roadmap, client-acquisition plan) is deliberately NOT published on the website.
 * - Portfolio: concept / self-initiated projects must ALWAYS be labelled as such and never presented
 *   as real client work. Do not add testimonials unless they are genuine and approved.
 */

export const creativeBrand = {
  name: "TanimXploit Creative Studio",
  parent: "TanimXploit Technology Services",
  tagline: "Creating Meaningful Brands Through Strategic Design.",
  positioning:
    "TanimXploit Creative Studio is a creative design division focused on building memorable brand identities and professional visual experiences for modern businesses.",
  intro:
    "We create professional visual identity and creative design for businesses, startups, personal brands and e-commerce brands. Our goal is not only beautiful design, but effective visual communication that fits each brand's identity, audience and business positioning.",
  legalNote:
    "TanimXploit Creative Studio is a division of TanimXploit Technology Services. Your agreement and client relationship are with the parent company.",
} as const;

export const creativeQuoteHref = "/contact?category=BRANDING_DESIGN";

export const creativeObjectives = [
  "Professional brand identity for new businesses",
  "A stronger visual identity for existing brands",
  "Logo and graphic design services",
  "Monthly design support for ongoing needs",
  "Complete digital solutions together with TanimXploit Development",
  "Creative services for international clients",
] as const;

export const creativeResponsibilities = [
  "Understand your design requirements",
  "Brand research and design strategy",
  "Logo and identity design",
  "Graphic design production",
  "Design revisions",
  "Final delivery and documentation",
  "Design quality control",
] as const;

/** The three offers the studio focuses on first. */
export const creativeFocus: { title: string; text: string; icon: IconName }[] = [
  {
    icon: "pen",
    title: "Logo and brand identity",
    text: "The core of the studio: marks, systems and guidelines that make a business recognisable.",
  },
  {
    icon: "share",
    title: "Social media and marketing design",
    text: "Consistent creatives for campaigns and ongoing monthly design support.",
  },
  {
    icon: "layout",
    title: "Website UI/UX design",
    text: "Interfaces designed in step with TanimXploit Development, so design and build fit together.",
  },
];

export const creativeServices: DevService[] = [
  {
    slug: "logo-design",
    title: "Logo Design",
    shortTitle: "Logo Design",
    icon: "pen",
    objective: "Unique, professional and scalable logos for businesses and brands.",
    services: [
      "Primary logo",
      "Secondary logo",
      "Logo variations",
      "Icon / brand mark",
      "Black and white version",
      "Colour version",
      "Transparent PNG",
      "SVG / PDF / editable source file (depending on package)",
      "Basic logo usage guideline",
    ],
    category: "BRANDING_DESIGN",
  },
  {
    slug: "brand-identity-design",
    title: "Brand Identity Design",
    shortTitle: "Brand Identity",
    icon: "palette",
    objective: "A complete visual identity for your business.",
    services: [
      "Logo system",
      "Brand colour palette",
      "Typography system",
      "Brand guidelines",
      "Visual style",
      "Iconography",
      "Brand pattern",
      "Image direction",
      "Brand application examples",
    ],
    category: "BRANDING_DESIGN",
  },
  {
    slug: "business-stationery",
    title: "Business Stationery",
    shortTitle: "Business Stationery",
    icon: "idcard",
    objective: "Design materials for professional business communication.",
    services: [
      "Business card",
      "Letterhead",
      "Envelope",
      "Company profile cover",
      "Invoice template",
      "Quotation template",
      "Email signature",
      "ID card design",
    ],
    category: "BRANDING_DESIGN",
  },
  {
    slug: "social-media-design",
    title: "Social Media Design",
    shortTitle: "Social Media",
    icon: "share",
    objective: "Creative design for Facebook, Instagram, LinkedIn and other platforms.",
    services: [
      "Social media posts",
      "Carousel design",
      "Cover / banner design",
      "Promotional graphics",
      "Product advertisement",
      "Campaign creative",
      "Story design",
      "YouTube thumbnail",
      "Social media brand templates",
    ],
    note: "Available as one-off projects or as monthly design support.",
    category: "BRANDING_DESIGN",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    icon: "layout",
    objective: "User interface and user experience design for websites and web applications.",
    services: [
      "Website UI design",
      "Landing page design",
      "E-commerce UI design",
      "Dashboard design",
      "Mobile app UI",
      "Wireframing",
      "Interactive prototypes",
      "Design systems",
      "Responsive layout design",
    ],
    note: "Pair UI/UX design with TanimXploit Development to take a design all the way to a working website or application.",
    category: "BRANDING_DESIGN",
  },
  {
    slug: "marketing-materials",
    title: "Marketing Materials",
    shortTitle: "Marketing Materials",
    icon: "megaphone",
    objective: "Design materials for business promotion and marketing campaigns.",
    services: [
      "Flyer design",
      "Brochure design",
      "Poster design",
      "Banner design",
      "Product catalogue",
      "Presentation design",
      "Advertisement creative",
      "Company profile",
      "Promotional graphics",
    ],
    category: "BRANDING_DESIGN",
  },
];

export const getCreativeService = (slug: string) => creativeServices.find((s) => s.slug === slug);

/** Package names only. Scope, revisions and source files are stated per package in the quotation. */
export const creativePackages: { title: string; intro: string; tiers: string[] }[] = [
  {
    title: "Logo packages",
    intro: "From a simple mark to a full logo system.",
    tiers: ["Basic Logo", "Standard Logo", "Premium Logo"],
  },
  {
    title: "Branding packages",
    intro: "From a starter identity to a complete brand system.",
    tiers: ["Starter Branding", "Business Branding", "Complete Brand Identity"],
  },
];

export const individualDesignServices = [
  "Business card",
  "Social media post",
  "Flyer",
  "Brochure",
  "Banner",
  "Presentation",
] as const;

export const designSupportExamples = [
  "Monthly social media design",
  "Monthly marketing creatives",
  "E-commerce product graphics",
  "Ongoing brand design support",
] as const;

export const uiuxProjects = [
  "Landing page UI",
  "Business website UI",
  "E-commerce UI",
  "Dashboard UI",
  "Web application UI",
] as const;

export const packagePolicy = [
  "The scope of every project is agreed in writing.",
  "The number of included revisions is stated up front.",
  "Whether source files are included is stated in the package.",
  "Urgent delivery can carry a separate charge.",
  "Printing and development costs are quoted separately.",
  "Production starts after the agreement and advance payment.",
] as const;

export const creativeClients: { title: string; text: string; services: string[] }[] = [
  {
    title: "New businesses",
    text: "Building a business identity from the start.",
    services: ["Logo design", "Brand identity", "Business stationery", "Company profile"],
  },
  {
    title: "Startups",
    text: "A professional brand presentation from day one.",
    services: ["Startup branding", "Logo system", "Brand guidelines", "Website UI/UX", "Pitch deck design"],
  },
  {
    title: "Personal brands",
    text: "A professional identity for individuals.",
    services: [
      "Personal logo",
      "Personal brand identity",
      "LinkedIn banner",
      "Social media templates",
      "Presentation design",
    ],
  },
  {
    title: "E-commerce brands",
    text: "Better product and brand presentation for online stores.",
    services: [
      "E-commerce branding",
      "Product graphics",
      "Social media design",
      "Promotional banners",
      "Website UI/UX",
      "Marketing creatives",
    ],
  },
  {
    title: "Established businesses",
    text: "Improving or redesigning an existing brand identity.",
    services: ["Brand refresh", "Logo redesign", "Corporate identity", "Marketing materials", "Design retainer"],
  },
];

export const creativeWhyChoose: { title: string; text: string; icon: IconName }[] = [
  {
    icon: "compass",
    title: "Strategy before style",
    text: "Design starts from your audience, positioning and personality, not from a trend.",
  },
  {
    icon: "layers",
    title: "Consistent systems",
    text: "Colour, typography and layout are built as a system so your brand looks the same everywhere.",
  },
  {
    icon: "users",
    title: "Design plus development",
    text: "Take your brand straight into a website or store through TanimXploit Development, with one company coordinating both.",
  },
  {
    icon: "shield",
    title: "Original and properly licensed",
    text: "We create original concepts and verify commercial licences for fonts, stock assets and software.",
  },
];

export const designDirection = {
  palette: [
    { name: "Dark Navy", hex: "#0B1220" },
    { name: "Electric Blue", hex: "#3B82F6" },
    { name: "Cyan", hex: "#22D3EE" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Light Gray", hex: "#F3F4F6" },
  ],
  typography: ["Inter", "Poppins"],
  style: ["Modern", "Minimal", "Premium", "Professional", "Creative", "Clean layout"],
  personality: ["Creative", "Strategic", "Reliable", "Innovative", "Professional"],
} as const;

export const designTools = ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign", "Canva (when appropriate)"] as const;

export const deliveryFormats = ["PDF", "SVG", "PNG", "JPG", "AI / EPS", "Figma project link"] as const;

export const creativeWorkflow: { step: string; title: string; text: string }[] = [
  { step: "01", title: "Client inquiry", text: "You send us your service request." },
  {
    step: "02",
    title: "Requirement analysis",
    text: "We learn your business type, target audience, brand personality and design requirements.",
  },
  {
    step: "03",
    title: "Proposal and quotation",
    text: "You receive scope, deliverables, timeline, pricing and revision policy.",
  },
  { step: "04", title: "Agreement and advance", text: "Agreement and advance payment are completed." },
  {
    step: "05",
    title: "Research and concept",
    text: "Competitor research, moodboard and design direction.",
  },
  { step: "06", title: "Design production", text: "We create the design according to the approved direction." },
  { step: "07", title: "Client presentation", text: "We present the design concept to you." },
  { step: "08", title: "Revision", text: "Feedback and revisions are completed as agreed." },
  { step: "09", title: "Final approval", text: "You give final approval." },
  {
    step: "10",
    title: "Delivery",
    text: "We provide the required file formats and documentation.",
  },
  {
    step: "11",
    title: "Follow-up",
    text: "We collect your feedback and discuss future design needs.",
  },
];

export const creativeQuality = [
  "Original design concepts",
  "Proper typography",
  "Consistent colour system",
  "Balanced layout",
  "Correct spacing and alignment",
  "Responsive UI design",
  "Print-ready files (where applicable)",
  "Editable source files (as per agreement)",
  "Organised file naming",
  "Client approval",
  "Proper asset licensing",
] as const;

export const creativeDocumentation = [
  "01-Client-Brief",
  "02-Research",
  "03-Moodboard",
  "04-Concepts",
  "05-Design-Development",
  "06-Client-Feedback",
  "07-Final-Design",
  "08-Source-Files",
  "09-Delivery",
  "10-Documentation",
] as const;

export const caseStudyStructure = [
  "Project overview",
  "Client / concept background",
  "Design challenge",
  "Creative direction",
  "Logo exploration",
  "Colour and typography",
  "Final design",
  "Brand applications",
  "Mockups",
] as const;

/** Concept projects in preparation. These are NOT client work and must always be labelled as concepts. */
export const plannedConceptProjects = [
  "TanimXploit parent brand identity",
  "AUREFASH fashion brand identity",
  "Restaurant branding",
  "Technology startup brand",
  "E-commerce brand identity",
  "Personal brand identity",
  "Social media campaign design",
  "Business stationery design",
  "E-commerce website UI design",
] as const;

export const divisionCollaboration: { division: string; slug: string; work: string }[] = [
  { division: "Development", slug: "development", work: "UI/UX and visual assets for websites" },
  { division: "Digital", slug: "digital", work: "Social media and marketing creatives" },
  { division: "Technology Support", slug: "technology-support", work: "Digital brand assets and presentation support" },
  { division: "Code Academy", slug: "code-academy", work: "Educational graphics and course branding (planned)" },
  { division: "Learning", slug: "learning", work: "Learning materials and visual content (planned)" },
];

export const creativeJourneys: { title: string; steps: { division: string; work: string }[] }[] = [
  {
    title: "New business",
    steps: [
      { division: "Creative Studio", work: "Logo and brand identity" },
      { division: "Development", work: "Business website" },
      { division: "Digital", work: "SEO and social media marketing" },
      { division: "Technology Support", work: "Website maintenance" },
    ],
  },
  {
    title: "E-commerce brand",
    steps: [
      { division: "Creative Studio", work: "Brand identity and product graphics" },
      { division: "Development", work: "E-commerce website" },
      { division: "Digital", work: "Marketing creatives and campaign support" },
      { division: "Technology Support", work: "Technical maintenance" },
    ],
  },
  {
    title: "Startup",
    steps: [
      { division: "Creative Studio", work: "Logo, brand guidelines and UI/UX" },
      { division: "Development", work: "Web application" },
      { division: "Digital", work: "Marketing support" },
    ],
  },
];

export const creativeFaq: { q: string; a: string }[] = [
  {
    q: "Is TanimXploit Creative Studio a separate company?",
    a: "It is a division of TanimXploit Technology Services. Your agreement and client relationship are with the parent company, and the studio delivers the design work.",
  },
  {
    q: "What do I receive with a logo?",
    a: "Depending on the package: primary and secondary logos, variations, a brand mark, black and white and colour versions, a transparent PNG, SVG / PDF / editable source files and a basic usage guideline.",
  },
  {
    q: "How many revisions are included?",
    a: "The number of revisions is stated in your quotation and agreement before work starts, so scope is always clear.",
  },
  {
    q: "Do I get the source files?",
    a: "Whether editable source files are included depends on the package and is stated in your agreement.",
  },
  {
    q: "Can you also build my website?",
    a: "Yes. TanimXploit Development can build the website or online store, and the Creative Studio can design the interface and brand assets for it. One company coordinates both.",
  },
  {
    q: "Do you offer monthly design support?",
    a: "Yes. Monthly design retainers cover regular needs such as social media design, marketing creatives, e-commerce product graphics or ongoing brand design support.",
  },
  {
    q: "Are the portfolio projects real client work?",
    a: "Our portfolio is being built. Concept and self-initiated projects are always labelled as such and are never presented as client work.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We provide creative services to clients in Bangladesh and internationally.",
  },
  {
    q: "Do you use licensed fonts and images?",
    a: "Yes. We do not copy other people's logos, templates or designs, and we verify commercial licences for stock assets and fonts before using them.",
  },
];
