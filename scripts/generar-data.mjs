// Ejecutar con: node scripts/generar-data.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolver __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const tsvPath = path.join(__dirname, "../scripts/master.tsv");
const outputPath = path.join(__dirname, "../public/data.generated.js");

// Leer TSV
const raw = fs.readFileSync(tsvPath, "utf8");
const lines = raw.trim().split("\n");
const headers = lines[0].split("\t");

// Función para mapear cada fila del TSV a objeto JS
function parseRow(row) {
  const cols = row.split("\t");
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = cols[i] || "";
  });

  return {
    id: parseInt(obj.id || "0"),
    slug: obj.slug || "",
    nombre: obj.nombre || "",
    nombre_corto: obj.nombre_corto || "",
    ciudad: obj.ciudad || "",
    estado: obj.estado || "",
    zona: obj.zona || "",
    direccion: obj.direccion || "",
    tipo: obj.tipo || "Lotes",
    estatus: obj.estatus || "Preventa",
    fecha_entrega: obj.fecha_entrega || "",
    desarrolladora: obj.desarrolladora || "",
    arquitecto: obj.arquitecto || "",
    niveles: parseInt(obj.niveles || "0"),
    total_unidades: parseInt(obj.total_unidades || "0"),
    destacado: obj.destacado === "true",
    orden: parseInt(obj.orden || "0"),
    precio_desde: parseInt(obj.precio_desde || "0"),
    precio_hasta: parseInt(obj.precio_hasta || "0"),
    moneda: obj.moneda || "MXN",
    esquema_pago: obj.esquema_pago || "",
    financiamiento: obj.financiamiento || "",
    enganche_pct: parseInt(obj.enganche_pct || "0"),
    mensualidades: obj.mensualidades || "",
    slogan: obj.slogan || "",
    badge: obj.badge || "",
    descripcion_corta: obj.descripcion_corta || "",
    descripcion_larga: obj.descripcion_larga || "",
    amenidades: obj.amenidades || "",
    acabados: obj.acabados || "",
    estacionamiento: obj.estacionamiento || "",
    mascotas: obj.mascotas === "true",
    seguridad: obj.seguridad || "",

    // Imágenes desde TSV, rutas corregidas
    foto_principal_url: obj.foto_principal_url ? `public/images/Desarrollos/${obj.foto_principal_url}` : "",
    foto_2_url: obj.foto_2_url ? `public/images/Desarrollos/${obj.foto_2_url}` : "",
    foto_3_url: obj.foto_3_url ? `public/images/Desarrollos/${obj.foto_3_url}` : "",
    foto_4_url: obj.foto_4_url ? `public/images/Desarrollos/${obj.foto_4_url}` : "",
    foto_5_url: obj.foto_5_url ? `public/images/Desarrollos/${obj.foto_5_url}` : "",
    foto_modelo1_url: obj.foto_modelo1_url ? `public/images/Desarrollos/${obj.foto_modelo1_url}` : "",
    foto_modelo2_url: obj.foto_modelo2_url ? `public/images/Desarrollos/${obj.foto_modelo2_url}` : "",
    foto_modelo3_url: obj.foto_modelo3_url ? `public/images/Desarrollos/${obj.foto_modelo3_url}` : "",

    video_youtube_url: obj.video_youtube_url || "",
    tour360_url: obj.tour360_url || "",

    imagen_fallback: "public/images/Desarrollos/fallback.webp",
    brochure: obj.slug ? `public/downloads/brochures/${obj.slug}.pdf` : "",
    lat: parseFloat(obj.lat || "0"),
    lng: parseFloat(obj.lng || "0"),
    url_maps: obj.url_maps || "",
    modelos: [], // se pueden mapear si el TSV incluye modelos
    seo: {
      title: obj.seo_title || "",
      description: obj.seo_description || "",
      keywords: obj.seo_keywords || ""
    },
    correo_ventas: "ventas@vexorealestate.com",
    whatsapp: "525527081749",
    instagram: "https://www.instagram.com/vexo_bienesraices",
    facebook: "https://www.facebook.com/profile.php?id=61577530904134",
    calendario: "https://calendar.app.google/uQT2fMM6R5Pxv7G39",
    disponibilidad: "Disponible"
  };
}

// Procesar todas las filas
const desarrollos = lines.slice(1).map(parseRow);

// Generar archivo JS con estructura correcta
const jsContent = `const DESARROLLOS = ${JSON.stringify(desarrollos, null, 2)};\nexport default DESARROLLOS;`;

fs.writeFileSync(outputPath, jsContent, "utf8");

console.log("✅ data.generated.js actualizado con estructura correcta y rutas válidas");
