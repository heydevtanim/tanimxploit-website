import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { organizationJsonLd } from "@/components/layout/organization";
import { JsonLd } from "@/components/ui/JsonLd";

/**
 * Page frame for a division site: ONE header (the division's own), the page, the shared footer.
 * The main-site header is deliberately not rendered here, so a division never shows two headers.
 */
export function DivisionShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <>
      {header}
      <main id="main">{children}</main>
      <Footer />
      <JsonLd data={organizationJsonLd} />
    </>
  );
}
