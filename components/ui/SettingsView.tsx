"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { useHydrated, useSettings, useWebGL } from "@/lib/hooks";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/storage/settings";
import { clearAllLocalData } from "@/lib/storage/clear";
import { playCue } from "@/lib/sound";
import { useLang, useMessages } from "@/lib/i18n";
import { Ornament } from "./Sigil";

function Row({ label, description, children, htmlFor }: { label: string; description: string; children: ReactNode; htmlFor?: string }) {
  return (
    <div className="flex flex-col gap-3 border-b border-hairline py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-md">
        <label htmlFor={htmlFor} className="font-display text-xl text-parchment">
          {label}
        </label>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ id, checked, onChange }: { id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full border transition ${checked ? "border-gold/70 bg-gold/30" : "border-hairline bg-void/60"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${checked ? "left-6 bg-gold-light" : "left-0.5 bg-mist/60"}`}
      />
    </button>
  );
}

type AiStatus = { available: boolean; provider: string | null } | "unknown";

/** Asks the server whether an AI provider is configured (never exposes the key itself). */
function useAiStatus(): AiStatus {
  const [status, setStatus] = useState<AiStatus>("unknown");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/reading/status", { signal: controller.signal, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((s: { available: boolean; provider: string | null }) => setStatus(s))
      .catch(() => {
        if (!controller.signal.aborted) setStatus({ available: false, provider: null });
      });
    return () => controller.abort();
  }, []);
  return status;
}

function AiStatusNote({ status, enabled }: { status: AiStatus; enabled: boolean }) {
  const t = useMessages().settings;
  if (status === "unknown") return <p className="mt-1 text-xs text-muted">{t.aiChecking}</p>;
  if (status.available) {
    const name = status.provider === "anthropic" ? "Claude" : t.aiMock;
    return <p className="mt-1 text-xs text-[#9fd3a8]">{t.aiReady(name)}</p>;
  }
  return (
    <p className={`mt-1 text-xs ${enabled ? "text-ember" : "text-muted"}`}>
      {t.aiMissing}
      {enabled ? t.aiMissingOn : ""}
      {t.aiMissingHow("ANTHROPIC_API_KEY", ".env.local")}
    </p>
  );
}

function Segmented<T extends string>({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div id={id} role="radiogroup" className="flex rounded-full border border-hairline p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-3 py-1 text-sm transition ${value === o.value ? "bg-gold/20 text-gold-light" : "text-muted hover:text-parchment"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SettingsView() {
  const [settings, update] = useSettings();
  const hydrated = useHydrated();
  const webgl = useWebGL();
  const ids = {
    sound: useId(),
    volume: useId(),
    motion: useId(),
    render: useId(),
    reversals: useId(),
    ai: useId(),
    contrast: useId(),
    text: useId(),
    lang: useId(),
  };
  const [lang, setLang] = useLang();
  const t = useMessages().settings;
  const [cleared, setCleared] = useState(false);
  const set = (patch: Partial<Settings>) => update(patch);
  const aiStatus = useAiStatus();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <p className="text-xs tracking-[0.4em] text-gold uppercase">{t.eyebrow}</p>
        <h1 className="engraved mt-2 font-display text-5xl sm:text-6xl">{t.title}</h1>
        <Ornament className="mx-auto mt-3 w-52 text-gold/50" />
      </header>

      <div className={`panel mt-8 rounded-2xl px-5 sm:px-7 ${hydrated ? "" : "opacity-60"}`}>
        <h2 className="pt-5 text-xs tracking-[0.3em] text-gold uppercase">{t.language}</h2>
        <Row label={t.language} description={t.languageDesc} htmlFor={ids.lang}>
          <Segmented
            id={ids.lang}
            value={lang}
            onChange={setLang}
            options={[
              { value: "en", label: "English" },
              { value: "vi", label: "Tiếng Việt" },
            ]}
          />
        </Row>

        <h2 className="pt-6 text-xs tracking-[0.3em] text-gold uppercase">{t.sound}</h2>
        <Row label={t.soundEffects} description={t.soundEffectsDesc} htmlFor={ids.sound}>
          <Toggle
            id={ids.sound}
            checked={settings.sound}
            onChange={(v) => {
              set({ sound: v });
              if (v) setTimeout(() => playCue("chime"), 0);
            }}
          />
        </Row>
        <Row label={t.volume} description={t.volumeDesc} htmlFor={ids.volume}>
          <input
            id={ids.volume}
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.volume}
            disabled={!settings.sound}
            onChange={(e) => set({ volume: Number(e.target.value) })}
            onPointerUp={() => playCue("chime")}
            className="w-40 accent-[#c9a45c] disabled:opacity-40"
          />
        </Row>

        <h2 className="pt-6 text-xs tracking-[0.3em] text-gold uppercase">{t.animation}</h2>
        <Row
          label={t.motion}
          description={t.motionDesc}
          htmlFor={ids.motion}
        >
          <Segmented
            id={ids.motion}
            value={settings.motion}
            onChange={(motion) => set({ motion })}
            options={[
              { value: "system", label: t.motionSystem },
              { value: "full", label: t.motionFull },
              { value: "reduced", label: t.motionReduced },
            ]}
          />
        </Row>
        <Row
          label={t.chamber}
          description={webgl === false ? t.chamberNoWebgl : t.chamberDesc}
          htmlFor={ids.render}
        >
          <Segmented
            id={ids.render}
            value={settings.renderMode}
            onChange={(renderMode) => set({ renderMode })}
            options={[
              { value: "auto", label: "3D" },
              { value: "2d", label: "2D" },
            ]}
          />
        </Row>

        <h2 className="pt-6 text-xs tracking-[0.3em] text-gold uppercase">{t.reading}</h2>
        <div className="border-b border-hairline py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md">
              <label htmlFor={ids.ai} className="font-display text-xl text-parchment">
                {t.ai}
              </label>
              <p className="text-sm text-muted">
                {settings.aiReading ? t.aiOn : t.aiOff}
              </p>
            </div>
            <Toggle id={ids.ai} checked={settings.aiReading} onChange={(aiReading) => set({ aiReading })} />
          </div>
          <AiStatusNote status={aiStatus} enabled={settings.aiReading} />
        </div>
        <Row label={t.reversals} description={t.reversalsDesc} htmlFor={ids.reversals}>
          <Toggle id={ids.reversals} checked={settings.reversals} onChange={(reversals) => set({ reversals })} />
        </Row>

        <h2 className="pt-6 text-xs tracking-[0.3em] text-gold uppercase">{t.accessibility}</h2>
        <Row label={t.contrast} description={t.contrastDesc} htmlFor={ids.contrast}>
          <Toggle id={ids.contrast} checked={settings.highContrast} onChange={(highContrast) => set({ highContrast })} />
        </Row>
        <Row label={t.largeText} description={t.largeTextDesc} htmlFor={ids.text}>
          <Toggle id={ids.text} checked={settings.largeText} onChange={(largeText) => set({ largeText })} />
        </Row>
        <div className="flex justify-end py-5">
          <button
            type="button"
            onClick={() => update(DEFAULT_SETTINGS)}
            className="text-sm text-muted underline-offset-4 hover:text-parchment hover:underline"
          >
            {t.restore}
          </button>
        </div>
      </div>

      <section className="panel mt-6 rounded-2xl p-5 sm:p-7" aria-labelledby="data-title">
        <h2 id="data-title" className="text-xs tracking-[0.3em] text-gold uppercase">
          {t.data}
        </h2>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <p className="font-display text-xl text-parchment">{t.clearData}</p>
            <p className="text-sm text-muted">{t.clearDataDesc}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!window.confirm(t.confirmClearData)) return;
              clearAllLocalData();
              setCleared(true);
            }}
            className="shrink-0 rounded-full border border-ember/60 px-4 py-2 text-sm text-ember transition hover:bg-ember/10"
          >
            {t.clearData}
          </button>
        </div>
        <p role="status" className="mt-2 text-sm text-[#9fd3a8]">
          {cleared ? t.clearedData : ""}
        </p>
      </section>

      <section className="panel mt-6 rounded-2xl p-5 text-sm text-muted sm:p-7">
        <h2 className="font-display text-xl text-parchment">{t.keyboard}</h2>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
          {t.keys.map(([k, v]) => (
            <div key={k} className="contents">
              <dt>
                <kbd className="rounded border border-hairline px-1.5 py-0.5 text-xs text-parchment">{k}</kbd>
              </dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
