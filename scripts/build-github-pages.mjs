import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";

// 2026-09-16：置き先をノエル側のアカウントへ移したので、汲む先もこちらに変えた。
// 旧 shochiku-barber.workers.dev は ChatGPT 側に残っていて中身が古い。
const sourceBase = "https://shochiku-homepage.hey2-ok-oan-0101.workers.dev";
const outDir = path.resolve("docs");
const clientDir = path.resolve("dist/client");

const pages = [
  { url: "/", file: "index.html" },
  { url: "/styles", file: "styles/index.html" },
  { url: "/faq", file: "faq/index.html" },
];

function staticizeHtml(html) {
  return html
    .replaceAll(sourceBase, "https://shochiku-barber.com")
    .replace(
      /\/_vinext\/image\?url=([^"&]+)(?:&amp;|&)[^"]*/g,
      (_, encodedUrl) => decodeURIComponent(encodedUrl),
    )
    .replace(
      /<script>\(function\(\)\{function c\(\).*?<\/script>/s,
      "",
    );
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

await mkdir(outDir, { recursive: true });

await cp(path.join(clientDir, "assets"), path.join(outDir, "assets"), {
  recursive: true,
});

// 画像は「使っているものだけ」を「見合う大きさ」に縮めて置く。
//
// Cloudflare 側は /_vinext/image が画面幅に合わせて縮めてくれるが、静的版には
// その口が無く、元の大きさのまま配ることになる。実際それで /styles だけで
// 11MB を配っていて、携帯では開かず、GitHub Pages の制限にも当たった（2026-09-16）。
const usedImages = new Set();

// 幅の目安。画面での見え方に合わせる。
//   紋章は 56〜112px で出るので 256 あれば足りる。
//   写真は携帯で画面いっぱい（実質 800 前後）なので 800。
//   ヒーローは全面に敷くので 1400。ただし **元より大きくはしない**。
const imageWidths = { emblem: 256, photo: 800, hero: 1400 };

function widthFor(name) {
  if (name.includes("emblem") || name.includes("mark")) return imageWidths.emblem;
  if (name.startsWith("hero-")) return imageWidths.hero;
  return imageWidths.photo;
}

// ヒーローは写真なのに PNG で、縮めても重いまま。JPEG にすると桁が変わる。
function publishedName(name) {
  return name.startsWith("hero-") && name.endsWith(".png")
    ? name.replace(/\.png$/, ".jpg")
    : name;
}

function sips(args) {
  return new Promise((resolve, reject) => {
    execFile("sips", args, (error) => (error ? reject(error) : resolve()));
  });
}

async function pixelWidth(file) {
  const { stdout } = await new Promise((resolve, reject) => {
    execFile("sips", ["-g", "pixelWidth", file], (error, stdout) =>
      error ? reject(error) : resolve({ stdout }),
    );
  });
  return Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
}

async function shrink(srcFile, destFile) {
  const target = widthFor(path.basename(srcFile));
  const source = await pixelWidth(srcFile);
  const args = [];
  // 元より大きくしない。引き伸ばすと重くなるだけで、綺麗にはならない。
  if (source > target) args.push("--resampleWidth", String(target));
  if (/\.jpe?g$/i.test(destFile)) {
    args.push("-s", "format", "jpeg", "-s", "formatOptions", "62");
  }
  await sips([...args, srcFile, "--out", destFile]);
}

for (const entry of ["favicon.svg", "file.svg", "globe.svg", "og.png", "window.svg"]) {
  await cp(path.join(clientDir, entry), path.join(outDir, entry));
}

for (const page of pages) {
  let html = staticizeHtml(await fetchText(`${sourceBase}${page.url}`));
  for (const [, name] of html.matchAll(/\/images\/([A-Za-z0-9._-]+)/g)) {
    usedImages.add(name);
  }
  for (const name of usedImages) {
    const published = publishedName(name);
    if (published !== name) {
      html = html.replaceAll(`/images/${name}`, `/images/${published}`);
    }
  }
  const filePath = path.join(outDir, page.file);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

// 使っている画像だけを縮めて置き直す（古いものは残さない）
await rm(path.join(outDir, "images"), { recursive: true, force: true });
await mkdir(path.join(outDir, "images"), { recursive: true });
let before = 0;
let after = 0;
for (const name of [...usedImages].sort()) {
  const src = path.join(clientDir, "images", name);
  const dest = path.join(outDir, "images", publishedName(name));
  before += (await stat(src)).size;
  await shrink(src, dest);
  after += (await stat(dest)).size;
}
console.log(
  `画像 ${usedImages.size} 枚：${(before / 1048576).toFixed(1)}MB → ${(after / 1048576).toFixed(1)}MB`,
);

await writeFile(path.join(outDir, "CNAME"), "shochiku-barber.com\n");
await writeFile(
  path.join(outDir, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: https://shochiku-barber.com/sitemap.xml\nHost: https://shochiku-barber.com\n",
);
await writeFile(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://shochiku-barber.com/</loc>
  </url>
  <url>
    <loc>https://shochiku-barber.com/styles</loc>
  </url>
  <url>
    <loc>https://shochiku-barber.com/faq</loc>
  </url>
</urlset>
`,
);

const index = await readFile(path.join(outDir, "index.html"), "utf8");
if (!index.includes("青梅市の床屋・理容室 松竹")) {
  throw new Error("Generated index.html does not look like the Shochiku site.");
}
