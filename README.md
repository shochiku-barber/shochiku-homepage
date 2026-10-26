# 松竹 公式サイト（Hono 版）

Next.js 風の書き方をやめ、Cloudflare Worker 1本（Hono）で作り直した版。2026-10-26 から本番。
旧版（vinext 版）に戻すときは、git タグ `before-hono`（d093d8d）か、Cloudflare の旧版 1400a7f0 へ rollback。

- `src/index.tsx` … 入口（住所ごとの受け持ち、www 転送、写真の縮小、サイトマップ）
- `src/pages.tsx` … トップ・料金・仕上がり・よくあるご質問
- `src/components.tsx` … 共通部品（head・構造化データ・フッター・写真）
- `src/kanri-api.ts` / `src/reserve-api.ts` … 管理室の裏側、予約の受け口
- `public/kanri.js` … 管理室の画面（素の JavaScript）、`public/reserve.js` … 予約フォーム
- 文章・料金・写真の既定値は `src/content.ts`。管理室で直したものは KV が上書きする

## 本番と同じことの確かめ方
`python3 /tmp/cmp2.py 本番URL 試験URL / /price /styles /faq` のように、題名・meta・正規の住所・構造化データ・本文・画像・リンク・見出しを突き合わせた（一致）。

## 配備
`bash tools/deploy.sh`（型検査のあと `wrangler deploy -c wrangler.jsonc`）。

## 旧ドメインの転送ページ
`docs/` は GitHub Pages が配る、旧ドメイン shochiku-barber.com 用の転送ページ。作り直しは `node scripts/build-redirect-pages.mjs`。

## CSS について
`public/site.css` は、旧版（vinext 版）が配っていた、**Tailwind で組み上げ済みの CSS**（`index-BGpz_4R8.css`）をそのまま使っている。
元の文章は `styles/globals.source.css`（1行目が `@import "tailwindcss"`）。**このまま配っても動かない**（基本設定が取り込まれない）。
見た目を直すときは、`public/site.css` を直接直すか、Tailwind の CLI で組み上げ直す。
