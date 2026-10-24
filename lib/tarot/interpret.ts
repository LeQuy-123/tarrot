import type { Orientation, SpreadPosition, TarotCard } from "@/types/tarot";

/** The card's own meaning for an orientation. */
export function orientedMeaning(card: TarotCard, orientation: Orientation): string {
  return orientation === "upright" ? card.upright : card.reversed;
}

export function orientedKeywords(card: TarotCard, orientation: Orientation): string[] {
  return orientation === "upright" ? card.keywords.upright : card.keywords.reversed;
}

/**
 * Deterministic, position-aware reading of one card, built only from deck data.
 * Shown in the card detail panel regardless of AI availability.
 */
export function positionalMeaning(
  card: TarotCard,
  orientation: Orientation,
  position: SpreadPosition,
): { lens: string; meaning: string; keywords: string[] } {
  return {
    lens: card.lenses[position.lens],
    meaning: orientedMeaning(card, orientation),
    keywords: orientedKeywords(card, orientation),
  };
}

export function orientationLabel(orientation: Orientation): string {
  return orientation === "upright" ? "Upright" : "Reversed";
}
