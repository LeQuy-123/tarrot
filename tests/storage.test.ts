import { describe, expect, it } from "vitest";
import { clearHistory, deleteReading, HISTORY_LIMIT, historyStore, saveReading, type SavedReading } from "@/lib/storage/history";
import { DEFAULT_SETTINGS, settingsStore } from "@/lib/storage/settings";

function reading(id: string, extra: Partial<SavedReading> = {}): SavedReading {
  return {
    id,
    createdAt: new Date(2026, 0, 1).toISOString(),
    question: "q",
    tone: "gentle",
    spreadId: "daily",
    cards: [{ cardId: "the-star", orientation: "reversed", positionId: "guidance" }],
    reading: null,
    ...extra,
  };
}

describe("reading history", () => {
  it("persists to localStorage and survives a reload of the store", () => {
    saveReading(reading("a"));
    saveReading(reading("b"));
    const raw = window.localStorage.getItem("arcana.history.v1");
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw!).map((r: SavedReading) => r.id)).toEqual(["b", "a"]);
    expect(historyStore.get().map((r) => r.id)).toEqual(["b", "a"]);
    expect(historyStore.get()[0].cards[0].orientation).toBe("reversed");
  });

  it("updates in place by id", () => {
    saveReading(reading("a"));
    saveReading(reading("a", { question: "updated" }));
    expect(historyStore.get()).toHaveLength(1);
    expect(historyStore.get()[0].question).toBe("updated");
  });

  it("drops corrupt entries but keeps valid ones", () => {
    window.localStorage.setItem("arcana.history.v1", JSON.stringify([reading("ok"), { id: 3 }, "junk"]));
    expect(historyStore.get().map((r) => r.id)).toEqual(["ok"]);
    window.localStorage.setItem("arcana.history.v1", "{not json");
    expect(historyStore.get()).toEqual([]);
  });

  it("caps the history size, deletes and clears", () => {
    for (let i = 0; i < HISTORY_LIMIT + 5; i++) saveReading(reading(`r${i}`));
    expect(historyStore.get()).toHaveLength(HISTORY_LIMIT);
    deleteReading(`r${HISTORY_LIMIT + 4}`);
    expect(historyStore.get()[0].id).toBe(`r${HISTORY_LIMIT + 3}`);
    clearHistory();
    expect(historyStore.get()).toEqual([]);
  });
});

describe("settings", () => {
  it("falls back to defaults and fills missing fields", () => {
    expect(settingsStore.get()).toEqual(DEFAULT_SETTINGS);
    window.localStorage.setItem("arcana.settings.v1", JSON.stringify({ sound: true }));
    expect(settingsStore.get()).toEqual({ ...DEFAULT_SETTINGS, sound: true });
  });
});
