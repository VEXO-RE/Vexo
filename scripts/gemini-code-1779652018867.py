import os
import shutil
import re
import fitz  # PyMuPDF
from PIL import Image
import io

# ================================================================
# CONFIGURACIÓN DE RUTAS LOCALES
# ================================================================
RUTA_BROCHURES_LOCAL = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\brochures_origen"
RUTA_DESTINO_IMAGES  = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\images\Desarrollos"
RUTA_DESTINO_PDFS    = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\downloads\brochures"

# MAPEO DE RESERVA PARA MATCH DE ID
MAPEO_DESARROLLOS = {
    "xaviera": "022-xaviera-departamentos",
    "eduardo": "027-hacienda-san-eduardo-2026",
    "roque": "028-san-roque-2026",
    "clara": "029-santa-clara-ecovillage-2026",
    "puerto": "030-puerto-telchac-2026",
    "mareta": "031-mareta-2026",
    "custo": "032-custo-2026",
    "terraviva": "033-hacienda-terraviva-2026",
    "deportiva": "034-ciudad-deportiva-2026",
    "cumbres": "035-cumbres-de-la-hacienda-2026",
    "gran": "036-gran-hacienda-terraviva-2026",
    "market": "037-terramarket-2026"
}

MIN_ANCHO_ALTO = 500  
def pasa_filtro_calidad(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes))
        w, h = img.size
        if w < MIN_ANCHO_ALTO or h < MIN_ANCHO_ALTO: return False, None
        if h > w * 1.5: return False, None
        return True, img
    except: return False, None

def identificar_carpeta_destino(nombre_archivo):
    nombre_min = nombre_archivo.lower()
    for llave, carpeta in MAPEO_DESARROLLOS.items():
        if llave in nombre_min: return carpeta
    return None

def ejecutar_proceso_maestro():
    print("🚀 Iniciando extracción local, optimización .webp y copiado de brochures...")
    
    # NUEVO: Si la carpeta de origen no existe, el script la fabrica sola
    if not os.path.exists(RUTA_BROCHURES_LOCAL):
        os.makedirs(RUTA_BROCHURES_LOCAL, exist_ok=True)
        print(f"📁 Carpeta de origen '{os.path.basename(RUTA_BROCHURES_LOCAL)}' creada automáticamente.")
        print(f"👉 POR FAVOR: Copia tus PDFs de Drive dentro de:\n📍 {RUTA_BROCHURES_LOCAL}\ny vuelve a ejecutar el script.")
        return

    os.makedirs(RUTA_DESTINO_PDFS, exist_ok=True)
    os.makedirs(RUTA_DESTINO_IMAGES, exist_ok=True)

    archivos_locales = os.listdir(RUTA_BROCHURES_LOCAL)
    pdfs = [f for f in archivos_locales if f.lower().endswith('.pdf')]
    
    if len(pdfs) == 0:
        print(f"⚠️ La carpeta 'brochures_origen' está vacía. Pega tus PDFs ahí para poder iniciar la extracción.")
        return

    print(f"📁 Se detectaron {len(pdfs)} archivos PDF listos para procesar localmente.")

    for pdf_nombre in pdfs:
        ruta_pdf_origen = os.path.join(RUTA_BROCHURES_LOCAL, pdf_nombre)
        carpeta_slug = identificar_carpeta_destino(pdf_nombre)
        if not carpeta_slug:
            print(f"⚠️ Archivo ignorado: {pdf_nombre}")
            continue
            
        print(f"\n📦 Procesando: {pdf_nombre} ➔ Destino: {carpeta_slug}")
        ruta_carpeta_imagenes_final = os.path.join(RUTA_DESTINO_IMAGES, carpeta_slug)
        os.makedirs(ruta_carpeta_imagenes_final, exist_ok=True)
        
        try:
            doc = fitz.open(ruta_pdf_origen)
            imagen_idx = 1
            for numero_pagina in range(len(doc)):
                pagina = doc[numero_pagina]
                for img_info in pagina.get_images(full=True):
                    xref = img_info[0]
                    base_image = doc.extract_image(xref)
                    es_valida, img_pil = pasa_filtro_calidad(base_image["image"])
                    
                    if es_valida:
                        nombre_foto_clean = f"foto_{str(imagen_idx).zfill(2)}.webp"
                        ruta_guardado_webp = os.path.join(ruta_carpeta_imagenes_final, nombre_foto_clean)
                        if img_pil.mode in ("RGBA", "LA") or (img_pil.mode == "P" and "transparency" in img_pil.info):
                            img_pil = img_pil.convert("RGB")
                        img_pil.save(ruta_guardado_webp, "WEBP", quality=85)
                        imagen_idx += 1
            print(f"   📸 Éxito: {imagen_idx - 1} fotos extraídas en .webp")
            doc.close()
        except Exception as e:
            print(f"   ⚠️ Error en imágenes de {pdf_nombre}: {e}")

        slug_limpio = re.sub(r'^\d{3}-', '', carpeta_slug)
        nombre_pdf_clean = f"{slug_limpio}.pdf"
        ruta_pdf_destino = os.path.join(RUTA_DESTINO_PDFS, nombre_pdf_clean)
        try:
            shutil.copy2(ruta_pdf_origen, ruta_pdf_destino)
            print(f"   📄 Brochure copiado: public/downloads/brochures/{nombre_pdf_clean}")
        except Exception as e:
            print(f"   ⚠️ No se pudo copiar el PDF: {e}")

    print("\n✨ ¡PROCESO FINALIZADO CON ÉXITO MASTER!")

if __name__ == "__main__":
    ejecutar_proceso_maestro()