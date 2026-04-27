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
