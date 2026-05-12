/* ═══════════════════════════════════════════════════════════
   VEXO PREMIUM — vexo-magic.js  v2.1
   Mejoras de UI puras. NO toca routing ni la página de mapa
   que ya está declarada estáticamente en el HTML.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── 1. SCROLL REVEAL (clases vx-*) ──────────────────────── */
  function initReveal() {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vx-in");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    document
      .querySelectorAll(
        ".vx-reveal, .vx-reveal-l, .vx-reveal-r, .vx-reveal-scale",
      )
      .forEach((el) => obs.observe(el));
  }

  /* ── 2. NAVBAR GLASS ON SCROLL ───────────────────────────── */
  function initNavbar() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const onScroll = () =>
      nav.classList.toggle("vx-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── 3. RIPPLE EFFECT ────────────────────────────────────── */
  function initRipple() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".vx-btn, .btn-p, .btn");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement("span");
      ripple.className = "vx-ripple-wave";
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;position:absolute;`;
      btn.style.position = btn.style.position || "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  /* ── 4. MAGNETIC BUTTONS ─────────────────────────────────── */
  function initMagnetic() {
    document.querySelectorAll(".vx-magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.18;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ── 5. PARALLAX TILT 3D ─────────────────────────────────── */
  function initTilt() {
    document.querySelectorAll(".vx-tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const inner = card.querySelector(".vx-tilt-inner") || card;
        inner.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        const inner = card.querySelector(".vx-tilt-inner") || card;
        inner.style.transform = "";
      });
    });
  }

  /* ── 6. COUNTER ANIMATION ────────────────────────────────── */
  function animateCounter(el) {
    const raw = el.dataset.target || el.textContent.replace(/[^0-9.]/g, "");
    const target = parseFloat(raw) || 0;
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const duration = 1600;
    const start = performance.now();
    const isFloat = String(target).includes(".");
    function update(now) {
      const elapsed = Math.min(now - start, duration);
      const progress = 1 - Math.pow(1 - elapsed / duration, 4);
      const value = progress * target;
      el.textContent =
        prefix +
        (isFloat
          ? value.toFixed(1)
          : Math.round(value).toLocaleString("es-MX")) +
        suffix;
      if (elapsed < duration) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  function initCounters() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll(".vx-counter").forEach((el) => obs.observe(el));
  }

  /* ── 7. HERO PARTICLES ───────────────────────────────────── */
  function initParticles() {
    const wrap = document.querySelector(".vx-hero-particles");
    if (!wrap || wrap.children.length > 0) return;
    for (let i = 0; i < 16; i++) {
      const p = document.createElement("div");
      p.className = "vx-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.bottom = Math.random() * 30 + "%";
      const sz = Math.random() * 3 + 1 + "px";
      p.style.width = sz;
      p.style.height = sz;
      p.style.animationDuration = Math.random() * 6 + 4 + "s";
      p.style.animationDelay = Math.random() * 6 + "s";
      p.style.opacity = String(Math.random() * 0.6 + 0.2);
      if (Math.random() > 0.5) p.style.background = "rgba(19,236,218,.7)";
      wrap.appendChild(p);
    }
  }

  /* ── 8. VIDEO PLAYER PREMIUM ─────────────────────────────── */
  function initVideoPlayer() {
    document.querySelectorAll(".vx-video-wrap").forEach((wrap) => {
      const video = wrap.querySelector("video");
      const playBtn = wrap.querySelector(".vx-play-btn");
      const progressFill = wrap.querySelector(".vx-progress-fill");
      const timeLabel = wrap.querySelector(".vx-time-label");
      if (!video) return;
      wrap.addEventListener("mouseenter", () => {
        if (video.paused) {
          video.muted = true;
          video.play().catch(() => {});
        }
      });
      wrap.addEventListener("mouseleave", () => {
        if (!wrap.classList.contains("vx-playing")) {
          video.pause();
          video.currentTime = 0;
        }
      });
      if (playBtn) {
        playBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const icon = playBtn.querySelector(".material-symbols-outlined");
          if (video.paused) {
            video.muted = false;
            video.play();
            wrap.classList.add("vx-playing");
            if (icon) icon.textContent = "pause";
          } else {
            video.pause();
            wrap.classList.remove("vx-playing");
            if (icon) icon.textContent = "play_arrow";
          }
        });
      }
      if (progressFill) {
        video.addEventListener("timeupdate", () => {
          if (video.duration) {
            progressFill.style.width =
              (video.currentTime / video.duration) * 100 + "%";
            if (timeLabel) {
              const r = (t) => String(Math.floor(t)).padStart(2, "0");
              timeLabel.textContent = `${r(video.currentTime / 60)}:${r(video.currentTime % 60)}`;
            }
          }
        });
      }
    });
  }

  /* ── 9. SMART FILTER BAR ─────────────────────────────────── */
  function initSmartFilter() {
    const bar = document.querySelector(".vx-filter-bar");
    if (!bar) return;
    window.addEventListener(
      "scroll",
      () => bar.classList.toggle("vx-shadowed", window.scrollY > 120),
      { passive: true },
    );
    bar.querySelectorAll(".vx-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        bar
          .querySelectorAll(".vx-pill")
          .forEach((p) => p.classList.remove("vx-active"));
        pill.classList.add("vx-active");
      });
    });
  }

  /* ── 10. "VER EN MAPA" EN CARDS EXISTENTES ──────────────── */
  function addMapLinksToCards() {
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll(".dev-card:not([data-map-linked])")
        .forEach((card) => {
          card.dataset.mapLinked = "1";
          const footer = card.querySelector(".dev-footer");
          if (!footer) return;
          // No añadir duplicados
          if (footer.querySelector(".vx-map-link-btn")) return;
          const mapBtn = document.createElement("button");
          mapBtn.className = "vx-map-link-btn";
          mapBtn.innerHTML =
            '<span class="material-symbols-outlined">map</span>Ver en mapa';
          mapBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (typeof window.showPage === "function") window.showPage("mapa");
          });
          footer.appendChild(mapBtn);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ── 11. LAZY IMAGES (data-src) ──────────────────────────── */
  function initLazyImages() {
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.dataset.src) {
            e.target.src = e.target.dataset.src;
            e.target.removeAttribute("data-src");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "200px 0px" },
    );
    document
      .querySelectorAll("img[data-src]")
      .forEach((img) => obs.observe(img));
  }

  /* ── 12. SECTION DIVIDERS ────────────────────────────────── */
  function upgradeDividers() {
    document
      .querySelectorAll(".divider:not(.vx-divider)")
      .forEach((d) => d.classList.add("vx-divider"));
  }

  /* ── 13. AUTO-REVEAL CARDS ───────────────────────────────── */
  function addRevealToCards() {
    document.querySelectorAll(".dev-card:not(.vx-reveal)").forEach((el, i) => {
      el.classList.add("vx-reveal", `vx-d${Math.min((i % 3) + 1, 5)}`);
    });
  }

  /* ── 14. NAV ACTIVE STATE (sincronizado con showPage) ───── */
  function syncNavActive() {
    // Observar cambios de clase .active en .page para sincronizar nav
    const obs = new MutationObserver(() => {
      const activePage = document.querySelector(".page.active");
      if (!activePage) return;
      const pageId = activePage.id; // "page-home", "page-mapa", etc.
      const name = pageId.replace("page-", "");
      document
        .querySelectorAll('[id^="nl-"]')
        .forEach((l) => l.classList.remove("active"));
      const nl = document.getElementById("nl-" + name);
      if (nl) nl.classList.add("active");
    });
    document
      .querySelectorAll(".page")
      .forEach((p) =>
        obs.observe(p, { attributes: true, attributeFilter: ["class"] }),
      );
  }

  /* ── INIT ────────────────────────────────────────────────── */
  function init() {
    initNavbar();
    initRipple();
    initParticles();
    upgradeDividers();
    addRevealToCards();
    syncNavActive();
    initReveal();
    initCounters();
    initMagnetic();
    initTilt();
    initVideoPlayer();
    initSmartFilter();
    initLazyImages();
    addMapLinksToCards();

    // Observador para contenido dinámico (cards renderizadas por JS)
    const contentObs = new MutationObserver(() => {
      initReveal();
      initCounters();
      initTilt();
      addMapLinksToCards();
      initLazyImages();
      upgradeDividers();
    });
    contentObs.observe(document.body, { childList: true, subtree: true });

    console.log(
      "%c[VEXO Premium v2.1] ✨ UI Magic active",
      "color:#D4891A;font-weight:bold;",
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 0);
  }

  // API pública mínima
  window.VX = { animateCounter, initReveal };
})();