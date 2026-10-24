"use client";

import { useCallback, useSyncExternalStore } from "react";
import { browserLang, currentLang, langStore, type Lang } from "./lang";
import { MESSAGES, type Messages } from "./messages";

export type { Lang } from "./lang";
export type { Messages } from "./messages";

const subscribeLang = (cb: () => void) => {
  const off = langStore.subscribe(cb);
  window.addEventListener("languagechange", cb);
  return () => {
    off();
    window.removeEventListener("languagechange", cb);
  };
};

/**
 * The active language. Server render and hydration use English, then the stored choice
 * (or the browser language) takes over, so markup never mismatches.
 */
export function useLang(): [Lang, (lang: Lang) => void] {
  const lang = useSyncExternalStore(subscribeLang, currentLang, () => "en" as Lang);
  const setLang = useCallback((next: Lang) => langStore.set(next === browserLang() ? null : next), []);
  return [lang, setLang];
}

export function useMessages(): Messages {
  const [lang] = useLang();
  return MESSAGES[lang];
}

export { MESSAGES };
