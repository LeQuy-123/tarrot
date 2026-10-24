"use client";

import Link from "next/link";
import type { DrawnCard, SpreadDefinition } from "@/types/tarot";
import type { InterpretationState } from "@/lib/reading/machine";
import type { ReadingInterpretation } from "@/lib/ai/schema";
import { cardIn } from "@/lib/tarot/localize";
import { useLang, useMessages } from "@/lib/i18n";
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
  const [lang] = useLang();
  const m = useMessages();
  const t = m.interpretation;
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="mb-1 text-xs tracking-[0.25em] text-gold uppercase">{t.theme}</h3>
        <p className="font-display text-2xl leading-snug text-gold-light">{interpretation.theme}</p>
      </section>
      <section>
        <h3 className="mb-2 text-xs tracking-[0.25em] text-gold uppercase">{t.theCards}</h3>
        <ol className="space-y-4">
          {interpretation.cards.map((entry, i) => {
            const card = cardIn(entry.cardId, lang);
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
                    {deal[i]?.orientation === "reversed" && <span className="text-sm text-[#cfc6f2] italic"> · {m.common.reversedTag}</span>}
                  </span>
                </button>
                <p className="mt-1 leading-relaxed text-parchment/90">{entry.interpretation}</p>
              </li>
            );
          })}
        </ol>
      </section>
      <List title={t.relationships} items={interpretation.relationships} />
      <List title={t.patterns} items={interpretation.patterns} />
      <List title={t.questions} items={interpretation.reflectionQuestions} />
      <List title={t.nextSteps} items={interpretation.nextSteps} ordered />
      <section className="rounded-xl border border-gold/30 bg-gold/5 p-4">
        <h3 className="mb-1 text-xs tracking-[0.25em] text-gold uppercase">{t.closing}</h3>
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
  const [lang] = useLang();
  const m = useMessages();
  const t = m.interpretation;
  if (state.status === "idle" || state.status === "loading") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 py-12 text-center">
        <Sigil className="h-14 w-14 animate-[slow-spin_6s_linear_infinite] text-gold" />
        <p className="font-display text-xl text-gold-light">{t.loadingTitle}</p>
        <p className="text-sm text-muted">{t.loadingBody(deal.length)}</p>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-ember/50 bg-ember/10 p-6 text-center">
        <p className="font-display text-xl text-parchment">{t.errorTitle}</p>
        {/* English keeps the server's specific message; other languages use a translated message per error code. */}
        <p className="text-sm text-muted">{lang === "en" ? state.error.message : m.errors[state.error.code]}</p>
        <p className="text-xs text-muted">{t.errorSafe}</p>
        {state.error.code === "configuration" ? (
          <Link
            href="/settings"
            className="mt-2 rounded-full border border-gold/70 px-6 py-2 text-gold-light hover:bg-gold/10"
          >
            {t.openSettings}
          </Link>
        ) : state.error.retryable ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 rounded-full border border-gold/70 px-6 py-2 text-gold-light hover:bg-gold/10"
          >
            {t.tryAgain}
          </button>
        ) : (
          <button type="button" onClick={onRetry} className="mt-2 text-sm text-gold-light underline underline-offset-4">
            {t.tryAnyway}
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
        {reading.provider === "archive"
          ? t.byArchive
          : reading.provider === "mock"
            ? t.byMock
            : t.byModel(reading.model)}{" "}
        {t.disclaimer}{" "}
        <Link href="/legal" className="underline underline-offset-2 hover:text-parchment">
          {m.common.legalNotice}
        </Link>
      </p>
    </div>
  );
}
