# vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)

---

## Cloudflare への移設（2026-09-16）

このサイトは GitHub Pages（`docs/` の静的な写し）で公開していたが、
中身はもともと Cloudflare Workers で動く造り（`worker/`・D1・画像変換）だったため、
**本来の場所へ戻した。**

- 置き先：**我が君（ノエル側）の Cloudflare アカウント**（身内のサイトのため）
- Worker 名：`shochiku-homepage`
- 配備：`bash tools/deploy.sh`（`-c wrangler.jsonc` を必ず付ける。付けないと設定が読まれない）
- 画像変換 `/_vinext/image` には `images` binding が要る（無いと 500 で写真が出ない）

### 予約フォーム（まだ表に出していない）

- 画面：`/reserve`（どこからもリンクしていない・`noindex`）
- 受け口：`app/api/reserve/route.ts`
- 倉庫：D1 `shochiku-reserve`（表 `reservations`）
- 店への知らせ：`app/api/reserve/route.ts` の `SHOP_EMAIL` に受け取り先を入れ、
  Cloudflare 側でその宛先を「検証済み」にすると出るようになる。
  **入れるまでは D1 に残るだけ**（申し込みは失われない）

出すときは、店舗案内の「電話で予約する」の隣に `/reserve` への導線を足す。

### 管理室（/kanri）

弟さんが文章・料金・写真を自分で直せる。合言葉は Worker のシークレット `KANRI_KEY`
（控えは `deploy/合言葉.txt`。**git には入れない**）。

- 画面：`app/kanri/page.tsx`（直す欄を足すときは `SECTIONS` に1行）
- 裏側：`app/api/kanri/route.ts`（check / load / save / 写真の受け取り）
- 中身：`app/content.ts` に**既定値**、直したものは KV `CONTENT` の `content` に入る
  → **KVが空でもサイトは既定値で動く**（倉庫が落ちても店は開ける）
- 写真：KV に `img:<id>` で入り、`/img/<id>` で配る
- ページは `export const dynamic = "force-dynamic"` で毎回 KV を読む

直せるもの：トップの見出し／心意気／仕上がりの見出し／料金（見出し・注記・品目と値段）／
店主の紹介／店舗案内（住所・営業時間・定休日・電話）／仕上がりの写真（入替・並べ替え・追加・削除）
