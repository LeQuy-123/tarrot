import { describe, expect, it } from "vitest";
import { DECK, CARD_IDS, getCard, searchDeck, SUITS } from "@/lib/tarot/deck";
import { renderCardBack, renderCardFront } from "@/lib/tarot/art";

describe("deck registry", () => {
  it("contains exactly 78 cards: 22 major and 14 per suit", () => {
    expect(DECK).toHaveLength(78);
    expect(DECK.filter((c) => c.arcana === "major")).toHaveLength(22);
    for (const suit of SUITS) {
      const cards = DECK.filter((c) => c.suit === suit);
      expect(cards).toHaveLength(14);
      expect(cards.map((c) => c.number).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    }
  });

  it("numbers the Major Arcana 0–21", () => {
    const numbers = DECK.filter((c) => c.arcana === "major").map((c) => c.number);
    expect(numbers.sort((a, b) => a - b)).toEqual(Array.from({ length: 22 }, (_, i) => i));
  });

  it("has unique ids, names, archetypes and artwork references", () => {
    for (const key of ["id", "name", "archetype", "artwork", "altText", "upright", "reversed"] as const) {
      expect(new Set(DECK.map((c) => c[key])).size, key).toBe(78);
    }
  });

  it("gives every card complete metadata", () => {
    for (const card of DECK) {
      expect(card.id).toMatch(/^[a-z0-9-]+$/);
      expect(card.keywords.upright.length).toBeGreaterThanOrEqual(3);
      expect(card.keywords.reversed.length).toBeGreaterThanOrEqual(3);
      expect(card.symbols.length).toBeGreaterThanOrEqual(3);
      expect(card.altText.length).toBeGreaterThan(20);
      for (const lens of ["self", "obstacle", "guidance", "outcome"] as const) {
        expect(card.lenses[lens].length, `${card.id}.${lens}`).toBeGreaterThan(10);
      }
      if (card.arcana === "major") {
        expect(card.suit).toBeNull();
        expect(card.rank).toBeNull();
      } else {
        expect(card.suit).not.toBeNull();
        expect(card.rank).not.toBeNull();
      }
    }
  });

  it("renders distinct, self-contained artwork for every card", () => {
    const fronts = DECK.map((c) => renderCardFront(c));
    expect(new Set(fronts).size).toBe(78);
    for (const svg of [...fronts, renderCardBack()]) {
      expect(svg.trimStart().startsWith("<svg")).toBe(true);
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).not.toMatch(/<image|<foreignObject|@import|https?:\/\/(?!www\.w3\.org)/);
    }
  });

  it("produces well-formed SVG markup", () => {
    const parser = new DOMParser();
    for (const card of DECK) {
      const doc = parser.parseFromString(renderCardFront(card), "image/svg+xml");
      expect(doc.getElementsByTagName("parsererror"), card.id).toHaveLength(0);
    }
  });

  it("looks up and searches cards", () => {
    expect(getCard("the-fool").number).toBe(0);
    expect(() => getCard("not-a-card")).toThrow();
    expect(searchDeck("tower").map((c) => c.id)).toContain("the-tower");
    expect(searchDeck("", { suit: "cups" })).toHaveLength(14);
    expect(searchDeck("", { arcana: "major" })).toHaveLength(22);
    expect(CARD_IDS).toHaveLength(78);
  });
});
