import type { Suit, TarotCard, TarotCardData } from "@/types/tarot";
import { artworkRef, describeArtwork } from "@/lib/tarot/art";
import { majorArcana } from "./major";
import { wands } from "./wands";
import { cups } from "./cups";
import { swords } from "./swords";
import { pentacles } from "./pentacles";
import { PREDICTIONS } from "./predictions";

function assemble(card: TarotCardData): TarotCard {
  const prediction = PREDICTIONS[card.id];
  if (!prediction) throw new Error(`Missing prediction for card "${card.id}"`);
  return { ...card, prediction, artwork: artworkRef(card.id), altText: describeArtwork(card) };
}

export const SUITS: Suit[] = ["wands", "cups", "swords", "pentacles"];

export const SUIT_INFO: Record<Suit, { name: string; element: string; domain: string }> = {
  wands: { name: "Wands", element: "Fire", domain: "Will, creativity, ambition" },
  cups: { name: "Cups", element: "Water", domain: "Emotion, intuition, relationship" },
  swords: { name: "Swords", element: "Air", domain: "Thought, truth, conflict" },
  pentacles: { name: "Pentacles", element: "Earth", domain: "Body, work, resources" },
};

export const DECK: readonly TarotCard[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles,
].map(assemble);

const byId = new Map(DECK.map((card) => [card.id, card]));

export const CARD_IDS: readonly string[] = DECK.map((card) => card.id);
export const CARD_ID_SET: ReadonlySet<string> = new Set(CARD_IDS);

export function getCard(id: string): TarotCard {
  const card = byId.get(id);
  if (!card) throw new Error(`Unknown tarot card: ${id}`);
  return card;
}

export function findCard(id: string): TarotCard | undefined {
  return byId.get(id);
}

export function searchDeck(
  query: string,
  filter: { arcana?: "major" | "minor"; suit?: Suit } = {},
): TarotCard[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return DECK.filter((card) => {
    if (filter.arcana && card.arcana !== filter.arcana) return false;
    if (filter.suit && card.suit !== filter.suit) return false;
    if (terms.length === 0) return true;
    const haystack = [
      card.name,
      card.archetype,
      card.element,
      card.suit ?? "major arcana",
      ...card.keywords.upright,
      ...card.keywords.reversed,
      ...card.symbols,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
