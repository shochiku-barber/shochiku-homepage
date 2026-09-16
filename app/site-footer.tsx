/**
 * 全ページ共通のフッター。
 *
 * 店の説明文（footer.about）をここに置いてある。どのページから来た人にも
 * 「どこの何屋か」が分かるように、そして検索にも読ませるため。
 * 文章は管理室（/kanri）から直せる。
 */
export function SiteFooter({ texts: t }: { texts: Record<string, string> }) {
  return (
    <footer>
      <div className="footer-mark">
        <img src="/images/shochiku-emblem.png" alt="松竹の印" width="112" height="112" />
        <p><strong>松竹</strong><span>HAIR SALON RESERVE</span></p>
      </div>
      <p className="footer-copy">受け継ぐ技。研ぎ澄ます粋。</p>

      <div className="footer-about">
        <p>{t["footer.about"]}</p>
        <dl>
          <div><dt>住所</dt><dd>{t["access.zip"]} {t["access.address"]}</dd></div>
          <div><dt>電話</dt><dd><a href="tel:0428244009">{t["access.tel"]}</a></dd></div>
          <div><dt>営業</dt><dd>{t["access.open"]}（{t["access.reservation"]}）</dd></div>
          <div><dt>定休</dt><dd>{t["access.closed1"]}・{t["access.closed2"]}</dd></div>
          <div><dt>駐車場</dt><dd>{t["access.parking"]}</dd></div>
          <div><dt>支払い</dt><dd>{t["access.payment"]}</dd></div>
        </dl>
      </div>

      <nav className="footer-nav" aria-label="フッターナビゲーション">
        <a href="/">ホーム</a>
        <a href="/styles">仕上がり</a>
        <a href="/faq">よくあるご質問</a>
        <a href="/#menu">料金</a>
        <a href="/#access">店舗案内</a>
        <a href="https://www.instagram.com/reserve_shochiku" target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <div className="footer-meta">
        <a href="tel:0428244009">TEL {t["access.tel"]}</a>
        <span>© SHOCHIKU BARBER</span>
      </div>
    </footer>
  );
}
