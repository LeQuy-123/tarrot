"use client";

import type { DrawnCard, SpreadPosition } from "@/types/tarot";
import { CardFront } from "@/components/cards/CardImage";
import { getCard, SUIT_INFO } from "@/lib/tarot/deck";
import { orientationLabel, positionalMeaning } from "@/lib/tarot/interpret";

export function CardDetail({
  drawn,
  position,
  index,
  aiInterpretation,
}: {
  drawn: DrawnCard;
  position: SpreadPosition;
  index: number;
  aiInterpretation?: string;
}) {
  const card = getCard(drawn.cardId);
  const meaning = positionalMeaning(card, drawn.orientation, position);
  const reversed = drawn.orientation === "reversed";
  return (
    <article aria-labelledby={`card-detail-${index}`} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-24 shrink-0 sm:w-28">
          <CardFront card={card} orientation={drawn.orientation} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.3em] text-gold uppercase">
            {index + 1} · {position.label}
          </p>
          <h2 id={`card-detail-${index}`} className="mt-1 font-display text-3xl leading-none text-parchment">
            {card.name}
          </h2>
          <p className="mt-1 font-display text-lg text-gold-light italic">{card.archetype}</p>
          <p className="mt-2 inline-flex items-center gap-2 text-xs">
            <span
              className={`rounded-full border px-2 py-0.5 ${
                reversed ? "border-violet/70 bg-violet/20 text-[#cfc6f2]" : "border-gold/50 bg-gold/10 text-gold-light"
              }`}
            >
              {orientationLabel(drawn.orientation)}
            </span>
            <span className="text-muted capitalize">
              {card.suit ? `${SUIT_INFO[card.suit].name} · ${card.element}` : `Major Arcana · ${card.element}`}
            </span>
          </p>
        </div>
      </div>

      <p className="text-sm text-muted italic">{position.prompt}</p>

      {aiInterpretation && (
        <section>
          <h3 className="mb-1 text-xs tracking-[0.25em] text-gold uppercase">In your reading</h3>
          <p className="leading-relaxed text-parchment/95">{aiInterpretation}</p>
        </section>
      )}

      <section>
        <h3 className="mb-1 text-xs tracking-[0.25em] text-gold uppercase">In this position</h3>
        <p className="leading-relaxed text-parchment/90">{meaning.lens}</p>
      </section>
      <section>
        <h3 className="mb-1 text-xs tracking-[0.25em] text-gold uppercase">{orientationLabel(drawn.orientation)} meaning</h3>
        <p className="leading-relaxed text-parchment/90">{meaning.meaning}</p>
      </section>
      <ul className="flex flex-wrap gap-1.5" aria-label="Keywords">
        {meaning.keywords.map((k) => (
          <li key={k} className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-muted">
            {k}
          </li>
        ))}
      </ul>
    </article>
  );
}
