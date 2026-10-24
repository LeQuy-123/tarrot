// Shared card chrome: gradients, double engraved border, corner ornaments,
// illustration panel, numeral plaque, title cartouche and celestial backdrop.

import type { Ctx } from "./util";
import {
  C,
  labelFont,
  circle,
  circleD,
  escapeXml,
  f,
  g,
  line,
  path,
  rect,
  solid,
  sparkle,
  star,
  stroke,
  filled,
} from "./util";

const G = C.gold;
const H = C.hi;
const SH = C.shadow;
const K = C.black;
const N = C.night;
const N2 = C.night2;

/** Pointed (gothic) arch used for the Major Arcana illustration panel. */
export const ARCH_POINTED = "M70 780L70 420A300 300 0 0 1 300 128.3A300 300 0 0 1 530 420L530 780Z";
/** Round arch used for the Minor Arcana illustration panel. */
export const ARCH_ROUND = "M70 780L70 360A230 230 0 0 1 530 360L530 780Z";

export function baseDefs(ctx: Ctx): void {
  const p = ctx.prefix;
  ctx.defs.push(
    `<radialGradient id="${p}-bg" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="${N2}"/><stop offset=".55" stop-color="${N}"/><stop offset="1" stop-color="${K}"/></radialGradient>`,
    `<radialGradient id="${p}-panel" cx="50%" cy="38%" r="72%"><stop offset="0" stop-color="${N2}"/><stop offset=".6" stop-color="${N}"/><stop offset="1" stop-color="${K}"/></radialGradient>`,
    `<radialGradient id="${p}-glow"><stop offset="0" stop-color="${H}" stop-opacity=".45"/><stop offset=".45" stop-color="${C.violet}" stop-opacity=".14"/><stop offset="1" stop-color="${C.violet}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="${p}-vio"><stop offset="0" stop-color="${C.violet}" stop-opacity=".32"/><stop offset=".6" stop-color="${C.violet2}" stop-opacity=".14"/><stop offset="1" stop-color="${C.violet2}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="${p}-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${H}"/><stop offset=".5" stop-color="${G}"/><stop offset="1" stop-color="${SH}"/></linearGradient>`,
  );
}

function cornerOrnament(): string {
  return [
    path("M75 41A34 34 0 0 1 41 75", stroke(G, 1.4)),
    path("M89 41A48 48 0 0 1 41 89", stroke(SH, 0.9)),
    path("M41 112Q47 74 72 66M112 41Q74 47 66 72", stroke(G, 1.1)),
    sparkle(58, 58, 11, solid(H)),
    circle(58, 58, 2.2, solid(K)),
    circle(41, 120, 2.2, solid(G)),
    circle(120, 41, 2.2, solid(G)),
  ].join("");
}

/** Background + double engraved border + corner ornaments. Symmetric under 180° rotation. */
export function cardBorder(ctx: Ctx): string {
  const corner = cornerOrnament();
  return [
    rect(0, 0, 600, 1000, solid(K)),
    rect(8, 8, 584, 984, `fill="${ctx.ref("bg")}"`, 22),
    rect(18, 18, 564, 964, stroke(ctx.ref("gold"), 3), 16),
    rect(27, 27, 546, 946, stroke(G, 1), 11),
    rect(34, 34, 532, 932, stroke(SH, 1.8, `stroke-dasharray="0.1 7" stroke-linecap="round"`), 8),
    rect(41, 41, 518, 918, stroke(G, 0.8), 6),
    corner,
    g("matrix(-1 0 0 1 600 0)", corner),
    g("matrix(1 0 0 -1 0 1000)", corner),
    g("matrix(-1 0 0 -1 600 1000)", corner),
    // side rails
    path("M55 160V450M55 550V840M545 160V450M545 550V840", stroke(SH, 0.8)),
    sparkle(55, 500, 9, solid(G)),
    sparkle(545, 500, 9, solid(G)),
  ].join("");
}

export function panelFill(ctx: Ctx, d: string): string {
  return path(d, `fill="${ctx.ref("panel")}"`);
}

export function panelOutline(d: string): string {
  return path(d, stroke(G, 6.5)) + path(d, stroke(K, 2.2)) + path(d, stroke(H, 0.6, `opacity=".6"`));
}

/** Spandrel decorations between the arch and the border. */
export function spandrels(pointed: boolean): string {
  const y = pointed ? 150 : 140;
  return [
    sparkle(108, y, 8, solid(G)),
    sparkle(492, y, 8, solid(G)),
    circle(140, y + 40, 1.6, solid(H)),
    circle(460, y + 40, 1.6, solid(H)),
    circle(90, y + 70, 1.4, solid(H)),
    circle(510, y + 70, 1.4, solid(H)),
  ].join("");
}

/** Numeral / rank plaque at top centre. */
export function headerPlaque(label: string, size: number): string {
  const text = escapeXml(label);
  return [
    path("M214 80L238 56H362L386 80L362 104H238Z", filled(K, G, 2)),
    path("M224 80L242 62H358L376 80L358 98H242Z", stroke(SH, 1)),
    `<text x="300" y="${f(80 + size * 0.36)}" text-anchor="middle" ${labelFont(label, 3)} font-size="${f(size)}" fill="${H}">${text}</text>`,
  ].join("");
}

/** Title cartouche at the bottom with the card name in uppercase serif. */
export function cartouche(name: string): string {
  const label = name.toUpperCase();
  const len = Math.max(1, label.length);
  const fs = Math.max(16, Math.min(32, (372 - 2 * len) / (len * 0.74)));
  return [
    path("M110 805H490Q500 825 520 830V870Q500 875 490 895H110Q100 875 80 870V830Q100 825 110 805Z", filled(N, G, 2.2)),
    path("M118 813H482Q490 829 508 834V866Q490 871 482 887H118Q110 871 92 866V834Q110 829 118 813Z", stroke(SH, 1)),
    sparkle(98, 850, 6, solid(G)),
    sparkle(502, 850, 6, solid(G)),
    `<text x="300" y="${f(850 + fs * 0.35)}" text-anchor="middle" ${labelFont(label, 2)} font-size="${f(fs)}" fill="${H}">${escapeXml(label)}</text>`,
    // footer ornament
    line(200, 928, 280, 928, stroke(SH, 1)),
    line(320, 928, 400, 928, stroke(SH, 1)),
    star(300, 928, 4, 9, 3, solid(G)),
    circle(190, 928, 2, solid(G)),
    circle(410, 928, 2, solid(G)),
  ].join("");
}

/** Per-card deterministic star field and constellation, drawn inside the panel clip. */
export function backdrop(ctx: Ctx): string {
  const r = ctx.rng;
  const parts: string[] = [];
  parts.push(circle(300, 440, 280, `fill="${ctx.ref("vio")}"`));
  // faint orbit ring
  parts.push(circle(300, 450, 190 + r() * 70, stroke(SH, 0.7, `stroke-dasharray="2 7" opacity=".55"`)));
  // dust stars grouped by brightness
  const tiers: string[] = ["", "", ""];
  for (let i = 0; i < 52; i++) {
    const x = 74 + r() * 452;
    const y = 132 + r() * 600;
    const rad = 0.5 + r() * r() * 1.7;
    const tier = Math.floor(r() * 3);
    tiers[tier] += circleD(x, y, rad);
  }
  parts.push(path(tiers[0], solid(H, `opacity=".35"`)));
  parts.push(path(tiers[1], solid(H, `opacity=".6"`)));
  parts.push(path(tiers[2], solid(H, `opacity=".9"`)));
  for (let i = 0; i < 4; i++) {
    parts.push(sparkle(90 + r() * 420, 150 + r() * 520, 3.5 + r() * 3, solid(H, `opacity=".8"`)));
  }
  // constellation: a short random walk
  const count = 5 + Math.floor(r() * 3);
  let x = 110 + r() * 380;
  let y = 165 + r() * 230;
  let heading = r() * 360;
  const pts: [number, number][] = [[x, y]];
  for (let i = 1; i < count; i++) {
    heading += -70 + r() * 140;
    const step = 32 + r() * 34;
    x = Math.min(505, Math.max(95, x + Math.cos((heading * Math.PI) / 180) * step));
    y = Math.min(640, Math.max(160, y + Math.sin((heading * Math.PI) / 180) * step));
    pts.push([x, y]);
  }
  parts.push(path(pts.map(([px, py], i) => `${i ? "L" : "M"}${f(px)} ${f(py)}`).join(""), stroke(G, 0.8, `opacity=".55" stroke-dasharray="3 3"`)));
  parts.push(path(pts.map(([px, py]) => circleD(px, py, 2.3)).join(""), solid(H, `opacity=".9"`)));
  return parts.join("");
}
