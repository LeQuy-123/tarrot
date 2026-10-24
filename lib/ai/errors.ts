import type { ReadingErrorCode } from "./schema";

const STATUS: Record<ReadingErrorCode, number> = {
  invalid_request: 400,
  rate_limited: 429,
  timeout: 504,
  provider_unavailable: 503,
  malformed_response: 502,
  configuration: 500,
  refused: 422,
};

const RETRYABLE: Record<ReadingErrorCode, boolean> = {
  invalid_request: false,
  rate_limited: true,
  timeout: true,
  provider_unavailable: true,
  malformed_response: true,
  configuration: false,
  refused: false,
};

export class ReadingError extends Error {
  readonly code: ReadingErrorCode;
  readonly retryAfterSeconds?: number;

  constructor(code: ReadingErrorCode, message: string, options: { retryAfterSeconds?: number; cause?: unknown } = {}) {
    super(message, { cause: options.cause });
    this.name = "ReadingError";
    this.code = code;
    this.retryAfterSeconds = options.retryAfterSeconds;
  }

  get status(): number {
    return STATUS[this.code];
  }

  get retryable(): boolean {
    return RETRYABLE[this.code];
  }

  toBody() {
    return {
      error: {
        code: this.code,
        message: this.message,
        retryable: this.retryable,
        ...(this.retryAfterSeconds !== undefined ? { retryAfterSeconds: this.retryAfterSeconds } : {}),
      },
    };
  }
}
