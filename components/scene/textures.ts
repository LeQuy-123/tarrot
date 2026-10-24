import * as THREE from "three";

function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, size: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

let glow: THREE.Texture | null = null;
export function glowTexture() {
  glow ??= canvasTexture(128, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.35, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });
  return glow;
}

const GOLD = "rgba(201,164,92,";
const GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

/** The engraved reading table surface: concentric rings, ticks, zodiac band and a central star. */
export function tableTexture() {
  return canvasTexture(2048, (ctx, s) => {
    const c = s / 2;
    const bg = ctx.createRadialGradient(c, c, 0, c, c, c);
    bg.addColorStop(0, "#1a2050");
    bg.addColorStop(0.55, "#10153a");
    bg.addColorStop(1, "#070918");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, s, s);

    // fine noise for a velvet surface
    const img = ctx.getImageData(0, 0, s, s);
    let seed = 7;
    for (let i = 0; i < img.data.length; i += 4) {
      seed = (seed * 16807) % 2147483647;
      const n = (seed / 2147483647 - 0.5) * 10;
      img.data[i] += n;
      img.data[i + 1] += n;
      img.data[i + 2] += n;
    }
    ctx.putImageData(img, 0, 0);

    const ring = (r: number, w: number, a: number, dash?: number[]) => {
      ctx.beginPath();
      ctx.setLineDash(dash ?? []);
      ctx.strokeStyle = `${GOLD}${a})`;
      ctx.lineWidth = w;
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
    };
    const R = c * 0.97;
    ring(R, 6, 0.75);
    ring(R - 14, 1.5, 0.6);
    ring(R * 0.9, 2, 0.5);
    ring(R * 0.84, 1, 0.4);
    ring(R * 0.62, 1.2, 0.28, [4, 10]);
    ring(R * 0.4, 1, 0.18);
    ctx.setLineDash([]);

    // degree ticks
    for (let i = 0; i < 360; i++) {
      const a = (i / 360) * Math.PI * 2;
      const len = i % 30 === 0 ? 34 : i % 5 === 0 ? 18 : 8;
      ctx.strokeStyle = `${GOLD}${i % 30 === 0 ? 0.8 : 0.45})`;
      ctx.lineWidth = i % 30 === 0 ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * (R - 16), c + Math.sin(a) * (R - 16));
      ctx.lineTo(c + Math.cos(a) * (R - 16 - len), c + Math.sin(a) * (R - 16 - len));
      ctx.stroke();
    }

    // zodiac band
    ctx.fillStyle = `${GOLD}0.7)`;
    ctx.font = `${Math.round(s * 0.03)}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    GLYPHS.forEach((g, i) => {
      const a = ((i + 0.5) / 12) * Math.PI * 2 - Math.PI / 2;
      const r = R * 0.87;
      ctx.save();
      ctx.translate(c + Math.cos(a) * r, c + Math.sin(a) * r);
      ctx.rotate(a + Math.PI / 2);
      ctx.fillText(`${g}︎`, 0, 0);
      ctx.restore();
    });

    // faint radial spokes and a central eight-point star
    ctx.strokeStyle = `${GOLD}0.08)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * R * 0.4, c + Math.sin(a) * R * 0.4);
      ctx.lineTo(c + Math.cos(a) * R * 0.84, c + Math.sin(a) * R * 0.84);
      ctx.stroke();
    }
    ctx.strokeStyle = `${GOLD}0.16)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? R * 0.38 : R * 0.12;
      const x = c + Math.cos(a) * r;
      const y = c + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
}

/** Thin engraved ring (transparent) that slowly rotates above the table surface. */
export function ringTexture() {
  return canvasTexture(1024, (ctx, s) => {
    const c = s / 2;
    ctx.clearRect(0, 0, s, s);
    ctx.strokeStyle = `${GOLD}0.55)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(c, c, c * 0.96, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(c, c, c * 0.9, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const r1 = c * 0.9;
      const r2 = c * (i % 6 === 0 ? 0.96 : 0.93);
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
      ctx.lineTo(c + Math.cos(a) * r2, c + Math.sin(a) * r2);
      ctx.stroke();
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.fillStyle = `${GOLD}0.8)`;
      ctx.beginPath();
      ctx.arc(c + Math.cos(a) * c * 0.93, c + Math.sin(a) * c * 0.93, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}
