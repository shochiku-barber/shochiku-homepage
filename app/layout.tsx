import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shochiku-barber.com"),
  title: "青梅市の床屋・理容室 松竹｜フェード・濡れパン・パンチパーマ",
  description: "東京都青梅市・東青梅の予約制床屋・理容室、ヘアーサロンリザーブ松竹。フェードカット、スキンフェード、濡れパン、パンチパーマ、アイロンパーマを二代目理容師が仕立てます。",
  keywords: ["青梅市 床屋", "青梅市 理容室", "東青梅 床屋", "東京 フェードカット", "フェード", "スキンフェード", "濡れパン", "パンチパーマ", "アイロンパーマ", "バーバー", "松竹"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "青梅市の床屋・理容室 松竹｜受け継ぐ技。研ぎ澄ます粋。",
    description: "青梅市・東青梅で、フェード、濡れパン、パンチパーマを仕立てる予約制バーバー。",
    url: "https://shochiku-barber.com/",
    siteName: "ヘアーサロンリザーブ松竹",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ヘアサロンリザーブ松竹" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ヘアサロンリザーブ松竹",
    description: "受け継ぐ技。研ぎ澄ます粋。",
    images: ["/og.png"],
  },
  icons: { icon: "/images/shochiku-emblem.png", shortcut: "/images/shochiku-emblem.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://shochiku-barber.com/#website",
        url: "https://shochiku-barber.com/",
        name: "ヘアーサロンリザーブ松竹",
        alternateName: "松竹",
        inLanguage: "ja",
      },
      {
        "@type": ["HairSalon", "LocalBusiness"],
        "@id": "https://shochiku-barber.com/#shop",
        name: "ヘアーサロンリザーブ松竹",
        alternateName: "松竹",
        description: "青梅市・東青梅の予約制床屋・理容室。フェード、濡れパン、パンチパーマ、アイロンパーマを得意とするバーバー。",
        url: "https://shochiku-barber.com/",
        telephone: "+81-428-24-4009",
        image: "https://shochiku-barber.com/og.png",
        logo: "https://shochiku-barber.com/images/shochiku-emblem.png",
        priceRange: "¥¥",
        address: {
          "@type": "PostalAddress",
          postalCode: "198-0042",
          addressRegion: "東京都",
          addressLocality: "青梅市",
          streetAddress: "東青梅3-9-15",
          addressCountry: "JP",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 35.7881968,
          longitude: 139.2767353,
        },
        areaServed: ["青梅市", "東京都"],
        // 営業時間。Googleが「いま開いているか」を判断する材料になる。
        // 月曜定休のため火〜日で書く（第2・第3火曜の休みは規則で表せないので本文に委ねる）。
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        hasMap: "https://maps.app.goo.gl/ZiTpnex6NHfdcQHy9",
        // 支払い方法と駐車場。Googleのビジネス情報と食い違わないよう、事実だけを書く。
        paymentAccepted: "現金, クレジットカード, 電子マネー, QRコード決済",
        currenciesAccepted: "JPY",
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "駐車場（3台）", value: true },
        ],
        // 予約は電話が本線。検索結果から直接かけられるようにする。
        potentialAction: {
          "@type": "ReserveAction",
          name: "電話で予約する",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "tel:+81428244009",
            inLanguage: "ja",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
        },
        sameAs: [
          "https://www.instagram.com/reserve_shochiku",
          "https://maps.app.goo.gl/ZiTpnex6NHfdcQHy9",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "理容メニュー",
          itemListElement: ["フェードカット", "スキンフェード", "濡れパン", "パンチパーマ", "アイロンパーマ", "シェービング"].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
    ],
  };

  return (
    <html lang="ja">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
