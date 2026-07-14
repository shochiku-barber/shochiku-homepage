import type { Metadata } from "next";
import Image from "next/image";
import { styles } from "../style-data";

export const metadata: Metadata = {
  title: "スタイルギャラリー｜ヘアサロンリザーブ松竹",
  description: "松竹が仕立てたフェード、濡れパン、アイロンパーマ、クラシックスタイルの作品集。",
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
          <h1>仕上がりが、<br />答え。</h1>
        </div>
        <div className="gallery-intro-note">
          <span>01 — 12</span>
          <p>骨格、髪質、暮らし方まで読む。<br />流行で終わらない、その男だけの輪郭。</p>
          <a href="/">← ホームへ戻る</a>
        </div>
      </section>

      <section className="gallery-grid-full" aria-label="松竹のスタイル作品集">
        {styles.map((style, index) => (
          <figure className="gallery-work" key={style.src}>
            <Image src={style.src} alt={style.alt} fill sizes="(max-width: 720px) 100vw, 50vw" />
            <figcaption><span>{style.alt}</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
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
