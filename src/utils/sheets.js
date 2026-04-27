// sheets.js — VEXO Real Estate
// Envío del formulario de contacto a Google Sheets (Apps Script)
// El formulario escribe: Fecha, Nombre, Email, Teléfono, Interés, Mensaje

/**
 * Envía los datos del formulario al Google Apps Script configurado en config.js
 * Uso en HTML: <form onsubmit="submitLead(event)">
 * @param {Event} event
 */
async function submitLead(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

  // Desactivar el botón mientras se envía
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
  }

  // Recopilar datos del formulario
  const formData = new FormData(form);
  const data = {
    fecha: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
    nombre: formData.get('nombre') || '',
    email: formData.get('email') || '',
    telefono: formData.get('telefono') || '',
    interes: formData.get('interes') || '',
    mensaje: formData.get('mensaje') || '',
    origen: window.location.href
  };

  // Verificar que haya endpoint configurado
  const endpoint = window.CONFIG?.google?.sheets_endpoint;
  if (!endpoint) {
    console.warn('VEXO: sheets_endpoint no configurado en config.js');
    showToast('⚠️ Configuración pendiente. Contáctanos por WhatsApp.');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requiere no-cors
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Con no-cors la respuesta siempre es "opaque", asumimos éxito
    form.reset();
    showToast('✅ ¡Mensaje enviado! Te contactaremos pronto.');

  } catch (error) {
    console.error('VEXO submitLead error:', error);
    showToast('❌ Error al enviar. Por favor escríbenos por WhatsApp.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }
  }
}

window.submitLead = submitLead;
