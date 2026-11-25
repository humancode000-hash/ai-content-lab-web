import { BeforeAfterMediaBlock, type VideoFrameStep } from "./BeforeAfterMediaBlock";

const orgFrames: VideoFrameStep[] = [
  { slot: "0-3 сек", label: "БЫЛО", screenText: "Уходовые баночки занимают всю полку и путаются?", visualNote: "Флаконы, сыворотки и тюбики стоят вперемешку, тусклый кадр и теснота." },
  { slot: "3-8 сек", label: "СТАЛО", screenText: "Каждый флакон и баночка на своём месте", visualNote: "Раскладка уходовых средств по отсекам и ярусам при ровном светлом освещении." },
  { slot: "8-13 сек", label: "СТАЛО", screenText: "Быстро найти нужное средство утром", visualNote: "Показываем высоту отсеков под высокие флаконы и порядок на столике." },
  { slot: "13-18 сек", label: "СТАЛО", screenText: "Органайзер для косметики — детали в карточке", visualNote: "Финальный чистый кадр и призыв посмотреть размеры в карточке." },
];

const vacFrames: VideoFrameStep[] = [
  { slot: "0-3 сек", label: "БЫЛО", screenText: "Объёмные вещи не помещаются в шкаф или чемодан?", visualNote: "Плотно забитая полка и кадр пакета без показа экономии места." },
  { slot: "3-8 сек", label: "СТАЛО", screenText: "Сжимаем объём в разы за пару минут", visualNote: "Укладка вещей в пакет, закрытие замка и откачка воздуха ручным насосом." },
  { slot: "8-13 сек", label: "СТАЛО", screenText: "Насос в комплекте • Защита от пыли и влаги", visualNote: "Компактная стопка вещей в шкафу или чемодане, наглядно показан комплект с насосом." },
  { slot: "13-18 сек", label: "СТАЛО", screenText: "Вакуумные пакеты с насосом — наборы в карточке", visualNote: "Свободное место на полке рядом со сжатым блоком вещей." },
];

export function ExtraHomeCasesBlock() {
  return (
    <section className="mx-auto mt-10 max-w-5xl space-y-8 px-4 pb-16">
      <article className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          04 • ДОМ И ХРАНЕНИЕ • ФОТО И ВИДЕО БЫЛО / СТАЛО + SEO
        </div>
        <h2 className="text-2xl font-bold text-white">
          Органайзер для косметики и уходовых средств
        </h2>

        <BeforeAfterMediaBlock
          title="Органайзер для косметики и уходовых средств"
          beforePhotoSrc="/cases/organizer.jpg"
          afterPhotoSrc="/cases/organizer.jpg"
          beforeCaption="Флаконы, сыворотки и тюбики стоят вперемешку на полке, тусклый кадр, неясно про вместимость высоких флаконов."
          afterHeadline="Порядок на полке и столике — всё под рукой"
          afterBadge="Отсеки под флаконы и уход • Удобные ярусы"
          afterBullets={[
            "Чёткое зонирование под высокие флаконы и баночки",
            "Наглядный порядок без визуального шума на первом экране",
            "Готовый сценарий Reels/Shorts (15-18с) и SEO-текст",
          ]}
          reelScript="0-3с: «Уходовые баночки занимают всю полку и путаются?» 3-13с: раскладка по отсекам и ярусам. 13-18с: «Органайзер для косметики — детали в карточке»."
          frames={orgFrames}
        />

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm text-neutral-300">
          <strong className="text-white">SEO-ТЕКСТ ПОД ПОИСК МАРКЕТПЛЕЙСА:</strong> Органайзер для косметики и уходовых средств с удобными отсеками для флаконов, баночек и аксессуаров: аккуратное хранение и порядок дома или в подарок.
        </div>

        <a
          href="#order"
          className="inline-flex items-center rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-cyan-400"
        >
          Заказать такой же комплект →
        </a>
      </article>

      <article className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          05 • ДОМ И ХРАНЕНИЕ • ФОТО И ВИДЕО БЫЛО / СТАЛО + SEO
        </div>
        <h2 className="text-2xl font-bold text-white">
          Вакуумные пакеты с ручным насосом для хранения вещей
        </h2>

        <BeforeAfterMediaBlock
          title="Вакуумные пакеты с ручным насосом для хранения вещей"
          beforePhotoSrc="/cases/storage.jpg"
          afterPhotoSrc="/cases/storage.jpg"
          beforeCaption="Обычное фото пакета без показа экономии места и объёма — покупатель не считывает выгоду и наличие насоса."
          afterHeadline="Компактное хранение вещей — насос в комплекте"
          afterBadge="Экономия места в шкафу и чемодане • Защита от пыли"
          afterBullets={[
            "Сразу показываем сжатие объёма одежды и пледов",
            "Крупно выделяем ручной насос в комплекте и защиту от пыли",
            "Готовый сценарий Reels/Shorts (15-18с) и SEO-описание",
          ]}
          reelScript="0-3с: «Объёмные вещи не помещаются в шкаф или чемодан?» 3-13с: откачка воздуха насосом и сжатие объёма. 13-18с: «Вакуумные пакеты с насосом — наборы в карточке»."
          frames={vacFrames}
        />

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm text-neutral-300">
          <strong className="text-white">SEO-ТЕКСТ ПОД ПОИСК МАРКЕТПЛЕЙСА:</strong> Вакуумные пакеты с ручным насосом для компактного хранения одежды, пледов и вещей в шкафу или чемодане: экономия места и защита от пыли и влаги.
        </div>

        <a
          href="#order"
          className="inline-flex items-center rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-cyan-400"
        >
          Заказать такой же комплект →
        </a>
      </article>
    </section>
  );
}
