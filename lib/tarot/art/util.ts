// Pure, deterministic helpers for building SVG strings. No DOM, no randomness
// other than the seeded PRNG below.

export const C = {
  night: "#0b1026",
  night2: "#141a3a",
  black: "#05060d",
  gold: "#c9a45c",
  hi: "#e8d29a",
  shadow: "#8a6d34",
  violet: "#6b5ca5",
  violet2: "#3a2f6b",
} as const;

export const SERIF = "Georgia, 'Times New Roman', serif";

export type Rng = () => number;
export type Pt = [number, number];

/** FNV-1a 32-bit string hash. */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 seeded PRNG returning floats in [0, 1). */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toRoman(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "0";
  const table: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let rest = Math.floor(n);
  let out = "";
  for (const [v, s] of table) {
    while (rest >= v) {
      out += s;
      rest -= v;
    }
  }
  return out;
}

/** Format a number compactly (1 decimal). */
export function f(v: number): string {
  const r = Math.round(v * 10) / 10;
  return Object.is(r, -0) || r === 0 ? "0" : String(r);
}

export function polar(cx: number, cy: number, r: number, deg: number): Pt {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export function ptsStr(pts: Pt[]): string {
  return pts.map(([x, y]) => `${f(x)},${f(y)}`).join(" ");
}

// ---------------------------------------------------------------------------
// Attribute helpers

export function stroke(color: string, width: number, extra = ""): string {
  return `fill="none" stroke="${color}" stroke-width="${f(width)}"${extra ? " " + extra : ""}`;
}

export function filled(fill: string, color: string, width: number, extra = ""): string {
  return `fill="${fill}" stroke="${color}" stroke-width="${f(width)}"${extra ? " " + extra : ""}`;
}

export function solid(fill: string, extra = ""): string {
  return `fill="${fill}"${extra ? " " + extra : ""}`;
}

// ---------------------------------------------------------------------------
// Element helpers

export function path(d: string, attrs: string): string {
  return `<path d="${d}" ${attrs}/>`;
}

export function circle(cx: number, cy: number, r: number, attrs: string): string {
  return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${attrs}/>`;
}

export function ellipse(cx: number, cy: number, rx: number, ry: number, attrs: string): string {
  return `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" ${attrs}/>`;
}

export function rect(x: number, y: number, w: number, h: number, attrs: string, rx = 0): string {
  return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}"${rx ? ` rx="${f(rx)}"` : ""} ${attrs}/>`;
}

export function line(x1: number, y1: number, x2: number, y2: number, attrs: string): string {
  return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" ${attrs}/>`;
}

export function poly(pts: Pt[], attrs: string): string {
  return `<polygon points="${ptsStr(pts)}" ${attrs}/>`;
}

export function g(transform: string, content: string, attrs = ""): string {
  return `<g${transform ? ` transform="${transform}"` : ""}${attrs ? " " + attrs : ""}>${content}</g>`;
}

/** Horizontal mirror of content about x = 300 (card centre). */
export function mirrorX(content: string): string {
  return g("matrix(-1 0 0 1 600 0)", content);
}

// ---------------------------------------------------------------------------
// Path-data builders

export function starPts(cx: number, cy: number, points: number, ro: number, ri: number, rot = -90): Pt[] {
  const out: Pt[] = [];
  const step = 180 / points;
  for (let i = 0; i < points * 2; i++) {
    out.push(polar(cx, cy, i % 2 === 0 ? ro : ri, rot + i * step));
  }
  return out;
}

export function star(cx: number, cy: number, points: number, ro: number, ri: number, attrs: string, rot = -90): string {
  return poly(starPts(cx, cy, points, ro, ri, rot), attrs);
}

export function star8(cx: number, cy: number, r: number, attrs: string): string {
  return star(cx, cy, 8, r, r * 0.42, attrs);
}

export function sparkle(cx: number, cy: number, r: number, attrs: string): string {
  return star(cx, cy, 4, r, r * 0.26, attrs);
}

export function raysD(cx: number, cy: number, r1: number, r2: number, count: number, offset = 0): string {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = offset + (i * 360) / count;
    const [x1, y1] = polar(cx, cy, r1, a);
    const [x2, y2] = polar(cx, cy, r2, a);
    d += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
  }
  return d;
}

/** Rays limited to an angular range [a1, a2] (degrees, inclusive). */
export function raysRangeD(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number, count: number): string {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = count === 1 ? a1 : a1 + ((a2 - a1) * i) / (count - 1);
    const [x1, y1] = polar(cx, cy, r1, a);
    const [x2, y2] = polar(cx, cy, r2, a);
    d += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
  }
  return d;
}

export function circleD(cx: number, cy: number, r: number): string {
  return `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0`;
}

export function arcD(cx: number, cy: number, r: number, a1: number, a2: number): string {
  const [sx, sy] = polar(cx, cy, r, a1);
  const [ex, ey] = polar(cx, cy, r, a2);
  const large = ((a2 - a1) % 360 + 360) % 360 > 180 ? 1 : 0;
  return `M${f(sx)} ${f(sy)}A${f(r)} ${f(r)} 0 ${large} 1 ${f(ex)} ${f(ey)}`;
}

/** Figure-eight (lemniscate) centred at cx,cy, half-width a, half-height b. */
export function lemniscateD(cx: number, cy: number, a: number, b: number): string {
  return (
    `M${f(cx)} ${f(cy)}C${f(cx + a * 0.5)} ${f(cy - b)} ${f(cx + a)} ${f(cy - b)} ${f(cx + a)} ${f(cy)}` +
    `C${f(cx + a)} ${f(cy + b)} ${f(cx + a * 0.5)} ${f(cy + b)} ${f(cx)} ${f(cy)}` +
    `C${f(cx - a * 0.5)} ${f(cy - b)} ${f(cx - a)} ${f(cy - b)} ${f(cx - a)} ${f(cy)}` +
    `C${f(cx - a)} ${f(cy + b)} ${f(cx - a * 0.5)} ${f(cy + b)} ${f(cx)} ${f(cy)}Z`
  );
}

/**
 * Crescent: disc of radius r at (cx,cy) with an equal disc offset by `d`
 * towards `dirDeg` removed. The hollow faces dirDeg.
 */
export function crescentD(cx: number, cy: number, r: number, d: number, dirDeg: number): string {
  const ux = Math.cos((dirDeg * Math.PI) / 180);
  const uy = Math.sin((dirDeg * Math.PI) / 180);
  const vx = -uy;
  const vy = ux;
  const mx = cx + (ux * d) / 2;
  const my = cy + (uy * d) / 2;
  const h = Math.sqrt(Math.max(0, r * r - (d / 2) * (d / 2)));
  const p1: Pt = [mx + vx * h, my + vy * h];
  const p2: Pt = [mx - vx * h, my - vy * h];
  return `M${f(p1[0])} ${f(p1[1])}A${f(r)} ${f(r)} 0 1 1 ${f(p2[0])} ${f(p2[1])}A${f(r)} ${f(r)} 0 0 0 ${f(p1[0])} ${f(p1[1])}Z`;
}

/** Horizontal wave line using smooth quadratic segments. */
export function waveD(x1: number, x2: number, y: number, amp: number, wl: number): string {
  let d = `M${f(x1)} ${f(y)}Q${f(x1 + wl / 4)} ${f(y - amp)} ${f(x1 + wl / 2)} ${f(y)}`;
  for (let x = x1 + wl; x <= x2 + 0.01; x += wl / 2) d += `T${f(x)} ${f(y)}`;
  return d;
}

/** Almond leaf from base (x,y) pointing along angleDeg. */
export function leafD(x: number, y: number, angleDeg: number, len: number, wid: number): string {
  const a = (angleDeg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const vx = -uy;
  const vy = ux;
  const tx = x + ux * len;
  const ty = y + uy * len;
  const mx = x + ux * len * 0.5;
  const my = y + uy * len * 0.5;
  return `M${f(x)} ${f(y)}Q${f(mx + vx * wid)} ${f(my + vy * wid)} ${f(tx)} ${f(ty)}Q${f(mx - vx * wid)} ${f(my - vy * wid)} ${f(x)} ${f(y)}Z`;
}

/** Five-pointed star outline (unicursal) — rotDeg -90 points up, 90 points down. */
export function pentagramD(cx: number, cy: number, r: number, rotDeg = -90): string {
  const v: Pt[] = [];
  for (let i = 0; i < 5; i++) v.push(polar(cx, cy, r, rotDeg + i * 72));
  const order = [0, 2, 4, 1, 3];
  return order.map((k, i) => `${i === 0 ? "M" : "L"}${f(v[k][0])} ${f(v[k][1])}`).join("") + "Z";
}

/** Archimedean spiral polyline from r0 to r1 over `turns` turns. dir 1 = clockwise. */
export function spiralD(cx: number, cy: number, r0: number, r1: number, turns: number, startDeg: number, dir: 1 | -1 = 1): string {
  const steps = Math.max(12, Math.round(turns * 28));
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const [x, y] = polar(cx, cy, r0 + (r1 - r0) * t, startDeg + dir * t * turns * 360);
    d += `${i === 0 ? "M" : "L"}${f(x)} ${f(y)}`;
  }
  return d;
}

/** Point on a quadratic Bezier and its tangent angle (deg). */
export function quadAt(p0: Pt, c: Pt, p1: Pt, t: number): { p: Pt; deg: number } {
  const mt = 1 - t;
  const x = mt * mt * p0[0] + 2 * mt * t * c[0] + t * t * p1[0];
  const y = mt * mt * p0[1] + 2 * mt * t * c[1] + t * t * p1[1];
  const dx = 2 * mt * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]);
  const dy = 2 * mt * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
  return { p: [x, y], deg: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/** Zig-zag crown band from x1 to x2 at baseline y with `teeth` points of height h. */
export function zigzagD(x1: number, x2: number, y: number, teeth: number, h: number): string {
  const w = (x2 - x1) / teeth;
  let d = `M${f(x1)} ${f(y)}`;
  for (let i = 0; i < teeth; i++) {
    d += `L${f(x1 + w * (i + 0.5))} ${f(y - h)}L${f(x1 + w * (i + 1))} ${f(y)}`;
  }
  return d;
}

// ---------------------------------------------------------------------------
// Render context (namespaced ids, defs collection, seeded randomness)

export interface Ctx {
  prefix: string;
  rng: Rng;
  defs: string[];
  uid(tag: string): string;
  ref(name: string): string;
}

export function makeCtx(prefix: string, seed: number): Ctx {
  let n = 0;
  const ctx: Ctx = {
    prefix,
    rng: mulberry32(seed),
    defs: [],
    uid(tag: string): string {
      n += 1;
      return `${prefix}-${tag}${n}`;
    },
    ref(name: string): string {
      return `url(#${prefix}-${name})`;
    },
  };
  return ctx;
}

/** Parallel engraving lines clipped to an arbitrary path. */
export function hatchIn(
  ctx: Ctx,
  clipD: string,
  x: number,
  y: number,
  w: number,
  h: number,
  gap: number,
  angle: number,
  color: string,
  width: number,
  opacity = 1,
): string {
  const id = ctx.uid("h");
  ctx.defs.push(`<clipPath id="${id}"><path d="${clipD}"/></clipPath>`);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const L = Math.hypot(w, h) / 2;
  const k = Math.ceil(L / gap);
  let d = "";
  for (let i = -k; i <= k; i++) {
    d += `M${f(cx - L)} ${f(cy + i * gap)}H${f(cx + L)}`;
  }
  const op = opacity < 1 ? ` opacity="${f(opacity)}"` : "";
  return `<g clip-path="url(#${id})"><path d="${d}" transform="rotate(${f(angle)} ${f(cx)} ${f(cy)})" ${stroke(color, width)}${op}/></g>`;
}
