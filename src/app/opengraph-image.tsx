import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile, stats } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}, ${profile.specialty}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const serif = await readFile(path.join(process.cwd(), "scripts/fonts/newsreader-500.woff"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#ffffff",
          padding: 64,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#a3a8ae" }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <path d="M18 12V60M46 4V52" stroke="#ffffff" strokeWidth="3.5" />
            <rect x="10" y="20" width="16" height="34" rx="1" fill="#ffffff" />
            <rect x="38" y="10" width="16" height="34" rx="1" fill="#ffffff" />
            <path d="M20 42.5L44 24.5V33.5L20 51.5Z" fill="#2bd47d" stroke="#000000" strokeWidth="2.5" />
          </svg>
          {profile.name} · {profile.role}, {profile.specialty}
        </div>
        <div style={{ fontSize: 84, letterSpacing: -2, lineHeight: 1.02, fontFamily: "Newsreader" }}>
          {profile.headline}
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 24 }}>
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#2bd47d" }}>{s.value}</span>
              <span style={{ color: "#63686e" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Newsreader", data: serif, weight: 500, style: "normal" }] }
  );
}
