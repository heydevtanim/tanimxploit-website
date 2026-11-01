import type { DivisionSection } from "./types";
import { digitalSection } from "./digital";
import { technologySupportSection } from "./technology-support";
import { codeAcademySection } from "./code-academy";

export type { DivisionSection } from "./types";
export { digitalSection, technologySupportSection, codeAcademySection };

export const divisionSections: DivisionSection[] = [digitalSection, technologySupportSection, codeAcademySection];

export const getSectionServicePath = (s: DivisionSection, slug: string) =>
  `${s.basePath}/${s.servicesSegment}/${slug}`;

export const getSectionService = (s: DivisionSection, slug: string) => s.services.find((x) => x.slug === slug);
