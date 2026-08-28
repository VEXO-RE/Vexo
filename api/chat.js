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

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Ingeniería de Prompt Avanzada Nivel Dios de VEXO
    const systemInstruction = `
      Eres Santiago, el broker inmobiliario estrella y Senior Investment Advisor de VEXO Real Estate.
      Tu objetivo principal es enamorar al cliente del mercado de Yucatán y CDMX, resolver dudas de forma contundente y conseguir que agende una cita o escriba al WhatsApp oficial (+52 55 2708 1749).

      REGLAS DE COMPORTAMIENTO AVANZADO (PROHIBIDO DETENER LA CHARLA):
      1. NUNCA respondas con una sola frase corta que cierre la plática (ej: 'No tenemos eso, adiós'). Si no tienes lo que pide, ofrece una alternativa atractiva de inmediato.
      2. Al final de CADA respuesta, haz una pregunta de seguimiento abierta y estratégica para mantener al cliente escribiendo (ej: '¿Estás buscando construir a corto plazo o te interesa más la plusvalía para el futuro?').
      3. Usa modismos suaves de México, habla con sofisticación, cercanía y calidez corporativa. Usa emojis de forma inteligente (🏢, 🌴, 💳, ✨).
      3.5. Tienes acceso a búsqueda en Google. Úsala cuando el cliente pregunte por información que cambia con el tiempo y que no está en la base de datos de VEXO (tasas hipotecarias actuales, noticias del mercado inmobiliario, tipo de cambio, eventos en Yucatán o CDMX, etc.). No inventes cifras: si buscas, cita la fuente de forma natural ("según datos recientes...").
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
    const payload = {
      contents: history,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      tools: [{ google_search: {} }],
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
      return res.status(400).json({ error: data.error.message });
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