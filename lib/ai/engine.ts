import { buildReadingContext, type ReadingContext } from "./context";
import { ReadingError } from "./errors";
import { createAnthropicProvider } from "./providers/anthropic";
import { createMockProvider, type MockFailure } from "./providers/mock";
import type { ReadingProvider } from "./providers/types";
import {
  readingInterpretationSchema,
  readingRequestSchema,
  type ReadingInterpretation,
  type ReadingResponse,
} from "./schema";

const MOCK_FAILURES: MockFailure[] = ["timeout", "rate_limit", "malformed", "unavailable"];

type Env = Record<string, string | undefined>;

/** Explicit ARCANA_AI_PROVIDER wins; otherwise Claude when a key is present, else nothing is configured. */
function providerName(env: Env): string {
  const explicit = env.ARCANA_AI_PROVIDER?.trim().toLowerCase();
  if (explicit) return explicit;
  return env.ANTHROPIC_API_KEY ? "anthropic" : "none";
}

/** Whether the server can serve AI readings, without exposing any configuration detail. */
export function aiStatus(env: Env = process.env): { available: boolean; provider: string | null } {
  const name = providerName(env);
  if (name === "anthropic") return { available: Boolean(env.ANTHROPIC_API_KEY), provider: "anthropic" };
  if (name === "mock") return { available: true, provider: "mock" };
  return { available: false, provider: null };
}

/** Resolves the provider from server-only environment variables. */
export function providerFromEnv(env: Env = process.env): ReadingProvider {
  const name = providerName(env);
  if (name === "none") {
    throw new ReadingError(
      "configuration",
      "AI reading isn't set up on this server yet. Turn off AI interpretation in Settings to use the offline archive.",
    );
  }
  if (name === "anthropic") {
    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new ReadingError(
        "configuration",
        "ARCANA_AI_PROVIDER is 'anthropic' but ANTHROPIC_API_KEY is not set on the server.",
      );
    }
    return createAnthropicProvider({ apiKey, model: env.ARCANA_AI_MODEL || undefined });
  }
  if (name === "mock") {
    const fail = MOCK_FAILURES.find((f) => f === env.ARCANA_MOCK_FAIL);
    const delay = Number(env.ARCANA_MOCK_DELAY_MS);
    return createMockProvider({ fail, delayMs: Number.isFinite(delay) ? delay : undefined });
  }
  throw new ReadingError("configuration", `Unknown ARCANA_AI_PROVIDER "${name}".`);
}

/** Checks the provider's output covers exactly the drawn cards, in order. */
export function validateInterpretation(output: unknown, context: ReadingContext): ReadingInterpretation {
  const parsed = readingInterpretationSchema.safeParse(output);
  if (!parsed.success) {
    throw new ReadingError("malformed_response", "The interpreter's answer did not match the expected format.", {
      cause: parsed.error,
    });
  }
  const reading = parsed.data;
  if (reading.cards.length !== context.cards.length) {
    throw new ReadingError("malformed_response", "The interpreter did not address every drawn card.");
  }
  reading.cards.forEach((entry, i) => {
    const expected = context.cards[i];
    if (entry.cardId !== expected.card.id || entry.positionId !== expected.position.id) {
      throw new ReadingError("malformed_response", "The interpreter described cards that were not drawn.");
    }
  });
  return reading;
}

export interface GenerateOptions {
  provider?: ReadingProvider;
  timeoutMs?: number;
  signal?: AbortSignal;
}

export async function generateReading(rawRequest: unknown, options: GenerateOptions = {}): Promise<ReadingResponse> {
  const request = readingRequestSchema.safeParse(rawRequest);
  if (!request.success) {
    throw new ReadingError("invalid_request", request.error.issues[0]?.message ?? "Invalid reading request.");
  }
  const context = buildReadingContext(request.data);
  const provider = options.provider ?? providerFromEnv();
  const timeoutMs = options.timeoutMs ?? (Number(process.env.ARCANA_AI_TIMEOUT_MS) || 45_000);

  const timeout = AbortSignal.timeout(timeoutMs);
  const signal = options.signal ? AbortSignal.any([timeout, options.signal]) : timeout;

  let result;
  try {
    result = await provider.generate(context, signal);
  } catch (error) {
    if (error instanceof ReadingError) throw error;
    if (signal.aborted) throw new ReadingError("timeout", "The interpreter took too long to answer.", { cause: error });
    throw new ReadingError("provider_unavailable", "The reading could not be generated.", { cause: error });
  }

  return {
    interpretation: validateInterpretation(result.output, context),
    provider: provider.name,
    model: result.model,
    generatedAt: new Date().toISOString(),
  };
}
