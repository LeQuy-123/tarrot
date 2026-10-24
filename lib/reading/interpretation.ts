import { requestReading, type ReadingResult } from "@/lib/ai/client";
import { buildReadingContext } from "@/lib/ai/context";
import { composeMockReading } from "@/lib/ai/providers/mock";
import { readingInterpretationSchema, readingRequestSchema, type ReadingRequest } from "@/lib/ai/schema";

/** Provider name for readings composed in the browser from deck data, with no AI involved. */
export const ARCHIVE_PROVIDER = "archive";

/** Builds a reading from the cards' own meanings. Works offline and needs no API key. */
export function composeArchiveReading(request: ReadingRequest): ReadingResult {
  try {
    const context = buildReadingContext(readingRequestSchema.parse(request));
    return {
      ok: true,
      reading: {
        interpretation: readingInterpretationSchema.parse(composeMockReading(context)),
        provider: ARCHIVE_PROVIDER,
        model: "astral-archive",
        generatedAt: new Date().toISOString(),
      },
    };
  } catch {
    return { ok: false, error: { code: "invalid_request", message: "These cards could not be read.", retryable: false } };
  }
}

function pause(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

/** Interprets a reading with the server's AI provider, or locally from the archive when AI is off. */
export async function interpretReading(
  request: ReadingRequest,
  { useAI, signal }: { useAI: boolean; signal?: AbortSignal },
): Promise<ReadingResult> {
  if (useAI) return requestReading(request, signal);
  // A brief pause keeps the "consulting the archive" moment from flashing past.
  await pause(450, signal);
  return composeArchiveReading(request);
}
