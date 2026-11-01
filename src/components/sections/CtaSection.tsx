import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function CtaSection({
  title = "Ready to start your project?",
  text = "Tell us about your idea and we will help you find the right next step.",
  href = "/contact",
  label = "Start a Project",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="bg-brand-900 py-16 text-white" aria-labelledby="cta-heading">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-lg text-brand-100">{text}</p>
        </div>
        <Button href={href} variant="onDark">
          {label}
        </Button>
      </Container>
    </section>
  );
}
