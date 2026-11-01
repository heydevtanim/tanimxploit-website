import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { technologySupportSection, getSectionService } from "@/data/sections";
import { buildMetadata } from "@/lib/utils/seo";
import { SectionServiceDetail } from "@/components/division/SectionServiceDetail";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return technologySupportSection.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getSectionService(technologySupportSection, slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.objective,
    path: `${technologySupportSection.basePath}/${technologySupportSection.servicesSegment}/${service.slug}`,
  });
}

export default async function TechnologySupportServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getSectionService(technologySupportSection, slug);
  if (!service) notFound();
  return <SectionServiceDetail section={technologySupportSection} service={service} />;
}
