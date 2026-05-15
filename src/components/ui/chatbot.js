/**
 * ARCHIVO: chatbot.js
 * DESCRIPCIÓN: Integración de Chatbot con Google Gemini API (Capa Gratuita).
 * REQUIERE: data.js cargado previamente con la constante DESARROLLOS.
 */

// 1. OBTÉN TU CLAVE GRATUITA EN: https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = "TU_API_KEY_AQUI"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Historial de la conversación para que Gemini tenga contexto
let chatHistory = [];

function toggleChat() {
  const chat = document.getElementById('vexo-chatbot');
  const icon = document.getElementById('chat-toggle-icon');
  chat.classList.toggle('collapsed');
  icon.innerText = chat.classList.contains('collapsed') ? '▲' : '▼';
  
  const messages = document.getElementById('chat-messages');
  if (messages.children.length === 0 && !chat.classList.contains('collapsed')) {
    appendMessage("bot", "¡Hola! Soy la Inteligencia Artificial de VEXO Real Estate. Conozco todos nuestros desarrollos en Mérida, CDMX y Riviera Maya. ¿Qué tipo de inversión buscas?");
  }
}

function handleEnter(e) { if (e.key === 'Enter') sendMessage(); }

function appendMessage(sender, text, id = null) {
  const chatMessages = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `vexo-msg ${sender}`;
  if (id) msgDiv.id = id;
  
  // Convertir negritas markdown de Gemini (**) a HTML (<b>) básico para mejor visualización
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  msgDiv.innerHTML = formattedText;
  
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  
  appendMessage("user", text);
  input.value = '';
  
  // Agregar al historial de Gemini
  chatHistory.push({ role: "user", parts: [{ text: text }] });
  
  // Mostrar indicador de "escribiendo..."
  appendMessage("bot typing", "Analizando opciones...", "typing-indicator");
  
  try {
    const respuestaIA = await fetchGeminiResponse();
    
    // Remover "escribiendo..."
    document.getElementById('typing-indicator').remove();
    
    // Mostrar respuesta y guardar en historial
    appendMessage("bot", respuestaIA);
    chatHistory.push({ role: "model", parts: [{ text: respuestaIA }] });
    
  } catch (error) {
    console.error("Error en IA:", error);
    document.getElementById('typing-indicator').remove();
    appendMessage("bot", "Tuve un pequeño problema de conexión. ¿Podrías contactarnos directamente por WhatsApp al +52 55 2708 1749?");
  }
}

// --- LLAMADA A LA API DE GEMINI ---
async function fetchGeminiResponse() {
  // Optimizamos el array DESARROLLOS para no saturar tokens innecesarios
  // Extraemos solo lo clave comercialmente
  const contextoVentas = window.DESARROLLOS.map(d => ({
    nombre: d.nombre_corto || d.nombre,
    ciudad: d.ciudad,
    zona: d.zona,
    precio_desde: d.precio_desde,
    entrega: d.fecha_entrega,
    amenidades: d.amenidades,
    descripcion: d.descripcion_corta || d.descripcion_larga
  }));

  // Instrucciones del Sistema (Prompt de Ingeniería)
  const systemInstruction = `
    Eres el mejor asesor inmobiliario de VEXO Real Estate. 
    Tu objetivo es perfilar al cliente, responder sus dudas y llevarlo a agendar una cita o mandar mensaje por WhatsApp (+52 55 2708 1749).
    Habla en español de México, tono profesional pero muy cálido y persuasivo.
    NUNCA inventes precios ni desarrollos. Basa tus respuestas ÚNICAMENTE en este catálogo JSON:
    ${JSON.stringify(contextoVentas)}
    Si te preguntan algo fuera del catálogo inmobiliario, disculpate y vuelve al tema de inversiones.
    Responde en párrafos cortos y usa viñetas si listas propiedades.
  `;

  const payload = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: chatHistory,
    generationConfig: {
      temperature: 0.3, // Baja temperatura para que sea exacto con los precios
      maxOutputTokens: 300 // Respuestas concisas
    }
  };

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message);
  
  return data.candidates[0].content.parts[0].text;
}