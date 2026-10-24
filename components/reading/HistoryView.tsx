"use client";

import Link from "next/link";
import { useState } from "react";
import { useHistory, useHydrated } from "@/lib/hooks";
import { clearHistory, deleteReading, saveReading, type SavedReading } from "@/lib/storage/history";
import type { ReadingFailure } from "@/lib/ai/client";
import { interpretReading } from "@/lib/reading/interpretation";
import { settingsStore } from "@/lib/storage/settings";
import { cardIn, spreadIn } from "@/lib/tarot/localize";
import { useLang, useMessages, type Lang } from "@/lib/i18n";
import { Spread2D } from "@/components/spreads/Spread2D";
import { Ornament, Sigil } from "@/components/ui/Sigil";
import { InterpretationBody } from "./InterpretationView";

const dateFormats: Record<Lang, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }),
  vi: new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }),
};

function HistoryEntry({ entry }: { entry: SavedReading }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ReadingFailure | null>(null);
  const [lang] = useLang();
  const m = useMessages();
  const h = m.history;
  const spread = spreadIn(entry.spreadId, lang);

  async function retry() {
    setPending(true);
    setError(null);
    const result = await interpretReading(
      { question: entry.question, spreadId: entry.spreadId, tone: entry.tone, cards: entry.cards, language: lang },
      { useAI: settingsStore.get().aiReading },
    );
    setPending(false);
    if (result.ok) saveReading({ ...entry, reading: result.reading });
    else setError(result.error);
  }

  return (
    <li className="panel rounded-2xl">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="min-w-0 flex-1 text-left">
          <span className="text-[11px] tracking-[0.25em] text-gold uppercase">
            {spread.name} · {dateFormats[lang].format(new Date(entry.createdAt))}
          </span>
          <span className="mt-1 block truncate font-display text-xl text-parchment">
            {entry.question ? `“${entry.question}”` : h.general}
          </span>
          <span className="mt-0.5 block truncate text-sm text-muted">
            {entry.cards
              .map((c) => `${cardIn(c.cardId, lang).name}${c.orientation === "reversed" ? ` (${m.common.reversedTag})` : ""}`)
              .join(" · ")}
          </span>
        </button>
        <div className="flex shrink-0 items-center gap-2">
          {!entry.reading && (
            <span className="rounded-full border border-ember/50 px-2 py-0.5 text-[11px] text-ember">{h.noInterpretation}</span>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-hairline px-3 py-1 text-sm text-parchment/85 hover:border-gold/40"
          >
            {open ? h.closeEntry : h.open}
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(h.confirmDelete)) deleteReading(entry.id);
            }}
            className="rounded-full px-3 py-1 text-sm text-muted hover:text-ember"
            aria-label={h.deleteLabel}
          >
            {h.delete}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-hairline p-4 sm:p-6">
          <Spread2D spread={spread} deal={entry.cards} revealed={entry.cards.map(() => true)} compact className="w-full" />
          <p className="mt-4 text-center text-xs text-muted">{h.tone(m.tones[entry.tone].label)}</p>
          <div className="mx-auto mt-6 max-w-2xl">
            {entry.reading ? (
              <InterpretationBody interpretation={entry.reading.interpretation} spread={spread} deal={entry.cards} />
            ) : (
              <div className="rounded-xl border border-hairline p-5 text-center" role={error ? "alert" : undefined}>
                <p className="text-parchment">{h.missing}</p>
                {error && (
                  <p className="mt-1 text-sm text-ember">{lang === "en" ? error.message : m.errors[error.code]}</p>
                )}
                <button
                  type="button"
                  onClick={retry}
                  disabled={pending}
                  className="mt-3 rounded-full border border-gold/60 px-5 py-2 text-sm text-gold-light disabled:opacity-50"
                >
                  {pending ? h.consulting : h.interpret}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export function HistoryView() {
  const history = useHistory();
  const hydrated = useHydrated();
  const h = useMessages().history;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <p className="text-xs tracking-[0.4em] text-gold uppercase">{h.eyebrow}</p>
        <h1 className="engraved mt-2 font-display text-5xl sm:text-6xl">{h.title}</h1>
        <Ornament className="mx-auto mt-3 w-52 text-gold/50" />
      </header>

      {!hydrated ? (
        <div className="mt-16 flex justify-center" role="status">
          <Sigil className="h-10 w-10 animate-[slow-spin_8s_linear_infinite] text-gold/60" />
          <span className="sr-only">{h.loading}</span>
        </div>
      ) : history.length === 0 ? (
        <div className="panel mx-auto mt-12 max-w-md rounded-2xl p-8 text-center">
          <p className="font-display text-2xl text-parchment">{h.emptyTitle}</p>
          <p className="mt-2 text-sm text-muted">{h.emptyBody}</p>
          <Link href="/reading" className="mt-5 inline-block rounded-full border border-gold/60 px-6 py-2 text-gold-light">
            {h.begin}
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-muted">{h.count(history.length)}</p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(h.confirmClear)) clearHistory();
              }}
              className="text-sm text-muted underline-offset-4 hover:text-ember hover:underline"
            >
              {h.clearAll}
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {history.map((entry) => (
              <HistoryEntry key={entry.id} entry={entry} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
