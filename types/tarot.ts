// Shared tarot domain types. Deck data, artwork, spreads, AI and UI all depend on these.

export type Arcana = "major" | "minor";

export type Suit = "wands" | "cups" | "swords" | "pentacles";

export type MinorRank =
  | "ace"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten"
  | "page"
  | "knight"
  | "queen"
  | "king";

export type Element = "fire" | "water" | "air" | "earth" | "spirit";

export type Orientation = "upright" | "reversed";

/**
 * How a spread position wants a card read. Each card carries a short
 * interpretation for each lens, so position-specific meaning is data-driven.
 */
export type PositionLens = "self" | "obstacle" | "guidance" | "outcome";

/** A card record as authored in lib/tarot/deck/*. Artwork metadata is merged in later. */
export interface TarotCardData {
  /** Stable, URL-safe id, e.g. "the-fool", "ace-of-wands", "queen-of-cups". */
  id: string;
  name: string;
  arcana: Arcana;
  /** Major: 0–21. Minor: 1 (ace) – 14 (king). */
  number: number;
  suit: Suit | null;
  rank: MinorRank | null;
  element: Element;
  /** Original archetype title for this deck, e.g. "The Unwritten Step". */
  archetype: string;
  keywords: { upright: string[]; reversed: string[] };
  /** Symbolic associations (objects, colours, celestial ties). */
  symbols: string[];
  /** 2–3 sentence upright interpretation. */
  upright: string;
  /** 2–3 sentence reversed interpretation. */
  reversed: string;
  /** One sentence per lens, written for the upright card; reversed nuance comes from `reversed`. */
  lenses: Record<PositionLens, string>;
}

export interface TarotCard extends TarotCardData {
  /** Generic outlook ("what may unfold") for each orientation, used when no AI interpreter is available. */
  prediction: Record<Orientation, string>;
  /** Unique artwork reference, e.g. "arcana-art://the-fool". */
  artwork: string;
  /** Accessibility description of the card's artwork. */
  altText: string;
}

export interface SpreadPosition {
  id: string;
  label: string;
  /** What this position asks of the card. */
  prompt: string;
  lens: PositionLens;
  /** Layout in card-width units, origin at spread centre; +y is up/away from the reader. */
  x: number;
  y: number;
  /** Extra rotation in degrees around the card's normal (e.g. the Celtic Cross crossing card). */
  rotation?: number;
}

export type SpreadId = "daily" | "three-card" | "decision" | "celtic-cross";

export interface SpreadDefinition {
  id: SpreadId;
  name: string;
  tagline: string;
  description: string;
  /** Instructions for the interpreter about how positions relate. */
  interpretationGuide: string;
  positions: SpreadPosition[];
}

export interface DrawnCard {
  cardId: string;
  orientation: Orientation;
  positionId: string;
}
