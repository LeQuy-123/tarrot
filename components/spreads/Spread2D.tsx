"use client";

import type { DrawnCard, SpreadDefinition } from "@/types/tarot";
import { FlipCard } from "@/components/cards/CardImage";
import { cardIn } from "@/lib/tarot/localize";
import { useLang, useMessages } from "@/lib/i18n";
import { spreadBounds } from "@/lib/tarot/spreads";

const ASPECT = 5 / 3;

/**
 * Flat, responsive rendering of a spread. Positions use the same layout data as the 3D chamber.
 * Cards are buttons so the spread is fully keyboard and touch operable.
 */
export function Spread2D({
  spread,
  deal,
  drawnCount = deal.length,
  revealed,
  selected = null,
  onActivate,
  className = "",
  compact = false,
}: {
  spread: SpreadDefinition;
  deal: DrawnCard[];
  drawnCount?: number;
  revealed: boolean[];
  selected?: number | null;
  onActivate?: (index: number) => void;
  className?: string;
  compact?: boolean;
}) {
  const [lang] = useLang();
  const m = useMessages();
  const b = spreadBounds(spread, ASPECT);
  const pad = 0.12;
  const width = b.width + pad * 2;
  const height = b.height + pad * 2;

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ aspectRatio: `${width} / ${height}`, maxWidth: compact ? `${width * 7}rem` : `${width * 11}rem` }}
    >
      {spread.positions.map((position, i) => {
        const drawn = deal[i];
        const turned = Boolean(position.rotation);
        const left = ((position.x - 0.5 - b.minX + pad) / width) * 100;
        const top = ((b.maxY - (position.y + ASPECT / 2) + pad) / height) * 100;
        const style = {
          left: `${left}%`,
          top: `${top}%`,
          width: `${(1 / width) * 100}%`,
          transform: turned ? `rotate(${position.rotation}deg)` : undefined,
          zIndex: turned ? 2 : 1,
        };
        if (!drawn || i >= drawnCount) {
          return (
            <div
              key={position.id}
              className="absolute aspect-[3/5] rounded-[4.5%/2.7%] border border-dashed border-gold/35"
              style={style}
              aria-hidden="true"
            />
          );
        }
        const card = cardIn(drawn.cardId, lang);
        const isRevealed = revealed[i] ?? false;
        const label = isRevealed
          ? m.chamber.slotRevealed(i + 1, position.label, card.name, m.common.orientation[drawn.orientation].toLowerCase())
          : m.chamber.slotFaceDown(i + 1, position.label);
        return (
          <button
            key={position.id}
            type="button"
            onClick={() => onActivate?.(i)}
            disabled={!onActivate}
            aria-label={label}
            aria-pressed={selected === i}
            className={`absolute transition-[filter,translate] duration-300 enabled:hover:-translate-y-1 ${
              selected === i ? "-translate-y-1.5 drop-shadow-[0_0_18px_rgb(232_199_122/0.55)]" : ""
            }`}
            style={style}
          >
            <FlipCard card={card} orientation={drawn.orientation} revealed={isRevealed} />
          </button>
        );
      })}
    </div>
  );
}
