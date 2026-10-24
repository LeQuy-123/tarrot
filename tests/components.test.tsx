import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Spread2D } from "@/components/spreads/Spread2D";
import { SetupPanel } from "@/components/reading/SetupPanel";
import { InterpretationView } from "@/components/reading/InterpretationView";
import { SPREADS } from "@/lib/tarot/spreads";
import { getCard } from "@/lib/tarot/deck";
import type { DrawnCard } from "@/types/tarot";

const deal: DrawnCard[] = [
  { cardId: "the-tower", orientation: "reversed", positionId: "past" },
  { cardId: "ace-of-cups", orientation: "upright", positionId: "present" },
  { cardId: "king-of-swords", orientation: "upright", positionId: "future" },
];

describe("Spread2D", () => {
  it("renders face-down cards as accessible buttons and reveals on activation", async () => {
    const onActivate = vi.fn();
    const { rerender } = render(
      <Spread2D spread={SPREADS["three-card"]} deal={deal} revealed={[false, false, false]} onActivate={onActivate} />,
    );
    const first = screen.getByRole("button", { name: /1\. Past: face down/ });
    await userEvent.click(first);
    expect(onActivate).toHaveBeenCalledWith(0);

    rerender(<Spread2D spread={SPREADS["three-card"]} deal={deal} revealed={[true, false, false]} onActivate={onActivate} />);
    expect(screen.getByRole("button", { name: "1. Past: The Tower, reversed" })).toBeInTheDocument();
    // Reversed artwork is rotated, not mirrored.
    const img = screen.getByAltText(/The Tower \(reversed\)/);
    expect(img.className).toContain("rotate-180");
    expect(img.className).not.toMatch(/scale-x|-scale/);
  });

  it("supports keyboard activation", async () => {
    const onActivate = vi.fn();
    render(<Spread2D spread={SPREADS["three-card"]} deal={deal} revealed={[true, true, true]} onActivate={onActivate} />);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onActivate).toHaveBeenCalledWith(0);
  });

  it("shows empty slots for undrawn positions", () => {
    const { container } = render(
      <Spread2D spread={SPREADS["celtic-cross"]} deal={[]} drawnCount={0} revealed={[]} onActivate={() => {}} />,
    );
    expect(container.querySelectorAll(".border-dashed")).toHaveLength(10);
  });
});

describe("SetupPanel", () => {
  it("changes spread, tone and question and submits", async () => {
    const onChange = vi.fn();
    const onBegin = vi.fn();
    render(<SetupPanel spreadId="three-card" question="" tone="gentle" onChange={onChange} onBegin={onBegin} />);
    await userEvent.click(screen.getByLabelText(/Celtic Cross/));
    expect(onChange).toHaveBeenCalledWith({ spreadId: "celtic-cross" });
    await userEvent.click(screen.getByLabelText("Poetic"));
    expect(onChange).toHaveBeenCalledWith({ tone: "poetic" });
    await userEvent.type(screen.getByRole("textbox"), "A");
    expect(onChange).toHaveBeenCalledWith({ question: "A" });
    await userEvent.click(screen.getByRole("button", { name: /Shuffle the deck/ }));
    expect(onBegin).toHaveBeenCalled();
  });
});

describe("InterpretationView", () => {
  it("shows a retry action on failure and no reading content", async () => {
    const onRetry = vi.fn();
    render(
      <InterpretationView
        state={{ status: "error", error: { code: "timeout", message: "The interpreter took too long.", retryable: true } }}
        spread={SPREADS["three-card"]}
        deal={deal}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("The interpreter took too long.");
    expect(screen.queryByText(/Theme/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalled();
  });

  it("renders every section of a successful reading", () => {
    render(
      <InterpretationView
        state={{
          status: "success",
          reading: {
            provider: "archive",
            model: "astral-archive",
            generatedAt: new Date().toISOString(),
            interpretation: {
              theme: "Rebuilding with an open heart",
              cards: deal.map((d) => ({ cardId: d.cardId, positionId: d.positionId, interpretation: `About ${getCard(d.cardId).name}` })),
              relationships: ["Tower into Ace"],
              patterns: ["Two upright cards"],
              reflectionQuestions: ["What is ready to fall?"],
              nextSteps: ["Write it down"],
              summary: "A closing thought",
            },
          },
        }}
        spread={SPREADS["three-card"]}
        deal={deal}
        onRetry={() => {}}
      />,
    );
    for (const text of ["Rebuilding with an open heart", "About The Tower", "Tower into Ace", "Two upright cards", "What is ready to fall?", "Write it down", "A closing thought"]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    expect(screen.getByText(/offline archive/)).toHaveTextContent(/AI interpretation is off/);
  });
});
