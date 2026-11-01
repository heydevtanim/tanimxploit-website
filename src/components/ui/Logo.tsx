/** Temporary text/SVG logo. Replace with the approved TanimXploit logo asset before launch. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none">
        <rect width="32" height="32" rx="8" fill="#0b1220" />
        <path d="M8 10h16M16 10v13" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <path d="M11 23l10-6" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      </svg>
      <span className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-ink-900"}`}>
        Tanim<span className={dark ? "text-brand-300" : "text-brand-700"}>Xploit</span>
      </span>
    </span>
  );
}
