import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { LandingSections } from "@/components/ui/LandingSections";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  description:
    "An immersive 3D tarot reading chamber with an original 78-card deck. Shuffle, draw by hand and reflect on your reading — free, private, in English and Vietnamese.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <LandingSections />
    </>
  );
}
