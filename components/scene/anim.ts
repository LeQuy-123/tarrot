export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
export const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};
/** Progress of a segment [start, start+duration] at time `now`. */
export const segment = (now: number, start: number, duration: number) =>
  duration <= 0 ? (now >= start ? 1 : 0) : clamp01((now - start) / duration);
/** Exponential damping factor, frame-rate independent. */
export const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);
