/* 予約フォームの送信（フレームワークなしの素の JavaScript） */
(function () {
  var opened = Date.now();
  var form = document.getElementById("rf");
  var btn = document.getElementById("rb");
  var err = document.getElementById("re");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    err.hidden = true;
    var body = new FormData(form);
    body.append("t", String(opened));
    btn.disabled = true;
    btn.firstChild.textContent = "送信中…";
    fetch("/api/reserve", { method: "POST", body: body })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (d) {
        if (!res.ok || !d.ok) throw new Error(d.error || "送信できませんでした");
      }); })
      .then(function () {
        document.getElementById("form-box").hidden = true;
        document.getElementById("done-box").hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(function (e) {
        err.textContent = e.message + "　恐れ入りますが、お電話（0428-24-4009）でご連絡ください。";
        err.hidden = false;
      })
      .then(function () { btn.disabled = false; btn.firstChild.textContent = "この内容で申し込む"; });
  });
})();
