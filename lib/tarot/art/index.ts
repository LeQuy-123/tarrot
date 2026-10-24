// ARCANA card artwork: pure, deterministic SVG string generators.
// No React, DOM or browser APIs — safe for server, client and canvas rasterisation.

import type { MinorRank, Suit } from "@/types/tarot";
import { renderBackSvg } from "./back";
import {
  ARCH_POINTED,
  ARCH_ROUND,
  backdrop,
  baseDefs,
  cardBorder,
  cartouche,
  headerPlaque,
  panelFill,
  panelOutline,
  spandrels,
} from "./frame";
import { MAJOR_DESCRIPTIONS, renderMajorIllustration } from "./majors";
import { describeMinor, minorHeaderEmblems, minorHeaderLabel, rankForNumber, renderMinorIllustration } from "./minors";
import { C, escapeXml, hashString, makeCtx, sparkle, solid, toRoman } from "./util";

export interface ArtInput {
  id: string;
  name: string;
  arcana: "major" | "minor";
  number: number;
  suit: Suit | null;
  rank: MinorRank | null;
}

export const CARD_ART_WIDTH = 600;
export const CARD_ART_HEIGHT = 1000;

function prefixFor(id: string): string {
  const safe = id.toLowerCase().replace(/[^a-z0-9-]/g, "");
  return `arc-${safe || "card"}`;
}

function inferSuit(card: ArtInput): Suit {
  if (card.suit) return card.suit;
  const m = /-of-(wands|cups|swords|pentacles)$/.exec(card.id);
  return (m ? m[1] : "wands") as Suit;
}

/** Full standalone SVG document for a card front (600×1000). */
export function renderCardFront(card: ArtInput): string {
  const ctx = makeCtx(prefixFor(card.id), hashString(card.id));
  baseDefs(ctx);
  const isMajor = card.arcana === "major";
  const arch = isMajor ? ARCH_POINTED : ARCH_ROUND;
  const clipId = `${ctx.prefix}-clip`;
  ctx.defs.push(`<clipPath id="${clipId}"><path d="${arch}"/></clipPath>`);

  const sky = backdrop(ctx);
  let art: string;
  let header: string;
  if (isMajor) {
    art = renderMajorIllustration(ctx, card.id);
    header =
      headerPlaque(toRoman(card.number), toRoman(card.number).length > 4 ? 24 : 28) +
      sparkle(196, 80, 9, solid(C.gold)) +
      sparkle(404, 80, 9, solid(C.gold));
  } else {
    const suit = inferSuit(card);
    const rank = card.rank ?? rankForNumber(card.number);
    art = renderMinorIllustration(ctx, suit, rank, card.number);
    const { label, size } = minorHeaderLabel(rank, card.number);
    header = headerPlaque(label, size) + minorHeaderEmblems(suit);
  }

  const alt = describeArtwork(card);
  const body = [
    cardBorder(ctx),
    spandrels(isMajor),
    panelFill(ctx, arch),
    `<g clip-path="url(#${clipId})">${sky}${art}</g>`,
    panelOutline(arch),
    header,
    cartouche(card.name),
  ].join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_ART_WIDTH}" height="${CARD_ART_HEIGHT}" viewBox="0 0 ${CARD_ART_WIDTH} ${CARD_ART_HEIGHT}" role="img" aria-label="${escapeXml(alt)}">` +
    `<defs>${ctx.defs.join("")}</defs>` +
    `<g stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`
  );
}

/** Shared card back (600×1000), symmetric under 180° rotation. */
export function renderCardBack(): string {
  return renderBackSvg(CARD_ART_WIDTH, CARD_ART_HEIGHT);
}

/** Accessibility description of what is drawn on the card front. */
export function describeArtwork(card: ArtInput): string {
  if (card.arcana === "major") {
    const d = MAJOR_DESCRIPTIONS[card.id];
    const numeral = toRoman(card.number);
    if (d) return `${card.name} (${numeral}): ${d}`;
    return `${card.name} (${numeral}): a radiant eight-pointed star within a gold-framed pointed arch.`;
  }
  const suit = inferSuit(card);
  const rank = card.rank ?? rankForNumber(card.number);
  return describeMinor(suit, rank, card.number, card.name);
}

export function artworkRef(id: string): string {
  return `arcana-art://${id}`;
}
