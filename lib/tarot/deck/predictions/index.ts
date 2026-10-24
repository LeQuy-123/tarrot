import type { Orientation } from "@/types/tarot";
import { majorPredictions } from "./major";
import { wandsPredictions } from "./wands";
import { cupsPredictions } from "./cups";
import { swordsPredictions } from "./swords";
import { pentaclesPredictions } from "./pentacles";

/** Generic upright and reversed outlooks for every card, keyed by card id. */
export const PREDICTIONS: Readonly<Record<string, Record<Orientation, string>>> = {
  ...majorPredictions,
  ...wandsPredictions,
  ...cupsPredictions,
  ...swordsPredictions,
  ...pentaclesPredictions,
};
