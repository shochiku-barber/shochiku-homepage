import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceBase = "https://shochiku-homepage.shochiku-barber.workers.dev";
const outDir = path.resolve("docs");
const clientDir = path.resolve("dist/client");

const pages = [
  { url: "/", file: "index.html" },
  { url: "/styles", file: "styles/index.html" },
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

for (const entry of ["assets", "images"]) {
  await cp(path.join(clientDir, entry), path.join(outDir, entry), {
    recursive: true,
  });
}

for (const entry of ["favicon.svg", "file.svg", "globe.svg", "og.png", "window.svg"]) {
  await cp(path.join(clientDir, entry), path.join(outDir, entry));
}

for (const page of pages) {
  const html = staticizeHtml(await fetchText(`${sourceBase}${page.url}`));
  const filePath = path.join(outDir, page.file);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

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
</urlset>
`,
);

const index = await readFile(path.join(outDir, "index.html"), "utf8");
if (!index.includes("青梅市の床屋・理容室 松竹")) {
  throw new Error("Generated index.html does not look like the Shochiku site.");
}
