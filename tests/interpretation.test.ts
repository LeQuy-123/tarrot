import { afterEach, describe, expect, it, vi } from "vitest";
import { ARCHIVE_PROVIDER, composeArchiveReading, interpretReading } from "@/lib/reading/interpretation";
import type { ReadingRequest } from "@/lib/ai/schema";
import { CARD_IDS, getCard } from "@/lib/tarot/deck";
import { SPREAD_ORDER, SPREADS } from "@/lib/tarot/spreads";
import { drawSpread } from "@/lib/tarot/selection";
import { seededRandom } from "@/lib/tarot/random";
import { DEFAULT_SETTINGS } from "@/lib/storage/settings";

const request = (spreadId: ReadingRequest["spreadId"]): ReadingRequest => ({
  question: "Where is my attention best spent?",
  spreadId,
  tone: "gentle",
  cards: drawSpread(CARD_IDS, SPREADS[spreadId], seededRandom(spreadId), { reversalChance: 0.5 }),
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("demo mode (AI interpretation off)", () => {
  it("is the default setting", () => {
    expect(DEFAULT_SETTINGS.aiReading).toBe(false);
  });

  it("composes a complete reading offline for every spread", () => {
    for (const id of SPREAD_ORDER) {
      const req = request(id);
      const result = composeArchiveReading(req);
      expect(result.ok).toBe(true);
      if (!result.ok) continue;
      expect(result.reading.provider).toBe(ARCHIVE_PROVIDER);
      expect(result.reading.interpretation.cards.map((c) => c.cardId)).toEqual(req.cards.map((c) => c.cardId));
    }
  });

  it("uses each card's prediction for its drawn orientation", () => {
    const req = request("celtic-cross");
    const result = composeArchiveReading(req);
    if (!result.ok) throw new Error("expected a reading");
    result.reading.interpretation.cards.forEach((entry, i) => {
      const drawn = req.cards[i];
      const card = getCard(drawn.cardId);
      expect(entry.interpretation).toContain(card.prediction[drawn.orientation]);
      const other = drawn.orientation === "upright" ? "reversed" : "upright";
      expect(entry.interpretation).not.toContain(card.prediction[other]);
      // upright-only position lenses are not applied to reversed cards
      if (drawn.orientation === "reversed") {
        expect(entry.interpretation).not.toContain(card.lenses[SPREADS["celtic-cross"].positions[i].lens]);
      }
    });
    expect(result.reading.interpretation.nextSteps.length).toBeGreaterThan(0);
  });

  it("does not call the network when AI is off", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const result = await interpretReading(request("three-card"), { useAI: false });
    expect(result.ok).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("calls the AI endpoint when AI is on and surfaces its errors", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: { code: "configuration", message: "AI reading isn't set up", retryable: false } }), {
        status: 500,
      }),
    );
    vi.stubGlobal("fetch", fetchSpy);
    const result = await interpretReading(request("daily"), { useAI: true });
    expect(fetchSpy).toHaveBeenCalledWith("/api/reading", expect.objectContaining({ method: "POST" }));
    expect(result).toEqual({ ok: false, error: { code: "configuration", message: "AI reading isn't set up", retryable: false } });
  });

  it("rejects an invalid deal instead of inventing a reading", () => {
    const req = request("three-card");
    const result = composeArchiveReading({ ...req, cards: [req.cards[0], req.cards[0], req.cards[2]] });
    expect(result.ok).toBe(false);
  });
});
