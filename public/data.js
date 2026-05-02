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
    og_image: "https://vexorealestate.com/public/images/og-image.jpg",
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

// blog.js — VEXO Real Estate
const BLOG_POSTS = [
  {
    id: 1,
    slug: "merida-ciudad-mas-atractiva-inversion-inmobiliaria-2025",
    titulo:
      "Mérida: La Ciudad Más Atractiva para Inversión Inmobiliaria en 2025",
    ciudad: "Mérida",
    categoria: "Inversión",
    fecha: "2025-01-15",
    autor: "Equipo VEXO",
    imagen:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    resumen:
      "Mérida se posiciona como el mercado inmobiliario de mayor crecimiento en México, con plusvalías superiores al 15% anual en zonas como Temozón Norte y Cholul.",
    contenido:
      "<h2>¿Por qué invertir en Mérida?</h2><p>Mérida ha sido reconocida por múltiples organismos internacionales como una de las ciudades con mejor calidad de vida en América Latina. Su crecimiento poblacional sostenido, la llegada de empresas internacionales y la demanda de vivienda premium la convierten en el destino ideal para inversión inmobiliaria en 2025.</p><h3>Plusvalía comprobada</h3><p>Zonas como Temozón Norte, Cholul y Santa Gertrudis Copó han registrado plusvalías de entre 12% y 18% anual en los últimos 5 años, superando ampliamente a otras ciudades del país.</p><h3>Infraestructura en expansión</h3><p>El Tren Maya, la ampliación del aeropuerto y nuevos desarrollos comerciales como The Harbor y La Isla han impulsado el valor de la tierra en la zona norte de manera exponencial.</p><h3>Proyección a corto, mediano y largo plazo</h3><ul><li><strong>Corto plazo (2025-2026):</strong> Incremento de demanda por migración del sur y centro del país.</li><li><strong>Mediano plazo (2027-2030):</strong> Consolidación de Mérida como hub tecnológico y empresarial.</li><li><strong>Largo plazo (2030+):</strong> Proyección de ser la 5ª ciudad más importante de México.</li></ul>",
    tags: ["mérida", "inversión", "plusvalía", "temozón norte"],
    tiempo_lectura: "5 min",
  },
  {
    id: 2,
    slug: "cdmx-zonas-inversion-inmobiliaria-2025-2030",
    titulo: "CDMX 2025-2030: Las Zonas con Mayor Proyección para Invertir",
    ciudad: "Ciudad de México",
    categoria: "Mercado",
    fecha: "2025-02-10",
    autor: "Equipo VEXO",
    imagen:
      "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=800&q=80",
    resumen:
      "La Ciudad de México mantiene su atractivo como mercado inmobiliario con zonas que ofrecen retornos de inversión superiores al promedio nacional.",
    contenido:
      "<h2>Ciudad de México: Mercado Resiliente y en Transformación</h2><p>A pesar de los retos económicos globales, la Ciudad de México continúa siendo uno de los mercados inmobiliarios más dinámicos de América Latina. Con una población de más de 22 millones en la zona metropolitana y una demanda de vivienda vertical en constante crecimiento, las oportunidades de inversión son únicas.</p><h3>Zonas de mayor crecimiento</h3><p>Colonias como Cuauhtémoc, Doctores, Centro Histórico y Tlatelolco viven una transformación sin precedentes, con proyectos de regeneración urbana que elevan el valor de las propiedades.</p><h3>Nearshoring: el gran catalizador</h3><p>La llegada de empresas internacionales a México (nearshoring) ha generado una demanda masiva de vivienda para ejecutivos y profesionistas, impulsando la renta y la plusvalía en zonas clave de la CDMX.</p><h3>Proyecciones de inversión</h3><ul><li><strong>2025:</strong> Crecimiento esperado de 8-10% en zonas de reconversión.</li><li><strong>2027:</strong> Consolidación de corredores de movilidad que elevarán valores.</li><li><strong>2030:</strong> CDMX entre las 10 ciudades globales de mayor atractivo para inversión.</li></ul>",
    tags: ["cdmx", "inversión", "nearshoring", "mercado inmobiliario"],
    tiempo_lectura: "6 min",
  },
  {
    id: 3,
    slug: "porque-comprar-departamento-en-preventa",
    titulo: "¿Por Qué Comprar en Preventa? 7 Ventajas que Debes Conocer",
    ciudad: "Mérida",
    categoria: "Guías",
    fecha: "2025-03-05",
    autor: "Rosalia Robles",
    imagen:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    resumen:
      "Comprar en preventa puede significar un ahorro de hasta el 30% respecto al precio de escrituración. Te explicamos todas las ventajas y cómo hacerlo con seguridad.",
    contenido:
      "<h2>Las 7 Ventajas de Comprar en Preventa</h2><p>La preventa inmobiliaria es una de las estrategias de inversión más efectivas cuando se hace con desarrolladores confiables. Aquí te explicamos por qué.</p><ol><li><strong>Precio preferencial:</strong> Los precios en preventa son hasta 20-30% menores al valor final de escrituración.</li><li><strong>Plusvalía inmediata:</strong> Al momento de escriturar, tu propiedad ya vale más de lo que pagaste.</li><li><strong>Esquemas de pago flexibles:</strong> Puedes diferir el pago durante la construcción con enganches bajos.</li><li><strong>Personalización:</strong> En etapas tempranas puedes elegir acabados, orientación y ubicación dentro del desarrollo.</li><li><strong>Mejor selección:</strong> Acceso a las mejores unidades antes que el público general.</li><li><strong>Protección contractual:</strong> Los contratos de promesa de compraventa protegen tu inversión.</li><li><strong>Menor competencia:</strong> Menos compradores = mejor negociación con el desarrollador.</li></ol>",
    tags: ["preventa", "inversión", "consejos", "departamentos"],
    tiempo_lectura: "4 min",
  },
  {
    id: 4,
    slug: "temozon-norte-merida-zona-residencial-del-futuro",
    titulo: "Temozón Norte: La Zona Residencial del Futuro en Mérida",
    ciudad: "Mérida",
    categoria: "Zonas",
    fecha: "2025-03-20",
    autor: "Equipo VEXO",
    imagen:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    resumen:
      "Temozón Norte se ha convertido en el epicentro del desarrollo residencial premium en Mérida, con infraestructura de clase mundial y una plusvalía que no para de crecer.",
    contenido:
      "<h2>Temozón Norte: Donde Vive la Nueva Mérida</h2><p>La zona norte de Mérida, y en particular Temozón Norte, representa la mayor concentración de desarrollos residenciales premium de la ciudad. En los últimos 5 años, esta zona ha transformado su perfil de manera radical.</p><h3>Infraestructura de clase mundial</h3><p>La Isla Mérida, City Center, The Harbor, Plaza Galerías, University Marista y el Hospital El Faro son solo algunos de los equipamientos que hacen de esta zona la más completa de Yucatán.</p><h3>Conectividad estratégica</h3><p>La Avenida Temozón y la carretera a Progreso conectan la zona con el centro de Mérida en 15 minutos y con Progreso en 20, haciendo de esta ubicación un punto estratégico para vivir e invertir.</p><h3>Crecimiento proyectado</h3><p>Se esperan más de 50 nuevos desarrollos residenciales en los próximos 5 años, con una inversión estimada de más de 10 mil millones de pesos en infraestructura y vivienda.</p>",
    tags: ["temozón norte", "mérida", "zona residencial", "inversión"],
    tiempo_lectura: "5 min",
  },
  {
    id: 5,
    slug: "fraudes-inmobiliarios-como-protegerte",
    titulo: "Fraudes Inmobiliarios en México: Cómo Identificarlos y Protegerte",
    ciudad: "Ciudad de México",
    categoria: "Seguridad",
    fecha: "2025-04-10",
    autor: "Rosalia Robles",
    imagen:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    resumen:
      "El mercado inmobiliario mexicano mueve miles de millones de pesos al año, lo que lo convierte en blanco de fraudes sofisticados. Aprende a identificar las señales de alerta y cómo proteger tu inversión.",
    contenido:
      "<h2>El Fraude Inmobiliario: Una Realidad que Debes Conocer</h2><p>Cada año, miles de familias mexicanas pierden sus ahorros en fraudes inmobiliarios. Con el auge de las preventas y la digitalización del sector, los estafadores han sofisticado sus métodos. Este artículo te da las herramientas para protegerte.</p><h3>Señales de Alerta Principales</h3><ul><li><strong>Precios muy por debajo del mercado:</strong> Si un departamento vale $2M y lo ofrecen en $800K, es una trampa. La plusvalía no es magia: los precios razonables están dentro de rangos de mercado comprobables.</li><li><strong>Urgencia artificial:</strong> 'Solo quedan 2 unidades' o 'La oferta termina hoy' son tácticas de presión. Un desarrollador serio te da tiempo para revisar contratos.</li><li><strong>Sin RNUIF ni registro notarial:</strong> Todo desarrollo legítimo debe estar inscrito en el Registro Único de Desarrollos Inmobiliarios Federales (o estatal).</li><li><strong>Piden depósitos a cuentas personales:</strong> Las transacciones inmobiliarias serias se hacen mediante notario o fideicomiso, nunca a cuentas de personas físicas.</li><li><strong>No existe el inmueble físicamente:</strong> Visita siempre el terreno o el avance de obra. Un render bonito no reemplaza la inspección presencial.</li></ul><h3>Cómo Verificar un Desarrollo</h3><p>Antes de firmar cualquier cosa, solicita: permiso de construcción municipal, escritura del terreno a nombre del desarrollador, contrato de promesa de compraventa revisado por notario, y RFC del desarrollador para verificar en el SAT. Si el vendedor se niega a proporcionar cualquiera de estos documentos, retírate inmediatamente.</p><h3>El Papel del Notario</h3><p>En México, el notario es tu aliado más importante en una transacción inmobiliaria. A diferencia de lo que muchos creen, el notario no solo formaliza: puede alertarte sobre gravámenes, juicios pendientes o irregularidades en la cadena de propiedad. Nunca pagues sin pasar por notario.</p><h3>Qué Hacer Si Eres Víctima</h3><p>Si ya caíste en un fraude inmobiliario: denuncia ante la PROFECO (fraudes de consumidores), la FGR si hay delito federal, o la fiscalía estatal. Guarda todos los comprobantes de pago, contratos y comunicaciones. La recuperación es posible, pero requiere actuar rápido.</p><h3>Por Qué Trabajar con Asesores Certificados</h3><p>En VEXO Real Estate trabajamos exclusivamente con desarrolladores verificados, contratos revisados por notarios y preventas con protecciones contractuales reales. Nuestra reputación depende de que cada cliente complete su compra sin sorpresas.</p>",
    tags: ["fraudes", "seguridad inmobiliaria", "prevención", "consejos"],
    tiempo_lectura: "7 min",
  },
  {
    id: 6,
    slug: "vexo-real-estate-lanzamiento-web-2025",
    titulo:
      "VEXO Real Estate Estrena Plataforma Digital: Tu Búsqueda Inmobiliaria, Reinventada",
    ciudad: "Mérida",
    categoria: "VEXO News",
    fecha: "2025-04-20",
    autor: "Equipo VEXO",
    imagen:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    resumen:
      "Con el lanzamiento de vexorealestate.com, VEXO da un paso decisivo hacia la digitalización del mercado inmobiliario premium en Mérida y CDMX. Te contamos qué puedes hacer en nuestra nueva plataforma.",
    contenido:
      "<h2>Una Nueva Era para la Inversión Inmobiliaria en México</h2><p>Hoy, VEXO Real Estate presenta oficialmente su plataforma digital: vexorealestate.com. Este sitio no es solo una vitrina de propiedades; es una herramienta completa diseñada para que inversionistas, compradores y familias tomen decisiones informadas con la información que realmente necesitan.</p><h3>¿Qué Encuentras en vexorealestate.com?</h3><ul><li><strong>11 desarrollos premium</strong> en Mérida (Temozón Norte, Dzityá) y Ciudad de México (Cuauhtémoc) con información completa: modelos, precios, amenidades, acabados y galería.</li><li><strong>Calculadora hipotecaria integrada</strong> que simula pagos con INFONAVIT, FOVISSSTE, crédito bancario o contado, directamente en cada ficha de desarrollo.</li><li><strong>Mapa interactivo de Mérida</strong> con todos nuestros desarrollos y puntos de interés: distancias reales, tiempo de traslado y zonas de mayor plusvalía.</li><li><strong>Centro de descargas</strong> con brochures y guías de inversión para que lleves la información a tu ritmo.</li><li><strong>Blog especializado</strong> con análisis de mercado, guías para compradores e información sobre cómo invertir de forma segura en México.</li></ul><h3>Transparencia como Principio</h3><p>En VEXO creemos que la información es el mejor activo de un inversionista. Por eso, nuestra plataforma muestra precios reales, datos verificados de los desarrolladores y condiciones de compra sin letras pequeñas. Si algo cambia en un desarrollo, lo actualizamos.</p><h3>Compromiso con la Seguridad</h3><p>Todos los desarrollos listados en vexorealestate.com han pasado por un proceso de validación: verificamos permisos de construcción, escrituras de terreno, antecedentes del desarrollador y viabilidad financiera del proyecto. Si no cumple nuestros criterios, no aparece en la plataforma.</p><h3>El Equipo Detrás de VEXO</h3><p>Somos una firma inmobiliaria con raíces en Mérida y presencia en CDMX. Nuestro equipo combina experiencia en mercados de alto crecimiento con una filosofía de servicio personalizado. Cada asesoría es única porque cada cliente tiene objetivos únicos.</p><h3>Síguenos y Mantente Informado</h3><p>Visítanos en Instagram @vexo_bienesraices y Facebook para actualizaciones de nuevos desarrollos, guías de inversión y noticias del mercado inmobiliario en tiempo real. Nuestra comunidad ya supera los 500 inversionistas activos que confían en VEXO para tomar decisiones financieras inteligentes.</p>",
    tags: ["vexo", "lanzamiento", "plataforma digital", "mérida", "inversión"],
    tiempo_lectura: "6 min",
  },
  {
    id: 7,
    slug: "nearshoring-impacto-mercado-inmobiliario-mexico-2025",
    titulo:
      "Nearshoring y el Boom Inmobiliario: ¿Cuánto Vale tu Propiedad en la Era de la Relocalización?",
    ciudad: "Ciudad de México",
    categoria: "Mercado",
    fecha: "2025-05-05",
    autor: "Equipo VEXO",
    imagen:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    resumen:
      "El nearshoring ha traído miles de ejecutivos internacionales a México, disparando la demanda de vivienda premium. Analizamos qué ciudades ganan más y cómo posicionar tu inversión para capturar esta tendencia.",
    contenido:
      "<h2>El Fenómeno que Está Reshaping el Mercado Inmobiliario Mexicano</h2><p>Desde 2022, México se ha convertido en el destino predilecto del nearshoring global: empresas de EE.UU., Canadá, Europa y Asia han establecido operaciones en el país, atrayendo a decenas de miles de ejecutivos, ingenieros y managers internacionales que necesitan vivienda de alta calidad.</p><h3>Los Números que Importan</h3><p>Según datos de CBRE y Colliers, la inversión extranjera directa en bienes raíces industriales en México superó los $15,000 millones de dólares en 2024. Pero el efecto secundario más importante es el residencial: cada trabajo industrial de manufactura avanzada genera entre 3 y 5 empleos indirectos en servicios, y cada ejecutivo internacional demanda vivienda premium.</p><h3>Las Ciudades con Mayor Impacto</h3><ul><li><strong>Ciudad de México:</strong> Las colonias Cuauhtémoc, Doctores y Centro Histórico ven plusvalías anuales de 10-14% impulsadas por demanda corporativa y regeneración urbana.</li><li><strong>Mérida:</strong> Aunque su impacto directo del nearshoring es menor, la migración interna de profesionistas que huyen del caos de CDMX ha disparado su mercado: más de 40,000 nuevos residentes solo en 2024.</li><li><strong>Monterrey:</strong> El gran ganador del nearshoring industrial, con demanda de vivienda premium que supera la oferta.</li></ul><h3>Qué Tipo de Propiedad se Valoriza Más</h3><p>Los ejecutivos internacionales demandan propiedades específicas: departamentos de 2-3 recámaras en zonas de alta conectividad, amenidades de coworking y wellness, pet-friendly, y fácil acceso a transporte y servicios. Estos son exactamente los desarrollos que VEXO comercializa en Mérida y CDMX.</p><h3>¿Cuándo Comprar?</h3><p>El consenso entre analistas es claro: el nearshoring en México tiene un horizonte mínimo de 10-15 años antes de que la ola se agote. Estamos en el inicio de un ciclo largo. Los que compren en preventa hoy estarán del lado correcto de la plusvalía.</p>",
    tags: [
      "nearshoring",
      "mercado inmobiliario",
      "inversión",
      "tendencias 2025",
    ],
    tiempo_lectura: "8 min",
  },
  {
    id: 8,
    slug: "credito-infonavit-vs-bancario-cual-conviene-2025",
    titulo:
      "INFONAVIT vs Crédito Bancario en 2025: ¿Cuál Conviene para Comprar tu Departamento?",
    ciudad: "Mérida",
    categoria: "Guías",
    fecha: "2025-05-20",
    autor: "Rosalia Robles",
    imagen:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    resumen:
      "Una de las decisiones más importantes al comprar una propiedad es el tipo de financiamiento. Comparamos INFONAVIT, FOVISSSTE y crédito bancario para que elijas con información real, no con mitos.",
    contenido:
      "<h2>La Decisión de Financiamiento que Puede Costarte (o Ahorrarte) Cientos de Miles</h2><p>Elegir mal el tipo de crédito hipotecario puede significar pagar hasta $500,000 pesos más de intereses a lo largo de la vida del préstamo. Por eso, este análisis es crucial antes de firmar cualquier cosa.</p><h3>INFONAVIT 2025: Ventajas y Limitaciones</h3><p>El crédito INFONAVIT es atractivo para trabajadores formales porque la tasa efectiva es de ~10.45% anual y el pago se descuenta directamente del salario. Ventajas: sin enganche obligatorio propio, proceso relativamente ágil. Limitaciones: el monto máximo está ligado al número de puntos acumulados (~$1.1M para muchos trabajadores), y solo aplica para propiedades habitacionales en zonas autorizadas.</p><h3>FOVISSSTE 2025: Para Trabajadores del Gobierno</h3><p>FOVISSSTE ofrece tasas fijas desde 6% anual, las más bajas del mercado institucional. Si trabajas en el sector gobierno y tienes puntos acumulados, este crédito es extraordinariamente conveniente. El límite de crédito también está acotado (~$1.2M en muchos casos).</p><h3>Crédito Bancario 2025: Flexibilidad con Costo</h3><p>Las tasas bancarias en 2025 rondan el 10.5-12.5% anual dependiendo del banco y tu perfil. Requieren enganche mínimo del 10-20% del valor del inmueble y tienen plazos de hasta 20 años. La ventaja: puedes financiar propiedades de cualquier valor, en preventa y con mayor flexibilidad en la aplicación.</p><h3>Tabla Comparativa: Departamento de $2,500,000 MXN</h3><ul><li><strong>INFONAVIT 10.45% / 25 años:</strong> Mensualidad ~$22,800 | Total pagado ~$6.84M</li><li><strong>FOVISSSTE 6% / 30 años:</strong> Mensualidad ~$14,900 | Total pagado ~$5.36M</li><li><strong>Bancario 11.2% / 20 años:</strong> Mensualidad ~$25,100 | Total pagado ~$6.02M</li><li><strong>Contado (preventa):</strong> Pago único ~$2.25M (descuento típico 10%)</li></ul><h3>La Estrategia Correcta</h3><p>Para la mayoría de compradores de departamento en Mérida y CDMX: si tienes puntos INFONAVIT suficientes y el valor de la propiedad lo permite, úsalo como primera opción. Para propiedades de mayor valor, combina INFONAVIT con crédito bancario (COFINAVIT). Si eres trabajador del gobierno, FOVISSSTE es tu mejor opción.</p><p>En VEXO Real Estate podemos orientarte en cuál aplica mejor para tu caso y conectarte con asesores hipotecarios de confianza. La asesoría es gratuita.</p>",
    tags: [
      "infonavit",
      "crédito hipotecario",
      "financiamiento",
      "departamentos",
      "guía",
    ],
    tiempo_lectura: "9 min",
  },
  {
    id: 9,
    slug: "merida-vs-cdmx-donde-invertir-2025",
    titulo:
      "Mérida vs CDMX: ¿Dónde Conviene Más Invertir en Bienes Raíces en 2025?",
    ciudad: "Mérida",
    categoria: "Análisis",
    fecha: "2025-06-01",
    autor: "Equipo VEXO",
    imagen:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    resumen:
      "Dos de los mercados inmobiliarios más atractivos de México frente a frente. Analizamos plusvalía, calidad de vida, accesibilidad y potencial de renta para ayudarte a decidir dónde poner tu dinero.",
    contenido:
      "<h2>El Gran Debate: ¿Mérida o Ciudad de México?</h2><p>Esta es, sin duda, la pregunta más frecuente entre los inversionistas inmobiliarios mexicanos en 2025. Ambas ciudades ofrecen oportunidades reales, pero con perfiles muy distintos de riesgo, retorno y estilo de vida. Aquí el análisis honesto.</p><h3>Plusvalía: El Número que Más Importa</h3><p>Mérida: plusvalía promedio 12-18% anual en zonas de Temozón Norte y Cholul. Algunos desarrollos en preventa reportan incrementos de hasta 25% del precio entre preventa y entrega. CDMX: plusvalía del 8-14% en zonas de reconversión como Cuauhtémoc y Centro Histórico. Más estable pero con menor potencial de multiplicación rápida.</p><h3>Accesibilidad: El Costo de Entrada</h3><p>Mérida permite acceder a un departamento de calidad desde $1.8M MXN. CDMX difícilmente baja de $3M para algo en zona prime. Esta diferencia de ticket de entrada hace de Mérida el mercado ideal para primeros inversionistas o para diversificar un portafolio.</p><h3>Mercado de Renta</h3><p>CDMX tiene un mercado de renta más profundo y líquido: un departamento en Cuauhtémoc puede rentar $18,000-$35,000/mes. En Mérida, el mercado de renta crece rápido impulsado por turismo y migración interna: $12,000-$22,000/mes para departamentos premium. Los yields de renta son similares (4-6% anual), pero CDMX tiene menor vacancia.</p><h3>Calidad de Vida y Seguridad</h3><p>Mérida es consistentemente rankeada como la ciudad más segura de México. CDMX, con toda su oferta cultural y económica, enfrenta desafíos de movilidad y seguridad que no pueden ignorarse. Para quienes compran para vivir (no solo invertir), Mérida gana en calidad de vida.</p><h3>Nuestro Veredicto</h3><p>Para maximizar plusvalía con menor inversión inicial: Mérida. Para mercado de renta más maduro y diversificación en el hub económico más grande del país: CDMX. La estrategia ideal: invertir en ambos, aprovechando preventa en Mérida para plusvalía agresiva y un departamento en Cuauhtémoc para renta estable. VEXO opera en ambos mercados y puede asesorarte en los dos.</p>",
    tags: [
      "mérida",
      "cdmx",
      "comparativa",
      "inversión inmobiliaria",
      "análisis de mercado",
    ],
    tiempo_lectura: "8 min",
  },
];
window.BLOG_POSTS = BLOG_POSTS;

// ciudades.js — VEXO Real Estate
const CIUDADES = [
  {
    id: "merida",
    nombre: "Mérida",
    estado: "Yucatán",
    eslogan: "La Ciudad Más Segura y de Mayor Crecimiento en México",
    descripcion:
      "Mérida es la capital de Yucatán y una de las ciudades con mayor proyección inmobiliaria del país. Con una ubicación privilegiada, clima agradable, seguridad y una infraestructura en constante expansión, se ha convertido en el destino preferido de inversionistas nacionales e internacionales.",
    imagen_hero:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    imagen_ciudad:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    stats: [
      { valor: "15%", label: "Plusvalía anual promedio", icono: "trending_up" },
      {
        valor: "#1",
        label: "Ciudad más segura de México",
        icono: "verified_user",
      },
      { valor: "500K+", label: "Habitantes en crecimiento", icono: "people" },
      {
        valor: "20min",
        label: "Al Puerto de Progreso",
        icono: "directions_car",
      },
    ],
    zonas: [
      {
        nombre: "Temozón Norte",
        descripcion: "La zona de mayor crecimiento residencial premium",
        plusvalia: "18%",
      },
      {
        nombre: "Cholul",
        descripcion: "Desarrollo emergente con alta plusvalía",
        plusvalia: "15%",
      },
      {
        nombre: "Santa Gertrudis Copó",
        descripcion: "Zona consolidada con excelente conectividad",
        plusvalia: "12%",
      },
      {
        nombre: "Montebello",
        descripcion: "Zona residencial establecida y exclusiva",
        plusvalia: "10%",
      },
    ],
    inversion_corto:
      "Demanda creciente de vivienda por migración interna y nearshoring.",
    inversion_mediano:
      "Consolidación como hub tecnológico y empresarial del sureste.",
    inversion_largo:
      "Proyección de ser la 5ª ciudad más importante de México para 2035.",
    por_que_invertir: [
      "Plusvalía superior al 15% anual",
      "Ciudad más segura de México",
      "Tren Maya + Aeropuerto en expansión",
      "Alta demanda de renta por turismo y negocio",
      "Clima y calidad de vida únicos",
      "Infraestructura comercial de primer nivel",
    ],
    desarrollos_activos: 9,
  },
  {
    id: "cdmx",
    nombre: "Ciudad de México",
    estado: "CDMX",
    eslogan: "El Corazón Económico de América Latina",
    descripcion:
      "Ciudad de México es el centro financiero, cultural y comercial más importante de México y uno de los mercados inmobiliarios más dinámicos de América Latina. Con más de 22 millones de habitantes en su zona metropolitana y una demanda constante de vivienda vertical, representa una oportunidad única de inversión.",
    imagen_hero:
      "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=1600&q=80",
    imagen_ciudad:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    stats: [
      {
        valor: "10%",
        label: "Plusvalía anual en zonas clave",
        icono: "trending_up",
      },
      {
        valor: "22M+",
        label: "Habitantes zona metropolitana",
        icono: "people",
      },
      { valor: "#1", label: "Centro económico de México", icono: "business" },
      {
        valor: "$50B",
        label: "Inversión extranjera directa anual",
        icono: "attach_money",
      },
    ],
    zonas: [
      {
        nombre: "Centro Histórico",
        descripcion: "Reconversión urbana con alta plusvalía emergente",
        plusvalia: "12%",
      },
      {
        nombre: "Cuauhtémoc",
        descripcion: "Corredor de innovación y cultura en transformación",
        plusvalia: "10%",
      },
      {
        nombre: "Doctores",
        descripcion:
          "Zona de alta demanda por nearshoring y jóvenes profesionistas",
        plusvalia: "9%",
      },
      {
        nombre: "Tlatelolco",
        descripcion: "Regeneración urbana impulsada por el gobierno capitalino",
        plusvalia: "11%",
      },
    ],
    inversion_corto:
      "Nearshoring genera demanda masiva de vivienda para ejecutivos internacionales.",
    inversion_mediano:
      "Proyectos de movilidad y regeneración urbana elevarán valores en zonas clave.",
    inversion_largo:
      "CDMX entre las 10 ciudades globales de mayor atractivo para inversión para 2030.",
    por_que_invertir: [
      "Mercado de 22 millones de personas",
      "Nearshoring impulsa demanda de vivienda premium",
      "Alta liquidez del mercado inmobiliario",
      "Infraestructura de clase mundial",
      "Hub financiero y corporativo de México",
      "Diversidad cultural y oferta de servicios única",
    ],
    desarrollos_activos: 2,
  },
];
window.CIUDADES = CIUDADES;

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

// descargas.js — VEXO Real Estate
// Archivos descargables organizados por categoría
// Rutas relativas a la raíz del proyecto (donde está index.html)

const DESCARGAS = {
  brochures: [
    {
      id: "b01",
      titulo: "ALMA CONDOS — Brochure 2026",
      descripcion: "Temozón Norte, Mérida · Departamentos modernos",
      archivo: "public/downloads/brochures/Brochure ALMA Condos 2026.pdf",
      icono: "🏢",
      desarrollo_id: 1,
    },
    {
      id: "b02",
      titulo: "ALMAERA DPTS — Brochure 2026",
      descripcion: "Temozón Norte, Mérida · Lujo con piscina y rooftop",
      archivo: "public/downloads/brochures/Brochure ALMAERA 2026.pdf",
      icono: "🏢",
      desarrollo_id: 2,
    },
    {
      id: "b03",
      titulo: "AMALIA APARTMENTS — Brochure 2026",
      descripcion:
        "Temozón Norte, Mérida · 63 apartamentos, PB con piscina privada",
      archivo: "public/downloads/brochures/BROCHURE AMALIA 2026.pdf",
      icono: "🏢",
      desarrollo_id: 3,
    },
    {
      id: "b04",
      titulo: "CANEA — Brochure 2026",
      descripcion: "Mérida Norte · Desarrollo residencial premium",
      archivo: "public/downloads/brochures/Brochure CANEA 2026.pdf",
      icono: "🏢",
      desarrollo_id: 4,
    },
    {
      id: "b05",
      titulo: "DISTRITO COUNTRY — Brochure 2026",
      descripcion: "Mérida Norte · Concepto country con áreas verdes",
      archivo: "public/downloads/brochures/BROCHURE Distrito Country 2026.pdf",
      icono: "🏘️",
      desarrollo_id: 5,
    },
    {
      id: "b06",
      titulo: "GALATHA — Brochure 2026",
      descripcion: "Mérida Norte · Inspiración mediterránea",
      archivo: "public/downloads/brochures/Brochure Galatha 2026.pdf",
      icono: "🏢",
      desarrollo_id: 6,
    },
    {
      id: "b07",
      titulo: "HUNA — Brochure 2026",
      descripcion: "Mérida Norte · Conexión con la naturaleza",
      archivo: "public/downloads/brochures/Brochure Huna 2026.pdf",
      icono: "🌿",
      desarrollo_id: 7,
    },
    {
      id: "b08",
      titulo: "LIVIA — Brochure 2026",
      descripcion: "Cuauhtémoc, CDMX · Desarrollo premium en la capital",
      archivo: "public/downloads/brochures/BROCHURE LIVIA 2026.pdf",
      icono: "🏙️",
      desarrollo_id: 8,
    },
    {
      id: "b09",
      titulo: "MAKTUB — Brochure 2026",
      descripcion: "Mérida Norte · Roof garden y spa",
      archivo: "public/downloads/brochures/BROCHURE MAKTUB 2026 .pdf",
      icono: "🏢",
      desarrollo_id: 9,
    },
    {
      id: "b10",
      titulo: "NUAN TEMOZÓN — Brochure 2026",
      descripcion: "Temozón Norte, Mérida · Calidad y plusvalía",
      archivo: "public/downloads/brochures/Brochure NUAN TEMOZÓN 2026.pdf",
      icono: "🏢",
      desarrollo_id: 10,
    },
  ],

  reportes: [
    {
      id: "r01",
      titulo: "Mercado CDMX Q4 2024",
      descripcion:
        "Análisis de tendencias del mercado inmobiliario en Ciudad de México",
      archivo: "public/downloads/reportes/mercado-cdmx-q4-2024.pdf",
      icono: "📊",
    },
  ],

  guias: [
    {
      id: "g01",
      titulo: "Guía del Comprador",
      descripcion:
        "Todo lo que necesitas saber antes de invertir en bienes raíces",
      archivo: "public/downloads/guias/guia-comprador.pdf",
      icono: "📖",
    },
  ],

  contratos: [
    {
      id: "c01",
      titulo: "Promesa de Compraventa",
      descripcion:
        "Formato de promesa de compraventa para preventa residencial",
      archivo: "public/downloads/contratos/promesa-compraventa.docx",
      icono: "📋",
    },
  ],
};

/**
 * Devuelve todos los archivos de una categoría
 * @param {'brochures'|'reportes'|'guias'|'contratos'} categoria
 */
function getDescargas(categoria) {
  if (categoria && DESCARGAS[categoria]) return DESCARGAS[categoria];
  // Si no se pasa categoría, devuelve todo plano
  return Object.values(DESCARGAS).flat();
}

window.getDescargas = getDescargas;

// legal.js — VEXO Real Estate — Documentos legales
// Fuente: este archivo. Renderizado por renderPage('privacidad'|'terminos'|'aviso-legal'|'cookies')
// Cada sección: { titulo, fecha, contenido: [{ seccion, texto }] }

const LEGAL = {
  privacidad: {
    titulo: "Política de Privacidad",
    fecha: "Marzo 2026",
    contenido: [
      {
        seccion: "1. Responsable del tratamiento de datos",
        texto:
          "VEXO Real Estate, con correo electrónico ventas@vexorealestate.com, es responsable del tratamiento de los datos personales que nos proporciones a través de este sitio web.",
      },
      {
        seccion: "2. Datos que recopilamos",
        texto:
          "Recopilamos: nombre y apellido, correo electrónico, número de teléfono, ciudad de interés y preferencias de propiedad. Esta información es proporcionada voluntariamente cuando llenas el formulario de contacto.",
      },
      {
        seccion: "3. Finalidad del tratamiento",
        texto:
          "Los datos recopilados serán utilizados exclusivamente para: asesoría personalizada sobre desarrollos inmobiliarios, contacto y seguimiento de tu consulta, envío de información sobre propiedades de tu interés y mejora de nuestros servicios.",
      },
      {
        seccion: "4. Compartición de datos",
        texto:
          "No compartimos tu información personal con terceros sin tu consentimiento previo, salvo cuando sea requerido por autoridades competentes en cumplimiento de la ley, o cuando sea estrictamente necesario para procesar tu solicitud con desarrolladoras de confianza.",
      },
      {
        seccion: "5. Derechos del titular",
        texto:
          "Tienes derecho a: acceder a tus datos personales, rectificarlos si son incorrectos, solicitar su eliminación o portabilidad, y oponerte a su tratamiento. Para ejercer estos derechos, escríbenos a ayuda@vexorealestate.com.",
      },
      {
        seccion: "6. Seguridad",
        texto:
          "Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra pérdida, acceso no autorizado, divulgación o alteración.",
      },
      {
        seccion: "7. Cookies",
        texto:
          "Este sitio puede utilizar cookies para mejorar la experiencia. Consulta nuestra Política de Cookies para más información.",
      },
      {
        seccion: "8. Contacto",
        texto:
          "Para cualquier consulta sobre esta política, contáctanos en: ayuda@vexorealestate.com o al teléfono +52 55 2708 1749.",
      },
    ],
  },

  terminos: {
    titulo: "Términos y Condiciones",
    fecha: "Marzo 2026",
    contenido: [
      {
        seccion: "1. Aceptación de los términos",
        texto:
          "Al acceder y usar el sitio vexorealestate.com, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices el sitio.",
      },
      {
        seccion: "2. Información del sitio",
        texto:
          "La información publicada en este sitio web es de carácter informativo y comercial. Los precios, disponibilidad y características de las propiedades están sujetos a cambio sin previo aviso. Las imágenes mostradas son ilustrativas y pueden diferir del producto final.",
      },
      {
        seccion: "3. Naturaleza del servicio",
        texto:
          "VEXO Real Estate actúa como intermediario inmobiliario entre compradores e inversores y los desarrolladores de proyectos residenciales. No garantizamos la disponibilidad inmediata de las propiedades publicadas.",
      },
      {
        seccion: "4. Uso adecuado",
        texto:
          "El usuario se compromete a utilizar el sitio y sus servicios de manera lícita, sin fines fraudulentos, y a proporcionar información veraz en los formularios de contacto.",
      },
      {
        seccion: "5. Propiedad intelectual",
        texto:
          "Todos los contenidos del sitio (textos, imágenes, diseño, marca) son propiedad de VEXO Real Estate o de sus respectivos propietarios y están protegidos por leyes de propiedad intelectual.",
      },
      {
        seccion: "6. Limitación de responsabilidad",
        texto:
          "VEXO Real Estate no se hace responsable por decisiones de inversión tomadas únicamente con base en la información de este sitio. Recomendamos siempre asesorarse con profesionales calificados.",
      },
      {
        seccion: "7. Modificaciones",
        texto:
          "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor desde su publicación en el sitio.",
      },
      {
        seccion: "8. Legislación aplicable",
        texto:
          "Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa será sometida a los tribunales competentes de la Ciudad de México.",
      },
    ],
  },

  aviso_legal: {
    titulo: "Aviso Legal",
    fecha: "Marzo 2026",
    contenido: [
      {
        seccion: "Naturaleza informativa",
        texto:
          "La información contenida en vexorealestate.com tiene carácter informativo y comercial. VEXO Real Estate no garantiza la exactitud, completitud o vigencia de toda la información publicada.",
      },
      {
        seccion: "Disponibilidad de propiedades",
        texto:
          "VEXO Real Estate no garantiza la disponibilidad inmediata de las propiedades publicadas. Los precios y condiciones están sujetos a disponibilidad y pueden cambiar sin previo aviso.",
      },
      {
        seccion: "Imágenes ilustrativas",
        texto:
          "Las imágenes, renders y visualizaciones 3D mostradas en este sitio son de carácter ilustrativo. Las características finales de los desarrollos pueden variar respecto a lo mostrado.",
      },
      {
        seccion: "Intermediación",
        texto:
          "VEXO Real Estate actúa exclusivamente como intermediario inmobiliario. Los contratos de compraventa se celebran directamente entre el comprador y el desarrollador correspondiente.",
      },
      {
        seccion: "Asesoría profesional",
        texto:
          "La información de este sitio no sustituye la asesoría de un notario, abogado o asesor financiero certificado. Recomendamos consultar a profesionales antes de tomar decisiones de inversión.",
      },
    ],
  },

  cookies: {
    titulo: "Política de Cookies",
    fecha: "Marzo 2026",
    contenido: [
      {
        seccion: "¿Qué son las cookies?",
        texto:
          "Las cookies son pequeños archivos de texto que los sitios web colocan en tu dispositivo para mejorar tu experiencia de navegación y recopilar información de uso.",
      },
      {
        seccion: "Cookies que utilizamos",
        texto:
          "Cookies esenciales: necesarias para el funcionamiento básico del sitio (no requieren consentimiento). Cookies de análisis: nos ayudan a entender cómo los usuarios interactúan con el sitio para mejorarlo.",
      },
      {
        seccion: "Cookies de terceros",
        texto:
          "Podemos utilizar servicios de Google (Analytics, Maps) que instalan sus propias cookies. Estos servicios tienen sus propias políticas de privacidad.",
      },
      {
        seccion: "Control de cookies",
        texto:
          "Puedes configurar o desactivar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.",
      },
      {
        seccion: "Más información",
        texto:
          "Para dudas sobre el uso de cookies, contáctanos en ayuda@vexorealestate.com.",
      },
    ],
  },
};

window.LEGAL = LEGAL;

// propiedades.js — VEXO Real Estate
// Generado desde vexo_desarrollos_master.csv
// Total: 26 desarrollos | Mérida(11) CDMX(14) Playa del Carmen(1)
// Encoding: UTF-8 limpio | Lng: NEGATIVAS corregidas
// Última actualización: Abril 2026

const DESARROLLOS : {
  {
    id:1, slug:"alma-condos-merida",
    nombre:"ALMA CONDOS", nombre_corto:"Alma Condos",
    ciudad:"Mérida", estado:"Yucatán", zona:"Temozón Norte",
    direccion:"Temozón Norte, Mérida, Yucatán",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"oct-26",
    desarrolladora:"Cimer Desarrollos", arquitecto:"",
    niveles:3, total_unidades:33,
    destacado:true, orden:1,
    precio_desde:2099094, precio_hasta:3002878,
    moneda:"MXN", esquema_pago:"10% enganche",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:10, mensualidades:"",
    slogan:"Vive conectado. Vive exclusivo.", badge:"Preventa",
    descripcion_corta:"Alma Condos redefine la exclusividad urbana en Temozón Norte. 33 departamentos boutique con Social Rooftop.",
    descripcion_larga:"Desarrollo boutique en Temozón Norte con 33 departamentos equipados y zonas comunes excepcionales como Social Rooftop, coworking y bar con firepit.",
    amenidades:"Gym, cowork, bar, firepit, social rooftop, área grill, área asoleadero, área piscina, control de acceso",
    acabados:"Carpintería premium, modernidad y sofisticación en espacios",
    estacionamiento:"1 cajón por unidad",
    mascotas:false, seguridad:"Control de acceso",
    imagenes:["VEXO_WEB/Desarrollos/001_alma-condos-2026/alma-condos-2026-foto-01.jpg","VEXO_WEB/Desarrollos/001_alma-condos-2026/alma-condos-2026-foto-02.jpg","VEXO_WEB/Desarrollos/001_alma-condos-2026/alma-condos-2026-foto-03.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    brochure:"https://drive.google.com/file/d/1o5On_JYiXOAi8XIdQyVjXhokK9S_-mVS/view",
    video_url:"", tour360_url:"",
    lat:21.048, lng:-89.624,
    url_maps:"https://maps.app.goo.gl/nfEVqkaKgcocAFXx8",
    modelos:[{nombre:"1 Recámara",tipo:"Departamento",recamaras:1,banos:1.5,m2:52,precio:2099094,descripcion:"Nivel 2 y 3, con balcón",caracteristicas:""},{nombre:"2 Recámaras",tipo:"Departamento",recamaras:2,banos:2,m2:65,precio:2653685,descripcion:"Nivel 1, con balcón",caracteristicas:""},{nombre:"PB con Terraza",tipo:"Departamento",recamaras:2,banos:2,m2:72.52,precio:3002878,descripcion:"Planta baja con terraza privada",caracteristicas:""}],
    seo:{title:"Alma Condos Temozón Norte Mérida | VEXO",description:"Alma Condos Temozón Norte: 33 departamentos boutique con amenidades premium. Tu mejor inversión en Mérida.",keywords:"alma condos, temozón norte, departamentos mérida, preventa 2026"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:2, slug:"almaera-residencial-merida",
    nombre:"ALMAERA DPTS", nombre_corto:"Almaera",
    ciudad:"Mérida", estado:"Yucatán", zona:"Temozón Norte",
    direccion:"C. 79 x 40 Diagonal, Temozón Norte",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"Dic 2026 / Dic 2027",
    desarrolladora:"Ícaro Capital", arquitecto:"Apiron",
    niveles:5, total_unidades:45,
    destacado:true, orden:2,
    precio_desde:2866240, precio_hasta:4950000,
    moneda:"MXN", esquema_pago:"",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:10, mensualidades:"",
    slogan:"Un espacio con esencia propia, con vida.", badge:"Preventa",
    descripcion_corta:"Complejo moderno de ultralujo en Temozón Norte. 45 unidades con rooftop, piscina y coworking.",
    descripcion_larga:"Departamentos en Temozón Norte, diseñados para ofrecer máxima comodidad y rentabilidad. Acabados en mármol, granito y madera de piso a techo.",
    amenidades:"Lobby, coworking, sala de juntas, gimnasio, área de yoga, rooftop con piscina, área social/bar, juegos infantiles, pet park, elevadores",
    acabados:"Pisos de mármol, cocinas con mesetas de granito, baños con mesetas de mármol, puertas de madera piso a techo, clósets vestidos",
    estacionamiento:"1 cajón por unidad y bodega en 5to nivel",
    mascotas:true, seguridad:"Acceso controlado",
    imagenes:["VEXO_WEB/Desarrollos/002_almaera-2026/Brochure_ALMAERA_2026-02.jpg","VEXO_WEB/Desarrollos/002_almaera-2026/Brochure_ALMAERA_2026-03.jpg","VEXO_WEB/Desarrollos/002_almaera-2026/Brochure_ALMAERA_2026-04.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    brochure:"https://drive.google.com/file/d/1WqFntOWpDF9yQjiftmbv2_nnL649zIAc/view",
    video_url:"", tour360_url:"",
    lat:21.034, lng:-89.628,
    url_maps:"https://maps.app.goo.gl/cs9s2B4Sbke7AKJm6",
    modelos:[{nombre:"Aura Suite Premier",tipo:"Departamento",recamaras:1,banos:1.5,m2:74.4,precio:2866240,descripcion:"Suite con clóset vestidor",caracteristicas:""},{nombre:"Serena Loft",tipo:"Loft",recamaras:1,banos:1.5,m2:85.4,precio:3950000,descripcion:"Doble altura, balcón panorámico",caracteristicas:""},{nombre:"Éter Residence",tipo:"Departamento",recamaras:2,banos:2.5,m2:122,precio:4950000,descripcion:"Residencia frontal de máxima amplitud",caracteristicas:""}],
    seo:{title:"Almaera Temozón Norte Mérida | VEXO",description:"Almaera Temozón Norte: Exclusivos departamentos de ultralujo con amenidades wellness y rooftop. Inversión inteligente.",keywords:"almaera, temozón norte, departamentos lujo mérida, preventa 2026"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:3, slug:"amalia-residencial-merida",
    nombre:"AMALIA APARTMENTS", nombre_corto:"Amalia",
    ciudad:"Mérida", estado:"Yucatán", zona:"Temozón Norte",
    direccion:"Av. Temozón Norte, Mérida",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"Dic 2026 / Feb 2028",
    desarrolladora:"RICALPE", arquitecto:"",
    niveles:3, total_unidades:63,
    destacado:true, orden:3,
    precio_desde:2000000, precio_hasta:3300000,
    moneda:"MXN", esquema_pago:"20% enganche mínimo",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:20, mensualidades:"",
    slogan:"Vivir seguro. Crecer seguro.", badge:"Preventa",
    descripcion_corta:"63 departamentos con piscina privada en planta baja a minutos de La Isla y City Center.",
    descripcion_larga:"Amalia Apartments ofrece 63 unidades exclusivas. Los departamentos de planta baja cuentan con piscina y terraza privada.",
    amenidades:"Piscina con camastros, casa club, áreas sociales con grill, gimnasio equipado, áreas verdes",
    acabados:"Cocina equipada, terrazas privadas en planta baja",
    estacionamiento:"1 cajón por unidad",
    mascotas:true, seguridad:"Caseta de seguridad y estacionamiento para visitas",
    imagenes:["VEXO_WEB/Desarrollos/003_amalia/BROCHURE_AMALIA_2026-01.jpg","VEXO_WEB/Desarrollos/003_amalia/BROCHURE_AMALIA_2026-02.jpg","VEXO_WEB/Desarrollos/003_amalia/BROCHURE_AMALIA_2026-03.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    brochure:"https://drive.google.com/file/d/1G32mIesZyF7xoxqhepOuLwwy-8xdKmdL/view",
    video_url:"", tour360_url:"",
    lat:21.0385, lng:-89.6312,
    url_maps:"https://maps.app.goo.gl/EnQgidLLDDu3n1uZ6",
    modelos:[{nombre:"1R Planta Baja",tipo:"Departamento",recamaras:1,banos:1,m2:52.87,precio:2000000,descripcion:"Planta baja con piscina privada",caracteristicas:""},{nombre:"2R Nivel 1",tipo:"Departamento",recamaras:2,banos:2,m2:82.25,precio:2600000,descripcion:"Nivel 1 con espacios funcionales",caracteristicas:""},{nombre:"2R Planta Baja",tipo:"Departamento",recamaras:2,banos:2,m2:93.48,precio:3300000,descripcion:"Planta baja con piscina y terraza",caracteristicas:""}],
    seo:{title:"Amalia Apartments Temozón Norte | VEXO",description:"Amalia Apartments Temozón Norte: Depas de 1 y 2 recámaras con piscina privada y gimnasio. Invierte seguro.",keywords:"amalia apartments, temozón norte, piscina privada, mérida 2026"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:4, slug:"canea-residencial-merida",
    nombre:"CANEA PURE LIVING", nombre_corto:"Canea",
    ciudad:"Mérida", estado:"Yucatán", zona:"Temozón Norte",
    direccion:"Temozón Norte, Mérida",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"oct-26",
    desarrolladora:"CAVE Proyectos", arquitecto:"",
    niveles:3, total_unidades:26,
    destacado:true, orden:4,
    precio_desde:1820000, precio_hasta:3290000,
    moneda:"MXN", esquema_pago:"15% enganche, 10% a meses",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:15, mensualidades:"11",
    slogan:"Design for Pure Living.", badge:"Preventa",
    descripcion_corta:"26 departamentos boutique con acabados europeos y roof garden equipado en Temozón Norte.",
    descripcion_larga:"Canea es un complejo boutique de 26 departamentos. Mármol travertino, cancelería línea europea y granito Blanco Desiree.",
    amenidades:"Terraza social en azotea techada con pérgola metálica, mobiliario, bar, baños y asador, abundante vegetación, ducto de basura",
    acabados:"Mármol Travertino Puebla Fiorito en piso, Mármol Crema Marfil en baño, Cerámica antiderrapante en regadera, Granito Blanco Desiree en cocina, Cancelería línea europea, Cocina integral Zetti, Calentador eléctrico",
    estacionamiento:"1 a 2 cajones por unidad",
    mascotas:false, seguridad:"Caseta de vigilancia",
    imagenes:["VEXO_WEB/Desarrollos/004_canea-2026/canea-foto-01.jpg","VEXO_WEB/Desarrollos/004_canea-2026/canea-foto-02.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    brochure:"https://drive.google.com/file/d/10N4zturKBjdAV7maihGAME_roW-K2arX/view",
    video_url:"", tour360_url:"",
    lat:21.0736, lng:-89.5926,
    url_maps:"https://maps.app.goo.gl/z8kvhNno9zHXUH956",
    modelos:[{nombre:"View 1R",tipo:"Departamento",recamaras:1,banos:1,m2:50.5,precio:1820000,descripcion:"Nivel superior sin balcón",caracteristicas:""},{nombre:"Garden 1R",tipo:"Departamento",recamaras:1,banos:1,m2:65,precio:1940000,descripcion:"Planta baja con jardín privado 14.5m²",caracteristicas:""},{nombre:"View 2R",tipo:"Departamento",recamaras:2,banos:2.5,m2:109.1,precio:3290000,descripcion:"Nivel superior con balcón 10.4m²",caracteristicas:""}],
    seo:{title:"Canea Pure Living Temozón Norte | VEXO",description:"Canea Pure Living: 26 departamentos en Temozón Norte con acabados de lujo y roof garden equipado.",keywords:"canea pure living, temozón norte, departamentos boutique mérida"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:5, slug:"distrito-country-merida",
    nombre:"DISTRITO COUNTRY", nombre_corto:"Distrito Country",
    ciudad:"Mérida", estado:"Yucatán", zona:"Zona Country",
    direccion:"Carr. Dzibilchaltún, Zona Country, Mérida",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"jul-25",
    desarrolladora:"CAPRO", arquitecto:"",
    niveles:4, total_unidades:282,
    destacado:true, orden:5,
    precio_desde:1850000, precio_hasta:2060000,
    moneda:"MXN", esquema_pago:"5% enganche",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:5, mensualidades:"18",
    slogan:"Donde el mañana se encuentra con la naturaleza.", badge:"Nuevo",
    descripcion_corta:"Mega comunidad con más de 20 amenidades de primer nivel en Zona Country.",
    descripcion_larga:"Con más de 20 amenidades de primer nivel: cancha de pádel, cine, ice bath y múltiples rooftops.",
    amenidades:"Rooftops con piscina, sports bar, restaurante con terraza, gimnasio, salón de yoga, sauna, spa, barbería, ice bath, cine, salón de fiestas, cancha de pádel, ludoteca",
    acabados:"Carpintería en cocina, clósets y mueble bajo lavabo, parrilla eléctrica, calentador eléctrico, fijo de cristal templado y espejos en baños",
    estacionamiento:"Consultar",
    mascotas:false, seguridad:"Caseta de vigilancia",
    imagenes:["VEXO_WEB/Desarrollos/005_distrito-country-2026/distrito-foto-01.jpg","VEXO_WEB/Desarrollos/005_distrito-country-2026/distrito-foto-02.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    brochure:"",
    video_url:"", tour360_url:"",
    lat:21.1001, lng:-89.613,
    url_maps:"https://maps.app.goo.gl/JKYyyQ2dU6QPm22D7",
    modelos:[{nombre:"Torre Munara",tipo:"Departamento",recamaras:1,banos:1,m2:43,precio:1850000,descripcion:"Unidades hiper funcionales",caracteristicas:""},{nombre:"Torre Orieta N1-4",tipo:"Departamento",recamaras:1,banos:1,m2:43,precio:1995000,descripcion:"Nivel intermedio 1 al 4",caracteristicas:""},{nombre:"Torre Orieta PB",tipo:"Departamento",recamaras:1,banos:1,m2:43,precio:2060000,descripcion:"Planta Baja acceso inmediato",caracteristicas:""}],
    seo:{title:"Distrito Country Zona Country Mérida | VEXO",description:"Distrito Country Mérida: Más de 20 amenidades como cine y pádel en la mejor zona. Inversión y bienestar.",keywords:"distrito country, zona country mérida, departamentos mérida"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:6, slug:"galatha-dzitya-residencial",
    nombre:"GALATHA LEGACY LIVING", nombre_corto:"Galatha",
    ciudad:"Mérida", estado:"Yucatán", zona:"Dzityá",
    direccion:"Dzityá, Mérida, Yucatán",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"dic-26",
    desarrolladora:"Legacy Living", arquitecto:"",
    niveles:3, total_unidades:21,
    destacado:true, orden:6,
    precio_desde:2255000, precio_hasta:2295000,
    moneda:"MXN", esquema_pago:"10% enganche + saldo",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:10, mensualidades:"",
    slogan:"Elegancia & Comodidad.", badge:"Preventa",
    descripcion_corta:"21 departamentos boutique full equipados con 3 ACs, bar climatizado y rooftop en Dzityá.",
    descripcion_larga:"Desarrollo boutique de 21 unidades totalmente equipadas con climas. Excelente plusvalía garantizada en Dzityá.",
    amenidades:"Alberca, terraza social climatizada con bar, rooftop amueblado, bodegas administrativas, portón eléctrico",
    acabados:"Piso cerámico modelo travertino, granito en cocina, carpintería en cocina y clósets, canceles fijos en baños, acabados de lujo en baño, parrilla y calentador eléctrico, 3 aires acondicionados",
    estacionamiento:"1 cajón por unidad",
    mascotas:false, seguridad:"Portón eléctrico, circuito cerrado de cámaras, caseta de vigilancia",
    imagenes:["VEXO_WEB/Desarrollos/006_galatha/galatha-foto-01.jpg","VEXO_WEB/Desarrollos/006_galatha/galatha-foto-02.jpg","VEXO_WEB/Desarrollos/006_galatha/galatha-foto-03.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    brochure:"https://drive.google.com/file/d/1P86FMFaruFzD4w6wUjshWM2tl2gbvKsY/view",
    video_url:"", tour360_url:"",
    lat:21.0594, lng:-89.6537,
    url_maps:"https://maps.app.goo.gl/ReMfLE7UMqzBsRCw5",
    modelos:[{nombre:"Modelo Cielo N2",tipo:"Departamento",recamaras:2,banos:2,m2:63.44,precio:2255000,descripcion:"Nivel 2",caracteristicas:""},{nombre:"Modelo Alba N1",tipo:"Departamento",recamaras:2,banos:2,m2:61.8,precio:2275000,descripcion:"Nivel 1",caracteristicas:""},{nombre:"Modelo Alba PB",tipo:"Departamento",recamaras:2,banos:2,m2:61.8,precio:2295000,descripcion:"Planta Baja",caracteristicas:""}],
    seo:{title:"Galatha Legacy Living Dzityá Mérida | VEXO",description:"Galatha Legacy Living Dzityá: Departamentos full equipados con bar climatizado y piscina. Alto retorno de inversión.",keywords:"galatha, dzityá, mérida, departamentos lujo dzityá"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:7, slug:"huna-cholul-residencial",
    nombre:"HUNA", nombre_corto:"Huna",
    ciudad:"Mérida", estado:"Yucatán", zona:"Cholul",
    direccion:"Carr. Cholul-Progreso, Mérida",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"ene-27",
    desarrolladora:"FH Construcción", arquitecto:"Apiron",
    niveles:3, total_unidades:36,
    destacado:true, orden:7,
    precio_desde:1499000, precio_hasta:1799000,
    moneda:"MXN", esquema_pago:"20% enganche",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:20, mensualidades:"",
    slogan:"Armonía y tecnología.", badge:"Preventa",
    descripcion_corta:"36 departamentos en Cholul. Coworking, piscina y diseño funcional ideal para jóvenes.",
    descripcion_larga:"36 departamentos en Cholul con co-work y piscina. Equilibrio, confort y conectividad total.",
    amenidades:"Centro de lavado, área co-work, piscina general, área social 2 niveles, áreas verdes con senderos, terraza social, baño de visitas",
    acabados:"Cancel de aluminio línea 3 color natural, puertas de encino, mesetas de granito en cocina, piso cerámica formato grande, mesetas de mármol en baño",
    estacionamiento:"Cajones techados con mallasombra",
    mascotas:false, seguridad:"Acceso controlado, caseta de vigilancia",
    imagenes:["VEXO_WEB/Desarrollos/007_huna-2026/huna-foto-01.jpg","VEXO_WEB/Desarrollos/007_huna-2026/huna-foto-02.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80",
    brochure:"",
    video_url:"", tour360_url:"",
    lat:21.0523, lng:-89.5666,
    url_maps:"https://maps.app.goo.gl/QmvBjoQNDhAzSNpf6",
    modelos:[{nombre:"Huna Single N2",tipo:"Departamento",recamaras:1,banos:1,m2:40.8,precio:1499000,descripcion:"Práctico y funcional en Nivel 2",caracteristicas:""},{nombre:"Huna Single PB",tipo:"Departamento",recamaras:1,banos:1,m2:40.8,precio:1649000,descripcion:"Planta Baja con rápido acceso",caracteristicas:""},{nombre:"Huna Plus N1",tipo:"Departamento",recamaras:1,banos:1.5,m2:57.6,precio:1799000,descripcion:"Nivel 1 con clóset de blancos y amplitud",caracteristicas:""}],
    seo:{title:"Huna Cholul Mérida Departamentos | VEXO",description:"Huna en Cholul, Mérida: Departamentos ideales para inversión con co-work y piscina. Excelente diseño y plusvalía.",keywords:"huna, cholul, mérida, departamentos jóvenes cholul"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:8, slug:"livia-cholul-residencial",
    nombre:"LIVIA APARTMENT LIVING", nombre_corto:"Livia",
    ciudad:"Mérida", estado:"Yucatán", zona:"Cholul",
    direccion:"Cholul, Mérida, Yucatán",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"dic-26",
    desarrolladora:"Consultar", arquitecto:"",
    niveles:3, total_unidades:36,
    destacado:true, orden:8,
    precio_desde:1745000, precio_hasta:2806000,
    moneda:"MXN", esquema_pago:"15% enganche",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:15, mensualidades:"10",
    slogan:"Es momento de vivir a tu manera.", badge:"Preventa",
    descripcion_corta:"36 departamentos con green de golf, cava privada y sport bar en Cholul.",
    descripcion_larga:"36 departamentos frente a grandes plazas. Exclusividad de autor con amenidades inigualables.",
    amenidades:"Rooftop, terraza social, piscina, camastros, mail room, área grill, zona zen, green de golf, pet friendly, cava privada, sport bar",
    acabados:"Carpintería bajo meseta de cocina, cristal templado en baños, meseta de granito, piso cerámico 60x60, clósets semivestidos, parrilla y calentador eléctrico",
    estacionamiento:"Estacionamiento numerado",
    mascotas:true, seguridad:"Control de acceso",
    imagenes:["VEXO_WEB/Desarrollos/008_livia-2026/livia-foto-01.jpg","VEXO_WEB/Desarrollos/008_livia-2026/livia-foto-02.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    brochure:"",
    video_url:"", tour360_url:"",
    lat:21.048, lng:-89.5726,
    url_maps:"https://maps.app.goo.gl/7Eee9rGdyBQiU9xXA",
    modelos:[{nombre:"Livia Solo",tipo:"Departamento",recamaras:1,banos:1,m2:42,precio:1745000,descripcion:"Configuración eficiente en Nivel 1",caracteristicas:""},{nombre:"Livia Duo N1",tipo:"Departamento",recamaras:2,banos:2,m2:60,precio:2360000,descripcion:"Dos recámaras en nivel superior",caracteristicas:""},{nombre:"Livia Duo PB",tipo:"Departamento",recamaras:2,banos:2,m2:70,precio:2806000,descripcion:"Dos recámaras con jardín privado",caracteristicas:""}],
    seo:{title:"Livia Apartment Living Cholul | VEXO",description:"Livia Apartment Living en Cholul: Modernos depas con green de golf y cava privada. Exclusividad y gran retorno.",keywords:"livia apartment, cholul, mérida, green de golf cholul"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:9, slug:"maktub-condos-merida",
    nombre:"MAKTUB INSPIRING SPACES", nombre_corto:"Maktub",
    ciudad:"Mérida", estado:"Yucatán", zona:"Temozón Norte",
    direccion:"Temozón Norte, Mérida",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"jun-26",
    desarrolladora:"Maktub Desarrollos", arquitecto:"",
    niveles:3, total_unidades:22,
    destacado:true, orden:9,
    precio_desde:1839000, precio_hasta:2799000,
    moneda:"MXN", esquema_pago:"20% enganche mínimo",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:20, mensualidades:"",
    slogan:"Inspiring Spaces.", badge:"Preventa",
    descripcion_corta:"22 unidades de lujo con mármol travertino y nogal en Temozón Norte.",
    descripcion_larga:"Exactamente 22 unidades de lujo con detalles estéticos incomparables. Funcionalidad y vanguardia.",
    amenidades:"Áreas verdes, camastros, piscina, bar, estacionamiento techado y visitas, área de basura",
    acabados:"Parrilla eléctrica, carpintería en clósets, carpintería en nogal en cocina, granito Dallas en cocina, mármol travertino en baños, piso 60x60",
    estacionamiento:"Estacionamiento techado y visitas",
    mascotas:false, seguridad:"Portón eléctrico",
    imagenes:["VEXO_WEB/Desarrollos/009_maktub/maktub-foto-01.jpg","VEXO_WEB/Desarrollos/009_maktub/maktub-foto-02.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    brochure:"https://drive.google.com/file/d/1TcXH6KkjWBzVgNFd7XyV_HKHxGC8gB3D/view",
    video_url:"", tour360_url:"",
    lat:21.0309, lng:-89.5995,
    url_maps:"https://maps.app.goo.gl/VLf2KVMYWATAfby56",
    modelos:[{nombre:"Modelo A 1R",tipo:"Departamento",recamaras:1,banos:1,m2:46.6,precio:1999000,descripcion:"1 recámara en nivel superior",caracteristicas:""},{nombre:"Modelo B 2R",tipo:"Departamento",recamaras:2,banos:2,m2:87.3,precio:2749000,descripcion:"2 recámaras amplias y vestibuladas",caracteristicas:""},{nombre:"Modelo B Terraza",tipo:"Departamento",recamaras:2,banos:2,m2:94.94,precio:2799000,descripcion:"Con terraza amplia adicional",caracteristicas:""}],
    seo:{title:"Maktub Inspiring Spaces Temozón | VEXO",description:"Maktub Temozón Norte: 22 unidades de lujo con mármol y nogal. Disfruta exclusividad en la mejor zona de Mérida.",keywords:"maktub, inspiring spaces, temozón norte, lujo mérida"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:10, slug:"nuan-residencial-merida",
    nombre:"NUAN NEW AMBIENT", nombre_corto:"Nuan",
    ciudad:"Mérida", estado:"Yucatán", zona:"Temozón Norte",
    direccion:"Temozón Norte, Mérida",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"dic-27",
    desarrolladora:"A2 Constructora", arquitecto:"",
    niveles:5, total_unidades:45,
    destacado:true, orden:10,
    precio_desde:1980000, precio_hasta:2890000,
    moneda:"MXN", esquema_pago:"10% enganche",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:10, mensualidades:"20",
    slogan:"New Ambient.", badge:"Preventa",
    descripcion_corta:"Departamentos de súper lujo con cava, cowork, meeting rooms y diseño bioclimático en Temozón Norte.",
    descripcion_larga:"Departamentos de súper lujo en Temozón Norte con cava y diseño bioclimático. Meeting rooms y fitness incluidos.",
    amenidades:"Bar climatizado con cava y terraza, grill, piscina, 2 meeting rooms, social garden, jardín central, cowork, TV Room, fitness room, pet park",
    acabados:"Pisos de mármol Veracruz mate, mármol Veracruz avejentado en terrazas, granito Black Bravo en cocina, mármol Santo Tomás en baños, puertas de madera de encino",
    estacionamiento:"Techados con malla sombra",
    mascotas:true, seguridad:"Caseta de vigilancia",
    imagenes:["VEXO_WEB/Desarrollos/010_brochure-nuan-temozn-2026/nuan-foto-01.jpg","VEXO_WEB/Desarrollos/010_brochure-nuan-temozn-2026/nuan-foto-02.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    brochure:"https://drive.google.com/file/d/14Bi68gBZhlYzC2craIglqsON_JJTSg_c/view",
    video_url:"", tour360_url:"",
    lat:21.0696, lng:-89.6075,
    url_maps:"https://maps.app.goo.gl/wtNkbM11eGFydLh68",
    modelos:[{nombre:"Modelo A 1R",tipo:"Departamento",recamaras:1,banos:1,m2:47.5,precio:1980000,descripcion:"Configuración con balcón",caracteristicas:""},{nombre:"Modelo B 2R",tipo:"Departamento",recamaras:2,banos:2,m2:64.5,precio:2530000,descripcion:"Distribución amplia con balcón",caracteristicas:""},{nombre:"Modelo B PB",tipo:"Departamento",recamaras:2,banos:2,m2:64.5,precio:2890000,descripcion:"Planta baja con jardín espectacular",caracteristicas:""}],
    seo:{title:"Nuan New Ambient Temozón Norte | VEXO",description:"Nuan Temozón Norte: Depas de lujo con cava, cowork y mármol Veracruz. Vanguardia arquitectónica en Mérida.",keywords:"nuan, new ambient, temozón norte, mérida 2027"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {
    id:11, slug:"covalia-departamentos-merida",
    nombre:"COVALIA", nombre_corto:"Covalia",
    ciudad:"Mérida", estado:"Yucatán", zona:"Temozón Norte",
    direccion:"Temozón Norte, Mérida",
    tipo:"Departamentos", estatus:"Preventa", fecha_entrega:"ene-28",
    desarrolladora:"Calume Desarrollos", arquitecto:"",
    niveles:4, total_unidades:56,
    destacado:true, orden:11,
    precio_desde:2035000, precio_hasta:2735000,
    moneda:"MXN", esquema_pago:"25% enganche",
    financiamiento:"Bancario / Recurso Propio",
    enganche_pct:25, mensualidades:"",
    slogan:"Vive Mérida al máximo.", badge:"Preventa",
    descripcion_corta:"56 departamentos con spots de lectura, área zen y alberca en Temozón Norte.",
    descripcion_larga:"56 departamentos con spots de lectura y áreas zen. Arquitectura para disfrutar el presente en Mérida.",
    amenidades:"Áreas verdes, área zen, pet park, dos elevadores, spots de lectura, salón social, terraza, alberca",
    acabados:"Piso de cerámica en todos los departamentos, zóclos de cerámica 7 cm, yeso en muros, puertas de madera de piso a techo, cancelería 3 pulgadas, cocinas con meseta de granito, parrilla eléctrica",
    estacionamiento:"Concreto estampado",
    mascotas:true, seguridad:"Caseta de vigilancia",
    imagenes:["VEXO_WEB/Desarrollos/011_brochure/covalia-foto-01.jpg","VEXO_WEB/Desarrollos/011_brochure/covalia-foto-02.jpg"],
    imagen_fallback:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    brochure:"https://drive.google.com/file/d/1t7nVof4d25mcg-kBKgKNfn-696LGBEtN/view",
    video_url:"", tour360_url:"",
    lat:21.0571, lng:-89.6227,
    url_maps:"https://maps.app.goo.gl/phauTHFiduQSyvSq9",
    modelos:[{nombre:"Modelo A 1R",tipo:"Departamento",recamaras:1,banos:1,m2:51,precio:2035000,descripcion:"1 recámara optimizada",caracteristicas:""},{nombre:"Modelo B2 2R",tipo:"Departamento",recamaras:2,banos:2,m2:62,precio:2475000,descripcion:"2 recámaras con balcón",caracteristicas:""},{nombre:"Modelo B1 2R XL",tipo:"Departamento",recamaras:2,banos:2,m2:80,precio:2735000,descripcion:"2 recámaras tamaño XL con balcón",caracteristicas:""}],
    seo:{title:"Covalia Temozón Norte Mérida | VEXO",description:"Covalia Temozón Norte: 56 departamentos con alberca, pet park y elevadores. Invierte seguro en Mérida.",keywords:"covalia, temozón norte, mérida 2028, departamentos mérida"},
    correo_ventas:"ventas@vexorealestate.com", whatsapp:"525527081749",
    instagram:"https://www.instagram.com/vexo_bienesraices",
    facebook:"https://www.facebook.com/profile.php?id=61577530904134",
    calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad:"Disponible",
  },
  {id:12,slug:"basalto-narvarte",nombre:"BASALTO NARVARTE",nombre_corto:"Basalto",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Narvarte",direccion:"Calle Pitágoras 604, Col. Narvarte",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:12,precio_desde:12250000,precio_hasta:12250000,moneda:"MXN",esquema_pago:"20% a la firma, 30% diferido 6 meses",financiamiento:"Directo",enganche_pct:20,mensualidades:"6",slogan:"Vive tu ciudad",badge:"Preventa",descripcion_corta:"Exclusividad en Narvarte, una de las mejores colonias de CDMX.",descripcion_larga:"Desarrollo boutique en una de las mejores zonas de Ciudad de México con rooftop privado.",amenidades:"Rooftop con espacios privativos",acabados:"Consultar con asesor",estacionamiento:"3 cajones",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.3909,lng:-99.1578,url_maps:"https://maps.app.goo.gl/Sv8daNGNn6TgBjfq8",modelos:[{nombre:"Tipo Estudio",tipo:"Departamento",recamaras:1,banos:1,m2:334,precio:12250000,descripcion:"Espacio amplio de lujo",caracteristicas:"Iluminación natural"},{nombre:"Tipo Amplio",tipo:"Departamento",recamaras:2,banos:2,m2:336,precio:12250000,descripcion:"Exclusividad residencial",caracteristicas:"Amplitud superior"}],seo:{title:"Basalto Narvarte CDMX | VEXO Real Estate",description:"Departamentos de vanguardia en Narvarte, Ciudad de México. Tu mejor inversión en CDMX.",keywords:"basalto narvarte, departamentos narvarte, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:13,slug:"chapultepec-430",nombre:"CHAPULTEPEC 430",nombre_corto:"Chapultepec 430",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Chapultepec",direccion:"Av. Chapultepec 430, Juárez, Cuauhtémoc",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Capital Cero",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:13,precio_desde:2800000,precio_hasta:26266700,moneda:"MXN",esquema_pago:"Pago único $500,000 y saldo a la entrega",financiamiento:"Directo / Bancario",enganche_pct:10,mensualidades:"",slogan:"Tu espacio en Chapultepec",badge:"Preventa",descripcion_corta:"Estilo de vida frente al bosque de Chapultepec.",descripcion_larga:"Ubicación envidiable en Chapultepec con diseño vanguardista y amenidades premium.",amenidades:"Recepción e-commerce, servicio de herramientas, cuarto de lavado, coworking, WiFi, rooftop lounge, espacio fitness, bicicletas",acabados:"Acabados a elección verde o encino",estacionamiento:"No incluido",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4221,lng:-99.1715,url_maps:"https://maps.app.goo.gl/TtFD9iuZzvDT2E6Z6",modelos:[{nombre:"Estudio",tipo:"Departamento",recamaras:1,banos:1,m2:34,precio:2800000,descripcion:"Vivienda mínima habitable",caracteristicas:"Ventanales amplios"},{nombre:"Local L01",tipo:"Local Comercial",recamaras:0,banos:0,m2:58.06,precio:19618300,descripcion:"Local para renta",caracteristicas:"Uso de suelo comercial"}],seo:{title:"Chapultepec 430 CDMX | VEXO Real Estate",description:"Desarrollo exclusivo sobre avenida Chapultepec. Invierte en el corazón de Ciudad de México.",keywords:"chapultepec 430, departamentos chapultepec, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:14,slug:"magnolia-chapultepec",nombre:"MAGNOLIA CHAPULTEPEC",nombre_corto:"Magnolia",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Chapultepec",direccion:"Av. Chapultepec 43, Cuauhtémoc C.P. 06040",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:14,precio_desde:2390021,precio_hasta:3830629,moneda:"MXN",esquema_pago:"$50,000 apartado, $50,000 a la firma",financiamiento:"Directo",enganche_pct:10,mensualidades:"",slogan:"Donde florece tu vida",badge:"Preventa",descripcion_corta:"Tu refugio urbano en Chapultepec, a minutos de Paseo de la Reforma.",descripcion_larga:"Modernidad y confort a minutos de Paseo de la Reforma. Diseño contemporáneo.",amenidades:"Rooftop lounge, bicicletas, cuarto de herramientas, bodega e-commerce, lavandería, concierge, valet parking",acabados:"Pisos cerámico tipo madera nuez 30x120, clósets roble Mérida, cubiertas de cuarzo Calacatta",estacionamiento:"Valet Parking",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4268,lng:-99.154,url_maps:"https://maps.app.goo.gl/72A4FwznA7NtWCv69",modelos:[{nombre:"Tipo 04",tipo:"Departamento",recamaras:1,banos:1,m2:30.94,precio:2390021,descripcion:"Vivienda mínima",caracteristicas:"Balcón"},{nombre:"Tipo 01",tipo:"Departamento",recamaras:1,banos:1,m2:45.25,precio:3830629,descripcion:"Espacio cómodo",caracteristicas:"Balcón"}],seo:{title:"Magnolia Chapultepec CDMX | VEXO",description:"Magnolia Chapultepec: Diseño contemporáneo y vida cosmopolita en Ciudad de México.",keywords:"magnolia chapultepec, departamentos chapultepec, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:15,slug:"marsala-san-angel",nombre:"MARSALA NUEVO SAN ÁNGEL",nombre_corto:"Marsala",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Nuevo San Ángel",direccion:"Blvd. Adolfo Mateos 1793, Perifrico y Barranca del Muerto",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:15,precio_desde:2152734,precio_hasta:3092000,moneda:"MXN",esquema_pago:"$50,000 apartado, $50,000 contrato, 10 mensualidades de $15,000",financiamiento:"Directo",enganche_pct:10,mensualidades:"10",slogan:"Vive el sur de la ciudad",badge:"Preventa",descripcion_corta:"Confort al sur de CDMX. Departamentos premium en Nuevo San Ángel con amenidades excepcionales.",descripcion_larga:"Departamentos premium en Nuevo San Ángel con sky bar, rooftop yoga y jardín para mascotas.",amenidades:"Lavandería, coworking, cuarto de herramientas, valet parking, recepción e-commerce, sky bar, jardín mascotas, área fitness, asadores, rooftop yoga",acabados:"Consultar con asesor",estacionamiento:"Valet Parking",mascotas:true,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.3664,lng:-99.1937,url_maps:"https://maps.app.goo.gl/Mcn1xJLqgtkKd1Pu6",modelos:[{nombre:"1 Recámara",tipo:"Departamento",recamaras:1,banos:1,m2:30,precio:2152734,descripcion:"Ideal para rentas",caracteristicas:"Balcón"},{nombre:"2 Recámaras",tipo:"Departamento",recamaras:2,banos:2,m2:51.87,precio:3092000,descripcion:"Amplitud familiar",caracteristicas:"Iluminación natural"}],seo:{title:"Marsala Nuevo San Ángel CDMX | VEXO",description:"Tu nuevo hogar al sur de CDMX. Marsala Nuevo San Ángel, departamentos premium con sky bar.",keywords:"marsala nuevo san ángel, departamentos sur cdmx, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:16,slug:"monumento-31",nombre:"MONUMENTO 31",nombre_corto:"Monumento 31",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Tabacalera",direccion:"Plaza de la República 31, Tabacalera",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:16,precio_desde:3626040,precio_hasta:5578846,moneda:"MXN",esquema_pago:"$50,000 apartado, $50,000 firma, 36 mensualidades de $20,000",financiamiento:"Directo",enganche_pct:10,mensualidades:"36",slogan:"Tu vida monumental",badge:"Preventa",descripcion_corta:"Vanguardia y diseño junto al Monumento a la Revolución.",descripcion_larga:"Desarrollo urbano con las mejores vistas y comodidades junto al Monumento a la Revolución.",amenidades:"WiFi, e-commerce, bicicletas, lavandería, servicio de herramientas, rooftop lounge, coworking, co-librería",acabados:"Consultar con asesor",estacionamiento:"No incluido",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4369,lng:-99.1568,url_maps:"https://maps.app.goo.gl/y3Ew2CmznTcNsBoi6",modelos:[{nombre:"Tipo C",tipo:"Departamento",recamaras:1,banos:1,m2:45.1,precio:3626040,descripcion:"Vista Frontón",caracteristicas:"Balcón 5.12 m²"},{nombre:"Tipo Dúplex",tipo:"Departamento",recamaras:1,banos:1.5,m2:51.16,precio:5578846,descripcion:"Distribución PB y PA",caracteristicas:"Balcón 5.12 m²"}],seo:{title:"Monumento 31 CDMX | VEXO Real Estate",description:"Modernidad, confort y excelente ubicación junto al Monumento a la Revolución en Ciudad de México.",keywords:"monumento 31, departamentos tabacalera, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:17,slug:"merida-94-colonia-roma",nombre:"MÉRIDA 94",nombre_corto:"Mérida 94",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Colonia Roma Norte",direccion:"Mérida 94, Roma Norte, Cuauhtémoc",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:17,precio_desde:7520000,precio_hasta:18800000,moneda:"MXN",esquema_pago:"$50,000 apartado. 20% a la firma, 20% diferido a 24 meses",financiamiento:"Directo",enganche_pct:20,mensualidades:"24",slogan:"Esencia urbana en la Roma",badge:"Preventa",descripcion_corta:"Vivir en la Colonia Roma Norte, CDMX. Exclusividad en el vibrante corazón cultural de la ciudad.",descripcion_larga:"Exclusividad en el vibrante corazón cultural de Ciudad de México. Diseño vanguardista.",amenidades:"Accesos peatonal y vehicular, lobby de recepción, elevador y control de accesos",acabados:"Consultar con asesor",estacionamiento:"2 cajones incluidos",mascotas:false,seguridad:"Control de accesos",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.42,lng:-99.16,url_maps:"https://maps.app.goo.gl/GRXYGmX5d2FJHXePA",modelos:[{nombre:"Nivel 1 2R",tipo:"Departamento",recamaras:2,banos:2,m2:79.8,precio:7520000,descripcion:"Iluminación natural",caracteristicas:"Vista patio central"},{nombre:"Dúplex",tipo:"Departamento",recamaras:2,banos:2,m2:239.4,precio:18800000,descripcion:"PB, PA y Roof privado",caracteristicas:"Rooftop 79.80 m²"}],seo:{title:"Mérida 94 Colonia Roma Norte CDMX | VEXO",description:"Invierte en Mérida 94, departamentos de vanguardia en la Colonia Roma Norte, Ciudad de México.",keywords:"mérida 94, colonia roma norte, departamentos roma cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:18,slug:"vertice-narvarte",nombre:"VÉRTICE NARVARTE",nombre_corto:"Vértice",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Narvarte",direccion:"Av. Xola 32, Narvarte, Benito Juárez",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:18,precio_desde:3251900,precio_hasta:8912000,moneda:"MXN",esquema_pago:"$50,000 apartado, $450,000 firma. Saldo contra entrega",financiamiento:"Directo",enganche_pct:10,mensualidades:"",slogan:"El vértice de tu vida",badge:"Preventa",descripcion_corta:"El punto de encuentro en Narvarte. Torres Galicia y Xola para la vida contemporánea.",descripcion_larga:"Torres Galicia y Xola diseñadas para la vida contemporánea en Narvarte.",amenidades:"Rooftop lounge y lavandería",acabados:"Consultar con asesor",estacionamiento:"Algunos incluyen, ver lista de precios",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.3952,lng:-99.1475,url_maps:"https://maps.app.goo.gl/q69yKXdYv13WZ3A9A",modelos:[{nombre:"1 Recámara",tipo:"Departamento",recamaras:1,banos:1,m2:52,precio:3251900,descripcion:"Diseño funcional",caracteristicas:"Espacios optimizados"},{nombre:"Penthouse",tipo:"Penthouse",recamaras:3,banos:3,m2:222,precio:8912000,descripcion:"Penthouse exclusivo",caracteristicas:"Terrazas"}],seo:{title:"Vértice Narvarte CDMX | VEXO Real Estate",description:"Complejo Vértice en Narvarte. Diseño innovador y amenidades top en Ciudad de México.",keywords:"vértice narvarte, departamentos narvarte, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:19,slug:"orquidea-coyoacan",nombre:"ORQUÍDEA COYOACÁN",nombre_corto:"Orquídea",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Coyoacán",direccion:"Calzada de Tlalpan 2875, Coyoacán",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:19,precio_desde:1837619,precio_hasta:5547872,moneda:"MXN",esquema_pago:"Aparta con $100,000. Alineamos a tu capacidad de enganche",financiamiento:"Directo",enganche_pct:10,mensualidades:"",slogan:"Naturaleza urbana en Coyoacán",badge:"Preventa",descripcion_corta:"Tradición y modernidad en Coyoacán, el barrio más encantador de CDMX.",descripcion_larga:"Vive el sur con el encanto único de Coyoacán. Fusión de historia y exclusividad.",amenidades:"Cuarto de herramientas, rooftop yoga, coworking, rooftop lounge, lavandería, cuarto acústico, pista de jogging, espacio fitness, zona infantil, bicicletas, recarga autos eléctricos, lavado mascotas, asadores",acabados:"Consultar con asesor",estacionamiento:"Algunos incluyen, ver lista de precios",mascotas:true,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.3175,lng:-99.142,url_maps:"https://maps.app.goo.gl/KAeagWNjFacL6A579",modelos:[{nombre:"1 Recámara",tipo:"Departamento",recamaras:1,banos:1,m2:35,precio:1837619,descripcion:"Mínimo habitable",caracteristicas:"Funcional"},{nombre:"3 Recámaras",tipo:"Departamento",recamaras:3,banos:2,m2:103,precio:5547872,descripcion:"Residencial amplio",caracteristicas:"Balcón amplio"}],seo:{title:"Orquídea Coyoacán CDMX | VEXO Real Estate",description:"Departamentos de lujo en Coyoacán. Fusión perfecta de historia y exclusividad en Ciudad de México.",keywords:"orquídea coyoacán, departamentos coyoacán, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:20,slug:"girasol-condesa",nombre:"GIRASOL CONDESA",nombre_corto:"Girasol",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Condesa",direccion:"Cto. Interior Mtro. José Vasconcelos 82, Condesa",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:20,precio_desde:3070781,precio_hasta:8251757,moneda:"MXN",esquema_pago:"$50,000 apartado, $450,000 a la firma, resto contra entrega",financiamiento:"Bancario / Propio",enganche_pct:10,mensualidades:"",slogan:"Brilla en la Condesa",badge:"Preventa",descripcion_corta:"La mejor vida en la Condesa, la colonia más deseada de Ciudad de México.",descripcion_larga:"Proyecto cosmopolita en la colonia más deseada de CDMX.",amenidades:"Rooftop lounge, bicicletas, cuarto de herramientas, coworking, WiFi, lavandería, co-librería, e-commerce, espacio fitness, valet parking",acabados:"Consultar con asesor",estacionamiento:"Valet Parking",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4174,lng:-99.1809,url_maps:"https://maps.app.goo.gl/sE3Pap2LPQp1iEdFA",modelos:[{nombre:"Tipo 02 1R",tipo:"Departamento",recamaras:1,banos:1,m2:33.23,precio:3070781,descripcion:"Vista interior",caracteristicas:"Balcón variable"},{nombre:"Garden PB 2R",tipo:"Departamento",recamaras:2,banos:2,m2:130.53,precio:8251757,descripcion:"Amplio Garden",caracteristicas:"Balcón 68.98 m²"}],seo:{title:"Girasol Condesa CDMX | VEXO Real Estate",description:"Departamentos en la icónica Condesa. Diseño, lujo y estilo de vida en Ciudad de México.",keywords:"girasol condesa, departamentos condesa, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:21,slug:"blum-residencial",nombre:"BLUM RESIDENCIAL",nombre_corto:"Blum",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Santa Fe",direccion:"Prol. Paseo de la Reforma 489, Santa Fe",tipo:"Departamentos",estatus:"Entrega Inmediata",fecha_entrega:"Disponible ahora",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:21,precio_desde:3810686,precio_hasta:7187250,moneda:"MXN",esquema_pago:"Entrega inmediata",financiamiento:"Bancario / Propio",enganche_pct:10,mensualidades:"",slogan:"Vive a otro nivel",badge:"Disponible",descripcion_corta:"Exclusividad residencial en Santa Fe. Entrega inmediata.",descripcion_larga:"Un concepto innovador para la vida moderna en Santa Fe, Ciudad de México.",amenidades:"Consultar con asesor",acabados:"Consultar con asesor",estacionamiento:"Consultar",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.3769,lng:-99.2614,url_maps:"https://maps.app.goo.gl/YjnZ5Gsy35LRQgUA7",modelos:[{nombre:"Tipo 1R",tipo:"Departamento",recamaras:1,banos:1,m2:60,precio:3810686,descripcion:"Ideal para inversión",caracteristicas:"Funcional"},{nombre:"Tipo 2R Amplio",tipo:"Departamento",recamaras:2,banos:2,m2:95,precio:7187250,descripcion:"Máxima amplitud",caracteristicas:"Diseño contemporáneo"}],seo:{title:"Blum Residencial Santa Fe CDMX | VEXO",description:"Blum Residencial, entrega inmediata en Santa Fe. Calidad de vida superior en Ciudad de México.",keywords:"blum residencial, santa fe cdmx, departamentos santa fe"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:22,slug:"xaviera-departamentos",nombre:"XAVIERA",nombre_corto:"Xaviera",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Cuauhtémoc",direccion:"Av. Cuauhtémoc 245, Cuauhtémoc",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:22,precio_desde:3385504,precio_hasta:4218577,moneda:"MXN",esquema_pago:"$50,000 apartado, $50,000 firma, 24 mensualidades de $15,000",financiamiento:"Directo",enganche_pct:10,mensualidades:"24",slogan:"Estilo que trasciende",badge:"Preventa",descripcion_corta:"Sofisticación y bienestar en Cuauhtémoc, Ciudad de México.",descripcion_larga:"Desarrollo Xaviera combina confort, lujo y estilo perfecto en una zona estratégica.",amenidades:"WiFi, e-commerce, bicicletas, lavandería, servicio de herramientas, rooftop lounge, coworking, co-librería",acabados:"Consultar con asesor",estacionamiento:"No incluido",mascotas:false,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4134,lng:-99.1575,url_maps:"https://maps.app.goo.gl/5CY1R7Vxp1EWsK7j8",modelos:[{nombre:"Tipo B",tipo:"Departamento",recamaras:1,banos:1,m2:45.02,precio:3385504,descripcion:"Planta tipo",caracteristicas:"Interior 45.02 m²"},{nombre:"Tipo E Garden PB",tipo:"Departamento",recamaras:2,banos:2,m2:72.47,precio:4218577,descripcion:"Garden privado",caracteristicas:"Garden 24.90 m²"}],seo:{title:"Xaviera Cuauhtémoc CDMX | VEXO Real Estate",description:"Xaviera en Cuauhtémoc: El espacio ideal que empata con tu ambición en Ciudad de México.",keywords:"xaviera, departamentos cuauhtémoc, cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:23,slug:"cedro-santa-maria-ribera",nombre:"CEDRO 2026",nombre_corto:"Cedro",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Santa María la Ribera",direccion:"Cedro 328, Santa María la Ribera, Cuauhtémoc",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"2026",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:23,precio_desde:2995000,precio_hasta:6090000,moneda:"MXN",esquema_pago:"Consultar",financiamiento:"Consultar",enganche_pct:10,mensualidades:"",slogan:"Creciendo contigo en la Ribera",badge:"Preventa",descripcion_corta:"Casa catalogada restaurada en Santa María la Ribera. Lujo histórico.",descripcion_larga:"El proyecto Cedro en una casa catalogada restaurada en Santa María la Ribera, CDMX.",amenidades:"Casa catalogada restaurada, terraza privada",acabados:"Consultar con asesor",estacionamiento:"No incluido",mascotas:false,seguridad:"Seguridad controlada",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4549,lng:-99.1639,url_maps:"https://maps.app.goo.gl/PodJrcxKNyS5pCan6",modelos:[{nombre:"Tipo 1R",tipo:"Departamento",recamaras:1,banos:1,m2:39.53,precio:2995000,descripcion:"Diseño funcional",caracteristicas:"Acabados contemporáneos"},{nombre:"Tipo 2R Amplio",tipo:"Departamento",recamaras:2,banos:2,m2:105,precio:6090000,descripcion:"Ideal para familias",caracteristicas:"Vistas a Santa María la Ribera"}],seo:{title:"Cedro 2026 Santa María la Ribera CDMX | VEXO",description:"Aprovecha la preventa de Cedro 2026 y gana la máxima plusvalía en Santa María la Ribera.",keywords:"cedro 2026, santa maría la ribera, departamentos cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:24,slug:"lirio-reforma",nombre:"LIRIO REFORMA",nombre_corto:"Lirio",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Colonia Tabacalera",direccion:"Antonio Caso 19, Tabacalera, Cuauhtémoc",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:24,precio_desde:2956258,precio_hasta:5631522,moneda:"MXN",esquema_pago:"$50,000 apartado. 20% a la firma y 20% dividido en 10 mensualidades",financiamiento:"Directo",enganche_pct:20,mensualidades:"10",slogan:"El epicentro del éxito",badge:"Preventa",descripcion_corta:"Exclusividad sobre Reforma. Vive el pulso financiero y cultural de CDMX.",descripcion_larga:"Siente el pulso financiero y cultural de Ciudad de México con este desarrollo sobre Reforma.",amenidades:"E-commerce, ludoteca, concierge, cuarto de herramientas, préstamo bicicletas, valet parking, WiFi, asadores, rooftop lounge, sala de juegos, tintorería, lavado canino, espacio fit, espacio zen, spa, camastros",acabados:"Consultar con asesor",estacionamiento:"Valet Parking",mascotas:true,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4341,lng:-99.1577,url_maps:"https://maps.app.goo.gl/nyD6LLpCgmbMso4g6",modelos:[{nombre:"Loft Estudio",tipo:"Departamento",recamaras:1,banos:1,m2:36.61,precio:2956258,descripcion:"Vivienda mínima",caracteristicas:"Ideal para rentas turísticas"},{nombre:"2 Recámaras",tipo:"Departamento",recamaras:2,banos:1,m2:70.83,precio:5631522,descripcion:"Para parejas o familias",caracteristicas:"Vistas a Reforma"}],seo:{title:"Lirio Reforma Tabacalera CDMX | VEXO",description:"Exclusividad y vanguardia sobre la avenida más importante de México. Lirio Reforma.",keywords:"lirio reforma, departamentos reforma, tabacalera cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:25,slug:"salamanca-11-roma-norte",nombre:"SALAMANCA 11",nombre_corto:"Salamanca 11",ciudad:"Ciudad de México",estado:"Ciudad de México",zona:"Colonia Roma Norte",direccion:"Salamanca 11, Roma Norte, Cuauhtémoc, 06700",tipo:"Departamentos",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Consultar",arquitecto:"",niveles:0,total_unidades:0,destacado:true,orden:25,precio_desde:4609681,precio_hasta:7905390,moneda:"MXN",esquema_pago:"Aparta con $200,000. Rentas anticipadas. Capital Cero disponible",financiamiento:"Capital Cero / Bancario",enganche_pct:10,mensualidades:"",slogan:"Conecta con lo extraordinario",badge:"Preventa",descripcion_corta:"Depas boutique en Salamanca 11, el corazón de la Roma Norte, CDMX.",descripcion_larga:"Vive en la calle Salamanca y disfruta del barrio más vibrante de Ciudad de México.",amenidades:"Limpieza de deptos, e-commerce, lavado mascotas, cuarto de herramientas, cuarto de lavado, bicicletas, co-librería, rooftop lounge, coworking, espacio fitness",acabados:"Acabados de lujo, funcionalismo",estacionamiento:"Costo extra $300,000 (solo 2 hab)",mascotas:true,seguridad:"Consultar",imagenes:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:19.4215,lng:-99.173,url_maps:"https://maps.app.goo.gl/gNnCF3b9VQobUMHE9",modelos:[{nombre:"Tipo 1R",tipo:"Departamento",recamaras:1,banos:1,m2:42.6,precio:4609681,descripcion:"Vivienda mínima",caracteristicas:"Funcionalismo"},{nombre:"Tipo 2R",tipo:"Departamento",recamaras:2,banos:2,m2:154,precio:7905390,descripcion:"Integración con casona INBA",caracteristicas:"Amplitud"}],seo:{title:"Salamanca 11 Roma Norte CDMX | VEXO",description:"Depas boutique en Salamanca 11, el corazón de la Colonia Roma Norte, Ciudad de México.",keywords:"salamanca 11, roma norte, departamentos roma cdmx"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
  {id:26,slug:"downtown-ciudad-mayakoba",nombre:"DOWNTOWN CIUDAD MAYAKOBA",nombre_corto:"Downtown Mayakoba",ciudad:"Playa del Carmen",estado:"Quintana Roo",zona:"Ciudad Mayakoba",direccion:"Ciudad Mayakoba, Playa del Carmen, Quintana Roo",tipo:"Departamentos y Locales",estatus:"Preventa",fecha_entrega:"Consultar",desarrolladora:"Ciudad Mayakoba",arquitecto:"",niveles:8,total_unidades:72,destacado:true,orden:26,precio_desde:7192000,precio_hasta:19973479,moneda:"MXN",esquema_pago:"Consultar",financiamiento:"Consultar",enganche_pct:10,mensualidades:"",slogan:"Donde la grandeza se encuentra con la naturaleza.",badge:"Preventa",descripcion_corta:"Exclusividad y naturaleza en la Riviera Maya. 51 departamentos, 13 lofts, 8 penthouses y plaza comercial.",descripcion_larga:"Enclave urbano con 51 elegantes departamentos, 13 lofts, 8 penthouses y una plaza comercial en la primera comunidad integral de la Riviera Maya.",amenidades:"Plaza comercial, alberca carril de nado, gimnasio, bar, business center, kids club, fire pit",acabados:"Aire acondicionado Daikin, acabados de mármol travertino, cocina integral equipada",estacionamiento:"Subterráneo",mascotas:false,seguridad:"Acceso controlado y seguridad 24/7 con CCTV",imagenes:["https://images.unsplash.com/photo-1569965547610-4b5f45b7b5a4?w=800&q=80"],imagen_fallback:"https://images.unsplash.com/photo-1569965547610-4b5f45b7b5a4?w=800&q=80",brochure:"",video_url:"",tour360_url:"",lat:20.6956,lng:-87.0509,url_maps:"https://maps.app.goo.gl/MLidSihD2TDtL5c77",modelos:[{nombre:"Loft Estudio",tipo:"Loft",recamaras:1,banos:1,m2:0,precio:7192000,descripcion:"Vistas a la selva o plaza",caracteristicas:"Cocina integral equipada"},{nombre:"Departamento 2R",tipo:"Departamento",recamaras:2,banos:2,m2:108,precio:0,descripcion:"Vistas impresionantes",caracteristicas:"AC Daikin, mármol travertino"},{nombre:"Penthouse 3R",tipo:"Penthouse",recamaras:3,banos:3,m2:0,precio:19973479,descripcion:"Lujo tropical con vistas",caracteristicas:"Rooftop con jacuzzi y pérgola"}],seo:{title:"Downtown Ciudad Mayakoba Riviera Maya | VEXO",description:"Invierte en Downtown Ciudad Mayakoba: departamentos y lofts de lujo en Playa del Carmen con plaza comercial.",keywords:"downtown ciudad mayakoba, playa del carmen, departamentos riviera maya"},correo_ventas:"ventas@vexorealestate.com",whatsapp:"525527081749",instagram:"https://www.instagram.com/vexo_bienesraices",facebook:"https://www.facebook.com/profile.php?id=61577530904134",calendario:"https://calendar.app.google/uQT2fMM6R5Pxv7G39",disponibilidad:"Disponible"},
];

function getDesarrollos(f){
  let l=[...DESARROLLOS];
  if(!f)return l.sort((a,b)=>a.orden-b.orden);
  if(f.ciudad)l=l.filter(d=>d.ciudad===f.ciudad);
  if(f.tipo)l=l.filter(d=>d.tipo&&d.tipo.toLowerCase().includes(f.tipo.toLowerCase()));
  if(f.destacado)l=l.filter(d=>d.destacado);
  if(f.zona)l=l.filter(d=>d.zona===f.zona);
  return l.sort((a,b)=>a.orden-b.orden);
}
function getDesarrolloBySlug(s){return DESARROLLOS.find(d=>d.slug===s)||null;}
function getDesarrolloById(i){return DESARROLLOS.find(d=>d.id===parseInt(i))||null;}
function getImgPrincipal(d){
  if(d.imagenes&&d.imagenes.length>0&&d.imagenes[0].length>5)return d.imagenes[0];
  return d.imagen_fallback||"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
}
window.DESARROLLOS=DESARROLLOS;
window.getDesarrollos=getDesarrollos;
window.getDesarrolloBySlug=getDesarrolloBySlug;
window.getDesarrolloById=getDesarrolloById;
window.getImgPrincipal=getImgPrincipal;
