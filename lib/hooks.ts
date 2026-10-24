"use client";

import { useCallback, useSyncExternalStore } from "react";
import { historyStore } from "@/lib/storage/history";
import { settingsStore, type Settings } from "@/lib/storage/settings";

export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const settings = useSyncExternalStore(settingsStore.subscribe, settingsStore.get, settingsStore.getServer);
  const update = useCallback((patch: Partial<Settings>) => settingsStore.update((s) => ({ ...s, ...patch })), []);
  return [settings, update];
}

export function useHistory() {
  return useSyncExternalStore(historyStore.subscribe, historyStore.get, historyStore.getServer);
}

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = subscribeMedia(reducedQuery);

/** True when animations should be minimised (user setting, or OS preference when set to "system"). */
export function useReducedMotion(): boolean {
  const [settings] = useSettings();
  const system = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
  if (settings.motion === "reduced") return true;
  if (settings.motion === "full") return false;
  return system;
}

let webglSupport: boolean | null = null;
export function detectWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

/** null during SSR/hydration, then whether WebGL is available. */
export function useWebGL(): boolean | null {
  return useSyncExternalStore(noopSubscribe, detectWebGL, () => null);
}

export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
