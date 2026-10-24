"use client";

import { useId } from "react";
import { motion } from "motion/react";
import type { SpreadId } from "@/types/tarot";
import { SPREAD_ORDER, SPREADS } from "@/lib/tarot/spreads";
import { TONE_LABELS, TONES, type Tone } from "@/lib/ai/schema";
import { Ornament } from "@/components/ui/Sigil";

function SpreadGlyph({ id }: { id: SpreadId }) {
  const spread = SPREADS[id];
  const xs = spread.positions.map((p) => p.x);
  const ys = spread.positions.map((p) => p.y);
  const minX = Math.min(...xs) - 0.6;
  const maxX = Math.max(...xs) + 0.6;
  const minY = Math.min(...ys) - 0.95;
  const maxY = Math.max(...ys) + 0.95;
  return (
    <svg viewBox={`${minX} ${-maxY} ${maxX - minX} ${maxY - minY}`} className="h-12 w-20" aria-hidden="true">
      {spread.positions.map((p) => (
        <rect
          key={p.id}
          x={p.x - 0.4}
          y={-p.y - 0.67}
          width={0.8}
          height={1.33}
          rx={0.08}
          transform={p.rotation ? `rotate(${p.rotation} ${p.x} ${-p.y})` : undefined}
          className="fill-gold/15 stroke-gold"
          strokeWidth={0.06}
        />
      ))}
    </svg>
  );
}

export function SetupPanel({
  spreadId,
  question,
  tone,
  onChange,
  onBegin,
}: {
  spreadId: SpreadId;
  question: string;
  tone: Tone;
  onChange: (patch: { spreadId?: SpreadId; question?: string; tone?: Tone }) => void;
  onBegin: () => void;
}) {
  const questionId = useId();
  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={(e) => {
        e.preventDefault();
        onBegin();
      }}
      className="panel mx-auto w-full max-w-3xl rounded-2xl p-5 sm:p-8"
      aria-labelledby="setup-title"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.4em] text-gold uppercase">The Reading Chamber</p>
        <h1 id="setup-title" className="engraved mt-2 font-display text-4xl sm:text-5xl">
          Compose your reading
        </h1>
        <Ornament className="mx-auto mt-3 w-48 text-gold/60" />
      </div>

      <fieldset className="mt-7">
        <legend className="mb-3 font-display text-xl text-gold-light">1 · Choose a spread</legend>
        <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
          {SPREAD_ORDER.map((id) => {
            const spread = SPREADS[id];
            const checked = id === spreadId;
            return (
              <label
                key={id}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-light ${
                  checked ? "border-gold/70 bg-gold/10" : "border-hairline hover:border-gold/40 hover:bg-white/[0.02]"
                }`}
              >
                <input
                  type="radio"
                  name="spread"
                  value={id}
                  checked={checked}
                  onChange={() => onChange({ spreadId: id })}
                  className="sr-only"
                />
                <SpreadGlyph id={id} />
                <span className="min-w-0">
                  <span className="block font-display text-lg leading-tight text-parchment">{spread.name}</span>
                  <span className="block text-xs text-muted">
                    {spread.positions.length} card{spread.positions.length > 1 ? "s" : ""} · {spread.tagline}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7">
        <label htmlFor={questionId} className="mb-2 block font-display text-xl text-gold-light">
          2 · Ask your question <span className="text-sm text-muted">(optional)</span>
        </label>
        <textarea
          id={questionId}
          value={question}
          maxLength={500}
          rows={2}
          onChange={(e) => onChange({ question: e.target.value })}
          placeholder="What do I need to understand about the path ahead?"
          className="w-full resize-none rounded-xl border border-hairline bg-void/60 px-4 py-3 text-parchment placeholder:text-mist/50 focus:border-gold/60 focus:outline-none"
        />
        <p className="mt-1 text-right text-xs text-muted" aria-live="polite">
          {question.length}/500
        </p>
      </div>

      <fieldset className="mt-4">
        <legend className="mb-3 font-display text-xl text-gold-light">3 · Interpretation tone</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {TONES.map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-light ${
                t === tone ? "border-gold/70 bg-gold/15 text-gold-light" : "border-hairline text-muted hover:text-parchment"
              }`}
              title={TONE_LABELS[t].hint}
            >
              <input type="radio" name="tone" value={t} checked={t === tone} onChange={() => onChange({ tone: t })} className="sr-only" />
              {TONE_LABELS[t].label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          type="submit"
          className="group relative overflow-hidden rounded-full border border-gold/70 bg-gradient-to-b from-gold/25 to-gold/5 px-10 py-3 font-display text-xl tracking-wide text-gold-light shadow-[0_0_30px_-8px_rgb(201_164_92/0.6)] transition hover:from-gold/35 hover:shadow-[0_0_40px_-6px_rgb(201_164_92/0.8)]"
        >
          Shuffle the deck
        </button>
        <p className="max-w-md text-center text-xs text-muted">
          Readings are for reflection and entertainment — not predictions, and not medical, legal, or financial advice.
        </p>
      </div>
    </motion.form>
  );
}
