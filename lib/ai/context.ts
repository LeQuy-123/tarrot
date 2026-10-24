import type { Orientation, SpreadDefinition, SpreadPosition, TarotCard } from "@/types/tarot";
import { CARD_ID_SET, getCard } from "@/lib/tarot/deck";
import { getSpread } from "@/lib/tarot/spreads";
import { validateDeal } from "@/lib/tarot/selection";
import { orientedKeywords, orientedMeaning } from "@/lib/tarot/interpret";
import { ReadingError } from "./errors";
import type { ReadingRequest, Tone } from "./schema";

export interface ContextCard {
  index: number;
  position: SpreadPosition;
  card: TarotCard;
  orientation: Orientation;
}

/** Everything a provider needs, resolved server-side from trusted deck data. */
export interface ReadingContext {
  question: string;
  tone: Tone;
  spread: SpreadDefinition;
  cards: ContextCard[];
}

export function buildReadingContext(request: ReadingRequest): ReadingContext {
  const spread = getSpread(request.spreadId);
  const problem = validateDeal(request.cards, spread, CARD_ID_SET);
  if (problem) throw new ReadingError("invalid_request", problem);
  return {
    question: request.question,
    tone: request.tone,
    spread,
    cards: request.cards.map((drawn, index) => ({
      index,
      position: spread.positions[index],
      card: getCard(drawn.cardId),
      orientation: drawn.orientation,
    })),
  };
}

const TONE_GUIDANCE: Record<Tone, string> = {
  gentle: "Warm, compassionate and encouraging, while staying honest about difficult cards.",
  direct: "Clear, candid and concise. Name tensions plainly without being harsh.",
  poetic: "Lyrical and image-rich, drawing on the cards' symbolism, but still easy to follow.",
  practical: "Grounded and pragmatic. Emphasise concrete observations and doable actions.",
};

export const SYSTEM_PROMPT = `You are the interpreter for ARCANA — The Astral Archive, a reflective tarot experience.

You receive a spread whose cards have ALREADY been drawn by a separate, deterministic process. Interpret exactly those cards, in exactly those positions and orientations. Never add, swap, or re-orient cards, and never claim a different card was drawn.

Principles:
- Tarot here is a tool for reflection and entertainment. Do not present predictions as certain. Use language like "may", "invites", "could point to".
- Never give medical, legal, financial, or other professional advice. If the question touches those areas, gently suggest consulting a qualified professional while still offering reflective perspective.
- Ground each card's interpretation in its position, its orientation, and the querent's question. Reversed cards are read with their reversed meaning.
- Relationships should connect specific cards by name and position.
- Reflection questions should be open-ended and personal. Next steps should be small, concrete, and within the querent's control.
- If the question is empty, read the spread as a general reflection on the querent's current path.

Return JSON only, matching the requested schema. In "cards", include one entry per drawn card in the given order, copying positionId and cardId exactly.`;

/** The user-turn payload: the actual drawn cards, positions, orientations and card metadata. */
export function buildUserPrompt(context: ReadingContext): string {
  const payload = {
    question: context.question || "(no question given — general reflection)",
    tone: `${context.tone}: ${TONE_GUIDANCE[context.tone]}`,
    spread: {
      id: context.spread.id,
      name: context.spread.name,
      guide: context.spread.interpretationGuide,
    },
    cards: context.cards.map(({ index, position, card, orientation }) => ({
      order: index + 1,
      positionId: position.id,
      position: position.label,
      positionMeaning: position.prompt,
      cardId: card.id,
      card: card.name,
      orientation,
      arcana: card.arcana,
      suit: card.suit,
      element: card.element,
      archetype: card.archetype,
      keywords: orientedKeywords(card, orientation),
      symbols: card.symbols,
      meaning: orientedMeaning(card, orientation),
      positionalHint: card.lenses[position.lens],
    })),
    responseRequirements: {
      cards: `exactly ${context.cards.length} entries, same order`,
      relationships: "2–4 items (0–1 for a single-card spread)",
      patterns: "1–3 items (patterns, tensions, elemental or numeric emphases)",
      reflectionQuestions: "2–4 items",
      nextSteps: "2–4 items",
    },
  };
  return `Interpret this tarot reading.\n\n${JSON.stringify(payload, null, 2)}`;
}
