"use client";

import { useEffect, useState } from "react";

interface BeforeAfterMediaProps {
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeCaption: string;
  afterCaption: string;
  reelScript: string;
  videoSrc?: string;
}

export function BeforeAfterMediaBlock({
  title,
  beforeImage,
  afterImage,
  beforeCaption,
  afterCaption,
  reelScript,
  videoSrc,
}: BeforeAfterMediaProps) {
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [phase, setPhase] = useState<"before" | "after">("before");
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (mode !== "video" || !playing || videoSrc) return;
    const timer = window.setInterval(() => {
      setPhase((prev) => (prev === "before" ? "after" : "before"));
    }, 2400);
    return () => window.clearInterval(timer);
  }, [mode, playing, videoSrc]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("photo");
            setPlaying(false);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            mode === "photo"
              ? "bg-cyan-500 text-neutral-950"
              : "border border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-cyan-400/50"
          }`}
        >
          Фото Было / Стало
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("video");
            setPlaying(true);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            mode === "video"
              ? "bg-emerald-400 text-neutral-950"
              : "border border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-emerald-400/50"
          }`}
        >
          Видео Было / Стало
        </button>
      </div>

      {mode === "photo" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
            <div className="text-xs font-bold uppercase text-rose-300">ФОТО БЫЛО</div>
            <img
              src={beforeImage}
              alt={`Фото Было: ${title}`}
              className="w-full rounded-lg border border-neutral-800 object-cover"
            />
            <p className="text-sm text-neutral-200">{beforeCaption}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
            <div className="text-xs font-bold uppercase text-emerald-300">ФОТО СТАЛО</div>
            <img
              src={afterImage}
              alt={`Фото Стало: ${title}`}
              className="w-full rounded-lg border border-neutral-800 object-cover"
            />
            <p className="text-sm text-emerald-100">{afterCaption}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-500/30 bg-neutral-950/80 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              ВИДЕО РАЗБОР БЫЛО → СТАЛО ({phase === "before" ? "0–3с: БЫЛО" : "3–18с: СТАЛО"})
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPhase("before")}
                className={`rounded px-2.5 py-1 text-xs font-semibold ${
                  phase === "before"
                    ? "bg-rose-500 text-white"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                0–3с Было
              </button>
              <button
                type="button"
                onClick={() => setPhase("after")}
                className={`rounded px-2.5 py-1 text-xs font-semibold ${
                  phase === "after"
                    ? "bg-emerald-500 text-neutral-950"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                3–18с Стало
              </button>
              {!videoSrc && (
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white"
                >
                  {playing ? "Пауза" : "Авто-цикл"}
                </button>
              )}
            </div>
          </div>

          {videoSrc ? (
            <video
              src={videoSrc}
              controls
              playsInline
              poster={phase === "before" ? beforeImage : afterImage}
              className="w-full max-h-[420px] rounded-lg border border-neutral-800 bg-black"
            />
          ) : (
            <div className="relative overflow-hidden rounded-lg border border-neutral-800">
              <img
                src={phase === "before" ? beforeImage : afterImage}
                alt={`Видео Было-Стало: ${title}`}
                className="w-full rounded-lg object-cover transition-all duration-500"
              />
              <div className="mt-2 flex items-center justify-between rounded-md bg-neutral-900/90 px-3 py-2 text-xs text-neutral-200">
                <span>
                  {phase === "before"
                    ? "Кадр 0–3с: показываем боль покупателя до упаковки"
                    : "Кадр 3–18с: показываем выгоду, порядок и результат"}
                </span>
                <span className="font-mono text-emerald-300">
                  {phase === "before" ? "00:00 / 00:18" : "00:06 / 00:18"}
                </span>
              </div>
            </div>
          )}

          <p className="text-xs text-neutral-300">
            <strong className="text-white">Монтаж и раскадровка Reels/Shorts:</strong> {reelScript}
          </p>
        </div>
      )}
    </div>
  );
}
