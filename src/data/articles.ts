export interface Article {
  id: string;
  title: string;
  date: string; // ГГГГ-ММ-ДД
  excerpt: string;
  url?: string; // внешняя ссылка или путь
}

// Заполним, когда пришлёте статьи
export const ARTICLES: Article[] = [];
