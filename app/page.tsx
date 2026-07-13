import Image from "next/image";

const styles = [
  { src: "/images/style-01.jpg", alt: "クロップスタイルとスキンフェード" },
  { src: "/images/style-05.jpg", alt: "動きのあるパーマとフェード" },
  { src: "/images/style-08.jpg", alt: "メッシュパーマとフェード" },
  { src: "/images/style-12.jpg", alt: "クラシカルな七三スタイル" },
  { src: "/images/style-14.jpg", alt: "短めクロップとフェード" },
  { src: "/images/style-18.jpg", alt: "アイロンパーマのクラシックスタイル" },
  { src: "/images/style-19.jpg", alt: "強めカールとフェード" },
  { src: "/images/style-22.jpg", alt: "清潔感のあるボウズフェード" },
  { src: "/images/style-24.jpg", alt: "ハイライトを効かせたフェード" },
  { src: "/images/style-27.jpg", alt: "大人のパーマスタイル" },
  { src: "/images/style-29.jpg", alt: "柔らかなウェーブとフェード" },
  { src: "/images/style-35.jpg", alt: "カーリーヘアとスキンフェード" },
];

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
          <Image src="/images/nihei-kamon.jpg" alt="二瓶家の家紋" width={44} height={44} />
          <span>
            <b>松竹</b>
            <small>HAIR SALON RESERVE</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#spirit">心意気</a>
          <a href="#styles">仕上がり</a>
          <a href="#menu">料金</a>
          <a href="#access">店舗案内</a>
        </nav>
        <a className="header-reserve" href="tel:0428244009">電話予約</a>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="#spirit">心意気</a>
            <a href="#styles">仕上がり</a>
            <a href="#menu">料金</a>
            <a href="#access">店舗案内</a>
            <a href="tel:0428244009">電話予約</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>OME, TOKYO</span><span>SECOND GENERATION</span></p>
          <h1>受け継ぐ技。<br />研ぎ澄ます粋。</h1>
          <p className="hero-lead">古き良き床屋の仕事を、今の男へ。<br />青梅で創業48年、二代目が鋏を入れる。</p>
          <div className="hero-actions">
            <a className="button solid" href="tel:0428244009"><span>予約する</span><small>0428-24-4009</small></a>
            <a className="text-link" href="#styles">仕上がりを見る <b>↘</b></a>
          </div>
          <div className="hero-facts" aria-label="店舗概要">
            <p><strong>48</strong><span>YEARS<br />OF CRAFT</span></p>
            <p><strong>2ND</strong><span>MASASHI<br />NIHEI</span></p>
            <p><strong>OME</strong><span>TOKYO<br />BARBER</span></p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="crest-wrap">
            <Image src="/images/nihei-kamon.jpg" alt="二瓶家の家紋" fill sizes="(max-width: 800px) 85vw, 44vw" priority />
            <span>二瓶家 家紋</span>
          </div>
          <div className="portrait-wrap">
            <Image src="/images/masashi-nihei.jpg" alt="ヘアサロンリザーブ松竹 二代目代表 二瓶雅士" fill sizes="(max-width: 800px) 92vw, 48vw" priority />
          </div>
          <p className="portrait-caption"><span>二代目代表</span><strong>二瓶 雅士</strong><small>MASASHI NIHEI</small></p>
        </div>
        <div className="hero-wordmark" aria-hidden="true">SHOCHIKU BARBER</div>
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
          <p>理容師の家に生まれ、床屋の仕事を見て育ちました。先代から受け継いだ基本を守りながら、フェード、アイロンパーマ、クラシカルなスタイルを今の感覚で仕立てます。</p>
          <p>流行だけでは終わらない。その人の生き方まで凛と見える髪型を。松竹が目指すのは、いつの時代も「粋な男の髪型」です。</p>
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
          {styles.map((style, index) => (
            <figure key={style.src} className={`style-card style-${index + 1}`}>
              <Image src={style.src} alt={style.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
              <figcaption><span>SHOCHIKU CUT</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="menu section" id="menu">
        <div className="menu-intro">
          <div className="section-index light"><span>03</span><p>MENU</p></div>
          <p className="kicker">手を抜かない。飾らない。</p>
          <h2>粋を整える、<br />床屋の仕事。</h2>
          <p>全メニュー、フェード・スキンフェード（0.4mm以下）は＋300円。髪の長さや施術内容により料金が変わる場合があります。</p>
          <a className="button ivory" href="tel:0428244009"><span>電話で相談する</span><small>0428-24-4009</small></a>
        </div>
        <div className="menu-list">
          {menuGroups.map((group) => (
            <article className="menu-group" key={group.label}>
              <header><span>{group.label}</span><h3>{group.title}</h3><small>{group.note}</small></header>
              <div>
                {group.items.map(([name, price]) => <p key={name}><span>{name}</span><strong>{price}</strong></p>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile section">
        <div className="profile-visual">
          <Image src="/images/masashi-nihei.jpg" alt="二代目代表 二瓶雅士" fill sizes="(max-width: 800px) 100vw, 45vw" />
          <Image className="profile-crest" src="/images/nihei-kamon.jpg" alt="二瓶家の家紋" width={190} height={190} />
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
          <h2>青梅で、<br />鋏を研いで待つ。</h2>
        </div>
        <div className="access-info">
          <div><span>ADDRESS</span><p>〒198-0042<br />東京都青梅市東青梅3-9-15</p></div>
          <div><span>OPEN</span><p>9:00 — 19:00</p></div>
          <div><span>CLOSED</span><p>毎週月曜日<br />第2・第3火曜日</p></div>
          <div><span>RESERVATION</span><p>予約制</p></div>
        </div>
        <div className="access-actions">
          <a className="button solid" href="tel:0428244009"><span>電話で予約する</span><small>0428-24-4009</small></a>
          <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E9%9D%92%E6%A2%85%E5%B8%82%E6%9D%B1%E9%9D%923-9-15" target="_blank" rel="noreferrer">地図を開く <b>↗</b></a>
        </div>
      </section>

      <footer>
        <div className="footer-mark"><Image src="/images/nihei-kamon.jpg" alt="二瓶家の家紋" width={96} height={96} /><p><strong>松竹</strong><span>HAIR SALON RESERVE</span></p></div>
        <p className="footer-copy">受け継ぐ技。研ぎ澄ます粋。</p>
        <div className="footer-meta"><a href="tel:0428244009">TEL 0428-24-4009</a><span>© SHOCHIKU BARBER</span></div>
      </footer>
    </main>
  );
}
