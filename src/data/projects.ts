import type { Project } from "@/types";

/**
 * PORTFOLIO RULES (from the project brief):
 * - Publish only approved work samples.
 * - Never publish confidential client work, invented testimonials or unverified results.
 * - Only add `outcome` when it has been verified.
 */
export const projects: Project[] = [
  {
    slug: "tanimxploit-company-website",
    name: "TanimXploit Company Website",
    category: "Corporate Website",
    classification: "Internal",
    divisionSlug: "development",
    overview:
      "The official corporate website of TanimXploit, built as a modular Next.js application with a secure inquiry system.",
    objectives: [
      "Establish the official online presence of TanimXploit",
      "Present divisions, services and portfolio clearly",
      "Generate and manage client inquiries securely",
    ],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Zod", "PostgreSQL", "Prisma"],
    deliverables: [
      "Responsive website",
      "Contact and inquiry API",
      "SEO foundation",
      "Technical documentation",
    ],
    status: "In development",
  },
];

export const getProjectsForDivision = (divisionSlug: string) =>
  projects.filter((p) => p.divisionSlug === divisionSlug);
