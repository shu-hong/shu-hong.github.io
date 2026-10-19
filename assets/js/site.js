(function () {
  var root = document.documentElement;

  // Light / dark toggle. The initial theme is set inline in <head> to avoid a flash.
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Follow the OS setting until the visitor picks a theme explicitly.
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem("theme"); } catch (err) {}
      if (!saved) root.setAttribute("data-theme", e.matches ? "dark" : "light");
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
  }

  // Mobile menu.
  var menuBtn = document.querySelector(".navbar__menu-btn");
  var links = document.getElementById("nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // News: show the most recent items, fold the rest behind a button.
  var NEWS_VISIBLE = 6;
  document.querySelectorAll("ul.news, #news + ul").forEach(function (list) {
    var items = list.querySelectorAll(":scope > li");
    if (items.length <= NEWS_VISIBLE + 2) return;
    list.classList.add("is-collapsed");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "news__more";
    btn.textContent = "Show earlier news";
    btn.addEventListener("click", function () {
      var collapsed = list.classList.toggle("is-collapsed");
      btn.textContent = collapsed ? "Show earlier news" : "Show less";
    });
    list.insertAdjacentElement("afterend", btn);
  });

  // Open external sites and files (PDFs, slides) in a new tab; links between site pages stay in place.
  document.querySelectorAll("a[href]").forEach(function (a) {
    if (!/^https?:$/.test(a.protocol)) return;
    var external = a.host !== window.location.host;
    var file = /\.(pdf|pptx?|zip)$/i.test(a.pathname) || a.pathname.indexOf("/files/") === 0;
    if (!external && !file) return;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
})();
