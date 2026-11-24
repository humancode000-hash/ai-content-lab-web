"use client";

import { useEffect, useState } from "react";

export interface VideoFrameStep {
  slot: string;
  label: "БЫЛО" | "СТАЛО";
  visualNote: string;
  screenText: string;
}

interface BeforeAfterMediaProps {
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeCaption: string;
  afterCaption: string;
  reelScript: string;
  frames: VideoFrameStep[];
}

export function BeforeAfterMediaBlock({
  title,
  beforeImage,
  afterImage,
  beforeCaption,
  afterCaption,
  reelScript,
  frames,
}: BeforeAfterMediaProps) {
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (mode !== "video" || !playing || frames.length === 0) return;
    const t = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 2600);
    return () => window.clearInterval(t);
  }, [mode, playing, frames.length]);

  const active = frames[frameIndex] || frames[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => { setMode("photo"); setPlaying(false); }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
            mode === "photo" ? "bg-cyan-500 text-neutral-950" : "border border-neutral-700 bg-neutral-900 text-neutral-200"
          }`}
        >
          Фото Было / Стало
        </button>
        <button
          type="button"
          onClick={() => { setMode("video"); setFrameIndex(0); setPlaying(true); }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
            mode === "video" ? "bg-emerald-400 text-neutral-950" : "border border-neutral-700 bg-neutral-900 text-neutral-200"
          }`}
        >
          Видео Было / Стало (15-18с)
        </button>
      </div>

      {mode === "photo" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
            <div className="text-xs font-bold uppercase text-rose-300">ФОТО БЫЛО</div>
            <img src={beforeImage} alt={`Фото Было: ${title}`} className="w-full rounded-lg border border-neutral-800 object-cover" />
            <p className="text-sm text-neutral-200">{beforeCaption}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
            <div className="text-xs font-bold uppercase text-emerald-300">ФОТО СТАЛО</div>
            <img src={afterImage} alt={`Фото Стало: ${title}`} className="w-full rounded-lg border border-neutral-800 object-cover" />
            <p className="text-sm text-emerald-100">{afterCaption}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-500/30 bg-neutral-950/80 p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              ВИДЕО 15-18 СЕК • {active.slot} ({active.label})
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white"
            >
              {playing ? "Пауза" : "Авто-цикл"}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {frames.map((fr, i) => (
              <button
                key={fr.slot}
                type="button"
                onClick={() => { setPlaying(false); setFrameIndex(i); }}
                className={`rounded px-2.5 py-1 text-xs font-semibold ${
                  i === frameIndex
                    ? fr.label === "БЫЛО" ? "bg-rose-500 text-white" : "bg-emerald-500 text-neutral-950"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                {fr.slot} • {fr.label}
              </button>
            ))}
          </div>

          <img
            src={active.label === "БЫЛО" ? beforeImage : afterImage}
            alt={`Кадр ${active.slot}: ${title}`}
            className="w-full max-h-[340px] rounded-lg border border-neutral-800 object-cover"
          />

          <div className="rounded-lg border border-neutral-800 bg-neutral-900/90 p-3 space-y-1 text-xs">
            <div className="font-semibold text-white">Титр ({active.slot}): "{active.screenText}"</div>
            <div className="text-neutral-300">{active.visualNote}</div>
          </div>

          <p className="text-xs text-neutral-300"><strong className="text-white">Reels / Shorts:</strong> {reelScript}</p>
        </div>
      )}
    </div>
  );
}
