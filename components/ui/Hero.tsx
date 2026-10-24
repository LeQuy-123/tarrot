"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cardIn } from "@/lib/tarot/localize";
import { useLang, useMessages } from "@/lib/i18n";
import { CardBack, CardFront } from "@/components/cards/CardImage";
import { useReducedMotion } from "@/lib/hooks";
import { Ornament } from "./Sigil";

const FEATURED = ["the-star", "the-moon", "the-sun", "the-high-priestess", "wheel-of-fortune"];

// Rounded so server (Node) and browser render identical attributes: their Math.cos/sin can differ
// in the last digit, which would otherwise cause a hydration mismatch.
const round = (n: number) => Math.round(n * 100) / 100;
const TICKS = Array.from({ length: 72 }, (_, i) => {
  const a = (i / 72) * Math.PI * 2;
  const major = i % 6 === 0;
  const r2 = major ? 250 : 262;
  return {
    x1: round(300 + Math.cos(a) * 270),
    y1: round(300 + Math.sin(a) * 270),
    x2: round(300 + Math.cos(a) * r2),
    y2: round(300 + Math.sin(a) * r2),
    major,
  };
});

function Astrolabe() {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden="true" fill="none" stroke="currentColor">
      <g className="animate-slow-spin origin-center" style={{ transformBox: "fill-box" }}>
        <circle cx="300" cy="300" r="290" strokeWidth="0.8" opacity="0.5" />
        <circle cx="300" cy="300" r="270" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.6" />
        {TICKS.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.major ? 1.2 : 0.5} opacity="0.7" />
        ))}
      </g>
      <g className="animate-slow-spin origin-center" style={{ animationDirection: "reverse", animationDuration: "180s", transformBox: "fill-box" }}>
        <circle cx="300" cy="300" r="210" strokeWidth="0.6" opacity="0.45" />
        <path d="M300 90 L330 270 L510 300 L330 330 L300 510 L270 330 L90 300 L270 270 Z" strokeWidth="0.6" opacity="0.35" />
        <path
          d="M300 140 L320 280 L460 300 L320 320 L300 460 L280 320 L140 300 L280 280 Z"
          strokeWidth="0.5"
          opacity="0.3"
          transform="rotate(45 300 300)"
        />
      </g>
      <circle cx="300" cy="300" r="140" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [featured, setFeatured] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 60, damping: 15 });
  const rotX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 60, damping: 15 });

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setFeatured((f) => (f + 1) % FEATURED.length), 4200);
    return () => clearInterval(t);
  }, [reduced]);

  const [lang] = useLang();
  const m = useMessages();
  const card = cardIn(FEATURED[featured], lang);

  return (
    <section
      className="relative isolate overflow-hidden"
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[150vmin] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 text-gold/50">
        <Astrolabe />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase">{m.hero.eyebrow}</p>
          <h1 className="engraved mt-3 font-display text-7xl leading-[0.9] font-semibold tracking-[0.08em] sm:text-8xl lg:text-9xl">
            ARCANA
          </h1>
          <Ornament className="mx-auto mt-5 w-56 text-gold/60 md:mx-0" />
          <p className="mx-auto mt-6 max-w-md font-display text-2xl leading-snug text-parchment/90 md:mx-0">
            {m.hero.intro}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href="/reading"
              className="rounded-full border border-gold/70 bg-gradient-to-b from-gold/25 to-gold/5 px-8 py-3 font-display text-xl text-gold-light shadow-[0_0_34px_-8px_rgb(201_164_92/0.7)] transition hover:from-gold/35"
            >
              {m.hero.begin}
            </Link>
            <Link
              href="/deck"
              className="rounded-full border border-hairline px-8 py-3 font-display text-xl text-parchment/85 transition hover:border-gold/40 hover:text-parchment"
            >
              {m.hero.explore}
            </Link>
          </div>
        </motion.div>

        <div className="relative mx-auto h-[420px] w-full max-w-[420px] [perspective:1400px] sm:h-[480px]">
          <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative h-full w-full [transform-style:preserve-3d]">
            {[-2, -1, 1, 2].map((offset, i) => (
              <motion.div
                key={offset}
                initial={{ opacity: 0, rotate: 0, x: 0 }}
                animate={{ opacity: 1, rotate: offset * 9, x: offset * 46, y: Math.abs(offset) * 14 }}
                transition={{ duration: 1.2, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2"
                style={{ transformOrigin: "50% 120%" }}
              >
                <CardBack className="brightness-75" />
              </motion.div>
            ))}
            <div className="absolute top-1/2 left-1/2 w-[46%] -translate-x-1/2 -translate-y-[55%] animate-float [transform:translateZ(60px)]">
              <motion.div
                key={card.id}
                initial={reduced ? false : { rotateY: 90, opacity: 0.4 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="drop-shadow-[0_0_40px_rgb(201_164_92/0.35)]"
              >
                <CardFront card={card} />
              </motion.div>
              <p className="mt-4 text-center font-display text-lg text-gold-light italic" aria-live="off">
                {card.archetype}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
