import type { SpreadDefinition } from "@/types/tarot";
import { spreadBounds } from "@/lib/tarot/spreads";

export const CARD_W = 1;
export const CARD_H = 5 / 3;
export const CARD_T = 0.016;
export const SLOT_SPACING = 1.06;

export interface SlotPose {
  x: number;
  z: number;
  /** Rotation around world Y in radians (layout rotation only; reversal is added per card). */
  yaw: number;
}

export interface SpreadLayout {
  slots: SlotPose[];
  deck: { x: number; z: number };
  /** World-space rectangle that must stay in view: centre and size on the table plane. */
  frame: { cx: number; cz: number; width: number; depth: number };
}

/**
 * Converts a spread definition into table coordinates.
 * Portrait screens place the deck below the spread; landscape places it to the left.
 */
export function computeLayout(spread: SpreadDefinition, portrait: boolean): SpreadLayout {
  const b = spreadBounds(spread, CARD_H / CARD_W);
  const cx = ((b.minX + b.maxX) / 2) * SLOT_SPACING;
  const cy = ((b.minY + b.maxY) / 2) * SLOT_SPACING;

  const slots = spread.positions.map((p) => ({
    x: p.x * SLOT_SPACING - cx,
    z: -(p.y * SLOT_SPACING - cy),
    yaw: -((p.rotation ?? 0) * Math.PI) / 180,
  }));

  const halfW = (b.width * SLOT_SPACING) / 2;
  const halfD = (b.height * SLOT_SPACING) / 2;
  const gap = 0.55;

  if (portrait) {
    const deck = { x: 0, z: halfD + gap + CARD_H / 2 };
    return {
      slots,
      deck,
      frame: { cx: 0, cz: (deck.z + CARD_H / 2 - halfD) / 2, width: Math.max(halfW * 2, CARD_W), depth: halfD * 2 + gap + CARD_H },
    };
  }
  const deck = { x: -halfW - gap - CARD_W / 2, z: 0 };
  return {
    slots,
    deck,
    frame: { cx: (deck.x - CARD_W / 2 + halfW) / 2, cz: 0, width: halfW * 2 + gap + CARD_W, depth: Math.max(halfD * 2, CARD_H) },
  };
}
