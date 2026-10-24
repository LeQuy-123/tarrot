import { z } from "zod";
import { drawnCardSchema, readingResponseSchema, TONES } from "@/lib/ai/schema";
import { SPREAD_ORDER } from "@/lib/tarot/spreads";
import { createLocalStore } from "./local-store";

export const HISTORY_LIMIT = 50;

export const savedReadingSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  question: z.string(),
  tone: z.enum(TONES),
  spreadId: z.enum(SPREAD_ORDER as ["daily", "three-card", "decision", "celtic-cross"]),
  cards: z.array(drawnCardSchema).min(1),
  reading: readingResponseSchema.nullable(),
});

export type SavedReading = z.infer<typeof savedReadingSchema>;

const historySchema = z.array(z.unknown()).transform((items) =>
  // Drop individual corrupt entries instead of losing the whole history.
  items.flatMap((item) => {
    const parsed = savedReadingSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  }),
);

const EMPTY: SavedReading[] = [];

export const historyStore = createLocalStore<SavedReading[]>("arcana.history.v1", historySchema as z.ZodType<SavedReading[]>, EMPTY);

/** Inserts or replaces a reading by id, newest first, capped at HISTORY_LIMIT. */
export function upsertReading(list: readonly SavedReading[], reading: SavedReading): SavedReading[] {
  const rest = list.filter((r) => r.id !== reading.id);
  return [reading, ...rest].slice(0, HISTORY_LIMIT);
}

export function saveReading(reading: SavedReading) {
  historyStore.update((list) => upsertReading(list, reading));
}

export function deleteReading(id: string) {
  historyStore.update((list) => list.filter((r) => r.id !== id));
}

export function clearHistory() {
  historyStore.set([]);
}

export function newReadingId(): string {
  return globalThis.crypto.randomUUID();
}
