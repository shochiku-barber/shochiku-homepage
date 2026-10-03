import type { Metadata } from "next";
import { readContent } from "../content";
import { SiteFooter } from "../site-footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "料金｜青梅市の床屋・理容室 松竹",
  description:
    "青梅市東青梅の理容室、ヘアーサロンリザーブ松竹の料金表。フェードカット、スキンフェード、濡れパン、パンチパーマ、アイロンパーマ、シェービングの料金をご案内します。",
  alternates: { canonical: "/price" },
  openGraph: {
    title: "料金｜青梅市の床屋・理容室 松竹",
    description: "松竹の料金表。フェード、濡れパン、パンチパーマ、アイロンパーマ、シェービング。",
    url: "https://barber-shochiku.com/price",
  },
};

export default async function Price() {
  const { texts: t, menu: menuGroups } = await readContent();

  return (
    <main className="gallery-page">
      <header className="site-header gallery-header">
        <a className="brand" href="/" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="/">ホーム</a>
          <a href="/styles">仕上がり</a>
          <a href="/faq">よくある質問</a>
          <a href="/#access">店舗案内</a>
        </nav>
        <a className="header-reserve" href="tel:0428244009">電話予約</a>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="/">ホーム</a>
            <a href="/styles">仕上がり</a>
            <a href="/faq">よくある質問</a>
            <a href="/#access">店舗案内</a>
            <a href="tel:0428244009">電話予約</a>
          </nav>
        </details>
      </header>

      <section className="menu section" style={{ paddingTop: 170 }}>
        <div className="menu-intro">
          <div className="section-index light"><span>03</span><p>MENU</p></div>
          <p className="kicker">{t["menu.kicker"]}</p>
          <h2><span>{t["menu.title1"]}</span><span>{t["menu.title2"]}</span></h2>
          <p>{t["menu.note"]}</p>
          <a className="button ivory" href="tel:0428244009"><span>電話で相談する</span><small>{t["access.tel"]}</small></a>
          <a href="/" style={{ marginTop: 24, display: "block", fontSize: 11, letterSpacing: "0.1em" }}>← ホームへ戻る</a>
        </div>
        <div className="menu-list">
          {menuGroups.map((group) => (
            <article className="menu-group" key={group.label}>
              <header><span>{group.label}</span><h3>{group.title}</h3><small>{group.note}</small></header>
              <div>
                {group.items.map(([name, price]) => <p key={name}><span>{name}</span><strong>{price}</strong></p>)}
                {group.label === "CUT" && (
                  <aside className="fade-note">
                    <span>{t["menu.fadeNote"]}</span>
                    <b>{t["menu.fadeName"]}</b>
                    <p><strong>{t["menu.fadePrice"]}</strong><small>{t["menu.fadeSmall"]}</small></p>
                  </aside>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-cta">
        <p>ご予約は、お電話かLINEで。</p>
        <div>
          <a href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fbarber-shochiku.com%2F" target="_blank" rel="noreferrer">LINEで予約・相談 <b>↗</b></a>
          <a href="tel:0428244009">電話予約 {t["access.tel"]} <b>→</b></a>
        </div>
      </section>

      {/* 携帯のメニューは、行を押したら閉じる（開いたまま覆い被さらないように） */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('.mobile-menu nav a');if(!a)return;var d=a.closest('details');if(d)d.open=false;},true);",
        }}
      />
      <SiteFooter texts={t} />
    </main>
  );
}
