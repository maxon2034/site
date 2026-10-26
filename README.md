# Сайт психолога Ольги Повшко

Vite + React + TypeScript + React Router. Деплой: Vercel.

## Запуск
    npm install
    cp .env.example .env   # вписать ссылку на оплату и endpoint формы
    npm run dev

## Что где править
- `src/config.ts`: имя, контакты, список услуг, ссылки на оферту/политику
- `src/components/About.tsx`: текст «Обо мне»
- `src/data/articles.ts`, `src/data/diplomas.ts`: статьи и дипломы (сканы класть в `public/diplomas/`)
- `src/styles.css`: палитра и шрифты в `:root`

## Деплой на Vercel
Импортировать репозиторий, добавить `VITE_PAYMENT_URL` и `VITE_FORM_ENDPOINT` в Settings → Environment Variables.
`vercel.json` уже настроен под SPA.
