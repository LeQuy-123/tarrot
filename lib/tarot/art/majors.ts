// Major Arcana: 22 hand-composed emblematic illustrations, drawn inside the
// pointed-arch panel (x 70–530, y ~128–780). Original designs.

import type { Ctx, Pt } from "./util";
import {
  C,
  arcD,
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
  polar,
  poly,
  quadAt,
  raysD,
  raysRangeD,
  rect,
  solid,
  sparkle,
  spiralD,
  star,
  star8,
  stroke,
  waveD,
  zigzagD,
} from "./util";
import { emblem } from "./minors";

const G = C.gold;
const H = C.hi;
const SH = C.shadow;
const K = C.black;
const N = C.night;
const N2 = C.night2;
const V = C.violet;
const V2 = C.violet2;

const glow = (ctx: Ctx, cx: number, cy: number, r: number): string => circle(cx, cy, r, `fill="${ctx.ref("glow")}"`);

/** Engraved double line: a thick gold stroke split by a dark core. */
const dbl = (d: string, w = 5, col: string = G): string => path(d, stroke(col, w)) + path(d, stroke(K, w * 0.32));

const drop = (x: number, y: number, s: number, rot = 0): string =>
  path("M0 -8C4 -2 5 2 0 7C-5 2 -4 -2 0 -8Z", solid(H, `opacity=".85" transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})"`));

const flame = (x: number, y: number, s: number, rot: number, fill: string, col: string): string =>
  path("M0 12C-8 4 -6 -6 0 -16C6 -6 8 4 0 12Z", filled(fill, col, 1 / s, `transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})"`));

function crenellated(x1: number, x2: number, top: number, merlon: number): string {
  let d = `M${f(x1)} ${f(top + 10)}`;
  let x = x1;
  let up = true;
  while (x < x2 - 0.1) {
    const nx = Math.min(x2, x + merlon);
    d += up ? `V${f(top)}H${f(nx)}` : `V${f(top + 10)}H${f(nx)}`;
    up = !up;
    x = nx;
  }
  return d + `V${f(top + 10)}`;
}

// ---------------------------------------------------------------------------

function theFool(ctx: Ctx): string {
  const cliff = "M70 640L170 636L250 630L330 622L372 630L386 652L362 690L378 730L352 780L70 780Z";
  let barbs = "";
  for (let i = 0; i < 9; i++) {
    const y = -40 + i * 10;
    const w = 13 * Math.sin((Math.PI * (i + 1)) / 10);
    barbs += `M0 ${y}L${f(-w)} ${f(y - 6)}M0 ${y}L${f(w)} ${f(y - 6)}`;
  }
  return [
    path("M70 560L140 505L190 532L262 462L330 522L400 474L462 516L530 484", stroke(SH, 1.2)),
    path("M140 505L152 524M262 462L278 492M400 474L412 494", stroke(H, 0.9, `opacity=".6"`)),
    path(waveD(380, 540, 700, 5, 40), stroke(V, 1.2, `opacity=".7"`)),
    path(waveD(392, 540, 735, 4, 34), stroke(V, 1, `opacity=".5"`)),
    path(waveD(370, 540, 765, 4, 46), stroke(V2, 1)),
    glow(ctx, 430, 240, 70),
    path(raysD(430, 240, 40, 80, 16), stroke(H, 0.8, `opacity=".6"`)),
    star8(430, 240, 32, filled(H, G, 1.2)),
    circle(430, 240, 5, solid(K)),
    path(raysD(230, 530, 70, 160, 14, 8), stroke(H, 0.6, `opacity=".35"`)),
    path(cliff, filled(N2, G, 2)),
    hatchIn(ctx, cliff, 70, 620, 320, 160, 7, 35, SH, 0.8, 0.7),
    path("M172 634V468A58 58 0 0 1 288 468V634Z", filled(N2, G, 2)),
    path("M188 634V472A42 42 0 0 1 272 472V634Z", filled(V2, H, 1.2)),
    path("M188 634V472A42 42 0 0 1 272 472V634Z", `fill="${ctx.ref("glow")}"`),
    sparkle(230, 520, 9, solid(H, `opacity=".8"`)),
    poly([[222, 406], [238, 406], [234, 421], [226, 421]], filled(H, G, 1)),
    poly([[288, 634], [288, 452], [330, 428], [330, 656]], filled(N2, G, 1.5)),
    poly([[296, 610], [296, 470], [322, 455], [322, 626]], stroke(SH, 1)),
    circle(318, 545, 3, solid(H)),
    line(162, 636, 296, 636, stroke(H, 2)),
    path("M300 646Q340 642 380 636", stroke(H, 1.2, `stroke-dasharray="2 5"`)),
    path("M470 420Q420 470 452 512", stroke(H, 0.9, `stroke-dasharray="2 6" opacity=".7"`)),
    g(
      "translate(445 560) rotate(35)",
      path("M0 -52C-15 -32 -17 18 0 52C15 18 15 -32 0 -52Z", filled(N2, H, 1.2)) + path(barbs, stroke(SH, 0.8)) + line(0, -56, 0, 62, stroke(H, 1.3)),
    ),
  ].join("");
}

function rose(x: number, y: number, r: number): string {
  return circle(x, y, r, filled(V2, G, 1.1)) + path(spiralD(x, y, 1, r * 0.75, 1.6, 0), stroke(H, 0.9));
}

function lily(x: number, y: number, s: number): string {
  return path(leafD(x, y, -90, 16 * s, 4 * s) + leafD(x, y, -140, 13 * s, 4 * s) + leafD(x, y, -40, 13 * s, 4 * s), filled(N2, H, 0.9));
}

function theMagician(ctx: Ctx): string {
  const front = "M144 614H456V710H144Z";
  const flowers: string[] = [];
  for (let i = 0; i < 9; i++) {
    const x = 100 + i * 50;
    flowers.push(i % 2 === 0 ? rose(x, 748, 10) : lily(x, 760, 1));
  }
  const vine = path("M92 560Q104 400 190 310", stroke(G, 1.2)) + path(leafD(98, 500, -60, 16, 5) + leafD(112, 430, -40, 16, 5) + leafD(140, 370, -30, 16, 5), filled(V2, G, 0.9)) + rose(190, 306, 9);
  return [
    glow(ctx, 300, 320, 160),
    path(raysD(300, 320, 70, 190, 28), stroke(SH, 0.8, `opacity=".7"`)),
    path(lemniscateD(300, 205, 64, 26), stroke(H, 3.2)),
    path(lemniscateD(300, 205, 64, 26), stroke(K, 1)),
    vine,
    mirrorX(vine),
    rect(293, 300, 14, 262, filled(N2, G, 1.8)),
    line(300, 312, 300, 552, stroke(SH, 0.8)),
    star8(300, 290, 24, filled(H, G, 1.2)),
    circle(300, 570, 9, filled(N2, G, 1.8)),
    rect(124, 596, 352, 18, filled(N2, G, 2)),
    rect(144, 614, 312, 96, filled(K, G, 1.5)),
    hatchIn(ctx, front, 144, 614, 312, 96, 8, 90, SH, 0.7, 0.8),
    rect(176, 630, 248, 64, filled(N2, G, 1)),
    circle(300, 662, 20, stroke(G, 1.2)),
    sparkle(300, 662, 14, solid(H)),
    emblem("wands", 176, 566, 58, -6),
    emblem("cups", 240, 573, 46, 0),
    emblem("swords", 362, 566, 58, 6),
    emblem("pentacles", 428, 576, 40, 0),
    ...flowers,
  ].join("");
}

function theHighPriestess(ctx: Ctx): string {
  const veil = "M170 300H430V700H170Z";
  let pom = "";
  let crowns = "";
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 5; c++) {
      const x = 192 + c * 54 + (r % 2 ? 27 : 0);
      if (x > 420) continue;
      const y = 326 + r * 56;
      pom += circleD(x, y, 6.5);
      crowns += `M${f(x - 4)} ${f(y - 5)}L${f(x - 2)} ${f(y - 10)}L${f(x)} ${f(y - 7)}L${f(x + 2)} ${f(y - 10)}L${f(x + 4)} ${f(y - 5)}`;
    }
  }
  const capital = (x: number, fill: string, col: string) =>
    path(`M${x - 6} 292Q${x + 30} 246 ${x + 66} 292Z`, filled(fill, col, 1.5)) + rect(x - 10, 740, 80, 18, filled(fill, col, 1.5));
  return [
    path(veil, solid(N2)),
    hatchIn(ctx, veil, 170, 300, 260, 400, 22, 45, SH, 0.7, 0.8),
    hatchIn(ctx, veil, 170, 300, 260, 400, 22, -45, SH, 0.7, 0.8),
    path(pom, filled(V, G, 0.8)),
    path(crowns, stroke(H, 0.9)),
    path(veil, stroke(SH, 1)),
    rect(110, 290, 60, 450, filled(V2, G, 2)),
    hatchIn(ctx, "M110 290H170V740H110Z", 110, 290, 60, 450, 8, 90, V, 0.8, 0.8),
    capital(110, V2, G),
    rect(430, 290, 60, 450, filled(N, H, 2)),
    path("M446 300V730M460 300V730M474 300V730", stroke(SH, 0.8)),
    capital(430, N, H),
    path(crescentD(140, 520, 14, 9, 0), solid(H)),
    sparkle(460, 520, 12, solid(H)),
    glow(ctx, 300, 228, 70),
    circle(300, 228, 24, filled(N2, H, 1.6)),
    path(crescentD(250, 228, 22, 14, 0) + crescentD(350, 228, 22, 14, 180), filled(H, G, 1)),
    rect(262, 470, 76, 56, filled(N, G, 1.5)),
    rect(254, 464, 12, 68, filled(N2, G, 1.5), 6),
    rect(334, 464, 12, 68, filled(N2, G, 1.5), 6),
    path("M276 484H322M276 496H316M276 508H324", stroke(SH, 1.2)),
    rect(70, 718, 460, 62, solid(K)),
    path(waveD(70, 530, 728, 3.5, 36), stroke(G, 1)),
    path(waveD(80, 530, 746, 3, 30), stroke(SH, 0.9)),
    path(waveD(70, 530, 764, 3, 44), stroke(SH, 0.8)),
    path(crescentD(300, 700, 40, 24, -90), filled(H, G, 1.4)),
  ].join("");
}

function theEmpress(ctx: Ctx): string {
  const cypress = (x: number) => {
    const d = `M${x} 340Q${x + 32} 470 ${x + 22} 650H${x - 22}Q${x - 32} 470 ${x} 340Z`;
    return path(d, filled(N2, SH, 1.4)) + hatchIn(ctx, d, x - 34, 340, 68, 310, 7, 60, SH, 0.6, 0.8);
  };
  const heart = "M300 560C230 510 205 470 205 430C205 395 232 375 258 375C280 375 293 390 300 405C307 390 320 375 342 375C368 375 395 395 395 430C395 470 370 510 300 560Z";
  const stars: string[] = [];
  for (let i = 0; i < 12; i++) {
    const [x, y] = polar(300, 470, 168, 196 + (i * 148) / 11);
    stars.push(star(x, y, 6, 9, 3.6, filled(H, G, 0.8)));
  }
  let stalks = "";
  let grain = "";
  const r = ctx.rng;
  for (let x = 82; x <= 520; x += 17) {
    const h = 70 + r() * 50;
    const lean = -8 + r() * 16;
    const top = 780 - h;
    stalks += `M${f(x)} 780Q${f(x)} ${f(top + h / 2)} ${f(x + lean)} ${f(top)}`;
    for (let j = 0; j < 5; j++) {
      const gx = x + lean + (j % 2 ? 3 : -3);
      const gy = top + j * 7;
      grain += `M${f(gx)} ${f(gy)}l2.5 4l-2.5 4l-2.5 -4z`;
    }
  }
  return [
    path("M70 600Q200 560 300 600T530 590", stroke(V, 6, `opacity=".45"`)),
    path("M70 600Q200 560 300 600T530 590", stroke(H, 0.8, `opacity=".6"`)),
    cypress(118),
    cypress(482),
    glow(ctx, 300, 460, 150),
    ...stars,
    path(heart, stroke(G, 8)),
    path(heart, filled(N2, K, 2.5)),
    circle(300, 446, 24, stroke(H, 3.2)),
    path("M300 470V522M280 498H320", stroke(H, 3.2)),
    path(stalks, stroke(G, 1.1)),
    path(grain, filled(H, SH, 0.5)),
  ].join("");
}

function theEmperor(ctx: Ctx): string {
  const mtn = "M70 560L120 420L160 480L220 340L270 450L300 400L340 470L400 330L450 450L490 390L530 470V780H70Z";
  const back = "M170 300H430V630H170Z";
  return [
    path(mtn, filled(N2, SH, 1.2)),
    hatchIn(ctx, mtn, 70, 330, 460, 450, 8, -35, SH, 0.6, 0.7),
    path("M220 340L236 372L220 366L206 378ZM400 330L414 360L400 354L388 364Z", solid(H, `opacity=".8"`)),
    circle(300, 232, 30, filled(K, G, 2)),
    path("M285 250C278 226 296 216 300 236C304 216 322 226 315 250M300 236V254", stroke(H, 3)),
    path(back, filled(K, G, 3)),
    hatchIn(ctx, back, 170, 300, 260, 330, 10, 90, SH, 0.6, 0.5),
    rect(188, 318, 224, 294, stroke(SH, 1.2)),
    circle(194, 326, 22, filled(N2, G, 1.6)),
    circle(406, 326, 22, filled(N2, G, 1.6)),
    path(spiralD(194, 326, 2, 18, 2.2, 0, 1), stroke(H, 2)),
    path(spiralD(406, 326, 2, 18, 2.2, 180, -1), stroke(H, 2)),
    rect(150, 600, 300, 46, filled(N2, G, 2)),
    rect(130, 646, 340, 40, filled(K, G, 2)),
    rect(110, 686, 380, 30, filled(N2, SH, 1.5)),
    ellipse(300, 388, 20, 28, stroke(H, 5.5)),
    path("M258 424H342M300 418V586", stroke(H, 5.5)),
    ellipse(300, 388, 20, 28, stroke(K, 1.6)),
    path("M258 424H342M300 418V586", stroke(K, 1.6)),
    circle(170, 580, 18, filled(N2, H, 2)),
    path("M152 580H188M170 562V544M162 552H178", stroke(H, 1.8)),
  ].join("");
}

function key(rot: number, col: string): string {
  return g(
    `translate(300 610) rotate(${rot})`,
    circle(0, -74, 16, stroke(col, 4)) + circle(0, -74, 6, stroke(col, 2)) + path("M0 -58V60M0 40H16V48H8V54H16V62H0", stroke(col, 4)),
  );
}

function theHierophant(ctx: Ctx): string {
  let floor = "M70 700H530M70 718H530M70 740H530M70 764H530";
  for (let i = -7; i <= 7; i++) floor += `M${f(300 + i * 16)} 700L${f(300 + i * 70)} 780`;
  const column = (x: number) =>
    rect(x, 270, 50, 430, filled(N2, G, 2)) +
    path(`M${x + 12} 276V694M${x + 25} 276V694M${x + 38} 276V694`, stroke(SH, 0.8)) +
    rect(x - 8, 254, 66, 16, filled(N2, G, 1.6)) +
    circle(x - 4, 262, 6, stroke(G, 1.2)) +
    circle(x + 54, 262, 6, stroke(G, 1.2)) +
    rect(x - 8, 690, 66, 14, filled(N2, G, 1.6));
  const dome = "M238 430C238 340 268 300 300 280C332 300 362 340 362 430Z";
  return [
    rect(70, 700, 460, 80, solid(N2)),
    path(floor, stroke(SH, 0.9)),
    column(95),
    column(455),
    path("M120 254Q300 140 480 254", stroke(G, 2)),
    path("M120 270Q300 162 480 270", stroke(SH, 1)),
    glow(ctx, 300, 360, 120),
    path(dome, filled(N2, G, 2.5)),
    hatchIn(ctx, dome, 238, 280, 124, 150, 7, 90, SH, 0.6, 0.6),
    path(zigzagD(242, 358, 418, 8, 10), stroke(H, 1.8)),
    path(zigzagD(250, 350, 374, 7, 9), stroke(H, 1.6)),
    path(zigzagD(262, 338, 332, 5, 8), stroke(H, 1.4)),
    path(circleD(260, 410, 2.4) + circleD(300, 410, 2.4) + circleD(340, 410, 2.4) + circleD(276, 366, 2.2) + circleD(324, 366, 2.2) + circleD(300, 326, 2.2), solid(H)),
    path("M300 280V244M288 258H312", stroke(H, 3)),
    path("M262 430L254 482L270 482L278 430ZM338 430L346 482L330 482L322 430Z", filled(V2, G, 1.2)),
    path("M412 300V690M405 310H419M401 330H423M397 350H427", stroke(G, 3)),
    key(-35, G),
    key(35, H),
  ].join("");
}

function theLovers(ctx: Ctx): string {
  const wing =
    path("M256 236Q180 170 110 186Q150 210 160 240Q200 262 256 256Z", filled(N2, G, 1.5)) +
    path("M250 240Q190 200 124 192M250 246Q200 226 150 222M250 252Q210 246 170 244", stroke(SH, 1));
  const mountain = "M300 450L410 660H190Z";
  const fruits = [[120, 440], [176, 430], [150, 486], [110, 500], [190, 500], [140, 420], [168, 520]] as Pt[];
  const flames: string[] = [];
  for (let i = 0; i < 11; i++) {
    const a = -90 + (i - 5) * 26;
    const [x, y] = polar(450, 500, 48, a);
    flames.push(flame(x, y, 1, a + 90, V2, H));
  }
  flames.push(flame(450, 470, 1.2, 0, V2, H));
  return [
    glow(ctx, 300, 240, 120),
    path(raysD(300, 240, 55, 150, 32), stroke(H, 0.8, `opacity=".55"`)),
    wing,
    mirrorX(wing),
    circle(300, 240, 44, filled(N2, H, 2)),
    circle(300, 240, 32, stroke(G, 1)),
    sparkle(300, 240, 18, solid(H)),
    path(mountain, filled(N2, G, 1.8)),
    hatchIn(ctx, mountain, 190, 450, 220, 210, 6, 60, SH, 0.6, 0.8),
    path("M300 450L322 492L308 486L300 500L290 486L278 492Z", solid(H)),
    poly([[140, 742], [146, 520], [156, 520], [162, 742]], filled(N2, G, 1.5)),
    circle(150, 466, 68, filled(N2, G, 1.8)),
    hatchIn(ctx, circleD(150, 466, 68), 82, 398, 136, 136, 7, -30, SH, 0.6, 0.6),
    path(fruits.map(([x, y]) => circleD(x, y, 6)).join(""), filled(V, H, 1)),
    path("M128 722C170 702 170 682 150 672C128 662 130 642 150 632C172 622 170 602 150 592C132 584 136 568 156 560", stroke(H, 3)),
    ellipse(160, 556, 6, 4, solid(H)),
    poly([[440, 742], [446, 520], [456, 520], [462, 742]], filled(N2, G, 1.5)),
    ...flames,
    line(70, 742, 530, 742, stroke(SH, 1)),
    circle(278, 690, 30, stroke(G, 4)),
    circle(322, 690, 30, stroke(V, 4)),
    path(arcD(278, 690, 30, -62, -24), stroke(G, 4)),
  ].join("");
}

function theChariot(ctx: Ctx): string {
  let walls = "M70 548V530";
  for (let x = 70; x < 530; x += 20) walls += `H${x + 10}V522H${x + 20}V530`;
  walls += "V548Z";
  const canopyStars: string[] = [];
  for (let i = 0; i <= 8; i++) {
    const { p } = quadAt([120, 348], [300, 220], [480, 348], i / 8);
    canopyStars.push(star(p[0], p[1], 5, 6, 2.5, solid(H)));
  }
  const sphinx = "M-46 22L-46 6Q-46 -6 -34 -6L6 -6Q10 -30 22 -34L34 -34Q42 -20 40 -6L46 22Z";
  const wheel = (x: number) => circle(x, 670, 40, filled(N, G, 3)) + path(raysD(x, 670, 6, 40, 8), stroke(G, 1.6)) + circle(x, 670, 6, solid(H));
  const wings = path("M284 585Q240 560 200 572Q240 578 284 592Z", filled(N2, G, 1)) + path("M280 584Q246 572 214 574", stroke(SH, 0.8));
  return [
    path(walls, filled(N2, SH, 1)),
    rect(106, 498, 30, 50, filled(N2, SH, 1)),
    rect(464, 498, 30, 50, filled(N2, SH, 1)),
    path("M120 340Q300 210 480 340L480 358Q300 232 120 358Z", filled(N2, G, 1.8)),
    ...canopyStars,
    rect(146, 350, 8, 190, filled(N2, G, 1.2)),
    rect(446, 350, 8, 190, filled(N2, G, 1.2)),
    glow(ctx, 300, 420, 90),
    star8(300, 420, 26, filled(H, G, 1)),
    path(crescentD(196, 470, 20, 12, -60) + crescentD(404, 470, 20, 12, -120), filled(H, G, 0.8)),
    wheel(176),
    wheel(424),
    rect(150, 520, 300, 130, filled(K, G, 3)),
    rect(166, 536, 268, 98, stroke(SH, 1.2)),
    wings,
    mirrorX(wings),
    circle(300, 585, 16, filled(H, G, 1)),
    path(sphinx, filled(H, G, 1.4, `transform="translate(250 736) scale(.8)"`)),
    path(sphinx, filled(K, G, 1.4, `transform="translate(350 736) scale(-.8 .8)"`)),
  ].join("");
}

function strength(ctx: Ctx): string {
  let petals = "";
  for (let i = 0; i < 28; i++) {
    const a = (i * 360) / 28;
    const ro = i % 2 ? 112 : 130;
    const [b1x, b1y] = polar(300, 470, 62, a - 6);
    const [b2x, b2y] = polar(300, 470, 62, a + 6);
    const [tx, ty] = polar(300, 470, ro, a + 4);
    const [c1x, c1y] = polar(300, 470, ro * 0.8, a - 8);
    const [c2x, c2y] = polar(300, 470, ro * 0.8, a + 10);
    petals += `M${f(b1x)} ${f(b1y)}Q${f(c1x)} ${f(c1y)} ${f(tx)} ${f(ty)}Q${f(c2x)} ${f(c2y)} ${f(b2x)} ${f(b2y)}Z`;
  }
  let flowers = "";
  for (let i = 0; i <= 8; i++) {
    const { p } = quadAt([196, 528], [300, 650], [404, 528], i / 8);
    for (let k = 0; k < 5; k++) {
      const [x, y] = polar(p[0], p[1], 5, k * 72 - 90);
      flowers += circleD(x, y, 3.6);
    }
  }
  const eye = path("M262 456Q276 444 290 456Q276 462 262 456Z", filled(H, G, 1)) + circle(276, 455, 3, solid(K));
  return [
    path("M70 720Q200 690 300 712T530 700V780H70Z", filled(N2, SH, 1)),
    path(lemniscateD(300, 215, 58, 22), stroke(H, 3)),
    path(lemniscateD(300, 215, 58, 22), stroke(K, 1)),
    glow(ctx, 300, 470, 170),
    path(petals, filled(N2, G, 1.2)),
    circle(252, 414, 14, filled(N2, G, 1.4)),
    circle(348, 414, 14, filled(N2, G, 1.4)),
    circle(300, 470, 68, filled(N2, G, 2)),
    path("M258 444Q276 436 292 446M308 446Q324 436 342 444", stroke(SH, 1.4)),
    eye,
    mirrorX(eye),
    path("M288 478L312 478L300 496Z", filled(G, G, 1)),
    path("M300 496V506M300 506Q286 520 272 510M300 506Q314 520 328 510M276 526Q300 540 324 526", stroke(G, 1.6)),
    path(circleD(280, 504, 1.4) + circleD(272, 498, 1.4) + circleD(320, 504, 1.4) + circleD(328, 498, 1.4), solid(H)),
    path("M196 528Q300 650 404 528", stroke(G, 1.4)),
    path(flowers, filled(V2, H, 0.8)),
  ].join("");
}

function theHermit(ctx: Ctx): string {
  const peak = "M70 780L70 700L180 610L260 520L300 500L350 540L430 620L530 690V780Z";
  return [
    path(crescentD(452, 200, 20, 11, 200), solid(H)),
    glow(ctx, 280, 335, 140),
    path(raysD(280, 335, 30, 130, 36), stroke(H, 0.6, `opacity=".35"`)),
    path(peak, filled(N2, G, 1.8)),
    hatchIn(ctx, peak, 70, 500, 460, 280, 7, 30, SH, 0.6, 0.75),
    path("M260 520L300 500L350 540L330 536L316 548L300 530L282 544Z", solid(H, `opacity=".85"`)),
    path("M150 780Q170 680 222 530", stroke(H, 1, `stroke-dasharray="2 6" opacity=".7"`)),
    path("M220 524L220 282Q220 248 252 248Q280 248 280 278", stroke(G, 5.5)),
    path("M220 524L220 282Q220 248 252 248Q280 248 280 278", stroke(K, 1.6)),
    line(280, 278, 280, 293, stroke(H, 1.5)),
    poly([[264, 306], [296, 306], [280, 292]], filled(N2, G, 1.5)),
    rect(262, 306, 36, 52, filled(N, G, 1.8)),
    rect(268, 312, 24, 40, solid(H, `opacity=".25"`)),
    poly([[280, 319], [291, 338], [269, 338]], stroke(H, 1.5)),
    poly([[280, 345], [291, 326], [269, 326]], stroke(H, 1.5)),
    path("M280 306V358", stroke(G, 0.7, `opacity=".6"`)),
    poly([[262, 358], [298, 358], [290, 368], [270, 368]], filled(N2, G, 1.5)),
  ].join("");
}

function glyphAt(kind: "mercury" | "sulfur" | "salt" | "water", x: number, y: number): string {
  let d = "";
  switch (kind) {
    case "mercury":
      d = circleD(x, y - 2, 7) + `M${x - 8} ${y - 15}Q${x} ${y - 5} ${x + 8} ${y - 15}M${x} ${y + 5}V${y + 16}M${x - 5} ${y + 11}H${x + 5}`;
      break;
    case "sulfur":
      d = `M${x} ${y - 14}L${x + 11} ${y + 3}H${x - 11}ZM${x} ${y + 3}V${y + 16}M${x - 6} ${y + 10}H${x + 6}`;
      break;
    case "salt":
      d = circleD(x, y, 11) + `M${x - 11} ${y}H${x + 11}`;
      break;
    case "water":
      d = `M${x - 12} ${y - 8}H${x + 12}L${x} ${y + 12}Z`;
      break;
  }
  return path(d, stroke(H, 1.8));
}

function elementCloud(x: number, y: number, kind: number): string {
  const cloud = path(`M${x - 34} ${y + 12}a14 14 0 0 1 10 -22a18 18 0 0 1 34 -4a14 14 0 0 1 22 26Z`, filled(N2, SH, 1.2));
  const up = kind === 0 || kind === 2;
  const tri = up ? `M${x} ${y - 30}L${x + 11} ${y - 12}H${x - 11}Z` : `M${x} ${y - 10}L${x + 11} ${y - 28}H${x - 11}Z`;
  const bar = kind === 2 ? `M${x - 9} ${y - 20}H${x + 9}` : kind === 3 ? `M${x - 9} ${y - 22}H${x + 9}` : "";
  return cloud + path(tri + bar, stroke(H, 1.6));
}

function wheelOfFortune(ctx: Ctx): string {
  const kinds = ["mercury", "sulfur", "salt", "water"] as const;
  const glyphs = kinds.map((k, i) => {
    const [x, y] = polar(300, 450, 121, -45 + i * 90);
    return glyphAt(k, x, y);
  });
  let chev = "";
  for (let y = 600; y > 300; y -= 44) chev += `M486 ${y}L496 ${y - 12}L506 ${y}`;
  return [
    elementCloud(136, 312, 0),
    elementCloud(464, 312, 1),
    elementCloud(125, 715, 2),
    elementCloud(475, 715, 3),
    glow(ctx, 300, 450, 200),
    circle(300, 450, 160, filled(N2, G, 3)),
    circle(300, 450, 146, stroke(G, 1.2)),
    path(raysD(300, 450, 146, 160, 48), stroke(SH, 1)),
    path(raysD(300, 450, 40, 146, 8, 22.5), stroke(SH, 0.8)),
    path(raysD(300, 450, 40, 146, 8), stroke(H, 2.2)),
    circle(300, 450, 96, stroke(G, 2)),
    circle(300, 450, 40, filled(K, G, 2)),
    star8(300, 450, 30, filled(H, G, 1)),
    ...glyphs.map((gl, i) => {
      const [x, y] = polar(300, 450, 121, -45 + i * 90);
      return circle(x, y, 17, filled(K, G, 1)) + gl;
    }),
    path("M104 300C124 340 84 380 104 420C124 460 84 500 104 540C118 570 112 596 100 606", stroke(H, 3)),
    ellipse(100, 610, 6, 8, solid(H)),
    path(chev, stroke(H, 1.6)),
    poly([[300, 204], [306, 216], [306, 282], [294, 282], [294, 216]], filled(N2, H, 1.4)),
    path("M284 282H316", stroke(G, 4)),
    circle(300, 294, 5, filled(N2, G, 1.4)),
  ].join("");
}

function justice(ctx: Ctx): string {
  const pillar = (x: number) => rect(x, 280, 50, 450, filled(N2, G, 2)) + rect(x - 8, 266, 66, 14, filled(N2, G, 1.5)) + rect(x - 8, 728, 66, 14, filled(N2, G, 1.5));
  let folds = "";
  for (let x = 166; x < 440; x += 18) folds += `M${x} 312Q${x + 6} 500 ${x} 700`;
  const dais = "M190 650H410V720H190Z";
  const pan = (x: number) =>
    path(`M${x} 330L${x - 30} 452M${x} 330L${x + 30} 452`, stroke(H, 1.2, `stroke-dasharray="3 2"`)) +
    path(`M${x - 38} 452Q${x} 494 ${x + 38} 452Z`, filled(N2, G, 2)) +
    circle(x, 330, 4, solid(H));
  return [
    rect(150, 310, 300, 400, solid(V2, `opacity=".55"`)),
    path(folds, stroke(V, 0.9)),
    pillar(100),
    pillar(450),
    path(dais, filled(N2, G, 2)),
    hatchIn(ctx, dais, 190, 650, 220, 70, 8, 45, SH, 0.6, 0.8),
    hatchIn(ctx, dais, 190, 650, 220, 70, 8, -45, SH, 0.6, 0.8),
    rect(170, 720, 260, 24, filled(N2, G, 1.5)),
    glow(ctx, 300, 330, 150),
    poly([[300, 200], [311, 222], [311, 556], [289, 556], [289, 222]], filled(N2, H, 1.8)),
    line(300, 226, 300, 548, stroke(SH, 1)),
    rect(246, 556, 108, 12, filled(N2, G, 2), 4),
    circle(242, 562, 5, solid(G)),
    circle(358, 562, 5, solid(G)),
    rect(293, 568, 14, 52, filled(K, G, 1.5)),
    path("M293 578L307 574M293 590L307 586M293 602L307 598M293 614L307 610", stroke(SH, 1)),
    circle(300, 630, 10, filled(N2, G, 2)),
    line(166, 330, 434, 330, stroke(G, 4)),
    circle(300, 330, 9, filled(H, G, 1)),
    pan(166),
    pan(434),
  ].join("");
}

function theHangedMan(ctx: Ctx): string {
  let leaves = "";
  for (let x = 150; x <= 450; x += 38) leaves += leafD(x, 246, -60, 14, 4.5) + leafD(x + 12, 246, -120, 14, 4.5);
  for (let y = 320; y <= 660; y += 60) leaves += leafD(140, y, 200, 14, 4.5) + leafD(462, y + 20, -20, 14, 4.5);
  const trunk = (x: number) =>
    poly([[x - 14, 720], [x - 6, 270], [x + 14, 270], [x + 22, 720]], filled(N2, G, 1.8)) +
    path(`M${x} 300Q${x + 6} 340 ${x} 380M${x + 8} 440Q${x + 2} 490 ${x + 8} 540M${x} 600Q${x + 6} 640 ${x + 2} 690`, stroke(SH, 0.9));
  return [
    path("M70 712Q300 690 530 712V780H70Z", filled(N2, SH, 1)),
    path(waveD(90, 520, 742, 3, 40), stroke(SH, 0.8)),
    trunk(152),
    trunk(440),
    path("M130 246H470V272H130Z", filled(N2, G, 1.8)),
    path("M150 259H220M250 256H330M360 260H450", stroke(SH, 0.9)),
    path(leaves, filled(V2, H, 0.8)),
    line(300, 272, 300, 350, stroke(H, 1.6, `stroke-dasharray="4 2"`)),
    circle(300, 350, 4, solid(H)),
    path("M300 350V430M272 382H328", stroke(G, 4.5)),
    poly([[246, 432], [354, 432], [300, 524]], filled(N2, G, 2.5)),
    poly([[268, 446], [332, 446], [300, 500]], stroke(SH, 1)),
    glow(ctx, 300, 566, 110),
    path(raysD(300, 566, 46, 104, 24), stroke(H, 0.9, `opacity=".6"`)),
    circle(300, 566, 40, filled(N, H, 2)),
    circle(300, 566, 28, stroke(G, 1)),
    sparkle(300, 566, 16, solid(H)),
  ].join("");
}

function death(ctx: Ctx): string {
  const tower = (x: number) => rect(x, 440, 40, 120, filled(N2, G, 1.5)) + path(crenellated(x, x + 40, 430, 8), filled(N2, G, 1.2)) + path(`M${x + 14} 490V474A6 6 0 0 1 ${x + 26} 474V490Z`, solid(H, `opacity=".7"`));
  const river = "M282 562C250 610 330 640 260 700C210 740 200 760 190 780L340 780C320 760 300 740 330 700C380 640 300 610 318 562Z";
  let petals = "";
  for (let k = 0; k < 5; k++) {
    const [x, y] = polar(214, 306, 15, k * 72 - 90);
    petals += circleD(x, y, 14);
  }
  return [
    glow(ctx, 300, 560, 160),
    path(raysRangeD(300, 560, 54, 150, 196, 344, 13), stroke(H, 0.9, `opacity=".6"`)),
    path("M252 560A48 48 0 0 1 348 560Z", filled(H, G, 1.5)),
    tower(208),
    tower(352),
    rect(70, 560, 460, 220, solid(N2)),
    hatchIn(ctx, "M70 560H530V780H70Z", 70, 560, 460, 220, 9, 0, SH, 0.6, 0.6),
    line(70, 560, 530, 560, stroke(SH, 1.2)),
    path(river, filled(V2, G, 1.2)),
    path("M296 590q8 -4 16 0M286 640q10 -5 20 0M268 690q12 -5 24 0M236 740q14 -6 28 0M216 770q14 -6 28 0", stroke(H, 0.9)),
    line(130, 780, 130, 222, stroke(G, 4)),
    star(130, 212, 4, 11, 3, solid(H)),
    path("M134 236Q210 222 296 246Q280 312 292 380Q210 360 134 376Z", filled(K, G, 2)),
    path("M146 248Q210 236 280 254Q268 312 278 366Q210 350 146 362Z", stroke(SH, 0.9)),
    path(petals, filled(H, G, 0.8)),
    circle(214, 306, 9, solid(G)),
    star(214, 306, 5, 7, 3, solid(K)),
    path("M432 724L432 704L444 716L460 698L476 716L488 704L488 724Z", filled(N2, G, 1.6, `transform="rotate(20 460 712)"`)),
    path(circleD(460, 704, 2.4) + circleD(444, 716, 2) + circleD(476, 716, 2), solid(H, `transform="rotate(20 460 712)"`)),
  ].join("");
}

function temperance(ctx: Ctx): string {
  const land = "M70 520L170 430L250 490L300 474L350 490L430 430L530 520V780H70Z";
  const iris = (x: number, y: number) =>
    path(`M${x} ${y + 40}V${y}`, stroke(G, 1.4)) +
    path(leafD(x, y + 40, -100, 30, 4), filled(N2, G, 0.8)) +
    path(leafD(x, y, -90, 18, 5) + leafD(x, y, -150, 15, 5) + leafD(x, y, -30, 15, 5), filled(V, H, 0.8));
  return [
    path(land, filled(N2, SH, 1.2)),
    hatchIn(ctx, land, 70, 430, 460, 350, 9, 0, SH, 0.5, 0.5),
    glow(ctx, 300, 470, 120),
    path(raysRangeD(300, 474, 36, 110, 196, 344, 11), stroke(H, 0.9, `opacity=".6"`)),
    path("M268 474A32 32 0 0 1 332 474Z", filled(H, G, 1.2)),
    path("M280 428L284 412L292 422L300 406L308 422L316 412L320 428Z", filled(N2, H, 1.2)),
    path("M232 780Q270 620 296 480M330 780Q312 620 304 480", stroke(H, 1, `stroke-dasharray="3 4"`)),
    ellipse(168, 706, 96, 30, filled(V2, G, 1.5)),
    ellipse(168, 706, 60, 18, stroke(H, 0.8, `opacity=".7"`)),
    ellipse(168, 706, 28, 8, stroke(H, 0.8, `opacity=".7"`)),
    iris(452, 690),
    iris(486, 672),
    iris(510, 704),
    rect(276, 214, 48, 48, stroke(G, 1.6)),
    poly([[300, 222], [320, 256], [280, 256]], stroke(H, 1.6)),
    path("M244 306Q350 300 402 514", stroke(H, 2)),
    path("M238 312Q342 312 396 514M250 300Q358 290 408 512", stroke(G, 1, `opacity=".8"`)),
    emblem("cups", 190, 320, 110, 40),
    emblem("cups", 410, 560, 110, -10),
  ].join("");
}

function chainAlong(p0: Pt, c: Pt, p1: Pt, n: number): string {
  let out = "";
  for (let i = 0; i <= n; i++) {
    const { p, deg } = quadAt(p0, c, p1, i / n);
    out += ellipse(0, 0, 5.5, 3, stroke(H, 1.4, `transform="translate(${f(p[0])} ${f(p[1])}) rotate(${f(deg + (i % 2 ? 0 : 0))})"`));
  }
  return out;
}

function theDevil(ctx: Ctx): string {
  const wing =
    path("M300 360L118 270L104 336Q128 330 140 358Q160 344 178 378Q198 360 216 394Q244 376 300 412Z", filled(K, G, 1.6)) +
    path("M300 370L118 274M300 380L140 356M300 390L178 376M300 400L216 392", stroke(SH, 1));
  const horn = dbl("M284 340Q236 322 240 262", 5);
  const block = "M226 470H374V566H226Z";
  return [
    rect(70, 720, 460, 60, solid(K)),
    line(70, 720, 530, 720, stroke(SH, 1)),
    glow(ctx, 300, 200, 80),
    circle(300, 196, 46, filled(N2, G, 2)),
    path(pentagramD(300, 196, 40, 90), stroke(H, 1.8)),
    wing,
    mirrorX(wing),
    horn,
    mirrorX(horn),
    poly([[268, 330], [332, 330], [300, 404]], filled(N2, G, 1.6)),
    path(circleD(286, 348, 3) + circleD(314, 348, 3), solid(H)),
    path(block, filled(N2, G, 2)),
    hatchIn(ctx, block, 226, 470, 148, 96, 7, 0, SH, 0.6, 0.8),
    rect(214, 458, 172, 14, filled(K, G, 1.5)),
    circle(300, 526, 12, stroke(H, 2.5)),
    chainAlong([300, 538], [240, 690], [186, 684], 12),
    chainAlong([300, 538], [360, 690], [414, 684], 12),
    path(arcD(176, 700, 16, -40, 220), stroke(H, 3)),
    path(arcD(424, 700, 16, -40, 220), stroke(H, 3)),
    line(410, 420, 452, 520, stroke(G, 4)),
    flame(458, 536, 1.1, 157, V2, H),
  ].join("");
}

function theTower(ctx: Ctx): string {
  const rock = "M150 780L170 720L200 700L230 668L370 668L400 700L432 722L452 780Z";
  const body = "M236 668L256 312L344 312L364 668Z";
  const win = (x: number, y: number) => path(`M${x - 8} ${y + 14}V${y}A8 8 0 0 1 ${x + 8} ${y}V${y + 14}Z`, filled(K, G, 1.2)) + flame(x, y - 2, 0.7, 0, V2, H);
  const drops: string[] = [];
  const spots: Pt[] = [[200, 360], [188, 440], [214, 520], [176, 600], [412, 380], [426, 470], [400, 540], [432, 612], [150, 500], [452, 320], [380, 250], [220, 260]];
  spots.forEach(([x, y], i) => drops.push(drop(x, y, 1.3, i % 2 ? 10 : -10)));
  return [
    glow(ctx, 300, 300, 120),
    path(rock, filled(N2, G, 1.8)),
    hatchIn(ctx, rock, 150, 668, 302, 112, 7, 35, SH, 0.6, 0.8),
    path(body, filled(N2, G, 2.2)),
    hatchIn(ctx, body, 236, 312, 128, 356, 16, 0, SH, 0.8, 0.8),
    path(crenellated(248, 352, 292, 13), filled(N2, G, 1.5)),
    win(300, 380),
    win(270, 500),
    win(330, 570),
    path("M318 292L298 350L318 400L288 470L310 530L284 600L302 668L290 668L272 600L298 530L276 470L306 400L286 350L306 292Z", filled(K, H, 0.8)),
    path("M372 252L372 232L384 242L394 224L404 240L416 232L416 252Z", filled(H, G, 1.2, `transform="rotate(28 394 240)"`)),
    poly([[150, 140], [238, 226], [216, 232], [300, 300], [230, 250], [252, 244], [168, 150]], filled(H, G, 0.8)),
    poly([[184, 300], [194, 296], [198, 306], [188, 310]], filled(N2, G, 1)),
    poly([[420, 420], [432, 418], [434, 430], [422, 432]], filled(N2, G, 1)),
    poly([[160, 640], [170, 634], [176, 644], [166, 650]], filled(N2, G, 1)),
    ...drops,
  ].join("");
}

function amphora(x: number, y: number, rot: number): string {
  return g(
    `translate(${x} ${y}) rotate(${rot})`,
    path("M-6 -34H6L5 -26Q20 -20 20 0Q20 22 0 30Q-20 22 -20 0Q-20 -20 -5 -26Z", filled(N2, G, 1.6)) +
      path("M-12 -20Q-26 -18 -18 -4M12 -20Q26 -18 18 -4", stroke(G, 1.4)) +
      path("M-19 -2H19M-17 8H17", stroke(SH, 1)) +
      path("M-8 30H8L10 36H-10Z", filled(N2, G, 1.2)),
  );
}

function theStar(ctx: Ctx): string {
  const small: Pt[] = [[130, 180], [470, 180], [110, 300], [490, 300], [160, 420], [440, 420], [300, 404]];
  const land = "M70 620Q160 590 260 616T530 604V780H70Z";
  return [
    glow(ctx, 300, 250, 150),
    path(raysD(300, 250, 70, 145, 32), stroke(H, 0.7, `opacity=".55"`)),
    star(300, 250, 8, 86, 30, filled(H, G, 1.4)),
    star(300, 250, 8, 58, 22, filled(N2, G, 1), -90 + 22.5),
    star8(300, 250, 16, solid(H)),
    ...small.map(([x, y]) => star(x, y, 8, 15, 5, filled(H, G, 0.8))),
    path(land, filled(N2, SH, 1.2)),
    hatchIn(ctx, land, 70, 590, 460, 190, 8, 0, SH, 0.5, 0.6),
    ellipse(250, 694, 150, 40, filled(V2, G, 1.5)),
    ellipse(250, 694, 100, 26, stroke(H, 0.8, `opacity=".7"`)),
    ellipse(232, 684, 26, 7, stroke(H, 0.8, `opacity=".8"`)),
    path("M110 612V530", stroke(G, 3)),
    circle(110, 512, 26, filled(N2, SH, 1.2)),
    path("M98 488Q110 476 122 486Q114 488 112 496ZM120 484Q128 472 134 478L148 484", filled(H, H, 1)),
    path("M216 562Q234 610 232 680", stroke(H, 2)),
    path("M406 562Q422 610 420 660M420 660Q400 676 384 690M420 660Q410 684 402 700M420 660Q426 684 428 706M420 660Q440 680 452 698M420 660Q452 670 472 686", stroke(H, 1.4)),
    amphora(190, 540, 130),
    amphora(380, 540, 130),
  ].join("");
}

function theMoon(ctx: Ctx): string {
  const drops: string[] = [];
  for (let i = 0; i < 13; i++) {
    const [x, y] = polar(300, 250, 140, 30 + i * 10);
    drops.push(drop(x, y, 1.1, 180));
  }
  const tower = (x: number) => rect(x, 420, 56, 170, filled(K, G, 1.8)) + path(crenellated(x - 4, x + 60, 404, 8), filled(K, G, 1.4)) + path(`M${x + 20} 480V462A8 8 0 0 1 ${x + 36} 462V480Z`, solid(H, `opacity=".7"`));
  return [
    glow(ctx, 300, 250, 150),
    path(raysD(300, 250, 82, 124, 16), stroke(H, 1.2)),
    path(raysD(300, 250, 82, 104, 16, 11.25), stroke(G, 0.8)),
    circle(300, 250, 72, filled(N2, H, 2)),
    path(crescentD(300, 250, 64, 44, 0), solid(H, `opacity=".9"`)),
    path("M318 220q8 -4 14 2M318 256q10 6 18 -2", stroke(SH, 1.2)),
    ...drops,
    path("M70 530Q150 490 220 520T380 510T530 520", stroke(SH, 1)),
    rect(70, 568, 460, 212, solid(N2)),
    line(70, 568, 530, 568, stroke(SH, 1)),
    tower(92),
    tower(452),
    path("M292 570C240 610 360 630 280 690L320 690C400 630 290 610 308 570Z", filled(SH, G, 1, `fill-opacity=".3"`)),
    path("M300 572C270 610 350 630 300 690", stroke(H, 0.8, `stroke-dasharray="2 5"`)),
    path("M70 690Q300 670 530 690V780H70Z", filled(V2, G, 1.5)),
    path(waveD(80, 530, 740, 3, 36), stroke(SH, 0.9)),
    path(waveD(70, 530, 762, 3, 44), stroke(SH, 0.8)),
    ellipse(300, 724, 10, 18, filled(N2, H, 1.2)),
    path("M291 730H309M292 737H308M294 744H306", stroke(SH, 0.9)),
    path("M294 710L284 698M306 710L316 698M296 716L282 720M304 716L318 720", stroke(H, 1.2)),
    ellipse(0, 0, 5, 9, filled(N2, H, 1, `transform="translate(282 690) rotate(-25)"`)),
    ellipse(0, 0, 5, 9, filled(N2, H, 1, `transform="translate(318 690) rotate(25)"`)),
    path("M296 708Q286 680 270 670M304 708Q314 680 330 670", stroke(H, 0.8)),
  ].join("");
}

function theSun(ctx: Ctx): string {
  let straight = "";
  let wavy = "";
  for (let i = 0; i < 24; i++) {
    const a = i * 15;
    if (i % 2 === 0) {
      const [b1x, b1y] = polar(300, 300, 86, a - 4);
      const [b2x, b2y] = polar(300, 300, 86, a + 4);
      const [tx, ty] = polar(300, 300, 178, a);
      straight += `M${f(b1x)} ${f(b1y)}L${f(tx)} ${f(ty)}L${f(b2x)} ${f(b2y)}Z`;
    } else {
      for (let k = 0; k <= 10; k++) {
        const r = 88 + k * 7.4;
        const [x, y] = polar(300, 300, r, a + Math.sin(k * 1.2) * 3);
        wavy += `${k === 0 ? "M" : "L"}${f(x)} ${f(y)}`;
      }
    }
  }
  let bricks = "M70 584H530M70 608H530M70 632H530";
  for (let row = 0; row < 4; row++) {
    const y0 = 560 + row * 24;
    for (let x = 70 + (row % 2 ? 23 : 46); x < 530; x += 46) bricks += `M${x} ${y0}V${y0 + 24}`;
  }
  const sunflower = (x: number, y: number) =>
    path(`M${x} 560V${y}`, stroke(G, 2)) +
    path(leafD(x, y + 24, -30, 16, 5) + leafD(x, y + 18, 210, 14, 5), filled(N2, G, 0.9)) +
    star(x, y, 14, 22, 12, filled(H, G, 0.8)) +
    circle(x, y, 10, filled(N2, G, 1)) +
    path(circleD(x - 3, y - 3, 1.4) + circleD(x + 3, y - 2, 1.4) + circleD(x, y + 3, 1.4), solid(H));
  return [
    glow(ctx, 300, 300, 200),
    path(straight, filled(H, G, 0.8, `opacity=".9"`)),
    path(wavy, stroke(H, 1.6)),
    circle(300, 300, 78, filled(H, G, 2)),
    circle(300, 300, 64, stroke(SH, 1.2)),
    circle(300, 300, 46, stroke(SH, 1)),
    star8(300, 300, 26, filled(G, SH, 1)),
    rect(70, 560, 460, 96, filled(N2, G, 2)),
    path(bricks, stroke(SH, 1)),
    rect(64, 550, 472, 12, filled(K, G, 1.5)),
    sunflower(140, 516),
    sunflower(240, 506),
    sunflower(360, 506),
    sunflower(460, 516),
    path("M120 694Q210 674 300 694T480 694L480 734Q390 714 300 734T120 734Z", filled(V2, H, 1.5)),
    path("M120 680V780M480 680V780", stroke(G, 2.5)),
    path("M120 714Q210 694 300 714T480 714", stroke(SH, 0.8)),
  ].join("");
}

function judgement(ctx: Ctx): string {
  let bumps = "";
  for (let x = 60; x <= 540; x += 34) bumps += circleD(x, 236 + ((x / 34) % 2) * 8, 26);
  const mtn = "M70 610L130 520L170 560L230 480L290 570L350 500L410 560L470 490L530 580V620H70Z";
  let waves = "";
  for (let i = 0; i < 8; i++) waves += waveD(70 + (i % 2) * 14, 530, 636 + i * 18, 3, 38);
  const tomb = (x: number, y: number, w: number) =>
    poly([[x + 8, y - 12], [x + w - 8, y - 12], [x + w, y], [x, y]], filled(K, G, 1)) +
    rect(x, y, w, 30, filled(N2, G, 1.5)) +
    poly([[x + w - 4, y - 4], [x + w + 18, y - 40], [x + w + 26, y - 34], [x + w + 4, y + 2]], filled(N2, SH, 1)) +
    path(`M${x + w / 2} ${y - 14}V${y - 120}M${x + w / 2 - 20} ${y - 14}V${y - 90}M${x + w / 2 + 20} ${y - 14}V${y - 90}`, stroke(H, 1, `stroke-dasharray="3 5" opacity=".7"`));
  return [
    path(mtn, filled(N2, H, 1.2)),
    path("M230 480L242 500L230 496L220 504ZM470 490L480 508L470 504L460 510Z", solid(H, `opacity=".8"`)),
    rect(70, 618, 460, 162, solid(N)),
    path(waves, stroke(SH, 0.9)),
    tomb(104, 670, 90),
    tomb(250, 690, 92),
    tomb(390, 670, 90),
    path(raysRangeD(212, 386, 30, 330, 70, 150, 13), stroke(H, 0.7, `opacity=".45"`)),
    rect(70, 120, 460, 118, solid(N2)),
    path(bumps, filled(N2, G, 2.6)),
    path(bumps, solid(N2)),
    path(waveD(80, 520, 222, 5, 48), stroke(SH, 1, `opacity=".8"`)),
    path(waveD(100, 500, 196, 4, 40), stroke(SH, 0.8, `opacity=".6"`)),
    path("M360 248L232 366", stroke(H, 5)),
    path("M360 248L232 366", stroke(K, 1.4)),
    path("M253.4 353.7L232.4 408L191.6 364L246.6 346.3Z", filled(H, G, 1.2)),
    line(232.4, 408, 191.6, 364, stroke(G, 2.4)),
    poly([[321.6, 283.4], [283.2, 318.8], [283.2, 388.8], [321.6, 353.4]], filled(N, G, 1.5)),
    path("M302.4 304V368M288 336H316", stroke(H, 3)),
    glow(ctx, 210, 386, 60),
  ].join("");
}

function zodiac(kind: "aquarius" | "scorpio" | "taurus" | "leo", x: number, y: number): string {
  let d = "";
  switch (kind) {
    case "aquarius":
      d = `M${x - 14} ${y - 3}l7 -6l7 6l7 -6l7 6M${x - 14} ${y + 7}l7 -6l7 6l7 -6l7 6`;
      break;
    case "scorpio":
      d = `M${x - 14} ${y + 10}V${y - 6}q0 -6 5 -6t5 6V${y + 10}M${x - 4} ${y - 6}q0 -6 5 -6t5 6V${y + 8}q0 4 4 4l4 -4M${x + 14} ${y + 12}l0 -6l-6 0`;
      break;
    case "taurus":
      d = circleD(x, y + 5, 9) + `M${x - 14} ${y - 12}Q${x} ${y + 4} ${x + 14} ${y - 12}`;
      break;
    case "leo":
      d = circleD(x - 7, y + 6, 5) + `M${x - 3} ${y + 3}C${x - 10} ${y - 8} ${x - 2} ${y - 14} ${x + 4} ${y - 12}C${x + 12} ${y - 9} ${x + 10} ${y} ${x + 4} ${y + 6}C${x} ${y + 11} ${x + 8} ${y + 15} ${x + 14} ${y + 10}`;
      break;
  }
  return circle(x, y, 30, filled(N2, G, 1.8)) + circle(x, y, 24, stroke(SH, 0.9)) + path(d, stroke(H, 2));
}

function theWorld(ctx: Ctx): string {
  const cx = 300;
  const cy = 470;
  const rx = 130;
  const ry = 190;
  let leaves = "";
  const count = 40;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const deg = (t * 180) / Math.PI;
    if (Math.abs(deg - 90) < 14 || Math.abs(deg - 270) < 14) continue;
    const x = cx + rx * Math.cos(t);
    const y = cy + ry * Math.sin(t);
    const tan = (Math.atan2(ry * Math.cos(t), -rx * Math.sin(t)) * 180) / Math.PI;
    leaves += leafD(x, y, tan - 32, 18, 5) + leafD(x, y, tan + 32, 18, 5);
  }
  const bow = (y: number) =>
    path(lemniscateD(300, y, 28, 13), filled(V, H, 1.5)) +
    path(`M300 ${y}Q290 ${y + 26} 280 ${y + 36}M300 ${y}Q310 ${y + 26} 322 ${y + 34}`, stroke(V, 3)) +
    circle(300, y, 4, solid(H));
  return [
    zodiac("aquarius", 122, 330),
    zodiac("scorpio", 478, 330),
    zodiac("taurus", 122, 715),
    zodiac("leo", 478, 715),
    glow(ctx, cx, cy, 200),
    ellipse(cx, cy, rx, ry, stroke(SH, 1.5)),
    path(leaves, filled(N2, G, 1)),
    bow(280),
    bow(660),
    circle(cx, cy, 72, filled(N2, G, 2)),
    ellipse(cx, cy, 24, 72, stroke(SH, 1)),
    ellipse(cx, cy, 50, 72, stroke(SH, 1)),
    path("M228 470H372M236 434H364M236 506H364", stroke(SH, 1)),
    ellipse(cx, cy, 104, 22, stroke(H, 1.3, `transform="rotate(-20 300 470)"`)),
    star8(300, 362, 16, filled(H, G, 0.8)),
    sparkle(300, 580, 10, solid(H)),
  ].join("");
}

// ---------------------------------------------------------------------------

type MajorFn = (ctx: Ctx) => string;

const MAJORS: Record<string, MajorFn> = {
  "the-fool": theFool,
  "the-magician": theMagician,
  "the-high-priestess": theHighPriestess,
  "the-empress": theEmpress,
  "the-emperor": theEmperor,
  "the-hierophant": theHierophant,
  "the-lovers": theLovers,
  "the-chariot": theChariot,
  strength,
  "the-hermit": theHermit,
  "wheel-of-fortune": wheelOfFortune,
  justice,
  "the-hanged-man": theHangedMan,
  death,
  temperance,
  "the-devil": theDevil,
  "the-tower": theTower,
  "the-star": theStar,
  "the-moon": theMoon,
  "the-sun": theSun,
  judgement,
  "the-world": theWorld,
};

export const MAJOR_DESCRIPTIONS: Record<string, string> = {
  "the-fool":
    "An open doorway stands alone on the edge of a cliff beneath a single eight-pointed star, while a feather drifts down toward the misty abyss below.",
  "the-magician":
    "A wand crowned with a star rises above an altar bearing a small staff, chalice, sword and pentacle, with the infinity sign glowing overhead and roses and lilies below.",
  "the-high-priestess":
    "A veil patterned with pomegranates hangs between a dark violet pillar and a pale pillar, crowned by a triple moon, with a half-rolled scroll and a crescent resting on still water.",
  "the-empress":
    "A heart-shaped shield bearing the sign of Venus sits beneath a crown of twelve stars, between two cypress trees and above a field of ripening wheat.",
  "the-emperor":
    "A squared stone throne with spiralled ram's horns at its corners holds an upright ankh sceptre and an orb, set against sharp mountains beneath the sign of Aries.",
  "the-hierophant":
    "A triple-tiered tiara stands between twin columns above a pair of crossed keys, beside a staff with three crossbars, on a chequered floor.",
  "the-lovers":
    "A winged sun spreads its rays over a lone mountain set between a fruit tree coiled by a serpent and a tree of flame-like leaves, with two interlinked rings below.",
  "the-chariot":
    "A chariot bearing a winged disc waits beneath a star-strewn canopy before a walled city, guarded by two crouching sphinxes, one pale and one dark.",
  strength:
    "A calm lion's head with a radiant petalled mane wears a garland of flowers beneath the floating sign of infinity.",
  "the-hermit":
    "A lantern holding a six-pointed star hangs from a shepherd's crook on a snowy summit, casting a small circle of light into the night under a thin crescent moon.",
  "wheel-of-fortune":
    "A great eight-spoked wheel inscribed with alchemical signs turns at the centre, a serpent descending at its side and a sword poised on top, with the four elemental sigils resting on clouds in the corners.",
  justice:
    "An upright double-edged sword rises through the centre of a balanced pair of scales, framed by two pillars and a violet veil above a stone dais.",
  "the-hanged-man":
    "From the beam of a leafy T-shaped living tree hangs an inverted emblem, a cross above a downward triangle, ending in a radiant halo near the ground.",
  death:
    "A black banner bearing a five-petalled pale rose flies beside a river that winds toward a sun setting between two towers, with a fallen crown lying on the shore.",
  temperance:
    "A stream of water arcs from one tilted chalice into another above a still pool with irises, as a path climbs toward a crowned sunrise between two peaks.",
  "the-devil":
    "Beneath an inverted pentagram, dark bat-like wings and curling horns spread over a squat pedestal from which two loose chains droop to open shackles, beside a torch held flame-down.",
  "the-tower":
    "A tall stone tower on a jagged peak is split from top to base by a bolt of lightning, its crown toppling as flames, sparks and stones fall through the night.",
  "the-star":
    "A great eight-pointed star shines amid seven smaller stars over a pool, as two vessels pour water, one into the pool and one onto the land in five streams, beside a tree with a resting bird.",
  "the-moon":
    "A full moon cradling a crescent sheds falling drops of light over a winding path between two towers, while a crayfish emerges from the pool in the foreground.",
  "the-sun":
    "A blazing sun with alternating straight and wavy rays shines over a brick garden wall lined with four sunflowers, a rippling banner stretched between poles below.",
  judgement:
    "A trumpet bearing a cross-marked banner sounds from the clouds, its rays falling on three open coffins afloat on the sea beneath snowy peaks.",
  "the-world":
    "A laurel wreath bound with violet ribbons encircles a ringed globe under a star, with the signs of Aquarius, Scorpio, Taurus and Leo in medallions at the four corners.",
};

/** Fallback for an unknown major id: a generic radiant star emblem. */
function fallbackMajor(ctx: Ctx): string {
  return glow(ctx, 300, 450, 180) + path(raysD(300, 450, 60, 180, 32), stroke(H, 0.8, `opacity=".6"`)) + star8(300, 450, 90, filled(H, G, 1.4)) + circle(300, 450, 22, solid(K));
}

export function renderMajorIllustration(ctx: Ctx, id: string): string {
  const fn = MAJORS[id] ?? fallbackMajor;
  return fn(ctx);
}

export function hasMajor(id: string): boolean {
  return id in MAJORS;
}

export const MAJOR_IDS: readonly string[] = Object.keys(MAJORS);
