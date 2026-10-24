import type { z } from "zod";

/**
 * A tiny localStorage-backed store compatible with React's useSyncExternalStore.
 * Values are validated on read; corrupt or outdated data falls back to the default.
 */
export function createLocalStore<T>(key: string, schema: z.ZodType<T>, fallback: T) {
  const listeners = new Set<() => void>();
  let cache: { raw: string | null; value: T } | null = null;

  function read(): T {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return cache?.value ?? fallback;
    }
    if (cache && cache.raw === raw) return cache.value;
    let value = fallback;
    if (raw) {
      try {
        const parsed = schema.safeParse(JSON.parse(raw));
        if (parsed.success) value = parsed.data;
      } catch {
        // fall through to default
      }
    }
    cache = { raw, value };
    return value;
  }

  function write(next: T) {
    const raw = JSON.stringify(next);
    cache = { raw, value: next };
    try {
      window.localStorage.setItem(key, raw);
    } catch {
      // storage full or blocked: keep in-memory value for this session
    }
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  return {
    key,
    get: read,
    getServer: () => fallback,
    set: write,
    update(fn: (current: T) => T) {
      write(fn(read()));
    },
    subscribe,
  };
}
