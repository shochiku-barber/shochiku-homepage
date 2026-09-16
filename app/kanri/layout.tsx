import type { Metadata } from "next";

/* 管理室は検索に載せない */
export const metadata: Metadata = {
  title: "松竹 管理室",
  robots: { index: false, follow: false },
};

export default function KanriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
