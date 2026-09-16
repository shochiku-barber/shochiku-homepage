/**
 * サイトの中身（文章・料金・写真）。
 *
 * 既定値はこのファイルに書いてある。管理室（/kanri）で直したものは
 * KV に入り、こちらを上書きする。**KVが空でもサイトは既定値で動く。**
 * ——倉庫が落ちても店は開ける、という考え方。
 */
import { env } from "cloudflare:workers";

export type MenuGroup = { label: string; title: string; note: string; items: [string, string][] };
export type StyleShot = { src: string; alt: string };

export type Content = {
  texts: Record<string, string>;
  menu: MenuGroup[];
  styles: StyleShot[];
};

/* ---- 既定値（いまサイトに出ている文章） ---- */

export const DEFAULT_TEXTS: Record<string, string> = {
  "hero.eyebrow": "古き魂。新しき刃。",
  "hero.title1": "受け継ぐ技。",
  "hero.title2": "研ぎ澄ます粋。",
  "hero.lead1": "松竹が創る、フェード濡れパン。",
  "hero.lead2": "一人ひとりの輪郭を、一本の線で決める。",
  "hero.technique": "FADE × IRON PERM",

  "spirit.kicker": "生粋の、床屋育ち。",
  "spirit.title1": "男の輪郭を、",
  "spirit.title2": "一本の線で決める。",
  "spirit.p1": "1977年の創業以来、床屋の仕事を受け継いできました。先代から学んだ基本を守りながら、フェード、アイロンパーマ、クラシカルなスタイルを今の感覚で仕立てます。",
  "spirit.p2": "流行だけでは終わらない。その人の生き方まで凛と見える髪型を。松竹が目指すのは、いつの時代も「粋な男の髪型」です。",
  "spirit.p3": "青梅市・東青梅の床屋、理容室として、フェードカット、濡れパン、パンチパーマ、アイロンパーマを一人ひとりに合わせて仕立てます。",
  "spirit.signRole": "二代目代表",
  "spirit.signName": "二瓶 雅士",

  "work.kicker": "仕上がりが、答え。",
  "work.note1": "骨格、髪質、仕事、日々の手入れ。",
  "work.note2": "その男に似合う一手を見極める。",

  "menu.kicker": "手を抜かない。飾らない。",
  "menu.title1": "粋を整える、",
  "menu.title2": "床屋の仕事。",
  "menu.note": "料金はすべて税込です。髪の長さや施術内容により料金が変わる場合は、施術前にお伝えします。",
  "menu.fadeNote": "すべてのカットを含むメニューが対象",
  "menu.fadeName": "フェード・スキンフェード",
  "menu.fadePrice": "＋¥300",
  "menu.fadeSmall": "0.4mm以下の短さをご希望の場合",

  "profile.name": "二瓶 雅士",
  "profile.en": "MASASHI NIHEI",
  "profile.birthday": "1982年8月4日",
  "profile.blood": "O型",
  "profile.hobby": "お祭り・お面集め・高校野球",
  "profile.skill": "フェード・刈り上げ・アイロンパーマ",
  "profile.message": "髪型は、男の自信と魅力を引き立てるもの。床屋の基本を大切に、一人ひとりの「粋」を形にします。",

  "access.kicker": "ご予約の上、お越しください。",
  "access.title1": "男を整える、",
  "access.title2": "粋な床屋。",
  "access.zip": "〒198-0042",
  "access.address": "東京都青梅市東青梅3-9-15",
  "access.open": "9:00 — 19:00",
  "access.closed1": "毎週月曜日",
  "access.closed2": "第2・第3火曜日",
  "access.reservation": "予約制",
  "access.tel": "0428-24-4009",
  "access.parking": "3台",
  "access.payment": "現金・カード・電子マネー・QR決済",

  /* フッターの説明文。どのページにも出る。検索にも読ませる ---- */
  "footer.about": "ヘアーサロンリザーブ松竹は、東京都青梅市東青梅3-9-15の理容室・床屋です。1977年の創業から二代にわたり、フェードカット、スキンフェード、濡れパン、アイロンパーマ、パンチパーマ、カット、カラー、シェービングを承っています。JR青梅線・東青梅駅が最寄りで、駐車場は3台。9:00から19:00まで予約制で営業しており、定休日は毎週月曜日と第2・第3火曜日です。お支払いは現金のほか、クレジットカード・電子マネー・QRコード決済をご利用いただけます。ご予約はお電話（0428-24-4009）またはLINEから承ります。",

  /* ---- よくあるご質問。検索でそのまま尋ねられる言葉に、店の言葉で答える ---- */
  "faq.kicker": "来る前に、知っておきたいこと。",
  "faq.title1": "よくある",
  "faq.title2": "ご質問。",
  "faq.q1": "予約は必要ですか？",
  "faq.a1": "予約制のお店です。お電話（0428-24-4009）またはLINEからご予約ください。ご希望の日時をお伝えいただければ、こちらで空きをお調べします。",
  "faq.q2": "駐車場はありますか？",
  "faq.a2": "はい、3台分の駐車場をご用意しています。お車でお越しいただけます。満車のこともありますので、気になるときはご予約の際にお尋ねください。",
  "faq.q3": "支払いは現金だけですか？",
  "faq.a3": "いいえ。現金のほか、クレジットカード・電子マネー・QRコード決済でのお支払いにも対応しています。",
  "faq.q4": "営業時間と定休日を教えてください。",
  "faq.a4": "9:00から19:00まで営業しています。定休日は毎週月曜日と、第2・第3火曜日です。",
  "faq.q5": "フェードは追加料金がかかりますか？",
  "faq.a5": "フェード・スキンフェードは、カットを含むメニューに＋300円で承ります。0.4mm以下の短さをご希望の場合も、同じ料金です。",
  "faq.q6": "学生の料金はありますか？",
  "faq.a6": "高校生・中学生・小学生それぞれの料金をご用意しています。金額は料金表をご覧ください。",
  "faq.q7": "髪型が決まっていなくても大丈夫ですか？",
  "faq.a7": "問題ありません。骨格や髪質、お仕事の決まりごと、ふだん手入れにかけられる時間をうかがったうえで、似合う形をご提案します。写真をお持ちいただけると、より確かです。",
  "faq.q8": "場所はどこですか？",
  "faq.a8": "東京都青梅市東青梅3-9-15です。JR青梅線・東青梅駅が最寄りになります。詳しい道順は、店舗案内の地図をご覧ください。",
  "faq.q9": "はじめてでも入りやすいですか？",
  "faq.a9": "はじめての方も多くお越しになります。仕上がりは「STYLE ARCHIVE」でご覧いただけますので、気になる髪型を見つけてからお越しいただくのもおすすめです。ご不安な点は、LINEで先にご相談いただけます。",
};

export const DEFAULT_MENU: MenuGroup[] = [
  {
    label: "CUT", title: "カット", note: "シャンプー・シェービング・ブロー込み",
    items: [["大人", "¥4,500"], ["高校生", "¥4,000"], ["中学生", "¥3,200"], ["小学生", "¥2,700"]],
  },
  {
    label: "PERM", title: "パーマ", note: "カット・シャンプー・シェービング・ブロー込み",
    items: [["アイロンパーマ", "¥9,300〜"], ["アイパー", "¥9,300〜"], ["ニグロパーマ（コテ）", "¥11,000〜"], ["コールドパーマ", "¥9,500〜"], ["ツイスト・スパイラル", "¥13,000〜"]],
  },
  {
    label: "COLOR", title: "カラー", note: "カット・シャンプー・シェービング・ブロー込み",
    items: [["カット＆カラー", "¥7,000〜"]],
  },
];

export const DEFAULT_STYLES: StyleShot[] = [
  { src: "/images/style-01.jpg", alt: "クロップスタイルとスキンフェード" },
  { src: "/images/style-05.jpg", alt: "動きのあるパーマとフェード" },
  { src: "/images/style-08.jpg", alt: "メッシュパーマとフェード" },
  { src: "/images/style-12.jpg", alt: "クラシカルな七三スタイル" },
  { src: "/images/style-14.jpg", alt: "短めクロップとフェード" },
  { src: "/images/style-18.jpg", alt: "アイロンパーマのクラシックスタイル" },
  { src: "/images/style-19.jpg", alt: "強めカールとフェード" },
  { src: "/images/style-22.jpg", alt: "清潔感のあるボウズフェード" },
  { src: "/images/style-24.jpg", alt: "ハイライトを効かせたフェード" },
  { src: "/images/style-27.jpg", alt: "大人のパーマスタイル" },
  { src: "/images/style-29.jpg", alt: "柔らかなウェーブとフェード" },
  { src: "/images/style-35.jpg", alt: "カーリーヘアとスキンフェード" },
  { src: "/images/style-02.jpg", alt: "クロップスタイルとフェード" },
  { src: "/images/style-03.jpg", alt: "クラシカルクロップとフェード" },
  { src: "/images/style-04.jpg", alt: "ショートクロップとスキンフェード" },
  { src: "/images/style-06.jpg", alt: "ショートアイロンパーマとフェード" },
  { src: "/images/style-07.jpg", alt: "ウェーブクロップとフェード" },
  { src: "/images/style-09.jpg", alt: "クラシカルクロップとスキンフェード" },
  { src: "/images/style-15.jpg", alt: "アイロンパーマとスキンフェード" },
  { src: "/images/style-16.jpg", alt: "濡れパンとスキンフェード" },
  { src: "/images/style-20.jpg", alt: "ショートクロップとフェード" },
  { src: "/images/style-21.jpg", alt: "ベリーショートとフェード" },
  { src: "/images/style-23.jpg", alt: "ボウズフェードとラインアップ" },
  { src: "/images/style-25.jpg", alt: "ウェーブボウズとスキンフェード" },
  { src: "/images/style-26.jpg", alt: "アイロンパーマのショートフェード" },
  { src: "/images/style-28.jpg", alt: "ボウズフェードとラインアップ" },
  { src: "/images/style-30.jpg", alt: "ナチュラルクロップとフェード" },
];

export const DEFAULTS: Content = { texts: DEFAULT_TEXTS, menu: DEFAULT_MENU, styles: DEFAULT_STYLES };

type Store = { CONTENT?: KVNamespace };

/** 管理室で直したものを読む。無ければ既定値。 */
export async function readContent(): Promise<Content> {
  const kv = (env as unknown as Store).CONTENT;
  if (!kv) return DEFAULTS;
  try {
    const raw = await kv.get("content");
    if (!raw) return DEFAULTS;
    const saved = JSON.parse(raw) as Partial<Content>;
    return {
      texts: { ...DEFAULT_TEXTS, ...(saved.texts ?? {}) },
      menu: Array.isArray(saved.menu) && saved.menu.length ? saved.menu : DEFAULT_MENU,
      styles: Array.isArray(saved.styles) && saved.styles.length ? saved.styles : DEFAULT_STYLES,
    };
  } catch {
    return DEFAULTS;
  }
}
