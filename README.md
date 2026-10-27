# Сайт психолога Ольги Повшко

Vite + React + TypeScript + React Router. Деплой: Vercel.

## Запуск
    npm install
    cp .env.example .env   # вписать ссылку на оплату и endpoint формы
    npm run dev

## Что где править
- `src/config.ts`: имя, контакты, список услуг
- `src/components/About.tsx`: текст «Обо мне»
- `src/data/articles.ts`, `src/data/diplomas.ts`: статьи и дипломы (сканы класть в `public/diplomas/`)
- `src/styles.css`: палитра и шрифты в `:root`

## Деплой на Vercel
Импортировать репозиторий, добавить `VITE_PAYMENT_URL` и `VITE_FORM_ENDPOINT` в Settings → Environment Variables.
`vercel.json` уже настроен под SPA.

## Статьи
Ссылки лежат в `src/data/articles.json`. Название и картинки подтягиваются командой `npm run articles`
(картинки сохраняются в `public/articles/`). Если скрипт не сработал, впишите `title` и `image` вручную.

## Образование
Список лежит в `src/data/diplomas.json` (поле `photo` — ссылка на полное фото, открывается по клику на миниатюру).
Чтобы сайт не зависел от b17.ru, выполните `npm run diplomas`: фото скачаются в `public/diplomas/`.
