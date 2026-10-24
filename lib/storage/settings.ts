import { z } from "zod";
import { createLocalStore } from "./local-store";

export const settingsSchema = z.object({
  sound: z.boolean().default(false),
  volume: z.number().min(0).max(1).default(0.5),
  /** "system" follows prefers-reduced-motion. */
  motion: z.enum(["system", "full", "reduced"]).default("system"),
  /** Force the 2D experience even when WebGL is available. */
  renderMode: z.enum(["auto", "2d"]).default("auto"),
  reversals: z.boolean().default(true),
  highContrast: z.boolean().default(false),
  largeText: z.boolean().default(false),
});

export type Settings = z.infer<typeof settingsSchema>;

export const DEFAULT_SETTINGS: Settings = settingsSchema.parse({});

export const settingsStore = createLocalStore<Settings>("arcana.settings.v1", settingsSchema as z.ZodType<Settings>, DEFAULT_SETTINGS);
