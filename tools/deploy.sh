#!/bin/bash
# ヘアーサロンリザーブ松竹（shochiku-barber.com）を Cloudflare へ配る
# ------------------------------------------------------------
#   bash tools/deploy.sh
#
# 置き先は **我が君（ノエル側）のアカウント**。wrangler の OAuth ログインで入る
# （制作事業側の鍵 CLOUDFLARE_API_TOKEN が環境に居ると、そちらへ飛んでしまうので外す）。
set -e
cd "$(dirname "$0")/.."

npm run build

# 生成される dist/server/wrangler.json には画像変換(IMAGES)とD1の口が無い。
# 必ず -c で自前の wrangler.jsonc を指すこと（-c を忘れると設定が読まれない）。
env -u CLOUDFLARE_API_TOKEN -u CLOUDFLARE_ACCOUNT_ID \
  npx wrangler deploy -c wrangler.jsonc

echo
echo "--- 本番の確認 ---"
for u in https://shochiku-barber.com https://shochiku-barber.com/styles; do
  printf "%-40s " "$u"
  curl -s -o /dev/null -w "HTTP %{http_code}\n" -L --max-time 25 "$u"
done
