"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { SpreadLayout } from "@/components/spreads/layout";
import { damp } from "./anim";

export interface ViewInsets {
  /** Pixels covered by a panel on the right edge. */
  right: number;
  /** Pixels covered by a sheet along the bottom edge. */
  bottom: number;
}

const ELEVATION = (58 * Math.PI) / 180;
const MARGIN = 1.24;

/** Frames the spread inside the uncovered part of the viewport, with gentle pointer parallax. */
export function CameraRig({
  frame,
  insets,
  reducedMotion,
}: {
  frame: SpreadLayout["frame"];
  insets: ViewInsets;
  reducedMotion: boolean;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const pointer = useThree((s) => s.pointer);
  const target = useRef(new THREE.Vector3(frame.cx, 0, frame.cz));
  const scratch = useMemo(() => ({ pos: new THREE.Vector3(), look: new THREE.Vector3() }), []);
  const initialised = useRef(false);

  useFrame((_, dt) => {
    const w = Math.max(1, size.width - insets.right);
    const h = Math.max(1, size.height - insets.bottom);
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    // Half-angle tangents of the part of the view that is not covered by panels.
    const tanFreeH = (tanV * w) / size.height;
    const tanFreeV = (tanV * h) / size.height;
    const sin = Math.sin(ELEVATION);
    const cos = Math.cos(ELEVATION);
    // Distance needed to fit the frame's width and its foreshortened depth
    // (the near edge sits closer to the camera, so it gets extra room).
    const distW = (frame.width / 2) / tanFreeH + (frame.depth / 2) * cos;
    const distD = ((frame.depth * sin) / 2) / tanFreeV + frame.depth * cos * 0.4;
    const dist = Math.max(distW, distD, 6.2) * MARGIN;

    const perPx = (2 * dist * tanV) / size.height;
    const shiftRight = (insets.right / 2) * perPx;
    const shiftDown = (insets.bottom / 2) * perPx;
    const px = reducedMotion ? 0 : pointer.x * 0.35;
    const py = reducedMotion ? 0 : pointer.y * 0.2;

    // camera up vector on the tilted view: (0, cos, -sin)
    scratch.look.set(frame.cx + shiftRight + px * 0.3, -shiftDown * cos, frame.cz + shiftDown * sin);
    scratch.pos.set(
      scratch.look.x + px,
      scratch.look.y + dist * sin + py * cos,
      scratch.look.z + dist * cos - py * sin,
    );

    const k = !initialised.current ? 1 : damp(reducedMotion ? 30 : 3.2, dt);
    initialised.current = true;
    camera.position.lerp(scratch.pos, k);
    target.current.lerp(scratch.look, k);
    camera.lookAt(target.current);
  });

  return null;
}
