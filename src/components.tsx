/** 全ページ共通の部品：写真、フッター、head。 */
import type { FC } from "hono/jsx";
import { raw } from "hono/html";

const SITE = "https://barber-shochiku.com";

/** 写真。管理室で上げたもの（/img/…）はそのまま、同梱の写真は /_img で縮めて配る。 */
export const Img: FC<{ src: string; alt: string; sizes?: string; priority?: boolean }> = ({ src, alt, sizes, priority }) => {
  const url = src.startsWith("/img/") ? src : `/_img?url=${encodeURIComponent(src)}&w=640&q=75`;
  return (
    <img
      src={url}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      {...(priority ? { fetchpriority: "high" } : {})}
      decoding="async"
      sizes={sizes}
      style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"
    />
  );
};

export const SiteFooter: FC<{ t: Record<string, string> }> = ({ t }) => (
<footer>
      <div class="footer-mark">
        <img src="/images/shochiku-emblem.png" alt="松竹の印" width="112" height="112" />
        <p><strong>松竹</strong><span>HAIR SALON RESERVE</span></p>
      </div>
      <p class="footer-copy">受け継ぐ技。研ぎ澄ます粋。</p>

      <div class="footer-about">
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

      <nav class="footer-nav" aria-label="フッターナビゲーション">
        <a href="/">ホーム</a>
        <a href="/styles">仕上がり</a>
        <a href="/faq">よくあるご質問</a>
        <a href="/price">料金</a>
        <a href="/#access">店舗案内</a>
        <a href="https://www.instagram.com/reserve_shochiku" target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <div class="footer-meta">
        <a href="tel:0428244009">TEL {t["access.tel"]}</a>
        <span>© SHOCHIKU BARBER</span>
      </div>
    </footer>
);

export type Meta = {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  /** 省くと、トップ共通の og を使う */
  og?: { title: string; description: string; url: string };
  preloadHero?: boolean;
};

const KEYWORDS = "青梅市 床屋,青梅市 理容室,東青梅 床屋,東京 フェードカット,フェード,スキンフェード,濡れパン,パンチパーマ,アイロンパーマ,バーバー,松竹";
const DEFAULT_DESC = "東京都青梅市・東青梅の予約制床屋・理容室、ヘアーサロンリザーブ松竹。フェードカット、スキンフェード、濡れパン、パンチパーマ、アイロンパーマを二代目理容師が仕立てます。";

const structured = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "ヘアーサロンリザーブ松竹", alternateName: "松竹", inLanguage: "ja" },
    {
      "@type": ["HairSalon", "LocalBusiness"], "@id": `${SITE}/#shop`,
      name: "ヘアーサロンリザーブ松竹", alternateName: "松竹",
      description: "青梅市・東青梅の予約制床屋・理容室。フェード、濡れパン、パンチパーマ、アイロンパーマを得意とするバーバー。",
      url: `${SITE}/`, telephone: "+81-428-24-4009", image: `${SITE}/og.png`, logo: `${SITE}/images/shochiku-emblem.png`, priceRange: "¥¥",
      address: { "@type": "PostalAddress", postalCode: "198-0042", addressRegion: "東京都", addressLocality: "青梅市", streetAddress: "東青梅3-9-15", addressCountry: "JP" },
      geo: { "@type": "GeoCoordinates", latitude: 35.7881968, longitude: 139.2767353 },
      areaServed: ["青梅市", "東京都"],
      // 営業時間。月曜定休のため火〜日で書く（第2・第3火曜の休みは規則で表せないので本文に委ねる）。
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "19:00" }],
      hasMap: "https://maps.app.goo.gl/ZiTpnex6NHfdcQHy9",
      paymentAccepted: "現金, クレジットカード, 電子マネー, QRコード決済", currenciesAccepted: "JPY",
      amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "駐車場（3台）", value: true }],
      potentialAction: {
        "@type": "ReserveAction", name: "電話で予約する",
        target: { "@type": "EntryPoint", urlTemplate: "tel:+81428244009", inLanguage: "ja", actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] },
      },
      sameAs: ["https://www.instagram.com/reserve_shochiku", "https://maps.app.goo.gl/ZiTpnex6NHfdcQHy9"],
      hasOfferCatalog: {
        "@type": "OfferCatalog", name: "理容メニュー",
        itemListElement: ["フェードカット", "スキンフェード", "濡れパン", "パンチパーマ", "アイロンパーマ", "シェービング"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
  ],
};

export const Page: FC<{ meta: Meta; children?: any }> = ({ meta, children }) => {
  const canonical = `${SITE}${meta.canonical ?? "/"}`;
  const og = meta.og ?? { title: "青梅市の床屋・理容室 松竹｜受け継ぐ技。研ぎ澄ます粋。", description: "青梅市・東青梅で、フェード、濡れパン、パンチパーマを仕立てる予約制バーバー。", url: `${SITE}/` };
  const full = !meta.og;
  return (
    <>
    {raw("<!DOCTYPE html>")}
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description ?? DEFAULT_DESC} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="robots" content={meta.robots ?? "index, follow"} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        {full && <meta property="og:site_name" content="ヘアーサロンリザーブ松竹" />}
        {full && <meta property="og:type" content="website" />}
        {full && <meta property="og:locale" content="ja_JP" />}
        {full && <meta property="og:image" content={`${SITE}/og.png`} />}
        {full && <meta property="og:image:width" content="1200" />}
        {full && <meta property="og:image:height" content="630" />}
        {full && <meta property="og:image:alt" content="ヘアサロンリザーブ松竹" />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ヘアサロンリザーブ松竹" />
        <meta name="twitter:description" content="受け継ぐ技。研ぎ澄ます粋。" />
        <meta name="twitter:image" content={`${SITE}/og.png`} />
        <link rel="shortcut icon" href={`${SITE}/images/shochiku-emblem.png`} />
        <link rel="icon" href={`${SITE}/images/shochiku-emblem.png`} />
        <link rel="canonical" href={canonical} />
        <link rel="stylesheet" href="/site.css" />
        {meta.preloadHero && <link rel="preload" as="image" href="/_img?url=%2Fimages%2Fhero-nurepan-fictional-v3.png&w=640&q=75" imagesizes="100vw" fetchpriority="high" />}
      </head>
      <body>
        <script type="application/ld+json">{raw(JSON.stringify(structured).replace(/</g, "\\u003c"))}</script>
        {children}
      </body>
    </html>
    </>
  );
};
