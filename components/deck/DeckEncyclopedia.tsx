"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Suit, TarotCard } from "@/types/tarot";
import { searchDeck, SUIT_INFO, SUITS } from "@/lib/tarot/deck";
import { CardFront } from "@/components/cards/CardImage";
import { Ornament } from "@/components/ui/Sigil";

type Filter = "all" | "major" | Suit;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All 78" },
  { id: "major", label: "Major Arcana" },
  ...SUITS.map((s) => ({ id: s as Filter, label: SUIT_INFO[s].name })),
];

function CardModal({ card, onClose }: { card: TarotCard; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const d = dialog.current;
    if (d && !d.open) d.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
      aria-labelledby={titleId}
      className="m-auto max-h-[90dvh] w-[min(56rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-hairline bg-midnight p-0 text-parchment backdrop:bg-void/80 backdrop:backdrop-blur-sm"
    >
      <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:p-8">
        <div className="mx-auto w-48 sm:w-full">
          <CardFront card={card} />
        </div>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] text-gold uppercase">
                {card.arcana === "major" ? `Major Arcana · ${card.number}` : `${SUIT_INFO[card.suit!].name} · ${SUIT_INFO[card.suit!].element}`}
              </p>
              <h2 id={titleId} className="mt-1 font-display text-4xl leading-none">
                {card.name}
              </h2>
              <p className="mt-1 font-display text-xl text-gold-light italic">{card.archetype}</p>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="rounded-full px-2 py-1 text-muted hover:text-parchment"
              aria-label="Close"
              autoFocus
            >
              ✕
            </button>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <section>
              <h3 className="text-xs tracking-[0.25em] text-gold uppercase">Upright</h3>
              <p className="mt-1 text-sm leading-relaxed">{card.upright}</p>
              <p className="mt-2 text-xs text-muted">{card.keywords.upright.join(" · ")}</p>
              <p className="mt-3 text-sm leading-relaxed text-parchment/85">
                <span className="text-[11px] tracking-[0.2em] text-gold uppercase">Outlook · </span>
                {card.prediction.upright}
              </p>
            </section>
            <section>
              <h3 className="text-xs tracking-[0.25em] text-[#cfc6f2] uppercase">Reversed</h3>
              <p className="mt-1 text-sm leading-relaxed">{card.reversed}</p>
              <p className="mt-2 text-xs text-muted">{card.keywords.reversed.join(" · ")}</p>
              <p className="mt-3 text-sm leading-relaxed text-parchment/85">
                <span className="text-[11px] tracking-[0.2em] text-[#cfc6f2] uppercase">Outlook · </span>
                {card.prediction.reversed}
              </p>
            </section>
          </div>
          <p className="mt-3 text-[11px] text-muted">Outlooks are prompts for reflection, not forecasts.</p>
          <section className="mt-5">
            <h3 className="text-xs tracking-[0.25em] text-gold uppercase">In the spread</h3>
            <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
              {(
                [
                  ["As the situation", card.lenses.self],
                  ["As a challenge", card.lenses.obstacle],
                  ["As advice", card.lenses.guidance],
                  ["As an outcome", card.lenses.outcome],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted">{k}</dt>
                  <dd className="leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="mt-5">
            <h3 className="text-xs tracking-[0.25em] text-gold uppercase">Symbols</h3>
            <p className="mt-1 text-sm text-muted">{card.symbols.join(" · ")}</p>
          </section>
          <section className="mt-5">
            <h3 className="text-xs tracking-[0.25em] text-gold uppercase">The artwork</h3>
            <p className="mt-1 text-sm text-muted">{card.altText}</p>
          </section>
        </div>
      </div>
    </dialog>
  );
}

export function DeckEncyclopedia() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<TarotCard | null>(null);
  const deferred = useDeferredValue(query);
  const searchId = useId();

  const results = useMemo(
    () =>
      searchDeck(deferred, {
        arcana: filter === "major" ? "major" : undefined,
        suit: filter !== "all" && filter !== "major" ? filter : undefined,
      }),
    [deferred, filter],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <p className="text-xs tracking-[0.4em] text-gold uppercase">Encyclopedia</p>
        <h1 className="engraved mt-2 font-display text-5xl sm:text-6xl">The Seventy-Eight</h1>
        <Ornament className="mx-auto mt-3 w-52 text-gold/50" />
      </header>

      <div className="panel sticky top-2 z-10 mx-auto mt-8 flex max-w-4xl flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
        <label htmlFor={searchId} className="sr-only">
          Search cards
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, keyword, symbol…"
          className="min-w-0 flex-1 rounded-xl border border-hairline bg-void/60 px-4 py-2.5 placeholder:text-mist/50 focus:border-gold/60 focus:outline-none"
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by arcana">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                filter === f.id ? "border-gold/70 bg-gold/15 text-gold-light" : "border-hairline text-muted hover:text-parchment"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted" aria-live="polite">
        {results.length === 0 ? "No cards match that search." : `${results.length} card${results.length === 1 ? "" : "s"}`}
      </p>

      {results.length === 0 ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="rounded-full border border-gold/60 px-5 py-2 text-sm text-gold-light"
          >
            Clear search
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence initial={false}>
            {results.map((card) => (
              <motion.li key={card.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button
                  type="button"
                  onClick={() => setOpen(card)}
                  className="group block w-full text-left"
                  aria-label={`${card.name} — ${card.archetype}`}
                >
                  <div className="transition duration-300 group-hover:-translate-y-1.5 group-hover:drop-shadow-[0_0_22px_rgb(201_164_92/0.35)]">
                    <CardFront card={card} decorative />
                  </div>
                  <span className="mt-2 block font-display text-lg leading-tight text-parchment">{card.name}</span>
                  <span className="block text-xs text-muted">{card.keywords.upright.slice(0, 3).join(" · ")}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {open && <CardModal key={open.id} card={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
