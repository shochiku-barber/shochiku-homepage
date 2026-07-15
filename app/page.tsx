import Image from "next/image";
import { styles } from "./style-data";

const menuGroups = [
  {
    label: "CUT",
    title: "カット",
    note: "シャンプー・シェービング・ブロー込み",
    items: [
      ["大人", "¥4,500"],
      ["高校生", "¥4,000"],
      ["中学生", "¥3,200"],
      ["小学生", "¥2,700"],
    ],
  },
  {
    label: "PERM",
    title: "パーマ",
    note: "カット・シャンプー・シェービング・ブロー込み",
    items: [
      ["アイロンパーマ", "¥9,300〜"],
      ["アイパー", "¥9,300〜"],
      ["ニグロパーマ（コテ）", "¥11,000〜"],
      ["コールドパーマ", "¥9,500〜"],
      ["ツイスト・スパイラル", "¥13,000〜"],
    ],
  },
  {
    label: "COLOR",
    title: "カラー",
    note: "カット・シャンプー・シェービング・ブロー込み",
    items: [["カット＆カラー", "¥7,000〜"]],
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#spirit">心意気</a>
          <a href="/styles">仕上がり</a>
          <a href="#menu">料金</a>
          <a href="#access">店舗案内</a>
        </nav>
        <a className="header-reserve" href="tel:0428244009">電話予約</a>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="#spirit">心意気</a>
            <a href="/styles">仕上がり</a>
            <a href="#menu">料金</a>
            <a href="#access">店舗案内</a>
            <a href="tel:0428244009">電話予約</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-style-wrap">
          <Image src="/images/hero-nurepan-fictional-v3.png" alt="青梅の街で仕立てたフェード濡れパンスタイル" fill sizes="100vw" priority />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">古き魂。新しき刃。</p>
          <h1>受け継ぐ技。<br />研ぎ澄ます粋。</h1>
          <p className="hero-lead"><strong>松竹が創る、フェード濡れパン。</strong><br />一人ひとりの輪郭を、一本の線で決める。</p>
          <div className="hero-actions">
            <a className="button solid" href="tel:0428244009"><span>電話で予約</span><small>0428-24-4009</small></a>
            <a className="button ghost" href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fshochiku-barber.com%2F" target="_blank" rel="noreferrer"><span>LINEで予約</span><small>予約・相談</small></a>
            <a className="text-link" href="/styles">仕上がりを見る <b>↗</b></a>
          </div>
        </div>
        <p className="hero-technique"><span>SHOCHIKU STYLE</span><strong>FADE × IRON PERM</strong></p>
        <a className="scroll-cue" href="#spirit">SCROLL <span>↓</span></a>
      </section>

      <div className="ticker" aria-label="松竹の得意技術">
        <div>FADE <i>◆</i> IRON PERM <i>◆</i> CLASSIC BARBERING <i>◆</i> SHAVING <i>◆</i> OME TOKYO <i>◆</i> FADE <i>◆</i> IRON PERM <i>◆</i></div>
      </div>

      <section className="spirit section" id="spirit">
        <div className="section-index"><span>01</span><p>OUR SPIRIT</p></div>
        <div className="spirit-heading">
          <p className="kicker">生粋の、床屋育ち。</p>
          <h2>男の輪郭を、<br />一本の線で決める。</h2>
        </div>
        <div className="spirit-body">
          <p>1977年の創業以来、床屋の仕事を受け継いできました。先代から学んだ基本を守りながら、フェード、アイロンパーマ、クラシカルなスタイルを今の感覚で仕立てます。</p>
          <p>流行だけでは終わらない。その人の生き方まで凛と見える髪型を。松竹が目指すのは、いつの時代も「粋な男の髪型」です。</p>
          <p>青梅市・東青梅の床屋、理容室として、フェードカット、濡れパン、パンチパーマ、アイロンパーマを一人ひとりに合わせて仕立てます。</p>
          <div className="signature"><span>二代目代表</span><strong>二瓶 雅士</strong></div>
        </div>
      </section>

      <section className="styles section" id="styles">
        <div className="section-head">
          <div className="section-index"><span>02</span><p>OUR WORK</p></div>
          <div><p className="kicker">仕上がりが、答え。</p><h2>STYLE ARCHIVE</h2></div>
          <p className="section-note">骨格、髪質、仕事、日々の手入れ。<br />その男に似合う一手を見極める。</p>
        </div>
        <div className="style-grid">
          {styles.slice(0, 4).map((style, index) => (
            <figure key={style.src} className={`style-card style-${index + 1}`}>
              <Image src={style.src} alt={style.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
              <figcaption><span>SHOCHIKU CUT</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
            </figure>
          ))}
        </div>
        <a className="archive-link" href="/styles"><span>すべての仕上がりを見る</span><b>STYLE ARCHIVE</b><i>→</i></a>
      </section>

      <section className="menu section" id="menu">
        <div className="menu-intro">
          <div className="section-index light"><span>03</span><p>MENU</p></div>
          <p className="kicker">手を抜かない。飾らない。</p>
          <h2><span>粋を整える、</span><span>床屋の仕事。</span></h2>
          <p>料金はすべて税込です。髪の長さや施術内容により料金が変わる場合は、施術前にお伝えします。</p>
          <a className="button ivory" href="tel:0428244009"><span>電話で相談する</span><small>0428-24-4009</small></a>
        </div>
        <div className="menu-list">
          {menuGroups.map((group) => (
            <article className="menu-group" key={group.label}>
              <header><span>{group.label}</span><h3>{group.title}</h3><small>{group.note}</small></header>
              <div>
                {group.items.map(([name, price]) => <p key={name}><span>{name}</span><strong>{price}</strong></p>)}
                {group.label === "CUT" && (
                  <aside className="fade-note">
                    <span>すべてのカットを含むメニューが対象</span>
                    <b>フェード・スキンフェード</b>
                    <p><strong>＋¥300</strong><small>0.4mm以下の短さをご希望の場合</small></p>
                  </aside>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile section">
        <div className="profile-visual">
          <Image src="/images/masashi-nihei-kamon.jpg" alt="二瓶家の家紋を背負う二代目代表 二瓶雅士" fill sizes="(max-width: 800px) 100vw, 48vw" />
          <p className="profile-sign"><span>二代目</span><strong>二瓶 雅士</strong><small>MASASHI NIHEI</small></p>
        </div>
        <div className="profile-copy">
          <div className="section-index"><span>04</span><p>BARBER</p></div>
          <p className="kicker">SECOND GENERATION</p>
          <h2>二瓶 雅士</h2>
          <p className="profile-en">MASASHI NIHEI</p>
          <dl>
            <div><dt>生年月日</dt><dd>1982年8月4日</dd></div>
            <div><dt>血液型</dt><dd>O型</dd></div>
            <div><dt>趣味</dt><dd>お祭り・お面集め・高校野球</dd></div>
            <div><dt>得意技</dt><dd>フェード・刈り上げ・アイロンパーマ</dd></div>
          </dl>
          <p className="profile-message">髪型は、男の自信と魅力を引き立てるもの。床屋の基本を大切に、一人ひとりの「粋」を形にします。</p>
        </div>
      </section>

      <section className="access section" id="access">
        <div className="access-title">
          <div className="section-index"><span>05</span><p>ACCESS</p></div>
          <p className="kicker">ご予約の上、お越しください。</p>
          <h2 className="salon-name">男を整える、<br /><span>粋な床屋。</span></h2>
          <div className="access-map">
            <iframe
              src="https://www.google.com/maps?q=35.7881968%2C139.2767353&z=18&output=embed"
              title="ヘアーサロンリザーブ松竹の地図"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="access-info">
          <div><span>ADDRESS</span><p>〒198-0042<br />東京都青梅市東青梅3-9-15</p></div>
          <div><span>OPEN</span><p>9:00 — 19:00</p></div>
          <div><span>CLOSED</span><p>毎週月曜日<br />第2・第3火曜日</p></div>
          <div><span>RESERVATION</span><p>予約制</p></div>
        </div>
        <div className="access-actions">
          <a className="button solid" href="tel:0428244009"><span>電話で予約する</span><small>0428-24-4009</small></a>
          <a className="map-link" href="https://maps.app.goo.gl/ZiTpnex6NHfdcQHy9" target="_blank" rel="noreferrer">詳しい地図を見る <b>↗</b></a>
        </div>
        <div className="social-actions">
          <a className="social-link line" href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fshochiku-barber.com%2F" target="_blank" rel="noreferrer"><span>LINE</span><b>予約・相談する</b><i>↗</i></a>
          <a className="social-link instagram" href="https://www.instagram.com/reserve_shochiku" target="_blank" rel="noreferrer"><span>INSTAGRAM</span><b>仕上がりを見る</b><i>↗</i></a>
        </div>
      </section>

      <footer>
        <div className="footer-mark"><img src="/images/shochiku-emblem.png" alt="松竹の印" width="112" height="112" /><p><strong>松竹</strong><span>HAIR SALON RESERVE</span></p></div>
        <p className="footer-copy">受け継ぐ技。研ぎ澄ます粋。</p>
        <div className="footer-meta"><a href="tel:0428244009">TEL 0428-24-4009</a><span>© SHOCHIKU BARBER</span></div>
      </footer>
    </main>
  );
}
