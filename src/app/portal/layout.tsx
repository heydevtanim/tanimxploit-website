import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { portalConfig } from "@/lib/portal/config";

// Private application: never indexed, never statically cached.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Staff Portal", template: "%s | TanimXploit Workforce" },
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
};

export default function PortalRootLayout({ children }: { children: ReactNode }) {
  // The portal is switched off unless PORTAL_ENABLED=true (public site can deploy on its own).
  if (!portalConfig.enabled) notFound();
  return <>{children}</>;
}
