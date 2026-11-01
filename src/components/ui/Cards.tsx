import Link from "@/components/ui/SiteLink";
import type { Division, Project, Service } from "@/types";
import { divisionHref } from "@/data/divisions";
import { Icon } from "./Icon";
import { StatusBadge } from "./StatusBadge";

export function DivisionCard({ division }: { division: Division }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon name={division.icon} />
        </span>
        <StatusBadge status={division.status} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink-900">{division.name}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-ink-600">{division.summary}</p>
      <Link
        href={divisionHref(division)}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
      >
        Learn more<span className="sr-only"> about {division.name}</span>
        <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-brand-300">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
        <StatusBadge status={service.status} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink-900">{service.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-600">{service.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-ink-700">
        {service.points.map((p) => (
          <li key={p} className="flex gap-2">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        {service.href ? (
          <Link
            href={service.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Details<span className="sr-only">: {service.title}</span>
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        ) : null}
        <Link
          href={`/contact?category=${service.category}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          {service.status === "available" ? "Request this service" : "Register interest"}
          <span className="sr-only">: {service.title}</span>
          {service.href ? null : <Icon name="arrow" className="h-4 w-4" />}
        </Link>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
      <div className="flex h-40 items-center justify-center bg-ink-950 bg-grid text-brand-300" aria-hidden="true">
        <Icon name="code" className="h-12 w-12" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">{project.category}</span>
          <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">{project.classification}</span>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-900">{project.status}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink-900">{project.name}</h3>
        <p className="mt-2 leading-relaxed text-ink-600">{project.overview}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-500">Technologies</p>
        <p className="mt-1 text-sm text-ink-700">{project.technologies.join(", ")}</p>
        <Link
          href="/portfolio"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          View project details<span className="sr-only">: {project.name}</span>
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
