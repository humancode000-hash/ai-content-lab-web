import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — AI CONTENT LAB",
  description: "Какие данные мы получаем из формы заявки и как их используем.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 space-y-5 leading-relaxed">
      <p>
        <a href="/" className="underline">← На главную</a>
      </p>
      <h1 className="text-3xl font-semibold">Политика конфиденциальности</h1>
      <p>Студия AI CONTENT LAB, Алматы, Казахстан. Дата обновления: 27.11.2026.</p>

      <h2 className="text-xl font-semibold pt-2">Какие данные мы получаем</h2>
      <p>
        Из формы заявки: имя, контакт для связи (телефон, WhatsApp или Telegram), выбранная услуга или пакет,
        описание задачи или ссылка на товар, язык сайта.
      </p>

      <h2 className="text-xl font-semibold pt-2">Зачем</h2>
      <p>Только чтобы ответить на заявку и обсудить заказ.</p>

      <h2 className="text-xl font-semibold pt-2">Как данные передаются и хранятся</h2>
      <p>
        После отправки формы открывается WhatsApp с готовым сообщением, которое вы отправляете сами. Сервер сайта
        проверяет формат заявки, но не сохраняет имя и контакт в базе данных и не записывает их в журналы. Переписку в
        WhatsApp мы храним, пока работаем над заказом.
      </p>

      <h2 className="text-xl font-semibold pt-2">Третьи лица</h2>
      <p>
        Мы не продаём и не передаём ваши данные. Сайт размещён на хостинге Vercel, а переписка ведётся в WhatsApp, и
        они обрабатывают технические данные по своим правилам. Сайт не использует рекламные и аналитические трекеры.
      </p>

      <h2 className="text-xl font-semibold pt-2">Удаление данных</h2>
      <p>Чтобы удалить вашу переписку и данные заявки, напишите нам в WhatsApp.</p>
    </main>
  );
}