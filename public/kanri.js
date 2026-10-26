/* 松竹 管理室（ブラウザ側）。合言葉で入り、直して、保存すると、すぐサイトに出る。
   フレームワークなしの素の JavaScript。画面の骨組みは /kanri が返し、中身はここで作る。 */
(function () {
  "use strict";
  const SECTIONS = [
    {
      title: "トップの見出し",
      fields: [
        ["hero.eyebrow", "小さな一言"],
        ["hero.title1", "大見出し（1行目）"],
        ["hero.title2", "大見出し（2行目）"],
        ["hero.lead1", "太字の一行"],
        ["hero.lead2", "その下の一行"],
        ["hero.technique", "得意技（英字）"],
      ],
    },
    {
      title: "心意気",
      fields: [
        ["spirit.kicker", "小見出し"],
        ["spirit.title1", "見出し（1行目）"],
        ["spirit.title2", "見出し（2行目）"],
        ["spirit.p1", "本文 1", "area"],
        ["spirit.p2", "本文 2", "area"],
        ["spirit.p3", "本文 3", "area"],
        ["spirit.signRole", "肩書き"],
        ["spirit.signName", "名前"],
      ],
    },
    {
      title: "仕上がり（見出し）",
      fields: [
        ["work.kicker", "小見出し"],
        ["work.note1", "説明（1行目）"],
        ["work.note2", "説明（2行目）"],
      ],
    },
    {
      title: "料金（見出しと注記）",
      fields: [
        ["menu.kicker", "小見出し"],
        ["menu.title1", "見出し（1行目）"],
        ["menu.title2", "見出し（2行目）"],
        ["menu.note", "注記", "area"],
        ["menu.fadeNote", "フェード欄・上の一言"],
        ["menu.fadeName", "フェード欄・名前"],
        ["menu.fadePrice", "フェード欄・料金"],
        ["menu.fadeSmall", "フェード欄・小さな説明"],
      ],
    },
    {
      title: "よくあるご質問（/faq のページ）",
      note: "質問と答えを両方書いたものだけがページに出ます。片方でも空にすれば、その一問は出ません。",
      fields: [
        ["faq.kicker", "小見出し"],
        ["faq.title1", "見出し（1行目）"],
        ["faq.title2", "見出し（2行目）"],
        ["faq.q1", "質問 1", "area"],
        ["faq.a1", "答え 1", "area"],
        ["faq.q2", "質問 2", "area"],
        ["faq.a2", "答え 2", "area"],
        ["faq.q3", "質問 3", "area"],
        ["faq.a3", "答え 3", "area"],
        ["faq.q4", "質問 4", "area"],
        ["faq.a4", "答え 4", "area"],
        ["faq.q5", "質問 5", "area"],
        ["faq.a5", "答え 5", "area"],
        ["faq.q6", "質問 6", "area"],
        ["faq.a6", "答え 6", "area"],
        ["faq.q7", "質問 7", "area"],
        ["faq.a7", "答え 7", "area"],
        ["faq.q8", "質問 8", "area"],
        ["faq.a8", "答え 8", "area"],
        ["faq.q9", "質問 9", "area"],
        ["faq.a9", "答え 9", "area"],
      ],
    },
    {
      title: "店主の紹介",
      fields: [
        ["profile.name", "名前"],
        ["profile.en", "名前（英字）"],
        ["profile.birthday", "生年月日"],
        ["profile.blood", "血液型"],
        ["profile.hobby", "趣味"],
        ["profile.skill", "得意技"],
        ["profile.message", "ひとこと", "area"],
      ],
    },
    {
      title: "店舗案内",
      fields: [
        ["access.kicker", "小見出し"],
        ["access.title1", "見出し（1行目）"],
        ["access.title2", "見出し（2行目）"],
        ["access.zip", "郵便番号"],
        ["access.address", "住所"],
        ["access.open", "営業時間"],
        ["access.closed1", "定休日（1行目）"],
        ["access.closed2", "定休日（2行目）"],
        ["access.reservation", "予約について"],
        ["access.tel", "電話番号（表示用）"],
        ["access.parking", "駐車場"],
        ["access.payment", "お支払い方法"],
      ],
    },
    {
      title: "フッターの説明文",
      note: "どのページの一番下にも出る、お店の説明です。検索にも読まれます。",
      fields: [
        ["footer.about", "説明文", "area"],
      ],
    },
  ];

  var KEY_STORE = "shochiku-kanri-key";
  var app = document.getElementById("app");
  var state = { key: "", content: null, msg: "", busy: false, uploadTarget: null };

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (k === "class") el.className = v;
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v);
      else if (k === "value") el.value = v;
      else if (v === true) el.setAttribute(k, "");
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  }

  function call(body, key) {
    var k = key == null ? state.key : key;
    return fetch("/api/kanri", {
      method: "POST",
      headers: { "content-type": "application/json", "x-kanri-key": k },
      body: JSON.stringify(body),
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok || !data.ok) throw new Error(data.error || "うまくいきませんでした");
        return data;
      });
    });
  }

  function upload(file) {
    var body = new FormData();
    body.append("file", file);
    return fetch("/api/kanri", { method: "POST", headers: { "x-kanri-key": state.key }, body: body }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok || !data.ok || !data.url) throw new Error(data.error || "写真を上げられませんでした");
        return data.url;
      });
    });
  }

  function setMsg(m) { state.msg = m; render(); }

  function save() {
    state.busy = true; state.msg = ""; render();
    call({ op: "save", content: state.content })
      .then(function () { state.msg = "保存しました。サイトにすぐ出ます。"; })
      .catch(function (e) { state.msg = e.message; })
      .then(function () { state.busy = false; render(); });
  }

  var fileInput = h("input", { type: "file", accept: "image/*", multiple: true, hidden: true });
  fileInput.addEventListener("change", function () {
    var files = Array.prototype.slice.call(fileInput.files || []);
    fileInput.value = "";
    if (!files.length || !state.content) return;
    state.busy = true; state.msg = "写真を上げています…"; render();
    var shots = state.content.styles.slice();
    files.reduce(function (p, file) {
      return p.then(function () {
        return upload(file).then(function (url) {
          if (state.uploadTarget === null) shots.push({ src: url, alt: "" });
          else shots[state.uploadTarget] = { src: url, alt: shots[state.uploadTarget].alt };
        });
      });
    }, Promise.resolve())
      .then(function () {
        state.content.styles = shots;
        state.msg = "写真を入れました。最後に「保存する」を押してください。";
      })
      .catch(function (e) { state.msg = e.message; })
      .then(function () { state.busy = false; state.uploadTarget = null; render(); });
  });

  function gate() {
    var input = h("input", { type: "password", autocomplete: "current-password" });
    var note = h("p", { class: "ng" }, [state.msg]);
    var form = h("form", { onsubmit: function (ev) {
      ev.preventDefault();
      state.key = input.value;
      call({ op: "load" }, state.key).then(function (d) {
        try { localStorage.setItem(KEY_STORE, state.key); } catch (e) {}
        state.content = d.content; state.msg = ""; render();
      }).catch(function (e) { state.msg = e.message; render(); });
    } }, [h("h1", null, ["松竹 管理室"]), h("p", null, ["合言葉をどうぞ"]), input, h("button", { type: "submit" }, ["入る"]), state.msg ? note : null]);
    return h("main", { class: "kanri-gate" }, [form]);
  }

  function field(texts, k, label, kind) {
    var el = kind === "area"
      ? h("textarea", { rows: "3", value: texts[k] || "", oninput: function (e) { texts[k] = e.target.value; } })
      : h("input", { value: texts[k] || "", oninput: function (e) { texts[k] = e.target.value; } });
    return h("label", { class: kind === "area" ? "wide" : "" }, [h("span", null, [label]), el]);
  }

  function menuBlock(c, gi) {
    var group = c.menu[gi];
    function bind(prop) { return function (e) { group[prop] = e.target.value; }; }
    var rows = group.items.map(function (item, ii) {
      return h("tr", null, [
        h("td", null, [h("input", { value: item[0], oninput: function (e) { item[0] = e.target.value; } })]),
        h("td", null, [h("input", { value: item[1], oninput: function (e) { item[1] = e.target.value; } })]),
        h("td", null, [h("button", { onclick: function () { group.items.splice(ii, 1); render(); } }, ["消す"])]),
      ]);
    });
    return h("div", { class: "kanri-menu" }, [
      h("div", { class: "kanri-fields" }, [
        h("label", null, [h("span", null, ["英字ラベル"]), h("input", { value: group.label, oninput: bind("label") })]),
        h("label", null, [h("span", null, ["見出し"]), h("input", { value: group.title, oninput: bind("title") })]),
        h("label", { class: "wide" }, [h("span", null, ["注記"]), h("input", { value: group.note, oninput: bind("note") })]),
      ]),
      h("table", null, [h("tbody", null, rows)]),
      h("button", { class: "ghost", onclick: function () { group.items.push(["", ""]); render(); } }, ["＋ 品目を足す"]),
    ]);
  }

  function shotBlock(c, i) {
    var shot = c.styles[i];
    function swap(a, b) { var t = c.styles[a]; c.styles[a] = c.styles[b]; c.styles[b] = t; render(); }
    return h("figure", null, [
      h("img", { src: shot.src, alt: "", loading: "lazy" }),
      h("figcaption", null, [
        h("input", { value: shot.alt, placeholder: "写真の説明（検索に効きます）", oninput: function (e) { shot.alt = e.target.value; } }),
        h("div", null, [
          h("button", { onclick: function () { state.uploadTarget = i; fileInput.click(); } }, ["入替"]),
          h("button", { onclick: function () { if (i > 0) swap(i - 1, i); } }, ["↑"]),
          h("button", { onclick: function () { if (i < c.styles.length - 1) swap(i + 1, i); } }, ["↓"]),
          h("button", { class: "danger", onclick: function () { c.styles.splice(i, 1); render(); } }, ["消す"]),
        ]),
      ]),
    ]);
  }

  function editor() {
    var c = state.content;
    var saveBtn = function () { return h("button", { onclick: save, disabled: state.busy }, [state.busy ? "保存中…" : "保存する"]); };
    var secs = SECTIONS.map(function (sec) {
      var fields = sec.fields.map(function (f) { return field(c.texts, f[0], f[1], f[2]); });
      return h("section", { class: "kanri-box" }, [
        h("h2", null, [sec.title]),
        sec.note ? h("p", { class: "kanri-note" }, [sec.note]) : null,
        h("div", { class: "kanri-fields" }, fields),
      ]);
    });
    var menuSec = h("section", { class: "kanri-box" }, [h("h2", null, ["料金表"])].concat(c.menu.map(function (_, gi) { return menuBlock(c, gi); })));
    var strong = h("strong", null, ["最初の4枚"]);
    var shotSec = h("section", { class: "kanri-box" }, [
      h("h2", null, ["仕上がりの写真"]),
      h("p", { class: "kanri-note" }, ["上から順に並びます。トップページに出るのは", strong, "、「仕上がり」のページには全部出ます。"]),
      fileInput,
      h("button", { class: "ghost", disabled: state.busy, onclick: function () { state.uploadTarget = null; fileInput.click(); } }, ["＋ 写真を足す"]),
      h("div", { class: "kanri-shots" }, c.styles.map(function (_, i) { return shotBlock(c, i); })),
    ]);
    return h("main", { class: "kanri" }, [
      h("header", { class: "kanri-head" }, [
        h("div", null, [h("h1", null, ["松竹 管理室"]), h("p", null, ["直したら、いちばん下（またはこの右）の「保存する」を押してください。"])]),
        h("div", { class: "kanri-actions" }, [h("a", { href: "/", target: "_blank", rel: "noreferrer" }, ["サイトを見る ↗"]), saveBtn()]),
      ]),
      state.msg ? h("p", { class: "kanri-msg" }, [state.msg]) : null,
    ].concat(secs, [menuSec, shotSec, h("div", { class: "kanri-foot" }, [saveBtn(), state.msg ? h("span", null, [state.msg]) : null])]));
  }

  /* 入力中は作り直さない（カーソルが飛ぶため）。ボタン操作のあとだけ描き直す */
  function render() {
    var active = document.activeElement;
    var keep = active && active.tagName && /INPUT|TEXTAREA/.test(active.tagName) ? null : null;
    app.textContent = "";
    app.appendChild(state.content ? editor() : gate());
    void keep;
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY_STORE); } catch (e) {}
  if (saved) {
    state.key = saved;
    call({ op: "load" }, saved)
      .then(function (d) { state.content = d.content; render(); })
      .catch(function () { try { localStorage.removeItem(KEY_STORE); } catch (e) {} render(); });
  } else render();
})();
