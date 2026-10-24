import type { Metadata } from "next";
import { ReadingExperience } from "@/components/reading/ReadingExperience";

export const metadata: Metadata = {
  title: "Reading Chamber",
  description: "Shuffle, draw, and reveal your cards in the 3D reading chamber.",
};

export default function ReadingPage() {
  return <ReadingExperience />;
}
