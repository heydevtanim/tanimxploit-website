import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/portal/LoginForm";
import { Logo } from "@/components/ui/Logo";
import { safePortalRedirect } from "@/lib/portal/session-token";
import { getPortalUser } from "@/modules/auth/session";

export const metadata: Metadata = { title: "Sign in" };

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = safePortalRedirect(rawNext);

  if (await getPortalUser()) redirect(next);

  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
          <h1 className="font-display text-xl font-semibold text-ink-900">Workforce Portal</h1>
          <p className="mt-1 text-sm text-ink-500">Sign in with your company account.</p>
          <div className="mt-6">
            <LoginForm next={next} />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          Private system for TanimXploit staff. Activity is logged. Forgotten your password? Contact HR or an administrator.
        </p>
      </div>
    </main>
  );
}
