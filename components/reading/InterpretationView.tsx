"use client";

import type { DrawnCard, SpreadDefinition } from "@/types/tarot";
import type { InterpretationState } from "@/lib/reading/machine";
import type { ReadingInterpretation } from "@/lib/ai/schema";
import { getCard } from "@/lib/tarot/deck";
import { Sigil } from "@/components/ui/Sigil";

function List({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  if (items.length === 0) return null;
  const Tag = ordered ? "ol" : "ul";
  return (
    <section>
      <h3 className="mb-2 text-xs tracking-[0.25em] text-gold uppercase">{title}</h3>
      <Tag className={`space-y-2 ${ordered ? "list-decimal pl-5" : ""}`}>
        {items.map((item, i) => (
          <li key={i} className={`leading-relaxed text-parchment/90 ${ordered ? "" : "flex gap-2"}`}>
            {!ordered && <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" />}
            <span>{item}</span>
          </li>
        ))}
      </Tag>
    </section>
  );
}

export function InterpretationBody({
  interpretation,
  spread,
  deal,
  onSelectCard,
}: {
  interpretation: ReadingInterpretation;
  spread: SpreadDefinition;
  deal: DrawnCard[];
  onSelectCard?: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="mb-1 text-xs tracking-[0.25em] text-gold uppercase">Theme</h3>
        <p className="font-display text-2xl leading-snug text-gold-light">{interpretation.theme}</p>
      </section>
      <section>
        <h3 className="mb-2 text-xs tracking-[0.25em] text-gold uppercase">The cards</h3>
        <ol className="space-y-4">
          {interpretation.cards.map((entry, i) => {
            const card = getCard(entry.cardId);
            const position = spread.positions[i];
            return (
              <li key={entry.positionId} className="border-l border-gold/30 pl-3">
                <button
                  type="button"
                  onClick={() => onSelectCard?.(i)}
                  disabled={!onSelectCard}
                  className="text-left enabled:hover:text-gold-light"
                >
                  <span className="text-[11px] tracking-[0.2em] text-muted uppercase">
                    {i + 1} · {position.label}
                  </span>
                  <span className="block font-display text-lg text-parchment">
                    {card.name}
                    {deal[i]?.orientation === "reversed" && <span className="text-sm text-[#cfc6f2] italic"> · reversed</span>}
                  </span>
                </button>
                <p className="mt-1 leading-relaxed text-parchment/90">{entry.interpretation}</p>
              </li>
            );
          })}
        </ol>
      </section>
      <List title="How the cards speak to each other" items={interpretation.relationships} />
      <List title="Patterns & tensions" items={interpretation.patterns} />
      <List title="Questions for reflection" items={interpretation.reflectionQuestions} />
      <List title="Practical next steps" items={interpretation.nextSteps} ordered />
      <section className="rounded-xl border border-gold/30 bg-gold/5 p-4">
        <h3 className="mb-1 text-xs tracking-[0.25em] text-gold uppercase">Closing</h3>
        <p className="font-display text-lg leading-relaxed text-parchment">{interpretation.summary}</p>
      </section>
    </div>
  );
}

export function InterpretationView({
  state,
  spread,
  deal,
  onRetry,
  onSelectCard,
}: {
  state: InterpretationState;
  spread: SpreadDefinition;
  deal: DrawnCard[];
  onRetry: () => void;
  onSelectCard?: (index: number) => void;
}) {
  if (state.status === "idle" || state.status === "loading") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 py-12 text-center">
        <Sigil className="h-14 w-14 animate-[slow-spin_6s_linear_infinite] text-gold" />
        <p className="font-display text-xl text-gold-light">The archive is consulting the stars…</p>
        <p className="text-sm text-muted">Weaving your {deal.length} card{deal.length > 1 ? "s" : ""} into a reading.</p>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-ember/50 bg-ember/10 p-6 text-center">
        <p className="font-display text-xl text-parchment">The reading could not be woven</p>
        <p className="text-sm text-muted">{state.error.message}</p>
        <p className="text-xs text-muted">
          Your cards are safe — they are already drawn and saved. Only the interpretation failed.
        </p>
        {state.error.retryable ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 rounded-full border border-gold/70 px-6 py-2 text-gold-light hover:bg-gold/10"
          >
            Try again
          </button>
        ) : (
          <button type="button" onClick={onRetry} className="mt-2 text-sm text-gold-light underline underline-offset-4">
            Try anyway
          </button>
        )}
      </div>
    );
  }
  const { reading } = state;
  return (
    <div className="flex flex-col gap-4">
      <InterpretationBody interpretation={reading.interpretation} spread={spread} deal={deal} onSelectCard={onSelectCard} />
      <p className="text-[11px] text-muted">
        {reading.provider === "mock"
          ? "Interpreted by the offline archive (development mock) from card data."
          : `Interpreted by ${reading.model}.`}{" "}
        A reflective reading, not a prediction or professional advice.
      </p>
    </div>
  );
}
