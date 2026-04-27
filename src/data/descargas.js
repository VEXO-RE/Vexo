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
