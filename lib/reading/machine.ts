import type { DrawnCard, SpreadId } from "@/types/tarot";
import type { ReadingFailure } from "@/lib/ai/client";
import type { ReadingResponse, Tone } from "@/lib/ai/schema";
import { getSpread } from "@/lib/tarot/spreads";
import { dealSpread, type ShuffledCard } from "@/lib/tarot/selection";

export type Stage = "setup" | "shuffling" | "drawing" | "revealing" | "complete";

export type InterpretationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; reading: ReadingResponse }
  | { status: "error"; error: ReadingFailure };

export interface ReadingState {
  stage: Stage;
  spreadId: SpreadId;
  question: string;
  tone: Tone;
  readingId: string | null;
  /** Full deal for the spread, fixed the moment the shuffle begins. */
  deal: DrawnCard[];
  drawnCount: number;
  revealed: boolean[];
  selected: number | null;
  interpretation: InterpretationState;
  /** Increments whenever animations should jump to their end state. */
  skipToken: number;
}

export type ReadingAction =
  | { type: "configure"; spreadId?: SpreadId; question?: string; tone?: Tone }
  | { type: "begin"; shuffled: ShuffledCard[]; readingId: string }
  | { type: "shuffle-complete" }
  | { type: "draw" }
  | { type: "draw-all" }
  | { type: "reveal"; index: number }
  | { type: "reveal-next" }
  | { type: "reveal-all" }
  | { type: "select"; index: number | null }
  | { type: "skip" }
  | { type: "interpretation-start" }
  | { type: "interpretation-success"; reading: ReadingResponse }
  | { type: "interpretation-error"; error: ReadingFailure }
  | { type: "restart" };

export function initialReadingState(spreadId: SpreadId = "three-card"): ReadingState {
  return {
    stage: "setup",
    spreadId,
    question: "",
    tone: "gentle",
    readingId: null,
    deal: [],
    drawnCount: 0,
    revealed: [],
    selected: null,
    interpretation: { status: "idle" },
    skipToken: 0,
  };
}

function afterReveal(state: ReadingState, revealed: boolean[]): ReadingState {
  const allRevealed = state.drawnCount === state.deal.length && revealed.every(Boolean);
  return { ...state, revealed, stage: allRevealed ? "complete" : state.stage };
}

export function readingReducer(state: ReadingState, action: ReadingAction): ReadingState {
  switch (action.type) {
    case "configure":
      if (state.stage !== "setup") return state;
      return {
        ...state,
        spreadId: action.spreadId ?? state.spreadId,
        question: action.question ?? state.question,
        tone: action.tone ?? state.tone,
      };

    case "begin": {
      if (state.stage !== "setup") return state;
      const spread = getSpread(state.spreadId);
      const deal = dealSpread(action.shuffled, spread);
      return {
        ...state,
        stage: "shuffling",
        readingId: action.readingId,
        deal,
        drawnCount: 0,
        revealed: deal.map(() => false),
        selected: null,
        interpretation: { status: "idle" },
      };
    }

    case "shuffle-complete":
      return state.stage === "shuffling" ? { ...state, stage: "drawing" } : state;

    case "draw": {
      if (state.stage === "shuffling") return { ...state, stage: "drawing", drawnCount: 1 };
      if (state.stage !== "drawing") return state;
      const drawnCount = Math.min(state.deal.length, state.drawnCount + 1);
      return { ...state, drawnCount, stage: drawnCount === state.deal.length ? "revealing" : "drawing" };
    }

    case "draw-all":
      if (state.stage !== "drawing" && state.stage !== "shuffling") return state;
      return { ...state, drawnCount: state.deal.length, stage: "revealing" };

    case "reveal": {
      if (action.index < 0 || action.index >= state.drawnCount || state.revealed[action.index]) return state;
      if (state.stage !== "drawing" && state.stage !== "revealing") return state;
      const revealed = state.revealed.map((r, i) => r || i === action.index);
      return afterReveal(state, revealed);
    }

    case "reveal-next": {
      const index = state.revealed.findIndex((r, i) => !r && i < state.drawnCount);
      return index === -1 ? state : readingReducer(state, { type: "reveal", index });
    }

    case "reveal-all": {
      if (state.stage !== "revealing" && state.stage !== "drawing") return state;
      const revealed = state.revealed.map((r, i) => r || i < state.drawnCount);
      return afterReveal(state, revealed);
    }

    case "select":
      if (action.index !== null && (action.index < 0 || action.index >= state.drawnCount)) return state;
      return { ...state, selected: action.index };

    case "skip":
      return { ...state, skipToken: state.skipToken + 1, stage: state.stage === "shuffling" ? "drawing" : state.stage };

    case "interpretation-start":
      return state.stage === "complete" ? { ...state, interpretation: { status: "loading" } } : state;

    case "interpretation-success":
      return state.stage === "complete" ? { ...state, interpretation: { status: "success", reading: action.reading } } : state;

    case "interpretation-error":
      return state.stage === "complete" ? { ...state, interpretation: { status: "error", error: action.error } } : state;

    case "restart":
      return {
        ...initialReadingState(state.spreadId),
        question: state.question,
        tone: state.tone,
        skipToken: state.skipToken + 1,
      };
  }
}

export function drawnCards(state: ReadingState): DrawnCard[] {
  return state.deal.slice(0, state.drawnCount);
}
