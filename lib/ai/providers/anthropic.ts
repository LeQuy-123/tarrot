import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { buildUserPrompt, SYSTEM_PROMPT, type ReadingContext } from "../context";
import { ReadingError } from "../errors";
import { modelReadingSchema } from "../schema";
import type { ProviderResult, ReadingProvider } from "./types";

export const DEFAULT_ANTHROPIC_MODEL = "claude-opus-5-5";

export interface AnthropicProviderOptions {
  apiKey: string;
  model?: string;
}

function retryAfter(headers: Headers | undefined): number | undefined {
  const value = headers?.get("retry-after");
  const seconds = value ? Number(value) : NaN;
  return Number.isFinite(seconds) ? seconds : undefined;
}

function mapError(error: unknown): ReadingError {
  if (error instanceof ReadingError) return error;
  if (error instanceof Anthropic.APIUserAbortError || error instanceof Anthropic.APIConnectionTimeoutError) {
    return new ReadingError("timeout", "The interpreter took too long to answer.", { cause: error });
  }
  if (error instanceof Anthropic.RateLimitError) {
    return new ReadingError("rate_limited", "The interpreter is receiving too many requests.", {
      retryAfterSeconds: retryAfter(error.headers),
      cause: error,
    });
  }
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
    return new ReadingError("configuration", "The AI provider rejected the server's credentials.", { cause: error });
  }
  if (error instanceof Anthropic.BadRequestError || error instanceof Anthropic.NotFoundError) {
    return new ReadingError("configuration", "The AI provider rejected the request configuration.", { cause: error });
  }
  if (error instanceof Anthropic.APIConnectionError) {
    return new ReadingError("provider_unavailable", "Could not reach the AI provider.", { cause: error });
  }
  if (error instanceof Anthropic.APIError) {
    // 5xx including 529 overloaded
    return new ReadingError("provider_unavailable", "The AI provider is temporarily unavailable.", { cause: error });
  }
  if (error instanceof SyntaxError) {
    return new ReadingError("malformed_response", "The interpreter returned an unreadable answer.", { cause: error });
  }
  return new ReadingError("provider_unavailable", "The reading could not be generated.", { cause: error });
}

export function createAnthropicProvider({ apiKey, model = DEFAULT_ANTHROPIC_MODEL }: AnthropicProviderOptions): ReadingProvider {
  // Retries are left to the user (explicit retry button) so a slow provider can't stack timeouts.
  const client = new Anthropic({ apiKey, maxRetries: 1 });

  return {
    name: "anthropic",
    async generate(context: ReadingContext, signal: AbortSignal): Promise<ProviderResult> {
      try {
        const response = await client.beta.messages.parse(
          {
            model,
            max_tokens: 16000,
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
            output_config: { effort: "medium", format: betaZodOutputFormat(modelReadingSchema) },
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: buildUserPrompt(context) }],
          },
          { signal },
        );
        if (response.stop_reason === "refusal") {
          throw new ReadingError("refused", "The interpreter declined to read this question. Try rephrasing it.");
        }
        if (response.stop_reason === "max_tokens" || response.parsed_output == null) {
          throw new ReadingError("malformed_response", "The interpreter's answer was incomplete.");
        }
        return { output: response.parsed_output, model: response.model };
      } catch (error) {
        throw mapError(error);
      }
    },
  };
}
