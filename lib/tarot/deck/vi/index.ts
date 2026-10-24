import type { CardTranslations } from "./types";
import { majorVi } from "./major";
import { wandsCupsVi } from "./wands-cups";
import { swordsPentaclesVi } from "./swords-pentacles";

/** Vietnamese text for every card, keyed by card id. */
export const VI_CARDS: Readonly<CardTranslations> = { ...majorVi, ...wandsCupsVi, ...swordsPentaclesVi };
