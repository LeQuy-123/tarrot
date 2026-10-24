"use client";

import { memo, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { DrawnCard, SpreadDefinition } from "@/types/tarot";
import { Card3D } from "@/components/cards/Card3D";
import { Deck3D, deckTopY } from "@/components/cards/Deck3D";
import { CARD_H, CARD_W, computeLayout, type SpreadLayout } from "@/components/spreads/layout";
import type { Stage } from "@/lib/reading/machine";
import { findCard } from "@/lib/tarot/deck";
import { ChamberEnvironment } from "./Environment";
import { CameraRig, type ViewInsets } from "./CameraRig";

export interface ChamberProps {
  spread: SpreadDefinition;
  deal: DrawnCard[];
  drawnCount: number;
  revealed: boolean[];
  selected: number | null;
  stage: Stage;
  reducedMotion: boolean;
  skipToken: number;
  insets: ViewInsets;
  onDraw: () => void;
  onCardActivate: (index: number) => void;
  onShuffleComplete: () => void;
  onContextLost: () => void;
}

let slotOutline: THREE.BufferGeometry | null = null;
function slotGeometry() {
  if (!slotOutline) {
    const w = CARD_W * 1.08;
    const h = CARD_H * 1.06;
    const r = 0.08;
    const s = new THREE.Shape();
    s.moveTo(-w / 2 + r, -h / 2);
    s.lineTo(w / 2 - r, -h / 2);
    s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    s.lineTo(w / 2, h / 2 - r);
    s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    s.lineTo(-w / 2 + r, h / 2);
    s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    s.lineTo(-w / 2, -h / 2 + r);
    s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    slotOutline = new THREE.BufferGeometry().setFromPoints(s.getPoints(6));
  }
  return slotOutline;
}

function SlotMarkers({ layout }: { layout: SpreadLayout }) {
  const geometry = slotGeometry();
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: "#c9a45c", transparent: true, opacity: 0.35 }), []);
  return (
    <>
      {layout.slots.map((slot, i) => (
        <lineLoop
          key={i}
          geometry={geometry}
          material={material}
          position={[slot.x, 0.009, slot.z]}
          rotation={[-Math.PI / 2, 0, slot.yaw]}
        />
      ))}
    </>
  );
}

function SlotBadges({
  spread,
  layout,
  deal,
  revealed,
  showLabels,
}: {
  spread: SpreadDefinition;
  layout: SpreadLayout;
  deal: DrawnCard[];
  revealed: boolean[];
  showLabels: boolean;
}) {
  return (
    <>
      {layout.slots.map((slot, i) => {
        const turned = slot.yaw !== 0;
        // Crossing cards get their badge at the tip of the card, others below it.
        const pos: [number, number, number] = turned
          ? [slot.x + CARD_H / 2 + 0.18, 0.05, slot.z]
          : [slot.x, 0.05, slot.z + CARD_H / 2 + 0.2];
        const card = revealed[i] ? findCard(deal[i]?.cardId ?? "") : undefined;
        return (
          <Html key={i} position={pos} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
            <div aria-hidden="true" className="flex flex-col items-center gap-0.5 whitespace-nowrap text-center select-none">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-gold/60 bg-void/80 px-1 text-[10px] text-gold-light">
                {i + 1}
              </span>
              {showLabels && (
                <span className="rounded bg-void/60 px-1.5 text-[11px] tracking-wide text-parchment/85">
                  {spread.positions[i].label}
                </span>
              )}
              {showLabels && card && (
                <span className="font-display text-[12px] text-gold-light italic">
                  {card.name}
                  {deal[i].orientation === "reversed" ? " · reversed" : ""}
                </span>
              )}
            </div>
          </Html>
        );
      })}
    </>
  );
}

function ChamberContents(props: ChamberProps) {
  const size = useThree((s) => s.size);
  const portrait = size.width < size.height * 0.9;
  const { spread, deal, drawnCount, revealed, selected, stage, reducedMotion, skipToken } = props;
  const layout = useMemo(() => computeLayout(spread, portrait), [spread, portrait]);
  const deckPos = useMemo<[number, number, number]>(() => [layout.deck.x, 0, layout.deck.z], [layout]);
  const origins = useMemo(
    () => deal.map((_, i): [number, number, number] => [layout.deck.x, deckTopY(i), layout.deck.z]),
    [deal, layout],
  );
  const canDraw = stage === "drawing" || stage === "shuffling";
  const showLabels = spread.positions.length <= 5 && size.width > 520;

  return (
    <>
      <ChamberEnvironment animate={!reducedMotion} />
      <CameraRig frame={layout.frame} insets={props.insets} reducedMotion={reducedMotion} />
      <SlotMarkers layout={layout} />
      {stage !== "setup" && (
        <SlotBadges spread={spread} layout={layout} deal={deal} revealed={revealed} showLabels={showLabels} />
      )}
      <Deck3D
        position={deckPos}
        drawnCount={drawnCount}
        shuffling={stage === "shuffling"}
        canDraw={canDraw && drawnCount < deal.length}
        reducedMotion={reducedMotion}
        skipToken={skipToken}
        onShuffleComplete={props.onShuffleComplete}
        onDraw={props.onDraw}
      />
      {deal.map((drawn, i) => (
        <Card3D
          key={`${drawn.cardId}-${i}`}
          cardId={drawn.cardId}
          orientation={drawn.orientation}
          slot={layout.slots[i]}
          origin={origins[i]}
          layer={spread.positions[i].rotation ? 1 : 0}
          drawn={i < drawnCount}
          revealed={revealed[i] ?? false}
          selected={selected === i}
          reducedMotion={reducedMotion}
          skipToken={skipToken}
          index={i}
          onActivate={props.onCardActivate}
        />
      ))}
    </>
  );
}

function ReadingChamber(props: ChamberProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, position: [0, 9, 7], near: 0.1, far: 120 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          props.onContextLost();
        });
      }}
      aria-hidden="true"
    >
      <ChamberContents {...props} />
    </Canvas>
  );
}

export default memo(ReadingChamber);
