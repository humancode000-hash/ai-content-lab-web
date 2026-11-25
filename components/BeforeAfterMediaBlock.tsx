"use client";

import { useState } from "react";

export interface VideoFrameStep {
  slot: string;
  label: "БЫЛО" | "СТАЛО";
  visualNote: string;
  screenText: string;
}

interface BeforeAfterMediaProps {
  title: string;
  beforePhotoSrc: string;
  afterPhotoSrc: string;
  beforeCaption: string;
  afterHeadline: string;
  afterBadge: string;
  afterBullets: string[];
  reelScript: string;
  frames: VideoFrameStep[];
  beforeVideoSrc?: string;
  afterVideoSrc?: string;
}

export function BeforeAfterMediaBlock({
  title,
  beforePhotoSrc,
  afterPhotoSrc,
  beforeCaption,
  afterHeadline,
  afterBadge,
  afterBullets,
  reelScript,
  frames,
  beforeVideoSrc,
  afterVideoSrc,
}: BeforeAfterMediaProps) {
  const [afterStepIdx, setAfterStepIdx] = useState<number>(0);

  const beforeFrame = frames.find((f) => f.label === "БЫЛО") || {
    slot: "0-3 сек",
    label: "БЫЛО" as const,
    screenText: beforeCaption.slice(0, 68),
    visualNote: "Стартовый кадр до оформления карточки и показа выгоды.",
  };

  const afterFrames = frames.filter((f) => f.label === "СТАЛО");
  const activeAfterFrame =
    afterFrames[afterStepIdx] ||
    afterFrames[0] || {
      slot: "3-18 сек",
      label: "СТАЛО" as const,
      screenText: afterHeadline,
      visualNote: afterBullets[0] || afterBadge,
    };

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* БЫЛО: ФОТО + ВИДЕО */}
      <div className="rounded-2xl border border-rose-500/35 bg-neutral-900/90 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
            БЫЛО • ДО ОФОРМЛЕНИЯ
          </span>
          <span className="rounded bg-rose-950 px-2 py-0.5 text-[11px] text-rose-200">
            0-3с
          </span>
        </div>

        <p className="text-sm text-neutral-200">{beforeCaption}</p>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-3 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
            ФОТО • БЫЛО
          </div>
          <img
            src={beforePhotoSrc}
            alt={`Фото Было: ${title}`}
            className="h-52 w-full rounded-lg border border-neutral-800 object-cover grayscale contrast-75"
          />
        </div>

        <div className="rounded-xl border border-rose-500/25 bg-neutral-950/90 p-3 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
            ВИДЕО • БЫЛО ({beforeFrame.slot})
          </div>
          {beforeVideoSrc ? (
            <video
              src={beforeVideoSrc}
              controls
              playsInline
              poster={beforePhotoSrc}
              className="h-52 w-full rounded-lg border border-neutral-800 bg-black object-cover"
            />
          ) : (
            <div className="rounded-lg border border-neutral-800 bg-rose-950/20 p-3 space-y-1.5">
              <div className="text-xs font-semibold text-rose-200">
                Титр ({beforeFrame.slot}): «{beforeFrame.screenText}»
              </div>
              <p className="text-xs text-neutral-300">{beforeFrame.visualNote}</p>
            </div>
          )}
        </div>
      </div>

      {/* СТАЛО: ФОТО + ВИДЕО */}
      <div className="rounded-2xl border border-emerald-400/45 bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-cyan-950/35 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            СТАЛО • ПОСЛЕ ОФОРМЛЕНИЯ
          </span>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-200">
            3-18с
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="inline-block rounded bg-cyan-500/15 px-2 py-0.5 text-xs font-semibold text-cyan-300">
            {afterBadge}
          </div>
          <div className="text-base font-bold text-white">{afterHeadline}</div>
          <ul className="space-y-1 text-xs text-emerald-100">
            {afterBullets.map((b) => (
              <li key={b}>✓ {b}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-emerald-400/30 bg-neutral-950/85 p-3 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            ФОТО • СТАЛО
          </div>
          <img
            src={afterPhotoSrc}
            alt={`Фото Стало: ${title}`}
            className="h-52 w-full rounded-lg border border-emerald-500/25 object-cover"
          />
        </div>

        <div className="rounded-xl border border-emerald-400/30 bg-neutral-950/90 p-3 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              ВИДЕО • СТАЛО ({activeAfterFrame.slot})
            </span>
            {afterFrames.length > 1 && !afterVideoSrc && (
              <div className="flex flex-wrap gap-1">
                {afterFrames.map((af, idx) => (
                  <button
                    key={af.slot}
                    type="button"
                    onClick={() => setAfterStepIdx(idx)}
                    className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                      idx === afterStepIdx
                        ? "bg-emerald-400 text-neutral-950"
                        : "bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    {af.slot}
                  </button>
                ))}
              </div>
            )}
          </div>

          {afterVideoSrc ? (
            <video
              src={afterVideoSrc}
              controls
              playsInline
              poster={afterPhotoSrc}
              className="h-52 w-full rounded-lg border border-neutral-800 bg-black object-cover"
            />
          ) : (
            <div className="rounded-lg border border-emerald-500/25 bg-emerald-950/20 p-3 space-y-1.5">
              <div className="text-xs font-semibold text-emerald-200">
                Титр ({activeAfterFrame.slot}): «{activeAfterFrame.screenText}»
              </div>
              <p className="text-xs text-neutral-200">{activeAfterFrame.visualNote}</p>
            </div>
          )}

          <p className="text-[11px] text-neutral-300">
            <strong className="text-white">Reels / Shorts:</strong> {reelScript}
          </p>
        </div>
      </div>
    </div>
  );
}
