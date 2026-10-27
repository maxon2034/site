import raw from "./articles.json";

export interface Article {
  url: string; // ссылка на статью
  title: string; // название статьи
  image: string; // путь к картинке, например /articles/1.jpg
}

export const ARTICLES: Article[] = raw;
