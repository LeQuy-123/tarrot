import type { Orientation, PositionLens } from "@/types/tarot";

/** Vietnamese translation of one card's text content. Structure mirrors the English card record. */
export interface CardTranslation {
  name: string;
  archetype: string;
  keywords: { upright: string[]; reversed: string[] };
  symbols: string[];
  upright: string;
  reversed: string;
  lenses: Record<PositionLens, string>;
  prediction: Record<Orientation, string>;
  /** Accessibility description of the artwork. */
  altText: string;
}

export type CardTranslations = Record<string, CardTranslation>;
