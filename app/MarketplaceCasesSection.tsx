import { CaseBeforeAfterCard } from "./components/CaseBeforeAfterCard";
import { marketplaceCases } from "./data/marketplace-cases";

export function MarketplaceCasesSection() {
  return (
    <section id="cases" className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          Кейсы «Было — Стало» для маркетплейсов
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Разборы упаковки карточек и подачи выгод на популярных товарах: от исходника к понятному офферу.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {marketplaceCases.map((item, index) => (
          <CaseBeforeAfterCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
