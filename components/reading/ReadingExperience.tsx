"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useReducer, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CARD_IDS, getCard } from "@/lib/tarot/deck";
import { getSpread } from "@/lib/tarot/spreads";
import { shuffleDeck } from "@/lib/tarot/selection";
import { secureRandom } from "@/lib/tarot/random";
import { initialReadingState, readingReducer, type ReadingAction } from "@/lib/reading/machine";
import { interpretReading } from "@/lib/reading/interpretation";
import { settingsStore } from "@/lib/storage/settings";
import { newReadingId, saveReading } from "@/lib/storage/history";
import { useReducedMotion, useSettings, useWebGL } from "@/lib/hooks";
import { playCue } from "@/lib/sound";
import { Spread2D } from "@/components/spreads/Spread2D";
import { CardBack } from "@/components/cards/CardImage";
import { Sigil } from "@/components/ui/Sigil";
import type { ViewInsets } from "@/components/scene/CameraRig";
import { SetupPanel } from "./SetupPanel";
import { CardDetail } from "./CardDetail";
import { InterpretationView } from "./InterpretationView";

const ReadingChamber = dynamic(() => import("@/components/scene/ReadingChamber"), {
  ssr: false,
  loading: () => <ChamberLoading />,
});

function ChamberLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" role="status">
      <Sigil className="h-12 w-12 animate-[slow-spin_8s_linear_infinite] text-gold/60" />
      <span className="sr-only">Preparing the reading chamber…</span>
    </div>
  );
}

/** Falls back to the 2D experience if the WebGL scene throws. */
class ChamberBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("[arcana] 3D chamber failed, switching to 2D", error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const desktopQuery = "(min-width: 1024px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(desktopQuery);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => true,
  );
}

const SHUFFLE_2D_MS = 1600;

function isInteractive(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select, button, a, [contenteditable]"));
}

export function ReadingExperience() {
  const [state, rawDispatch] = useReducer(readingReducer, undefined, () => initialReadingState());
  const [settings] = useSettings();
  const reducedMotion = useReducedMotion();
  const webgl = useWebGL();
  const [sceneFailed, setSceneFailed] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const isDesktop = useIsDesktop();
  const createdAt = useRef<string>("");

  const spread = getSpread(state.spreadId);
  const use3D = webgl === true && settings.renderMode === "auto" && !sceneFailed;
  const total = state.deal.length;

  // Keep the latest state reachable from stable callbacks.
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  });

  const dispatch = useCallback((action: ReadingAction) => {
    const before = stateRef.current;
    const after = readingReducer(before, action);
    if (after === before) return;
    stateRef.current = after;
    rawDispatch(action);
    if (after.drawnCount > before.drawnCount) {
      playCue("draw");
      setAnnouncement(
        after.drawnCount === after.deal.length
          ? `All ${after.deal.length} cards drawn. Reveal them when ready.`
          : `Drew card ${after.drawnCount} of ${after.deal.length}.`,
      );
    }
    const newlyRevealed = after.revealed.findIndex((r, i) => r && !before.revealed[i]);
    if (newlyRevealed !== -1) {
      playCue("flip");
      const d = after.deal[newlyRevealed];
      const count = after.revealed.filter(Boolean).length - before.revealed.filter(Boolean).length;
      setAnnouncement(
        count > 1
          ? "All cards revealed."
          : `${getSpread(after.spreadId).positions[newlyRevealed].label}: ${getCard(d.cardId).name}, ${d.orientation}.`,
      );
    }
    if (after.stage === "complete" && before.stage !== "complete") playCue("reveal");
    if (after.stage === "shuffling" && before.stage !== "shuffling") {
      playCue("shuffle");
      setAnnouncement("Shuffling and cutting the deck.");
    }
  }, []);

  const begin = useCallback(() => {
    const shuffled = shuffleDeck(CARD_IDS, secureRandom(), { reversalChance: settings.reversals ? 0.3 : 0 });
    createdAt.current = new Date().toISOString();
    setPanelCollapsed(false);
    // The submit button is about to unmount; release focus so chamber shortcuts work immediately.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    dispatch({ type: "begin", shuffled, readingId: newReadingId() });
  }, [dispatch, settings.reversals]);

  const onShuffleComplete = useCallback(() => dispatch({ type: "shuffle-complete" }), [dispatch]);
  const onDraw = useCallback(() => dispatch({ type: "draw" }), [dispatch]);
  const onCardActivate = useCallback(
    (index: number) => {
      const s = stateRef.current;
      if (!s.revealed[index]) dispatch({ type: "reveal", index });
      else {
        setPanelCollapsed(false);
        dispatch({ type: "select", index: s.selected === index ? null : index });
      }
    },
    [dispatch],
  );
  const onContextLost = useCallback(() => setSceneFailed(true), []);

  // 2D mode has no scene to report the end of the shuffle.
  useEffect(() => {
    if (state.stage !== "shuffling" || use3D) return;
    const t = setTimeout(() => dispatch({ type: "shuffle-complete" }), reducedMotion ? 0 : SHUFFLE_2D_MS);
    return () => clearTimeout(t);
  }, [state.stage, use3D, reducedMotion, dispatch]);

  // Ask for an interpretation once every card is revealed.
  useEffect(() => {
    if (state.stage === "complete" && state.interpretation.status === "idle" && state.readingId) {
      dispatch({ type: "interpretation-start" });
    }
  }, [state.stage, state.interpretation.status, state.readingId, dispatch]);

  useEffect(() => {
    if (state.stage !== "complete" || state.interpretation.status !== "loading") return;
    const controller = new AbortController();
    const s = stateRef.current;
    interpretReading(
      { question: s.question.trim(), spreadId: s.spreadId, tone: s.tone, cards: s.deal },
      { useAI: settingsStore.get().aiReading, signal: controller.signal },
    )
      .then((result) => {
        if (controller.signal.aborted) return;
        if (result.ok) {
          playCue("chime");
          dispatch({ type: "interpretation-success", reading: result.reading });
        } else {
          dispatch({ type: "interpretation-error", error: result.error });
        }
      })
      .catch(() => {
        // aborted
      });
    return () => controller.abort();
  }, [state.stage, state.interpretation.status, dispatch]);

  // Persist the reading: once when complete, again when an interpretation arrives.
  const readingForHistory = state.interpretation.status === "success" ? state.interpretation.reading : null;
  useEffect(() => {
    if (state.stage !== "complete" || !state.readingId) return;
    const s = stateRef.current;
    saveReading({
      id: state.readingId,
      createdAt: createdAt.current || new Date().toISOString(),
      question: s.question.trim(),
      tone: s.tone,
      spreadId: s.spreadId,
      cards: s.deal,
      reading: readingForHistory,
    });
  }, [state.stage, state.readingId, readingForHistory]);

  // Keyboard shortcuts for the chamber.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const s = stateRef.current;
      if (s.stage === "setup") return;
      if (e.key === "Escape") {
        if (s.selected !== null) dispatch({ type: "select", index: null });
        else dispatch({ type: "skip" });
        return;
      }
      if (isInteractive(e.target)) return;
      const key = e.key.toLowerCase();
      if ((key === " " || key === "enter" || key === "d") && (s.stage === "drawing" || s.stage === "shuffling")) {
        e.preventDefault();
        dispatch({ type: "draw" });
      } else if (key === "r") dispatch({ type: "reveal-next" });
      else if (key === "a") {
        if (s.stage === "drawing") dispatch({ type: "draw-all" });
        dispatch({ type: "reveal-all" });
      } else if (key === "s") dispatch({ type: "skip" });
      else if ((key === "arrowright" || key === "arrowleft") && s.drawnCount > 0) {
        e.preventDefault();
        const revealedIdx = s.revealed.map((r, i) => (r ? i : -1)).filter((i) => i >= 0);
        if (revealedIdx.length === 0) return;
        const cur = s.selected === null ? -1 : revealedIdx.indexOf(s.selected);
        const next =
          key === "arrowright"
            ? revealedIdx[(cur + 1) % revealedIdx.length]
            : revealedIdx[(cur - 1 + revealedIdx.length) % revealedIdx.length];
        setPanelCollapsed(false);
        dispatch({ type: "select", index: next });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  const panelOpen = !panelCollapsed && (state.stage === "complete" || state.selected !== null);
  const [viewportH, setViewportH] = useState(800);
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // Measure the HUD so the camera keeps every card clear of it.
  const [hudEl, setHudEl] = useState<HTMLDivElement | null>(null);
  const [hudMeasured, setHudMeasured] = useState(150);
  useEffect(() => {
    if (!hudEl) return;
    const observer = new ResizeObserver(([entry]) => setHudMeasured(Math.round(entry.contentRect.height) + 24));
    observer.observe(hudEl);
    return () => observer.disconnect();
  }, [hudEl]);
  const hudHeight = state.stage === "setup" ? 0 : hudMeasured;
  const insets: ViewInsets = panelOpen
    ? isDesktop
      ? { right: 440, bottom: hudHeight }
      : { right: 0, bottom: Math.round(viewportH * 0.52) }
    : { right: 0, bottom: hudHeight };

  const selectedDrawn = state.selected !== null ? state.deal[state.selected] : null;
  const aiCard =
    state.selected !== null && state.interpretation.status === "success"
      ? state.interpretation.reading.interpretation.cards[state.selected]?.interpretation
      : undefined;

  return (
    <div className="relative isolate flex min-h-[calc(100dvh-3.5rem)] flex-1 flex-col overflow-hidden">
      {/* Scene layer */}
      <div className="absolute inset-0 -z-10">
        {use3D ? (
          <ChamberBoundary onError={() => setSceneFailed(true)}>
            <ReadingChamber
              spread={spread}
              deal={state.deal}
              drawnCount={state.drawnCount}
              revealed={state.revealed}
              selected={state.selected}
              stage={state.stage}
              reducedMotion={reducedMotion}
              skipToken={state.skipToken}
              insets={insets}
              onDraw={onDraw}
              onCardActivate={onCardActivate}
              onShuffleComplete={onShuffleComplete}
              onContextLost={onContextLost}
            />
          </ChamberBoundary>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <AnimatePresence mode="wait">
        {state.stage === "setup" ? (
          <motion.div
            key="setup"
            className="relative z-10 flex flex-1 items-start justify-center px-4 py-8 sm:items-center"
            exit={{ opacity: 0, pointerEvents: "none", transition: { duration: 0.3 } }}
          >
            <SetupPanel
              spreadId={state.spreadId}
              question={state.question}
              tone={state.tone}
              onChange={(patch) => dispatch({ type: "configure", ...patch })}
              onBegin={begin}
              aiReading={settings.aiReading}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {state.stage !== "setup" && (
        <>
          {/* Header strip: spread + question */}
          <div className="pointer-events-none relative z-10 px-4 pt-4 text-center sm:px-6">
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase">{spread.name}</p>
            {state.question && (
              <p className="mx-auto mt-1 max-w-xl font-display text-lg text-parchment/90 italic sm:text-xl">
                “{state.question}”
              </p>
            )}
          </div>

          {/* 2D fallback stage */}
          {!use3D && (
            <div
              className={`relative z-0 flex flex-1 flex-col items-center justify-center gap-6 px-4 py-6 ${
                panelOpen && isDesktop ? "lg:pr-[440px]" : ""
              }`}
              style={{ paddingBottom: insets.bottom + 16 }}
            >
              {webgl === false && (
                <p className="text-xs text-muted">3D is unavailable on this device — showing the flat chamber.</p>
              )}
              {(state.stage === "shuffling" || state.stage === "drawing") && (
                <button
                  type="button"
                  onClick={onDraw}
                  className={`w-20 ${state.stage === "shuffling" && !reducedMotion ? "animate-pulse" : ""}`}
                  aria-label={`Deck. Draw card ${state.drawnCount + 1} of ${total}`}
                >
                  <CardBack />
                </button>
              )}
              <Spread2D
                spread={spread}
                deal={state.deal}
                drawnCount={state.drawnCount}
                revealed={state.revealed}
                selected={state.selected}
                onActivate={onCardActivate}
                className="w-full"
              />
            </div>
          )}

          <ChamberHud
            stage={state.stage}
            drawnCount={state.drawnCount}
            total={total}
            revealedCount={state.revealed.filter(Boolean).length}
            labels={spread.positions.map((p) => p.label)}
            revealed={state.revealed}
            selected={state.selected}
            names={state.deal.map((d) => `${getCard(d.cardId).name}${d.orientation === "reversed" ? " (reversed)" : ""}`)}
            panelCollapsed={panelCollapsed}
            panelAvailable={state.stage === "complete" || state.selected !== null}
            rightInset={panelOpen && isDesktop ? 440 : 0}
            hiddenOnMobile={panelOpen && !isDesktop}
            onDraw={onDraw}
            onDrawAll={() => dispatch({ type: "draw-all" })}
            onRevealNext={() => dispatch({ type: "reveal-next" })}
            onRevealAll={() => dispatch({ type: "reveal-all" })}
            onSkip={() => dispatch({ type: "skip" })}
            onRestart={() => dispatch({ type: "restart" })}
            onChip={onCardActivate}
            onTogglePanel={() => setPanelCollapsed((c) => !c)}
            onHudElement={setHudEl}
          />

          <AnimatePresence>
            {panelOpen && (
              <motion.aside
                key="panel"
                initial={isDesktop ? { x: 460, opacity: 0 } : { y: "100%" }}
                animate={isDesktop ? { x: 0, opacity: 1 } : { y: 0 }}
                exit={isDesktop ? { x: 460, opacity: 0 } : { y: "100%" }}
                transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`panel fixed z-20 flex flex-col ${
                  isDesktop
                    ? "top-[3.5rem] right-0 bottom-0 w-[440px] border-y-0 border-r-0"
                    : "inset-x-0 bottom-0 h-[52dvh] rounded-t-2xl border-x-0 border-b-0"
                }`}
                aria-label={state.selected !== null ? "Card details" : "Your reading"}
              >
                <div className="flex items-center justify-between gap-2 border-b border-hairline px-5 py-3">
                  {state.selected !== null && state.stage === "complete" ? (
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "select", index: null })}
                      className="text-sm text-gold-light hover:underline"
                    >
                      ← Full reading
                    </button>
                  ) : (
                    <span className="font-display text-lg text-gold-light">
                      {state.selected !== null ? "Card" : "Your reading"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => (state.selected !== null && state.stage !== "complete" ? dispatch({ type: "select", index: null }) : setPanelCollapsed(true))}
                    className="rounded-full px-2 py-1 text-sm text-muted hover:text-parchment"
                    aria-label="Close panel"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                  {selectedDrawn && state.selected !== null ? (
                    <CardDetail
                      drawn={selectedDrawn}
                      position={spread.positions[state.selected]}
                      index={state.selected}
                      aiInterpretation={aiCard}
                    />
                  ) : (
                    <InterpretationView
                      state={state.interpretation}
                      spread={spread}
                      deal={state.deal}
                      onRetry={() => dispatch({ type: "interpretation-start" })}
                      onSelectCard={(i) => dispatch({ type: "select", index: i })}
                    />
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function HudButton({
  children,
  onClick,
  primary = false,
  shortcut,
}: {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
  shortcut?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-keyshortcuts={shortcut}
      className={`rounded-full border px-4 py-2 text-sm whitespace-nowrap transition ${
        primary
          ? "border-gold/70 bg-gold/20 text-gold-light shadow-[0_0_24px_-8px_rgb(201_164_92/0.7)] hover:bg-gold/30"
          : "border-hairline bg-void/50 text-parchment/85 hover:border-gold/40 hover:text-parchment"
      }`}
    >
      {children}
      {shortcut && <kbd className="ml-2 hidden rounded border border-hairline px-1 text-[10px] text-muted sm:inline">{shortcut}</kbd>}
    </button>
  );
}

function ChamberHud(props: {
  stage: string;
  drawnCount: number;
  total: number;
  revealedCount: number;
  labels: string[];
  names: string[];
  revealed: boolean[];
  selected: number | null;
  panelCollapsed: boolean;
  panelAvailable: boolean;
  rightInset: number;
  hiddenOnMobile: boolean;
  onDraw: () => void;
  onDrawAll: () => void;
  onRevealNext: () => void;
  onRevealAll: () => void;
  onSkip: () => void;
  onRestart: () => void;
  onChip: (i: number) => void;
  onTogglePanel: () => void;
  onHudElement: (el: HTMLDivElement | null) => void;
}) {
  const { stage, drawnCount, total, revealedCount, onHudElement } = props;
  const hint =
    stage === "shuffling"
      ? "The deck is being shuffled and cut…"
      : stage === "drawing"
        ? `Tap the deck or press Space to draw — ${drawnCount}/${total}`
        : stage === "revealing"
          ? `Tap a card to turn it over — ${revealedCount}/${total} revealed`
          : "Your spread is complete. Tap any card to study it.";
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-10 px-3 pb-4 ${props.hiddenOnMobile ? "hidden" : ""}`}
      style={{ right: props.rightInset }}
    >
      <div ref={onHudElement} className="panel mx-auto flex max-w-3xl flex-col gap-2.5 rounded-2xl px-3 py-3 sm:px-4">
        <p className="text-center text-xs text-muted" aria-hidden="true">
          {hint}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {stage === "shuffling" && (
            <>
              <HudButton onClick={props.onSkip} shortcut="S">
                Skip shuffle
              </HudButton>
              <HudButton onClick={props.onDraw} primary shortcut="Space">
                Draw now
              </HudButton>
            </>
          )}
          {stage === "drawing" && (
            <>
              <HudButton onClick={props.onDraw} primary shortcut="Space">
                Draw card {drawnCount + 1}
              </HudButton>
              <HudButton onClick={props.onDrawAll}>Draw all</HudButton>
            </>
          )}
          {(stage === "revealing" || (stage === "drawing" && drawnCount > revealedCount)) && (
            <>
              <HudButton onClick={props.onRevealNext} primary={stage === "revealing"} shortcut="R">
                Reveal next
              </HudButton>
              {stage === "revealing" && (
                <HudButton onClick={props.onRevealAll} shortcut="A">
                  Reveal all
                </HudButton>
              )}
            </>
          )}
          {stage === "complete" && props.panelAvailable && props.panelCollapsed && (
            <HudButton onClick={props.onTogglePanel} primary>
              Show reading
            </HudButton>
          )}
          <HudButton onClick={props.onRestart}>New reading</HudButton>
        </div>
        {drawnCount > 0 && (
          <ol className="flex gap-1.5 overflow-x-auto pb-0.5" aria-label="Drawn cards">
            {Array.from({ length: drawnCount }, (_, i) => (
              <li key={i} className="shrink-0">
                <button
                  type="button"
                  onClick={() => props.onChip(i)}
                  aria-pressed={props.selected === i}
                  className={`rounded-lg border px-2 py-1 text-left text-[11px] leading-tight transition ${
                    props.selected === i ? "border-gold/70 bg-gold/15" : "border-hairline bg-void/40 hover:border-gold/40"
                  }`}
                >
                  <span className="block text-muted">
                    {i + 1}. {props.labels[i]}
                  </span>
                  <span className="block text-parchment">{props.revealed[i] ? props.names[i] : "Face down — reveal"}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
