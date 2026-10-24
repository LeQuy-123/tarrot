import type { SpreadDefinition, SpreadId, TarotCard } from "@/types/tarot";
import type { Lang } from "@/lib/i18n/lang";
import { MESSAGES } from "@/lib/i18n/messages";
import { DECK, getCard } from "@/lib/tarot/deck";
import { getSpread } from "@/lib/tarot/spreads";
import { VI_CARDS } from "@/lib/tarot/deck/vi";

// Localised views of deck and spread data. Ids, layout and orientation never change;
// only display text is swapped. English is the source of truth.

const viCards = new Map<string, TarotCard>();

export function localizeCard(card: TarotCard, lang: Lang): TarotCard {
  if (lang === "en") return card;
  let localized = viCards.get(card.id);
  if (!localized) {
    const t = VI_CARDS[card.id];
    localized = t ? { ...card, ...t } : card;
    viCards.set(card.id, localized);
  }
  return localized;
}

export function cardIn(id: string, lang: Lang): TarotCard {
  return localizeCard(getCard(id), lang);
}

export function deckIn(lang: Lang): TarotCard[] {
  return DECK.map((card) => localizeCard(card, lang));
}

const viSpreads = new Map<SpreadId, SpreadDefinition>();

/** Spread with translated names, labels and prompts; the interpretation guide stays English (it is for the AI). */
export function spreadIn(id: SpreadId, lang: Lang): SpreadDefinition {
  const spread = getSpread(id);
  if (lang === "en") return spread;
  let localized = viSpreads.get(id);
  if (!localized) {
    const t = MESSAGES.vi.spreads[id];
    localized = {
      ...spread,
      name: t.name,
      tagline: t.tagline,
      description: t.description,
      positions: spread.positions.map((p) => ({ ...p, ...t.positions[p.id] })),
    };
    viSpreads.set(id, localized);
  }
  return localized;
}

/** Search over the localised deck (names, archetypes, keywords, symbols). */
export function searchDeckIn(
  query: string,
  lang: Lang,
  filter: { arcana?: "major" | "minor"; suit?: TarotCard["suit"] } = {},
): TarotCard[] {
  const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  const terms = fold(query.trim()).split(/\s+/).filter(Boolean);
  return deckIn(lang).filter((card) => {
    if (filter.arcana && card.arcana !== filter.arcana) return false;
    if (filter.suit && card.suit !== filter.suit) return false;
    if (terms.length === 0) return true;
    // Also match English names so either language finds a card.
    const english = getCard(card.id);
    const haystack = fold(
      [card.name, english.name, card.archetype, ...card.keywords.upright, ...card.keywords.reversed, ...card.symbols].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });
}
