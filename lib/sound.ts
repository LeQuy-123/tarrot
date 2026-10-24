"use client";

import { settingsStore } from "@/lib/storage/settings";

// Small synthesized cues via Web Audio — no audio assets to load.

export type Cue = "shuffle" | "draw" | "flip" | "reveal" | "chime";

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBurst(ac: AudioContext, out: AudioNode, start: number, duration: number, freq: number) {
  const length = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 0.8;
  src.connect(filter).connect(out);
  src.start(start);
}

function tone(ac: AudioContext, out: AudioNode, start: number, freq: number, duration: number, gain: number) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g).connect(out);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

export function playCue(cue: Cue) {
  const settings = settingsStore.get();
  if (!settings.sound) return;
  const ac = audio();
  if (!ac) return;
  const master = ac.createGain();
  master.gain.value = settings.volume * 0.6;
  master.connect(ac.destination);
  const t = ac.currentTime;
  switch (cue) {
    case "shuffle":
      for (let i = 0; i < 9; i++) noiseBurst(ac, master, t + i * 0.07, 0.06, 2500 + i * 120);
      break;
    case "draw":
      noiseBurst(ac, master, t, 0.18, 1400);
      break;
    case "flip":
      noiseBurst(ac, master, t, 0.09, 3200);
      tone(ac, master, t + 0.04, 660, 0.5, 0.06);
      break;
    case "reveal":
      tone(ac, master, t, 523.25, 1.4, 0.08);
      tone(ac, master, t + 0.12, 783.99, 1.6, 0.06);
      tone(ac, master, t + 0.24, 1046.5, 1.8, 0.04);
      break;
    case "chime":
      tone(ac, master, t, 880, 1.2, 0.07);
      break;
  }
}
