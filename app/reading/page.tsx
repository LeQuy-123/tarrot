import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ReadingExperience } from "@/components/reading/ReadingExperience";

export const metadata: Metadata = pageMetadata({
  title: "Reading Chamber",
  description:
    "Shuffle, draw and reveal your own tarot cards in a 3D reading chamber: daily card, past-present-future, a two-path decision spread or the Celtic Cross.",
  path: "/reading",
});

export default function ReadingPage() {
  return <ReadingExperience />;
}
