// Подтягивает название и картинку статей из src/data/articles.json.
// Запуск: npm run articles   (нужен Node 18+ и доступ в интернет)
import fs from "node:fs/promises";

const FILE = new URL("../src/data/articles.json", import.meta.url);
const IMG_DIR = new URL("../public/articles/", import.meta.url);
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim();

async function getHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ru,en;q=0.8" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  let charset = /charset=([\w-]+)/i.exec(res.headers.get("content-type") || "")?.[1];
  if (!charset) charset = /charset=["']?([\w-]+)/i.exec(buf.subarray(0, 4096).toString("latin1"))?.[1];
  try {
    return new TextDecoder(charset || "utf-8").decode(buf);
  } catch {
    return buf.toString("utf8");
  }
}

function meta(html, prop) {
  const a = new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']*)["']`, "i").exec(html);
  const b = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${prop}["']`, "i").exec(html);
  return decode((a || b)?.[1] || "");
}

function pickTitle(html) {
  let t = meta(html, "og:title");
  if (!t) t = decode(/<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1] || "");
  return t.replace(/\s*[-–—|]\s*(Сайт психологов\s*)?b17\.ru.*$/i, "").trim();
}

const items = JSON.parse(await fs.readFile(FILE, "utf8"));
await fs.mkdir(IMG_DIR, { recursive: true });

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  if (item.title && item.image) continue;
  try {
    const html = await getHtml(item.url);
    if (!item.title) item.title = pickTitle(html);
    const img = meta(html, "og:image");
    if (img && !item.image) {
      const imgUrl = new URL(img, item.url).href;
      const r = await fetch(imgUrl, { headers: { "User-Agent": UA, Referer: item.url } });
      if (!r.ok) throw new Error(`картинка: HTTP ${r.status}`);
      const type = r.headers.get("content-type") || "";
      const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
      await fs.writeFile(new URL(`${i + 1}.${ext}`, IMG_DIR), Buffer.from(await r.arrayBuffer()));
      item.image = `/articles/${i + 1}.${ext}`;
    }
    console.log(`OK   ${item.url}\n     ${item.title || "(нет названия)"} | ${item.image || "(нет картинки)"}`);
  } catch (e) {
    console.warn(`FAIL ${item.url}: ${e.message}`);
  }
}

await fs.writeFile(FILE, JSON.stringify(items, null, 2) + "\n");
console.log("\nГотово. Проверьте src/data/articles.json и папку public/articles/");
