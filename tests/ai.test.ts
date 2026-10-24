// @vitest-environment node
import { describe, expect, it } from "vitest";
import { buildReadingContext, buildUserPrompt } from "@/lib/ai/context";
import { aiStatus, generateReading, providerFromEnv, validateInterpretation } from "@/lib/ai/engine";
import { ReadingError } from "@/lib/ai/errors";
import { composeMockReading, createMockProvider } from "@/lib/ai/providers/mock";
import type { ReadingProvider } from "@/lib/ai/providers/types";
import { readingInterpretationSchema, type ReadingRequest } from "@/lib/ai/schema";
import { CARD_IDS, getCard } from "@/lib/tarot/deck";
import { SPREADS } from "@/lib/tarot/spreads";
import { drawSpread } from "@/lib/tarot/selection";
import { seededRandom } from "@/lib/tarot/random";

function request(spreadId: ReadingRequest["spreadId"] = "three-card", seed = "ai"): ReadingRequest {
  return {
    question: "What should I focus on this month?",
    spreadId,
    tone: "gentle",
    cards: drawSpread(CARD_IDS, SPREADS[spreadId], seededRandom(seed), { reversalChance: 0.5 }),
  };
}

async function expectReadingError(promise: Promise<unknown>, code: string) {
  const error = await promise.then(
    () => null,
    (e: unknown) => e,
  );
  expect(error).toBeInstanceOf(ReadingError);
  expect((error as ReadingError).code).toBe(code);
}

describe("reading context", () => {
  it("contains the actual drawn cards, orientations and positions", () => {
    const req = request("celtic-cross");
    const prompt = buildUserPrompt(buildReadingContext(req));
    const payload = JSON.parse(prompt.slice(prompt.indexOf("{")));
    expect(payload.cards).toHaveLength(10);
    payload.cards.forEach((c: Record<string, unknown>, i: number) => {
      const drawn = req.cards[i];
      const card = getCard(drawn.cardId);
      expect(c.cardId).toBe(drawn.cardId);
      expect(c.card).toBe(card.name);
      expect(c.orientation).toBe(drawn.orientation);
      expect(c.positionId).toBe(SPREADS["celtic-cross"].positions[i].id);
      expect(c.meaning).toBe(drawn.orientation === "upright" ? card.upright : card.reversed);
    });
    expect(payload.question).toBe(req.question);
  });

  it("uses server-side deck data, not client-supplied meanings", () => {
    const req = request() as ReadingRequest & { cards: (ReadingRequest["cards"][number] & { meaning?: string })[] };
    req.cards[0].meaning = "INJECTED";
    expect(buildUserPrompt(buildReadingContext(req))).not.toContain("INJECTED");
  });
});

describe("reading engine", () => {
  const fast = createMockProvider({ delayMs: 0 });

  it("generates a validated reading with the mock provider", async () => {
    const req = request();
    const result = await generateReading(req, { provider: fast });
    expect(readingInterpretationSchema.parse(result.interpretation)).toBeTruthy();
    expect(result.interpretation.cards.map((c) => c.cardId)).toEqual(req.cards.map((c) => c.cardId));
    expect(result.provider).toBe("mock");
  });

  it("works for every spread", async () => {
    for (const id of ["daily", "three-card", "decision", "celtic-cross"] as const) {
      const r = await generateReading(request(id), { provider: fast });
      expect(r.interpretation.cards).toHaveLength(SPREADS[id].positions.length);
    }
  });

  it("rejects invalid requests", async () => {
    const req = request();
    await expectReadingError(generateReading({ ...req, cards: [req.cards[0], req.cards[0], req.cards[2]] }, { provider: fast }), "invalid_request");
    await expectReadingError(generateReading({ ...req, spreadId: "nope" }, { provider: fast }), "invalid_request");
    await expectReadingError(generateReading({ ...req, question: "x".repeat(600) }, { provider: fast }), "invalid_request");
    await expectReadingError(generateReading({ ...req, cards: req.cards.slice(0, 2) }, { provider: fast }), "invalid_request");
  });

  it("reports malformed provider output instead of fabricating success", async () => {
    await expectReadingError(generateReading(request(), { provider: createMockProvider({ delayMs: 0, fail: "malformed" }) }), "malformed_response");
  });

  it("rejects readings that describe cards that were not drawn", async () => {
    const req = request();
    const context = buildReadingContext(req);
    const output = composeMockReading(context);
    output.cards[1].cardId = "the-fool" === output.cards[1].cardId ? "the-magician" : "the-fool";
    expect(() => validateInterpretation(output, context)).toThrow(ReadingError);
    const short = { ...composeMockReading(context), cards: composeMockReading(context).cards.slice(0, 2) };
    expect(() => validateInterpretation(short, context)).toThrow(/every drawn card/);
  });

  it("times out slow providers", async () => {
    const provider = createMockProvider({ delayMs: 0, fail: "timeout" });
    await expectReadingError(generateReading(request(), { provider, timeoutMs: 50 }), "timeout");
  });

  it("maps rate limits and outages", async () => {
    await expectReadingError(generateReading(request(), { provider: createMockProvider({ delayMs: 0, fail: "rate_limit" }) }), "rate_limited");
    await expectReadingError(generateReading(request(), { provider: createMockProvider({ delayMs: 0, fail: "unavailable" }) }), "provider_unavailable");
    const throwing: ReadingProvider = {
      name: "broken",
      generate: async () => {
        throw new Error("socket hang up");
      },
    };
    await expectReadingError(generateReading(request(), { provider: throwing }), "provider_unavailable");
  });

  it("selects providers from server environment only", () => {
    expect(() => providerFromEnv({})).toThrow(/isn't set up/);
    expect(providerFromEnv({ ANTHROPIC_API_KEY: "sk-test" }).name).toBe("anthropic");
    expect(providerFromEnv({ ARCANA_AI_PROVIDER: "mock" }).name).toBe("mock");
    expect(() => providerFromEnv({ ARCANA_AI_PROVIDER: "anthropic" })).toThrow(/ANTHROPIC_API_KEY/);
    expect(providerFromEnv({ ARCANA_AI_PROVIDER: "anthropic", ANTHROPIC_API_KEY: "sk-test" }).name).toBe("anthropic");
    expect(() => providerFromEnv({ ARCANA_AI_PROVIDER: "other" })).toThrow(/Unknown/);
  });

  it("reports AI availability without constructing a client", () => {
    expect(aiStatus({})).toEqual({ available: false, provider: null });
    expect(aiStatus({ ANTHROPIC_API_KEY: "sk-test" })).toEqual({ available: true, provider: "anthropic" });
    expect(aiStatus({ ARCANA_AI_PROVIDER: "anthropic" })).toEqual({ available: false, provider: "anthropic" });
    expect(aiStatus({ ARCANA_AI_PROVIDER: "mock" })).toEqual({ available: true, provider: "mock" });
  });

  it("marks errors as retryable or not", () => {
    expect(new ReadingError("timeout", "x").retryable).toBe(true);
    expect(new ReadingError("invalid_request", "x").retryable).toBe(false);
    expect(new ReadingError("rate_limited", "x", { retryAfterSeconds: 3 }).toBody().error.retryAfterSeconds).toBe(3);
  });
});
