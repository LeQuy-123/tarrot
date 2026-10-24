import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { Ornament, Sigil } from "@/components/ui/Sigil";
import { SPREAD_ORDER, SPREADS } from "@/lib/tarot/spreads";

const STEPS = [
  {
    title: "Shuffle & cut",
    body: "The deck is shuffled with cryptographic randomness the moment you begin. Your cards are fixed then — the animation only reveals them.",
  },
  {
    title: "Draw by hand",
    body: "Draw each card from the deck yourself, place it in the spread, and turn it over when you are ready. Mouse, touch, and keyboard all work.",
  },
  {
    title: "Reflect",
    body: "An interpreter weaves the actual cards, positions, and orientations into a reading — themes, tensions, questions, and small next steps.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="spreads-title">
        <div className="text-center">
          <h2 id="spreads-title" className="engraved font-display text-4xl sm:text-5xl">
            Four ways to ask
          </h2>
          <Ornament className="mx-auto mt-3 w-48 text-gold/50" />
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPREAD_ORDER.map((id) => {
            const s = SPREADS[id];
            return (
              <li key={id}>
                <Link
                  href="/reading"
                  className="panel group flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-1 hover:border-gold/50"
                >
                  <span className="text-xs tracking-[0.3em] text-gold uppercase">
                    {s.positions.length} card{s.positions.length > 1 ? "s" : ""}
                  </span>
                  <span className="mt-2 font-display text-2xl text-parchment">{s.name}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{s.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6" aria-labelledby="how-title">
        <div className="text-center">
          <h2 id="how-title" className="engraved font-display text-4xl sm:text-5xl">
            How it works, in three movements
          </h2>
          <Ornament className="mx-auto mt-3 w-48 text-gold/50" />
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
                <Sigil className="absolute inset-0 text-gold/40" />
                <span className="font-display text-2xl text-gold-light">{["I", "II", "III"][i]}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-parchment">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
