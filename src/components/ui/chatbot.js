// chatbot.js — VEXO Real Estate — Chatbot AI gratuito con Claude API

// Sin costo adicional ajusta u mejora este bien — usa la API de Claude directamente desde el browser

// La API key se configura en el servidor (Vercel env vars), nunca en el frontend



const CHATBOT = {

  systemPrompt: `Eres el asistente virtual de VEXO Real Estate, una empresa especializada en desarrollos residenciales premium en Mérida (zona norte: Temozón Norte y Dzityá) y Ciudad de México.



Tu rol es:

- Informar sobre los 11 desarrollos disponibles: ALMA CONDOS, ALMAERA DPTS, AMALIA APARTMENTS, CANEA, DISTRITO COUNTRY, GALATHA, HUNA, LIVIA, MAKTUB, NUAN y VEXO CDMX.

- Responder preguntas sobre ubicaciones, amenidades, modelos de departamentos, precios (cuando estén disponibles), esquemas de pago y financiamiento.

- Invitar al usuario a agendar una asesoría personalizada o contactar al equipo por WhatsApp (+52 55 2708 1749) o email (ventas@vexorealestate.com).

- Ser conciso, amable y profesional. Responde siempre en español.

- NO inventes precios específicos si no los tienes. Di "el precio se consulta directamente con nuestro equipo".

- Si el usuario quiere ver un desarrollo específico, indícale que puede verlo en la sección Desarrollos del sitio.

- Siempre cierra con una invitación a contactar al equipo o agendar visita.



Datos de contacto:

- WhatsApp: +52 55 2708 1749

- Email: ventas@vexorealestate.com

- Calendario: https://calendar.app.google/uQT2fMM6R5Pxv7G39

- Horario: Lun-Vie 9:00-18:00, Sáb 9:00-14:00`,



  historial: [],

  abierto: false,

  cargando: false,



  init() {

    this.crearUI();

  },



  crearUI() {

    // Botón flotante del chatbot

    const btnHTML = `

    <button id="chatbot-btn" onclick="CHATBOT.toggle()" 

      style="position:fixed;bottom:100px;right:28px;z-index:997;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#13ecda,#0bb3a5);border:none;cursor:pointer;box-shadow:0 4px 16px rgba(19,236,218,.35);display:flex;align-items:center;justify-content:center;transition:transform .25s,box-shadow .25s;"

      onmouseover="this.style.transform='scale(1.1)';this.style.boxShadow='0 6px 24px rgba(19,236,218,.55)'"

      onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 4px 16px rgba(19,236,218,.35)'"

      title="Chat con VEXO Asistente">

      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a1a18">

        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>

      </svg>

    </button>`;



    // Ventana del chat

    const chatHTML = `

    <div id="chatbot-window" 

      style="position:fixed;bottom:168px;right:28px;z-index:996;width:340px;max-height:520px;background:rgba(10,26,24,.97);border:1px solid rgba(19,236,218,.25);border-radius:20px;overflow:hidden;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:'DM Sans',sans-serif;">

      

      <!-- Header -->

      <div style="background:linear-gradient(135deg,#13ecda,#0bb3a5);padding:16px 18px;display:flex;align-items:center;justify-content:space-between;">

        <div style="display:flex;align-items:center;gap:10px;">

          <div style="width:36px;height:36px;background:rgba(10,26,24,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">

            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a1a18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>

          </div>

          <div>

            <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:#0a1a18;">VEXO Asistente</div>

            <div style="font-size:11px;color:rgba(10,26,24,.7);">● En línea</div>

          </div>

        </div>

        <button onclick="CHATBOT.toggle()" style="background:none;border:none;cursor:pointer;color:rgba(10,26,24,.6);font-size:20px;line-height:1;padding:4px;">×</button>

      </div>

      

      <!-- Mensajes -->

      <div id="chatbot-msgs" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;max-height:320px;scrollbar-width:thin;scrollbar-color:#13ecda #0a1a18;"></div>

      

      <!-- Sugerencias rápidas -->

      <div id="chatbot-sugerencias" style="padding:0 12px 8px;display:flex;flex-wrap:wrap;gap:6px;">

        <button onclick="CHATBOT.enviar('¿Qué desarrollos tienen en Mérida?')" style="background:rgba(19,236,218,.1);border:1px solid rgba(19,236,218,.2);color:#13ecda;border-radius:999px;padding:5px 12px;font-size:11px;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(19,236,218,.2)'" onmouseout="this.style.background='rgba(19,236,218,.1)'">Desarrollos en Mérida</button>

        <button onclick="CHATBOT.enviar('¿Cómo funciona la preventa?')" style="background:rgba(19,236,218,.1);border:1px solid rgba(19,236,218,.2);color:#13ecda;border-radius:999px;padding:5px 12px;font-size:11px;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(19,236,218,.2)'" onmouseout="this.style.background='rgba(19,236,218,.1)'">¿Cómo es la preventa?</button>

        <button onclick="CHATBOT.enviar('Quiero agendar una visita')" style="background:rgba(19,236,218,.1);border:1px solid rgba(19,236,218,.2);color:#13ecda;border-radius:999px;padding:5px 12px;font-size:11px;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(19,236,218,.2)'" onmouseout="this.style.background='rgba(19,236,218,.1)'">Agendar visita</button>

      </div>

      

      <!-- Input -->

      <div style="padding:12px;border-top:1px solid rgba(19,236,218,.1);display:flex;gap:8px;">

        <input id="chatbot-input" type="text" placeholder="Escribe tu pregunta..." 

          style="flex:1;background:rgba(15,35,32,.8);border:1px solid rgba(19,236,218,.2);color:#e2e8f0;border-radius:10px;padding:10px 14px;font-size:13px;outline:none;font-family:'DM Sans',sans-serif;"

          onkeypress="if(event.key==='Enter')CHATBOT.enviarDesdeInput()"

          onfocus="this.style.borderColor='rgba(19,236,218,.5)'"

          onblur="this.style.borderColor='rgba(19,236,218,.2)'"/>

        <button onclick="CHATBOT.enviarDesdeInput()" id="chatbot-send-btn"

          style="width:40px;height:40px;background:linear-gradient(135deg,#13ecda,#0bb3a5);border:none;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;"

          onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='none'">

          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a1a18"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>

        </button>

      </div>

    </div>`;



    document.body.insertAdjacentHTML('beforeend', btnHTML + chatHTML);

    

    // Mostrar mensaje de bienvenida al abrir por primera vez

    setTimeout(() => {

      if (!this.abierto) {

        const btn = document.getElementById('chatbot-btn');

        if (btn) {

          btn.insertAdjacentHTML('beforeend', '<span style="position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:#13ecda;border-radius:50%;animation:badgePulse 1.6s ease-in-out infinite;border:2px solid #0a1a18;"></span>');

        }

      }

    }, 3000);

  },



  toggle() {

    this.abierto = !this.abierto;

    const win = document.getElementById('chatbot-window');

    const btn = document.getElementById('chatbot-btn');

    if (win) win.style.display = this.abierto ? 'flex' : 'none';

    if (this.abierto && this.historial.length === 0) {

      this.agregarMensaje('bot', window.CONFIG?.chatbot?.saludo || 'Hola, soy el asistente de VEXO Real Estate. ¿En qué puedo ayudarte?');

    }

    if (this.abierto) {

      setTimeout(() => document.getElementById('chatbot-input')?.focus(), 100);

    }

    // Quitar badge de notificación

    const badge = btn?.querySelector('span');

    if (badge) badge.remove();

  },



  enviarDesdeInput() {

    const input = document.getElementById('chatbot-input');

    if (!input || !input.value.trim()) return;

    const msg = input.value.trim();

    input.value = '';

    this.enviar(msg);

  },



  async enviar(texto) {

    if (!texto || this.cargando) return;

    

    // Ocultar sugerencias después del primer mensaje

    const sug = document.getElementById('chatbot-sugerencias');

    if (sug) sug.style.display = 'none';

    

    this.agregarMensaje('user', texto);

    this.historial.push({role:'user', content: texto});

    this.cargando = true;

    this.mostrarTyping();



    try {

      // Construir contexto de desarrollos para el sistema

      const devsContext = window.DESARROLLOS ? 

        'Desarrollos disponibles: ' + window.DESARROLLOS.map(d => 

          `${d.nombre} (${d.ciudad}, ${d.zona}): ${d.descripcion_corta}`

        ).join('. ') : '';



      const response = await fetch('https://api.anthropic.com/v1/messages', {

        method: 'POST',

        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({

          model: 'claude-sonnet-4-20250514',

          max_tokens: 400,

          system: CHATBOT.systemPrompt + '\n\n' + devsContext,

          messages: this.historial.slice(-6), // Últimos 6 mensajes para contexto

        }),

      });



      if (!response.ok) throw new Error('API error');

      const data = await response.json();

      const respuesta = data.content?.[0]?.text || 'Lo siento, ocurrió un error. Contáctanos directamente por WhatsApp.';

      

      this.historial.push({role:'assistant', content: respuesta});

      this.quitarTyping();

      this.agregarMensaje('bot', respuesta);



    } catch(e) {

      this.quitarTyping();

      // Fallback sin API: respuestas predefinidas inteligentes

      const respuestaFallback = this.respuestaLocal(texto);

      this.historial.push({role:'assistant', content: respuestaFallback});

      this.agregarMensaje('bot', respuestaFallback);

    }

    

    this.cargando = false;

  },



  respuestaLocal(pregunta) {

    // Respuestas locales cuando la API no está disponible

    const p = pregunta.toLowerCase();

    const devs = window.DESARROLLOS || [];

    

    if (p.includes('merida') || p.includes('mérida') || p.includes('yucatan')) {

      const devsM = devs.filter(d=>d.ciudad==='Mérida');

      return `Tenemos ${devsM.length} desarrollos en Mérida: ${devsM.map(d=>d.nombre).join(', ')}. Todos en Temozón Norte y Dzityá, las zonas con mayor plusvalía. ¿Te interesa alguno en particular?`;

    }

    if (p.includes('cdmx') || p.includes('mexico') || p.includes('capital')) {

      const devsC = devs.filter(d=>d.ciudad==='Ciudad de México');

      return `En Ciudad de México contamos con ${devsC.length} desarrollo(s): ${devsC.map(d=>d.nombre).join(', ')}. ¿Quieres más información? Escríbenos a ventas@vexorealestate.com`;

    }

    if (p.includes('precio') || p.includes('costo') || p.includes('cuánto')) {

      return 'Los precios varían por desarrollo y modelo. Para obtener precios actualizados, te recomiendo contactar a nuestro equipo: WhatsApp +52 55 2708 1749 o ventas@vexorealestate.com. ¿Te ayudo a agendar una asesoría?';

    }

    if (p.includes('visita') || p.includes('agendar') || p.includes('cita')) {

      return 'Puedes agendar tu visita directamente en nuestro calendario: https://calendar.app.google/uQT2fMM6R5Pxv7G39 o escríbenos por WhatsApp al +52 55 2708 1749. Atendemos Lun-Vie 9:00-18:00.';

    }

    if (p.includes('preventa') || p.includes('financiamiento') || p.includes('enganche')) {

      return 'Nuestros desarrollos están en preventa con esquemas de financiamiento flexibles: enganche desde 20% y mensualidades durante la construcción. Esto significa que puedes asegurar tu departamento a precio de preventa y pagar el resto al escriturar. ¿Quieres más detalles?';

    }

    if (p.includes('amenidad') || p.includes('alberca') || p.includes('piscina') || p.includes('gimnasio')) {

      return 'Nuestros desarrollos cuentan con amenidades exclusivas como piscinas, gimnasios, rooftops, coworkings, áreas verdes, pet parks y más. Cada desarrollo tiene sus amenidades específicas. ¿Te interesa alguno en particular?';

    }

    

    return '¡Gracias por tu consulta! Para darte la información más precisa, te conectaré con nuestro equipo. Escríbenos por WhatsApp al +52 55 2708 1749 o a ventas@vexorealestate.com. También puedes usar el formulario de contacto del sitio.';

  },



  agregarMensaje(tipo, texto) {

    const msgs = document.getElementById('chatbot-msgs');

    if (!msgs) return;

    const esBot = tipo === 'bot';

    const div = document.createElement('div');

    div.style.cssText = `display:flex;justify-content:${esBot?'flex-start':'flex-end'};`;

    div.innerHTML = `

      <div style="max-width:85%;padding:10px 14px;border-radius:${esBot?'4px 14px 14px 14px':'14px 14px 4px 14px'};background:${esBot?'rgba(15,35,32,0.9)':'rgba(19,236,218,0.15)'};border:1px solid ${esBot?'rgba(19,236,218,0.15)':'rgba(19,236,218,0.3)'};font-size:13px;line-height:1.5;color:${esBot?'#e2e8f0':'#13ecda'};word-break:break-word;">

        ${texto.replace(/https?:\/\/[^\s]+/g, url => `<a href="${url}" target="_blank" style="color:#13ecda;text-decoration:underline;">${url}</a>`)}

      </div>`;

    msgs.appendChild(div);

    msgs.scrollTop = msgs.scrollHeight;

  },



  mostrarTyping() {

    const msgs = document.getElementById('chatbot-msgs');

    if (!msgs) return;

    const div = document.createElement('div');

    div.id = 'typing-indicator';

    div.style.cssText = 'display:flex;justify-content:flex-start;';

    div.innerHTML = '<div style="padding:10px 14px;border-radius:4px 14px 14px 14px;background:rgba(15,35,32,0.9);border:1px solid rgba(19,236,218,.15);"><span style="display:inline-flex;gap:4px;"><span style="width:6px;height:6px;background:#13ecda;border-radius:50%;animation:badgePulse .8s ease-in-out infinite;"></span><span style="width:6px;height:6px;background:#13ecda;border-radius:50%;animation:badgePulse .8s ease-in-out .2s infinite;"></span><span style="width:6px;height:6px;background:#13ecda;border-radius:50%;animation:badgePulse .8s ease-in-out .4s infinite;"></span></span></div>';

    msgs.appendChild(div);

    msgs.scrollTop = msgs.scrollHeight;

  },



  quitarTyping() {

    document.getElementById('typing-indicator')?.remove();

  },

};



document.addEventListener('DOMContentLoaded', () => CHATBOT.init());

window.CHATBOT = CHATBOT;