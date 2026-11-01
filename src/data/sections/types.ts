import type { AvailabilityStatus, IconName, InquiryCategoryKey } from "@/types";
import type { DevService } from "@/data/development";

/**
 * Shared shape for a division's own website section (Digital, Technology Support, Code Academy).
 * All page text lives in the data files in this folder. Edit text there, not in the page components.
 *
 * CONTENT RULES (same as Development and Creative Studio):
 * - Internal planning material (price ranges, revenue model, team, finance, KPIs, roadmap, client or
 *   student acquisition plan) is deliberately NOT published on the website.
 * - No guaranteed results (rankings, sales, uptime, job placement). No invented testimonials.
 * - Concept / demonstration projects are always labelled as such and never shown as client work.
 */

export interface SectionGroup {
  title: string;
  text?: string;
  /** Short line shown under the title, e.g. "Target: small business website". */
  target?: string;
  points: string[];
  /** Things that are NOT included. */
  excluded?: string[];
}

export interface SectionExtra {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "soft";
  groups: SectionGroup[];
  note?: string;
}

export interface DivisionSection {
  key: "digital" | "technology-support" | "code-academy";
  /** URL base, e.g. "/digital". */
  basePath: string;
  /** URL segment of the service / course list, e.g. "services" or "courses". */
  servicesSegment: "services" | "courses";
  /** Singular and plural labels for the list, e.g. "service" / "services". */
  itemLabel: { singular: string; plural: string };
  /** Label of the process page, e.g. "Our Process" or "Learning Method". */
  processLabel: string;
  hasPortfolio: boolean;
  category: InquiryCategoryKey;
  status: AvailabilityStatus;
  statusNote: string;
  quoteHref: string;
  ctaLabel: string;
  navCtaLabel: string;
  navLabel: string;

  brand: {
    name: string;
    shortName: string;
    parent: string;
    tagline: string;
    positioning: string;
    intro: string;
    legalNote: string;
  };

  seo: { overviewDescription: string; servicesDescription: string; processDescription: string; portfolioDescription?: string };

  hero: { panelLabel: string; panelItems: string[] };

  about: {
    eyebrow: string;
    title: string;
    objectivesTitle: string;
    objectives: string[];
    responsibilitiesTitle: string;
    responsibilities: string[];
  };

  focus: { title: string; description: string; items: { title: string; text: string; icon: IconName }[] };

  services: DevService[];
  servicesHeading: { eyebrow: string; title: string; description: string; pageDescription: string };
  /** Labels used on a single service / course page. */
  detailLabels: { included: string; deliverables: string; targetClients: string; requestLabel: string; asideText: string };

  /** Extra groups shown on the overview and services pages (offerings, packages, delivery models ...). */
  offerings?: SectionExtra;
  /** Not-yet-core services, presented honestly as expanding. */
  additional?: { eyebrow: string; title: string; description: string; items: string[]; note?: string };

  whyChoose: { title: string; text: string; icon: IconName }[];
  whyTitle: string;

  audience: { eyebrow: string; title: string; description: string; items: { title: string; text: string; services: string[] }[] };

  /** More overview blocks (e.g. YouTube strategy, certification). */
  extras?: SectionExtra[];

  portfolio?: {
    eyebrow: string;
    title: string;
    text: string;
    plannedTitle: string;
    plannedDescription: string;
    concepts: string[];
    conceptLabel: string;
    caseStudyTitle: string;
    caseStudy: string[];
    ctaTitle: string;
    ctaText: string;
  };

  workflow: { step: string; title: string; text: string }[];
  workflowHeading: { eyebrow: string; title: string; description: string; pageDescription: string };

  /** Policy / standards blocks on the process page. */
  standards: { eyebrow: string; title: string; intro?: string; items: string[] }[];
  tools: { title: string; items: string[]; note?: string };
  documentation?: { intro: string; folders: string[] };

  collaboration: { division: string; slug: string; work: string }[];
  journeys: { title: string; steps: { division: string; work: string }[] }[];
  collaborationHeading: { eyebrow: string; title: string; description: string };

  faq: { q: string; a: string }[];
  cta: { title: string; text: string };
  homeBand: { eyebrow: string; title: string; text: string; exploreLabel: string; secondaryLabel: string };
}
