import { describe, expect, it } from "vitest";
import { MESSAGES } from "@/lib/i18n/messages";
import { VI_CARDS } from "@/lib/tarot/deck/vi";
import { DECK, CARD_IDS } from "@/lib/tarot/deck";
import { cardIn, searchDeckIn, spreadIn } from "@/lib/tarot/localize";
import { SPREAD_ORDER, SPREADS } from "@/lib/tarot/spreads";
import { cardFrontSvg } from "@/lib/tarot/art-url";
import { composeArchiveReading } from "@/lib/reading/interpretation";
import { buildReadingContext, buildUserPrompt } from "@/lib/ai/context";
import { drawSpread } from "@/lib/tarot/selection";
import { seededRandom } from "@/lib/tarot/random";
import type { ReadingRequest } from "@/lib/ai/schema";

/** Collects dotted key paths of a dictionary, treating functions and arrays as leaves. */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return [prefix];
  return Object.entries(value).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
}

describe("interface dictionaries", () => {
  it("translate every English key into Vietnamese", () => {
    expect(keyPaths(MESSAGES.vi).sort()).toEqual(keyPaths(MESSAGES.en).sort());
  });

  it("produce text for every function entry", () => {
    expect(MESSAGES.vi.hud.drawCard(3)).toBe("Rút lá thứ 3");
    expect(MESSAGES.vi.common.cards(10)).toBe("10 lá");
    expect(MESSAGES.en.common.cards(1)).toBe("1 card");
  });
});

describe("Vietnamese card content", () => {
  it("covers all 78 cards with complete, matching fields", () => {
    expect(Object.keys(VI_CARDS).sort()).toEqual([...CARD_IDS].sort());
    for (const card of DECK) {
      const vi = VI_CARDS[card.id];
      expect(vi.keywords.upright).toHaveLength(card.keywords.upright.length);
      expect(vi.keywords.reversed).toHaveLength(card.keywords.reversed.length);
      expect(vi.symbols).toHaveLength(card.symbols.length);
      for (const text of [vi.name, vi.archetype, vi.upright, vi.reversed, vi.altText, ...Object.values(vi.lenses), ...Object.values(vi.prediction)]) {
        expect(text.trim().length, card.id).toBeGreaterThan(0);
      }
      expect(vi.upright, card.id).not.toBe(card.upright);
    }
  });

  it("keeps names and archetypes unique", () => {
    const vi = Object.values(VI_CARDS);
    expect(new Set(vi.map((c) => c.name)).size).toBe(78);
    expect(new Set(vi.map((c) => c.archetype)).size).toBe(78);
  });

  it("localises cards without changing identity or orientation data", () => {
    const tower = cardIn("the-tower", "vi");
    expect(tower.name).toBe("Tòa Tháp");
    expect(tower.id).toBe("the-tower");
    expect(tower.number).toBe(16);
    expect(cardIn("queen-of-cups", "vi").name).toBe("Hoàng Hậu Cốc");
    expect(cardIn("the-tower", "en").name).toBe("The Tower");
  });

  it("localises every spread position", () => {
    for (const id of SPREAD_ORDER) {
      const vi = spreadIn(id, "vi");
      expect(vi.positions.map((p) => p.id)).toEqual(SPREADS[id].positions.map((p) => p.id));
      vi.positions.forEach((p, i) => {
        expect(p.label).not.toBe(SPREADS[id].positions[i].label);
        expect(p.prompt).not.toBe(SPREADS[id].positions[i].prompt);
        expect(p.x).toBe(SPREADS[id].positions[i].x);
      });
    }
    expect(spreadIn("celtic-cross", "vi").name).toBe("Thập Tự Celtic");
  });

  it("searches in Vietnamese, without diacritics, and by English name", () => {
    expect(searchDeckIn("tòa tháp", "vi").map((c) => c.id)).toContain("the-tower");
    expect(searchDeckIn("toa thap", "vi").map((c) => c.id)).toContain("the-tower");
    expect(searchDeckIn("tower", "vi").map((c) => c.id)).toContain("the-tower");
    expect(searchDeckIn("", "vi", { suit: "cups" })).toHaveLength(14);
  });

  it("draws Vietnamese titles and rank labels on the artwork", () => {
    expect(cardFrontSvg("the-tower", "vi")).toContain("TÒA THÁP");
    expect(cardFrontSvg("knight-of-swords", "vi")).toContain("HIỆP SĨ");
    expect(cardFrontSvg("the-tower", "en")).toContain("THE TOWER");
    expect(cardFrontSvg("the-tower", "vi")).not.toBe(cardFrontSvg("the-tower", "en"));
  });
});

describe("Vietnamese readings", () => {
  const request = (language: "en" | "vi"): ReadingRequest => ({
    question: "Con đường sự nghiệp của tôi?",
    spreadId: "three-card",
    tone: "gentle",
    cards: drawSpread(CARD_IDS, SPREADS["three-card"], seededRandom("vi-reading"), { reversalChance: 0.5 }),
    language,
  });

  it("composes the offline reading in Vietnamese from the translated card text", () => {
    const req = request("vi");
    const result = composeArchiveReading(req);
    if (!result.ok) throw new Error("expected a reading");
    const { interpretation } = result.reading;
    interpretation.cards.forEach((entry, i) => {
      const drawn = req.cards[i];
      const vi = VI_CARDS[drawn.cardId];
      expect(entry.interpretation).toContain(vi.name);
      expect(entry.interpretation).toContain(vi.prediction[drawn.orientation]);
      expect(entry.interpretation).toContain(spreadIn("three-card", "vi").positions[i].label);
    });
    expect(interpretation.reflectionQuestions[0]).toMatch(/^Bạn đã cảm nhận/);
    expect(interpretation.cards.map((c) => c.cardId)).toEqual(req.cards.map((c) => c.cardId));
  });

  it("keeps English readings unchanged", () => {
    const result = composeArchiveReading(request("en"));
    if (!result.ok) throw new Error("expected a reading");
    expect(result.reading.interpretation.reflectionQuestions[0]).toMatch(/^Where in your life/);
  });

  it("asks the AI to answer in Vietnamese with Vietnamese card names", () => {
    const req = request("vi");
    const prompt = buildUserPrompt(buildReadingContext(req));
    const payload = JSON.parse(prompt.slice(prompt.indexOf("{")));
    expect(payload.responseLanguage).toMatch(/^Vietnamese/);
    expect(payload.cards[0].vietnameseName).toBe(VI_CARDS[req.cards[0].cardId].name);
    expect(payload.cards[0].cardId).toBe(req.cards[0].cardId);
    const en = JSON.parse(buildUserPrompt(buildReadingContext(request("en"))).replace(/^[^{]*/, ""));
    expect(en.responseLanguage).toBeUndefined();
  });
});
