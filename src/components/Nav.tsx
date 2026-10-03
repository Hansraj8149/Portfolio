"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export const sections = [
  { id: "career", label: "Career", short: "CRR" },
  { id: "work", label: "Work", short: "WRK" },
  { id: "capabilities", label: "Capabilities", short: "CAP" },
  { id: "note", label: "Note", short: "NTE" },
  { id: "contact", label: "Contact", short: "ORD" },
];

const clocks = [
  { label: "JPR", tz: "Asia/Kolkata" },
  { label: "TYO", tz: "Asia/Tokyo" },
  { label: "NYC", tz: "America/New_York" },
];

function timeIn(tz: string, now: Date) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(now);
}

/** NYSE session from New York wall-clock time (holidays ignored). */
function nyseStatus(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  if (["Sat", "Sun"].includes(get("weekday"))) return { label: "CLOSED", tone: "dim" as const };
  if (mins >= 570 && mins < 960) return { label: "OPEN", tone: "up" as const };
  if (mins >= 240 && mins < 570) return { label: "PRE-MKT", tone: "amber" as const };
  if (mins >= 960 && mins < 1200) return { label: "AFTER-HRS", tone: "amber" as const };
  return { label: "CLOSED", tone: "dim" as const };
}

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    let interval: ReturnType<typeof setInterval>;
    // Align ticks to the minute so clocks change when the real clock does.
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  return now;
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const els = ["home", ...sections.map((s) => s.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function useNumberKeys() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      const i = Number(e.key);
      if (i >= 1 && i <= sections.length) {
        document.getElementById(sections[i - 1].id)?.scrollIntoView();
      } else if (e.key === "0") {
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

const toneClass = { up: "text-up", amber: "text-fg", dim: "text-dim" };

export default function Nav() {
  const now = useNow();
  const active = useActiveSection();
  useNumberKeys();
  const nyse = now ? nyseStatus(now) : null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1240px] items-center gap-4 px-4 font-mono text-xs">
          <a href="#home" aria-label={`${profile.name} — home`}>
            <Logo />
          </a>

          <nav aria-label="Sections" className="ml-4 hidden items-center gap-1 lg:flex">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={cn(
                  "px-2 py-1 transition-colors",
                  active === s.id ? "bg-panel-2 text-fg" : "text-muted hover:text-fg"
                )}
              >
                <span className="mr-1 text-up">{i + 1}</span>
                {s.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="num hidden items-center gap-3 text-muted md:flex" aria-label="World clocks">
              {clocks.map((c) => (
                <span key={c.label}>
                  <span className="text-dim">{c.label}</span> {now ? timeIn(c.tz, now) : "--:--"}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1.5" title="New York Stock Exchange session">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-current",
                  nyse ? toneClass[nyse.tone] : "text-dim",
                  nyse?.tone === "up" && "animate-pulse"
                )}
              />
              <span className="text-dim">NYSE</span>
              <span className={nyse ? toneClass[nyse.tone] : "text-dim"}>{nyse?.label ?? "···"}</span>
            </span>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="border border-line-2 px-2.5 py-1 text-fg transition-colors hover:border-fg"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </header>

      {/* Mobile: bottom tab bar, thumb-reachable like a trading app. */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid grid-cols-5 font-mono text-[10px] tracking-wider">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 transition-colors",
                  active === s.id ? "text-up" : "text-dim"
                )}
              >
                <span className="font-semibold">{s.short}</span>
                <span className={cn("text-[9px]", active === s.id ? "text-fg" : "text-muted")}>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
