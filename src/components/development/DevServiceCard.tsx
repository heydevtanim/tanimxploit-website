import Link from "@/components/ui/SiteLink";
import type { DevService } from "@/data/development";
import { Icon } from "@/components/ui/Icon";

export function DevServiceCard({
  service,
  index,
  basePath = "/development/services",
}: {
  service: DevService;
  index: number;
  basePath?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-accent-400">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
        <span className="text-sm font-bold text-ink-300" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink-900">{service.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-600">{service.objective}</p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-700">
        {service.services.slice(0, 4).map((s) => (
          <li key={s} className="flex gap-2">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`${basePath}/${service.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
      >
        View details<span className="sr-only">: {service.title}</span>
        <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </article>
  );
}
