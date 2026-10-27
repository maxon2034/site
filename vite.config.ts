import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Если в переменную вставили тег целиком или с кавычками, достаём из него только код
function cleanCode(raw: string): string {
  const v = raw.trim();
  const m = /content\s*=\s*["']([^"']+)["']/i.exec(v);
  return (m ? m[1] : v).replace(/["'<>\s]/g, "");
}

// SEO: подставляет адрес сайта в index.html, добавляет коды подтверждения для Google/Яндекса
// и создаёт robots.txt и sitemap.xml при сборке.
function seo(siteUrl: string, google: string, yandex: string): Plugin {
  const pages = ["/", "/articles", "/diplomas"];
  return {
    name: "seo",
    transformIndexHtml(html) {
      const verify = [
        google && `<meta name="google-site-verification" content="${google}" />`,
        yandex && `<meta name="yandex-verification" content="${yandex}" />`,
      ]
        .filter(Boolean)
        .join("\n    ");
      return html.replace(/__SITE_URL__/g, siteUrl).replace("<!--VERIFICATION-->", verify);
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      const urls = pages.map((p) => `  <url><loc>${siteUrl}${p === "/" ? "/" : p}</loc></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const siteUrl = (env.VITE_SITE_URL || "https://olga-povshko.vercel.app").replace(/\/+$/, "");
  return {
    plugins: [react(), seo(siteUrl, cleanCode(env.VITE_GOOGLE_VERIFICATION ?? ""), cleanCode(env.VITE_YANDEX_VERIFICATION ?? ""))],
  };
});
