// Generates the logo kit: SVG masters, PNG sizes, favicons and app icons.
//
//   pnpm brand
//
// The mark is a "Candlestick H": two candles whose bodies form the uprights of
// an H, the right one higher, joined by a green rising trend line. Small sizes
// use a simplified drawing with heavier strokes so it survives 16px.
// Wordmark text is converted to outlines, so the SVGs need no fonts installed.
import sharp from "sharp";
import opentype from "opentype.js";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const C = {
  black: "#000000",
  white: "#ffffff",
  green: "#2bd47d",
  greenOnLight: "#0f9d58",
};

/** Full-detail mark on a 64×64 grid. */
function mark({ fg, accent, cut }) {
  return `
  <path d="M18 12V60M46 4V52" stroke="${fg}" stroke-width="3.5"/>
  <rect x="10" y="20" width="16" height="34" rx="1" fill="${fg}"/>
  <rect x="38" y="10" width="16" height="34" rx="1" fill="${fg}"/>
  <path d="M20 42.5L44 24.5V33.5L20 51.5Z" fill="${accent}"${cut ? ` stroke="${cut}" stroke-width="2.5" paint-order="stroke"` : ""}/>`;
}

/** Simplified mark for 16–48px: shorter, heavier wicks and a thicker trend line. */
function markSmall({ fg, accent, cut }) {
  return `
  <path d="M17 14V58M47 6V50" stroke="${fg}" stroke-width="5"/>
  <rect x="7" y="20" width="20" height="32" rx="1" fill="${fg}"/>
  <rect x="37" y="12" width="20" height="32" rx="1" fill="${fg}"/>
  <path d="M19 39L45 22V33L19 50Z" fill="${accent}"${cut ? ` stroke="${cut}" stroke-width="3" paint-order="stroke"` : ""}/>`;
}

const onDark = { fg: C.white, accent: C.green, cut: C.black };
const onLight = { fg: C.black, accent: C.greenOnLight, cut: C.white };
const monoWhite = { fg: C.white, accent: C.white, cut: C.black };
const monoBlack = { fg: C.black, accent: C.black, cut: C.white };

const svg = (w, h, body, extra = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"${extra}>${body}</svg>\n`;

/** Mark centred on a square tile; `scale` leaves room for maskable safe zones. */
function tile({ draw = mark, colors = onDark, bg = C.black, radius = 0, scale = 1 }) {
  const s = 64 * scale;
  const o = (64 - s) / 2;
  return svg(
    64,
    64,
    `<rect width="64" height="64" rx="${radius}" fill="${bg}"/><g transform="translate(${o} ${o}) scale(${scale})">${draw(colors)}</g>`
  );
}

// --- Wordmark: text to outlines ---------------------------------------------
const serif = opentype.parse(readFileSync("scripts/fonts/newsreader-500.woff").buffer);
const mono = opentype.parse(readFileSync("scripts/fonts/jetbrains-mono-500.woff").buffer);

function textPath(font, text, size, x, y, fill, letterSpacing = 0) {
  const path = font.getPath(text, x, y, size, { letterSpacing: letterSpacing / size });
  return { d: path.toPathData(2), width: font.getAdvanceWidth(text, size, { letterSpacing: letterSpacing / size }), fill };
}

function wordmark(colors, sub) {
  const name = textPath(serif, "Hansraj Saini", 44, 0, 0, colors.fg, -0.5);
  const h = 64;
  const gap = 18;
  const nameY = sub ? 38 : 46;
  const n = textPath(serif, "Hansraj Saini", 44, 64 + gap, nameY, colors.fg, -0.5);
  let body = `<g>${mark(colors)}</g><path d="${n.d}" fill="${n.fill}"/>`;
  let w = 64 + gap + name.width;
  if (sub) {
    const s = textPath(mono, "FINTECH · PRODUCT ENGINEER", 11, 64 + gap + 2, 57, colors.sub, 2.2);
    body += `<path d="${s.d}" fill="${s.fill}"/>`;
    w = Math.max(w, 64 + gap + 2 + s.width);
  }
  return svg(Math.ceil(w + 4), h, body);
}

// --- Write everything ------------------------------------------------------
mkdirSync("public/brand", { recursive: true });
mkdirSync("public/favicon", { recursive: true });

const files = {
  "public/brand/mark.svg": svg(64, 64, mark(onDark)),
  "public/brand/mark-on-light.svg": svg(64, 64, mark(onLight)),
  "public/brand/mark-mono-white.svg": svg(64, 64, mark(monoWhite)),
  "public/brand/mark-mono-black.svg": svg(64, 64, mark(monoBlack)),
  "public/brand/mark-small.svg": svg(64, 64, markSmall(onDark)),
  "public/brand/app-icon.svg": tile({ radius: 14, scale: 0.78 }),
  "public/brand/wordmark.svg": wordmark({ ...onDark, sub: "#9aa1a9" }, false),
  "public/brand/wordmark-on-light.svg": wordmark({ ...onLight, sub: "#5c636b" }, false),
  "public/brand/lockup.svg": wordmark({ ...onDark, sub: "#9aa1a9" }, true),
  "public/brand/lockup-on-light.svg": wordmark({ ...onLight, sub: "#5c636b" }, true),
  // Browser tab icon: dark tile so it reads on light and dark tab strips.
  "public/favicon/favicon.svg": tile({ draw: markSmall, radius: 12, scale: 0.86 }),
};
for (const [path, content] of Object.entries(files)) writeFileSync(path, content);

const png = (svgText, size, out) =>
  sharp(Buffer.from(svgText), { density: 72 * Math.max(1, size / 64) })
    .resize(size, size)
    .png()
    .toFile(out);

for (const s of [64, 128, 256, 512, 1024]) {
  await png(files["public/brand/mark.svg"], s, `public/brand/mark-${s}.png`);
  await png(files["public/brand/mark-on-light.svg"], s, `public/brand/mark-on-light-${s}.png`);
}
for (const s of [180, 512, 1024]) await png(files["public/brand/app-icon.svg"], s, `public/brand/app-icon-${s}.png`);

// Wordmarks/lockups as 2x and 4x PNGs for slides, docs and social.
for (const name of ["wordmark", "wordmark-on-light", "lockup", "lockup-on-light"]) {
  const text = files[`public/brand/${name}.svg`];
  const [, w, h] = text.match(/width="(\d+)" height="(\d+)"/).map(Number);
  for (const k of [2, 4]) {
    await sharp(Buffer.from(text), { density: 72 * k }).resize(w * k, h * k).png().toFile(`public/brand/${name}@${k}x.png`);
  }
}

// Favicons and platform icons.
const smallTile = tile({ draw: markSmall, radius: 12, scale: 0.86 });
await png(smallTile, 96, "public/favicon/favicon-96x96.png");
// iOS applies its own rounding: give it a full-bleed square.
await png(tile({ scale: 0.72 }), 180, "public/favicon/apple-touch-icon.png");
// Android maskable icons keep the mark inside the central 80% safe zone.
await png(tile({ scale: 0.6 }), 192, "public/favicon/web-app-manifest-192x192.png");
await png(tile({ scale: 0.6 }), 512, "public/favicon/web-app-manifest-512x512.png");

// favicon.ico with 16/32/48 PNG entries (ICO allows embedded PNGs).
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((s) => sharp(Buffer.from(smallTile), { density: 144 }).resize(s, s).png().toBuffer())
);
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((buf, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(icoSizes[i], e);
  header.writeUInt8(icoSizes[i], e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(buf.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += buf.length;
});
const ico = Buffer.concat([header, ...pngs]);
writeFileSync("public/favicon/favicon.ico", ico);
writeFileSync("src/app/favicon.ico", ico);

console.log("brand kit written to public/brand and public/favicon");
