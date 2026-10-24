import * as THREE from "three";
import { CARD_ART_HEIGHT, CARD_ART_WIDTH, renderCardBack, renderCardFront } from "@/lib/tarot/art";
import { findCard } from "@/lib/tarot/deck";
import { CARD_H, CARD_T, CARD_W } from "@/components/spreads/layout";

// Geometry and textures are shared across every card instance and created once.

const RADIUS = 0.06;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function faceGeometry(mirrorU: boolean) {
  const geo = new THREE.ShapeGeometry(roundedRect(CARD_W, CARD_H, RADIUS), 6);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) + CARD_W / 2) / CARD_W;
    uv.setXY(i, mirrorU ? 1 - u : u, (pos.getY(i) + CARD_H / 2) / CARD_H);
  }
  uv.needsUpdate = true;
  return geo;
}

let shared: {
  edge: THREE.BufferGeometry;
  front: THREE.BufferGeometry;
  back: THREE.BufferGeometry;
  hit: THREE.BufferGeometry;
  edgeMaterial: THREE.Material;
} | null = null;

export function cardGeometry() {
  if (!shared) {
    const edge = new THREE.ExtrudeGeometry(roundedRect(CARD_W, CARD_H, RADIUS), {
      depth: CARD_T,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.004,
      bevelSegments: 2,
      curveSegments: 6,
    });
    edge.translate(0, 0, -CARD_T / 2);
    shared = {
      edge,
      front: faceGeometry(false),
      // The back face is rotated π around Y, which would mirror U; flip it back.
      back: faceGeometry(true),
      hit: new THREE.PlaneGeometry(CARD_W * 1.04, CARD_H * 1.04),
      edgeMaterial: new THREE.MeshStandardMaterial({ color: "#b8934d", metalness: 0.85, roughness: 0.32 }),
    };
  }
  return shared;
}

const TEX_SCALE = 0.85;
const textureCache = new Map<string, Promise<THREE.Texture>>();

function svgToTexture(svg: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(CARD_ART_WIDTH * TEX_SCALE);
      canvas.height = Math.round(CARD_ART_HEIGHT * TEX_SCALE);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return reject(new Error("2D canvas unavailable"));
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      resolve(tex);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Card artwork failed to rasterise"));
    };
    img.src = url;
  });
}

export function loadCardTexture(cardId: string): Promise<THREE.Texture> {
  let p = textureCache.get(cardId);
  if (!p) {
    const card = findCard(cardId);
    if (!card) return Promise.reject(new Error(`Unknown card ${cardId}`));
    p = svgToTexture(renderCardFront(card));
    textureCache.set(cardId, p);
  }
  return p;
}

export function loadBackTexture(): Promise<THREE.Texture> {
  let p = textureCache.get("__back");
  if (!p) {
    p = svgToTexture(renderCardBack());
    textureCache.set("__back", p);
  }
  return p;
}
