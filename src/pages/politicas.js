// src/pages/politicas.js — VEXO Real Estate
// Renderiza las 4 páginas legales: privacidad, términos, aviso legal, cookies.
// Datos: window.LEGAL (src/data/legal.js)
// Uso desde index.html: renderPage('privacidad') / renderPage('terminos') / etc.

function _renderLegalDoc(data) {
  if (!data) return '<p style="color:#94a3b8;">Documento no disponible.</p>';

  const secciones = (data.contenido || []).map(s => `
    <div style="margin-bottom:28px;">
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:16px;
        color:#13ecda;margin-bottom:10px;">${s.seccion || s.subtitulo || ''}</h3>
      <p style="color:#94a3b8;font-size:14px;line-height:1.8;">${s.texto || ''}</p>
    </div>`).join('');

  return `
<div style="padding-top:108px;padding-bottom:80px;max-width:760px;margin:0 auto;padding-left:24px;padding-right:24px;">
  <button onclick="history.back()"
    style="display:inline-flex;align-items:center;gap:6px;background:none;border:none;
      cursor:pointer;color:#64748b;font-size:14px;margin-bottom:32px;"
    onmouseover="this.style.color='#e2e8f0'" onmouseout="this.style.color='#64748b'">
    <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>Volver
  </button>

  <p style="font-size:11px;font-family:'Syne',sans-serif;text-transform:uppercase;
    letter-spacing:.15em;color:#13ecda;margin-bottom:12px;">Legal</p>
  <h1 style="font-family:'Syne',sans-serif;font-weight:800;
    font-size:clamp(28px,4vw,42px);margin-bottom:10px;">
    ${data.titulo || ''}
  </h1>
  <p style="color:#475569;font-size:13px;margin-bottom:48px;">
    Última actualización: ${data.fecha || data.ultima_actualizacion || '2026'}
  </p>

  <div class="legal-content">${secciones}</div>

  <div class="glass rounded-2xl p-6" style="margin-top:56px;">
    <p style="color:#94a3b8;font-size:14px;margin-bottom:14px;">
      ¿Tienes dudas sobre esta política?
    </p>
    <a href="mailto:ayuda@vexorealestate.com"
      class="btn-outline"
      style="padding:10px 20px;border-radius:12px;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
      <span class="material-symbols-outlined" style="font-size:16px;">mail</span>
      ayuda@vexorealestate.com
    </a>
  </div>
</div>`;
}

function renderPrivacidad() {
  const legal = window.LEGAL || {};
  return _renderLegalDoc(legal.privacidad);
}

function renderTerminos() {
  const legal = window.LEGAL || {};
  return _renderLegalDoc(legal.terminos);
}

function renderAvisoLegal() {
  const legal = window.LEGAL || {};
  return _renderLegalDoc(legal.aviso_legal);
}

function renderCookies() {
  const legal = window.LEGAL || {};
  return _renderLegalDoc(legal.cookies);
}

window.renderPrivacidad = renderPrivacidad;
window.renderTerminos   = renderTerminos;
window.renderAvisoLegal = renderAvisoLegal;
window.renderCookies    = renderCookies;
