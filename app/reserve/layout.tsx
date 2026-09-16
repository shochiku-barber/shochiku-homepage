import type { Metadata } from "next";

/* まだ表に出していないページ。検索には載せない。 */
export const metadata: Metadata = {
  title: "ご予約の申し込み｜ヘアーサロンリザーブ松竹",
  robots: { index: false, follow: false },
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
