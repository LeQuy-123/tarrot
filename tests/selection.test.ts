import { describe, expect, it } from "vitest";
import { CARD_IDS, CARD_ID_SET } from "@/lib/tarot/deck";
import { SPREAD_ORDER, SPREADS, spreadBounds } from "@/lib/tarot/spreads";
import { dealSpread, drawSpread, shuffleDeck, validateDeal } from "@/lib/tarot/selection";
import { secureRandom, seededRandom } from "@/lib/tarot/random";

describe("spreads", () => {
  it("defines the four required spreads with the right sizes", () => {
    expect(SPREAD_ORDER.map((id) => SPREADS[id].positions.length)).toEqual([1, 3, 5, 10]);
  });

  it("uses unique position ids with labels, prompts and lenses", () => {
    for (const id of SPREAD_ORDER) {
      const positions = SPREADS[id].positions;
      expect(new Set(positions.map((p) => p.id)).size).toBe(positions.length);
      for (const p of positions) {
        expect(p.label).toBeTruthy();
        expect(p.prompt).toBeTruthy();
        expect(["self", "obstacle", "guidance", "outcome"]).toContain(p.lens);
      }
    }
  });

  it("lays out cards without overlap, except the Celtic Cross crossing card", () => {
    for (const id of SPREAD_ORDER) {
      const ps = SPREADS[id].positions.filter((p) => !p.rotation);
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const overlapX = Math.abs(ps[i].x - ps[j].x) < 1;
          const overlapY = Math.abs(ps[i].y - ps[j].y) < 5 / 3;
          expect(overlapX && overlapY, `${id}: ${ps[i].id} vs ${ps[j].id}`).toBe(false);
        }
      }
    }
    const b = spreadBounds(SPREADS["celtic-cross"]);
    expect(b.width).toBeGreaterThan(4);
  });
});

describe("selection", () => {
  it("is deterministic for a given seed", () => {
    const a = drawSpread(CARD_IDS, SPREADS["celtic-cross"], seededRandom("seed-1"));
    const b = drawSpread(CARD_IDS, SPREADS["celtic-cross"], seededRandom("seed-1"));
    const c = drawSpread(CARD_IDS, SPREADS["celtic-cross"], seededRandom("seed-2"));
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });

  it("shuffles into a permutation of the full deck", () => {
    const shuffled = shuffleDeck(CARD_IDS, seededRandom(42));
    expect(shuffled).toHaveLength(78);
    expect(new Set(shuffled.map((s) => s.cardId))).toEqual(new Set(CARD_IDS));
  });

  it("never deals duplicates, across many readings", () => {
    const random = seededRandom("many");
    for (let i = 0; i < 500; i++) {
      const deal = drawSpread(CARD_IDS, SPREADS["celtic-cross"], random);
      expect(new Set(deal.map((d) => d.cardId)).size).toBe(10);
      expect(validateDeal(deal, SPREADS["celtic-cross"], CARD_ID_SET)).toBeNull();
    }
  });

  it("assigns cards to positions in spread order", () => {
    const shuffled = shuffleDeck(CARD_IDS, seededRandom(7));
    const deal = dealSpread(shuffled, SPREADS["three-card"]);
    expect(deal.map((d) => d.positionId)).toEqual(["past", "present", "future"]);
    expect(deal.map((d) => d.cardId)).toEqual(shuffled.slice(0, 3).map((s) => s.cardId));
    expect(deal.map((d) => d.orientation)).toEqual(shuffled.slice(0, 3).map((s) => s.orientation));
  });

  it("honours the reversal chance", () => {
    const none = shuffleDeck(CARD_IDS, seededRandom(1), { reversalChance: 0 });
    expect(none.every((c) => c.orientation === "upright")).toBe(true);
    const all = shuffleDeck(CARD_IDS, seededRandom(1), { reversalChance: 1 });
    expect(all.every((c) => c.orientation === "reversed")).toBe(true);
    const some = shuffleDeck(CARD_IDS, seededRandom(1), { reversalChance: 0.3 });
    const reversed = some.filter((c) => c.orientation === "reversed").length;
    expect(reversed).toBeGreaterThan(5);
    expect(reversed).toBeLessThan(45);
  });

  it("distributes cards roughly uniformly", () => {
    const random = seededRandom("uniform");
    const counts = new Map<string, number>();
    const trials = 7800;
    for (let i = 0; i < trials; i++) {
      const [first] = shuffleDeck(CARD_IDS, random);
      counts.set(first.cardId, (counts.get(first.cardId) ?? 0) + 1);
    }
    for (const id of CARD_IDS) {
      const n = counts.get(id) ?? 0;
      expect(n).toBeGreaterThan(50);
      expect(n).toBeLessThan(160);
    }
  });

  it("uses crypto randomness for real readings", () => {
    const r = secureRandom();
    const values = Array.from({ length: 100 }, () => r());
    expect(values.every((v) => v >= 0 && v < 1)).toBe(true);
    expect(new Set(values).size).toBeGreaterThan(95);
  });

  it("rejects invalid deals", () => {
    const spread = SPREADS["three-card"];
    const valid = drawSpread(CARD_IDS, spread, seededRandom(3));
    expect(validateDeal(valid, spread, CARD_ID_SET)).toBeNull();
    expect(validateDeal(valid.slice(0, 2), spread, CARD_ID_SET)).toMatch(/Expected 3/);
    expect(validateDeal([valid[0], { ...valid[1], cardId: valid[0].cardId }, valid[2]], spread, CARD_ID_SET)).toMatch(/more than once/);
    expect(validateDeal([valid[0], { ...valid[1], cardId: "fake" }, valid[2]], spread, CARD_ID_SET)).toMatch(/Unknown/);
    expect(validateDeal([valid[1], valid[0], valid[2]].map((c, i) => ({ ...c, positionId: valid[(i + 1) % 3].positionId })), spread, CARD_ID_SET)).toMatch(/position/);
    expect(() => shuffleDeck(["a", "a"], seededRandom(1))).toThrow();
  });
});
