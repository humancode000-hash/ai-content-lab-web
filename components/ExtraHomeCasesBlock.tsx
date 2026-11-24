import { BeforeAfterMediaBlock } from "./BeforeAfterMediaBlock";

export function ExtraHomeCasesBlock() {
  return (
    <section className="mx-auto mt-10 max-w-5xl space-y-8 px-4 pb-16">
      <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          04 • ДОМ И ХРАНЕНИЕ • ПОРЯДОК НА ПОЛКЕ • Фото и Видео Было/Стало + SEO
        </div>
        <h2 className="text-2xl font-bold text-white">
          Органайзер для косметики и уходовых средств
        </h2>

        <BeforeAfterMediaBlock
          title="Органайзер для косметики и уходовых средств"
          beforeImage="/cases/organizer-before.svg"
          afterImage="/cases/organizer-after.svg"
          beforeCaption="Флаконы, сыворотки и тюбики стоят вперемешку на полке, тусклый кадр, неясно про вместимость высоких флаконов."
          afterCaption="Чистое зонирование под флаконы и уход, сразу сняты вопросы вместимости, готовый сценарий Reels/Shorts и SEO-текст."
          reelScript="0–2с: «Уходовые баночки занимают всю полку и путаются?» 2–12с: кадры раскладки средств по отсекам и быстрый порядок. 12–18с: «Органайзер для косметики — детали в карточке»."
        />

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2 text-sm text-neutral-300">
          <p>
            <strong className="text-white">SEO-ТЕКСТ ПОД ПОИСК МАРКЕТПЛЕЙСА:</strong> Органайзер для косметики и уходовых средств с удобными отсеками для флаконов, баночек и аксессуаров: аккуратное хранение и порядок дома или в подарок.
          </p>
        </div>

        <a
          href="#order"
          className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-emerald-400"
        >
          Заказать такой же комплект →
        </a>
      </article>

      <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          05 • ДОМ И ХРАНЕНИЕ • ЭКОНОМИЯ МЕСТА • Фото и Видео Было/Стало + SEO
        </div>
        <h2 className="text-2xl font-bold text-white">
          Вакуумные пакеты с ручным насосом для хранения вещей
        </h2>

        <BeforeAfterMediaBlock
          title="Вакуумные пакеты с ручным насосом для хранения вещей"
          beforeImage="/cases/vacuum-before.svg"
          afterImage="/cases/vacuum-after.svg"
          beforeCaption="Серое фото пакета без показа экономии места и объёма — покупатель не считывает выгоду и наличие насоса."
          afterCaption="Наглядное сжатие объёма вещей, крупно показаны насос в комплекте и защита от пыли, готовый Reels/Shorts и SEO."
          reelScript="0–2с: «Зимние куртки и пледы не помещаются в шкаф или чемодан?» 2–12с: откачка воздуха насосом и наглядное сжатие объёма. 12–18с: «Вакуумные пакеты с насосом — подробности в карточке»."
        />

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2 text-sm text-neutral-300">
          <p>
            <strong className="text-white">SEO-ТЕКСТ ПОД ПОИСК МАРКЕТПЛЕЙСА:</strong> Вакуумные пакеты с ручным насосом для компактного хранения одежды, пледов и вещей в шкафу или чемодане: экономия места и защита от пыли и влаги.
          </p>
        </div>

        <a
          href="#order"
          className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-emerald-400"
        >
          Заказать такой же комплект →
        </a>
      </article>
    </section>
  );
}
