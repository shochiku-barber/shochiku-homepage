import type { Metadata } from "next";
import { readContent } from "../content";
import { SiteFooter } from "../site-footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "よくあるご質問｜青梅市の床屋・理容室 松竹",
  description:
    "青梅市東青梅の理容室、ヘアーサロンリザーブ松竹へのご質問にお答えします。予約の取り方、駐車場（3台）、お支払い方法、営業時間と定休日、フェードの追加料金、学生料金について。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくあるご質問｜青梅市の床屋・理容室 松竹",
    description: "予約・駐車場・お支払い・営業時間など、お越しになる前に知っておきたいこと。",
    url: "https://shochiku-barber.com/faq",
  },
};

export default async function Faq() {
  const { texts: t } = await readContent();

  /* 質問と答えの両方が書いてあるものだけ出す（管理室で片方を空にすれば消える） */
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((n) => ({ q: t[`faq.q${n}`] ?? "", a: t[`faq.a${n}`] ?? "" }))
    .filter((item) => item.q.trim() && item.a.trim());

  /* 検索結果に質問と答えをそのまま出してもらうための印 */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://shochiku-barber.com/faq#faq",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="faq-page">
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      )}

      <header className="site-header gallery-header">
        <a className="brand" href="/" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="/">ホーム</a>
          <a href="/styles">仕上がり</a>
          <a href="/#menu">料金</a>
          <a href="/#access">店舗案内</a>
        </nav>
        <a className="header-reserve" href="tel:0428244009">電話予約</a>
      </header>

      <section className="faq-intro">
        <div>
          <p className="gallery-strap">SHOCHIKU / FAQ</p>
          <h1>よくあるご質問。</h1>
        </div>
        <div className="faq-intro-note">
          <span>01 — {String(items.length).padStart(2, "0")}</span>
          <p>{t["faq.kicker"]}<br />お尋ねの多いことを、まとめてお答えします。</p>
          <a href="/">← ホームへ戻る</a>
        </div>
      </section>

      <section className="faq-body" aria-label="よくあるご質問">
        {items.map((item, index) => (
          <details className="faq-qa" key={item.q} open={index === 0}>
            <summary>
              <span className="faq-mark">Q</span>
              <h2>{item.q}</h2>
              <i className="faq-sign" aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <span className="faq-mark">A</span>
              <div>
                <p>{item.a}</p>
                {/* 答えの中でLINEに触れているなら、その場から押せるようにする */}
                {item.a.includes("LINE") && (
                  <div className="faq-actions">
                    <a
                      className="faq-line"
                      href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fshochiku-barber.com%2F"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>LINEで予約・相談する</span><i>↗</i>
                    </a>
                    <a className="faq-tel" href="tel:0428244009">
                      <span>電話する</span><b>{t["access.tel"]}</b>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </details>
        ))}
      </section>

      <section className="gallery-cta">
        <p>ご不明な点は、お気軽に。</p>
        <div>
          <a href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fshochiku-barber.com%2F" target="_blank" rel="noreferrer">LINEで予約・相談 <b>↗</b></a>
          <a href="tel:0428244009">電話予約 {t["access.tel"]} <b>→</b></a>
        </div>
      </section>

      <SiteFooter texts={t} />
    </main>
  );
}
