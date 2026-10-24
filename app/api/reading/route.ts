import { generateReading } from "@/lib/ai/engine";
import { ReadingError } from "@/lib/ai/errors";
import { createRateLimiter } from "@/lib/ai/rate-limit";

const MAX_BODY_BYTES = 16_000;
const limiter = createRateLimiter({ limit: 12, windowMs: 60_000 });

function errorResponse(error: ReadingError) {
  const headers: HeadersInit = error.retryAfterSeconds ? { "Retry-After": String(error.retryAfterSeconds) } : {};
  return Response.json(error.toBody(), { status: error.status, headers });
}

export async function POST(request: Request) {
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = limiter(client);
  if (!limit.ok) {
    return errorResponse(
      new ReadingError("rate_limited", "Too many readings in a short time. Take a breath and try again shortly.", {
        retryAfterSeconds: limit.retryAfterSeconds,
      }),
    );
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) throw new ReadingError("invalid_request", "Request is too large.");
    body = JSON.parse(text);
  } catch (error) {
    return errorResponse(error instanceof ReadingError ? error : new ReadingError("invalid_request", "Request body must be JSON."));
  }

  try {
    const reading = await generateReading(body, { signal: request.signal });
    return Response.json(reading, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const readingError =
      error instanceof ReadingError
        ? error
        : new ReadingError("provider_unavailable", "The reading could not be generated.", { cause: error });
    if (readingError.code !== "invalid_request") {
      console.error(`[arcana] reading failed: ${readingError.code}`, readingError.cause ?? readingError.message);
    }
    return errorResponse(readingError);
  }
}
