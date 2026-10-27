// Скачивает фото сертификатов в public/diplomas/ и прописывает их как thumb в src/data/diplomas.json.
// Тогда сайт не зависит от b17.ru. Запуск: npm run diplomas
import fs from "node:fs/promises";

const FILE = new URL("../src/data/diplomas.json", import.meta.url);
const DIR = new URL("../public/diplomas/", import.meta.url);
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const items = JSON.parse(await fs.readFile(FILE, "utf8"));
await fs.mkdir(DIR, { recursive: true });

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  if (it.thumb) continue;
  try {
    const r = await fetch(it.photo, { headers: { "User-Agent": UA, Referer: "https://www.b17.ru/" } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const type = r.headers.get("content-type") || "";
    const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
    await fs.writeFile(new URL(`${i + 1}.${ext}`, DIR), Buffer.from(await r.arrayBuffer()));
    it.thumb = `/diplomas/${i + 1}.${ext}`;
    console.log(`OK   ${it.thumb}`);
  } catch (e) {
    console.warn(`FAIL ${it.photo}: ${e.message}`);
  }
}
await fs.writeFile(FILE, JSON.stringify(items, null, 2) + "\n");
