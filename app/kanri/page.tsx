"use client";

/**
 * 管理室。弟さんが自分で文章・料金・写真を直すところ。
 * 加藤モータースの管理室と同じ考え方——合言葉で入り、直して、保存すると即サイトに出る。
 */
import { useCallback, useEffect, useRef, useState } from "react";

type MenuGroup = { label: string; title: string; note: string; items: [string, string][] };
type StyleShot = { src: string; alt: string };
type Content = { texts: Record<string, string>; menu: MenuGroup[]; styles: StyleShot[] };

/* 直す欄の並び。ここに足せば管理室に欄が増える */
const SECTIONS: { title: string; note?: string; fields: [string, string, ("line" | "area")?][] }[] = [
  {
    title: "トップの見出し",
    fields: [
      ["hero.eyebrow", "小さな一言"],
      ["hero.title1", "大見出し（1行目）"],
      ["hero.title2", "大見出し（2行目）"],
      ["hero.lead1", "太字の一行"],
      ["hero.lead2", "その下の一行"],
      ["hero.technique", "得意技（英字）"],
    ],
  },
  {
    title: "心意気",
    fields: [
      ["spirit.kicker", "小見出し"],
      ["spirit.title1", "見出し（1行目）"],
      ["spirit.title2", "見出し（2行目）"],
      ["spirit.p1", "本文 1", "area"],
      ["spirit.p2", "本文 2", "area"],
      ["spirit.p3", "本文 3", "area"],
      ["spirit.signRole", "肩書き"],
      ["spirit.signName", "名前"],
    ],
  },
  {
    title: "仕上がり（見出し）",
    fields: [
      ["work.kicker", "小見出し"],
      ["work.note1", "説明（1行目）"],
      ["work.note2", "説明（2行目）"],
    ],
  },
  {
    title: "料金（見出しと注記）",
    fields: [
      ["menu.kicker", "小見出し"],
      ["menu.title1", "見出し（1行目）"],
      ["menu.title2", "見出し（2行目）"],
      ["menu.note", "注記", "area"],
      ["menu.fadeNote", "フェード欄・上の一言"],
      ["menu.fadeName", "フェード欄・名前"],
      ["menu.fadePrice", "フェード欄・料金"],
      ["menu.fadeSmall", "フェード欄・小さな説明"],
    ],
  },
  {
    title: "よくあるご質問（/faq のページ）",
    note: "質問と答えを両方書いたものだけがページに出ます。片方でも空にすれば、その一問は出ません。",
    fields: [
      ["faq.kicker", "小見出し"],
      ["faq.title1", "見出し（1行目）"],
      ["faq.title2", "見出し（2行目）"],
      ["faq.q1", "質問 1", "area"],
      ["faq.a1", "答え 1", "area"],
      ["faq.q2", "質問 2", "area"],
      ["faq.a2", "答え 2", "area"],
      ["faq.q3", "質問 3", "area"],
      ["faq.a3", "答え 3", "area"],
      ["faq.q4", "質問 4", "area"],
      ["faq.a4", "答え 4", "area"],
      ["faq.q5", "質問 5", "area"],
      ["faq.a5", "答え 5", "area"],
      ["faq.q6", "質問 6", "area"],
      ["faq.a6", "答え 6", "area"],
      ["faq.q7", "質問 7", "area"],
      ["faq.a7", "答え 7", "area"],
      ["faq.q8", "質問 8", "area"],
      ["faq.a8", "答え 8", "area"],
      ["faq.q9", "質問 9", "area"],
      ["faq.a9", "答え 9", "area"],
    ],
  },
  {
    title: "店主の紹介",
    fields: [
      ["profile.name", "名前"],
      ["profile.en", "名前（英字）"],
      ["profile.birthday", "生年月日"],
      ["profile.blood", "血液型"],
      ["profile.hobby", "趣味"],
      ["profile.skill", "得意技"],
      ["profile.message", "ひとこと", "area"],
    ],
  },
  {
    title: "店舗案内",
    fields: [
      ["access.kicker", "小見出し"],
      ["access.title1", "見出し（1行目）"],
      ["access.title2", "見出し（2行目）"],
      ["access.zip", "郵便番号"],
      ["access.address", "住所"],
      ["access.open", "営業時間"],
      ["access.closed1", "定休日（1行目）"],
      ["access.closed2", "定休日（2行目）"],
      ["access.reservation", "予約について"],
      ["access.tel", "電話番号（表示用）"],
      ["access.parking", "駐車場"],
      ["access.payment", "お支払い方法"],
    ],
  },
  {
    title: "フッターの説明文",
    note: "どのページの一番下にも出る、お店の説明です。検索にも読まれます。",
    fields: [
      ["footer.about", "説明文", "area"],
    ],
  },
];

export default function Kanri() {
  const [key, setKey] = useState("");
  const [inside, setInside] = useState(false);
  const [content, setContent] = useState<Content | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<number | null>(null);

  const call = useCallback(async (body: unknown, k?: string) => {
    const res = await fetch("/api/kanri", {
      method: "POST",
      headers: { "content-type": "application/json", "x-kanri-key": k ?? key },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; content?: Content };
    if (!res.ok || !data.ok) throw new Error(data.error || "うまくいきませんでした");
    return data;
  }, [key]);

  useEffect(() => {
    const saved = localStorage.getItem("shochiku-kanri-key");
    if (saved) {
      setKey(saved);
      call({ op: "load" }, saved)
        .then((d) => { setContent(d.content!); setInside(true); })
        .catch(() => localStorage.removeItem("shochiku-kanri-key"));
    }
  }, [call]);

  async function enter(ev: React.FormEvent) {
    ev.preventDefault();
    setMsg("");
    try {
      const d = await call({ op: "load" });
      localStorage.setItem("shochiku-kanri-key", key);
      setContent(d.content!);
      setInside(true);
    } catch (e) {
      setMsg((e as Error).message);
    }
  }

  async function save() {
    if (!content) return;
    setBusy(true);
    setMsg("");
    try {
      await call({ op: "save", content });
      setMsg("保存しました。サイトにすぐ出ます。");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function upload(file: File) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/kanri", { method: "POST", headers: { "x-kanri-key": key }, body });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; error?: string };
    if (!res.ok || !data.ok || !data.url) throw new Error(data.error || "写真を上げられませんでした");
    return data.url;
  }

  async function onPick(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(ev.target.files || []);
    ev.target.value = "";
    if (!files.length || !content) return;
    setBusy(true);
    setMsg("写真を上げています…");
    try {
      const shots = [...content.styles];
      for (const file of files) {
        const url = await upload(file);
        if (uploadTarget === null) shots.push({ src: url, alt: "" });
        else shots[uploadTarget] = { ...shots[uploadTarget], src: url };
      }
      setContent({ ...content, styles: shots });
      setMsg("写真を入れました。最後に「保存する」を押してください。");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
      setUploadTarget(null);
    }
  }

  if (!inside) {
    return (
      <main className="kanri-gate">
        <form onSubmit={enter}>
          <h1>松竹 管理室</h1>
          <p>合言葉をどうぞ</p>
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} autoComplete="current-password" />
          <button type="submit">入る</button>
          {msg ? <p className="ng">{msg}</p> : null}
        </form>
      </main>
    );
  }

  if (!content) return <main className="kanri"><p>読み込んでいます…</p></main>;

  const setText = (k: string, v: string) => setContent({ ...content, texts: { ...content.texts, [k]: v } });

  return (
    <main className="kanri">
      <header className="kanri-head">
        <div>
          <h1>松竹 管理室</h1>
          <p>直したら、いちばん下（またはこの右）の「保存する」を押してください。</p>
        </div>
        <div className="kanri-actions">
          <a href="/" target="_blank" rel="noreferrer">サイトを見る ↗</a>
          <button onClick={save} disabled={busy}>{busy ? "保存中…" : "保存する"}</button>
        </div>
      </header>
      {msg ? <p className="kanri-msg">{msg}</p> : null}

      {SECTIONS.map((sec) => (
        <section key={sec.title} className="kanri-box">
          <h2>{sec.title}</h2>
          <div className="kanri-fields">
            {sec.fields.map(([k, label, kind]) => (
              <label key={k} className={kind === "area" ? "wide" : ""}>
                <span>{label}</span>
                {kind === "area"
                  ? <textarea rows={3} value={content.texts[k] ?? ""} onChange={(e) => setText(k, e.target.value)} />
                  : <input value={content.texts[k] ?? ""} onChange={(e) => setText(k, e.target.value)} />}
              </label>
            ))}
          </div>
        </section>
      ))}

      <section className="kanri-box">
        <h2>料金表</h2>
        {content.menu.map((group, gi) => (
          <div key={gi} className="kanri-menu">
            <div className="kanri-fields">
              <label><span>英字ラベル</span><input value={group.label} onChange={(e) => {
                const menu = [...content.menu]; menu[gi] = { ...group, label: e.target.value }; setContent({ ...content, menu });
              }} /></label>
              <label><span>見出し</span><input value={group.title} onChange={(e) => {
                const menu = [...content.menu]; menu[gi] = { ...group, title: e.target.value }; setContent({ ...content, menu });
              }} /></label>
              <label className="wide"><span>注記</span><input value={group.note} onChange={(e) => {
                const menu = [...content.menu]; menu[gi] = { ...group, note: e.target.value }; setContent({ ...content, menu });
              }} /></label>
            </div>
            <table>
              <tbody>
                {group.items.map((item, ii) => (
                  <tr key={ii}>
                    <td><input value={item[0]} onChange={(e) => {
                      const menu = [...content.menu]; const items = [...group.items];
                      items[ii] = [e.target.value, item[1]]; menu[gi] = { ...group, items }; setContent({ ...content, menu });
                    }} /></td>
                    <td><input value={item[1]} onChange={(e) => {
                      const menu = [...content.menu]; const items = [...group.items];
                      items[ii] = [item[0], e.target.value]; menu[gi] = { ...group, items }; setContent({ ...content, menu });
                    }} /></td>
                    <td><button onClick={() => {
                      const menu = [...content.menu];
                      menu[gi] = { ...group, items: group.items.filter((_, i) => i !== ii) };
                      setContent({ ...content, menu });
                    }}>消す</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="ghost" onClick={() => {
              const menu = [...content.menu];
              menu[gi] = { ...group, items: [...group.items, ["", ""]] };
              setContent({ ...content, menu });
            }}>＋ 品目を足す</button>
          </div>
        ))}
      </section>

      <section className="kanri-box">
        <h2>仕上がりの写真</h2>
        <p className="kanri-note">
          上から順に並びます。トップページに出るのは<strong>最初の4枚</strong>、
          「仕上がり」のページには全部出ます。
        </p>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={onPick} />
        <button className="ghost" onClick={() => { setUploadTarget(null); fileRef.current?.click(); }} disabled={busy}>
          ＋ 写真を足す
        </button>
        <div className="kanri-shots">
          {content.styles.map((shot, i) => (
            <figure key={shot.src + i}>
              <img src={shot.src} alt="" loading="lazy" />
              <figcaption>
                <input value={shot.alt} placeholder="写真の説明（検索に効きます）" onChange={(e) => {
                  const styles = [...content.styles]; styles[i] = { ...shot, alt: e.target.value }; setContent({ ...content, styles });
                }} />
                <div>
                  <button onClick={() => { setUploadTarget(i); fileRef.current?.click(); }}>入替</button>
                  <button onClick={() => {
                    if (i === 0) return;
                    const styles = [...content.styles];
                    [styles[i - 1], styles[i]] = [styles[i], styles[i - 1]];
                    setContent({ ...content, styles });
                  }}>↑</button>
                  <button onClick={() => {
                    if (i === content.styles.length - 1) return;
                    const styles = [...content.styles];
                    [styles[i + 1], styles[i]] = [styles[i], styles[i + 1]];
                    setContent({ ...content, styles });
                  }}>↓</button>
                  <button className="danger" onClick={() => {
                    setContent({ ...content, styles: content.styles.filter((_, x) => x !== i) });
                  }}>消す</button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="kanri-foot">
        <button onClick={save} disabled={busy}>{busy ? "保存中…" : "保存する"}</button>
        {msg ? <span>{msg}</span> : null}
      </div>
    </main>
  );
}
