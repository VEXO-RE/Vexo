// empresa.js — VEXO Real Estate — Datos institucionales
const EMPRESA = {
  quienes_somos:
    "En Vexo Real Estate, somos una firma inmobiliaria especializada en la comercialización de propiedades en zonas estratégicas de alto crecimiento, principalmente en la zona norte de Mérida (Temozón y Dzityá) y en Ciudad de México. Nos enfocamos en conectar a nuestros clientes con oportunidades reales de inversión y vivienda, priorizando ubicación, plusvalía y calidad de vida. Más que vender propiedades, diseñamos estrategias inmobiliarias personalizadas para que cada cliente tome decisiones inteligentes y seguras.",
  mision:
    "Brindar asesoría inmobiliaria estratégica y confiable, ayudando a nuestros clientes a adquirir, vender o invertir en propiedades con claridad, seguridad y visión a largo plazo.",
  vision:
    "Ser una empresa líder en el sector inmobiliario en Mérida y Ciudad de México, reconocida por su transparencia, innovación y capacidad de generar valor en cada operación.",
  valores: [
    {
      nombre: "Transparencia",
      descripcion: "Comunicación clara en cada paso del proceso.",
      icono: "visibility",
    },
    {
      nombre: "Confianza",
      descripcion: "Relaciones duraderas basadas en resultados reales.",
      icono: "verified",
    },
    {
      nombre: "Compromiso",
      descripcion: "Atención personalizada y seguimiento constante.",
      icono: "handshake",
    },
    {
      nombre: "Profesionalismo",
      descripcion: "Asesoría experta en inversión y adquisición inmobiliaria.",
      icono: "workspace_premium",
    },
    {
      nombre: "Innovación",
      descripcion:
        "Estrategias modernas de comercialización y análisis de mercado.",
      icono: "lightbulb",
    },
  ],
  por_que_nosotros: [
    {
      titulo: "Zonas de alta plusvalía",
      descripcion: "Propiedades en Temozón, Dzityá y CDMX.",
      icono: "trending_up",
    },
    {
      titulo: "Asesoría personalizada",
      descripcion: "Según tu perfil y objetivos de inversión.",
      icono: "person",
    },
    {
      titulo: "Acompañamiento integral",
      descripcion: "Desde la búsqueda hasta la firma del contrato.",
      icono: "support_agent",
    },
    {
      titulo: "Análisis estratégico",
      descripcion: "Evaluación completa de cada propiedad.",
      icono: "analytics",
    },
    {
      titulo: "Proceso ágil",
      descripcion: "Claro, sin complicaciones y transparente.",
      icono: "speed",
    },
  ],
  servicios: [
    {
      nombre: "Compra de propiedades",
      descripcion:
        "Te ayudamos a encontrar el desarrollo que mejor se adapta a tu perfil y presupuesto.",
      icono: "apartment",
    },
    {
      nombre: "Inversión inmobiliaria",
      descripcion:
        "Estrategias de inversión con análisis de plusvalía y retorno esperado.",
      icono: "savings",
    },
    {
      nombre: "Asesoría personalizada",
      descripcion:
        "Consulta uno a uno con un asesor especializado en el mercado que te interesa.",
      icono: "person_search",
    },
    {
      nombre: "Análisis de plusvalía",
      descripcion:
        "Evaluación detallada del potencial de crecimiento de cada zona y desarrollo.",
      icono: "show_chart",
    },
    {
      nombre: "Gestión de trámites",
      descripcion: "Acompañamiento en todo el proceso legal y notarial.",
      icono: "gavel",
    },
    {
      nombre: "Seguimiento post-venta",
      descripcion: "Continuamos a tu lado después de la compra.",
      icono: "verified_user",
    },
  ],
  equipo: [
    {
      nombre: "Rosalia Robles",
      cargo: "Directora General",
      email: "rosalia.robles@vexorealestate.com",
      foto: "public/images/equipo/rosalia.jpg",
      bio: "Especialista en desarrollos residenciales con amplia experiencia en los mercados de Mérida y CDMX.",
    },
    {
      nombre: "Marco Flores",
      cargo: "Director Comercial",
      email: "marco.flores@vexorealestate.com",
      foto: "public/images/equipo/marco.jpg",
      bio: "Experto en análisis de mercado inmobiliario y estrategias de inversión en zonas de alto crecimiento.",
    },
  ],
  testimonios: [
    {
      nombre: "Carlos M.",
      ciudad: "CDMX",
      texto:
        "Encontré una excelente oportunidad de inversión en Mérida gracias a su asesoría. El proceso fue claro y el equipo siempre disponible.",
      calificacion: 5,
    },
    {
      nombre: "Laura R.",
      ciudad: "Mérida",
      texto:
        "Proceso claro, atención rápida y total acompañamiento hasta la firma. Muy recomendados.",
      calificacion: 5,
    },
    {
      nombre: "Roberto S.",
      ciudad: "Monterrey",
      texto:
        "Gracias a VEXO pude invertir en Temozón Norte con total confianza. Excelente plusvalía en menos de un año.",
      calificacion: 5,
    },
  ],
  zonas: [
    {
      nombre: "Temozón Norte",
      ciudad: "Mérida",
      descripcion:
        "La zona de mayor crecimiento residencial premium en Mérida. A 10 min del centro y rodeada de centros comerciales, universidades y hospitales.",
      plusvalia: "18%",
    },
    {
      nombre: "Dzityá",
      ciudad: "Mérida",
      descripcion:
        "Corredor emergente al norte de Mérida con naturaleza, tranquilidad y alta proyección de crecimiento.",
      plusvalia: "15%",
    },
    {
      nombre: "Cuauhtémoc",
      ciudad: "Ciudad de México",
      descripcion:
        "Corredor de innovación y cultura en plena transformación urbana. Nearshoring impulsa la demanda.",
      plusvalia: "10%",
    },
  ],
};
window.EMPRESA = EMPRESA;
