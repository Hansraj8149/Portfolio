import { profile, stats } from "@/content/profile";
import Portrait from "./Portrait";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-line">
      <div className="chart-paper pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-[1240px] gap-8 px-4 pt-5 pb-12 md:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-16">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase" data-reveal>
            <span className="text-up">{profile.symbol}</span> · {profile.role} · {profile.specialty} · {profile.location}
          </p>
          <h1
            className="mt-5 font-serif text-[2.9rem] leading-[1] font-normal tracking-[-0.025em] text-balance sm:text-6xl lg:text-[5.4rem]"
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {profile.headline}
          </h1>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {profile.intro}
          </p>
          <div
            className="mt-7 flex flex-wrap gap-3 font-mono text-sm"
            data-reveal
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <a
              href="#work"
              className="bg-fg px-4 py-2.5 font-semibold text-bg transition-colors hover:bg-up"
            >
              See my work →
            </a>
            <a
              href="#contact"
              className="border border-line-2 px-4 py-2.5 transition-colors hover:border-up hover:text-up"
            >
              Place an order
            </a>
          </div>

          <dl
            className="mt-10 grid grid-cols-2 border-t border-l border-line sm:grid-cols-4"
            data-reveal
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {stats.map((s) => (
              // Value renders above the label so all numbers share one baseline, however the labels wrap.
              <div key={s.label} className="flex flex-col-reverse justify-end gap-1 border-r border-b border-line px-3 py-3">
                <dt className="font-mono text-[10px] tracking-wider text-dim uppercase">{s.label}</dt>
                <dd className="num text-2xl font-semibold text-fg">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="panel relative order-first lg:order-none" data-reveal>
          <div className="panel-head">
            <span>
              <span className="text-fg">{profile.symbol}</span> · 1D · Dots
            </span>
            <span className="flex items-center gap-1.5 text-up">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-up" /> Live
            </span>
          </div>
          <div className="relative mx-auto aspect-[64/72] max-h-[34vh] sm:max-h-[44vh] w-full lg:max-h-none">
            <Portrait />
          </div>
          <figcaption className="flex justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-dim uppercase">
            <span>{profile.remote}</span>
            <span className="hidden sm:inline">Hover / drag</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
