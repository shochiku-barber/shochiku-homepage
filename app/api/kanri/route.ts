/**
 * 管理室の裏側。
 *   POST /api/kanri  { op: "check" }            … 合言葉だけ確かめる
 *   POST /api/kanri  { op: "load" }             … いまの中身を返す
 *   POST /api/kanri  { op: "save", content }    … 中身を保存
 *   POST /api/kanri  （multipart, op=upload）   … 写真を1枚受け取る
 *
 * 合言葉は環境変数 KANRI_KEY。コードには書かない。
 * 間違いが続いたら、しばらく受け付けない（片端から試されないように）。
 */
import { env } from "cloudflare:workers";
import { DEFAULTS, type Content } from "../../content";

type Store = { CONTENT?: KVNamespace; KANRI_KEY?: string };
const store = () => env as unknown as Store;

const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE = 5 * 1024 * 1024;
const LOCK_TRIES = 10;
const LOCK_WINDOW = 600;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

/* 長さの違いで漏れないよう、突き合わせは定数時間で */
function same(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function guard(request: Request) {
  const { CONTENT: kv, KANRI_KEY: key } = store();
  if (!kv) return json({ error: "倉庫が設定されていません" }, 500);
  if (!key) return json({ error: "合言葉が設定されていません" }, 500);

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const tryKey = `try:${ip}`;
  const failures = Number((await kv.get(tryKey)) || 0);
  if (failures >= LOCK_TRIES) {
    return json({ error: "間違いが続いたため、しばらく受け付けません。10分ほど置いてからお試しください。" }, 429);
  }
  const given = request.headers.get("x-kanri-key") || "";
  if (!same(given, key)) {
    await kv.put(tryKey, String(failures + 1), { expirationTtl: LOCK_WINDOW });
    return json({ error: "合言葉が違います" }, 401);
  }
  if (failures) await kv.delete(tryKey);
  return null;
}

const s = (v: unknown, max: number) => String(v ?? "").slice(0, max);

/** 写真を幅1200・JPEGに縮める。できなければ元のまま返す。 */
async function shrinkImage(bytes: ArrayBuffer, type: string): Promise<{ bytes: ArrayBuffer; type: string }> {
  const images = (env as unknown as { IMAGES?: ImagesBinding }).IMAGES;
  if (!images) return { bytes, type };
  try {
    const result = await images
      .input(new Response(bytes).body!)
      .transform({ width: 1200, fit: "scale-down" })
      .output({ format: "image/jpeg", quality: 72 });
    const out = await result.response().arrayBuffer();
    // 縮めたほうが大きくなったなら、元を使う
    return out.byteLength < bytes.byteLength
      ? { bytes: out, type: "image/jpeg" }
      : { bytes, type };
  } catch {
    return { bytes, type };
  }
}

export async function POST(request: Request) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  const kv = store().CONTENT!;

  const type = request.headers.get("content-type") || "";

  /* ---- 写真の受け取り ---- */
  if (type.includes("multipart/form-data")) {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return json({ error: "写真が入っていません" }, 400);
    if (!ALLOWED_IMAGE.includes(file.type)) return json({ error: "JPEG / PNG / WebP のみ受け付けます" }, 400);
    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_IMAGE) return json({ error: "写真が大きすぎます（5MBまで）" }, 400);

    // 携帯で撮った写真はそのままだと 3〜5MB あり、載せるとページが開かなくなる。
    // 受け取った時点で幅1200まで縮め、JPEGにしておく（元より大きくはしない）。
    // 変換の口（IMAGES）が使えないときは、受け取ったものをそのまま入れる。
    const shrunk = await shrinkImage(bytes, file.type);
    const id = crypto.randomUUID();
    await kv.put(`img:${id}`, shrunk.bytes, { metadata: { type: shrunk.type } });
    return json({ ok: true, url: `/img/${id}` });
  }

  /* ---- 文章・料金・写真の並び ---- */
  let body: { op?: string; content?: Content };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return json({ error: "中身を読み取れませんでした" }, 400);
  }

  if (body.op === "check") return json({ ok: true });

  if (body.op === "load") {
    const raw = await kv.get("content");
    const saved = raw ? (JSON.parse(raw) as Partial<Content>) : {};
    return json({
      ok: true,
      content: {
        texts: { ...DEFAULTS.texts, ...(saved.texts ?? {}) },
        menu: saved.menu?.length ? saved.menu : DEFAULTS.menu,
        styles: saved.styles?.length ? saved.styles : DEFAULTS.styles,
      },
      defaults: DEFAULTS,
    });
  }

  if (body.op === "save") {
    const c = body.content;
    if (!c || typeof c !== "object") return json({ error: "中身の形が正しくありません" }, 400);

    const texts: Record<string, string> = {};
    for (const key of Object.keys(DEFAULTS.texts)) texts[key] = s(c.texts?.[key], 2000);

    const menu = (Array.isArray(c.menu) ? c.menu : []).slice(0, 12).map((g) => ({
      label: s(g.label, 20),
      title: s(g.title, 40),
      note: s(g.note, 120),
      items: (Array.isArray(g.items) ? g.items : []).slice(0, 30)
        .map((it) => [s(it?.[0], 60), s(it?.[1], 40)] as [string, string])
        .filter(([name]) => name),
    })).filter((g) => g.title);

    const shots = (Array.isArray(c.styles) ? c.styles : []).slice(0, 80)
      .map((x) => ({ src: s(x.src, 300), alt: s(x.alt, 200) }))
      .filter((x) => /^\/(images|img)\//.test(x.src));

    await kv.put("content", JSON.stringify({
      texts,
      menu: menu.length ? menu : DEFAULTS.menu,
      styles: shots.length ? shots : DEFAULTS.styles,
      savedAt: new Date().toISOString(),
    }));
    return json({ ok: true, savedAt: new Date().toISOString() });
  }

  return json({ error: "知らない用事です" }, 400);
}
