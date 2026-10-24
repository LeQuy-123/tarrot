import type { SpreadDefinition, SpreadId } from "@/types/tarot";

// Layout units are card widths; a card is 1 wide and ~1.667 tall.
// +y points away from the reader.

const daily: SpreadDefinition = {
  id: "daily",
  name: "Daily Guidance",
  tagline: "One card to carry through the day",
  description:
    "A single card drawn as a lens for the hours ahead: a quality to notice, invite, or work with.",
  interpretationGuide:
    "Read the single card as a theme for today. Keep it grounded: one quality to notice and one small way to embody it.",
  positions: [
    {
      id: "guidance",
      label: "Today's Lens",
      prompt: "What quality or theme is worth carrying through today?",
      lens: "guidance",
      x: 0,
      y: 0,
    },
  ],
};

const threeCard: SpreadDefinition = {
  id: "three-card",
  name: "Past · Present · Future",
  tagline: "The arc of a story in three movements",
  description:
    "Three cards trace where a situation comes from, where it stands now, and where it is leaning.",
  interpretationGuide:
    "Read left to right as a narrative. Show how the past card shaped the present, and frame the future card as a tendency that can still change, not a fixed fate.",
  positions: [
    {
      id: "past",
      label: "Past",
      prompt: "What has shaped this situation?",
      lens: "self",
      x: -1.4,
      y: 0,
    },
    {
      id: "present",
      label: "Present",
      prompt: "What is alive in this situation now?",
      lens: "self",
      x: 0,
      y: 0,
    },
    {
      id: "future",
      label: "Future",
      prompt: "Where is this leaning if nothing changes?",
      lens: "outcome",
      x: 1.4,
      y: 0,
    },
  ],
};

const decision: SpreadDefinition = {
  id: "decision",
  name: "The Crossroads",
  tagline: "Five cards for a choice between two paths",
  description:
    "Weigh two options side by side, with the heart of the matter at the centre, an unseen factor, and counsel for choosing.",
  interpretationGuide:
    "Compare Path A and Path B directly against the Heart of the Matter. Name the trade-off between them, use the Unseen Factor to surface what the querent may be overlooking, and let the Counsel card speak to how to choose rather than which to choose.",
  positions: [
    {
      id: "heart",
      label: "Heart of the Matter",
      prompt: "What is this decision truly about?",
      lens: "self",
      x: 0,
      y: 0.45,
    },
    {
      id: "path-a",
      label: "Path A",
      prompt: "What does the first option hold?",
      lens: "outcome",
      x: -1.4,
      y: 0.2,
    },
    {
      id: "path-b",
      label: "Path B",
      prompt: "What does the second option hold?",
      lens: "outcome",
      x: 1.4,
      y: 0.2,
    },
    {
      id: "unseen",
      label: "Unseen Factor",
      prompt: "What is being overlooked?",
      lens: "obstacle",
      x: -2.8,
      y: -0.15,
    },
    {
      id: "counsel",
      label: "Counsel",
      prompt: "How might you approach the choice?",
      lens: "guidance",
      x: 2.8,
      y: -0.15,
    },
  ],
};

const celticCross: SpreadDefinition = {
  id: "celtic-cross",
  name: "Celtic Cross",
  tagline: "Ten cards for a deep, layered reading",
  description:
    "The classic ten-card spread: a central cross describing the situation and its forces, and a staff of four cards describing the self, surroundings, hopes and fears, and direction.",
  interpretationGuide:
    "Treat cards 1–6 (the cross) as the situation: the present, what crosses it, its foundation, the recent past, what is consciously held, and the near future. Treat cards 7–10 (the staff) as the querent's stance, environment, hopes and fears, and likely direction. Draw explicit connections between the Present and the Challenge, and between the Foundation and the Outcome.",
  positions: [
    { id: "present", label: "The Present", prompt: "The heart of the situation.", lens: "self", x: -0.9, y: 0 },
    {
      id: "challenge",
      label: "The Challenge",
      prompt: "What crosses or complicates it.",
      lens: "obstacle",
      x: -0.9,
      y: 0,
      rotation: 90,
    },
    { id: "foundation", label: "Foundation", prompt: "The root beneath the situation.", lens: "self", x: -0.9, y: -1.95 },
    { id: "recent-past", label: "Recent Past", prompt: "What is passing away.", lens: "self", x: -2.4, y: 0 },
    { id: "crown", label: "Crown", prompt: "What is consciously held or aimed for.", lens: "guidance", x: -0.9, y: 1.95 },
    { id: "near-future", label: "Near Future", prompt: "What approaches next.", lens: "outcome", x: 0.6, y: 0 },
    { id: "self", label: "Self", prompt: "How you stand within it.", lens: "self", x: 2.4, y: -2.7 },
    { id: "environment", label: "Environment", prompt: "The people and forces around you.", lens: "self", x: 2.4, y: -0.9 },
    { id: "hopes-fears", label: "Hopes & Fears", prompt: "What you long for or dread.", lens: "obstacle", x: 2.4, y: 0.9 },
    { id: "outcome", label: "Outcome", prompt: "Where this is heading.", lens: "outcome", x: 2.4, y: 2.7 },
  ],
};

export const SPREADS: Record<SpreadId, SpreadDefinition> = {
  daily,
  "three-card": threeCard,
  decision,
  "celtic-cross": celticCross,
};

export const SPREAD_ORDER: SpreadId[] = ["daily", "three-card", "decision", "celtic-cross"];

export function getSpread(id: SpreadId): SpreadDefinition {
  return SPREADS[id];
}

export function isSpreadId(value: unknown): value is SpreadId {
  return typeof value === "string" && value in SPREADS;
}

/** Axis-aligned bounds of a spread's layout in card-width units (includes card extents). */
export function spreadBounds(spread: SpreadDefinition, cardAspect = 5 / 3) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of spread.positions) {
    const turned = Math.abs(((p.rotation ?? 0) / 90) % 2) === 1;
    const hw = (turned ? cardAspect : 1) / 2;
    const hh = (turned ? 1 : cardAspect) / 2;
    minX = Math.min(minX, p.x - hw);
    maxX = Math.max(maxX, p.x + hw);
    minY = Math.min(minY, p.y - hh);
    maxY = Math.max(maxY, p.y + hh);
  }
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}
