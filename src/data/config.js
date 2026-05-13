// config.js — VEXO Real Estate
// Fuente de verdad para todos los datos de contacto, redes, stats y configuración global.

const CONFIG = {
  agencia: {
    nombre: "VEXO REAL ESTATE",
    slogan: "Tu inversión, nuestra prioridad",
    descripcion:
      "Especialistas en desarrollos residenciales premium en Mérida y Ciudad de México.",
    mision:
      "Brindar asesoría inmobiliaria estratégica y confiable, ayudando a nuestros clientes a adquirir, vender o invertir en propiedades con claridad, seguridad y visión a largo plazo.",
    vision:
      "Ser una empresa líder en el sector inmobiliario en Mérida y Ciudad de México, reconocida por su transparencia, innovación y capacidad de generar valor en cada operación.",
    valores: [
      "Transparencia",
      "Confianza",
      "Compromiso",
      "Profesionalismo",
      "Innovación",
    ],
    anio_fundacion: 2024,
  },

  contacto: {
    telefono: "+52 55 2708 1749",
    whatsapp: "525527081749",
    whatsapp_msg:
      "Hola, me interesa información sobre los desarrollos de VEXO Real Estate.",
    email_ventas: "ventas@vexorealestate.com",
    email_info: "contacto@vexorealestate.com",
    email_ayuda: "ayuda@vexorealestate.com",
    emails: {
      ventas: "ventas@vexorealestate.com",
      rosalia: "rosalia.robles@vexorealestate.com",
      ayuda: "ayuda@vexorealestate.com",
      contacto: "contacto@vexorealestate.com",
      marco: "marco.flores@vexorealestate.com",
    },
    direccion_cdmx: "Iturbide 32, Centro, Cuauhtémoc, CDMX",
    horario: "Lun–Vie 9:00–18:00 · Sáb 9:00–14:00",
  },

  redes: {
    instagram: "https://www.instagram.com/vexo_bienesraices",
    facebook: "https://www.facebook.com/profile.php?id=61577530904134",
    youtube: "",
    tiktok: "",
    linkedin: "",
  },

  google: {
    // ✅ Endpoint de Google Apps Script para leads
    sheets_endpoint:
      "https://script.google.com/a/macros/vexorealestate.com/s/AKfycbyYM5vWAZngH4_3651Jp4jmAfnZ80LSapGgzCq4mYmpY-bOHlnrpYcgfeLgYFSxNXJYWQ/exec",

    // ✅ Google Analytics 4 ID activo
    analytics_id: "G-JVN5VNZGEF",

    calendario_url: "https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    maps_iframe:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.518114983828!2d-99.15151372573874!3d19.433216040663105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92d7c208269%3A0xcd2ecf69a8a8b26e!2sVexo%20Real%20Estate!5e0!3m2!1ses-419!2smx!4v1774767225685!5m2!1ses-419!2smx" width="100%" height="400" style="border:0;border-radius:12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },

  stats: [
    { valor: "11+", label: "Desarrollos activos", icono: "apartment" },
    { valor: "2", label: "Ciudades estratégicas", icono: "location_city" },
    { valor: "500+", label: "Unidades disponibles", icono: "keys" },
    { valor: "15%", label: "Plusvalía promedio anual", icono: "trending_up" },
  ],

  ciudades: ["Mérida", "Ciudad de México"],

  form_intereses: [
    "Comprar departamento",
    "Información de inversión",
    "Agendar visita al desarrollo",
    "Hablar con asesor",
    "Solicitar brochure",
  ],

  seo: {
    titulo: "VEXO Real Estate | Desarrollos Premium en Mérida y CDMX",
    descripcion:
      "Desarrollos residenciales de lujo en Mérida y Ciudad de México. Departamentos en preventa con amenidades exclusivas. Invierte con VEXO Real Estate.",
    keywords:
      "desarrollos residenciales, departamentos mérida, departamentos cdmx, preventa 2026, inversión inmobiliaria, vexo real estate",
    og_image: "https://vexorealestate.com/images/vexo-image.webp",
  },

  chatbot: {
    enabled: true,
    nombre: "VEXO Asistente",
    placeholder: "¿Tienes dudas sobre algún desarrollo? Pregúntame...",
    saludo:
      "Hola, soy el asistente de VEXO Real Estate. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros desarrollos en Mérida y Ciudad de México.",
  },
};

window.CONFIG = CONFIG;
