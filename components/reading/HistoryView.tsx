"use client";

import Link from "next/link";
import { useState } from "react";
import { useHistory, useHydrated } from "@/lib/hooks";
import { clearHistory, deleteReading, saveReading, type SavedReading } from "@/lib/storage/history";
import { requestReading, type ReadingFailure } from "@/lib/ai/client";
import { getSpread } from "@/lib/tarot/spreads";
import { getCard } from "@/lib/tarot/deck";
import { TONE_LABELS } from "@/lib/ai/schema";
import { Spread2D } from "@/components/spreads/Spread2D";
import { Ornament, Sigil } from "@/components/ui/Sigil";
import { InterpretationBody } from "./InterpretationView";

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

function HistoryEntry({ entry }: { entry: SavedReading }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ReadingFailure | null>(null);
  const spread = getSpread(entry.spreadId);

  async function retry() {
    setPending(true);
    setError(null);
    const result = await requestReading({
      question: entry.question,
      spreadId: entry.spreadId,
      tone: entry.tone,
      cards: entry.cards,
    });
    setPending(false);
    if (result.ok) saveReading({ ...entry, reading: result.reading });
    else setError(result.error);
  }

  return (
    <li className="panel rounded-2xl">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="min-w-0 flex-1 text-left">
          <span className="text-[11px] tracking-[0.25em] text-gold uppercase">
            {spread.name} · {dateFormat.format(new Date(entry.createdAt))}
          </span>
          <span className="mt-1 block truncate font-display text-xl text-parchment">
            {entry.question ? `“${entry.question}”` : "A general reflection"}
          </span>
          <span className="mt-0.5 block truncate text-sm text-muted">
            {entry.cards.map((c) => `${getCard(c.cardId).name}${c.orientation === "reversed" ? " (R)" : ""}`).join(" · ")}
          </span>
        </button>
        <div className="flex shrink-0 items-center gap-2">
          {!entry.reading && <span className="rounded-full border border-ember/50 px-2 py-0.5 text-[11px] text-ember">No interpretation</span>}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-hairline px-3 py-1 text-sm text-parchment/85 hover:border-gold/40"
          >
            {open ? "Close" : "Open"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Delete this reading?")) deleteReading(entry.id);
            }}
            className="rounded-full px-3 py-1 text-sm text-muted hover:text-ember"
            aria-label="Delete reading"
          >
            Delete
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-hairline p-4 sm:p-6">
          <Spread2D spread={spread} deal={entry.cards} revealed={entry.cards.map(() => true)} compact className="w-full" />
          <p className="mt-4 text-center text-xs text-muted">Tone: {TONE_LABELS[entry.tone].label}</p>
          <div className="mx-auto mt-6 max-w-2xl">
            {entry.reading ? (
              <InterpretationBody interpretation={entry.reading.interpretation} spread={spread} deal={entry.cards} />
            ) : (
              <div className="rounded-xl border border-hairline p-5 text-center" role={error ? "alert" : undefined}>
                <p className="text-parchment">This reading has no interpretation yet.</p>
                {error && <p className="mt-1 text-sm text-ember">{error.message}</p>}
                <button
                  type="button"
                  onClick={retry}
                  disabled={pending}
                  className="mt-3 rounded-full border border-gold/60 px-5 py-2 text-sm text-gold-light disabled:opacity-50"
                >
                  {pending ? "Consulting the archive…" : "Interpret these cards"}
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

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <p className="text-xs tracking-[0.4em] text-gold uppercase">Saved on this device</p>
        <h1 className="engraved mt-2 font-display text-5xl sm:text-6xl">Past Readings</h1>
        <Ornament className="mx-auto mt-3 w-52 text-gold/50" />
      </header>

      {!hydrated ? (
        <div className="mt-16 flex justify-center" role="status">
          <Sigil className="h-10 w-10 animate-[slow-spin_8s_linear_infinite] text-gold/60" />
          <span className="sr-only">Loading history…</span>
        </div>
      ) : history.length === 0 ? (
        <div className="panel mx-auto mt-12 max-w-md rounded-2xl p-8 text-center">
          <p className="font-display text-2xl text-parchment">The archive is empty</p>
          <p className="mt-2 text-sm text-muted">Completed readings are kept here, in this browser only.</p>
          <Link href="/reading" className="mt-5 inline-block rounded-full border border-gold/60 px-6 py-2 text-gold-light">
            Begin a reading
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-muted">
              {history.length} reading{history.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Clear all saved readings? This cannot be undone.")) clearHistory();
              }}
              className="text-sm text-muted underline-offset-4 hover:text-ember hover:underline"
            >
              Clear all
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
