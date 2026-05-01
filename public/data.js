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

