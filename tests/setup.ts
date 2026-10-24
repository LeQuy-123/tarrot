import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  vi.restoreAllMocks();
  if (typeof window === "undefined") return;
  cleanup();
  window.localStorage.clear();
});
