"use client";

import { useMessages } from "@/lib/i18n";

export function SkipLink() {
  const m = useMessages();
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded bg-gold px-3 py-2 text-void focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {m.common.skipToContent}
    </a>
  );
}
