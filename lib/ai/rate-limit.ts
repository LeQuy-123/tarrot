/** Fixed-window in-memory limiter. Adequate for a single instance; swap for a shared store when scaling out. */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSeconds: number } {
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      if (hits.size > 5_000) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      }
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true };
    }
    if (entry.count >= limit) {
      return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
    }
    entry.count++;
    return { ok: true };
  };
}
