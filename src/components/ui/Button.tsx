import Link from "@/components/ui/SiteLink";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDark" | "onDarkOutline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800",
  secondary: "border border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-50",
  onDark: "bg-accent-400 text-ink-950 hover:bg-accent-300",
  onDarkOutline: "border border-white/30 text-white hover:bg-white/10",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & { href: string };
type NativeButtonProps = CommonProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (typeof props.href === "string") {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
