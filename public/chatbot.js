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
 * por una versión con IA. Si /api/chat falla, reintenta una vez y, si
 * sigue fallando, cae de regreso a WhatsApp.
 *
 * MEJORAS (Ago 2026):
 *  - Contexto ampliado: además del catálogo de desarrollos, se envían
 *    los artículos de blog/mercado (BLOG_POSTS) y datos de ciudades
 *    (CIUDADES) para que el bot pueda hablar de plusvalía, zonas y
 *    tendencias, no solo de precios de un desarrollo puntual.
 *  - api/chat.js ahora tiene grounding con Google Search, así que el
 *    bot puede complementar con información vigente de la web cuando
 *    la pregunta lo amerite (tasas, noticias, etc.).
 *  - Reintento automático (1x) ante fallas de red antes de mostrar el
 *    fallback de WhatsApp, para conversaciones más fluidas.
 *  - La conversación se guarda en sessionStorage para no perderse si
 *    el visitante navega entre index.html, mapa.html o tour-redes.html.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "vexoChatHistory";
  var MAX_HISTORY = 16;
  var chatHistory = cargarHistorial();

  function cargarHistorial() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function guardarHistorial() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (e) {
      /* si sessionStorage no está disponible, seguimos solo en memoria */
    }
  }

  function pushHistorial(entrada) {
    chatHistory.push(entrada);
    if (chatHistory.length > MAX_HISTORY) chatHistory.shift();
    guardarHistorial();
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Recorta el catálogo de desarrollos a los campos que el modelo necesita,
     para no mandar objetos gigantes (imágenes, arrays largos, etc.) */
  function buildDesarrollosContext() {
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

  /* Artículos de mercado/blog: le dan al bot contexto de tendencias,
     plusvalía y comparativas de zonas que no viven en la ficha de un
     desarrollo individual. */
  function buildBlogContext() {
    var posts = window.BLOG_POSTS || [];
    return posts.map(function (p) {
      return {
        titulo: p.titulo,
        ciudad: p.ciudad,
        categoria: p.categoria,
        fecha: p.fecha,
        resumen: p.resumen
      };
    });
  }

  /* Datos de ciudad: plusvalía por zona, por qué invertir, stats. */
  function buildCiudadesContext() {
    var ciudades = window.CIUDADES || [];
    return ciudades.map(function (c) {
      return {
        nombre: c.nombre,
        eslogan: c.eslogan,
        por_que_invertir: c.por_que_invertir,
        zonas: (c.zonas || []).map(function (z) {
          return { nombre: z.nombre, plusvalia: z.plusvalia, descripcion: z.descripcion };
        })
      };
    });
  }

  function buildContext() {
    return {
      desarrollos: buildDesarrollosContext(),
      articulos_mercado: buildBlogContext(),
      ciudades: buildCiudadesContext()
    };
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

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /* Llama a /api/chat. reintento=true permite un segundo intento tras
     una breve pausa antes de rendirse y mostrar el fallback. */
  async function llamarAPI(reintento) {
    var resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: chatHistory, context: buildContext() })
    });
    var data = await resp.json();
    if (!resp.ok || data.error) {
      if (reintento) {
        await sleep(900);
        return llamarAPI(false);
      }
      throw new Error(data.error || "HTTP " + resp.status);
    }
    return data;
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

    pushHistorial({ role: "user", parts: [{ text: msg }] });

    try {
      var data = await llamarAPI(true);

      var typing = document.getElementById("typing");
      if (typing) typing.remove();

      var reply = data.text || "Gracias por tu mensaje. Un asesor VEXO te contactará muy pronto.";
      pushHistorial({ role: "model", parts: [{ text: reply }] });

      msgsEl.insertAdjacentHTML("beforeend", '<div class="msg bot">' + formatBotMsg(reply) + "</div>");
    } catch (err) {
      console.warn("VEXO chatbot IA: fallo al llamar /api/chat", err);
      var typing2 = document.getElementById("typing");
      if (typing2) typing2.remove();
      msgsEl.insertAdjacentHTML("beforeend", '<div class="msg bot">' + waFallbackHTML() + "</div>");
    }
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  /* Al cargar, si ya había una conversación en esta sesión (por ejemplo
     el visitante navegó de index.html a mapa.html), la reintegramos al
     historial visual del chat. */
  function repintarHistorial() {
    var msgsEl = document.getElementById("chat-msgs");
    if (!msgsEl || !chatHistory.length) return;
    chatHistory.forEach(function (turno) {
      var texto = (turno.parts && turno.parts[0] && turno.parts[0].text) || "";
      if (!texto) return;
      var clase = turno.role === "user" ? "user" : "bot";
      var contenido = turno.role === "user" ? esc(texto) : formatBotMsg(texto);
      msgsEl.insertAdjacentHTML("beforeend", '<div class="msg ' + clase + '">' + contenido + "</div>");
    });
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  /* Sustituye el sendChat basado en reglas (definido inline en index.html)
     por la versión con IA. Debe cargarse DESPUÉS del <script> principal
     para que esta asignación gane. */
  function activar() {
    window.sendChat = sendChatIA;
    repintarHistorial();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", activar);
  } else {
    activar();
  }
})();
