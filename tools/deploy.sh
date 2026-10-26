#!/bin/bash
# ヘアーサロンリザーブ松竹（barber-shochiku.com）を Cloudflare へ配る
# ------------------------------------------------------------
#   bash tools/deploy.sh
#
# 置き先は、独立した箱「barber-shochiku.com」（wrangler.jsonc の account_id）。
# 組み上げの手順は無い（Worker のコードを、そのまま配る）。
set -e
cd "$(dirname "$0")/.."

npx tsc --noEmit
env -u CLOUDFLARE_API_TOKEN -u CLOUDFLARE_ACCOUNT_ID npx wrangler deploy -c wrangler.jsonc

echo
echo "--- 本番の確認 ---"
for u in https://barber-shochiku.com https://barber-shochiku.com/styles https://barber-shochiku.com/price https://barber-shochiku.com/faq; do
  printf "%-40s " "$u"
  curl -s -o /dev/null -w "HTTP %{http_code}\n" -L --max-time 25 "$u"
done
