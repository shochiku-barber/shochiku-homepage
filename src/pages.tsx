/** 公開ページ。文章・料金・写真は content.ts（既定）と、管理室で直した KV から。 */
import { Page, SiteFooter, Img } from "./components";
import type { Content } from "./content";

export const Home = ({ c }: { c: Content }) => {
  const { texts: t, styles } = c;
  return (
    <Page meta={{ title: "青梅市の床屋・理容室 松竹｜フェード・濡れパン・パンチパーマ", canonical: "/", preloadHero: true }}>
<main>
      <header class="site-header">
        <a class="brand" href="#top" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav class="desktop-nav" aria-label="メインナビゲーション">
          <a href="#spirit">心意気</a>
          <a href="/styles">仕上がり</a>
          <a href="/price">料金</a>
          <a href="/faq">よくある質問</a>
          <a href="#access">店舗案内</a>
        </nav>
        <a class="header-reserve" href="tel:0428244009">電話予約</a>
        <details class="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="#spirit">心意気</a>
            <a href="/styles">仕上がり</a>
            <a href="/price">料金</a>
            <a href="/faq">よくある質問</a>
            <a href="#access">店舗案内</a>
            <a href="tel:0428244009">電話予約</a>
          </nav>
        </details>
      </header>

      <section class="hero" id="top">
        <div class="hero-style-wrap">
          <Img src="/images/hero-nurepan-fictional-v3.png" alt="青梅の街で仕立てたフェード濡れパンスタイル" sizes="100vw" priority />
        </div>
        <div class="hero-copy">
          <p class="eyebrow">{t["hero.eyebrow"]}</p>
          <h1>{t["hero.title1"]}<br />{t["hero.title2"]}</h1>
          <p class="hero-lead"><strong>{t["hero.lead1"]}</strong><br />{t["hero.lead2"]}</p>
          <div class="hero-actions">
            <a class="button solid" href="tel:0428244009"><span>電話で予約</span><small>{t["access.tel"]}</small></a>
            <a class="button ghost" href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fbarber-shochiku.com%2F" target="_blank" rel="noreferrer"><span>LINEで予約</span><small>予約・相談</small></a>
            <a class="text-link" href="/styles">仕上がりを見る <b>↗</b></a>
          </div>
        </div>
        <p class="hero-technique"><span>SHOCHIKU STYLE</span><strong>{t["hero.technique"]}</strong></p>
        <a class="scroll-cue" href="#spirit">SCROLL <span>↓</span></a>
      </section>

      <div class="ticker" aria-label="松竹の得意技術">
        <div>FADE <i>◆</i> IRON PERM <i>◆</i> CLASSIC BARBERING <i>◆</i> SHAVING <i>◆</i> OME TOKYO <i>◆</i> FADE <i>◆</i> IRON PERM <i>◆</i></div>
      </div>

      <section class="spirit section" id="spirit">
        <div class="section-index"><span>01</span><p>OUR SPIRIT</p></div>
        <div class="spirit-heading">
          <p class="kicker">{t["spirit.kicker"]}</p>
          <h2>{t["spirit.title1"]}<br />{t["spirit.title2"]}</h2>
        </div>
        <div class="spirit-body">
          <p>{t["spirit.p1"]}</p>
          <p>{t["spirit.p2"]}</p>
          <p>{t["spirit.p3"]}</p>
          <div class="signature"><span>{t["spirit.signRole"]}</span><strong>{t["spirit.signName"]}</strong></div>
        </div>
      </section>

      <section class="styles section" id="styles">
        <div class="section-head">
          <div class="section-index"><span>02</span><p>OUR WORK</p></div>
          <div><p class="kicker">{t["work.kicker"]}</p><h2>STYLE ARCHIVE</h2></div>
          <p class="section-note">{t["work.note1"]}<br />{t["work.note2"]}</p>
        </div>
        <div class="style-grid">
          {styles.slice(0, 4).map((style, index) => (
            <figure key={style.src} class={`style-card style-${index + 1}`}>
              <Img src={style.src} alt={style.alt} sizes="(max-width: 700px) 50vw, 25vw" />
              <figcaption><span>SHOCHIKU CUT</span><b>{String(index + 1).padStart(2, "0")}</b></figcaption>
            </figure>
          ))}
        </div>
        <a class="archive-link" href="/styles"><span>すべての仕上がりを見る</span><b>STYLE ARCHIVE</b><i>→</i></a>
      </section>

      <section class="styles section" style={{ paddingTop: 0, paddingBottom: "6vw" }}>
        <a class="archive-link" href="/price"><span>料金を見る</span><b>PRICE LIST</b><i>→</i></a>
      </section>

      <section class="profile section">
        <div class="profile-visual">
          <Img src="/images/masashi-nihei-kamon.jpg" alt="二瓶家の家紋を背負う二代目代表 二瓶雅士" sizes="(max-width: 800px) 100vw, 48vw" />
          <p class="profile-sign"><span>二代目</span><strong>{t["profile.name"]}</strong><small>{t["profile.en"]}</small></p>
        </div>
        <div class="profile-copy">
          <div class="section-index"><span>04</span><p>BARBER</p></div>
          <p class="kicker">SECOND GENERATION</p>
          <h2>{t["profile.name"]}</h2>
          <p class="profile-en">{t["profile.en"]}</p>
          <dl>
            <div><dt>生年月日</dt><dd>{t["profile.birthday"]}</dd></div>
            <div><dt>血液型</dt><dd>{t["profile.blood"]}</dd></div>
            <div><dt>趣味</dt><dd>{t["profile.hobby"]}</dd></div>
            <div><dt>得意技</dt><dd>{t["profile.skill"]}</dd></div>
          </dl>
          <p class="profile-message">{t["profile.message"]}</p>
        </div>
      </section>

      <section class="access section" id="access">
        <div class="access-title">
          <div class="section-index"><span>05</span><p>ACCESS</p></div>
          <p class="kicker">{t["access.kicker"]}</p>
          <h2 class="salon-name">{t["access.title1"]}<br /><span>{t["access.title2"]}</span></h2>
          <div class="access-map">
            <iframe
              src="https://www.google.com/maps?q=35.7881968%2C139.2767353&z=18&output=embed"
              title="ヘアーサロンリザーブ松竹の地図"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div class="access-info">
          <div><span>ADDRESS</span><p>{t["access.zip"]}<br />{t["access.address"]}</p></div>
          <div><span>OPEN</span><p>{t["access.open"]}</p></div>
          <div><span>CLOSED</span><p>{t["access.closed1"]}<br />{t["access.closed2"]}</p></div>
          <div><span>RESERVATION</span><p>{t["access.reservation"]}</p></div>
          <div><span>PARKING</span><p>{t["access.parking"]}</p></div>
          <div><span>PAYMENT</span><p>{t["access.payment"]}</p></div>
        </div>
        <div class="access-actions">
          <a class="button solid" href="tel:0428244009"><span>電話で予約する</span><small>{t["access.tel"]}</small></a>
          <a class="map-link" href="https://maps.app.goo.gl/ZiTpnex6NHfdcQHy9" target="_blank" rel="noreferrer">詳しい地図を見る <b>↗</b></a>
        </div>
        <div class="social-actions">
          <a class="social-link line" href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fbarber-shochiku.com%2F" target="_blank" rel="noreferrer"><span>LINE</span><b>予約・相談する</b><i>↗</i></a>
          <a class="social-link instagram" href="https://www.instagram.com/reserve_shochiku" target="_blank" rel="noreferrer"><span>INSTAGRAM</span><b>仕上がりを見る</b><i>↗</i></a>
        </div>
      </section>

      {/* 携帯のメニューは、行を押したら閉じる（開いたまま覆い被さらないように） */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('.mobile-menu nav a');if(!a)return;var d=a.closest('details');if(d)d.open=false;},true);",
        }}
      />
      <SiteFooter t={t} />
    </main>
    </Page>
  );
};

export const Price = ({ c }: { c: Content }) => {
  const { texts: t, menu: menuGroups } = c;
  return (
    <Page meta={{
      title: "料金｜青梅市の床屋・理容室 松竹",
      description: "青梅市東青梅の理容室、ヘアーサロンリザーブ松竹の料金表。フェードカット、スキンフェード、濡れパン、パンチパーマ、アイロンパーマ、シェービングの料金をご案内します。",
      canonical: "/price",
      og: { title: "料金｜青梅市の床屋・理容室 松竹", description: "松竹の料金表。フェード、濡れパン、パンチパーマ、アイロンパーマ、シェービング。", url: "https://barber-shochiku.com/price" },
    }}>
<main class="gallery-page">
      <header class="site-header gallery-header">
        <a class="brand" href="/" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav class="desktop-nav" aria-label="メインナビゲーション">
          <a href="/">ホーム</a>
          <a href="/styles">仕上がり</a>
          <a href="/faq">よくある質問</a>
          <a href="/#access">店舗案内</a>
        </nav>
        <a class="header-reserve" href="tel:0428244009">電話予約</a>
        <details class="mobile-menu">
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

      <section class="menu section" style={{ paddingTop: 170 }}>
        <div class="menu-intro">
          <div class="section-index light"><span>03</span><p>MENU</p></div>
          <p class="kicker">{t["menu.kicker"]}</p>
          <h2><span>{t["menu.title1"]}</span><span>{t["menu.title2"]}</span></h2>
          <p>{t["menu.note"]}</p>
          <a class="button ivory" href="tel:0428244009"><span>電話で相談する</span><small>{t["access.tel"]}</small></a>
          <a href="/" style={{ marginTop: 24, display: "block", fontSize: 11, letterSpacing: "0.1em" }}>← ホームへ戻る</a>
        </div>
        <div class="menu-list">
          {menuGroups.map((group) => (
            <article class="menu-group" key={group.label}>
              <header><span>{group.label}</span><h3>{group.title}</h3><small>{group.note}</small></header>
              <div>
                {group.items.map(([name, price]) => <p key={name}><span>{name}</span><strong>{price}</strong></p>)}
                {group.label === "CUT" && (
                  <aside class="fade-note">
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

      <section class="gallery-cta">
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
      <SiteFooter t={t} />
    </main>
    </Page>
  );
};

export const Styles = ({ c }: { c: Content }) => {
  const { texts: t, styles } = c;
  return (
    <Page meta={{
      title: "フェード・濡れパン・パンチパーマの髪型｜松竹スタイル",
      description: "青梅市の床屋・理容室、松竹のスタイルギャラリー。フェードカット、スキンフェード、濡れパン、パンチパーマ、アイロンパーマの仕上がりをご覧いただけます。",
      canonical: "/styles",
      og: { title: "フェード・濡れパン・パンチパーマの髪型｜松竹スタイル", description: "青梅市・東青梅のバーバー松竹が仕立てる、男のためのスタイルギャラリー。", url: "https://barber-shochiku.com/styles" },
    }}>
<main class="gallery-page">
      <header class="site-header gallery-header">
        <a class="brand" href="/" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav class="desktop-nav" aria-label="メインナビゲーション">
          <a href="/">ホーム</a>
          <a href="/#spirit">心意気</a>
          <a href="/price">料金</a>
          <a href="/#access">店舗案内</a>
        </nav>
        <a class="header-reserve" href="tel:0428244009">電話予約</a>
        <details class="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="/">ホーム</a>
            <a href="/#spirit">心意気</a>
            <a href="/price">料金</a>
            <a href="/#access">店舗案内</a>
            <a href="tel:0428244009">電話予約</a>
          </nav>
        </details>
      </header>

      <section class="gallery-intro">
        <div>
          <p class="gallery-strap">SHOCHIKU / STYLE ARCHIVE</p>
          <h1><span>仕上がりが、</span><span>答え。</span></h1>
        </div>
        <div class="gallery-intro-note">
          <span>01 — {String(styles.length).padStart(2, "0")}</span>
          <p>青梅市の床屋・松竹が仕立てる、フェード、濡れパン、パンチパーマ。<br />流行で終わらない、その男だけの輪郭。</p>
          <a href="/">← ホームへ戻る</a>
        </div>
      </section>

      <section class="gallery-grid-full" aria-label="松竹のスタイル作品集">
        {styles.map((style, index) => (
          <figure class="gallery-work" key={style.src}>
            <Img
              src={style.src}
              alt={style.alt}
              sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
            />
            <figcaption>
              <b>{String(index + 1).padStart(2, "0")}</b>
            </figcaption>
          </figure>
        ))}
      </section>

      <section class="gallery-cta">
        <p>次は、あなたの輪郭を。</p>
        <div>
          <a href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fbarber-shochiku.com%2F" target="_blank" rel="noreferrer">LINEで予約・相談 <b>↗</b></a>
          <a href="tel:0428244009">電話予約 0428-24-4009 <b>→</b></a>
        </div>
      </section>

      {/* 携帯のメニューは、行を押したら閉じる（開いたまま覆い被さらないように） */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('.mobile-menu nav a');if(!a)return;var d=a.closest('details');if(d)d.open=false;},true);",
        }}
      />
      <SiteFooter t={t} />
    </main>
    </Page>
  );
};

export const Faq = ({ c }: { c: Content }) => {
  const { texts: t } = c;
  /* 質問と答えの両方が書いてあるものだけ出す（管理室で片方を空にすれば消える） */
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((n) => ({ q: t[`faq.q${n}`] ?? "", a: t[`faq.a${n}`] ?? "" }))
    .filter((item) => item.q.trim() && item.a.trim());
  /* 検索結果に質問と答えをそのまま出してもらうための印 */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://barber-shochiku.com/faq#faq",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  return (
    <Page meta={{
      title: "よくあるご質問｜青梅市の床屋・理容室 松竹",
      description: "青梅市東青梅の理容室、ヘアーサロンリザーブ松竹へのご質問にお答えします。予約の取り方、駐車場（3台）、お支払い方法、営業時間と定休日、フェードの追加料金、学生料金について。",
      canonical: "/faq",
      og: { title: "よくあるご質問｜青梅市の床屋・理容室 松竹", description: "予約・駐車場・お支払い・営業時間など、お越しになる前に知っておきたいこと。", url: "https://barber-shochiku.com/faq" },
    }}>
<main class="faq-page">
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      )}

      <header class="site-header gallery-header">
        <a class="brand" href="/" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav class="desktop-nav" aria-label="メインナビゲーション">
          <a href="/">ホーム</a>
          <a href="/styles">仕上がり</a>
          <a href="/price">料金</a>
          <a href="/#access">店舗案内</a>
        </nav>
        <a class="header-reserve" href="tel:0428244009">電話予約</a>
        <details class="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="/">ホーム</a>
            <a href="/styles">仕上がり</a>
            <a href="/price">料金</a>
            <a href="/#access">店舗案内</a>
            <a href="tel:0428244009">電話予約</a>
          </nav>
        </details>
      </header>

      <section class="faq-intro">
        <div>
          <p class="gallery-strap">SHOCHIKU / FAQ</p>
          <h1>よくあるご質問。</h1>
        </div>
        <div class="faq-intro-note">
          <span>01 — {String(items.length).padStart(2, "0")}</span>
          <p>{t["faq.kicker"]}<br />お尋ねの多いことを、まとめてお答えします。</p>
          <a href="/">← ホームへ戻る</a>
        </div>
      </section>

      <section class="faq-body" aria-label="よくあるご質問">
        {items.map((item, index) => (
          <details class="faq-qa" key={item.q} open={index === 0}>
            <summary>
              <span class="faq-mark">Q</span>
              <h2>{item.q}</h2>
              <i class="faq-sign" aria-hidden="true" />
            </summary>
            <div class="faq-answer">
              <span class="faq-mark">A</span>
              <div>
                <p>{item.a}</p>
                {/* 答えの中でLINEに触れているなら、その場から押せるようにする */}
                {item.a.includes("LINE") && (
                  <div class="faq-actions">
                    <a
                      class="faq-line"
                      href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fbarber-shochiku.com%2F"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>LINEで予約・相談する</span><i>↗</i>
                    </a>
                    <a class="faq-tel" href="tel:0428244009">
                      <span>電話する</span><b>{t["access.tel"]}</b>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </details>
        ))}
      </section>

      <section class="gallery-cta">
        <p>ご不明な点は、お気軽に。</p>
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
      <SiteFooter t={t} />
    </main>
    </Page>
  );
};
