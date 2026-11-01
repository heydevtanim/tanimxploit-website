import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
    <section className="py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-600">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
      </main>
      <Footer />
    </>
  );
}
