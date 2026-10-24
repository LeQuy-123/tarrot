import { describe, expect, it } from "vitest";
import { initialReadingState, readingReducer, type ReadingAction, type ReadingState } from "@/lib/reading/machine";
import { CARD_IDS } from "@/lib/tarot/deck";
import { shuffleDeck } from "@/lib/tarot/selection";
import { seededRandom } from "@/lib/tarot/random";

const run = (state: ReadingState, ...actions: ReadingAction[]) => actions.reduce(readingReducer, state);

function begun(spreadId: ReadingState["spreadId"] = "three-card") {
  const shuffled = shuffleDeck(CARD_IDS, seededRandom("machine"), { reversalChance: 0.5 });
  return { shuffled, state: run(initialReadingState(spreadId), { type: "begin", shuffled, readingId: "r1" }) };
}

describe("reading state machine", () => {
  it("fixes the deal at the moment the shuffle begins", () => {
    const { shuffled, state } = begun();
    expect(state.stage).toBe("shuffling");
    expect(state.deal.map((d) => d.cardId)).toEqual(shuffled.slice(0, 3).map((s) => s.cardId));
    expect(state.deal.map((d) => d.orientation)).toEqual(shuffled.slice(0, 3).map((s) => s.orientation));
  });

  it("walks through shuffle → draw → reveal → complete", () => {
    let { state } = begun();
    const deal = state.deal;
    state = run(state, { type: "shuffle-complete" }, { type: "draw" }, { type: "draw" });
    expect(state.stage).toBe("drawing");
    expect(state.drawnCount).toBe(2);
    state = run(state, { type: "draw" });
    expect(state.stage).toBe("revealing");
    state = run(state, { type: "reveal", index: 2 }, { type: "reveal-next" });
    expect(state.revealed).toEqual([true, false, true]);
    state = run(state, { type: "reveal-next" });
    expect(state.stage).toBe("complete");
    // Animation actions never change the cards.
    expect(state.deal).toBe(deal);
  });

  it("ignores reveals of undrawn cards and draws past the spread size", () => {
    let { state } = begun();
    state = run(state, { type: "shuffle-complete" }, { type: "reveal", index: 0 });
    expect(state.revealed[0]).toBe(false);
    state = run(state, { type: "draw-all" }, { type: "draw" });
    expect(state.drawnCount).toBe(3);
  });

  it("lets the user skip the shuffle", () => {
    const { state } = begun();
    const skipped = run(state, { type: "skip" });
    expect(skipped.stage).toBe("drawing");
    expect(skipped.skipToken).toBe(state.skipToken + 1);
  });

  it("only accepts interpretation events once complete", () => {
    let { state } = begun("daily");
    state = run(state, { type: "interpretation-start" });
    expect(state.interpretation.status).toBe("idle");
    state = run(state, { type: "draw" }, { type: "reveal-all" }, { type: "interpretation-start" });
    expect(state.stage).toBe("complete");
    expect(state.interpretation.status).toBe("loading");
    state = run(state, { type: "interpretation-error", error: { code: "timeout", message: "slow", retryable: true } });
    expect(state.interpretation.status).toBe("error");
    state = run(state, { type: "interpretation-start" });
    expect(state.interpretation.status).toBe("loading");
  });

  it("restarts while keeping the question and tone", () => {
    let { state } = begun();
    state = { ...state, question: "Where now?", tone: "poetic" };
    state = run(state, { type: "restart" });
    expect(state.stage).toBe("setup");
    expect(state.deal).toEqual([]);
    expect(state.question).toBe("Where now?");
    expect(state.tone).toBe("poetic");
  });

  it("blocks configuration changes mid-reading", () => {
    const { state } = begun();
    expect(run(state, { type: "configure", spreadId: "celtic-cross" }).spreadId).toBe("three-card");
  });
});
