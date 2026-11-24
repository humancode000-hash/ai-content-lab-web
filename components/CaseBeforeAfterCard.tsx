export interface CaseBeforeAfterProps {
  title: string;
  niche: string;
  beforeText: string;
  afterText: string;
  deliverables: string[];
  toolName?: string;
  toolNote?: string;
  toolUrl?: string;
  ctaLabel: string;
  ctaHref: string;
}

export function CaseBeforeAfterCard({
  title,
  niche,
  beforeText,
  afterText,
  deliverables,
  toolName,
  toolNote,
  toolUrl,
  ctaLabel,
  ctaHref,
}: CaseBeforeAfterProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          {niche}
        </span>
      </div>

      <h3 className="mb-4 text-lg font-semibold text-neutral-900">{title}</h3>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-neutral-50 p-3.5">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Было
          </div>
          <p className="text-sm text-neutral-700">{beforeText}</p>
        </div>

        <div className="rounded-xl bg-emerald-50/70 p-3.5">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Стало
          </div>
          <p className="text-sm text-neutral-800">{afterText}</p>
        </div>
      </div>

      <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-neutral-700">
        {deliverables.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      {toolName && toolUrl && (
        <div className="mb-4 rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-3 text-sm text-neutral-700">
          <span className="font-medium text-neutral-900">Инструмент:</span>{" "}
          <a
            href={toolUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="underline underline-offset-2"
          >
            {toolName}
          </a>
          {toolNote ? ` — ${toolNote}` : ""}
        </div>
      )}

      <a
        href={ctaHref}
        className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        {ctaLabel}
      </a>
    </article>
  );
}
