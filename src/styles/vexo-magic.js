/*!
 * vexo-magic.js  v3.0
 * VEXO Real Estate — vexorealestate.com
 * Animaciones, scroll, micro-interacciones
 * Sin dependencias · Compatible con index.html existente
 */
(function (W) {
  "use strict";

  /* ── Utilidades ───────────────────────────────────────────── */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return (c || document).querySelectorAll(s); };

  function throttle(fn, ms) {
    var t = 0;
    return function () {
      var n = Date.now();
      if (n - t >= ms) { t = n; fn.apply(this, arguments); }
    };
  }

  function reducedMotion() {
    return W.matchMedia && W.matchMedia("(prefers-reduced-motion:reduce)").matches;
  }

  function vw() { return W.innerWidth || document.documentElement.clientWidth; }

  /* ── 1. REVEAL (IntersectionObserver) ────────────────────── */
  function initReveal() {
    var els = $$(".reveal,.reveal-l,.reveal-r,[data-vx-reveal]");

    if (reducedMotion()) {
      els.forEach(function (el) { el.classList.add("visible", "is-visible"); });
      return;
    }
    if (!W.IntersectionObserver) {
      els.forEach(function (el) { el.classList.add("visible", "is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.dataset.delay || el.dataset.vxDelay || "0", 10);
        setTimeout(function () {
          el.classList.add("visible", "is-visible");
        }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.07, rootMargin: "0px 0px -30px 0px" });

    els.forEach(function (el) { io.observe(el); });

    /* Fallback: forzar visible a los 2.5 s */
    setTimeout(function () {
      $$(".reveal,.reveal-l,.reveal-r").forEach(function (el) {
        el.classList.add("visible", "is-visible");
      });
    }, 2500);
  }

  /* Llamar después de renderizar contenido dinámico */
  W.vxRefreshReveal = function () { setTimeout(initReveal, 100); };

  /* ── 2. NAVBAR SCROLL ────────────────────────────────────── */
  function initNavbar() {
    var nb = $("#navbar");
    if (!nb) return;
    function update() {
      nb.classList.toggle("scrolled", (W.pageYOffset || document.documentElement.scrollTop) > 60);
    }
    W.addEventListener("scroll", throttle(update, 80), { passive: true });
    update();
  }

  /* ── 3. PREVENIR SCROLL HORIZONTAL ──────────────────────── */
  function initNoHScroll() {
    var s = document.createElement("style");
    s.textContent = "html,body{overflow-x:hidden!important;max-width:100vw}";
    document.head.appendChild(s);
  }

  /* ── 4. RIPPLE en botones .btn-p ─────────────────────────── */
  function initRipple() {
    if (reducedMotion()) return;

    /* Añadir keyframe una vez */
    if (!document.getElementById("vx-ripple-kf")) {
      var kf = document.createElement("style");
      kf.id = "vx-ripple-kf";
      kf.textContent = "@keyframes vxRipple{from{transform:scale(0);opacity:1}to{transform:scale(1);opacity:0}}";
      document.head.appendChild(kf);
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".btn-p");
      if (!btn) return;
      var r = document.createElement("span");
      var rect = btn.getBoundingClientRect();
      var sz = Math.max(rect.width, rect.height) * 1.6;
      r.style.cssText = [
        "position:absolute",
        "border-radius:50%",
        "pointer-events:none",
        "background:rgba(255,255,255,0.20)",
        "width:" + sz + "px",
        "height:" + sz + "px",
        "left:" + (e.clientX - rect.left - sz / 2) + "px",
        "top:" + (e.clientY - rect.top - sz / 2) + "px",
        "animation:vxRipple 0.55s ease-out both",
        "z-index:0"
      ].join(";");
      if (getComputedStyle(btn).position === "static") btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(r);
      setTimeout(function () { r.parentNode && r.parentNode.removeChild(r); }, 600);
    });
  }

  /* ── 5. CARD TILT 3D (solo desktop) ─────────────────────── */
  function initCardTilt() {
    if (reducedMotion() || vw() < 768) return;
    var MAX = 5;

    function applyTilt(card) {
      card.addEventListener("mouseenter", function () {
        card.style.transition = "transform 0.15s ease";
      });
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-y * MAX) + "deg) rotateY(" + (x * MAX) + "deg) translateY(-8px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
        card.style.transform = "";
        setTimeout(function () { card.style.transition = ""; }, 500);
      });
    }

    $$(".dev-card,.blog-card,.modelo-card").forEach(applyTilt);
  }

  /* ── 6. PARALLAX HERO (solo desktop) ────────────────────── */
  function initParallax() {
    if (reducedMotion() || vw() < 1024) return;
    var img = $(".hero-bg img, .vx-hero__bg img");
    if (!img) return;
    W.addEventListener("scroll", throttle(function () {
      img.style.transform = "translateY(" + (W.pageYOffset * 0.28) + "px) scale(1.05)";
    }, 16), { passive: true });
  }

  /* ── 7. CONTADORES ANIMADOS ──────────────────────────────── */
  function initCounters() {
    var els = $$("[data-vx-count]");
    if (!els.length || !W.IntersectionObserver) return;
    var done = new Set();

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || done.has(e.target)) return;
        done.add(e.target);
        var el = e.target;
        var target = parseFloat(el.dataset.vxCount) || 0;
        var suffix = el.dataset.vxSuffix || "";
        var prefix = el.dataset.vxPrefix || "";
        var dec    = parseInt(el.dataset.vxDecimals || "0", 10);
        var dur    = 1400;
        var start  = performance.now();

        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 4);
          el.textContent = prefix + (target * ease).toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = prefix + target.toFixed(dec) + suffix;
        })(start);

        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── 8. PILLS — pop en click ─────────────────────────────── */
  function initPillsPop() {
    if (reducedMotion()) return;
    document.addEventListener("click", function (e) {
      var pill = e.target.closest(".pill");
      if (!pill) return;
      pill.style.transform = "scale(0.93)";
      setTimeout(function () { pill.style.transform = ""; }, 110);
    });
  }

  /* ── 9. AUTO-SCROLL CHAT ─────────────────────────────────── */
  function initChatScroll() {
    var msgs = $("#chat-msgs");
    if (!msgs || !W.MutationObserver) return;
    new MutationObserver(function () {
      msgs.scrollTop = msgs.scrollHeight;
    }).observe(msgs, { childList: true });
  }

  /* ── 10. PAGE TRANSITIONS — re-init reveal ───────────────── */
  function initPageTransitions() {
    if (!W.MutationObserver) return;
    var obs = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.attributeName === "class" && m.target.classList.contains("active")) {
          setTimeout(function () {
            initReveal();
            initCardTilt();
          }, 150);
        }
      });
    });
    $$(".page").forEach(function (p) { obs.observe(p, { attributes: true }); });
  }

  /* ── 11. BARRA DE LECTURA (blog post) ───────────────────── */
  function initReadBar() {
    var bar = document.createElement("div");
    bar.id = "vx-read-bar";
    bar.style.cssText =
      "position:fixed;top:0;left:0;height:3px;width:0%;" +
      "background:linear-gradient(90deg,#d4891a,#e8a92a);" +
      "z-index:9999;transition:width 0.1s linear;pointer-events:none";
    document.body.appendChild(bar);

    W.addEventListener("scroll", throttle(function () {
      var bp = $("#page-blog-post");
      if (!bp || !bp.classList.contains("active")) { bar.style.width = "0%"; return; }
      var el = document.documentElement;
      var sc = el.scrollHeight - el.clientHeight;
      bar.style.width = (sc > 0 ? Math.min((el.scrollTop / sc) * 100, 100) : 0).toFixed(1) + "%";
    }, 40), { passive: true });
  }

  /* ── 12. LAZY IMAGES ─────────────────────────────────────── */
  function initLazy() {
    if (!W.IntersectionObserver) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var img = e.target;
        var src = img.dataset.src;
        if (!src) return;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.45s ease";
        img.src = src;
        img.onload  = function () { img.style.opacity = "1"; img.removeAttribute("data-src"); };
        img.onerror = function () {
          img.src = "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80";
          img.style.opacity = "1";
        };
        io.unobserve(img);
      });
    }, { rootMargin: "200px 0px" });

    $$("img[data-src]").forEach(function (img) { io.observe(img); });
  }
  W.vxRefreshLazy = initLazy;

  /* ── 13. HERO PARTÍCULAS (canvas, solo desktop) ──────────── */
  function initParticles() {
    if (reducedMotion() || vw() < 1024) return;
    var hero = $(".hero");
    if (!hero) return;

    var canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:0;opacity:0.5";
    hero.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var pts = [];
    var N = 35;
    var raf;

    function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }

    function newPt() {
      return { x: Math.random()*canvas.width, y: Math.random()*canvas.height,
               r: Math.random()*1.5+0.4, vx:(Math.random()-0.5)*0.28, vy:-(Math.random()*0.38+0.1),
               a: Math.random(), da:(Math.random()*0.005+0.002)*(Math.random()>.5?1:-1) };
    }

    resize();
    for (var i=0;i<N;i++) pts.push(newPt());

    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(function(p,i){
        p.x+=p.vx; p.y+=p.vy; p.a+=p.da;
        if(p.y<-4||p.x<-4||p.x>canvas.width+4){ pts[i]=newPt(); pts[i].y=canvas.height+4; return; }
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(212,137,26,"+Math.max(0,Math.min(1,p.a))+")";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    W.addEventListener("resize", throttle(resize, 200), { passive: true });
    document.addEventListener("visibilitychange", function(){
      document.hidden ? cancelAnimationFrame(raf) : draw();
    });
  }

  /* ── 14. KEYBOARD LIGHTBOX ───────────────────────────────── */
  function initLightboxKeys() {
    document.addEventListener("keydown", function (e) {
      var lb = $("#lightbox");
      if (!lb || !lb.classList.contains("open")) return;
      if (e.key === "Escape"     && W.closeLightbox) W.closeLightbox();
      if (e.key === "ArrowLeft"  && W.lbNav) W.lbNav(-1);
      if (e.key === "ArrowRight" && W.lbNav) W.lbNav(1);
    });
  }

  /* ── 15. API PÚBLICA ─────────────────────────────────────── */
  W.vxMagic = {
    version: "3.0.0",
    refreshReveal: W.vxRefreshReveal,
    refreshLazy:   W.vxRefreshLazy,
    initCards:     function () { initCardTilt(); }
  };

  /* Scroll top helper */
  W.vxScrollTop = function (beh) {
    try { W.scrollTo({ top: 0, behavior: beh || "smooth" }); }
    catch (e) { W.scrollTo(0, 0); }
  };

  /* ── INIT ────────────────────────────────────────────────── */
  function boot() {
    initNoHScroll();
    initNavbar();
    initReveal();
    initRipple();
    initCounters();
    initPillsPop();
    initChatScroll();
    initPageTransitions();
    initReadBar();
    initLazy();
    initLightboxKeys();

    /* Solo en dispositivos con hover real */
    if (W.matchMedia("(hover:hover)").matches) {
      initCardTilt();
      initParallax();
    }

    /* Solo desktop */
    if (vw() >= 1024) initParticles();

    console.info("[vexo-magic] v" + W.vxMagic.version + " ✓");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

}(window));