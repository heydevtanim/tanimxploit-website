import { Icon } from "@/components/ui/Icon";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-ink-900">
            {item.q}
            <Icon name="chevron" className="faq-chevron h-5 w-5 shrink-0 text-brand-700 transition-transform" />
          </summary>
          <p className="mt-3 leading-relaxed text-ink-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
