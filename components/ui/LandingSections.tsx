"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLang, useMessages } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/hooks";
import { CARD_IDS, getCard } from "@/lib/tarot/deck";
import { spreadIn } from "@/lib/tarot/localize";
import { SPREAD_ORDER } from "@/lib/tarot/spreads";
import { CardFront } from "@/components/cards/CardImage";
import { SpreadGlyph } from "@/components/spreads/SpreadGlyph";
import { Ornament, Sigil } from "./Sigil";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Every fifth card, so the ribbon samples the Majors and all four suits. */
const RIBBON = CARD_IDS.filter((_, i) => i % 5 === 0).map(getCard);

/**
 * Fade-and-rise once the element scrolls into view. With reduced motion it shows at once instead; the props must
 * not be dropped, because the server-rendered markup already carries the hidden initial state.
 */
function useReveal() {
  const reduced = useReducedMotion();
  return (delay = 0, y = 28) =>
    reduced
      ? { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.8, delay, ease: EASE },
        };
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  const reveal = useReveal();
  return (
    <motion.div {...reveal()} className="text-center">
      <h2 id={id} className="sheen-text font-display text-4xl sm:text-5xl">
        {children}
      </h2>
      <Ornament className="mx-auto mt-3 w-48 text-gold/50" />
    </motion.div>
  );
}

function CardRibbon() {
  const m = useMessages();
  const reveal = useReveal();
  return (
    <section className="py-10" aria-label={m.landing.ribbon}>
      <div className="marquee overflow-hidden py-6" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) =>
            RIBBON.map((card, i) => (
              <div key={`${copy}-${card.id}`} className="w-28 shrink-0 px-2.5 sm:w-36">
                <div
                  className="transition duration-500 hover:-translate-y-3 hover:scale-105 hover:drop-shadow-[0_0_26px_rgb(201_164_92/0.45)]"
                  style={{ rotate: `${((i % 5) - 2) * 2}deg` }}
                >
                  <CardFront card={card} decorative />
                </div>
              </div>
            )),
          )}
        </div>
      </div>
      <motion.p {...reveal(0.1, 12)} className="px-4 text-center font-display text-xl text-parchment/85 italic">
        {m.landing.ribbon} ·{" "}
        <Link href="/deck" className="text-gold-light not-italic underline-offset-4 hover:underline">
          {m.landing.ribbonLink}
        </Link>
      </motion.p>
    </section>
  );
}

/** Landing page sections below the hero. */
export function LandingSections() {
  const [lang] = useLang();
  const m = useMessages();
  const reveal = useReveal();
  const reduced = useReducedMotion();
  return (
    <>
      <CardRibbon />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="spreads-title">
        <SectionTitle id="spreads-title">{m.landing.spreadsTitle}</SectionTitle>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPREAD_ORDER.map((id, i) => {
            const s = spreadIn(id, lang);
            return (
              <motion.li key={id} {...reveal(i * 0.1)}>
                <Link
                  href="/reading"
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="panel group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_18px_50px_-20px_rgb(201_164_92/0.45)]"
                >
                  {/* Spotlight that follows the pointer */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgb(232 210 154 / 0.14), transparent 65%)",
                    }}
                  />
                  <SpreadGlyph id={id} animated={!reduced} className="mb-4 h-16 w-24 self-start" />
                  <span className="text-xs tracking-[0.3em] text-gold uppercase">{m.common.cards(s.positions.length)}</span>
                  <span className="mt-2 font-display text-2xl text-parchment">{s.name}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{s.description}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6" aria-labelledby="how-title">
        <SectionTitle id="how-title">{m.landing.howTitle}</SectionTitle>
        <ol className="relative mt-10 grid gap-8 md:grid-cols-3">
          {/* Thread joining the three movements, drawn as it scrolls into view */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={reduced ? { duration: 0 } : { duration: 1.4, delay: 0.2, ease: EASE }}
            className="absolute top-8 right-[16.7%] left-[16.7%] hidden h-px origin-left bg-gradient-to-r from-gold/10 via-gold/60 to-gold/10 md:block"
          />
          {m.landing.steps.map((step, i) => (
            <motion.li key={step.title} {...reveal(0.15 + i * 0.2)} className="relative text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-void">
                <motion.span
                  className="absolute inset-0"
                  initial={{ rotate: -120, scale: 0.6, opacity: 0 }}
                  whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={reduced ? { duration: 0 } : { duration: 1.2, delay: 0.25 + i * 0.2, ease: EASE }}
                >
                  <Sigil className="h-full w-full text-gold/50" />
                </motion.span>
                <span className="relative font-display text-2xl text-gold-light">{["I", "II", "III"][i]}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-parchment">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="px-4 pt-6 pb-20 sm:px-6" aria-labelledby="cta-title">
        <motion.div
          {...reveal(0, 36)}
          className="panel relative mx-auto max-w-3xl overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-10"
        >
          <div className="aura pointer-events-none absolute -top-1/2 left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full opacity-60" aria-hidden="true" />
          <Sigil className="animate-slow-spin relative mx-auto h-14 w-14 text-gold/70" />
          <h2 id="cta-title" className="sheen-text relative mt-5 font-display text-4xl sm:text-5xl">
            {m.landing.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md font-display text-xl text-parchment/85 italic">{m.landing.ctaBody}</p>
          <Link
            href="/reading"
            className="btn-shine glow-pulse relative mt-8 inline-block rounded-full border border-gold/70 bg-gradient-to-b from-gold/25 to-gold/5 px-10 py-3 font-display text-xl text-gold-light transition hover:scale-[1.03] hover:from-gold/35"
          >
            {m.hero.begin}
          </Link>
        </motion.div>
      </section>
    </>
  );
}
