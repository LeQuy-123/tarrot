"use client";

import { useEffect } from "react";
import { useReducedMotion, useSettings } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";

/** Mirrors accessibility settings and the active language onto <html>. */
export function SettingsApplier() {
  const [settings] = useSettings();
  const reduced = useReducedMotion();
  const [lang] = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.contrast = settings.highContrast ? "high" : "normal";
    root.dataset.text = settings.largeText ? "large" : "normal";
    root.dataset.motion = settings.motion === "system" ? (reduced ? "reduced" : "system") : settings.motion;
  }, [settings.highContrast, settings.largeText, settings.motion, reduced]);

  return null;
}
