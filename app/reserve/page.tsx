"use client";

/**
 * 予約フォーム（まだ表に出していない）。
 * どこからもリンクしておらず、検索にも載せない（noindex）。
 * 出す時は、店舗案内の「電話で予約する」の隣にこのページへの導線を足すだけ。
 */
import { useRef, useState } from "react";

const MENUS = ["カット", "フェード", "スキンフェード", "濡れパン", "パンチパーマ", "アイロンパーマ", "シェービング", "その他・相談したい"];

export default function Reserve() {
  const opened = useRef(Date.now());
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError("");
    const form = ev.currentTarget;
    const body = new FormData(form);
    body.append("t", String(opened.current));
    setSending(true);
    try {
      const res = await fetch("/api/reserve", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "送信できませんでした");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError((err as Error).message + "　恐れ入りますが、お電話（0428-24-4009）でご連絡ください。");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <main className="reserve-page">
        <section className="reserve-box">
          <p className="kicker">THANK YOU</p>
          <h1>申し込みを承りました。</h1>
          <p>店主より、お電話にてご連絡いたします。<br />お急ぎの場合は <a href="tel:0428244009">0428-24-4009</a> までお願いいたします。</p>
          <p><a className="button ghost" href="/"><span>トップへ戻る</span></a></p>
        </section>
      </main>
    );
  }

  return (
    <main className="reserve-page">
      <section className="reserve-box">
        <p className="kicker">RESERVATION</p>
        <h1>ご予約の申し込み</h1>
        <p className="reserve-lead">
          ご希望の日時をお送りください。<strong>この時点では予約は確定しません。</strong>
          店主が空きを確かめて、お電話でご連絡いたします。
        </p>

        <form onSubmit={onSubmit} className="reserve-form" noValidate>
          <label><span>お名前</span><input name="name" required autoComplete="name" /></label>
          <label><span>ふりがな</span><input name="kana" autoComplete="off" /></label>
          <label><span>お電話</span><input name="tel" type="tel" required autoComplete="tel" placeholder="090-0000-0000" /></label>
          <label><span>メール（任意）</span><input name="email" type="email" autoComplete="email" /></label>
          <label><span>ご希望のメニュー</span>
            <select name="menu" defaultValue="カット">{MENUS.map((m) => <option key={m}>{m}</option>)}</select>
          </label>
          <label><span>第一希望の日時</span><input name="wish1" required placeholder="例：10月3日（金）午後2時ごろ" /></label>
          <label><span>第二希望の日時（任意）</span><input name="wish2" placeholder="例：10月4日（土）午前中" /></label>
          <label><span>ご要望（任意）</span><textarea name="note" rows={4} placeholder="はじめて／指名／気になっていること など" /></label>
          <p className="reserve-hp" aria-hidden="true"><label>ご記入不要<input name="website" tabIndex={-1} autoComplete="off" /></label></p>
          <button className="button solid" type="submit" disabled={sending}>
            <span>{sending ? "送信中…" : "この内容で申し込む"}</span>
          </button>
          {error ? <p className="reserve-error">{error}</p> : null}
        </form>

        <p className="reserve-note">
          月曜・第2・第3火曜は定休日です。営業時間は9:00〜19:00。<br />
          お急ぎの方は、お電話（<a href="tel:0428244009">0428-24-4009</a>）が確実です。
        </p>
      </section>
    </main>
  );
}
