import { langStore } from "@/lib/i18n/lang";
import { historyStore } from "./history";
import { DEFAULT_SETTINGS, settingsStore } from "./settings";

/** Removes everything ARCANA stores on this device: reading history, settings and language choice. */
export function clearAllLocalData() {
  const stores = [historyStore, settingsStore, langStore];
  // Reset in memory first so open views update, then drop the keys entirely.
  historyStore.set([]);
  settingsStore.set(DEFAULT_SETTINGS);
  langStore.set(null);
  for (const store of stores) {
    try {
      window.localStorage.removeItem(store.key);
    } catch {
      // storage blocked: the in-memory reset above still applies for this session
    }
  }
}
