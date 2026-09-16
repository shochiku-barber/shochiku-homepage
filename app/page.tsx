import Image from "next/image";
import { readContent } from "./content";

/* 管理室で直した中身を毎回読むため、静的な作り置きはしない */
export const dynamic = "force-dynamic";

export default async function Home() {
  const { texts: t, menu: menuGroups, styles } = await readContent();

  /* よくあるご質問。空欄にしたものは出さない（管理室で消せるように） */
  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((n) => ({ q: t[`faq.q${n}`] ?? "", a: t[`faq.a${n}`] ?? "" }))
    .filter((item) => item.q.trim() && item.a.trim());

  /* 検索結果に質問と答えをそのまま出してもらうための印 */
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main>
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c") }}
        />
      )}
      <header className="site-header">
        <a className="brand" href="#top" aria-label="松竹 ホームへ">
          <img src="/images/shochiku-emblem.png" alt="松竹の印" width="56" height="56" />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#spirit">心意気</a>
          <a href="/styles">仕上がり</a>
          <a href="#craft">仕事</a>
          <a href="#menu">料金</a>
          <a href="#faq">よくある質問</a>
          <a href="#access">店舗案内</a>
        </nav>
        <a className="header-reserve" href="tel:0428244009">電話予約</a>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav aria-label="モバイルナビゲーション">
            <a href="#spirit">心意気</a>
            <a href="/styles">仕上がり</a>
            <a href="#menu">料金</a>
            <a href="#faq">よくある質問</a>
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
          <p className="eyebrow">{t["hero.eyebrow"]}</p>
          <h1>{t["hero.title1"]}<br />{t["hero.title2"]}</h1>
          <p className="hero-lead"><strong>{t["hero.lead1"]}</strong><br />{t["hero.lead2"]}</p>
          <div className="hero-actions">
            <a className="button solid" href="tel:0428244009"><span>電話で予約</span><small>{t["access.tel"]}</small></a>
            <a className="button ghost" href="https://page.line.me/141dfxeh?liff.referrer=https%3A%2F%2Fshochiku-barber.com%2F" target="_blank" rel="noreferrer"><span>LINEで予約</span><small>予約・相談</small></a>
            <a className="text-link" href="/styles">仕上がりを見る <b>↗</b></a>
          </div>
        </div>
        <p className="hero-technique"><span>SHOCHIKU STYLE</span><strong>{t["hero.technique"]}</strong></p>
        <a className="scroll-cue" href="#spirit">SCROLL <span>↓</span></a>
      </section>

      <div className="ticker" aria-label="松竹の得意技術">
        <div>FADE <i>◆</i> IRON PERM <i>◆</i> CLASSIC BARBERING <i>◆</i> SHAVING <i>◆</i> OME TOKYO <i>◆</i> FADE <i>◆</i> IRON PERM <i>◆</i></div>
      </div>

      <section className="spirit section" id="spirit">
        <div className="section-index"><span>01</span><p>OUR SPIRIT</p></div>
        <div className="spirit-heading">
          <p className="kicker">{t["spirit.kicker"]}</p>
          <h2>{t["spirit.title1"]}<br />{t["spirit.title2"]}</h2>
        </div>
        <div className="spirit-body">
          <p>{t["spirit.p1"]}</p>
          <p>{t["spirit.p2"]}</p>
          <p>{t["spirit.p3"]}</p>
          <div className="signature"><span>{t["spirit.signRole"]}</span><strong>{t["spirit.signName"]}</strong></div>
        </div>
      </section>

      <section className="styles section" id="styles">
        <div className="section-head">
          <div className="section-index"><span>02</span><p>OUR WORK</p></div>
          <div><p className="kicker">{t["work.kicker"]}</p><h2>STYLE ARCHIVE</h2></div>
          <p className="section-note">{t["work.note1"]}<br />{t["work.note2"]}</p>
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

      <section className="craft section" id="craft">
        <div className="craft-head">
          <div className="section-index"><span>03</span><p>OUR CRAFT</p></div>
          <p className="kicker">{t["craft.kicker"]}</p>
          <h2>{t["craft.title1"]}<br />{t["craft.title2"]}</h2>
        </div>
        <div className="craft-body">
          <p className="craft-lead">{t["craft.lead"]}</p>
          <div className="craft-list">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <article className="craft-item" key={n}>
                <span>{String(n).padStart(2, "0")}</span>
                <h3>{t[`craft.${n}.name`]}</h3>
                <p>{t[`craft.${n}.body`]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="menu section" id="menu">
        <div className="menu-intro">
          <div className="section-index light"><span>04</span><p>MENU</p></div>
          <p className="kicker">{t["menu.kicker"]}</p>
          <h2><span>{t["menu.title1"]}</span><span>{t["menu.title2"]}</span></h2>
          <p>{t["menu.note"]}</p>
          <a className="button ivory" href="tel:0428244009"><span>電話で相談する</span><small>{t["access.tel"]}</small></a>
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

      <section className="profile section">
        <div className="profile-visual">
          <Image src="/images/masashi-nihei-kamon.jpg" alt="二瓶家の家紋を背負う二代目代表 二瓶雅士" fill sizes="(max-width: 800px) 100vw, 48vw" />
          <p className="profile-sign"><span>二代目</span><strong>{t["profile.name"]}</strong><small>{t["profile.en"]}</small></p>
        </div>
        <div className="profile-copy">
          <div className="section-index"><span>05</span><p>BARBER</p></div>
          <p className="kicker">SECOND GENERATION</p>
          <h2>{t["profile.name"]}</h2>
          <p className="profile-en">{t["profile.en"]}</p>
          <dl>
            <div><dt>生年月日</dt><dd>{t["profile.birthday"]}</dd></div>
            <div><dt>血液型</dt><dd>{t["profile.blood"]}</dd></div>
            <div><dt>趣味</dt><dd>{t["profile.hobby"]}</dd></div>
            <div><dt>得意技</dt><dd>{t["profile.skill"]}</dd></div>
          </dl>
          <p className="profile-message">{t["profile.message"]}</p>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-head">
          <div className="section-index"><span>06</span><p>FAQ</p></div>
          <p className="kicker">{t["faq.kicker"]}</p>
          <h2>{t["faq.title1"]}<br />{t["faq.title2"]}</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details className="faq-item" key={item.q} open={index === 0}>
              <summary><span>Q</span><h3>{item.q}</h3><i /></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="access section" id="access">
        <div className="access-title">
          <div className="section-index"><span>07</span><p>ACCESS</p></div>
          <p className="kicker">{t["access.kicker"]}</p>
          <h2 className="salon-name">{t["access.title1"]}<br /><span>{t["access.title2"]}</span></h2>
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
          <div><span>ADDRESS</span><p>{t["access.zip"]}<br />{t["access.address"]}</p></div>
          <div><span>OPEN</span><p>{t["access.open"]}</p></div>
          <div><span>CLOSED</span><p>{t["access.closed1"]}<br />{t["access.closed2"]}</p></div>
          <div><span>RESERVATION</span><p>{t["access.reservation"]}</p></div>
          <div><span>PARKING</span><p>{t["access.parking"]}</p></div>
          <div><span>PAYMENT</span><p>{t["access.payment"]}</p></div>
        </div>
        <div className="access-actions">
          <a className="button solid" href="tel:0428244009"><span>電話で予約する</span><small>{t["access.tel"]}</small></a>
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
        <div className="footer-meta"><a href="tel:0428244009">TEL {t["access.tel"]}</a><span>© SHOCHIKU BARBER</span></div>
      </footer>
    </main>
  );
}
