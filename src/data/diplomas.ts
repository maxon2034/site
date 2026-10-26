export interface Diploma {
  id: string;
  title: string;
  institution: string;
  year: string;
  image: string; // путь в /public/diplomas/...
}

// Заполним, когда пришлёте сканы
export const DIPLOMAS: Diploma[] = [];
