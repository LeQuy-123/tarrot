import { z } from "zod";
import { SPREAD_ORDER } from "@/lib/tarot/spreads";

export const TONES = ["gentle", "direct", "poetic", "practical"] as const;
export type Tone = (typeof TONES)[number];

export const TONE_LABELS: Record<Tone, { label: string; hint: string }> = {
  gentle: { label: "Gentle", hint: "Warm and encouraging" },
  direct: { label: "Direct", hint: "Clear and candid" },
  poetic: { label: "Poetic", hint: "Lyrical and symbolic" },
  practical: { label: "Practical", hint: "Grounded, action-focused" },
};

export const drawnCardSchema = z.object({
  cardId: z.string().min(1).max(64),
  orientation: z.enum(["upright", "reversed"]),
  positionId: z.string().min(1).max(64),
});

export const readingRequestSchema = z.object({
  question: z.string().trim().max(500, "Keep your question under 500 characters."),
  spreadId: z.enum(SPREAD_ORDER as ["daily", "three-card", "decision", "celtic-cross"]),
  tone: z.enum(TONES).default("gentle"),
  cards: z.array(drawnCardSchema).min(1).max(10),
  /** Language the interpretation should be written in (defaults to English). */
  language: z.enum(["en", "vi"]).optional(),
});

export type ReadingRequest = z.infer<typeof readingRequestSchema>;

/** Shape the model is asked to produce (kept simple for structured-output compatibility). */
export const modelReadingSchema = z.object({
  theme: z.string(),
  cards: z.array(
    z.object({
      positionId: z.string(),
      cardId: z.string(),
      interpretation: z.string(),
    }),
  ),
  relationships: z.array(z.string()),
  patterns: z.array(z.string()),
  reflectionQuestions: z.array(z.string()),
  nextSteps: z.array(z.string()),
  summary: z.string(),
});

const text = (max: number) => z.string().trim().min(1).max(max);

/** Strict validation applied to every provider's output before it reaches the client. */
export const readingInterpretationSchema = z.object({
  theme: text(600),
  cards: z
    .array(
      z.object({
        positionId: text(64),
        cardId: text(64),
        interpretation: text(2500),
      }),
    )
    .min(1)
    .max(10),
  relationships: z.array(text(1200)).max(8),
  patterns: z.array(text(1200)).max(8),
  reflectionQuestions: z.array(text(400)).min(1).max(6),
  nextSteps: z.array(text(600)).min(1).max(6),
  summary: text(1500),
});

export type ReadingInterpretation = z.infer<typeof readingInterpretationSchema>;

export const readingResponseSchema = z.object({
  interpretation: readingInterpretationSchema,
  provider: z.string(),
  model: z.string(),
  generatedAt: z.string(),
});

export type ReadingResponse = z.infer<typeof readingResponseSchema>;

export const ERROR_CODES = [
  "invalid_request",
  "rate_limited",
  "timeout",
  "provider_unavailable",
  "malformed_response",
  "configuration",
  "refused",
] as const;
export type ReadingErrorCode = (typeof ERROR_CODES)[number];

export const readingErrorSchema = z.object({
  error: z.object({
    code: z.enum(ERROR_CODES),
    message: z.string(),
    retryable: z.boolean(),
    retryAfterSeconds: z.number().optional(),
  }),
});

export type ReadingErrorBody = z.infer<typeof readingErrorSchema>;
