import { renderCardBack, renderCardFront } from "@/lib/tarot/art";
import type { TarotCard } from "@/types/tarot";

const urlCache = new Map<string, string>();

function toDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Memoised data: URL of a card's front artwork. */
export function cardFrontUrl(card: TarotCard): string {
  let url = urlCache.get(card.id);
  if (!url) {
    url = toDataUrl(renderCardFront(card));
    urlCache.set(card.id, url);
  }
  return url;
}

let backUrl: string | null = null;
export function cardBackUrl(): string {
  backUrl ??= toDataUrl(renderCardBack());
  return backUrl;
}
