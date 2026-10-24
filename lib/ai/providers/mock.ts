import { orientedKeywords, orientedMeaning, orientedPrediction, orientationLabel } from "@/lib/tarot/interpret";
import type { ReadingContext } from "../context";
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
export function composeMockReading(context: ReadingContext) {
  const { cards, spread, question } = context;
  const majors = cards.filter((c) => c.card.arcana === "major").length;
  const reversed = cards.filter((c) => c.orientation === "reversed").length;
  const elements = new Map<string, number>();
  for (const c of cards) elements.set(c.card.element, (elements.get(c.card.element) ?? 0) + 1);
  const [dominant] = [...elements.entries()].sort((a, b) => b[1] - a[1]);

  const anchor = cards[0];
  const theme = `${anchor.card.archetype}: ${spread.name} centred on ${anchor.card.name} (${orientationLabel(
    anchor.orientation,
  ).toLowerCase()})${question ? `, read in light of "${question}"` : ""}.`;

  const relationships: string[] = [];
  for (let i = 0; i + 1 < cards.length && relationships.length < 4; i++) {
    const a = cards[i];
    const b = cards[i + 1];
    relationships.push(
      `${a.card.name} in ${a.position.label} leads into ${b.card.name} in ${b.position.label}: a movement from ${orientedKeywords(a.card, a.orientation)[0]} toward ${orientedKeywords(b.card, b.orientation)[0]}.`,
    );
  }

  const patterns: string[] = [];
  if (cards.length > 1 && dominant && dominant[1] > 1) {
    patterns.push(`${dominant[1]} cards share the element of ${dominant[0]}, colouring the reading with its qualities.`);
  }
  if (majors > 0 && cards.length > 1) {
    patterns.push(
      `${majors} of ${cards.length} cards ${majors === 1 ? "is a" : "are"} Major Arcana${majors === 1 ? " card" : ""}, suggesting larger life themes are in motion.`,
    );
  }
  if (reversed > 0) {
    patterns.push(`${reversed} reversed card${reversed > 1 ? "s point" : " points"} to energy that is blocked, internal, or still forming.`);
  }
  if (patterns.length === 0) patterns.push(`The spread rests on a single image: ${anchor.card.symbols.slice(0, 2).join(" and ")}.`);

  // Outlook: prefer the last card read through the "outcome" lens, else the final card.
  const outlookCard = [...cards].reverse().find((c) => c.position.lens === "outcome") ?? cards[cards.length - 1];
  const adviceCard = cards.find((c) => c.position.lens === "guidance") ?? anchor;
  // Advice: the guidance lens for upright cards; the closing invitation of the reversed meaning otherwise.
  const advice = ({ card, orientation }: (typeof cards)[number]) =>
    orientation === "upright" ? card.lenses.guidance : sentences(orientedMeaning(card, orientation)).at(-1);
  const nextSteps = [...new Set([adviceCard, anchor, outlookCard].map(advice))]
    .filter((step): step is string => Boolean(step))
    .slice(0, 3);
  if (nextSteps.length === 0) nextSteps.push(`Choose one small action aligned with "${orientedKeywords(anchor.card, anchor.orientation)[0]}".`);

  const summary =
    cards.length === 1
      ? `Carry ${anchor.card.name}${anchor.orientation === "reversed" ? ", reversed," : ""} with you as a lens for what comes next. ${sentences(orientedPrediction(anchor.card, anchor.orientation))[0]} Treat this as a possibility to notice, not a verdict.`
      : `Looking ahead, ${outlookCard.card.name}${outlookCard.orientation === "reversed" ? " reversed" : ""} in ${outlookCard.position.label} sets the tone: ${lowerFirst(sentences(orientedPrediction(outlookCard.card, outlookCard.orientation))[0])} The other cards describe how you might get there; test them against your own experience.`;

  return {
    theme,
    cards: cards.map(({ card, orientation, position }) => ({
      positionId: position.id,
      cardId: card.id,
      interpretation: `${card.name}, ${orientationLabel(orientation).toLowerCase()}, in the ${position.label} position. ${
        // Lenses are written for the upright card; reversed cards lead with their reversed meaning.
        orientation === "upright" ? card.lenses[position.lens] : sentences(orientedMeaning(card, orientation))[0]
      } ${orientedPrediction(card, orientation)}`,
    })),
    relationships,
    patterns,
    reflectionQuestions: [
      `Where in your life do you already feel ${orientedKeywords(anchor.card, anchor.orientation)[0]}?`,
      `What would change if you trusted the message of ${outlookCard.card.name}?`,
    ],
    nextSteps,
    summary,
  };
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

function lowerFirst(text: string): string {
  return text ? text[0].toLowerCase() + text.slice(1) : text;
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
      return { output: composeMockReading(context), model: "mock-archive-1" };
    },
  };
}
