"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CARD_T } from "@/components/spreads/layout";
import { easeInOutCubic, easeOutCubic, segment } from "@/components/scene/anim";
import { glowTexture } from "@/components/scene/textures";
import { cardGeometry, loadBackTexture } from "./cardAssets";

export const DECK_VISUAL_COUNT = 16;
export const SHUFFLE_DURATION = 3.2;
const STEP = CARD_T + 0.003;

/** Height of the top of the visual stack after `drawn` cards have left it. */
export function deckTopY(drawn: number) {
  return (DECK_VISUAL_COUNT - drawn) * STEP + CARD_T / 2;
}

interface Pose {
  x: number;
  y: number;
  z: number;
  yaw: number;
}

/**
 * Pose of visual card `i` (0 = bottom) at shuffle progress `t` seconds.
 * Phases: split into two packets → riffle back together → cut (top half carried under).
 */
function shufflePose(i: number, t: number, out: Pose): Pose {
  const n = DECK_VISUAL_COUNT;
  const half = n / 2;
  const left = i % 2 === 0;
  const baseY = i * STEP + CARD_T / 2;
  out.x = 0;
  out.y = baseY;
  out.z = 0;
  out.yaw = 0;

  // 1. split (0 – 0.7s)
  const split = easeInOutCubic(segment(t, 0, 0.7));
  // 2. riffle (0.7 – 1.9s): each card falls back to centre, bottom first
  const riffle = easeOutCubic(segment(t, 0.7 + (i / n) * 0.9, 0.3));
  const spread = split * (1 - riffle);
  const packetIndex = Math.floor(i / 2);
  out.x += (left ? -0.75 : 0.75) * spread;
  out.yaw += (left ? 0.22 : -0.22) * spread;
  out.y = baseY * (1 - spread) + (packetIndex * STEP + CARD_T / 2) * spread + Math.sin(Math.PI * riffle) * 0.08 * split;

  // 3. cut (2.0 – 3.2s)
  const cut = easeInOutCubic(segment(t, 2.0, 1.2));
  if (cut > 0) {
    if (i >= half) {
      out.z += Math.sin(Math.PI * cut) * 1.25;
      out.y = out.y + (baseY - half * STEP - out.y) * cut + Math.sin(Math.PI * cut) * 0.35;
      out.yaw += Math.sin(Math.PI * cut) * 0.12;
    } else {
      out.y = out.y + (baseY + half * STEP - out.y) * cut;
    }
  }
  return out;
}

export function Deck3D({
  position,
  drawnCount,
  shuffling,
  canDraw,
  reducedMotion,
  skipToken,
  onShuffleComplete,
  onDraw,
}: {
  position: [number, number, number];
  drawnCount: number;
  shuffling: boolean;
  canDraw: boolean;
  reducedMotion: boolean;
  skipToken: number;
  onShuffleComplete: () => void;
  onDraw: () => void;
}) {
  const { edge, front, back, edgeMaterial } = cardGeometry();
  const clock = useThree((s) => s.clock);
  const cards = useRef<(THREE.Group | null)[]>([]);
  const glow = useRef<THREE.Mesh>(null);
  const [backTex, setBackTex] = useState<THREE.Texture | null>(null);
  const shuffleStart = useRef<number | null>(null);
  const completed = useRef(false);
  const pose = useMemo<Pose>(() => ({ x: 0, y: 0, z: 0, yaw: 0 }), []);

  const glowMat = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    let alive = true;
    loadBackTexture()
      .then((t) => alive && setBackTex(t))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  // One material shared by every card in the stack, rebuilt only when the texture arrives.
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: backTex,
        color: backTex ? "#ffffff" : "#141a3a",
        roughness: 0.5,
        metalness: 0.1,
      }),
    [backTex],
  );
  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    if (shuffling) {
      shuffleStart.current = reducedMotion ? -Infinity : clock.elapsedTime;
      completed.current = false;
    } else {
      shuffleStart.current = null;
    }
  }, [shuffling, reducedMotion, clock]);

  useEffect(() => {
    if (skipToken > 0 && shuffleStart.current !== null) shuffleStart.current = -Infinity;
  }, [skipToken]);

  useFrame(() => {
    const now = clock.elapsedTime;
    const t = shuffleStart.current === null ? Infinity : now - shuffleStart.current;
    if (shuffleStart.current !== null && t >= SHUFFLE_DURATION && !completed.current) {
      completed.current = true;
      onShuffleComplete();
    }
    const visible = DECK_VISUAL_COUNT - drawnCount;
    for (let i = 0; i < DECK_VISUAL_COUNT; i++) {
      const g = cards.current[i];
      if (!g) continue;
      g.visible = i < visible;
      if (!g.visible) continue;
      shufflePose(i, t, pose);
      g.position.set(pose.x, pose.y, pose.z);
      g.rotation.y = pose.yaw;
    }
    const gm = glowMat.current;
    if (glow.current && gm) {
      const pulse = canDraw ? 0.45 + (reducedMotion ? 0 : Math.sin(now * 2.4) * 0.2) : 0;
      gm.opacity += (pulse - gm.opacity) * 0.1;
      glow.current.visible = gm.opacity > 0.01;
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (canDraw) onDraw();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (canDraw) document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
    >
      <mesh ref={glow} rotation-x={-Math.PI / 2} position-y={0.002} visible={false}>
        <planeGeometry args={[2.2, 3]} />
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
      {Array.from({ length: DECK_VISUAL_COUNT }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            cards.current[i] = el;
          }}
        >
          {/* face down: back faces up */}
          <group rotation-x={-Math.PI / 2} rotation-y={Math.PI}>
            <mesh geometry={edge} material={edgeMaterial} castShadow receiveShadow />
            <mesh geometry={front} material={material} position-z={CARD_T / 2 + 0.0025} />
            <mesh geometry={back} material={material} position-z={-CARD_T / 2 - 0.0025} rotation-y={Math.PI} />
          </group>
        </group>
      ))}
    </group>
  );
}
