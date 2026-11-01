import type { ReactNode } from "react";
import { PortalNav } from "@/components/portal/PortalNav";
import { Logo } from "@/components/ui/Logo";
import { visibleModules } from "@/lib/portal/navigation";
import { logoutAction } from "@/modules/auth/actions";
import { requireUser } from "@/modules/auth/guard";

export default async function PortalShell({ children }: { children: ReactNode }) {
  const user = await requireUser();
  const items = visibleModules(user.permissions).map((m) => ({
    key: m.key,
    label: m.label,
    href: m.href,
    planned: m.status === "planned",
  }));

  return (
    <div className="min-h-screen bg-ink-50 lg:flex">
      <aside className="bg-ink-950 px-4 py-5 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto">
        <div className="flex items-center justify-between lg:block">
          <Logo dark />
          <p className="hidden text-xs text-ink-400 lg:mt-1 lg:block">Workforce Portal</p>
        </div>
        <details className="mt-4 lg:hidden">
          <summary className="cursor-pointer rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white">Menu</summary>
          <div className="mt-3">
            <PortalNav items={items} />
          </div>
        </details>
        <div className="mt-6 hidden lg:block">
          <PortalNav items={items} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 bg-white px-6 py-3">
          <div>
            <p className="text-sm font-semibold text-ink-900">{user.displayName}</p>
            <p className="text-xs text-ink-500">{user.roleNames.join(", ") || "No role assigned"}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-ink-200 px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
            >
              Sign out
            </button>
          </form>
        </header>
        <main id="main" className="mx-auto w-full max-w-6xl p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
