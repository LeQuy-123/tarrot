/** A source of uniformly distributed numbers in [0, 1). */
export type RandomSource = () => number;

/** Cryptographically strong randomness for real readings. */
export function secureRandom(): RandomSource {
  const buffer = new Uint32Array(1);
  return () => {
    globalThis.crypto.getRandomValues(buffer);
    return buffer[0] / 0x1_0000_0000;
  };
}

function hashSeed(seed: string): number {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Deterministic PRNG (mulberry32) for tests and reproducible readings. */
export function seededRandom(seed: string | number): RandomSource {
  let state = typeof seed === "number" ? seed >>> 0 : hashSeed(seed);
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 0x1_0000_0000;
  };
}

/** Uniform integer in [0, max). */
export function randomInt(random: RandomSource, max: number): number {
  return Math.min(max - 1, Math.floor(random() * max));
}
