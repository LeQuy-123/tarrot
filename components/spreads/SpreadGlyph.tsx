"use client";

import { motion } from "motion/react";
import type { SpreadId } from "@/types/tarot";
import { SPREADS } from "@/lib/tarot/spreads";

/** Miniature diagram of a spread's layout. `animated` deals the cards in one by one when scrolled into view. */
export function SpreadGlyph({ id, animated = false, className = "h-12 w-20" }: { id: SpreadId; animated?: boolean; className?: string }) {
  const spread = SPREADS[id];
  const xs = spread.positions.map((p) => p.x);
  const ys = spread.positions.map((p) => p.y);
  const minX = Math.min(...xs) - 0.6;
  const maxX = Math.max(...xs) + 0.6;
  const minY = Math.min(...ys) - 0.95;
  const maxY = Math.max(...ys) + 0.95;
  return (
    <svg viewBox={`${minX} ${-maxY} ${maxX - minX} ${maxY - minY}`} className={className} aria-hidden="true">
      {spread.positions.map((p, i) => {
        const rect = (
          <rect
            x={p.x - 0.4}
            y={-p.y - 0.67}
            width={0.8}
            height={1.33}
            rx={0.08}
            transform={p.rotation ? `rotate(${p.rotation} ${p.x} ${-p.y})` : undefined}
            className="fill-gold/15 stroke-gold"
            strokeWidth={0.06}
          />
        );
        if (!animated) return <g key={p.id}>{rect}</g>;
        return (
          <motion.g
            key={p.id}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.25 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            {rect}
          </motion.g>
        );
      })}
    </svg>
  );
}
