export type IconName =
  | "code"
  | "palette"
  | "megaphone"
  | "lifebuoy"
  | "graduation"
  | "book"
  | "shield"
  | "rocket"
  | "layers"
  | "users"
  | "mail"
  | "check"
  | "arrow"
  | "menu"
  | "close"
  | "compass"
  | "spark"
  | "globe"
  | "cart"
  | "server"
  | "plug"
  | "refresh"
  | "chevron"
  | "pen"
  | "idcard"
  | "share"
  | "layout"
  | "search"
  | "chart"
  | "wrench"
  | "play"
  | "database"
  | "branch"
  | "lock"
  | "cloud"
  | "terminal";

export type AvailabilityStatus = "available" | "planned";

export type InquiryCategoryKey =
  | "GENERAL"
  | "WEBSITE_DEVELOPMENT"
  | "SOFTWARE_DEVELOPMENT"
  | "BRANDING_DESIGN"
  | "DIGITAL_MARKETING"
  | "TECHNICAL_SUPPORT"
  | "EDUCATION_LEARNING"
  | "PARTNERSHIP"
  | "OTHER";

export interface Division {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  description: string;
  mainFocus: string;
  activities: string[];
  capabilities: string[];
  status: AvailabilityStatus;
  statusNote: string;
  category: InquiryCategoryKey;
  ctaLabel: string;
  /** Custom landing page for the division. Defaults to /divisions/[slug]. */
  href?: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  points: string[];
  divisionSlug: string;
  category: InquiryCategoryKey;
  status: AvailabilityStatus;
  /** Optional detail page for this service. */
  href?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  classification: "Internal" | "Client";
  divisionSlug: string;
  overview: string;
  objectives: string[];
  technologies: string[];
  deliverables: string[];
  /** Only fill in when the result has been verified and approved for publication. */
  outcome?: string;
  status: "In development" | "Completed";
  imageSrc?: string;
  imageAlt?: string;
}
