// Shared card back. Every element is either intrinsically symmetric under a
// 180° rotation about the card centre, or drawn twice (once rotated), so a
// reversed card looks identical to an upright one.

import { baseDefs, cardBorder } from "./frame";
import {
  C,
  circle,
  circleD,
  crescentD,
  f,
  filled,
  g,
  hatchIn,
  makeCtx,
  hashString,
  path,
  polar,
  raysD,
  rect,
  solid,
  sparkle,
  star,
  stroke,
} from "./util";

const G = C.gold;
const H = C.hi;
const SH = C.shadow;
const K = C.black;
const N = C.night;
const N2 = C.night2;

const sym = (content: string): string => content + g("rotate(180 300 500)", content);

export function renderBackSvg(width: number, height: number): string {
  const ctx = makeCtx("arcana-back", hashString("arcana-back"));
  baseDefs(ctx);
  const r = ctx.rng;
  const field = "M50 50H550V950H50Z";

  // Top-half ornament, mirrored by rotation.
  let dust = "";
  for (let i = 0; i < 26; i++) {
    const x = 80 + r() * 440;
    const y = 84 + r() * 170;
    dust += circleD(x, y, 0.6 + r() * 1.3);
  }
  const cons: [number, number][] = [];
  let cx = 110 + r() * 60;
  let cy = 120 + r() * 40;
  for (let i = 0; i < 5; i++) {
    cons.push([cx, cy]);
    cx += 36 + r() * 30;
    cy += -20 + r() * 40;
  }
  let ringStars = "";
  for (let i = 0; i < 7; i++) {
    const [x, y] = polar(300, 170, 58, 200 + i * 23.3);
    ringStars += circleD(x, y, 2);
  }
  const top = [
    path(dust, solid(H, `opacity=".6"`)),
    path(cons.map(([x, y], i) => `${i ? "L" : "M"}${f(x)} ${f(y)}`).join(""), stroke(G, 0.8, `opacity=".6" stroke-dasharray="3 3"`)),
    path(cons.map(([x, y]) => circleD(x, y, 2.2)).join(""), solid(H)),
    circle(300, 170, 46, `fill="${ctx.ref("glow")}"`),
    path(crescentD(300, 170, 30, 18, -90), filled(H, G, 1.2)),
    path(ringStars, solid(G)),
    path("M300 214V262", stroke(G, 1.2)),
    star(300, 238, 4, 8, 2.5, solid(H)),
    sparkle(108, 108, 10, solid(G)),
    sparkle(492, 108, 10, solid(G)),
    path("M140 300Q160 250 210 236M460 300Q440 250 390 236", stroke(SH, 1)),
  ].join("");

  let dots = "";
  for (let i = 0; i < 16; i++) {
    const [x, y] = polar(300, 500, 196, i * 22.5);
    dots += circleD(x, y, 2.6);
  }

  const body = [
    cardBorder(ctx),
    rect(50, 50, 500, 900, solid(N), 6),
    hatchIn(ctx, field, 50, 50, 500, 900, 26, 45, SH, 0.5, 0.45),
    hatchIn(ctx, field, 50, 50, 500, 900, 26, -45, SH, 0.5, 0.45),
    rect(66, 66, 468, 868, stroke(G, 1.2), 4),
    rect(74, 74, 452, 852, stroke(SH, 0.8), 3),
    sym(top),
    circle(300, 500, 270, `fill="${ctx.ref("vio")}"`),
    circle(300, 500, 230, filled(K, G, 2)),
    circle(300, 500, 218, stroke(G, 0.8)),
    path(raysD(300, 500, 218, 230, 72), stroke(SH, 0.8)),
    path(dots, solid(H)),
    circle(300, 500, 176, stroke(G, 1.2, `stroke-dasharray="2 5"`)),
    circle(300, 500, 150, stroke(G, 1.5)),
    path(raysD(300, 500, 150, 176, 16, 11.25), stroke(SH, 0.8)),
    circle(300, 500, 150, `fill="${ctx.ref("glow")}"`),
    star(300, 500, 8, 140, 58, filled(N2, G, 1.6)),
    star(300, 500, 8, 96, 40, filled(K, H, 1.2), -90 + 22.5),
    path("M226 500Q300 448 374 500Q300 552 226 500Z", filled(K, H, 1.8)),
    circle(300, 500, 24, filled(C.violet2, G, 1.5)),
    circle(300, 500, 14, stroke(H, 0.8)),
    circle(300, 500, 7, solid(H)),
    sparkle(80, 500, 9, solid(G)),
    sparkle(520, 500, 9, solid(G)),
  ].join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 600 1000" role="img" aria-label="Card back: concentric engraved rings around an eight-pointed star enclosing a watchful eye">` +
    `<defs>${ctx.defs.join("")}</defs>` +
    `<g stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`
  );
}
