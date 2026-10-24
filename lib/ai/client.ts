import {
  readingErrorSchema,
  readingResponseSchema,
  type ReadingErrorCode,
  type ReadingRequest,
  type ReadingResponse,
} from "./schema";

export interface ReadingFailure {
  code: ReadingErrorCode | "network";
  message: string;
  retryable: boolean;
}

export type ReadingResult = { ok: true; reading: ReadingResponse } | { ok: false; error: ReadingFailure };

/** Browser-side call to the reading endpoint. Never fabricates a reading on failure. */
export async function requestReading(request: ReadingRequest, signal?: AbortSignal): Promise<ReadingResult> {
  let response: Response;
  try {
    response = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    return { ok: false, error: { code: "network", message: "Could not reach the archive. Check your connection.", retryable: true } };
  }

  const body: unknown = await response.json().catch(() => null);
  if (response.ok) {
    const parsed = readingResponseSchema.safeParse(body);
    if (parsed.success) return { ok: true, reading: parsed.data };
    return {
      ok: false,
      error: { code: "malformed_response", message: "The reading arrived in an unexpected format.", retryable: true },
    };
  }
  const parsedError = readingErrorSchema.safeParse(body);
  if (parsedError.success) return { ok: false, error: parsedError.data.error };
  return {
    ok: false,
    error: { code: "provider_unavailable", message: `The archive answered with status ${response.status}.`, retryable: true },
  };
}
