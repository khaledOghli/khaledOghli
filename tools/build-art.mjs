// Generates the animated pixel-art SVG assets for Khaled Oghli's GitHub profile.
//
// Everything is drawn from a hand-authored 5x7 bitmap font plus rect primitives.
// No web fonts: GitHub proxies README images through camo, which will not load
// remote font files, so real text would fall back to whatever the renderer has.
//
//   node build-art.mjs
//
// Palette comes straight from the portfolio's tokens.css.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "github-profile/assets");
mkdirSync(OUT, { recursive: true });

/* ─────────────────────────────  BRAND  ───────────────────────────── */

const C = {
  bg: "#05070a",
  panel: "#080d12",
  panelAlt: "#0b1218",
  grid: "#0e1a20",
  line: "#12242c",
  primary: "#0afcdb",
  primaryDim: "#0a8f80",
  primaryDark: "#063d38",
  secondary: "#f3b94c",
  secondaryDim: "#8a6a2c",
  danger: "#ff2d55",
  dangerDim: "#8c1a2f",
  text: "#e8f6f4",
  muted: "#7d989e",
  mutedDark: "#3d545a",
};

/* ─────────────────────────  5x7 BITMAP FONT  ─────────────────────── */

const F = {
  A: "01110,10001,10001,11111,10001,10001,10001",
  B: "11110,10001,10001,11110,10001,10001,11110",
  C: "01111,10000,10000,10000,10000,10000,01111",
  D: "11110,10001,10001,10001,10001,10001,11110",
  E: "11111,10000,10000,11110,10000,10000,11111",
  F: "11111,10000,10000,11110,10000,10000,10000",
  G: "01110,10001,10000,10111,10001,10001,01111",
  H: "10001,10001,10001,11111,10001,10001,10001",
  I: "11111,00100,00100,00100,00100,00100,11111",
  J: "00111,00010,00010,00010,00010,10010,01100",
  K: "10001,10010,10100,11000,10100,10010,10001",
  L: "10000,10000,10000,10000,10000,10000,11111",
  M: "10001,11011,10101,10101,10001,10001,10001",
  N: "10001,11001,10101,10011,10001,10001,10001",
  O: "01110,10001,10001,10001,10001,10001,01110",
  P: "11110,10001,10001,11110,10000,10000,10000",
  Q: "01110,10001,10001,10001,10101,10010,01101",
  R: "11110,10001,10001,11110,10100,10010,10001",
  S: "01111,10000,10000,01110,00001,00001,11110",
  T: "11111,00100,00100,00100,00100,00100,00100",
  U: "10001,10001,10001,10001,10001,10001,01110",
  V: "10001,10001,10001,10001,10001,01010,00100",
  W: "10001,10001,10001,10101,10101,11011,10001",
  X: "10001,10001,01010,00100,01010,10001,10001",
  Y: "10001,10001,01010,00100,00100,00100,00100",
  Z: "11111,00001,00010,00100,01000,10000,11111",
  0: "01110,10001,10011,10101,11001,10001,01110",
  1: "00100,01100,00100,00100,00100,00100,01110",
  2: "01110,10001,00001,00010,00100,01000,11111",
  3: "11111,00010,00100,00010,00001,10001,01110",
  4: "00010,00110,01010,10010,11111,00010,00010",
  5: "11111,10000,11110,00001,00001,10001,01110",
  6: "00110,01000,10000,11110,10001,10001,01110",
  7: "11111,00001,00010,00100,01000,01000,01000",
  8: "01110,10001,10001,01110,10001,10001,01110",
  9: "01110,10001,10001,01111,00001,00010,01100",
  " ": "00000,00000,00000,00000,00000,00000,00000",
  ".": "00000,00000,00000,00000,00000,00000,00100",
  ",": "00000,00000,00000,00000,00000,00100,01000",
  "-": "00000,00000,00000,01110,00000,00000,00000",
  _: "00000,00000,00000,00000,00000,00000,11111",
  "+": "00000,00100,00100,11111,00100,00100,00000",
  "=": "00000,00000,11111,00000,11111,00000,00000",
  "/": "00001,00010,00010,00100,01000,01000,10000",
  "\\": "10000,01000,01000,00100,00010,00010,00001",
  ":": "00000,00100,00000,00000,00000,00100,00000",
  "!": "00100,00100,00100,00100,00100,00000,00100",
  "?": "01110,10001,00001,00010,00100,00000,00100",
  "'": "00100,00100,00000,00000,00000,00000,00000",
  "(": "00010,00100,01000,01000,01000,00100,00010",
  ")": "01000,00100,00010,00010,00010,00100,01000",
  "[": "01110,01000,01000,01000,01000,01000,01110",
  "]": "01110,00010,00010,00010,00010,00010,01110",
  "<": "00001,00010,00100,01000,00100,00010,00001",
  ">": "10000,01000,00100,00010,00100,01000,10000",
  "*": "00000,10101,01110,11111,01110,10101,00000",
  "#": "01010,11111,01010,01010,11111,01010,00000",
  "%": "10001,00010,00100,00100,01000,10001,00000",
  "&": "01100,10010,10100,01000,10101,10010,01101",
  "@": "01110,10001,10111,10101,10110,10000,01110",
  "|": "00100,00100,00100,00100,00100,00100,00100",
  "•": "00000,00000,01110,01110,01110,00000,00000",
  "▸": "01000,01100,01110,01111,01110,01100,01000",
  "♥": "01010,11111,11111,11111,01110,00100,00000",
  "★": "00100,01110,11111,01110,01010,10001,00000",
};

const glyph = (ch) => (F[ch.toUpperCase()] ?? F["?"]).split(",");

/** One glyph as rects, with horizontal runs merged so the file stays small. */
function glyphRects(ch, ox, oy, px) {
  const rows = glyph(ch);
  const out = [];
  rows.forEach((row, ry) => {
    let run = 0;
    for (let cx = 0; cx <= row.length; cx++) {
      if (row[cx] === "1") {
        run++;
      } else if (run) {
        out.push(
          `<rect x="${ox + (cx - run) * px}" y="${oy + ry * px}" width="${run * px}" height="${px}"/>`,
        );
        run = 0;
      }
    }
  });
  return out.join("");
}

const textWidth = (str, px, track = 1) =>
  Math.max(0, str.length * (5 + track) * px - track * px);

/** Cap height of a line: the font is 7 rows tall. */
const lineH = (px) => 7 * px;

const centeredX = (str, px, w, track = 1) =>
  Math.round((w - textWidth(str, px, track)) / 2);

/**
 * Pixel text.
 * @param {string} str
 * @param {{x:number,y:number,px:number,fill:string,track?:number,
 *          opacity?:number,align?:"left"|"right"|"center",boxW?:number,
 *          attrs?:string,inner?:string}} o
 */
function text(str, o) {
  const {
    y,
    px,
    fill,
    track = 1,
    opacity,
    attrs = "",
    inner = "",
    align = "left",
    boxW = 0,
  } = o;
  let { x } = o;
  if (align === "right") x -= textWidth(str, px, track);
  else if (align === "center") x += centeredX(str, px, boxW, track);

  const step = (5 + track) * px;
  const body = [...str]
    .map((ch, i) => glyphRects(ch, x + i * step, y, px))
    .join("");
  const op = opacity === undefined ? "" : ` opacity="${opacity}"`;
  return `<g fill="${fill}"${op}${attrs ? ` ${attrs}` : ""}>${body}${inner}</g>`;
}

/**
 * Largest (px, track) pair from the candidates that still fits maxW.
 * Falls back to the smallest pair rather than silently overflowing.
 */
function fit(str, maxW, pxCandidates = [4, 3, 2], trackCandidates = [2, 1]) {
  for (const px of pxCandidates) {
    for (const track of trackCandidates) {
      if (textWidth(str, px, track) <= maxW) return { px, track };
    }
  }
  const px = pxCandidates[pxCandidates.length - 1];
  const track = trackCandidates[trackCandidates.length - 1];
  if (textWidth(str, px, track) > maxW) {
    console.warn(
      `    ! overflow: "${str}" needs ${textWidth(str, px, track)}px, has ${maxW}px`,
    );
  }
  return { px, track };
}

/** Greedy word wrap to a pixel width. */
function wrap(str, maxW, px, track = 2) {
  const words = str.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (textWidth(next, px, track) <= maxW) {
      cur = next;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Header block: big title + small subtitle, correctly spaced. */
function header(title, sub, o) {
  const { x, y, px = 5, color = C.primary, subColor = C.muted, subPx = 2 } = o;
  const out = [text(title, { x, y, px, fill: color })];
  if (sub) {
    out.push(
      text(sub, { x, y: y + lineH(px) + 12, px: subPx, track: 2, fill: subColor }),
    );
  }
  return out.join("");
}
const headerH = (px = 5, subPx = 2) => lineH(px) + 12 + lineH(subPx);

/* ────────────────────────────  PRIMITIVES  ───────────────────────── */

/** Box with clipped corners — the corner-notch motif from the site. */
function notchBox(x, y, w, h, o = {}) {
  const { n = 10, fill = C.panel, stroke = C.line, sw = 2 } = o;
  const d = [
    `M${x + n} ${y}`,
    `H${x + w - n}`,
    `L${x + w} ${y + n}`,
    `V${y + h - n}`,
    `L${x + w - n} ${y + h}`,
    `H${x + n}`,
    `L${x} ${y + h - n}`,
    `V${y + n}`,
    "Z",
  ].join(" ");
  return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

/** Four L-shaped corner ticks, arcade-HUD style. */
function corners(x, y, w, h, color, len = 12, t = 3) {
  const r = (a, b, c, d) =>
    `<rect x="${a}" y="${b}" width="${c}" height="${d}"/>`;
  return `<g fill="${color}">${r(x, y, len, t)}${r(x, y, t, len)}${r(x + w - len, y, len, t)}${r(x + w - t, y, t, len)}${r(x, y + h - t, len, t)}${r(x, y + h - len, t, len)}${r(x + w - len, y + h - t, len, t)}${r(x + w - t, y + h - len, t, len)}</g>`;
}

/** Deterministic RNG so regenerating never reshuffles the art. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const scanPattern = (id, opacity = 0.5) =>
  `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#000" opacity="${opacity}"/></pattern>`;

const svgOpen = (w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" shape-rendering="crispEdges">`;

function save(name, content) {
  writeFileSync(resolve(OUT, name), content);
  const kb = (Buffer.byteLength(content) / 1024).toFixed(0);
  console.log(`  ✓ ${name} (${kb}kb)`);
}

const W = 1000;

/* ═══════════════════════════════  HERO  ═══════════════════════════ */

function hero() {
  const H = 340;
  const r = rng(7);
  const p = [];

  p.push(`<defs>
    ${scanPattern("scan", 0.55)}
    <radialGradient id="vig" cx="50%" cy="46%" r="74%">
      <stop offset="52%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.8"/>
    </radialGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#04070a"/>
      <stop offset="58%" stop-color="#06141c"/>
      <stop offset="100%" stop-color="#05222a"/>
    </linearGradient>
    <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.primary}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${C.primary}" stop-opacity="0.07"/>
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M20 0H0V20" fill="none" stroke="${C.grid}" stroke-width="1"/>
    </pattern>
  </defs>`);

  p.push(`<rect width="${W}" height="${H}" fill="url(#sky)"/>`);
  p.push(`<rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.5"/>`);

  // ── starfield
  for (let i = 0; i < 100; i++) {
    const sx = Math.floor(r() * W);
    const sy = Math.floor(r() * 200);
    const s = r() > 0.87 ? 3 : 2;
    const col = r() > 0.72 ? C.primary : C.text;
    p.push(
      `<rect x="${sx}" y="${sy}" width="${s}" height="${s}" fill="${col}" opacity="0.3"><animate attributeName="opacity" values="0.12;0.9;0.12" dur="${(1.6 + r() * 3.6).toFixed(2)}s" begin="${(-r() * 5).toFixed(2)}s" repeatCount="indefinite"/></rect>`,
    );
  }

  // ── shooting star
  p.push(`<g><g transform="translate(-160,0)">
    <rect x="0" y="30" width="30" height="2" fill="${C.primary}" opacity="0.45"/>
    <rect x="30" y="29" width="5" height="4" fill="${C.text}"/>
    <animateTransform attributeName="transform" type="translate" values="-160,0;1180,140" dur="7s" begin="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.82;1" dur="7s" begin="2s" repeatCount="indefinite"/>
  </g></g>`);

  // ── skyline
  const base = 300;
  const back = [];
  const front = [];
  const windows = [];
  const tower = (bucket, x, w, top, tone, density) => {
    bucket.push(
      `<rect x="${x}" y="${top}" width="${w}" height="${base - top}" fill="${tone}"/>`,
    );
    for (let wy = top + 9; wy < base - 9; wy += 13) {
      for (let wx = x + 6; wx < x + w - 7; wx += 12) {
        if (r() > density) continue;
        const lit = r() > 0.7 ? C.secondary : C.primary;
        windows.push(
          `<rect x="${wx}" y="${wy}" width="4" height="5" fill="${lit}" opacity="0.75"><animate attributeName="opacity" values="0.75;0.1;0.75" dur="${(2 + r() * 7).toFixed(1)}s" begin="${(-r() * 7).toFixed(1)}s" repeatCount="indefinite"/></rect>`,
        );
      }
    }
  };

  // back row (dim, tall-ish)
  let x = -20;
  while (x < W + 20) {
    const w = 34 + Math.floor(r() * 52);
    tower(back, x, w, base - (44 + Math.floor(r() * 62)), "#0a222b", 0.8);
    x += w + 8 + Math.floor(r() * 16);
  }
  // front row (brighter, shorter)
  x = -30;
  while (x < W + 20) {
    const w = 26 + Math.floor(r() * 40);
    tower(front, x, w, base - (24 + Math.floor(r() * 44)), "#0e3743", 0.7);
    x += w + 6 + Math.floor(r() * 12);
  }

  // Burj-style stepped spire
  const bx = 862;
  [
    [bx - 20, 96, 22],
    [bx - 4, 132, 18],
    [bx + 10, 168, 14],
    [bx + 20, 132, 18],
    [bx + 34, 96, 22],
  ].forEach(([sx, sh, sw]) => {
    front.push(
      `<rect x="${sx}" y="${base - sh}" width="${sw}" height="${sh}" fill="#12525f"/>`,
    );
  });
  front.push(
    `<rect x="${bx + 14}" y="${base - 206}" width="6" height="40" fill="#1a6a78"/>`,
  );
  for (let wy = base - 156; wy < base - 20; wy += 14) {
    windows.push(
      `<rect x="${bx + 15}" y="${wy}" width="4" height="5" fill="${C.primary}" opacity="0.7"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="${(2 + r() * 5).toFixed(1)}s" begin="${(-r() * 5).toFixed(1)}s" repeatCount="indefinite"/></rect>`,
    );
  }
  windows.push(
    `<rect x="${bx + 13}" y="${base - 214}" width="8" height="8" fill="${C.danger}"><animate attributeName="opacity" values="1;0.05;1" dur="1.5s" repeatCount="indefinite"/></rect>`,
  );

  p.push(back.join(""), front.join(""), windows.join(""));
  p.push(
    `<rect x="0" y="${base - 130}" width="${W}" height="130" fill="url(#haze)"/>`,
  );
  p.push(`<rect x="0" y="${base}" width="${W}" height="${H - base}" fill="#03080b"/>`);
  p.push(`<rect x="0" y="${base}" width="${W}" height="2" fill="${C.primaryDark}"/>`);

  // ── title block, on a legibility scrim
  const title = "KHALED OGHLI";
  const tpx = 9;
  const tx = centeredX(title, tpx, W);
  const ty = 96;
  p.push(`<defs><linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#03070a" stop-opacity="0"/>
    <stop offset="22%" stop-color="#03070a" stop-opacity="0.82"/>
    <stop offset="78%" stop-color="#03070a" stop-opacity="0.82"/>
    <stop offset="100%" stop-color="#03070a" stop-opacity="0"/>
  </linearGradient></defs>`);
  p.push(
    `<rect x="0" y="${ty - 46}" width="${W}" height="${lineH(tpx) + 118}" fill="url(#scrim)"/>`,
  );
  p.push(text(title, { x: tx + 6, y: ty + 6, px: tpx, fill: "#000" }));
  p.push(text(title, { x: tx + 4, y: ty + 4, px: tpx, fill: C.secondary, opacity: 0.85 }));
  p.push(`<g opacity="0.7">${text(title, { x: tx, y: ty, px: tpx, fill: C.danger })}
    <animateTransform attributeName="transform" type="translate" values="0,0;0,0;-7,2;5,-2;0,0;0,0;0,0;0,0" keyTimes="0;0.62;0.66;0.7;0.74;0.8;0.9;1" dur="5.5s" repeatCount="indefinite"/></g>`);
  p.push(`<g>${text(title, { x: tx, y: ty, px: tpx, fill: C.primary })}
    <animateTransform attributeName="transform" type="translate" values="0,0;0,0;6,-1;-4,2;0,0;0,0;0,0;0,0" keyTimes="0;0.62;0.66;0.7;0.74;0.8;0.9;1" dur="5.5s" repeatCount="indefinite"/></g>`);
  p.push(`<g opacity="0"><rect x="${tx - 12}" y="${ty + 22}" width="${textWidth(title, tpx) + 24}" height="11" fill="${C.primary}" opacity="0.3"/>
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.63;0.66;0.69;1" dur="5.5s" repeatCount="indefinite"/></g>`);

  const sub = "CREATIVE FRONTEND DEVELOPER";
  p.push(
    text(sub, {
      x: 0,
      align: "center",
      boxW: W,
      y: ty + lineH(tpx) + 18,
      px: 3,
      track: 2,
      fill: C.text,
      opacity: 0.9,
    }),
  );
  const sub2 = "DAMASCUS -> DUBAI // 8 YEARS IN PLAY";
  p.push(
    text(sub2, {
      x: 0,
      align: "center",
      boxW: W,
      y: ty + lineH(tpx) + 44,
      px: 2,
      track: 2,
      fill: C.primaryDim,
    }),
  );

  // ── HUD
  p.push(text("PLAYER 01", { x: 36, y: 30, px: 3, fill: C.primary }));
  [0, 1, 2].forEach((i) => {
    p.push(
      `<g transform="translate(${36 + i * 26},56)" fill="${C.danger}">${glyphRects("♥", 0, 0, 3)}<animate attributeName="opacity" values="1;0.5;1" dur="${(1.2 + i * 0.3).toFixed(1)}s" repeatCount="indefinite"/></g>`,
    );
  });
  p.push(
    text("HI-SCORE 10 SHIPPED", { x: W - 36, align: "right", y: 30, px: 3, fill: C.secondary }),
  );
  p.push(
    text("LV.08 DUBAI MUNICIPALITY", {
      x: W - 36,
      align: "right",
      y: 56,
      px: 2,
      track: 2,
      fill: C.muted,
    }),
  );

  const ps = "> PRESS START";
  p.push(`<g>${text(ps, { x: 0, align: "center", boxW: W, y: 302, px: 4, fill: C.secondary })}
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.55;1" dur="1.6s" repeatCount="indefinite"/></g>`);

  p.push(corners(16, 14, W - 32, H - 28, C.primaryDim, 20, 3));
  p.push(`<rect width="${W}" height="${H}" fill="url(#scan)" opacity="0.32"/>`);
  p.push(`<rect width="${W}" height="${H}" fill="url(#vig)"/>`);
  p.push(
    `<rect x="0" y="-70" width="${W}" height="70" fill="${C.primary}" opacity="0.05"><animate attributeName="y" values="-70;${H}" dur="7s" repeatCount="indefinite"/></rect>`,
  );

  save(
    "hero.svg",
    `${svgOpen(W, H)}<title>Khaled Oghli — Creative Frontend Developer</title>${p.join("")}</svg>`,
  );
}

/* ═══════════════════════════  BOOT TERMINAL  ══════════════════════ */

function boot() {
  const lines = [
    ["> ", "WHOAMI", C.primary, C.secondary, 3],
    ["  ", "NAME......... KHALED OGHLI", C.mutedDark, C.text, 3],
    ["  ", "CLASS........ CREATIVE FRONTEND DEVELOPER", C.mutedDark, C.text, 3],
    ["  ", "GUILD........ DUBAI MUNICIPALITY / DUBAI HERE", C.mutedDark, C.text, 3],
    ["  ", "ORIGIN....... DAMASCUS, SY -> DUBAI, AE", C.mutedDark, C.text, 3],
    ["  ", "SPEC......... ARCHITECTURE . MOTION . 3D", C.mutedDark, C.text, 3],
    ["> ", "CREED", C.primary, C.secondary, 3],
    ["  ", "MAKE IT EASY.", C.mutedDark, C.primary, 3],
    ["  ", "MAKE IT MEANINGFUL.", C.mutedDark, C.primary, 3],
    ["  ", "MAKE IT MEMORABLE.", C.mutedDark, C.primary, 3],
  ];

  const top = 56;
  const step = 28;
  const H = top + lines.length * step + 52;
  const CYCLE = 14;
  const p = [];

  p.push(`<defs>${scanPattern("s2", 0.4)}</defs>`);
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
  p.push(notchBox(6, 6, W - 12, H - 12, { n: 14 }));
  p.push(`<path d="M20 6H${W - 20}L${W - 6} 20V40H6V20Z" fill="${C.panelAlt}"/>`);
  p.push(`<rect x="6" y="40" width="${W - 12}" height="2" fill="${C.line}"/>`);
  [C.danger, C.secondary, C.primary].forEach((col, i) => {
    p.push(`<rect x="${28 + i * 18}" y="17" width="10" height="10" fill="${col}"/>`);
  });
  p.push(
    text("KHALED.EXE -- SYSTEM ONLINE", { x: 96, y: 16, px: 2, track: 2, fill: C.muted }),
  );

  lines.forEach((ln, i) => {
    const [prefix, body, pc, bc, px] = ln;
    const y = top + i * step;
    const t1 = (i * 0.34 + 0.3) / CYCLE;
    const t2 = t1 + 0.004;
    p.push(`<g opacity="1">
      ${text(prefix, { x: 34, y, px, fill: pc })}
      ${text(body, { x: 34 + textWidth(prefix, px) + 8, y, px, fill: bc })}
      <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${t1.toFixed(4)};${t2.toFixed(4)};1" dur="${CYCLE}s" repeatCount="indefinite"/>
    </g>`);
  });

  const caretY = top + lines.length * step + 2;
  const caretT = (lines.length * 0.34 + 0.34) / CYCLE;
  p.push(`<g opacity="1">
    <rect x="34" y="${caretY}" width="16" height="20" fill="${C.primary}"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.55;1" dur="1s" repeatCount="indefinite"/></rect>
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${caretT.toFixed(4)};${(caretT + 0.004).toFixed(4)};1" dur="${CYCLE}s" repeatCount="indefinite"/>
  </g>`);

  p.push(corners(6, 6, W - 12, H - 12, C.primaryDark, 16, 3));
  p.push(`<rect width="${W}" height="${H}" fill="url(#s2)" opacity="0.26"/>`);
  save("boot.svg", `${svgOpen(W, H)}<title>whoami</title>${p.join("")}</svg>`);
}

/* ═════════════════════════════  HUD STATS  ════════════════════════ */

function stats() {
  const H = 156;
  const p = [];
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);

  const items = [
    ["08+", "YEARS", C.primary],
    ["10+", "SHIPPED", C.secondary],
    ["04+", "SECTORS", C.primary],
    ["02", "AWARDS", C.danger],
    ["24", "CERTS", C.secondary],
  ];

  const gap = 14;
  const bw = Math.floor((W - 32 - gap * (items.length - 1)) / items.length);
  items.forEach(([value, label, col], i) => {
    const x = 16 + i * (bw + gap);
    p.push(notchBox(x, 14, bw, H - 28, { n: 10 }));
    p.push(`<rect x="${x + 12}" y="16" width="${bw - 24}" height="3" fill="${col}" opacity="0.7"/>`);
    p.push(
      text(value, {
        x,
        align: "center",
        boxW: bw,
        y: 42,
        px: 6,
        fill: col,
        inner: `<animate attributeName="opacity" values="1;0.55;1" dur="${(2.4 + i * 0.4).toFixed(1)}s" repeatCount="indefinite"/>`,
      }),
    );
    p.push(
      text(label, { x, align: "center", boxW: bw, y: 94, px: 2, track: 2, fill: C.muted }),
    );
    const segs = 8;
    const sw = (bw - 32) / segs;
    for (let t = 0; t < segs; t++) {
      p.push(
        `<rect x="${(x + 16 + t * sw).toFixed(1)}" y="120" width="${(sw - 5).toFixed(1)}" height="5" fill="${col}" opacity="0.2"><animate attributeName="opacity" values="0.2;0.95;0.2" dur="2.4s" begin="${(t * 0.12 + i * 0.2).toFixed(2)}s" repeatCount="indefinite"/></rect>`,
      );
    }
  });

  save("stats.svg", `${svgOpen(W, H)}<title>Stats</title>${p.join("")}</svg>`);
}

/* ═════════════════════════════  SKILL BARS  ═══════════════════════ */

function skills() {
  const rows = [
    ["FRONTEND ARCHITECTURE", 87, C.primary, "VUE AND REACT AT PLATFORM SCALE"],
    ["INTERFACE DESIGN", 78, C.secondary, "HIERARCHY, TYPE, THE PASS BEFORE CODE"],
    ["INTERACTIVITY AND MOTION", 75, C.danger, "TIMING, FEEDBACK, AND HOW IT FEELS"],
    ["ACCESSIBILITY AND SEO", 73, C.primary, "USABLE BY EVERYONE, FINDABLE BY SEARCH"],
    ["DESIGN SYSTEMS", 73, C.secondary, "COMPONENTS THAT HOLD UP AT SCALE"],
    ["CREATIVE DEVELOPMENT", 58, C.danger, "3D, MOTION, AND IDEAS THAT NEED BOTH"],
  ];

  const padX = 32;
  const headTop = 26;
  const rowTop = headTop + headerH(5, 2) + 26;
  const rowH = 76;
  const H = rowTop + rows.length * rowH + 18;

  const valueW = 70;
  const barX = padX;
  const barW = W - padX * 2 - valueW;
  const SEG = 22;
  const segW = Math.floor((barW - (SEG - 1) * 5) / SEG);

  const p = [];
  p.push(`<defs>${scanPattern("s3", 0.35)}</defs>`);
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
  p.push(notchBox(6, 6, W - 12, H - 12, { n: 14 }));
  p.push(
    header("ABILITY MATRIX", "MEASURED HONESTLY, NOT GENEROUSLY", {
      x: padX,
      y: headTop,
    }),
  );

  rows.forEach(([label, value, col, note], i) => {
    const y = rowTop + i * rowH;
    p.push(text(label, { x: barX, y, px: 3, fill: C.text }));
    p.push(
      text(String(value), { x: W - padX, align: "right", y, px: 4, fill: col }),
    );
    p.push(text(note, { x: barX, y: y + 50, px: 2, track: 2, fill: C.mutedDark }));

    const filled = Math.round((value / 100) * SEG);
    const barY = y + lineH(3) + 8;
    for (let s = 0; s < SEG; s++) {
      const sx = barX + s * (segW + 5);
      if (s >= filled) {
        p.push(`<rect x="${sx}" y="${barY}" width="${segW}" height="13" fill="${C.line}"/>`);
        continue;
      }
      // Base opacity stays 1 so static renderers still show a filled bar;
      // the animation replays the fill sweep on every loop.
      p.push(
        `<rect x="${sx}" y="${barY}" width="${segW}" height="13" fill="${col}"><animate attributeName="opacity" values="0;0;1;1;0.75;1" keyTimes="0;${(0.02 + i * 0.02).toFixed(3)};${(0.05 + i * 0.02 + s * 0.008).toFixed(3)};0.9;0.94;1" dur="7s" repeatCount="indefinite"/></rect>`,
      );
    }
    // leading-edge highlight
    const lx = barX + (filled - 1) * (segW + 5);
    const lt = 0.05 + i * 0.02 + (filled - 1) * 0.008;
    p.push(
      `<rect x="${lx}" y="${barY}" width="${segW}" height="13" fill="${C.text}" opacity="0"><animate attributeName="opacity" values="0;0;0.85;0" keyTimes="0;${lt.toFixed(3)};${(lt + 0.02).toFixed(3)};${(lt + 0.06).toFixed(3)}" dur="7s" repeatCount="indefinite"/></rect>`,
    );
  });

  p.push(`<rect width="${W}" height="${H}" fill="url(#s3)" opacity="0.2"/>`);
  p.push(corners(6, 6, W - 12, H - 12, C.primaryDark, 16, 3));
  save("skills.svg", `${svgOpen(W, H)}<title>Ability matrix</title>${p.join("")}</svg>`);
}

/* ═══════════════════════════  STAGE SELECT  ═══════════════════════ */

function stages() {
  const list = [
    {
      no: "STAGE 01",
      name: "DUBAI HERE",
      kind: "GEOSPATIAL / DIGITAL TWIN",
      body: "A 2D AND 3D CITY PLATFORM. THE INTERFACE FOUNDATION FOR DUBAI'S DIGITAL TWIN.",
      tags: "DIGITAL TWIN . 3D GIS . GOV",
      status: "ACTIVE",
      col: C.primary,
      current: true,
    },
    {
      no: "STAGE 02",
      name: "BUILD IN DUBAI",
      kind: "GOVERNMENT PLATFORM",
      body: "60+ SCATTERED GOVERNMENT SERVICES MERGED INTO ONE PERMIT PORTAL.",
      tags: "VUE 3 . PINIA . UNOCSS",
      status: "CLEARED",
      col: C.secondary,
    },
    {
      no: "STAGE 03",
      name: "DUBAI WORX",
      kind: "OPERATIONS DASHBOARD",
      body: "DENSE GIS DATA TURNED INTO MAP-LED DAILY OPS FOR MUNICIPAL TEAMS.",
      tags: "NEXT.JS . GIS . DASHBOARD",
      status: "CLEARED",
      col: C.primary,
    },
    {
      no: "STAGE 04",
      name: "GRADIA",
      kind: "SIDE QUEST / FULL-STACK",
      body: "AN INTERVIEW AND GRADING WORKSPACE THAT TURNS FEEDBACK INTO DECISIONS.",
      tags: "REACT . TANSTACK . SUPABASE",
      status: "IN PROGRESS",
      col: C.danger,
    },
  ];

  const headTop = 18;
  const gridTop = headTop + headerH(5, 2) + 22;
  const cardW = 484;
  const cardH = 232;
  const H = gridTop + cardH * 2 + 18 + 10;
  const padIn = 24;
  const innerW = cardW - padIn * 2;

  const p = [];
  p.push(`<defs>${scanPattern("s4", 0.35)}</defs>`);
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
  p.push(
    header("STAGE SELECT", "FOUR PLATFORMS. ONE CITY. PICK A LEVEL.", {
      x: 22,
      y: headTop,
      color: C.secondary,
    }),
  );

  list.forEach((s, i) => {
    const cx = 12 + (i % 2) * (cardW + 16);
    const cy = gridTop + Math.floor(i / 2) * (cardH + 18);
    p.push(
      notchBox(cx, cy, cardW, cardH, {
        n: 12,
        stroke: s.current ? s.col : C.line,
      }),
    );
    if (s.current) {
      p.push(
        `<g>${notchBox(cx, cy, cardW, cardH, { n: 12, fill: "none", stroke: s.col })}<animate attributeName="opacity" values="1;0.2;1" dur="2.2s" repeatCount="indefinite"/></g>`,
      );
      p.push(
        `<g fill="${s.col}">${glyphRects("▸", cx - 4, cy + 46, 3)}<animateTransform attributeName="transform" type="translate" values="0,0;7,0;0,0" dur="1.1s" repeatCount="indefinite"/></g>`,
      );
    }
    p.push(
      `<rect x="${cx + 12}" y="${cy + 2}" width="${cardW - 24}" height="3" fill="${s.col}" opacity="0.7"/>`,
    );

    p.push(text(s.no, { x: cx + padIn, y: cy + 22, px: 2, track: 2, fill: C.muted }));
    const stW = textWidth(s.status, 2, 2) + 20;
    p.push(
      `<rect x="${cx + cardW - padIn - stW}" y="${cy + 15}" width="${stW}" height="20" fill="${s.col}" opacity="0.15"/>`,
    );
    p.push(
      text(s.status, {
        x: cx + cardW - padIn - stW + 10,
        y: cy + 22,
        px: 2,
        track: 2,
        fill: s.col,
      }),
    );

    const nameFit = fit(s.name, innerW, [5, 4, 3], [1]);
    p.push(text(s.name, { x: cx + padIn, y: cy + 44, ...nameFit, fill: C.text }));
    p.push(
      text(s.kind, { x: cx + padIn, y: cy + 44 + lineH(nameFit.px) + 12, px: 2, track: 2, fill: s.col }),
    );

    const bodyY = cy + 44 + lineH(nameFit.px) + 12 + lineH(2) + 14;
    wrap(s.body, innerW, 2, 2).forEach((ln, li) => {
      p.push(text(ln, { x: cx + padIn, y: bodyY + li * 18, px: 2, track: 2, fill: C.muted }));
    });

    p.push(
      `<rect x="${cx + padIn}" y="${cy + cardH - 44}" width="${innerW}" height="2" fill="${C.line}"/>`,
    );
    p.push(
      text(s.tags, { x: cx + padIn, y: cy + cardH - 32, px: 2, track: 2, fill: C.mutedDark }),
    );
  });

  p.push(`<rect width="${W}" height="${H}" fill="url(#s4)" opacity="0.18"/>`);
  save("stages.svg", `${svgOpen(W, H)}<title>Stage select</title>${p.join("")}</svg>`);
}

/* ══════════════════════════════  INVENTORY  ═══════════════════════ */

function inventory() {
  const P = C.primary;
  const S = C.secondary;
  const D = C.danger;
  const items = [
    ["VUE", P], ["NUXT", P], ["REACT", P], ["NEXT.JS", P],
    ["TYPESCRIPT", P], ["JAVASCRIPT", S], ["HTML", S], ["CSS", S],
    ["PINIA", S], ["ZUSTAND", S], ["R.QUERY", S], ["NODE.JS", S],
    ["TAILWIND", D], ["UNOCSS", D], ["SCSS", D], ["SHADCN", D],
    ["RADIX", D], ["STORYBOOK", D], ["VUETIFY", D], ["PRIMEVUE", D],
    ["THREE.JS", P], ["R3F", P], ["TRESJS", P], ["GLSL", P],
    ["GSAP", S], ["MOTION", S], ["FIGMA", S], ["PHOTOSHOP", S],
    ["SUPABASE", D], ["ASTRO", D], ["PWA", D], ["I18NEXT", D],
  ];

  const cols = 8;
  const gap = 8;
  const padX = 12;
  const cw = Math.floor((W - padX * 2 - gap * (cols - 1)) / cols);
  const ch = 58;
  const headTop = 14;
  const gridTop = headTop + headerH(4, 2) + 18;
  const rowsN = Math.ceil(items.length / cols);
  const H = gridTop + rowsN * (ch + gap) + 6;

  const p = [];
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
  p.push(
    header("INVENTORY", "EQUIPPED TOOLS -- 32 SLOTS", {
      x: padX + 2,
      y: headTop,
      px: 4,
    }),
  );

  items.forEach(([name, col], i) => {
    const x = padX + (i % cols) * (cw + gap);
    const y = gridTop + Math.floor(i / cols) * (ch + gap);
    p.push(
      `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="${C.panelAlt}" stroke="${C.line}" stroke-width="2"/>`,
    );
    p.push(
      `<rect x="${x}" y="${y}" width="${cw}" height="3" fill="${col}" opacity="0.5"><animate attributeName="opacity" values="0.18;0.95;0.18" dur="4s" begin="${(i * 0.09).toFixed(2)}s" repeatCount="indefinite"/></rect>`,
    );
    p.push(`<rect x="${x + 5}" y="${y + ch - 9}" width="4" height="4" fill="${col}" opacity="0.55"/>`);
    p.push(`<rect x="${x + cw - 9}" y="${y + ch - 9}" width="4" height="4" fill="${col}" opacity="0.55"/>`);
    const f = fit(name, cw - 14, [2], [2, 1, 0]);
    p.push(
      text(name, {
        x,
        align: "center",
        boxW: cw,
        y: y + Math.round((ch - lineH(f.px)) / 2),
        ...f,
        fill: C.text,
      }),
    );
  });

  save("inventory.svg", `${svgOpen(W, H)}<title>Inventory</title>${p.join("")}</svg>`);
}

/* ═══════════════════════════════  JOURNEY  ════════════════════════ */

function journey() {
  const H = 356;
  const p = [];
  const headTop = 16;
  const y0 = 200;

  const nodes = [
    { x: 120, y: y0 + 20, yr: "2017", place: "DAMASCUS", role: "WEB DESIGNER", note: "TARGUSME", col: C.muted, up: false },
    { x: 372, y: y0 - 6, yr: "2019", place: "DUBAI", role: "FRONTEND + UI/UX", note: "DATACELL", col: C.secondary, up: true },
    { x: 624, y: y0 + 12, yr: "2020", place: "BUILD IN DUBAI", role: "SENIOR FRONTEND", note: "DUBAI MUNICIPALITY", col: C.primary, up: false },
    { x: 876, y: y0 - 10, yr: "2024", place: "DUBAI HERE", role: "LEAD FRONTEND", note: "GIS / DIGITAL TWIN", col: C.danger, up: true },
  ];

  p.push(`<defs>${scanPattern("s5", 0.35)}</defs>`);
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
  p.push(
    header("WORLD MAP", "THE ROUTE THAT GOT ME HERE", {
      x: 22,
      y: headTop,
      color: C.secondary,
    }),
  );

  // Sample the route once, then reuse the exact points for both the dotted
  // trail and the walking sprite's motion path so the two never disagree.
  const path = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const steps = 24;
    for (let s = 0; s <= steps; s++) {
      if (i > 0 && s === 0) continue;
      const t = s / steps;
      path.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t - Math.sin(t * Math.PI) * 18,
      });
    }
  }
  path.forEach((pt, i) => {
    p.push(
      `<rect x="${(pt.x - 2.5).toFixed(1)}" y="${(pt.y - 2.5).toFixed(1)}" width="5" height="5" fill="${C.primaryDim}" opacity="0.25"><animate attributeName="opacity" values="0.12;1;0.12" dur="3.4s" begin="${(i * 0.04).toFixed(2)}s" repeatCount="indefinite"/></rect>`,
    );
  });

  nodes.forEach((n, i) => {
    p.push(
      `<rect x="${n.x - 10}" y="${n.y - 10}" width="20" height="20" fill="${C.bg}" stroke="${n.col}" stroke-width="3"/>`,
    );
    p.push(
      `<rect x="${n.x - 3}" y="${n.y - 3}" width="6" height="6" fill="${n.col}"><animate attributeName="opacity" values="1;0.15;1" dur="${(1.6 + i * 0.3).toFixed(1)}s" repeatCount="indefinite"/></rect>`,
    );

    const blockH = lineH(3) + 8 + lineH(2) + 8 + lineH(2) + 8 + lineH(2);
    const labelY = n.up ? n.y - 26 - blockH : n.y + 30;
    p.push(
      `<rect x="${n.x - 1}" y="${n.up ? n.y - 24 : n.y + 12}" width="2" height="14" fill="${n.col}" opacity="0.6"/>`,
    );

    const widest = Math.max(
      textWidth(n.place, 2, 2),
      textWidth(n.role, 2, 2),
      textWidth(n.note, 2, 2),
    );
    // Keep the label inside the canvas: flip to right-aligned near the edge.
    const alignRight = n.x + widest + 24 > W - 12;
    const lx = alignRight ? Math.min(n.x + 22, W - 12) : n.x - 22;
    const align = alignRight ? "right" : "left";

    p.push(text(n.yr, { x: lx, align, y: labelY, px: 3, fill: n.col }));
    p.push(text(n.place, { x: lx, align, y: labelY + lineH(3) + 8, px: 2, track: 2, fill: C.text }));
    p.push(text(n.role, { x: lx, align, y: labelY + lineH(3) + 8 + lineH(2) + 8, px: 2, track: 2, fill: C.muted }));
    p.push(text(n.note, { x: lx, align, y: labelY + lineH(3) + 8 + (lineH(2) + 8) * 2, px: 2, track: 2, fill: C.mutedDark }));
  });

  const motion = path
    .map((pt, i) => `${i ? "L" : "M"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(" ");
  p.push(`<g>
    <rect x="-6" y="-16" width="12" height="12" fill="${C.secondary}"/>
    <rect x="-9" y="-3" width="18" height="11" fill="${C.primary}"/>
    <rect x="-9" y="8" width="7" height="6" fill="${C.text}"/>
    <rect x="2" y="8" width="7" height="6" fill="${C.text}"/>
    <animateMotion dur="10s" repeatCount="indefinite" calcMode="linear" path="${motion}"/>
  </g>`);

  p.push(`<rect width="${W}" height="${H}" fill="url(#s5)" opacity="0.16"/>`);
  save("journey.svg", `${svgOpen(W, H)}<title>World map</title>${p.join("")}</svg>`);
}

/* ════════════════════════════  ACHIEVEMENTS  ══════════════════════ */

function achievements() {
  const cards = [
    {
      icon: "★",
      title: "VUE.JS CERTIFIED DEVELOPER",
      sub: "CERTIFICATES.DEV // AUG 2022",
      col: C.primary,
    },
    {
      icon: "♥",
      title: "CERTIFICATE OF APPRECIATION",
      sub: "DUBAI MUNICIPALITY // OCT 2023",
      col: C.secondary,
    },
  ];

  const headTop = 14;
  const cardTop = headTop + lineH(4) + 18;
  const cardH = 104;
  const H = cardTop + cardH + 16;
  const cw = 482;

  const p = [];
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
  p.push(text("ACHIEVEMENTS UNLOCKED", { x: 14, y: headTop, px: 4, fill: C.danger }));

  cards.forEach((c, i) => {
    const x = 12 + i * (cw + 12);
    const y = cardTop;
    p.push(notchBox(x, y, cw, cardH, { n: 10 }));
    p.push(
      `<g opacity="0.9">${notchBox(x, y, cw, cardH, { n: 10, fill: "none", stroke: c.col })}<animate attributeName="opacity" values="0.15;0.9;0.15" dur="${3 + i}s" repeatCount="indefinite"/></g>`,
    );
    p.push(`<rect x="${x + 18}" y="${y + 26}" width="52" height="52" fill="${c.col}" opacity="0.12"/>`);
    p.push(
      `<g fill="${c.col}" transform="translate(${x + 31},${y + 40})">${glyphRects(c.icon, 0, 0, 5)}<animate attributeName="opacity" values="1;0.4;1" dur="${(1.8 + i * 0.6).toFixed(1)}s" repeatCount="indefinite"/></g>`,
    );

    const tx = x + 86;
    const availW = cw - 86 - 20;
    const tf = fit(c.title, availW, [3, 2], [1]);
    p.push(text(c.title, { x: tx, y: y + 26, ...tf, fill: C.text }));
    const sf = fit(c.sub, availW, [2], [2, 1]);
    p.push(text(c.sub, { x: tx, y: y + 26 + lineH(tf.px) + 10, ...sf, fill: C.muted }));
    p.push(`<rect x="${tx}" y="${y + cardH - 26}" width="${availW}" height="6" fill="${C.line}"/>`);
    p.push(
      `<rect x="${tx}" y="${y + cardH - 26}" width="0" height="6" fill="${c.col}"><animate attributeName="width" values="0;${availW}" dur="2.4s" begin="${i * 0.5}s" fill="freeze"/></rect>`,
    );
  });

  save("achievements.svg", `${svgOpen(W, H)}<title>Achievements</title>${p.join("")}</svg>`);
}

/* ══════════════════════════════  DIVIDER  ═════════════════════════ */

function divider() {
  const H = 22;
  const p = [];
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
  for (let x = 0; x < W; x += 24) {
    p.push(`<rect x="${x}" y="9" width="7" height="4" fill="${C.primaryDark}"/>`);
  }
  [C.primary, C.secondary, C.danger].forEach((col, i) => {
    p.push(
      `<g><rect x="0" y="6" width="10" height="10" fill="${col}"/><animateTransform attributeName="transform" type="translate" values="-40,0;${W + 40},0" dur="6s" begin="${(i * 1.1).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.9;1" dur="6s" begin="${(i * 1.1).toFixed(1)}s" repeatCount="indefinite"/></g>`,
    );
  });
  save("divider.svg", `${svgOpen(W, H)}<title>divider</title>${p.join("")}</svg>`);
}

/* ══════════════════════════════  CONTINUE  ════════════════════════ */

function continueScreen() {
  const H = 300;
  const p = [];
  const r = rng(99);

  p.push(`<defs>${scanPattern("s6", 0.5)}
    <radialGradient id="vig2" cx="50%" cy="50%" r="72%">
      <stop offset="48%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.9"/>
    </radialGradient></defs>`);
  p.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);

  for (let i = 0; i < 60; i++) {
    p.push(
      `<rect x="${Math.floor(r() * W)}" y="${Math.floor(r() * H)}" width="2" height="2" fill="${C.primary}" opacity="0.2"><animate attributeName="opacity" values="0.05;0.7;0.05" dur="${(2 + r() * 3).toFixed(1)}s" begin="${(-r() * 4).toFixed(1)}s" repeatCount="indefinite"/></rect>`,
    );
  }

  const t1 = "CONTINUE?";
  p.push(text(t1, { x: 4, align: "center", boxW: W, y: 46, px: 8, fill: "#000" }));
  p.push(
    `<g>${text(t1, { x: 0, align: "center", boxW: W, y: 42, px: 8, fill: C.danger })}<animate attributeName="opacity" values="1;1;0.3;1" keyTimes="0;0.6;0.7;1" dur="2.4s" repeatCount="indefinite"/></g>`,
  );

  // 9 → 0 countdown, one digit per second
  for (let i = 0; i < 10; i++) {
    const n = String(9 - i);
    p.push(
      `<g opacity="${i === 0 ? 1 : 0}" fill="${C.secondary}" transform="translate(${centeredX(n, 10, W)},116)">${glyphRects(n, 0, 0, 10)}<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.005;0.095;0.1" dur="10s" begin="${i}s" repeatCount="indefinite"/></g>`,
    );
  }

  const t2 = "YES -- LET'S BUILD SOMETHING WORTH REMEMBERING";
  p.push(text(t2, { x: 0, align: "center", boxW: W, y: 216, px: 3, fill: C.text, opacity: 0.9 }));
  const t3 = "KHALEDOGHLI@OUTLOOK.COM";
  p.push(
    `<g>${text(t3, { x: 0, align: "center", boxW: W, y: 248, px: 3, track: 2, fill: C.primary })}<animate attributeName="opacity" values="1;0.45;1" dur="2s" repeatCount="indefinite"/></g>`,
  );

  p.push(corners(14, 14, W - 28, H - 28, C.dangerDim, 20, 3));
  p.push(`<rect width="${W}" height="${H}" fill="url(#s6)" opacity="0.28"/>`);
  p.push(`<rect width="${W}" height="${H}" fill="url(#vig2)"/>`);
  save("continue.svg", `${svgOpen(W, H)}<title>Continue?</title>${p.join("")}</svg>`);
}

/* ═══════════════════════════════  BUILD  ═════════════════════════ */

console.log("Generating pixel art →", OUT);
hero();
boot();
stats();
stages();
skills();
inventory();
journey();
achievements();
divider();
continueScreen();
console.log("Done.");
