import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/division-hosts";
import { divisionHref, divisions } from "@/data/divisions";
import { developmentServices } from "@/data/development";
import { creativeServices } from "@/data/creative-studio";
import { divisionSections } from "@/data/sections";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/divisions",
    "/services",
    "/development",
    "/development/services",
    "/development/process",
    "/creative-studio",
    "/creative-studio/services",
    "/creative-studio/portfolio",
    "/creative-studio/process",
    ...divisionSections.flatMap((d) => [
      d.basePath,
      `${d.basePath}/${d.servicesSegment}`,
      `${d.basePath}/process`,
      ...(d.hasPortfolio ? [`${d.basePath}/portfolio`] : []),
    ]),
    "/portfolio",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];
  const detailPaths = [
    ...developmentServices.map((s) => `/development/services/${s.slug}`),
    ...creativeServices.map((s) => `/creative-studio/services/${s.slug}`),
    ...divisionSections.flatMap((d) => d.services.map((s) => `${d.basePath}/${d.servicesSegment}/${s.slug}`)),
    ...divisions.filter((d) => !d.href).map((d) => divisionHref(d)),
  ];
  const now = new Date();

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...detailPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
