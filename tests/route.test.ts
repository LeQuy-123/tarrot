// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { CARD_IDS } from "@/lib/tarot/deck";
import { SPREADS } from "@/lib/tarot/spreads";
import { drawSpread } from "@/lib/tarot/selection";
import { seededRandom } from "@/lib/tarot/random";
import { readingErrorSchema, readingResponseSchema } from "@/lib/ai/schema";

function post(body: unknown, ip = `10.0.0.${Math.floor(Math.random() * 250)}`) {
  return new Request("http://localhost/api/reading", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = () => ({
  question: "What is changing?",
  spreadId: "decision",
  tone: "direct",
  cards: drawSpread(CARD_IDS, SPREADS.decision, seededRandom("route")),
});

async function loadRoute() {
  vi.resetModules();
  return import("@/app/api/reading/route");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/reading", () => {
  it("returns a validated reading from the mock provider", async () => {
    vi.stubEnv("ARCANA_AI_PROVIDER", "mock");
    vi.stubEnv("ARCANA_MOCK_DELAY_MS", "0");
    const { POST } = await loadRoute();
    const body = validBody();
    const res = await POST(post(body));
    expect(res.status).toBe(200);
    const json = readingResponseSchema.parse(await res.json());
    expect(json.interpretation.cards.map((c) => c.cardId)).toEqual(body.cards.map((c) => c.cardId));
  });

  it("rejects malformed JSON and invalid deals with 400", async () => {
    vi.stubEnv("ARCANA_MOCK_DELAY_MS", "0");
    const { POST } = await loadRoute();
    const bad = await POST(post("{nope"));
    expect(bad.status).toBe(400);
    const body = validBody();
    body.cards[1] = { ...body.cards[0], positionId: body.cards[1].positionId };
    const dup = await POST(post(body));
    expect(dup.status).toBe(400);
    expect(readingErrorSchema.parse(await dup.json()).error.code).toBe("invalid_request");
  });

  it("surfaces provider failures as retryable errors, never as a reading", async () => {
    vi.stubEnv("ARCANA_MOCK_DELAY_MS", "0");
    vi.stubEnv("ARCANA_MOCK_FAIL", "malformed");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { POST } = await loadRoute();
    const res = await POST(post(validBody()));
    expect(res.status).toBe(502);
    const json = readingErrorSchema.parse(await res.json());
    expect(json.error).toMatchObject({ code: "malformed_response", retryable: true });
    expect(json).not.toHaveProperty("interpretation");
  });

  it("reports missing credentials as a configuration error without leaking secrets", async () => {
    vi.stubEnv("ARCANA_AI_PROVIDER", "anthropic");
    vi.stubEnv("ANTHROPIC_API_KEY", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { POST } = await loadRoute();
    const res = await POST(post(validBody()));
    expect(res.status).toBe(500);
    const json = readingErrorSchema.parse(await res.json());
    expect(json.error.code).toBe("configuration");
    expect(json.error.retryable).toBe(false);
  });

  it("rate limits bursts from one client", async () => {
    vi.stubEnv("ARCANA_MOCK_DELAY_MS", "0");
    const { POST } = await loadRoute();
    const statuses: number[] = [];
    for (let i = 0; i < 14; i++) statuses.push((await POST(post(validBody(), "1.2.3.4"))).status);
    expect(statuses.slice(0, 12).every((s) => s === 200)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
  });
});
