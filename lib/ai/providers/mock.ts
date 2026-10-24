import type { Element } from "@/types/tarot";
import type { Lang } from "@/lib/i18n/lang";
import { orientedKeywords, orientedMeaning, orientedPrediction } from "@/lib/tarot/interpret";
import { ARCHIVE_PHRASES } from "./archive-phrases";
import { localizedContext, type ReadingContext } from "../context";
import { ReadingError } from "../errors";
import type { ProviderResult, ReadingProvider } from "./types";

export type MockFailure = "timeout" | "rate_limit" | "malformed" | "unavailable";

export interface MockProviderOptions {
  delayMs?: number;
  fail?: MockFailure;
}

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(signal.reason);
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

/**
 * Offline interpreter that composes a reading from deck data alone: position lenses, orientation
 * meanings and each card's generic outlook. Powers demo mode (no API key) and the mock provider.
 */
export function composeMockReading(context: ReadingContext, lang: Lang = "en") {
  const p = ARCHIVE_PHRASES[lang];
  const { cards, spread, question } = context;
  const majors = cards.filter((c) => c.card.arcana === "major").length;
  const reversed = cards.filter((c) => c.orientation === "reversed").length;
  const elements = new Map<Element, number>();
  for (const c of cards) elements.set(c.card.element, (elements.get(c.card.element) ?? 0) + 1);
  const [dominant] = [...elements.entries()].sort((a, b) => b[1] - a[1]);
  const keyword = (c: (typeof cards)[number]) => orientedKeywords(c.card, c.orientation)[0];

  const anchor = cards[0];
  const theme = p.theme(anchor.card.archetype, spread.name, anchor.card.name, p.orientation(anchor.orientation), question);

  const relationships: string[] = [];
  for (let i = 0; i + 1 < cards.length && relationships.length < 4; i++) {
    const a = cards[i];
    const b = cards[i + 1];
    relationships.push(p.relationship(a.card.name, a.position.label, b.card.name, b.position.label, keyword(a), keyword(b)));
  }

  const patterns: string[] = [];
  if (cards.length > 1 && dominant && dominant[1] > 1) patterns.push(p.sharedElement(dominant[1], p.element(dominant[0])));
  if (majors > 0 && cards.length > 1) patterns.push(p.majors(majors, cards.length));
  if (reversed > 0) patterns.push(p.reversed(reversed));
  if (patterns.length === 0) patterns.push(p.singleImage(anchor.card.symbols[0], anchor.card.symbols[1] ?? anchor.card.symbols[0]));

  // Outlook: prefer the last card read through the "outcome" lens, else the final card.
  const outlookCard = [...cards].reverse().find((c) => c.position.lens === "outcome") ?? cards[cards.length - 1];
  const adviceCard = cards.find((c) => c.position.lens === "guidance") ?? anchor;
  // Advice: the guidance lens for upright cards; the closing invitation of the reversed meaning otherwise.
  const advice = ({ card, orientation }: (typeof cards)[number]) =>
    orientation === "upright" ? card.lenses.guidance : sentences(orientedMeaning(card, orientation)).at(-1);
  const nextSteps = [...new Set([adviceCard, anchor, outlookCard].map(advice))]
    .filter((step): step is string => Boolean(step))
    .slice(0, 3);
  if (nextSteps.length === 0) nextSteps.push(p.fallbackStep(keyword(anchor)));

  const firstOutlook = (c: (typeof cards)[number]) => sentences(orientedPrediction(c.card, c.orientation))[0];
  const summary =
    cards.length === 1
      ? p.summarySingle(anchor.card.name, anchor.orientation === "reversed", firstOutlook(anchor))
      : p.summaryMulti(outlookCard.card.name, outlookCard.orientation === "reversed", outlookCard.position.label, firstOutlook(outlookCard));

  return {
    theme,
    cards: cards.map(({ card, orientation, position }) => ({
      positionId: position.id,
      cardId: card.id,
      interpretation: p.card(
        card.name,
        p.orientation(orientation),
        position.label,
        // Lenses are written for the upright card; reversed cards lead with their reversed meaning.
        orientation === "upright" ? card.lenses[position.lens] : sentences(orientedMeaning(card, orientation))[0],
        orientedPrediction(card, orientation),
      ),
    })),
    relationships,
    patterns,
    reflectionQuestions: [p.questionFeel(keyword(anchor)), p.questionTrust(outlookCard.card.name)],
    nextSteps,
    summary,
  };
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

export function createMockProvider({ delayMs = 900, fail }: MockProviderOptions = {}): ReadingProvider {
  return {
    name: "mock",
    async generate(context: ReadingContext, signal: AbortSignal): Promise<ProviderResult> {
      if (fail === "timeout") {
        await wait(60_000, signal);
      }
      await wait(delayMs, signal);
      if (fail === "rate_limit") throw new ReadingError("rate_limited", "The archive is busy.", { retryAfterSeconds: 5 });
      if (fail === "unavailable") throw new ReadingError("provider_unavailable", "The interpreter is unavailable.");
      if (fail === "malformed") return { output: { theme: 42, cards: "nope" }, model: "mock-archive-1" };
      return { output: composeMockReading(localizedContext(context), context.language), model: "mock-archive-1" };
    },
  };
}
