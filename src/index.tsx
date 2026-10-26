/** 松竹 公式サイト。Cloudflare Worker（Hono）1本。画面・管理室・予約・写真の配信を受け持つ。 */
import { Hono } from "hono";
import { Page } from "./components";
import { Home, Price, Styles, Faq } from "./pages";
import { readContent } from "./content";
import { kanriApi } from "./kanri-api";
import { reserveApi } from "./reserve-api";
import type { Env } from "./env";

const SITE = "https://barber-shochiku.com";
const app = new Hono<{ Bindings: Env }>();

/* www は www なしへ 301 */
app.use("*", async (c, next) => {
  const url = new URL(c.req.url);
  if (url.hostname === "www.barber-shochiku.com") {
    url.hostname = "barber-shochiku.com";
    return c.redirect(url.toString(), 301);
  }
  await next();
});

/* 管理室で直した中身を毎回読む（作り置きしない） */
const noStore = { "cache-control": "no-store" };
app.get("/", async (c) => c.html(<Home c={await readContent(c.env.CONTENT)} />));
app.get("/price", async (c) => c.html(<Price c={await readContent(c.env.CONTENT)} />));
app.get("/styles", async (c) => c.html(<Styles c={await readContent(c.env.CONTENT)} />));
app.get("/faq", async (c) => c.html(<Faq c={await readContent(c.env.CONTENT)} />));

app.get("/robots.txt", (c) =>
  c.text(`User-Agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\nHost: ${SITE}\n`),
);

app.get("/sitemap.xml", (c) => {
  const now = new Date().toISOString();
  const urls: [string, string, string][] = [["/", "1", "monthly"], ["/faq", "0.7", "monthly"], ["/styles", "0.8", "monthly"], ["/price", "0.8", "monthly"]];
  const body = urls
    .map(([p, pri, freq]) => `<url>\n<loc>${SITE}${p}</loc>\n<lastmod>${now}</lastmod>\n<changefreq>${freq}</changefreq>\n<priority>${pri}</priority>\n</url>`)
    .join("\n");
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, 200, { "content-type": "application/xml" });
});

/* 管理室から上げた写真を配る。/img/<id> */
app.get("/img/:id", async (c) => {
  const id = c.req.param("id");
  if (!/^[a-f0-9-]{10,64}$/.test(id) || !c.env.CONTENT) return c.text("Not found", 404);
  const object = await c.env.CONTENT.getWithMetadata<{ type?: string }>(`img:${id}`, { type: "arrayBuffer" });
  if (!object?.value) return c.text("Not found", 404);
  return new Response(object.value, {
    headers: { "content-type": object.metadata?.type || "image/jpeg", "cache-control": "public, max-age=31536000, immutable" },
  });
});

/* 同梱の写真を、画面の大きさに合わせて縮めて配る */
const WIDTHS = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
app.get("/_img", async (c) => {
  const url = new URL(c.req.url);
  const src = url.searchParams.get("url") || "";
  const w = Number(url.searchParams.get("w") || 0);
  const q = Math.min(100, Math.max(1, Number(url.searchParams.get("q") || 75)));
  if (!src.startsWith("/images/") || src.includes("..") || !WIDTHS.includes(w)) return c.text("Bad request", 400);
  const asset = await c.env.ASSETS.fetch(new Request(new URL(src, c.req.url)));
  if (!asset.ok || !asset.body) return c.text("Not found", 404);
  if (!c.env.IMAGES) return asset;
  const accept = c.req.header("accept") || "";
  const format = accept.includes("image/avif") ? "image/avif" : accept.includes("image/webp") ? "image/webp" : "image/jpeg";
  try {
    const out = await c.env.IMAGES.input(asset.body).transform({ width: w }).output({ format: format as "image/webp", quality: q });
    const res = out.response();
    return new Response(res.body, { headers: { "content-type": format, "cache-control": "public, max-age=31536000, immutable", vary: "Accept" } });
  } catch {
    return c.text("Image error", 500);
  }
});

/* 予約フォーム（まだ表に出していない。検索にも載せない） */
const MENUS = ["カット", "フェード", "スキンフェード", "濡れパン", "パンチパーマ", "アイロンパーマ", "シェービング", "その他・相談したい"];
app.get("/reserve", (c) =>
  c.html(
    <Page meta={{ title: "ご予約の申し込み｜ヘアーサロンリザーブ松竹", robots: "noindex, nofollow", canonical: "/" }}>
      <main class="reserve-page" id="app">
        <section class="reserve-box" id="form-box">
          <p class="kicker">RESERVATION</p>
          <h1>ご予約の申し込み</h1>
          <p class="reserve-lead">ご希望の日時をお送りください。<strong>この時点では予約は確定しません。</strong>店主が空きを確かめて、お電話でご連絡いたします。</p>
          <form class="reserve-form" id="rf" novalidate>
            <label><span>お名前</span><input name="name" required autocomplete="name" /></label>
            <label><span>ふりがな</span><input name="kana" autocomplete="off" /></label>
            <label><span>お電話</span><input name="tel" type="tel" required autocomplete="tel" placeholder="090-0000-0000" /></label>
            <label><span>メール（任意）</span><input name="email" type="email" autocomplete="email" /></label>
            <label><span>ご希望のメニュー</span><select name="menu">{MENUS.map((m) => <option selected={m === "カット"}>{m}</option>)}</select></label>
            <label><span>第一希望の日時</span><input name="wish1" required placeholder="例：10月3日（金）午後2時ごろ" /></label>
            <label><span>第二希望の日時（任意）</span><input name="wish2" placeholder="例：10月4日（土）午前中" /></label>
            <label><span>ご要望（任意）</span><textarea name="note" rows={4} placeholder="はじめて／指名／気になっていること など" /></label>
            <p class="reserve-hp" aria-hidden="true"><label>ご記入不要<input name="website" tabindex={-1} autocomplete="off" /></label></p>
            <button class="button solid" type="submit" id="rb"><span>この内容で申し込む</span></button>
            <p class="reserve-error" id="re" hidden></p>
          </form>
          <p class="reserve-note">月曜・第2・第3火曜は定休日です。営業時間は9:00〜19:00。<br />お急ぎの方は、お電話（<a href="tel:0428244009">0428-24-4009</a>）が確実です。</p>
        </section>
        <section class="reserve-box" id="done-box" hidden>
          <p class="kicker">THANK YOU</p>
          <h1>申し込みを承りました。</h1>
          <p>店主より、お電話にてご連絡いたします。<br />お急ぎの場合は <a href="tel:0428244009">0428-24-4009</a> までお願いいたします。</p>
          <p><a class="button ghost" href="/"><span>トップへ戻る</span></a></p>
        </section>
        <script src="/reserve.js" defer></script>
      </main>
    </Page>,
  ),
);

/* 管理室。画面の骨組みだけ返し、中身は /kanri.js が作る */
app.get("/kanri", (c) =>
  c.html(
    <Page meta={{ title: "松竹 管理室", robots: "noindex, nofollow", canonical: "/" }}>
      <div id="app"></div>
      <script src="/kanri.js" defer></script>
    </Page>,
    200,
    noStore,
  ),
);

app.post("/api/kanri", (c) => kanriApi(c.req.raw, c.env));
app.post("/api/reserve", (c) => reserveApi(c.req.raw, c.env));

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
