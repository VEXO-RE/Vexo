/**
 * ARCHIVO: api/chat.js
 * DESCRIPCIÓN: Serverless Function para Vercel. 
 * Actúa como intermediario seguro para no exponer la API Key en el navegador.
 */

export default async function handler(req, res) {
  // Habilitar el control de métodos (Solo peticiones POST)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
  }

  try {
    const { history, context } = req.body;
    
    // Vercel lee de forma segura tu variable de entorno del sistema
    // (acepta ambos nombres por compatibilidad con el .env existente)
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY_GEMINI;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Falta la configuración de GEMINI_API_KEY (o API_KEY_GEMINI) en el servidor.' });
    }

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    // Ingeniería de Prompt Avanzada Nivel Dios de VEXO
    const systemInstruction = `
      Eres Santiago, el broker inmobiliario estrella y Senior Investment Advisor de VEXO Real Estate.
      Tu objetivo principal es enamorar al cliente del mercado de Yucatán y CDMX, resolver dudas de forma contundente y conseguir que agende una cita o escriba al WhatsApp oficial (+52 55 2708 1749).

      REGLAS DE COMPORTAMIENTO AVANZADO (PROHIBIDO DETENER LA CHARLA):
      1. NUNCA respondas con una sola frase corta que cierre la plática (ej: 'No tenemos eso, adiós'). Si no tienes lo que pide, ofrece una alternativa atractiva de inmediato.
      2. Al final de CADA respuesta, haz una pregunta de seguimiento abierta y estratégica para mantener al cliente escribiendo (ej: '¿Estás buscando construir a corto plazo o te interesa más la plusvalía para el futuro?').
      3. Usa modismos suaves de México, habla con sofisticación, cercanía y calidez corporativa. Usa emojis de forma inteligente (🏢, 🌴, 💳, ✨).
      3.5. NO tienes acceso a búsqueda en vivo en Google por ahora. Si el cliente pregunta por datos externos vigentes (tasas hipotecarias exactas de hoy, tipo de cambio del día, noticias muy recientes), acláralo con calidez y redirige la conversación hacia lo que sí sabes (desarrollos VEXO) o hacia un asesor humano por WhatsApp.
      4. Si el cliente pregunta por Lotes o Terrenos, destaca los desarrollos del ID 27 al 33 (Hacienda San Eduardo, San Roque, Santa Clara Ecovillage, Puerto Telchac, Mareta, Custo, Hacienda Terraviva). Resalta que cuentan con financiamiento de hasta 16 años y meses sin intereses directos con el desarrollador Grupo López Rosa.
      5. Si el cliente busca Departamentos residenciales, promueve los proyectos del ID 1 al 26 en Mérida (Temozón Norte) o Ciudad de México (Roma Norte, Narvarte, Condesa, Reforma, Polanco).
      6. Basa tus argumentos principalmente en esta base de datos JSON real de VEXO (desarrollos, precios, amenidades, y artículos de mercado/blog). Solo complementa con búsqueda web cuando la pregunta sea sobre datos externos vigentes que no estén aquí:
      ${JSON.stringify(context)}

      ESTRUCTURA DE RESPUESTA INTERNA:
      - Párrafo 1: Respuesta directa a su duda de forma clara y persuasiva usando los datos provistos.
      - Párrafo 2: Propuesta de valor o comparación sutil con otro proyecto similar de VEXO si aplica.
      - Cierre: Gancho con llamada a la acción hacia WhatsApp (+52 55 2708 1749) y una pregunta de perfilado obligatoria.
    `;

    // Construcción del Payload estructurado para la API nativa de Google
    // "tools: google_search" permite que Gemini busque en la web información
    // adicional (tasas hipotecarias actuales, noticias del mercado, etc.)
    // cuando la base de datos de VEXO no basta para responder con precisión.
    // NOTA: "google_search" (grounding) quedó DESACTIVADO a propósito el 2026-08-28.
    // Ese tool tiene su propia cuota gratuita, mucho más pequeña que la de texto normal,
    // y se agotó en pruebas, provocando "you exceeded your current quota" en todo el chat.
    // Para reactivarlo: habilita facturación (billing) en el proyecto de Google Cloud/AI Studio
    // ligado a esta API key, y descomenta la línea de abajo.
    const payload = {
      contents: history,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      // tools: [{ google_search: {} }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 700,
        topP: 0.95
      }
    };

    // Llamada segura de servidor a servidor
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (data.error) {
      var upstreamStatus = (data.error && data.error.code) || response.status || 400;
      var isQuota = upstreamStatus === 429 || /quota|resource_exhausted/i.test(data.error.message || "");
      return res.status(upstreamStatus === 429 ? 429 : 400).json({
        error: isQuota
          ? "La cuota de la API de Gemini se agotó por hoy. Revisa el plan/facturación en Google AI Studio."
          : data.error.message
      });
    }

    // Con tools activos, la respuesta puede venir en varias partes (texto +
    // metadatos de búsqueda). Unimos solo los fragmentos de texto.
    const parts = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
    const replyText = parts.map(function (p) { return p.text || ""; }).join("").trim()
      || "Gracias por tu mensaje. Un asesor VEXO te contactará muy pronto.";

    // Retornamos la respuesta limpia al navegador
    return res.status(200).json({ text: replyText });

  } catch (error) {
    console.error("Error en servidor backend:", error);
    return res.status(500).json({ error: "Error interno procesando la solicitud de IA." });
  }
}