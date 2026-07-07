/**
 * ARCHIVO: chatbot.js
 * DESCRIPCIÓN: Chat con IA (Google Gemini) para VEXO Real Estate.
 *
 * SEGURIDAD: la API key de Gemini NUNCA viaja al navegador. Este archivo
 * solo llama a /api/chat (función serverless en /api/chat.js), que es
 * quien habla con Gemini usando la key guardada como variable de entorno
 * en el servidor (Vercel → Project Settings → Environment Variables →
 * GEMINI_API_KEY).
 *
 * Compatible con el HTML real de index.html:
 *   #chat-btn, #chat-window, #chat-msgs, #chat-inp
 * No reemplaza toggleChat() — solo sustituye el "cerebro" de sendChat()
 * por una versión con IA. Si /api/chat falla, cae de regreso a WhatsApp.
 */
(function () {
  "use strict";

  var chatHistory = [];
  var MAX_HISTORY = 12;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Recorta el catálogo de desarrollos a los campos que el modelo necesita,
     para no mandar objetos gigantes (imágenes, arrays largos, etc.) */
  function buildContext() {
    var devs = window.DESARROLLOS || [];
    return devs.map(function (d) {
      return {
        id: d.id,
        nombre: d.nombre_corto || d.nombre,
        ciudad: d.ciudad,
        zona: d.zona,
        tipo: d.tipo,
        estatus: d.estatus,
        precio: d.precio_desde > 0
          ? "$" + Math.round(parseFloat(d.precio_desde)).toLocaleString("es-MX") + " " + (d.moneda || "MXN")
          : "Consultar precio actual",
        financiamiento: d.esquema_pago || d.financiamiento,
        amenidades: d.amenidades,
        datos_clave: d.chatbot_knowledge || d.descripcion_corta,
        faqs: d.chatbot_preguntas_frecuentes || "Consultar especificaciones"
      };
    });
  }

  function formatBotMsg(text) {
    var clean = esc(text)
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/\n/g, "<br>");
    if (/\+52 55 2708 1749|525527081749/.test(clean)) {
      clean +=
        '<br/><a href="https://wa.me/525527081749?text=' +
        encodeURIComponent("Hola VEXO, vengo del chatbot de la web") +
        '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;margin-top:8px;padding:8px 14px;background:rgba(37,211,102,.15);border:1px solid rgba(37,211,102,.3);border-radius:8px;color:#25D366;font-family:\'Syne\',sans-serif;font-weight:600;font-size:12px;text-decoration:none">💬 Abrir WhatsApp</a>';
    }
    return clean;
  }

  function waFallbackHTML() {
    return (
      'Disculpa, tuve una interrupción de conexión con mi sistema de IA. ' +
      'Escríbenos directo y te atendemos de inmediato: ' +
      '<a href="https://wa.me/525527081749?text=' +
      encodeURIComponent("Hola VEXO, vengo del chatbot de la web") +
      '" target="_blank" rel="noopener" style="color:#25D366;text-decoration:underline">WhatsApp</a>.'
    );
  }

  async function sendChatIA() {
    var inp = document.getElementById("chat-inp");
    var msgsEl = document.getElementById("chat-msgs");
    if (!inp || !msgsEl) return;

    var msg = (inp.value || "").trim();
    if (!msg) return;
    inp.value = "";

    msgsEl.insertAdjacentHTML("beforeend", '<div class="msg user">' + esc(msg) + "</div>");
    msgsEl.insertAdjacentHTML(
      "beforeend",
      '<div class="msg typing" id="typing"><span></span><span></span><span></span></div>'
    );
    msgsEl.scrollTop = msgsEl.scrollHeight;

    chatHistory.push({ role: "user", parts: [{ text: msg }] });
    if (chatHistory.length > MAX_HISTORY) chatHistory.shift();

    try {
      var resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: chatHistory, context: buildContext() })
      });
      var data = await resp.json();

      var typing = document.getElementById("typing");
      if (typing) typing.remove();

      if (!resp.ok || data.error) throw new Error(data.error || "HTTP " + resp.status);

      var reply = data.text || "Gracias por tu mensaje. Un asesor VEXO te contactará muy pronto.";
      chatHistory.push({ role: "model", parts: [{ text: reply }] });
      if (chatHistory.length > MAX_HISTORY) chatHistory.shift();

      msgsEl.insertAdjacentHTML("beforeend", '<div class="msg bot">' + formatBotMsg(reply) + "</div>");
    } catch (err) {
      console.warn("VEXO chatbot IA: fallo al llamar /api/chat", err);
      var typing2 = document.getElementById("typing");
      if (typing2) typing2.remove();
      msgsEl.insertAdjacentHTML("beforeend", '<div class="msg bot">' + waFallbackHTML() + "</div>");
    }
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  /* Sustituye el sendChat basado en reglas (definido inline en index.html)
     por la versión con IA. Debe cargarse DESPUÉS del <script> principal
     para que esta asignación gane. */
  function activar() {
    window.sendChat = sendChatIA;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", activar);
  } else {
    activar();
  }
})();
