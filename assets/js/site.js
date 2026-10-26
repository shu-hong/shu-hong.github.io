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

  // News: show the list in a fixed-height scroll area with a fade that clears at the end.
  document.querySelectorAll("ul.news, #news + ul").forEach(function (list) {
    var box = document.createElement("div");
    box.className = "news-scroll";
    box.tabIndex = 0;
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "News");
    list.parentNode.insertBefore(box, list);
    box.appendChild(list);
    var update = function () {
      box.classList.toggle("is-end", box.scrollTop + box.clientHeight >= box.scrollHeight - 2);
    };
    box.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
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
