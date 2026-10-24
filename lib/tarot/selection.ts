import type { DrawnCard, Orientation, SpreadDefinition } from "@/types/tarot";
import { randomInt, type RandomSource } from "./random";

export interface ShuffleOptions {
  /** Probability that a card lands reversed. 0 disables reversals. */
  reversalChance?: number;
}

export interface ShuffledCard {
  cardId: string;
  orientation: Orientation;
}

/** Fisher–Yates shuffle that also assigns each card an orientation. Pure given `random`. */
export function shuffleDeck(
  cardIds: readonly string[],
  random: RandomSource,
  { reversalChance = 0.3 }: ShuffleOptions = {},
): ShuffledCard[] {
  if (new Set(cardIds).size !== cardIds.length) {
    throw new Error("shuffleDeck: card ids must be unique");
  }
  const ids = [...cardIds];
  for (let i = ids.length - 1; i > 0; i--) {
    const j = randomInt(random, i + 1);
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.map((cardId) => ({
    cardId,
    orientation: random() < reversalChance ? "reversed" : "upright",
  }));
}

/**
 * Assigns the top of a shuffled deck to the spread's positions in order.
 * The reading result is fixed here; animation only reveals it.
 */
export function dealSpread(shuffled: readonly ShuffledCard[], spread: SpreadDefinition): DrawnCard[] {
  if (shuffled.length < spread.positions.length) {
    throw new Error(`dealSpread: need ${spread.positions.length} cards, have ${shuffled.length}`);
  }
  return spread.positions.map((position, i) => ({
    cardId: shuffled[i].cardId,
    orientation: shuffled[i].orientation,
    positionId: position.id,
  }));
}

export function drawSpread(
  cardIds: readonly string[],
  spread: SpreadDefinition,
  random: RandomSource,
  options?: ShuffleOptions,
): DrawnCard[] {
  return dealSpread(shuffleDeck(cardIds, random, options), spread);
}

/** Checks that a set of drawn cards is a valid, duplicate-free deal for the spread. */
export function validateDeal(
  cards: readonly DrawnCard[],
  spread: SpreadDefinition,
  knownCardIds: ReadonlySet<string>,
): string | null {
  if (cards.length !== spread.positions.length) {
    return `Expected ${spread.positions.length} cards for ${spread.name}, received ${cards.length}.`;
  }
  const seen = new Set<string>();
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (!knownCardIds.has(card.cardId)) return `Unknown card "${card.cardId}".`;
    if (seen.has(card.cardId)) return `Card "${card.cardId}" appears more than once.`;
    seen.add(card.cardId);
    if (card.positionId !== spread.positions[i].id) {
      return `Card ${i + 1} should occupy position "${spread.positions[i].id}".`;
    }
  }
  return null;
}
