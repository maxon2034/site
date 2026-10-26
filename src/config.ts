export const SITE = {
  name: "Ольга Повшко",
  title: "Психолог",
  method: "Гештальт-терапия",
  paymentUrl: import.meta.env.VITE_PAYMENT_URL ?? "#",
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT ?? "",

  // Контакты: пустые значения в футере не показываются
  contacts: {
    phone: "+375 29 690 71 37",
    email: "lisadelovaya69@gmail.com",
    workHours: "", // например: "пн-пт с 10.00 до 20.00"
    city: "Минск, Беларусь",
    // ссылки целиком, например "https://t.me/username"
    socials: { telegram: "", instagram: "", vk: "" },
  },

  // Данные для футера (заполнить, когда пришлёте реквизиты)
  legal: {
    name: "ИП Фамилия Имя Отчество", // заменить на данные Ольги
    registration: "Свидетельство о государственной регистрации выдано (дата), (орган)",
    unp: "(номер)",
    address: "(юридический адрес)",
  },

  // Логотипы платёжных систем: положить файлы в public/payments/ и указать пути
  paymentLogos: [] as { src: string; alt: string }[],

  privacyUrl: "#",
  offerUrl: "#",
  paymentMethodsUrl: "",
};

export const SERVICES = [
  "Личный приём в Минске",
  "Онлайн-консультация",
  "Работа в паре с ко-терапевтом",
  "Супервизия",
] as const;

export type Service = (typeof SERVICES)[number];

export const NAV = [
  { to: "/", label: "Главная" },
  { to: "/#about", label: "Обо мне" },
  { to: "/#booking", label: "Запись" },
] as const;
