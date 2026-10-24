"use client";

import Link from "next/link";
import { useLang, useMessages } from "@/lib/i18n";
import { spreadIn } from "@/lib/tarot/localize";
import { SPREAD_ORDER } from "@/lib/tarot/spreads";
import { Ornament, Sigil } from "./Sigil";

/** Landing page sections below the hero. */
export function LandingSections() {
  const [lang] = useLang();
  const m = useMessages();
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="spreads-title">
        <div className="text-center">
          <h2 id="spreads-title" className="engraved font-display text-4xl sm:text-5xl">
            {m.landing.spreadsTitle}
          </h2>
          <Ornament className="mx-auto mt-3 w-48 text-gold/50" />
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPREAD_ORDER.map((id) => {
            const s = spreadIn(id, lang);
            return (
              <li key={id}>
                <Link
                  href="/reading"
                  className="panel group flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-1 hover:border-gold/50"
                >
                  <span className="text-xs tracking-[0.3em] text-gold uppercase">
                    {m.common.cards(s.positions.length)}
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
            {m.landing.howTitle}
          </h2>
          <Ornament className="mx-auto mt-3 w-48 text-gold/50" />
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {m.landing.steps.map((step, i) => (
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
