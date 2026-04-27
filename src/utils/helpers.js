// ============================================================
//  src/utils/helpers.js
//  Funciones de utilidad general para todo el proyecto
// ============================================================

// ── Formato de precios ────────────────────────────────────────
function formatPrecio(numero, moneda = "MXN") {
  return new Intl.NumberFormat("es-MX", {
    style:    "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(numero);
}

// ── Scroll reveal ─────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
          .forEach(el => obs.observe(el));
}

// ── Navbar scroll effect ──────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ── Toast notification ────────────────────────────────────────
function showToast(mensaje = "Completado", tipo = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  const msg  = toast.querySelector("#toast-msg");
  const ico  = toast.querySelector("#toast-icon");
  if (msg) msg.textContent = mensaje;
  if (ico) ico.textContent = tipo === "error" ? "error" : "check_circle";
  toast.style.transform = "translateY(0)";
  toast.style.opacity   = "1";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.transform = "translateY(100px)";
    toast.style.opacity   = "0";
  }, 3800);
}

// ── Icono Material Symbols ────────────────────────────────────
function icon(name, style = "") {
  return `<span class="material-symbols-outlined" style="${style}">${name}</span>`;
}

// ── Estrellas de rating ───────────────────────────────────────
function renderEstrellas(n = 5) {
  return Array(n).fill(0).map(() =>
    `<span class="material-symbols-outlined" style="font-size:16px;color:#13ecda;font-variation-settings:'FILL' 1;">star</span>`
  ).join("");
}

// ── Validaciones ──────────────────────────────────────────────
function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Debounce ──────────────────────────────────────────────────
function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// ── Scroll suave a elemento ───────────────────────────────────
// NOTA: No sobreescribe window.scrollTo nativo (lo rompería)
function scrollToSelector(selector) {
  if (!selector || typeof selector !== 'string') return;
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Exponer globalmente
window.formatPrecio    = formatPrecio;
window.initReveal      = initReveal;
window.initNavScroll   = initNavScroll;
window.showToast       = showToast;
window.icon            = icon;
window.renderEstrellas = renderEstrellas;
window.esEmailValido   = esEmailValido;
window.debounce        = debounce;
window.scrollToSelector = scrollToSelector;
// NO asignar scrollTo a window — preserva el nativo window.scrollTo({top,behavior})

function getImgPrincipal(dev){
  return dev.foto_principal_url || (dev.imagenes && dev.imagenes[0]) || '';
}

window.getImgPrincipal = getImgPrincipal;

