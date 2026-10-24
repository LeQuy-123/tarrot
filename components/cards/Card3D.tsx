"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { Orientation } from "@/types/tarot";
import { CARD_T, type SlotPose } from "@/components/spreads/layout";
import { damp, easeInOutCubic, segment } from "@/components/scene/anim";
import { cardGeometry, loadBackTexture, loadCardTexture } from "./cardAssets";
import { glowTexture } from "@/components/scene/textures";

export const DRAW_DURATION = 0.95;
export const FLIP_DURATION = 0.8;

export interface Card3DProps {
  cardId: string;
  orientation: Orientation;
  slot: SlotPose;
  /** World position the card leaves from (top of the deck when it was drawn). */
  origin: [number, number, number];
  /** Extra height so stacked slots (Celtic Cross challenge) lie on top. */
  layer: number;
  drawn: boolean;
  revealed: boolean;
  selected: boolean;
  reducedMotion: boolean;
  skipToken: number;
  index: number;
  onActivate: (index: number) => void;
}

function useTexture(load: () => Promise<THREE.Texture>, key: string) {
  const [state, setState] = useState<{ key: string; texture: THREE.Texture } | null>(null);
  useEffect(() => {
    let alive = true;
    load()
      .then((texture) => alive && setState({ key, texture }))
      .catch(() => {
        // Leave the untextured fallback material in place.
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` identifies the load
  }, [key]);
  return state?.key === key ? state.texture : null;
}

export const Card3D = memo(function Card3D({
  cardId,
  orientation,
  slot,
  origin,
  layer,
  drawn,
  revealed,
  selected,
  reducedMotion,
  skipToken,
  index,
  onActivate,
}: Card3DProps) {
  const { edge, front, back, edgeMaterial } = cardGeometry();
  const clock = useThree((s) => s.clock);
  const root = useRef<THREE.Group>(null);
  const flip = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const hovered = useRef(false);
  const lift = useRef(0);

  const frontTex = useTexture(() => loadCardTexture(cardId), cardId);
  const backTex = useTexture(loadBackTexture, "__back");

  // Materials are derived from their textures rather than mutated when a texture arrives.
  const frontMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: frontTex,
        color: frontTex ? "#ffffff" : "#1b2147",
        roughness: 0.55,
        metalness: 0.05,
      }),
    [frontTex],
  );
  const backMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: backTex,
        color: backTex ? "#ffffff" : "#141a3a",
        roughness: 0.5,
        metalness: 0.1,
      }),
    [backTex],
  );
  useEffect(() => () => frontMat.dispose(), [frontMat]);
  useEffect(() => () => backMat.dispose(), [backMat]);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);

  // Animation clocks. -Infinity means "already finished" (restored or skipped).
  const drawStart = useRef<number | null>(drawn ? -Infinity : null);
  const revealStart = useRef<number | null>(revealed ? -Infinity : null);

  useEffect(() => {
    if (drawn && drawStart.current === null) drawStart.current = reducedMotion ? -Infinity : clock.elapsedTime;
    if (!drawn) drawStart.current = null;
  }, [drawn, clock, reducedMotion]);

  useEffect(() => {
    if (revealed && revealStart.current === null) {
      // A reveal requested mid-flight waits for the card to land.
      const landed = (drawStart.current ?? 0) + DRAW_DURATION;
      revealStart.current = reducedMotion ? -Infinity : Math.max(clock.elapsedTime, landed);
    }
    if (!revealed) revealStart.current = null;
  }, [revealed, clock, reducedMotion]);

  useEffect(() => {
    if (skipToken === 0) return;
    if (drawStart.current !== null) drawStart.current = -Infinity;
    if (revealStart.current !== null) revealStart.current = -Infinity;
  }, [skipToken]);

  const baseY = CARD_T / 2 + 0.004 + layer * CARD_T * 1.6;
  const reversedYaw = orientation === "reversed" ? Math.PI : 0;

  useFrame((_, dt) => {
    const g = root.current;
    const f = flip.current;
    if (!g || !f) return;
    const now = clock.elapsedTime;

    const pDraw = drawStart.current === null ? 0 : easeInOutCubic(segment(now, drawStart.current, DRAW_DURATION));
    const pFlip = revealStart.current === null ? 0 : easeInOutCubic(segment(now, revealStart.current, FLIP_DURATION));

    const targetLift = drawn && pDraw >= 1 ? (selected ? 0.16 : hovered.current ? 0.07 : 0) : 0;
    lift.current += (targetLift - lift.current) * damp(reducedMotion ? 60 : 12, dt);

    const arc = Math.sin(Math.PI * pDraw) * 0.9 + Math.sin(Math.PI * pFlip) * 0.5;
    g.position.set(
      origin[0] + (slot.x - origin[0]) * pDraw,
      origin[1] + (baseY - origin[1]) * pDraw + arc + lift.current,
      origin[2] + (slot.z - origin[2]) * pDraw,
    );
    // Reversal is a property of the card, applied immediately: the back is rotationally
    // symmetric, so it cannot be seen before the reveal.
    g.rotation.y = slot.yaw * pDraw + reversedYaw;
    // Flip around the card's long axis; π shows the back.
    f.rotation.y = Math.PI * (1 - pFlip);
    // A slight tilt toward the viewer during the flip reads more physically.
    f.rotation.x = -Math.sin(Math.PI * pFlip) * 0.12;

    const gm = glowMat.current;
    if (glow.current && gm) {
      const target = selected ? 0.85 : hovered.current && drawn ? 0.4 : 0;
      gm.opacity += (target - gm.opacity) * damp(8, dt);
      glow.current.visible = gm.opacity > 0.01;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (drawn) onActivate(index);
  };

  return (
    <group ref={root} visible={drawn} position={origin}>
      <mesh ref={glow} rotation-x={-Math.PI / 2} position-y={-CARD_T} visible={false}>
        <planeGeometry args={[1.9, 2.6]} />
        <meshBasicMaterial
          ref={glowMat}
          map={glowTexture()}
          color="#e8c77a"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Lay the card flat: local +z (front normal) points up, local +y (card top) points away. */}
      <group rotation-x={-Math.PI / 2}>
        <group
          ref={flip}
          onClick={handleClick}
            onPointerOver={(e) => {
              e.stopPropagation();
              hovered.current = true;
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              hovered.current = false;
              document.body.style.cursor = "";
            }}
        >
          <mesh geometry={edge} material={edgeMaterial} castShadow />
          <mesh geometry={front} material={frontMat} position-z={CARD_T / 2 + 0.0025} />
          <mesh geometry={back} material={backMat} position-z={-CARD_T / 2 - 0.0025} rotation-y={Math.PI} />
        </group>
      </group>
    </group>
  );
});
