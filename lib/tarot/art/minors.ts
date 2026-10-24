// Minor Arcana: engraved suit emblems, pip compositions and court emblems.

import type { MinorRank, Suit } from "@/types/tarot";
import type { Ctx, Pt } from "./util";
import {
  C,
  circle,
  circleD,
  crescentD,
  ellipse,
  f,
  filled,
  g,
  hatchIn,
  leafD,
  lemniscateD,
  line,
  mirrorX,
  path,
  pentagramD,
  poly,
  raysD,
  rect,
  solid,
  sparkle,
  stroke,
  waveD,
} from "./util";

const G = C.gold;
const H = C.hi;
const SH = C.shadow;
const K = C.black;
const N = C.night;
const N2 = C.night2;
const V2 = C.violet2;

// ---------------------------------------------------------------------------
// Suit emblems, designed in a unit box roughly 100 tall centred on 0,0.

function wandUnit(w: number): string {
  return [
    path("M-4.5 -36L4.5 -36L6 48L-6 48Z", filled(N2, G, w)),
    path("M-3 -24L2 -20M-3 -6L3 -2M-3 12L3 16M-4 30L3 34", stroke(SH, w * 0.6)),
    ellipse(5, -12, 2.4, 3.4, stroke(G, w * 0.7)),
    ellipse(-5, 20, 2.4, 3.4, stroke(G, w * 0.7)),
    path(leafD(4, -28, -35, 17, 5) + leafD(-5, 4, 215, 16, 5) + leafD(5, 26, -28, 15, 4.5), filled(V2, H, w * 0.7)),
    path(leafD(0, -38, -90, 15, 6) + leafD(0, -38, -135, 12, 5) + leafD(0, -38, -45, 12, 5), filled(H, G, w * 0.7)),
    circle(0, -38, 2.6, solid(G)),
    ellipse(0, 48, 6, 2, filled(N2, G, w * 0.7)),
  ].join("");
}

function cupUnit(w: number): string {
  return [
    path("M-22 46Q-14 34 -3 34L3 34Q14 34 22 46Z", filled(N2, G, w)),
    rect(-3, 18, 6, 17, filled(N2, G, w)),
    ellipse(0, 15, 7, 4.5, filled(N2, G, w)),
    path("M-28 -38C-28 -6 -16 8 0 10C16 8 28 -6 28 -38Z", filled(N2, G, w)),
    path("M14 -34C14 -14 10 -2 4 4M21 -34C21 -16 16 -4 10 1", stroke(SH, w * 0.6)),
    path("M-20 -31Q-20 -12 -10 0", stroke(H, w * 0.6)),
    path("M-27 -26Q0 -18 27 -26", stroke(G, w * 0.7)),
    path(circleD(-16, -21.5, 1.6) + circleD(-8, -20.3, 1.6) + circleD(0, -20, 1.6) + circleD(8, -20.3, 1.6) + circleD(16, -21.5, 1.6), solid(H)),
    ellipse(0, -38, 28, 5, filled(N, H, w)),
    line(-24, 46, 24, 46, stroke(G, w)),
  ].join("");
}

function swordUnit(w: number): string {
  return [
    path("M0 -52L6 -40L6 22L-6 22L-6 -40Z", filled(N2, H, w)),
    line(0, -38, 0, 18, stroke(SH, w * 0.7)),
    path("M-26 22H26Q30 26 26 30H-26Q-30 26 -26 22Z", filled(N2, G, w)),
    circle(-30, 26, 3, solid(G)),
    circle(30, 26, 3, solid(G)),
    rect(-3.5, 30, 7, 14, filled(K, G, w)),
    path("M-3.5 34L3.5 32M-3.5 38L3.5 36M-3.5 42L3.5 40", stroke(SH, w * 0.6)),
    circle(0, 48, 5, filled(N2, G, w)),
  ].join("");
}

function pentacleUnit(w: number): string {
  let dots = "";
  for (let i = 0; i < 15; i++) {
    const a = (i * 24 - 90) * (Math.PI / 180);
    dots += circleD(Math.cos(a) * 42, Math.sin(a) * 42, 1.4);
  }
  return [
    circle(0, 0, 46, filled(N2, G, w * 1.2)),
    circle(0, 0, 38, stroke(G, w * 0.7)),
    path(dots, solid(H)),
    path(pentagramD(0, 0, 34, -90), stroke(H, w)),
    circle(0, 0, 5, stroke(G, w * 0.7)),
  ].join("");
}

/** Draw a suit emblem centred at (cx, cy), `size` px tall, rotated `rot` degrees. */
export function emblem(suit: Suit, cx: number, cy: number, size: number, rot = 0): string {
  const s = size / 100;
  const w = (1 + size / 220) / s;
  const body =
    suit === "wands" ? wandUnit(w) : suit === "cups" ? cupUnit(w) : suit === "swords" ? swordUnit(w) : pentacleUnit(w);
  const t = `translate(${f(cx)} ${f(cy)})${rot ? ` rotate(${f(rot)})` : ""} scale(${Math.round(s * 1000) / 1000})`;
  return g(t, body, `stroke-linejoin="round" stroke-linecap="round"`);
}

export const SUIT_NOUN: Record<Suit, { one: string; many: string }> = {
  wands: { one: "flowering staff", many: "flowering staffs" },
  cups: { one: "chalice", many: "chalices" },
  swords: { one: "sword", many: "swords" },
  pentacles: { one: "pentacle disc", many: "pentacle discs" },
};

const ELEMENT: Record<Suit, string> = { wands: "fire", cups: "water", swords: "air", pentacles: "earth" };

// ---------------------------------------------------------------------------
// Grounds (bottom band of the panel) per suit.

function ground(ctx: Ctx, suit: Suit): string {
  switch (suit) {
    case "wands": {
      const d = "M70 734Q160 704 250 728T430 718T530 726V780H70Z";
      return [
        path("M70 712Q190 690 300 708T530 700", stroke(SH, 1, `opacity=".7"`)),
        path(d, filled(N2, SH, 1.2)),
        hatchIn(ctx, d, 70, 700, 460, 80, 8, 0, SH, 0.6, 0.6),
        path("M120 726l-4 -10M120 726l4 -9M236 728l-4 -10M236 728l5 -9M372 722l-4 -10M372 722l4 -9M482 726l-4 -10M482 726l4 -9", stroke(G, 1)),
      ].join("");
    }
    case "cups":
      return [
        rect(70, 722, 460, 58, solid(V2, `opacity=".55"`)),
        path(waveD(70, 530, 730, 4, 40), stroke(G, 1.2)),
        path(waveD(80, 530, 748, 3.5, 34), stroke(SH, 1)),
        path(waveD(70, 530, 766, 3, 46), stroke(SH, 0.9)),
      ].join("");
    case "swords": {
      const d = "M70 780L70 742L110 726L150 746L200 720L250 742L300 724L350 746L400 718L450 744L500 728L530 738V780Z";
      return [
        path("M100 190Q200 176 290 192M330 214Q420 198 500 214M120 236Q180 228 240 238", stroke(SH, 1, `stroke-dasharray="14 6" opacity=".8"`)),
        path(d, filled(N2, SH, 1.2)),
        hatchIn(ctx, d, 70, 716, 460, 64, 7, -40, SH, 0.6, 0.7),
      ].join("");
    }
    case "pentacles": {
      let bumps = "";
      for (let x = 70; x <= 530; x += 26) bumps += circleD(x, 744, 15);
      let blooms = "";
      for (let x = 96; x < 520; x += 52) blooms += circleD(x, 734, 3);
      return [
        rect(70, 744, 460, 36, solid(N2)),
        path(bumps, filled(N2, SH, 2)),
        path(bumps, solid(N2)),
        rect(70, 750, 460, 30, solid(N2)),
        path(blooms, solid(H, `opacity=".85"`)),
        line(70, 750, 530, 750, stroke(SH, 0.8)),
      ].join("");
    }
  }
}

function elementSigil(suit: Suit, cx: number, cy: number): string {
  const up = suit === "wands" || suit === "swords";
  const tri = up
    ? `M${f(cx)} ${f(cy - 10)}L${f(cx + 10)} ${f(cy + 7)}L${f(cx - 10)} ${f(cy + 7)}Z`
    : `M${f(cx)} ${f(cy + 10)}L${f(cx + 10)} ${f(cy - 7)}L${f(cx - 10)} ${f(cy - 7)}Z`;
  const bar =
    suit === "swords" ? `M${f(cx - 9)} ${f(cy + 1)}H${f(cx + 9)}` : suit === "pentacles" ? `M${f(cx - 9)} ${f(cy - 1)}H${f(cx + 9)}` : "";
  return circle(cx, cy, 19, filled(K, G, 1.6)) + circle(cx, cy, 15, stroke(SH, 0.8)) + path(tri + bar, stroke(H, 1.6));
}

// ---------------------------------------------------------------------------
// Aces

function ace(ctx: Ctx, suit: Suit): string {
  const parts: string[] = [];
  parts.push(circle(300, 450, 230, `fill="${ctx.ref("glow")}"`));
  parts.push(path(raysD(300, 450, 120, 240, 40), stroke(SH, 0.8, `opacity=".8"`)));
  parts.push(path(raysD(300, 450, 150, 205, 40, 4.5), stroke(H, 0.6, `opacity=".45"`)));
  parts.push(circle(300, 450, 172, stroke(G, 1, `stroke-dasharray="1 6" stroke-linecap="round"`)));
  parts.push(circle(300, 450, 200, stroke(SH, 0.7)));
  parts.push(ground(ctx, suit));
  switch (suit) {
    case "wands": {
      let leaves = "";
      const spots: [number, number, number][] = [
        [150, 300, 30], [452, 270, 140], [420, 420, 80], [170, 520, 200], [130, 410, -20], [470, 560, 110], [200, 640, 60], [410, 650, 160],
      ];
      for (const [x, y, a] of spots) leaves += leafD(x, y, a, 18, 6);
      parts.push(path(leaves, filled(V2, H, 1)));
      parts.push(emblem("wands", 300, 450, 330, 0));
      break;
    }
    case "cups": {
      parts.push(
        path(
          "M210 330Q150 420 140 722M218 336Q182 450 186 722M390 330Q450 420 460 722M382 336Q418 450 414 722M300 600Q296 660 300 722",
          stroke(H, 1.5, `opacity=".75"`),
        ),
      );
      // descending dove
      parts.push(
        path("M300 214Q270 196 246 206Q272 212 294 228ZM300 214Q330 196 354 206Q328 212 306 228Z", filled(N2, H, 1.2)),
        ellipse(300, 230, 7, 14, filled(H, G, 1)),
        circle(300, 246, 4, solid(H)),
      );
      parts.push(emblem("cups", 300, 460, 300, 0));
      break;
    }
    case "swords": {
      parts.push(emblem("swords", 300, 455, 340, 0));
      const crown = "M268 268L268 246L282 256L292 236L300 250L308 236L318 256L332 246L332 268Z";
      parts.push(path(crown, filled(N2, H, 1.6)));
      parts.push(path(circleD(292, 236, 2.5) + circleD(308, 236, 2.5) + circleD(300, 260, 3), solid(H)));
      // laurel branches hanging from the crown
      let laurel = "";
      for (let i = 0; i < 5; i++) {
        laurel += leafD(264 - i * 14, 270 + i * 18, 150 + i * 6, 16, 5) + leafD(336 + i * 14, 270 + i * 18, 30 - i * 6, 16, 5);
      }
      parts.push(path("M268 266Q210 300 196 360M332 266Q390 300 404 360", stroke(G, 1.4)));
      parts.push(path(laurel, filled(V2, G, 1)));
      break;
    }
    case "pentacles": {
      parts.push(path("M210 780V690A90 90 0 0 1 390 690V780", stroke(G, 7)));
      parts.push(path("M210 780V690A90 90 0 0 1 390 690V780", stroke(K, 2.4)));
      let flowers = "";
      for (const [x, y] of [[214, 640], [386, 640], [244, 610], [356, 610]] as Pt[]) flowers += circleD(x, y, 5);
      parts.push(path(flowers, filled(V2, H, 1)));
      parts.push(emblem("pentacles", 300, 440, 280, 0));
      break;
    }
  }
  return parts.join("");
}

// ---------------------------------------------------------------------------
// Pip compositions 2–10

interface Slot {
  x: number;
  y: number;
}

const PIP_LAYOUT: Record<number, Slot[]> = {
  3: [{ x: 300, y: 300 }, { x: 196, y: 590 }, { x: 404, y: 590 }],
  4: [{ x: 200, y: 320 }, { x: 400, y: 320 }, { x: 200, y: 600 }, { x: 400, y: 600 }],
  5: [{ x: 190, y: 300 }, { x: 410, y: 300 }, { x: 300, y: 460 }, { x: 190, y: 620 }, { x: 410, y: 620 }],
  6: [
    { x: 205, y: 290 }, { x: 395, y: 290 }, { x: 205, y: 460 }, { x: 395, y: 460 }, { x: 205, y: 630 }, { x: 395, y: 630 },
  ],
  7: [
    { x: 300, y: 250 }, { x: 196, y: 390 }, { x: 404, y: 390 }, { x: 196, y: 535 }, { x: 404, y: 535 }, { x: 196, y: 680 }, { x: 404, y: 680 },
  ],
  8: [
    { x: 170, y: 290 }, { x: 300, y: 290 }, { x: 430, y: 290 }, { x: 235, y: 460 }, { x: 365, y: 460 },
    { x: 170, y: 630 }, { x: 300, y: 630 }, { x: 430, y: 630 },
  ],
  9: [
    { x: 170, y: 280 }, { x: 300, y: 280 }, { x: 430, y: 280 }, { x: 170, y: 460 }, { x: 300, y: 460 }, { x: 430, y: 460 },
    { x: 170, y: 640 }, { x: 300, y: 640 }, { x: 430, y: 640 },
  ],
  10: [
    { x: 186, y: 262 }, { x: 414, y: 262 }, { x: 186, y: 412 }, { x: 414, y: 412 }, { x: 186, y: 562 }, { x: 414, y: 562 },
    { x: 186, y: 706 }, { x: 414, y: 706 }, { x: 300, y: 337 }, { x: 300, y: 632 },
  ],
};

const PIP_SIZE: Record<number, number> = { 2: 190, 3: 170, 4: 150, 5: 140, 6: 130, 7: 118, 8: 112, 9: 106, 10: 100 };

const PIP_COMPOSITION: Record<number, string> = {
  3: "arranged in a triangle",
  4: "set at the corners of a square",
  5: "in a quincunx with one at the centre",
  6: "in two columns of three",
  7: "with one crowning two columns of three",
  8: "in rows of three, two and three",
  9: "in a three-by-three grid",
  10: "in two columns of four flanking a central pair",
};

const NUMBER_WORD = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

function pipSize(suit: Suit, n: number): number {
  const base = PIP_SIZE[n] ?? 100;
  if (suit === "pentacles") return base * (n >= 7 ? 0.92 : 0.82);
  if (suit === "wands" || suit === "swords") return base * (n === 7 ? 1.15 : 1.22);
  return base;
}

function pipTilt(suit: Suit, n: number, i: number): number {
  if (suit === "wands") return (i % 2 === 0 ? -1 : 1) * (n >= 8 ? 6 : 10);
  if (suit === "swords") return (i % 2 === 0 ? 1 : -1) * (n >= 8 ? 5 : 8);
  return 0;
}

function two(suit: Suit): string {
  switch (suit) {
    case "wands":
      return (
        emblem("wands", 205, 450, 230, -8) +
        emblem("wands", 395, 450, 230, 8) +
        circle(300, 560, 34, filled(N2, G, 1.8)) +
        path("M266 560H334M300 526V594", stroke(SH, 1)) +
        ellipse(300, 560, 14, 34, stroke(SH, 1)) +
        ellipse(300, 560, 34, 12, stroke(H, 0.8))
      );
    case "cups":
      return (
        path("M262 300Q300 270 338 300Q300 286 262 300Z", filled(N2, H, 1.2)) +
        path("M300 300Q250 250 214 270Q246 268 270 300ZM300 300Q350 250 386 270Q354 268 330 300Z", filled(N2, G, 1.2)) +
        path("M300 300V360", stroke(G, 2)) +
        path(lemniscateD(300, 380, 22, 12), stroke(H, 1.6)) +
        emblem("cups", 205, 520, 200, 8) +
        emblem("cups", 395, 520, 200, -8)
      );
    case "swords":
      return (
        circle(300, 470, 120, stroke(SH, 1, `stroke-dasharray="2 6"`)) +
        emblem("swords", 300, 470, 300, -32) +
        emblem("swords", 300, 470, 300, 32) +
        path(crescentD(300, 250, 28, 16, -90), filled(H, G, 1))
      );
    case "pentacles":
      return (
        g("rotate(90 300 460)", path(lemniscateD(300, 460, 190, 120), stroke(G, 3)) + path(lemniscateD(300, 460, 190, 120), stroke(K, 1))) +
        emblem("pentacles", 300, 330, 150, 0) +
        emblem("pentacles", 300, 590, 150, 0)
      );
  }
}

function pips(ctx: Ctx, suit: Suit, n: number): string {
  const parts: string[] = [ground(ctx, suit)];
  if (n === 2) {
    parts.push(two(suit));
    return parts.join("");
  }
  const slots = PIP_LAYOUT[n] ?? PIP_LAYOUT[3];
  const size = pipSize(suit, n);
  // faint linking lines between pips (engraved guide lines)
  let guide = "";
  for (let i = 1; i < slots.length; i++) guide += `M${f(slots[i - 1].x)} ${f(slots[i - 1].y)}L${f(slots[i].x)} ${f(slots[i].y)}`;
  parts.push(path(guide, stroke(SH, 0.6, `opacity=".35" stroke-dasharray="1 5"`)));
  slots.forEach((s) => {
    parts.push(circle(s.x, s.y, size * 0.36, `fill="${ctx.ref("glow")}"`));
  });
  slots.forEach((s, i) => {
    parts.push(emblem(suit, s.x, s.y, size, pipTilt(suit, n, i)));
  });
  return parts.join("");
}

// ---------------------------------------------------------------------------
// Courts

function wingLeft(): string {
  return (
    path("M238 480Q170 380 92 362Q118 396 112 420Q140 430 142 452Q170 460 172 484Q204 492 238 500Z", filled(N2, G, 1.6)) +
    path("M232 484Q170 410 104 372M228 490Q176 440 126 424M226 494Q190 470 156 458", stroke(SH, 1))
  );
}

function court(ctx: Ctx, suit: Suit, rank: MinorRank): string {
  const parts: string[] = [ground(ctx, suit)];
  const size = suit === "pentacles" ? 200 : 210;
  const cy = 480;
  switch (rank) {
    case "page": {
      parts.push(circle(300, 250, 24, stroke(SH, 1)));
      parts.push(sparkle(300, 250, 16, solid(H)));
      let laurel = "";
      for (let i = 0; i < 6; i++) {
        const y = 600 - i * 38;
        laurel += leafD(176 + (i % 2) * 2 - Math.sin(i / 2) * 8, y, i % 2 ? 200 : -40, 18, 5);
      }
      const sprig = path("M182 616Q150 500 190 380", stroke(G, 1.4)) + path(laurel, filled(V2, G, 1));
      parts.push(sprig, mirrorX(sprig));
      parts.push(circle(300, cy, 120, `fill="${ctx.ref("glow")}"`));
      parts.push(emblem(suit, 300, cy - 10, size * 0.92, 0));
      parts.push(
        path("M170 646L126 650L142 666L124 684L170 682Z", filled(V2, G, 1.5)),
        path("M430 646L474 650L458 666L476 684L430 682Z", filled(V2, G, 1.5)),
        path("M160 640Q300 616 440 640L440 678Q300 654 160 678Z", filled(N, G, 1.8)),
        path("M192 654Q300 636 408 654", stroke(SH, 1, `stroke-dasharray="6 4"`)),
      );
      break;
    }
    case "knight": {
      parts.push(line(140, 720, 460, 230, stroke(G, 3)));
      parts.push(poly([[460, 230], [452, 254], [466, 248]], filled(H, G, 1)));
      parts.push(path("M444 254Q486 262 520 250Q496 274 516 300Q476 290 428 279Z", filled(V2, H, 1.2)));
      parts.push(wingLeft(), mirrorX(wingLeft()));
      parts.push(circle(300, cy, 120, `fill="${ctx.ref("glow")}"`));
      parts.push(emblem(suit, 300, cy, size, suit === "wands" || suit === "swords" ? -12 : 0));
      parts.push(path("M276 664Q276 718 300 718Q324 718 324 664", stroke(G, 10)));
      parts.push(path("M276 664Q276 718 300 718Q324 718 324 664", stroke(K, 3)));
      parts.push(path(circleD(276, 680, 1.8) + circleD(324, 680, 1.8) + circleD(282, 702, 1.8) + circleD(318, 702, 1.8), solid(H)));
      break;
    }
    case "queen": {
      const arch = "M190 700V360A110 110 0 0 1 410 360V700Z";
      parts.push(path(arch, filled(K, G, 2.2)));
      parts.push(hatchIn(ctx, arch, 190, 250, 220, 450, 9, 90, SH, 0.6, 0.45));
      parts.push(path("M206 700V364A94 94 0 0 1 394 364V700", stroke(SH, 1.2)));
      parts.push(path(crescentD(300, 250, 34, 22, -90), filled(H, G, 1.4)));
      parts.push(path(circleD(268, 226, 3.5) + circleD(300, 210, 4) + circleD(332, 226, 3.5), solid(H)));
      parts.push(circle(300, cy, 110, `fill="${ctx.ref("glow")}"`));
      parts.push(ellipse(300, 600, 84, 16, filled(V2, G, 1.6)));
      parts.push(path("M220 606l-6 18M380 606l6 18", stroke(G, 1.4)));
      parts.push(emblem(suit, 300, suit === "pentacles" ? 490 : 486, size * 0.95, 0));
      const rose = (x: number, y: number) =>
        circle(x, y, 12, filled(V2, G, 1.2)) + path(`M${x - 5} ${y}a5 5 0 1 1 5 5a3 3 0 1 1 -3 -3`, stroke(H, 1)) + path(leafD(x + 10, y + 6, 20, 14, 4), filled(N2, G, 0.8));
      parts.push(rose(160, 716), mirrorX(rose(160, 716)));
      break;
    }
    case "king": {
      parts.push(rect(176, 290, 248, 410, filled(K, G, 2.4)));
      parts.push(rect(192, 306, 216, 394, stroke(SH, 1.2)));
      parts.push(rect(160, 276, 280, 14, filled(N2, G, 1.6)));
      parts.push(circle(170, 268, 10, filled(N2, G, 1.6)), circle(430, 268, 10, filled(N2, G, 1.6)));
      parts.push(sparkle(170, 268, 7, solid(H)), sparkle(430, 268, 7, solid(H)));
      parts.push(path(raysD(300, 210, 16, 34, 16), stroke(H, 1.2)));
      parts.push(circle(300, 210, 13, filled(H, G, 1)));
      parts.push(path("M262 266L262 244L276 254L288 234L300 248L312 234L324 254L338 244L338 266Z", filled(N2, G, 1.6)));
      parts.push(circle(300, cy, 115, `fill="${ctx.ref("glow")}"`));
      parts.push(emblem(suit, 300, cy, size, 0));
      parts.push(rect(150, 700, 300, 20, filled(N2, G, 1.6)), rect(130, 720, 340, 22, filled(N2, G, 1.6)));
      break;
    }
    default:
      parts.push(emblem(suit, 300, cy, size, 0));
  }
  parts.push(elementSigil(suit, 300, 752));
  return parts.join("");
}

// ---------------------------------------------------------------------------
// Public helpers for the minor arcana

export function rankForNumber(n: number): MinorRank {
  const ranks: MinorRank[] = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "page", "knight", "queen", "king"];
  return ranks[Math.min(13, Math.max(0, Math.round(n) - 1))];
}

export function renderMinorIllustration(ctx: Ctx, suit: Suit, rank: MinorRank, n: number): string {
  if (rank === "ace" || n === 1) return ace(ctx, suit);
  if (rank === "page" || rank === "knight" || rank === "queen" || rank === "king") return court(ctx, suit, rank);
  return pips(ctx, suit, Math.min(10, Math.max(2, n)));
}

export function minorHeaderLabel(rank: MinorRank, n: number): { label: string; size: number } {
  switch (rank) {
    case "ace":
      return { label: "ACE", size: 24 };
    case "page":
      return { label: "PAGE", size: 22 };
    case "knight":
      return { label: "KNIGHT", size: 20 };
    case "queen":
      return { label: "QUEEN", size: 21 };
    case "king":
      return { label: "KING", size: 22 };
    default: {
      const r = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n] ?? String(n);
      return { label: r, size: 26 };
    }
  }
}

export function minorHeaderEmblems(suit: Suit): string {
  return emblem(suit, 192, 80, 36, 0) + emblem(suit, 408, 80, 36, 0);
}

export function describeMinor(suit: Suit, rank: MinorRank, n: number, name: string): string {
  const e = SUIT_NOUN[suit];
  const el = ELEMENT[suit];
  const groundText: Record<Suit, string> = {
    wands: "over rolling hills with fresh sprouts",
    cups: "above gently rippling water",
    swords: "above jagged rocks swept by wind",
    pentacles: "above a flowering garden hedge",
  };
  if (rank === "ace" || n === 1) {
    const extra: Record<Suit, string> = {
      wands: "with leaves drifting loose around it",
      cups: "with five streams spilling into the water below and a dove descending from above",
      swords: "its point crowned and hung with laurel branches",
      pentacles: "above a garden archway",
    };
    return `${name}: a single large ornate ${e.one} radiates light within engraved rings, ${extra[suit]}. Deep blue and antique gold linework against a starry field.`;
  }
  if (rank === "page" || rank === "knight" || rank === "queen" || rank === "king") {
    const courtText: Record<"page" | "knight" | "queen" | "king", string> = {
      page: `a ${e.one} rises above a swallow-tailed ribbon banner, flanked by laurel sprigs beneath a single star`,
      knight: `a ${e.one} is flanked by spread wings before a charging lance with a streaming pennant, a horseshoe below`,
      queen: `a ${e.one} rests on a violet cushion before an arched throne crowned by a crescent moon`,
      king: `a ${e.one} stands before a square throne beneath a radiant sun crown, raised on a stepped dais`,
    };
    return `${name}: ${courtText[rank]}, sealed with the alchemical sign of ${el}, ${groundText[suit]}.`;
  }
  const comp = n === 2 ? twoText(suit) : `${NUMBER_WORD[n]} ${e.many} ${PIP_COMPOSITION[n] ?? "in a balanced pattern"}`;
  return `${name}: ${comp}, ${groundText[suit]}, under a faint constellation.`;
}

function twoText(suit: Suit): string {
  switch (suit) {
    case "wands":
      return "Two flowering staffs stand apart on either side of a small engraved globe";
    case "cups":
      return "Two chalices lean toward each other beneath a winged emblem and an infinity sign";
    case "swords":
      return "Two swords cross at the centre within a dotted ring beneath a crescent moon";
    case "pentacles":
      return "Two pentacle discs, one above the other, are bound together by a great looping infinity band";
  }
}

