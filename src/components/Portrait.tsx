"use client";

import { useEffect, useRef } from "react";
import { portrait } from "@/content/portrait";

const WHITE = "#ffffff";
const UP = "#2bd47d";
const LINE_MS = 700; // price line draws in
const DROP_MS = 900; // each dot's fall into place

/** A sparkline across the panel; dots start on it and fall into the face. */
function lineY(u: number, h: number) {
  return h * (0.62 - 0.22 * u + 0.05 * Math.sin(u * 17) + 0.03 * Math.sin(u * 41 + 1));
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Portrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const { cols, rows } = portrait;
    const raw = Uint8Array.from(atob(portrait.data), (c) => c.charCodeAt(0));
    const idx: number[] = [];
    raw.forEach((v, i) => v && idx.push(i));
    const n = idx.length;

    // Per-dot state in flat arrays: target, radius, live offset, intro delay.
    const tx = new Float32Array(n), ty = new Float32Array(n), r = new Float32Array(n);
    const ox = new Float32Array(n), oy = new Float32Array(n), delay = new Float32Array(n);
    const col = new Float32Array(n);
    for (let k = 0; k < n; k++) {
      col[k] = (idx[k] % cols) / (cols - 1);
      delay[k] = LINE_MS * 0.6 + col[k] * 500 + Math.random() * 300;
    }

    let w = 0, h = 0, cell = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.min(w / cols, h / rows);
      const offX = (w - cell * cols) / 2, offY = (h - cell * rows) / 2;
      for (let k = 0; k < n; k++) {
        const i = idx[k];
        tx[k] = offX + ((i % cols) + 0.5) * cell;
        ty[k] = offY + (Math.floor(i / cols) + 0.5) * cell;
        r[k] = (raw[i] / 255) * cell * 0.52;
      }
    };
    resize();

    let start = reduced ? -1e9 : performance.now();
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const t = now - start;
      const R = Math.max(60, w * 0.16);
      ctx.clearRect(0, 0, w, h);

      // Phase 1: the price line, drawn left to right, fading as dots leave it.
      if (t < LINE_MS + DROP_MS + 800) {
        const prog = Math.min(1, t / LINE_MS);
        const fade = 1 - Math.max(0, Math.min(1, (t - LINE_MS) / (DROP_MS + 800)));
        ctx.beginPath();
        for (let s = 0; s <= 80 * prog; s++) {
          const u = s / 80;
          const x = u * w, y = lineY(u, h);
          if (s) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        ctx.strokeStyle = UP;
        ctx.globalAlpha = 0.9 * fade;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      let settling = false;
      const white = new Path2D();
      const green = new Path2D();
      for (let k = 0; k < n; k++) {
        // Pointer pushes nearby dots away; offsets ease back when it leaves.
        let gx = 0, gy = 0, near = false;
        if (pointer) {
          const dx = tx[k] - pointer.x, dy = ty[k] - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0.01) {
            const f = (1 - d / R) ** 2 * R * 0.35;
            gx = (dx / d) * f;
            gy = (dy / d) * f;
            near = d < R * 0.75;
          }
        }
        ox[k] += (gx - ox[k]) * 0.18;
        oy[k] += (gy - oy[k]) * 0.18;
        if (Math.abs(ox[k]) + Math.abs(oy[k]) > 0.05) settling = true;

        if (col[k] * LINE_MS > t) continue; // the line hasn't reached this column yet
        const x = tx[k] + ox[k];
        let y = ty[k] + oy[k], rad = r[k];
        const p = Math.max(0, Math.min(1, (t - delay[k]) / DROP_MS));
        if (p < 1) {
          const e = easeOut(p);
          const sy = lineY(col[k], h);
          y = sy + (y - sy) * e;
          rad = 0.8 + (rad - 0.8) * e;
        }
        // Resting dots are green; the pointer (and dots still falling) light up white.
        const path = near || p < 0.35 ? white : green;
        path.moveTo(x + rad, y);
        path.arc(x, y, rad, 0, Math.PI * 2);
      }
      ctx.fillStyle = WHITE;
      ctx.fill(white);
      ctx.fillStyle = UP;
      ctx.fill(green);

      // Crosshair, as on a chart.
      if (pointer) {
        ctx.save();
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = "rgba(139,150,163,0.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, pointer.y + 0.5);
        ctx.lineTo(w, pointer.y + 0.5);
        ctx.moveTo(pointer.x + 0.5, 0);
        ctx.lineTo(pointer.x + 0.5, h);
        ctx.stroke();
        ctx.restore();
      }

      const intro = t < LINE_MS + DROP_MS + 1200;
      if (visible && (intro || pointer || settling)) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      const b = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - b.left, y: e.clientY - b.top };
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    // Touch has no hover: let the effect go when the finger lifts.
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };

    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    canvas.addEventListener("pointerup", onUp);

    // Restart the intro if the tab was hidden while it would have played.
    if (document.visibilityState === "hidden") {
      const onVis = () => {
        start = reduced ? -1e9 : performance.now();
        kick();
        document.removeEventListener("visibilitychange", onVis);
      };
      document.addEventListener("visibilitychange", onVis);
    }

    kick();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      canvas.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Portrait of Hansraj Saini drawn in market-data dots"
      className="h-full w-full touch-pan-y"
    />
  );
}
