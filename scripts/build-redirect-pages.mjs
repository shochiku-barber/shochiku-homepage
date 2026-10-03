import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

// 旧ドメイン shochiku-barber.com は Canva に残り、GitHub Pages から配られている（サーバー側の301は張れない）。
// そこで docs/ を「新ドメインへ同じページで移るだけのページ」にする。写真などは配らないので軽い。
const oldHost = "https://shochiku-barber.com";
const newHost = "https://barber-shochiku.com";
const outDir = path.resolve("docs");

const pages = [
  { path: "/", file: "index.html" },
  { path: "/styles", file: "styles/index.html" },
  { path: "/faq", file: "faq/index.html" },
  { path: "/price", file: "price/index.html" },
];

function redirectHtml(pagePath) {
  const target = newHost + (pagePath === "/" ? "/" : pagePath);
  const fixedRefresh = pagePath
    ? `<meta http-equiv="refresh" content="0; url=${target}">`
    : "";
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ヘアーサロンリザーブ松竹｜新しいサイトへ移動します</title>
${pagePath ? `<link rel="canonical" href="${target}">` : ""}
${fixedRefresh}
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f5f2e8; color: #0b0c0d; font: 16px/1.9 "Hiragino Mincho ProN", "Yu Mincho", serif; text-align: center; }
  p { margin: 0 24px; }
  a { color: inherit; }
</style>
<script>
  (function () {
    var p = location.pathname.replace(/index\\.html$/, "").replace(/\\/+$/, "");
    location.replace("${newHost}" + (p || "/") + location.search + location.hash);
  })();
</script>
</head>
<body>
<p>ヘアーサロンリザーブ松竹は、新しいサイトへ移りました。<br>自動で移動しない場合は、<a href="${newHost}${pagePath === "/" || !pagePath ? "/" : pagePath}">こちら</a>をお選びください。</p>
</body>
</html>
`;
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const page of pages) {
  const file = path.join(outDir, page.file);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, redirectHtml(page.path));
}

// 知らないパスに来た人も、同じパスのまま新ドメインへ移す
await writeFile(path.join(outDir, "404.html"), redirectHtml(""));

await writeFile(path.join(outDir, "CNAME"), "shochiku-barber.com\n");
await writeFile(
  path.join(outDir, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${oldHost}/sitemap.xml\n`,
);
await writeFile(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>\n    <loc>${oldHost}${p.path}</loc>\n  </url>`).join("\n")}
</urlset>
`,
);

console.log(`旧ドメイン用の転送ページ ${pages.length + 1} 枚を docs/ に作りました`);
