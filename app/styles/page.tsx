import type { Metadata } from "next";
import Image from "next/image";
import { styles } from "../style-data";

export const metadata: Metadata = {
  title: "フェード・濡れパン・パンチパーマの髪型｜松竹スタイル",
  description: "青梅市の床屋・理容室、松竹のスタイルギャラリー。フェードカット、スキンフェード、濡れパン、パンチパーマ、アイロンパーマの仕上がりをご覧いただけます。",
  alternates: { canonical: "/styles" },
  openGraph: {
    title: "フェード・濡れパン・パンチパーマの髪型｜松竹スタイル",
    description: "青梅市・東青梅のバーバー松竹が仕立てる、男のためのスタイルギャラリー。",
    url: "https://shochiku-barber.com/styles",
  },
};

export default function StyleArchive() {
  return (
    <main className="gallery-page">
      <header className="site-header gallery-header">
        <a className="brand" href="/" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="/">ホーム</a>
          <a href="/#spirit">心意気</a>
          <a href="/#menu">料金</a>
          <a href="/#access">店舗案内</a>
        </nav>
        <a className="header-reserve" href="tel:0428244009">電話予約</a>
      </header>

      <section className="gallery-intro">
        <div>
          <p className="gallery-strap">SHOCHIKU / STYLE ARCHIVE</p>
          <h1><span>仕上がりが、</span><span>答え。</span></h1>
        </div>
        <div className="gallery-intro-note">
          <span>01 — {String(styles.length).padStart(2, "0")}</span>
          <p>青梅市の床屋・松竹が仕立てる、フェード、濡れパン、パンチパーマ。<br />流行で終わらない、その男だけの輪郭。</p>
          <a href="/">← ホームへ戻る</a>
        </div>
      </section>

      <section className="gallery-grid-full" aria-label="松竹のスタイル作品集">
        {styles.map((style, index) => (
          <figure className="gallery-work" key={style.src}>
            <Image
              src={style.src}
              alt={style.alt}
              fill
              sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
            />
            <figcaption>
              <b>{String(index + 1).padStart(2, "0")}</b>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="gallery-cta">
        <p>次は、あなたの輪郭を。</p>
        <div>
          <a href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fshochiku-barber.com%2F" target="_blank" rel="noreferrer">LINEで予約・相談 <b>↗</b></a>
          <a href="tel:0428244009">電話予約 0428-24-4009 <b>→</b></a>
        </div>
      </section>
    </main>
  );
}
