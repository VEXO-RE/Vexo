// ============================================================
//  src/components/ui/WhatsappBtn.js
//  Botón flotante de WhatsApp — se inyecta en todas las páginas
// ============================================================

function initWhatsappBtn() {
  const cfg = window.CONFIG?.contacto;
  if (!cfg?.whatsapp) return;

  const numero  = cfg.whatsapp;
  const mensaje = encodeURIComponent(cfg.whatsapp_msg || "Hola, me interesa una propiedad.");
  const url     = `https://wa.me/${numero}?text=${mensaje}`;

  // Evitar duplicados si se llama más de una vez
  const existente = document.getElementById("wa-btn");
  if (existente) existente.remove();

  const btn = document.createElement("a");
  btn.id        = "wa-btn";
  btn.href      = url;
  btn.target    = "_blank";
  btn.rel       = "noopener noreferrer";
  btn.setAttribute("aria-label", "Contactar por WhatsApp");
  btn.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
               -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463
               -2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606
               .134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371
               -.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
               -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016
               -1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487
               .709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085
               1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272
               -.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.109.553 4.09 1.518 5.808L0 24l6.335-1.652
               A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22
               c-1.885 0-3.645-.496-5.17-1.364l-.371-.22-3.761.981.999-3.655-.242-.376
               A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
    <span id="wa-tooltip">¿Necesitas ayuda?</span>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #wa-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 999;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #25D366;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.45);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      text-decoration: none;
    }
    #wa-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba(37,211,102,0.6);
    }
    #wa-tooltip {
      position: absolute;
      right: 70px;
      background: rgba(10,26,24,0.92);
      color: #e2e8f0;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 8px;
      white-space: nowrap;
      border: 1px solid rgba(19,236,218,0.2);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    #wa-btn:hover #wa-tooltip { opacity: 1; }

    /* Animación de entrada */
    @keyframes wa-pop {
      from { opacity: 0; transform: scale(0.5) translateY(20px); }
      to   { opacity: 1; transform: scale(1)   translateY(0); }
    }
    #wa-btn { animation: wa-pop 0.4s cubic-bezier(0.16,1,0.3,1) 1.5s both; }
  `;

  document.head.appendChild(style);
  document.body.appendChild(btn);
}

window.initWhatsappBtn = initWhatsappBtn;
