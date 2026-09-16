/**
 * 予約の申し込みを受ける口。
 *
 * まだ表には出していない（/reserve へのリンクをどこにも置いていない）。
 * 導線を出す時が来たら、そのまま使える形にしてある。
 *
 * 受けたものは必ず D1 に残してから、店へメールで知らせる。
 * メールが出せなくても申し込みは失われない（知らせの失敗で受付を止めない）。
 * ノエルのお問い合わせと同じ考え方。
 */
import { env } from "cloudflare:workers";

/* 店の受け取り先。shochiku-barber.com を Cloudflare に載せ、
   この宛先を「検証済み」にしてから効く。それまでは D1 にだけ残る。 */
const SHOP_EMAIL = "";                       /* ← 弟さんの受け取り先を入れる */
const FROM_EMAIL = "reserve@shochiku-barber.com";
const SHOP_NAME = "ヘアーサロンリザーブ松竹";
const SITE = "https://shochiku-barber.com";
const PER_HOUR = 5;

type Env = {
  DB?: D1Database;
  EMAIL?: {
    send(m: {
      to: string; from: { email: string; name?: string }; replyTo?: string;
      subject: string; text: string; html: string;
    }): Promise<unknown>;
  };
  RATE?: KVNamespace;
};

const bind = () => env as unknown as Env;

const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const esc = (v: string) =>
  v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

export async function POST(request: Request) {
  const e = bind();
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { error: "送信の中身を読み取れませんでした" });
  }

  /* 人には見えない罠の欄。埋まっていたら機械なので、成功を装って捨てる */
  if (String(form.get("website") || "").trim()) return reply(200, { ok: true });

  /* 開いてすぐの送信は機械 */
  const opened = Number(form.get("t") || 0);
  if (opened && Date.now() - opened < 3000) return reply(400, { error: "もう一度お試しください" });

  const f = (k: string, max: number) => String(form.get(k) || "").trim().slice(0, max);
  const name = f("name", 60);
  const kana = f("kana", 60);
  const tel = f("tel", 24);
  const email = f("email", 160);
  const menu = f("menu", 40);
  const wish1 = f("wish1", 80);
  const wish2 = f("wish2", 80);
  const note = f("note", 2000);

  if (!name || !tel || !wish1) {
    return reply(400, { error: "お名前・お電話・ご希望の日時をご記入ください" });
  }
  if (!/^[0-9+\-() ]{9,20}$/.test(tel)) {
    return reply(400, { error: "お電話番号をご確認ください" });
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return reply(400, { error: "メールアドレスをご確認ください" });
  }

  const now = new Date().toISOString();
  const ip = request.headers.get("cf-connecting-ip") || "unknown";

  /* まず残す。ここが受付の本体 */
  if (e.DB) {
    await e.DB.prepare(
      `INSERT INTO reservations (name, kana, tel, email, menu, wish1, wish2, note, state, mailed, ua, ip, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, '未確認', 0, ?, ?, ?)`
    ).bind(
      name, kana, tel, email, menu, wish1, wish2, note,
      String(request.headers.get("user-agent") || "").slice(0, 200), ip, now
    ).run();
  }

  /* 店へ知らせる */
  if (e.EMAIL && SHOP_EMAIL) {
    const rows: [string, string][] = [
      ["お名前", name + (kana ? `（${kana}）` : "")],
      ["お電話", tel],
      ...(email ? ([["メール", email]] as [string, string][]) : []),
      ...(menu ? ([["ご希望のメニュー", menu]] as [string, string][]) : []),
      ["第一希望", wish1],
      ...(wish2 ? ([["第二希望", wish2]] as [string, string][]) : []),
    ];
    const text = [
      `ご予約の申し込みが届きました（${SHOP_NAME}）`, "",
      ...rows.map(([k, v]) => `${k}：${v}`),
      ...(note ? ["", "── ご要望 ──", note] : []),
      "", "―――――――――――――",
      "お客様へは、お電話でご連絡ください。",
      SHOP_NAME, SITE,
    ].join("\n");
    const html =
      `<p><strong>ご予約の申し込みが届きました</strong></p>` +
      `<table cellpadding="6" style="border-collapse:collapse">` +
      rows.map(([k, v]) => `<tr><td style="color:#666">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`).join("") +
      `</table>` +
      (note ? `<p style="white-space:pre-wrap;border-left:3px solid #999;padding-left:12px">${esc(note)}</p>` : "") +
      `<hr><p style="color:#666;font-size:13px">お客様へは、お電話でご連絡ください。<br>${SHOP_NAME}　${SITE}</p>`;

    try {
      await e.EMAIL.send({
        to: SHOP_EMAIL,
        from: { email: FROM_EMAIL, name: `${SHOP_NAME} 予約` },
        ...(email ? { replyTo: email } : {}),
        subject: `【ご予約】${name} 様／${wish1}`,
        text, html,
      });
      if (e.DB) {
        await e.DB.prepare(
          "UPDATE reservations SET mailed = 1 WHERE id = (SELECT MAX(id) FROM reservations)"
        ).run();
      }
    } catch {
      /* 知らせは落ちても、申し込みは D1 に残っている */
    }
  }

  return reply(200, { ok: true });
}
