"use client";

import { memo } from "react";
import type { Orientation, TarotCard } from "@/types/tarot";
import { cardBackUrl, cardFrontUrl } from "@/lib/tarot/art-url";
import { useLang, useMessages } from "@/lib/i18n";
import { cardIn } from "@/lib/tarot/localize";

/* eslint-disable @next/next/no-img-element -- art is generated inline SVG, not an optimisable asset */

export const CardFront = memo(function CardFront({
  card,
  orientation = "upright",
  className = "",
  decorative = false,
}: {
  card: TarotCard;
  orientation?: Orientation;
  className?: string;
  decorative?: boolean;
}) {
  const [lang] = useLang();
  const m = useMessages();
  const shown = cardIn(card.id, lang);
  return (
    <img
      src={cardFrontUrl(card.id, lang)}
      alt={decorative ? "" : `${shown.name}${orientation === "reversed" ? ` (${m.common.reversedTag})` : ""}. ${shown.altText}`}
      draggable={false}
      className={`aspect-[3/5] w-full rounded-[4.5%/2.7%] object-cover shadow-[0_10px_40px_-12px_rgb(0_0_0/0.9)] ring-1 ring-gold/30 ${
        orientation === "reversed" ? "rotate-180" : ""
      } ${className}`}
    />
  );
});

export const CardBack = memo(function CardBack({ className = "" }: { className?: string }) {
  return (
    <img
      src={cardBackUrl()}
      alt=""
      draggable={false}
      className={`aspect-[3/5] w-full rounded-[4.5%/2.7%] object-cover shadow-[0_10px_40px_-12px_rgb(0_0_0/0.9)] ring-1 ring-gold/30 ${className}`}
    />
  );
});

/** CSS 3D flip card used by the 2D fallback and history. */
export function FlipCard({
  card,
  orientation,
  revealed,
  className = "",
}: {
  card: TarotCard;
  orientation: Orientation;
  revealed: boolean;
  className?: string;
}) {
  return (
    <div className={`flip-card aspect-[3/5] ${className}`} data-revealed={revealed}>
      <div className="flip-card-inner">
        <div className="flip-card-face">
          <CardBack />
        </div>
        <div className="flip-card-face flip-card-front">
          <CardFront card={card} orientation={orientation} decorative={!revealed} />
        </div>
      </div>
    </div>
  );
}
