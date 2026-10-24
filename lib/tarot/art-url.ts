import { renderCardBack, renderCardFront } from "@/lib/tarot/art";
import type { Lang } from "@/lib/i18n/lang";
import { MESSAGES } from "@/lib/i18n/messages";
import { cardIn } from "@/lib/tarot/localize";
import type { TarotCard } from "@/types/tarot";

const svgCache = new Map<string, string>();
const urlCache = new Map<string, string>();

function toDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Front artwork SVG for a card, with its title, rank label and alt text in the given language. */
export function cardFrontSvg(cardId: string, lang: Lang): string {
  const key = `${cardId}:${lang}`;
  let svg = svgCache.get(key);
  if (!svg) {
    const card: TarotCard = cardIn(cardId, lang);
    const rankLabel = lang !== "en" && card.rank ? MESSAGES[lang].rankLabels[card.rank] : undefined;
    svg = renderCardFront({ ...card, rankLabel });
    svgCache.set(key, svg);
  }
  return svg;
}

/** Memoised data: URL of a card's front artwork. */
export function cardFrontUrl(cardId: string, lang: Lang): string {
  const key = `${cardId}:${lang}`;
  let url = urlCache.get(key);
  if (!url) {
    url = toDataUrl(cardFrontSvg(cardId, lang));
    urlCache.set(key, url);
  }
  return url;
}

let backUrl: string | null = null;
export function cardBackUrl(): string {
  backUrl ??= toDataUrl(renderCardBack());
  return backUrl;
}
