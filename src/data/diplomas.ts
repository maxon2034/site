import raw from "./diplomas.json";

export interface Diploma {
  title: string;
  details: [label: string, value: string][];
  photo: string; // ссылка на полное фото сертификата (открывается по клику)
  thumb?: string; // маленькое фото в списке; если не задано, берётся photo
}

export const DIPLOMAS = raw as Diploma[];
