import type { ReadingContext } from "../context";

export interface ProviderResult {
  /** Raw, unvalidated output. The engine validates it before use. */
  output: unknown;
  model: string;
}

export interface ReadingProvider {
  readonly name: string;
  generate(context: ReadingContext, signal: AbortSignal): Promise<ProviderResult>;
}
