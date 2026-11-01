import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  id,
  tone = "light",
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  tone?: "light" | "soft" | "dark";
  className?: string;
  labelledBy?: string;
}) {
  const tones = {
    light: "bg-white",
    soft: "bg-ink-50",
    dark: "bg-ink-950 text-white",
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-20 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <div className={`mb-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className={`mb-2 text-sm font-semibold uppercase tracking-wider ${dark ? "text-brand-300" : "text-brand-700"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={`text-3xl font-bold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink-900"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-ink-200" : "text-ink-600"}`}>{description}</p>
      ) : null}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-300">{eyebrow}</p>
        ) : null}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-200">{description}</p>
      </Container>
    </div>
  );
}
