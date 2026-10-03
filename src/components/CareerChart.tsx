"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import { levels, milestones, products, roles } from "@/content/profile";
import { cn, formatMonth } from "@/lib/utils";

const PAD = { l: 16, r: 72, t: 56, b: 30 };
const MIN_L = 0.4;
const MAX_L = 5;
const SNAP_PX = 32;

const toIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + m - 1;
};
const fromIndex = (i: number) => `${Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, "0")}`;

/** Monthly series: steps up at each milestone, drifts upward within a role, with a little market noise. */
function buildSeries(end: number) {
  const start = toIndex(milestones[0].ym);
  const pts: { m: number; v: number }[] = [];
  let v = milestones[0].level;
  for (let m = start; m <= end; m++) {
    const last = [...milestones].reverse().find((ms) => toIndex(ms.ym) <= m)!;
    const target = last.level + 0.025 * (m - toIndex(last.ym));
    v += (target - v) * 0.55;
    pts.push({ m, v: v + 0.08 * Math.sin(m * 1.9) + 0.05 * Math.sin(m * 4.3) });
  }
  return { start, pts };
}

function roleAt(m: number) {
  const last = [...milestones].reverse().find((ms) => toIndex(ms.ym) <= m);
  if (!last) return null;
  const role = roles.find((r) => r.id === last.role)!;
  // Between the internship and Instient there's a gap: that's university.
  if (role.to && m > toIndex(role.to)) return null;
  return role;
}

const productsOf = (ids: string[]) => ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

export default function CareerChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [drawn, setDrawn] = useState(false);
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);
  const [hoverMs, setHoverMs] = useState<number | null>(null);
  const [pinned, setPinned] = useState(roles[0].id);
  const [touched, setTouched] = useState(false);
  const [end, setEnd] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    setEnd(now.getFullYear() * 12 + now.getMonth());
    const el = wrapRef.current!;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.width < 640 ? 300 : 380 })
    );
    ro.observe(el);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const geo = useMemo(() => {
    if (!end || !size.w) return null;
    const { start, pts } = buildSeries(end);
    const { w, h } = size;
    const x = (m: number) => PAD.l + ((m - start) / (end - start)) * (w - PAD.l - PAD.r);
    const y = (v: number) => PAD.t + (1 - (v - MIN_L) / (MAX_L - MIN_L)) * (h - PAD.t - PAD.b);
    const line = pts.map((p, i) => `${i ? "L" : "M"}${x(p.m).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
    const area = `${line}L${x(end).toFixed(1)},${h - PAD.b}L${x(start)},${h - PAD.b}Z`;
    const years: number[] = [];
    for (let yr = Math.ceil(start / 12); yr * 12 <= end; yr++) years.push(yr);
    const marks = milestones.map((ms) => {
      const p = pts[toIndex(ms.ym) - start];
      return { ...ms, cx: x(p.m), cy: y(p.v) };
    });
    return { start, pts, x, y, line, area, years, marks };
  }, [end, size]);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!geo || !end) return;
    const b = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - b.left;
    const u = (px - PAD.l) / (size.w - PAD.l - PAD.r);
    setHoverMonth(Math.max(geo.start, Math.min(end, Math.round(geo.start + u * (end - geo.start)))));
    // Snap to the nearest milestone when close, so the markers are easy to hit.
    let best: number | null = null;
    let bestD = SNAP_PX;
    geo.marks.forEach((mk, i) => {
      const d = Math.abs(mk.cx - px);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setHoverMs(best);
    setTouched(true);
    if (e.pointerType !== "mouse" && best !== null) setPinned(geo.marks[best].role);
  };

  const clearHover = () => {
    setHoverMonth(null);
    setHoverMs(null);
  };

  const hoverMark = geo && hoverMs !== null ? geo.marks[hoverMs] : null;
  const hoverRole = hoverMark
    ? roles.find((r) => r.id === hoverMark.role)!
    : hoverMonth !== null
      ? roleAt(hoverMonth)
      : null;
  const activeRole = hoverRole ?? roles.find((r) => r.id === pinned)!;
  const crossX = hoverMark ? hoverMark.cx : geo && hoverMonth !== null ? geo.x(hoverMonth) : null;
  const crossPt = geo && hoverMonth !== null && !hoverMark ? geo.pts[hoverMonth - geo.start] : null;
  const last = geo?.pts[geo.pts.length - 1];

  // Hover card sits beside the point (never on top of it); phones get a compact strip instead.
  const compact = size.w < 640;
  const TIP_W = compact ? size.w - 24 : 300;
  const anchorY = hoverMark ? hoverMark.cy : crossPt && geo ? geo.y(crossPt.v) : 0;
  let tipLeft = 12;
  let tipTop = 8;
  if (!compact && crossX !== null) {
    tipLeft = crossX + 48 + TIP_W < size.w - PAD.r ? crossX + 48 : crossX - 48 - TIP_W;
    tipTop = Math.max(8, Math.min(size.h - 250, anchorY - 70));
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <span>
          <span className="text-fg">career.chart</span>
          <span className="hidden sm:inline"> · Scope over time</span>
        </span>
        <span className={cn("flex items-center gap-1.5 normal-case", touched ? "text-dim" : "text-up")}>
          <MousePointerClick className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Hover or tap a milestone</span>
          <span className="sm:hidden">Tap a milestone</span>
        </span>
      </div>

      <div ref={wrapRef} className="relative select-none" style={{ height: size.h || 300 }}>
        {geo && (
          <svg
            width={size.w}
            height={size.h}
            className="block cursor-crosshair touch-pan-y"
            onPointerMove={onMove}
            onPointerDown={onMove}
            // Touch has no hover: keep the card until the next tap.
            onPointerLeave={(e) => e.pointerType === "mouse" && clearHover()}
            onClick={() => hoverRole && setPinned(hoverRole.id)}
            role="img"
            aria-label="Career trajectory chart from 2023 to today"
          >
            <defs>
              <linearGradient id="career-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-up)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--color-up)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {levels.map((l) => (
              <g
                key={l.label}
                // Hide an axis label when the NOW tag sits on top of it.
                opacity={last && Math.abs(geo.y(l.level) - geo.y(last.v)) < 16 ? 0 : 1}
              >
                <line
                  x1={PAD.l}
                  x2={size.w - PAD.r}
                  y1={geo.y(l.level)}
                  y2={geo.y(l.level)}
                  stroke="var(--color-line)"
                  strokeDasharray="2 4"
                />
                <text x={size.w - PAD.r + 10} y={geo.y(l.level) + 3} className="fill-dim font-mono text-[10px] uppercase">
                  {l.label}
                </text>
              </g>
            ))}
            {geo.years.map((yr) => (
              <text key={yr} x={geo.x(yr * 12)} y={size.h - 9} textAnchor="middle" className="fill-dim font-mono text-[10px]">
                {yr}
              </text>
            ))}

            <path
              d={geo.area}
              fill="url(#career-fill)"
              className="transition-opacity delay-700 duration-1000"
              style={{ opacity: drawn ? 1 : 0 }}
            />
            <path
              d={geo.line}
              fill="none"
              stroke="var(--color-up)"
              strokeWidth={2}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              style={{
                strokeDashoffset: drawn ? 0 : 1,
                transition: "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />

            {crossX !== null && (
              <line
                x1={crossX}
                x2={crossX}
                y1={PAD.t - 20}
                y2={size.h - PAD.b}
                stroke="var(--color-muted)"
                strokeDasharray="3 3"
                pointerEvents="none"
              />
            )}
            {crossPt && <circle cx={geo.x(crossPt.m)} cy={geo.y(crossPt.v)} r={4} fill="var(--color-fg)" pointerEvents="none" />}

            {geo.marks.map((mk, i) => {
              const active = hoverMs === i || (hoverMs === null && mk.role === activeRole.id);
              const below = i === 1; // "Joins" and "Full-time" are a month apart
              return (
                <g
                  key={mk.ym}
                  style={{ opacity: drawn ? 1 : 0, transition: `opacity .35s ${0.5 + i * 0.25}s` }}
                  pointerEvents="none"
                >
                  {!touched && <circle cx={mk.cx} cy={mk.cy} className="career-ring" fill="none" stroke="var(--color-up)" />}
                  <circle
                    cx={mk.cx}
                    cy={mk.cy}
                    r={active ? 10 : 8}
                    fill="var(--color-bg)"
                    stroke={active ? "var(--color-fg)" : "var(--color-up)"}
                    strokeWidth={2}
                    style={{ transition: "r .2s" }}
                  />
                  <circle cx={mk.cx} cy={mk.cy} r={active ? 5 : 3.5} fill={active ? "var(--color-up)" : "var(--color-fg)"} />
                  {size.w >= 640 && (
                    <text
                      x={mk.cx}
                      y={below ? mk.cy + 28 : mk.cy - 18}
                      textAnchor={mk.cx < 48 ? "start" : "middle"}
                      className={cn("font-mono text-[11px]", active ? "fill-fg" : "fill-muted")}
                    >
                      {mk.short}
                    </text>
                  )}
                </g>
              );
            })}

            {last && (
              <g style={{ opacity: drawn ? 1 : 0, transition: "opacity .4s 1.8s" }}>
                <rect x={size.w - PAD.r + 4} y={geo.y(last.v) - 10} width={56} height={20} fill="var(--color-up)" />
                <text x={size.w - PAD.r + 12} y={geo.y(last.v) + 4} className="fill-bg font-mono text-[10px] font-semibold">
                  NOW
                </text>
              </g>
            )}
          </svg>
        )}

        {/* Phones: one quiet line; the tabs and panel below carry the detail. */}
        {compact && crossX !== null && (
          <p className="pointer-events-none absolute top-2 left-3 font-mono text-[10px] uppercase">
            <span className="text-fg">{hoverMark ? formatMonth(hoverMark.ym) : formatMonth(fromIndex(hoverMonth!))}</span>
            <span className="text-up"> · {hoverMark ? hoverMark.short : (hoverRole?.company ?? "University")}</span>
          </p>
        )}

        {/* Hover card */}
        {!compact && crossX !== null && (
          <div
            className="pointer-events-none absolute z-10 border border-line-2 bg-panel-2/95 p-3 shadow-2xl backdrop-blur"
            style={{ left: tipLeft, top: tipTop, width: TIP_W }}
          >
            <p className="font-mono text-[10px] text-dim uppercase">
              {hoverMark ? formatMonth(hoverMark.ym) : formatMonth(fromIndex(hoverMonth!))}
              {hoverMark && <span className="text-up"> · {hoverMark.label}</span>}
            </p>
            {hoverRole ? (
              <>
                <p className="mt-1.5 font-medium">
                  {hoverRole.title} <span className="text-muted">· {hoverRole.company}</span>
                </p>
                <ul className="mt-2 space-y-1.5 text-sm leading-snug text-muted">
                  {hoverRole.simple.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-up">•</span>
                      {line}
                    </li>
                  ))}
                </ul>
                {hoverMark && <p className="mt-2.5 font-mono text-[10px] text-dim">Click to pin · details below</p>}
              </>
            ) : (
              <p className="mt-1.5 text-sm text-muted">B.Tech, Computer Science</p>
            )}
          </div>
        )}
      </div>

      {/* Role tabs double as the accessible way to browse the chart. */}
      <div role="tablist" aria-label="Roles" className="flex overflow-x-auto border-t border-line font-mono text-[11px]">
        {roles.map((r) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={activeRole.id === r.id}
            aria-controls="role-panel"
            onClick={() => {
              setPinned(r.id);
              setTouched(true);
            }}
            className={cn(
              "shrink-0 border-r border-line px-4 py-3 text-left transition-colors",
              activeRole.id === r.id ? "bg-panel-2 text-fg shadow-[inset_0_-2px_0_var(--color-up)]" : "text-muted hover:text-fg"
            )}
          >
            <span className={cn("block text-[10px]", activeRole.id === r.id ? "text-up" : "text-dim")}>
              {r.from.slice(0, 4)}
              {r.to ? `–${r.to.slice(2, 4)}` : "–NOW"}
            </span>
            {r.company}
          </button>
        ))}
      </div>

      <RolePanel key={activeRole.id} roleId={activeRole.id} />
    </div>
  );
}

function RolePanel({ roleId }: { roleId: string }) {
  const role = roles.find((r) => r.id === roleId)!;
  const shipped = productsOf(role.products);
  return (
    <div id="role-panel" role="tabpanel" className="animate-fade-in border-t border-line p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div>
          <p className="font-mono text-[11px] text-up uppercase">
            {formatMonth(role.from)} — {formatMonth(role.to)}
          </p>
          <h3 className="mt-2 font-serif text-3xl leading-tight">{role.title}</h3>
          <p className="mt-1 text-muted">
            {role.company}
            {role.client && <span className="text-dim"> · for {role.client}</span>}
          </p>
          <p className="mt-1 font-mono text-[11px] text-dim">{role.place}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]">
            {role.stack.map((s) => (
              <li key={s} className="border border-line-2 px-2 py-0.5 text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-lg text-fg">{role.summary}</p>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="text-up">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {shipped.length > 0 && (
            <div className="mt-6">
              <p className="font-mono text-[10px] tracking-wider text-dim uppercase">Shipped in this role</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {shipped.map((p) => (
                  <div key={p.id} className="flex gap-3 border border-line bg-panel-2 p-2.5">
                    {p.web && (
                      <Image
                        src={p.web.src}
                        alt={`${p.name} screenshot`}
                        width={240}
                        height={150}
                        className="aspect-[16/10] w-28 shrink-0 border border-line-2 object-cover object-top"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium">{p.name}</p>
                      <p className="font-mono text-[10px] text-dim">{p.platforms.join(" · ")}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 font-mono text-[11px]">
                        {p.links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center text-up hover:underline">
                            {l.label}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
