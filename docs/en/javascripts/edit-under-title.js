// Show a per-page "Edit this page" link under the main H1.
// We reuse the existing Material edit button URL so it always points to the exact source file.
(function () {
  function getLabel() {
    var lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return lang.startsWith("zh") ? "编辑此页" : "Edit this page";
  }

  function findEditUrl() {
    var candidates = document.querySelectorAll("a.md-content__button");
    if (!candidates || !candidates.length) return "";
    for (var i = 0; i < candidates.length; i++) {
      var href = candidates[i].getAttribute("href") || "";
      if (!href) continue;
      if (href.indexOf("/edit/") !== -1 || href.indexOf("/blob/") !== -1) return href;
    }
    return candidates[0].getAttribute("href") || "";
  }

  function inject() {
    var main = document.querySelector(".md-content__inner");
    if (!main) return;
    if (main.querySelector(".pm-edit-under-title")) return;

    var h1 = main.querySelector("h1");
    if (!h1) return;

    var url = findEditUrl();
    if (!url) return;

    var wrap = document.createElement("div");
    wrap.className = "pm-edit-under-title";
    wrap.innerHTML =
      '<a class="pm-edit-under-title__link" href="' +
      url +
      '" target="_blank" rel="noopener noreferrer">' +
      getLabel() +
      "</a>";
    h1.insertAdjacentElement("afterend", wrap);
  }

  document.addEventListener("DOMContentLoaded", inject);
  document.addEventListener("navigation:complete", inject);
  var doc$ = window.document$;
  if (doc$ && typeof doc$.subscribe === "function") {
    doc$.subscribe(function () {
      requestAnimationFrame(inject);
    });
  }
})();

