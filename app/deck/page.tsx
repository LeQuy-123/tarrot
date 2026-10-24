import type { Metadata } from "next";
import { DeckEncyclopedia } from "@/components/deck/DeckEncyclopedia";
import { SiteFooter } from "@/components/ui/SiteFooter";

export const metadata: Metadata = {
  title: "The Deck",
  description: "Browse and search all 78 original cards of the Astral Archive.",
};

export default function DeckPage() {
  return (
    <>
      <DeckEncyclopedia />
      <SiteFooter />
    </>
  );
}
