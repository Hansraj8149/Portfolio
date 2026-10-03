import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Logo, LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Brand kit",
  description: "Logo, wordmark and icons for Hansraj Saini.",
};

const marks = [
  { name: "Mark — on dark", file: "mark", bg: "bg-bg", sizes: [64, 128, 256, 512, 1024] },
  { name: "Mark — on light", file: "mark-on-light", bg: "bg-fg", sizes: [64, 128, 256, 512, 1024] },
];
const lockups = [
  { name: "Lockup — on dark", file: "lockup", bg: "bg-bg" },
  { name: "Lockup — on light", file: "lockup-on-light", bg: "bg-fg" },
  { name: "Wordmark — on dark", file: "wordmark", bg: "bg-bg" },
  { name: "Wordmark — on light", file: "wordmark-on-light", bg: "bg-fg" },
];
const extras = [
  { name: "Mono white", file: "mark-mono-white.svg", bg: "bg-bg" },
  { name: "Mono black", file: "mark-mono-black.svg", bg: "bg-fg" },
  { name: "Small sizes (≤24px)", file: "mark-small.svg", bg: "bg-bg" },
  { name: "App icon", file: "app-icon.svg", bg: "bg-panel-2" },
];
const palette = [
  { name: "Black", hex: "#000000", cls: "bg-bg ring-1 ring-line-2" },
  { name: "White", hex: "#FFFFFF", cls: "bg-fg" },
  { name: "Green", hex: "#2BD47D", cls: "bg-up" },
  { name: "Silver", hex: "#A3A8AE", cls: "bg-muted" },
  { name: "Red (negative)", hex: "#FF5A5F", cls: "bg-down" },
];

function Dl({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} download className="inline-flex items-center gap-1 text-muted hover:text-up">
      <Download className="h-3 w-3" />
      {label}
    </a>
  );
}

export default function BrandPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 py-12 sm:py-20">
      <Link href="/" className="font-mono text-xs text-muted hover:text-fg">
        ← Back to site
      </Link>
      <header className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-up uppercase">Brand kit</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">The Candlestick H</h1>
          <p className="mt-4 max-w-xl text-muted">
            Two candles form the uprights of an H — the right one higher — joined by a rising green trend line. It reads
            as a monogram and as a chart. Use the small-size drawing below 24px.
          </p>
        </div>
        <LogoMark className="h-28 w-28 text-fg" />
      </header>

      <section className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
        {marks.map((m) => (
          <div key={m.file} className="bg-panel">
            <div className={`grid h-56 place-items-center ${m.bg}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/${m.file}.svg`} alt={m.name} className="h-28 w-28" />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line p-4 font-mono text-[11px]">
              <span className="mr-auto text-fg">{m.name}</span>
              <Dl href={`/brand/${m.file}.svg`} label="SVG" />
              {m.sizes.map((s) => (
                <Dl key={s} href={`/brand/${m.file}-${s}.png`} label={`${s}`} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-px grid gap-px border border-t-0 border-line bg-line sm:grid-cols-2">
        {lockups.map((l) => (
          <div key={l.file} className="bg-panel">
            <div className={`grid h-40 place-items-center px-6 ${l.bg}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/${l.file}.svg`} alt={l.name} className="h-14 max-w-full" />
            </div>
            <div className="flex flex-wrap items-center gap-4 border-t border-line p-4 font-mono text-[11px]">
              <span className="mr-auto text-fg">{l.name}</span>
              <Dl href={`/brand/${l.file}.svg`} label="SVG" />
              <Dl href={`/brand/${l.file}@2x.png`} label="PNG 2x" />
              <Dl href={`/brand/${l.file}@4x.png`} label="PNG 4x" />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-px grid grid-cols-2 gap-px border border-t-0 border-line bg-line md:grid-cols-4">
        {extras.map((e) => (
          <div key={e.file} className="bg-panel">
            <div className={`grid h-36 place-items-center ${e.bg}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/${e.file}`} alt={e.name} className="h-16 w-16" />
            </div>
            <div className="flex items-center justify-between border-t border-line p-3 font-mono text-[11px]">
              <span className="text-fg">{e.name}</span>
              <Dl href={`/brand/${e.file}`} label="SVG" />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Icons</h2>
          <div className="mt-4 flex items-end gap-5">
            {[16, 24, 32, 48, 64].map((s) => (
              <div key={s} className="text-center">
                <span className="mx-auto block" style={{ width: s, height: s }}>
                  <LogoMark small={s <= 24} className="h-full w-full text-fg" />
                </span>
                <span className="mt-2 block font-mono text-[10px] text-dim">{s}px</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-[11px]">
            <Dl href="/favicon/favicon.ico" label="favicon.ico" />
            <Dl href="/favicon/favicon.svg" label="favicon.svg" />
            <Dl href="/favicon/apple-touch-icon.png" label="apple-touch 180" />
            <Dl href="/brand/app-icon-512.png" label="app icon 512" />
            <Dl href="/brand/app-icon-1024.png" label="app icon 1024" />
          </div>
        </div>
        <div>
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Colour & type</h2>
          <ul className="mt-4 grid grid-cols-5 gap-2">
            {palette.map((c) => (
              <li key={c.hex}>
                <span className={`block h-14 ${c.cls}`} />
                <span className="mt-2 block text-xs">{c.name}</span>
                <span className="block font-mono text-[10px] text-dim">{c.hex}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-1">
            <p className="font-serif text-3xl">Newsreader — headlines</p>
            <p>Inter — interface and body text</p>
            <p className="font-mono text-sm text-muted">JetBrains Mono — numbers and data</p>
          </div>
        </div>
      </section>

      <div className="mt-16 border-t border-line pt-6">
        <Logo />
      </div>
    </main>
  );
}
