import { cn } from "@/lib/utils";

/**
 * The Candlestick H. Same geometry as scripts/build-brand.mjs — keep in sync.
 * `small` uses the heavier drawing meant for ≤ 24px.
 */
export function LogoMark({ className, small = false }: { className?: string; small?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      {small ? (
        <>
          <path d="M17 14V58M47 6V50" stroke="currentColor" strokeWidth="5" />
          <rect x="7" y="20" width="20" height="32" rx="1" fill="currentColor" />
          <rect x="37" y="12" width="20" height="32" rx="1" fill="currentColor" />
          <path d="M19 39L45 22V33L19 50Z" fill="var(--color-up)" stroke="var(--color-bg)" strokeWidth="3" paintOrder="stroke" />
        </>
      ) : (
        <>
          <path d="M18 12V60M46 4V52" stroke="currentColor" strokeWidth="3.5" />
          <rect x="10" y="20" width="16" height="34" rx="1" fill="currentColor" />
          <rect x="38" y="10" width="16" height="34" rx="1" fill="currentColor" />
          <path d="M20 42.5L44 24.5V33.5L20 51.5Z" fill="var(--color-up)" stroke="var(--color-bg)" strokeWidth="2.5" paintOrder="stroke" />
        </>
      )}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark small className="h-7 w-7 text-fg" />
      <span className="font-serif text-[19px] leading-none font-medium tracking-tight">Hansraj Saini</span>
    </span>
  );
}
