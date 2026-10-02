import { tape } from "@/content/profile";

/** Scrolling ticker of real numbers. Pure CSS; pauses on hover. */
export default function Tape() {
  const items = [...tape, ...tape];
  return (
    <div className="group relative overflow-hidden border-b border-line bg-panel font-mono text-[11px]">
      <ul className="flex w-max animate-tape group-hover:[animation-play-state:paused]" aria-label="Highlights">
        {items.map((t, i) => (
          <li key={i} aria-hidden={i >= tape.length} className="flex items-center gap-2 whitespace-nowrap px-5 py-2">
            <span className="font-semibold text-up">{t.sym}</span>
            <span className="text-muted">{t.text}</span>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-panel" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-panel" />
    </div>
  );
}
