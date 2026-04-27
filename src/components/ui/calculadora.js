// src/components/ui/calculadora.js — VEXO Real Estate
// Simulador hipotecario. Se muestra en el detalle de cada desarrollo.
// Fuente de tasas declarada en TASAS_REFERENCIA.
// USO: calcInjector.render(precio) → HTML string
//      calcular(precio) → actualiza los elementos del DOM

// ── TASAS DE REFERENCIA (editar cuando cambien las tasas) ─────
// Fuente: Banco de México / INFONAVIT / bancos — Abril 2026
const TASAS_REFERENCIA = {
  banco_promedio: {
    nombre:      'Crédito bancario promedio',
    tasa_anual:  11.20,
    plazo_max:   20,
    enganche_min: 10,
    nota:        'Promedio bancos MX (BBVA, Banamex, Banorte, Santander). Tasa variable según perfil.',
    fuente:      'Bancos comerciales MX'
  },
  infonavit: {
    nombre:      'INFONAVIT',
    tasa_anual:  10.45,
    plazo_max:   30,
    enganche_min: 0,
    nota:        'Tasa ordinaria INFONAVIT 2026. Varía según salario y puntos acumulados.',
    fuente:      'infonavit.org.mx'
  },
  fovissste: {
    nombre:      'FOVISSSTE',
    tasa_anual:  6.00,
    plazo_max:   30,
    enganche_min: 0,
    nota:        'Crédito Tradicional FOVISSSTE 2026.',
    fuente:      'fovissste.gob.mx'
  },
  contado: {
    nombre:      'Contado / Preventa directa',
    tasa_anual:  0,
    plazo_max:   0,
    enganche_min: 100,
    nota:        'Sin intereses. Precio preferencial en preventa.',
    fuente:      'VEXO Real Estate'
  },
};

// ── GENERADOR DE HTML ─────────────────────────────────────────
const calcInjector = {
  render(precioBase) {
    const p = parseInt(precioBase) || 0;
    // Si precio es 0 usamos precio demo para mostrar la calculadora funcional
    const precio = p > 0 ? p : 2500000;
    const esDemo = p === 0;
    const precioFmt = precio.toLocaleString('es-MX');
    const labelPrecio = esDemo
      ? 'Precio demo: $' + precioFmt + ' MXN — solicita el precio real'
      : 'Precio base: $' + precioFmt + ' MXN';
    const colorLabel = esDemo ? '#f59e0b' : '#64748b';

    return `
<div class="glass rounded-2xl" style="margin-top:24px;overflow:hidden;" id="calc-widget">

  <div style="padding:16px 20px;border-bottom:1px solid rgba(19,236,218,.1);
    display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
    <span class="material-symbols-outlined" style="color:#13ecda;font-size:20px;">calculate</span>
    <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:15px;margin:0;">
      Simulador de pagos
    </h3>
    <span style="font-size:11px;color:${colorLabel};margin-left:auto;">
      ${labelPrecio}
    </span>
  </div>

  <div style="padding:20px;">

    <div style="margin-bottom:16px;">
      <label style="font-size:12px;color:#64748b;display:block;margin-bottom:6px;">
        Tipo de financiamiento
        <span id="calc-fuente" style="color:#13ecda;margin-left:4px;font-weight:700;"></span>
      </label>
      <select id="calc-tipo" class="form-input" style="border-radius:10px;width:100%;"
        onchange="calcular(${precio})">
        <option value="banco_promedio">Credito bancario promedio (~11.2% anual)</option>
        <option value="infonavit">INFONAVIT (~10.45% anual)</option>
        <option value="fovissste">FOVISSSTE (~6% anual)</option>
        <option value="contado">Contado / Preventa directa</option>
      </select>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
      <div>
        <label style="font-size:12px;color:#64748b;display:block;margin-bottom:6px;">
          Enganche <span id="calc-pct-enganche" style="color:#13ecda;font-weight:700;">20%</span>
        </label>
        <input type="range" id="calc-enganche" min="5" max="90" value="20" step="5"
          style="width:100%;accent-color:#13ecda;"
          oninput="document.getElementById('calc-pct-enganche').textContent=this.value+'%';calcular(${precio})"/>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-top:3px;">
          <span>5%</span><span>90%</span>
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:#64748b;display:block;margin-bottom:6px;">
          Plazo <span id="calc-plazo-label" style="color:#13ecda;font-weight:700;">20 anos</span>
        </label>
        <input type="range" id="calc-plazo" min="5" max="30" value="20" step="5"
          style="width:100%;accent-color:#13ecda;"
          oninput="document.getElementById('calc-plazo-label').textContent=this.value+' anos';calcular(${precio})"/>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-top:3px;">
          <span>5</span><span>30 anos</span>
        </div>
      </div>
    </div>

    <div style="background:rgba(19,236,218,.04);border:1px solid rgba(19,236,218,.12);
      border-radius:12px;padding:16px;margin-bottom:12px;">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
        <div style="text-align:center;">
          <div style="font-size:11px;color:#64748b;margin-bottom:4px;">Enganche</div>
          <div id="calc-r-enganche" style="font-family:'Syne',sans-serif;font-weight:800;
            font-size:16px;color:#13ecda;">—</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px;color:#64748b;margin-bottom:4px;">A financiar</div>
          <div id="calc-r-credito" style="font-family:'Syne',sans-serif;font-weight:800;
            font-size:16px;color:#e2e8f0;">—</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px;color:#64748b;margin-bottom:4px;">Mensualidad</div>
          <div id="calc-r-mensual" style="font-family:'Syne',sans-serif;font-weight:800;
            font-size:16px;color:#13ecda;">—</div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;
        font-size:11px;color:#64748b;padding-top:10px;border-top:1px solid rgba(19,236,218,.08);">
        <span>Total: <strong id="calc-r-total" style="color:#e2e8f0;">—</strong></span>
        <span>Intereses: <strong id="calc-r-intereses" style="color:#e2e8f0;">—</strong></span>
      </div>
    </div>

    <p id="calc-nota" style="font-size:11px;color:#475569;line-height:1.55;margin-bottom:12px;"></p>

    <button class="btn-primary"
      style="width:100%;padding:11px;border-radius:12px;font-size:13px;border:none;justify-content:center;"
      onclick="showPage('contacto')">
      <span class="material-symbols-outlined" style="font-size:15px;">calendar_month</span>
      Agendar asesoria de credito
    </button>

  </div>
</div>`;
  }
};

// ── FUNCIÓN calcular() — global, llamada por los inputs ────────
function calcular(precioArg) {
  const tipo    = document.getElementById('calc-tipo');
  const engEl   = document.getElementById('calc-enganche');
  const plazoEl = document.getElementById('calc-plazo');
  if (!tipo || !engEl || !plazoEl) return;

  const cfg        = TASAS_REFERENCIA[tipo.value] || TASAS_REFERENCIA.banco_promedio;
  const precio     = parseInt(precioArg) || 0;
  const pctEng     = parseInt(engEl.value) / 100;
  const plazoAnios = parseInt(plazoEl.value);

  const enganche   = precio * pctEng;
  const credito    = precio - enganche;
  let mensual = 0, totalPagar = 0, intereses = 0;

  if (tipo.value === 'contado') {
    totalPagar = precio;
  } else {
    const tm     = cfg.tasa_anual / 100 / 12;
    const nPagos = plazoAnios * 12;
    if (tm > 0 && credito > 0 && nPagos > 0) {
      mensual    = credito * (tm * Math.pow(1 + tm, nPagos)) / (Math.pow(1 + tm, nPagos) - 1);
      totalPagar = enganche + (mensual * nPagos);
      intereses  = totalPagar - precio;
    }
  }

  const fmt = function(v) { return '$' + Math.round(v).toLocaleString('es-MX') + ' MXN'; };
  function set(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }

  set('calc-r-enganche',  fmt(enganche));
  set('calc-r-credito',   fmt(credito));
  set('calc-r-mensual',   tipo.value === 'contado' ? 'Pago unico' : fmt(mensual) + '/mes');
  set('calc-r-total',     fmt(totalPagar));
  set('calc-r-intereses', intereses > 0 ? fmt(intereses) : '$0 MXN');

  var fuenteEl = document.getElementById('calc-fuente');
  if (fuenteEl) fuenteEl.textContent = '· Fuente: ' + cfg.fuente;

  var notaEl = document.getElementById('calc-nota');
  if (notaEl) notaEl.textContent =
    'Simulacion informativa. ' + cfg.nota +
    ' Las cifras reales dependen de tu perfil crediticio y condiciones del mercado.';

  // Ajustar plazo max segun tipo
  if (cfg.plazo_max > 0) {
    plazoEl.max = cfg.plazo_max;
    if (parseInt(plazoEl.value) > cfg.plazo_max) {
      plazoEl.value = cfg.plazo_max;
      var lbl = document.getElementById('calc-plazo-label');
      if (lbl) lbl.textContent = cfg.plazo_max + ' anos';
    }
  }
}

window.calcInjector     = calcInjector;
window.calcular         = calcular;
window.TASAS_REFERENCIA = TASAS_REFERENCIA;
