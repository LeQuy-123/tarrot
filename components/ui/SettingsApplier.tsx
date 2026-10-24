"use client";

import { useEffect } from "react";
import { useReducedMotion, useSettings } from "@/lib/hooks";

/** Mirrors accessibility settings onto <html> data attributes consumed by CSS. */
export function SettingsApplier() {
  const [settings] = useSettings();
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.contrast = settings.highContrast ? "high" : "normal";
    root.dataset.text = settings.largeText ? "large" : "normal";
    root.dataset.motion = settings.motion === "system" ? (reduced ? "reduced" : "system") : settings.motion;
  }, [settings.highContrast, settings.largeText, settings.motion, reduced]);

  return null;
}
