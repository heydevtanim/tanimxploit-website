import type { ReactNode } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd } from "@/components/layout/organization";

/** Main company website: global header + footer. Division sites (/development ...) have their own shell. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <JsonLd data={organizationJsonLd} />
    </>
  );
}
