import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { SectionExtra, SectionGroup } from "@/data/sections/types";

export function Checks({ items, small = false }: { items: readonly string[]; small?: boolean }) {
  return (
    <ul className={small ? "space-y-2 text-sm text-ink-700" : "space-y-3 text-ink-700"}>
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <Icon name="check" className={`mt-0.5 shrink-0 text-brand-700 ${small ? "h-4 w-4" : "h-5 w-5"}`} />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i} className="rounded-full bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-700 ring-1 ring-ink-100">
          {i}
        </li>
      ))}
    </ul>
  );
}

export function GroupCard({ group }: { group: SectionGroup }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-ink-900">{group.title}</h3>
      {group.target ? (
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-700">{group.target}</p>
      ) : null}
      {group.text ? <p className="mt-2 text-sm leading-relaxed text-ink-600">{group.text}</p> : null}
      {group.points.length > 0 ? (
        <div className="mt-4">
          <Checks items={group.points} small />
        </div>
      ) : null}
      {group.excluded && group.excluded.length > 0 ? (
        <div className="mt-4 border-t border-ink-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Not included</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-600">
            {group.excluded.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** A titled block of group cards (offerings, extras). */
export function ExtraBlock({ extra, defaultTone = "soft" }: { extra: SectionExtra; defaultTone?: "light" | "soft" }) {
  const cols =
    extra.groups.length >= 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : extra.groups.length === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";
  return (
    <Section tone={extra.tone ?? defaultTone} labelledBy={`${extra.id}-heading`}>
      <SectionHeading id={`${extra.id}-heading`} eyebrow={extra.eyebrow} title={extra.title} description={extra.description} />
      <div className={`grid gap-6 ${cols}`}>
        {extra.groups.map((g) => (
          <GroupCard key={g.title} group={g} />
        ))}
      </div>
      {extra.note ? <p className="mt-6 max-w-3xl text-sm text-ink-600">{extra.note}</p> : null}
    </Section>
  );
}
