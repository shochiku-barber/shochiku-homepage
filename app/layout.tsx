import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shochiku-barber.com"),
  title: "ヘアサロンリザーブ松竹｜青梅の粋な床屋",
  description: "東京都青梅市で創業48年。二代目・二瓶雅士が、フェード、刈り上げ、アイロンパーマで粋な男の髪型を仕立てる予約制の床屋です。",
  keywords: ["青梅 床屋", "東青梅 理容室", "フェード", "アイロンパーマ", "松竹"],
  openGraph: {
    title: "ヘアサロンリザーブ松竹｜受け継ぐ技。研ぎ澄ます粋。",
    description: "創業48年、二代目・二瓶雅士が仕立てる粋な男の髪型。",
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
  icons: { icon: "/images/nihei-kamon.jpg", shortcut: "/images/nihei-kamon.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
