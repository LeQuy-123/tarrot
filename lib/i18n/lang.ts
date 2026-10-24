import { z } from "zod";
import { createLocalStore } from "@/lib/storage/local-store";

export const LANGS = ["en", "vi"] as const;
export type Lang = (typeof LANGS)[number];

/** Explicit choice from the header toggle; null means "follow the browser language". */
export const langStore = createLocalStore<Lang | null>("arcana.lang.v1", z.enum(LANGS).nullable(), null);

export function browserLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  return navigator.languages?.some((l) => l.toLowerCase().startsWith("vi")) ? "vi" : "en";
}

export function currentLang(): Lang {
  return langStore.get() ?? browserLang();
}
