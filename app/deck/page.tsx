import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { DeckEncyclopedia } from "@/components/deck/DeckEncyclopedia";

export const metadata: Metadata = pageMetadata({
  title: "The Deck",
  description:
    "Browse and search all 78 original tarot cards — Major Arcana and the four suits — with upright and reversed meanings, keywords and symbols.",
  path: "/deck",
});

export default function DeckPage() {
  return <DeckEncyclopedia />;
}
