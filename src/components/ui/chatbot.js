/**
 * ARCHIVO: public/chatbot.js
 * DESCRIPCIÓN: Integración de UI del Chatbot sincronizada con el endpoint seguro de Vercel.
 */

const BACKEND_CHAT_URL = "/api/chat"; 
let chatHistory = [];
const MAX_HISTORY_LENGTH = 12;

function toggleChat() {
  const chat = document.getElementById('vexo-chatbot');
  const icon = document.getElementById('chat-toggle-icon');
  chat.classList.toggle('collapsed');
  icon.innerText = chat.classList.contains('collapsed') ? '▲' : '▼';
  
  const messages = document.getElementById('chat-messages');
  if (messages.children.length === 0 && !chat.classList.contains('collapsed')) {
    appendMessage("bot", "¡Hola! Bienvenido a <b>VEXO Real Estate</b>. 🌴 Soy tu asesor de inversiones automatizado.<br><br>Tengo el catálogo completo de departamentos de lujo en <b>CDMX y Mérida</b>, así como los nuevos macroproyectos de lotes residenciales y náuticos en la <b>costa de Yucatán (Telchac y Santa Clara)</b>.<br><br>¿Qué tipo de inversión o zona tienes en mente hoy?");
    renderQuickFAQs();
  }
}

function handleEnter(e) { 
  if (e.key === 'Enter') sendMessage(); 
}

function renderQuickFAQs() {
  const containerId = 'chat-faqs-container';
  let container = document.getElementById(containerId);
  
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'vexo-faqs-layout';
    document.getElementById('vexo-chatbot').appendChild(container);
  }

  const faqs = [
    { label: "🌴 Lotes en Telchac", query: "Muéstrame opciones de lotes residenciales en Telchac y cuáles son los plazos de pago." },
    { label: "🏢 Depas en Mérida", query: "¿Qué departamentos en preventa tienen disponibles en Mérida y en qué zonas?" },
    { label: "📍 Proyectos en CDMX", query: "Quiero ver departamentos disponibles en Ciudad de México como Roma o Narvarte." },
    { label: "💳 Financiamiento Directo", query: "¿Cómo funciona el financiamiento sin intereses de Grupo López Rosa?" }
  ];

  container.innerHTML = '';
  faqs.forEach(faq => {
    const chip = document.createElement('button');
    chip.className = 'vexo-faq-chip';
    chip.innerText = faq.label;
    chip.onclick = () => {
      document.getElementById('chat-input').value = faq.query;
      sendMessage();
    };
    container.appendChild(chip);
  });
}

function appendMessage(sender, text, id = null) {
  const chatMessages = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `vexo-msg ${sender}`;
  if (id) msgDiv.id = id;
  
  let cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/`([^`]+)`/g, '<code class="vexo-code">$1</code>')
    .replace(/\n/g, '<br>');

  if (cleanText.includes("+52 55 2708 1749") || cleanText.includes("525527081749")) {
    cleanText += `<br><a href="https://wa.me/525527081749?text=Hola%20VEXO,%20vengo%20del%20Chatbot%20de%20la%20web" target="_blank" class="vexo-chat-wa-btn">💚 Hablar con Asesor Humano en WhatsApp</a>`;
  }
  
  msgDiv.innerHTML = cleanText;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  
  appendMessage("user", text);
  input.value = '';
  
  chatHistory.push({ role: "user", parts: [{ text: text }] });
  if (chatHistory.length > MAX_HISTORY_LENGTH) chatHistory.shift();
  
  appendMessage("bot typing", "Analizando inventario maestro...", "typing-indicator");
  
  try {
    // PREPARACIÓN DE CONTEXTO OPTIMIZADO
    const contextoVexoMaster = window.DESARROLLOS.map(d => ({
      id: d.id,
      nombre: d.nombre_corto || d.nombre,
      ciudad: d.ciudad,
      zona: d.zona,
      tipo: d.tipo,
      estatus: d.estatus,
      precio: d.precio_desde > 0 ? `$${d.precio_desde.toLocaleString('es-MX')} ${d.moneda}` : "Consultar precio actual",
      financiamiento: d.esquema_pago || d.financiamiento,
      amenidades: d.amenidades,
      datos_clave: d.chatbot_knowledge || d.descripcion_corta,
      faqs: d.chatbot_preguntas_frecuentes || "Consultar especificaciones"
    }));

    // Consumimos tu Endpoint de Vercel
    const response = await fetch(BACKEND_CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: chatHistory,
        context: contextoVexoMaster
      })
    });

    const data = await response.json();
    
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
    
    if (data.error) throw new Error(data.error);
    
    appendMessage("bot", data.text);
    
    chatHistory.push({ role: "model", parts: [{ text: data.text }] });
    if (chatHistory.length > MAX_HISTORY_LENGTH) chatHistory.shift();
    
  } catch (error) {
    console.error("Fallo de comunicación en Vercel Serverless Function:", error);
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
    appendMessage("bot", "Disculpa, experimenté una interrupción momentánea en mi servidor de datos. Para ayudarte de inmediato, puedes dar clic en el botón verde de abajo para hablar con un asesor humano.");
  }
}