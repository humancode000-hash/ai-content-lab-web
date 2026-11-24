import { BeforeAfterMediaBlock, type VideoFrameStep } from "./BeforeAfterMediaBlock";

function makeCardImg(tag: string, stroke: string, line1: string, line2: string) {
  const esc = (s: string) => s.replace(/[<>&"]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="340"><rect width="900" height="340" fill="#101522"/><rect x="24" y="24" width="852" height="292" rx="16" fill="#182032" stroke="${stroke}" stroke-width="2"/><text x="50" y="74" fill="${stroke}" font-family="Arial, sans-serif" font-size="22" font-weight="bold">${esc(tag)}</text><text x="50" y="136" fill="#f8fafc" font-family="Arial, sans-serif" font-size="20">${esc(line1)}</text><text x="50" y="186" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="17">${esc(line2)}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const orgFrames: VideoFrameStep[] = [
  { slot: "0-3 сек", label: "БЫЛО", screenText: "Уходовые баночки занимают всю полку и путаются?", visualNote: "Флаконы, сыворотки и тюбики стоят вперемешку, тусклый кадр." },
  { slot: "3-8 сек", label: "СТАЛО", screenText: "Каждый флакон и баночка на своём месте", visualNote: "Раскладка средств по отсекам и ярусам при ровном свете." },
  { slot: "8-13 сек", label: "СТАЛО", screenText: "Быстро найти нужное средство утром", visualNote: "Показываем высоту под флаконы и порядок на столике." },
  { slot: "13-18 сек", label: "СТАЛО", screenText: "Органайзер для косметики — детали в карточке", visualNote: "Финальный чистый план порядка и переход в карточку." },
];

const vacFrames: VideoFrameStep[] = [
  { slot: "0-3 сек", label: "БЫЛО", screenText: "Объёмные вещи не помещаются в шкаф или чемодан?", visualNote: "Серое фото пакета без показа экономии места и объёма." },
  { slot: "3-8 сек", label: "СТАЛО", screenText: "Сжимаем объём в разы за пару минут", visualNote: "Укладка вещей, закрытие замка и откачка воздуха насосом." },
  { slot: "8-13 сек", label: "СТАЛО", screenText: "Насос в комплекте • Защита от пыли и влаги", visualNote: "Компактная стопка вещей в шкафу и насос в комплекте." },
  { slot: "13-18 сек", label: "СТАЛО", screenText: "Вакуумные пакеты с насосом — наборы в карточке", visualNote: "Свободное место на полке рядом со сжатым блоком." },
];

export function ExtraHomeCasesBlock() {
  return (
    <section className="mx-auto mt-10 max-w-5xl space-y-8 px-4 pb-16">
      <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">04 • ДОМ И ХРАНЕНИЕ • Фото и Видео Было/Стало + SEO</div>
        <h2 className="text-2xl font-bold text-white">Органайзер для косметики и уходовых средств</h2>
        <BeforeAfterMediaBlock
          title="Органайзер для косметики и уходовых средств"
          beforeImage={makeCardImg("ФОТО БЫЛО", "#fb7185", "Флаконы и тюбики стоят вперемешку на полке", "Тусклый кадр, неясно про ярусы и высоту отсеков")}
          afterImage={makeCardImg("ФОТО СТАЛО", "#34d399", "Порядок на полке и столике — всё под рукой", "Отсеки под флаконы, баночки и уход • Видео 15-18с + SEO")}
          beforeCaption="Флаконы, сыворотки и тюбики стоят вперемешку на полке, тусклый кадр, неясно про вместимость высоких флаконов."
          afterCaption="Чистое зонирование под флаконы и уход, сразу сняты вопросы вместимости, готовый сценарий Reels/Shorts и SEO-текст."
          reelScript="0-3с: «Уходовые баночки занимают всю полку и путаются?» 3-13с: раскладка по отсекам. 13-18с: «Органайзер для косметики — детали в карточке»."
          frames={orgFrames}
        />
        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm text-neutral-300">
          <strong className="text-white">SEO-ТЕКСТ:</strong> Органайзер для косметики и уходовых средств с удобными отсеками для флаконов, баночек и аксессуаров: аккуратное хранение и порядок дома или в подарок.
        </div>
        <a href="#order" className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-emerald-400">Заказать такой же комплект →</a>
      </article>

      <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">05 • ДОМ И ХРАНЕНИЕ • Фото и Видео Было/Стало + SEO</div>
        <h2 className="text-2xl font-bold text-white">Вакуумные пакеты с ручным насосом для хранения вещей</h2>
        <BeforeAfterMediaBlock
          title="Вакуумные пакеты с ручным насосом для хранения вещей"
          beforeImage={makeCardImg("ФОТО БЫЛО", "#fb7185", "Серое фото пакета без показа экономии места", "Неясно про сжатие объёма в шкафу и ручной насос в комплекте")}
          afterImage={makeCardImg("ФОТО СТАЛО", "#34d399", "Компактное хранение вещей — насос в комплекте", "Экономия места в шкафу и чемодане • Защита от пыли")}
          beforeCaption="Серое фото пакета без показа экономии места и объёма — покупатель не считывает выгоду и наличие насоса."
          afterCaption="Наглядное сжатие объёма вещей, крупно показаны насос в комплекте и защита от пыли, готовый Reels/Shorts и SEO."
          reelScript="0-3с: «Объёмные вещи не помещаются в шкаф или чемодан?» 3-13с: откачка воздуха насосом. 13-18с: «Вакуумные пакеты с насосом — наборы в карточке»."
          frames={vacFrames}
        />
        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm text-neutral-300">
          <strong className="text-white">SEO-ТЕКСТ:</strong> Вакуумные пакеты с ручным насосом для компактного хранения одежды, пледов и вещей в шкафу или чемодане: экономия места и защита от пыли и влаги.
        </div>
        <a href="#order" className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-emerald-400">Заказать такой же комплект →</a>
      </article>
    </section>
  );
}
