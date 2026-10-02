"use client";

import { useState } from "react";
import { BellRing, Bot, Filter, Layers, Scale, Workflow } from "lucide-react";
import { systems, type System } from "@/content/profile";
import { cn } from "@/lib/utils";

const icons: Record<System["icon"], typeof Layers> = {
  layers: Layers,
  scale: Scale,
  bell: BellRing,
  workflow: Workflow,
  bot: Bot,
  filter: Filter,
};

/** Interactive map of the back-office systems: pick one, see how it works. */
export default function SystemMap() {
  const [active, setActive] = useState(0);
  const sys = systems[active];
  const Icon = icons[sys.icon];

  return (
    <div className="panel">
      <div className="panel-head">
        <span>
          <span className="text-fg">system.map</span>
          <span className="hidden sm:inline"> · Behind the apps</span>
        </span>
        <span className="normal-case">
          {active + 1} / {systems.length}
        </span>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* System list: vertical on desktop, scrollable chips on phones */}
        <div
          role="tablist"
          aria-label="Systems"
          className="flex overflow-x-auto border-b border-line lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0"
        >
          {systems.map((s, i) => {
            const I = icons[s.icon];
            const on = i === active;
            return (
              <button
                key={s.code}
                role="tab"
                aria-selected={on}
                aria-controls="system-panel"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex shrink-0 items-center gap-3 border-r border-line px-4 py-3 text-left transition-colors lg:border-r-0 lg:border-b lg:last:border-b-0",
                  on ? "bg-panel-2 shadow-[inset_2px_0_0_var(--color-up)]" : "hover:bg-panel-2/60"
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center border transition-colors",
                    on ? "border-up bg-up/10 text-up" : "border-line-2 text-muted"
                  )}
                >
                  <I className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className={cn("block font-mono text-[10px]", on ? "text-up" : "text-dim")}>{s.code}</span>
                  <span className={cn("block text-sm whitespace-nowrap", on ? "text-fg" : "text-muted")}>{s.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div id="system-panel" role="tabpanel" key={sys.code} className="animate-fade-in p-5 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center border border-up/40 bg-up/10 text-up">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{sys.name}</h3>
              <p className="mt-2 max-w-2xl text-lg text-fg">{sys.plain}</p>
            </div>
          </div>

          {/* How it works: big pipeline with a signal travelling along it */}
          <p className="mt-8 font-mono text-[10px] tracking-wider text-dim uppercase">How it works</p>
          <ol className="relative mt-4 grid gap-3 sm:grid-cols-4 sm:gap-0">
            <span aria-hidden className="absolute top-1/2 right-[12%] left-[12%] hidden h-px bg-line-2 sm:block" />
            <span aria-hidden className="flow-signal absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 bg-up sm:block" />
            {sys.flow.map((step, i) => {
              const last = i === sys.flow.length - 1;
              return (
                <li key={step} className="relative flex sm:justify-center sm:px-2">
                  <span
                    className={cn(
                      "relative z-10 flex w-full items-center gap-3 border px-3 py-3 sm:flex-col sm:gap-1.5 sm:py-4 sm:text-center",
                      last ? "border-up/60 bg-[#06150d] text-up" : "border-line-2 bg-panel-2 text-fg"
                    )}
                  >
                    <span className={cn("font-mono text-[10px]", last ? "text-up" : "text-dim")}>0{i + 1}</span>
                    <span className="text-sm font-medium">{step}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 grid gap-4 border-t border-line pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              <span className="font-mono text-[10px] tracking-wider text-dim uppercase">Under the hood · </span>
              {sys.summary}
            </p>
            <ul className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {sys.stack.map((t) => (
                <li key={t} className="border border-line-2 px-2 py-0.5 text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
