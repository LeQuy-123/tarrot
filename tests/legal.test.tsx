import { describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { LegalNotice } from "@/components/legal/LegalNotice";
import { clearAllLocalData } from "@/lib/storage/clear";
import { historyStore, saveReading } from "@/lib/storage/history";
import { DEFAULT_SETTINGS, settingsStore } from "@/lib/storage/settings";
import { langStore } from "@/lib/i18n/lang";

describe("legal notice", () => {
  it("covers the reflection, privacy and contact topics in English", () => {
    render(<LegalNotice />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings).toHaveLength(15);
    for (const topic of [/No predictions/, /Not professional advice/, /giải hạn/, /Anonymous use/, /Data stored in your browser/, /AI processing/, /Advertising and analytics/, /Retention, deletion/, /Contact/, /Updates/]) {
      expect(headings.some((h) => topic.test(h ?? ""))).toBe(true);
    }
    expect(screen.getByText(/currently shows no advertising and uses no analytics/)).toBeInTheDocument();
    expect(screen.getByText(/has not published contact details yet/)).toBeInTheDocument();
    expect(screen.getAllByText(/Last updated/).length).toBeGreaterThan(0);
  });

  it("renders the same sections in Vietnamese", () => {
    act(() => langStore.set("vi"));
    render(<LegalNotice />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(15);
    expect(screen.getByRole("heading", { name: "9. Xử lý bằng AI" })).toBeInTheDocument();
    expect(screen.getByText(/chưa công bố thông tin liên hệ/)).toBeInTheDocument();
    act(() => langStore.set(null));
  });
});

describe("clear all data on this device", () => {
  it("removes history, settings and language choice", () => {
    saveReading({
      id: "x",
      createdAt: new Date().toISOString(),
      question: "q",
      tone: "gentle",
      spreadId: "daily",
      cards: [{ cardId: "the-star", orientation: "upright", positionId: "guidance" }],
      reading: null,
    });
    settingsStore.set({ ...DEFAULT_SETTINGS, sound: true });
    langStore.set("vi");
    clearAllLocalData();
    expect(window.localStorage.getItem("arcana.history.v1")).toBeNull();
    expect(window.localStorage.getItem("arcana.settings.v1")).toBeNull();
    expect(window.localStorage.getItem("arcana.lang.v1")).toBeNull();
    expect(historyStore.get()).toEqual([]);
    expect(settingsStore.get()).toEqual(DEFAULT_SETTINGS);
    expect(langStore.get()).toBeNull();
  });
});
