import Image from "next/image";
import { ArrowUpRight, Globe, Smartphone } from "lucide-react";
import { products, sideProjects, type Platform, type Product } from "@/content/profile";
import SystemMap from "./SystemMap";
import { cn } from "@/lib/utils";

function PlatformBadge({ p }: { p: Platform }) {
  const Icon = p === "Web" ? Globe : Smartphone;
  return (
    <span className="inline-flex items-center gap-1.5 border border-line-2 px-2 py-1 font-mono text-[11px] text-fg">
      <Icon className="h-3.5 w-3.5 text-up" />
      {p}
    </span>
  );
}

function BrowserFrame({ src, url, alt }: { src: string; url: string; alt: string }) {
  return (
    <div className="overflow-hidden border border-line-2 bg-panel-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-3 border-b border-line-2 px-3 py-2">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
          <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
          <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
        </span>
        <span className="flex-1 truncate bg-bg px-3 py-1 text-center font-mono text-[10px] text-muted">{url}</span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={900}
        sizes="(min-width: 1024px) 720px, 100vw"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}

function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] border-[5px] border-[#1c1c1c] bg-bg shadow-[0_24px_60px_-10px_rgba(0,0,0,0.95)] ring-1 ring-line-2",
        className
      )}
    >
      <Image src={src} alt={alt} width={540} height={1080} sizes="180px" className="block aspect-[9/19] w-full object-cover object-top" />
    </div>
  );
}

function ProductShowcase({ p, flip }: { p: Product; flip: boolean }) {
  const [primary, ...rest] = p.links;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12" data-reveal>
      {/* Media */}
      <div className={cn("relative pb-10 lg:col-span-7 lg:pb-0", flip && "lg:order-2")}>
        {p.web && <BrowserFrame src={p.web.src} url={p.web.url} alt={`${p.name} on the web`} />}
        <div className={cn("absolute -bottom-2 flex gap-3", flip ? "left-3 lg:-left-6" : "right-3 lg:-right-6")}>
          {p.phones.slice(0, 2).map((src, i) => (
            <PhoneFrame
              key={src}
              src={src}
              alt={`${p.name} mobile screen ${i + 1}`}
              className={cn("w-[24vw] max-w-[150px] sm:w-[130px]", i === 1 && "hidden translate-y-6 sm:block")}
            />
          ))}
        </div>
      </div>

      {/* Story */}
      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <p className="font-mono text-[11px] tracking-[0.16em] text-up uppercase">{p.category}</p>
        <h3 className="mt-3 font-serif text-4xl leading-none tracking-tight sm:text-5xl">{p.name}</h3>
        <p className="mt-3 text-lg text-muted">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.platforms.map((pl) => (
            <PlatformBadge key={pl} p={pl} />
          ))}
        </div>

        <div className="mt-6 border-l-2 border-up pl-4">
          <p className="font-mono text-[10px] tracking-wider text-dim uppercase">My role</p>
          <p className="mt-1 text-fg">{p.myRole}</p>
        </div>

        <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="text-up">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px]">
          {p.stack.map((s) => (
            <li key={s} className="border border-line-2 px-2 py-0.5 text-muted">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
          <a
            href={primary.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-fg px-4 py-2.5 font-semibold text-bg transition-colors hover:bg-up"
          >
            {primary.label} <ArrowUpRight className="h-4 w-4" />
          </a>
          {rest.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-line-2 px-4 py-2.5 transition-colors hover:border-up hover:text-up"
            >
              {l.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <div className="space-y-24 sm:space-y-32">
      {products.map((p, i) => (
        <ProductShowcase key={p.id} p={p} flip={i % 2 === 1} />
      ))}

      <div data-reveal>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-up uppercase">Under the hood</p>
            <h3 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">What keeps the money right</h3>
          </div>
          <p className="max-w-md text-sm text-muted">
            The systems I built behind the Unlok app. Users never see them — but every balance, alert and statement depends on them.
          </p>
        </div>
        <SystemMap />
      </div>

      <div data-reveal>
        <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          Side projects <span className="text-dim">· over the counter</span>
        </p>
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {sideProjects.map((p) => (
            <li key={p.name} className="flex flex-col bg-panel p-5">
              <p className="font-medium">{p.name}</p>
              <p className="mt-1 flex-1 text-sm text-muted">{p.summary}</p>
              <p className="mt-3 font-mono text-[10px] text-dim">{p.stack.join(" · ")}</p>
              <div className="mt-3 flex gap-4 font-mono text-[11px]">
                <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center text-up hover:underline">
                  Live <ArrowUpRight className="h-3 w-3" />
                </a>
                <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center text-muted hover:text-fg">
                  Code <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
