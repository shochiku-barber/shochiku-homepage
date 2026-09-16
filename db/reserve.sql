-- 予約の申し込みを受ける倉庫
-- 「まだ出していない」仕組み。導線を出す時が来たら、そのまま使える。
CREATE TABLE IF NOT EXISTS reservations (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,           -- お名前
  kana        TEXT,                    -- ふりがな
  tel         TEXT NOT NULL,           -- 電話（床屋の予約は電話が要）
  email       TEXT,                    -- あれば
  menu        TEXT,                    -- フェード / パンチパーマ …
  wish1       TEXT NOT NULL,           -- 第一希望（日時）
  wish2       TEXT,                    -- 第二希望
  note        TEXT,                    -- ご要望
  state       TEXT NOT NULL DEFAULT '未確認',  -- 未確認 / 確定 / お断り
  mailed      INTEGER NOT NULL DEFAULT 0,     -- 店へ知らせが出せたか
  ua          TEXT,
  ip          TEXT,
  created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_res_created ON reservations (created_at DESC);
