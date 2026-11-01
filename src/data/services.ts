import type { Service } from "@/types";
import { developmentServices } from "@/data/development";
import { creativeServices } from "@/data/creative-studio";
import { digitalSection, technologySupportSection } from "@/data/sections";
import type { DivisionSection } from "@/data/sections";

const fromSection = (section: DivisionSection, divisionSlug: string): Service[] =>
  section.services.map(
    (d): Service => ({
      slug: d.slug,
      title: d.title,
      icon: d.icon,
      summary: d.objective,
      points: d.services.slice(0, 4),
      divisionSlug,
      category: d.category,
      status: section.status,
      href: `${section.basePath}/${section.servicesSegment}/${d.slug}`,
    }),
  );

/**
 * CONTENT NOTE: Only publish services the company is ready and authorized to offer.
 * Set `status: "planned"` for anything that is not yet operating.
 */
export const services: Service[] = [
  ...developmentServices.map(
    (d): Service => ({
      slug: d.slug,
      title: d.title,
      icon: d.icon,
      summary: d.objective,
      points: d.services.slice(0, 4),
      divisionSlug: "development",
      category: d.category,
      status: "available",
      href: `/development/services/${d.slug}`,
    }),
  ),
  ...creativeServices.map(
    (d): Service => ({
      slug: d.slug,
      title: d.title,
      icon: d.icon,
      summary: d.objective,
      points: d.services.slice(0, 4),
      divisionSlug: "creative-studio",
      category: d.category,
      status: "available",
      href: `/creative-studio/services/${d.slug}`,
    }),
  ),
  ...fromSection(digitalSection, "digital"),
  ...fromSection(technologySupportSection, "technology-support"),
  {
    slug: "technology-education",
    title: "Technology Education",
    icon: "graduation",
    summary: "Programming and technology education through TanimXploit Code Academy (planned).",
    points: ["Planned free lessons and project-based courses", "Planned curriculum: HTML to full-stack"],
    divisionSlug: "code-academy",
    category: "EDUCATION_LEARNING",
    status: "planned",
    href: "/code-academy/courses",
  },
  {
    slug: "learning-tutoring-support",
    title: "Learning and Tutoring Support",
    icon: "book",
    summary: "Learning support and tutoring resources through TanimXploit Learning (planned).",
    points: ["Learning resources in planning", "Educator collaboration welcome"],
    divisionSlug: "learning",
    category: "EDUCATION_LEARNING",
    status: "planned",
  },
];
