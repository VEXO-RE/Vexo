# scripts/optimizar_y_convertir.py
import os
import re
from PIL import Image

# Configuración de Rutas de VEXO
RUTA_PUBLIC = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public"
RUTA_DESARROLLOS = os.path.join(RUTA_PUBLIC, "images", "Desarrollos")

EXTENSIONES_A_CONVERTIR = ('.jpg', '.jpeg', '.png')

def estandarizar_imagenes_desarrollo(ruta_carpeta, nombre_carpeta):
    """Genera nombres descriptivos con palabras clave SEO basados en el nombre del desarrollo"""
    archivos = os.listdir(ruta_carpeta)
    
    # Extraer el slug limpio para SEO (quita el "027-" o "001_" del inicio)
    prefix_seo = re.sub(r'^\d+[-_]', '', nombre_carpeta)
    
    idx_principal = 1
    idx_modelo = 1
    idx_general = 2 

    for archivo in archivos:
        nombre_bajo = archivo.lower()
        ruta_origen = os.path.join(ruta_carpeta, archivo)
        
        if not nombre_bajo.endswith(EXTENSIONES_A_CONVERTIR) and not nombre_bajo.endswith('.webp'):
            continue

        try:
            with Image.open(ruta_origen) as img:
                # Lógica de asignación con prefijos SEO estructurados
                if "ok" in nombre_bajo or "principal" in nombre_bajo or "main" in nombre_bajo:
                    nuevo_nombre = f"{prefix_seo}_principal.webp" if idx_principal == 1 else f"{prefix_seo}_foto_{str(idx_principal).zfill(2)}.webp"
                    idx_principal += 1
                elif "mode" in nombre_bajo or "modelo" in nombre_bajo:
                    nuevo_nombre = f"{prefix_seo}_foto_modelo{idx_modelo}.webp"
                    idx_modelo += 1
                else:
                    # Si ya está optimizada con el patrón SEO, la dejamos intacta
                    if nombre_bajo.endswith('.webp') and prefix_seo in nombre_bajo:
                        continue
                    nuevo_nombre = f"{prefix_seo}_foto_{str(idx_general).zfill(2)}.webp"
                    idx_general += 1

                ruta_destino = os.path.join(ruta_carpeta, nuevo_nombre)
                
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                    img = img.convert("RGB")
                
                img.save(ruta_destino, "WEBP", quality=85)
                
            if ruta_origen != ruta_destino:
                os.remove(ruta_origen)
                
        except Exception as e:
            print(f"⚠️ No se pudo procesar la imagen {archivo}: {e}")

def limpiar_y_convertir_global():
    print("🚀 Iniciando Purga y Optimización de imágenes con Enfoque SEO Avanzado...")
    
    conteo_conversiones = 0
    
    # 1. Convertir imágenes sueltas en la raíz de public
    for raiz, _, archivos in os.walk(RUTA_PUBLIC):
        if RUTA_DESARROLLOS in raiz:
            continue
        for archivo in archivos:
            if archivo.lower().endswith(EXTENSIONES_A_CONVERTIR):
                ruta_origen = os.path.join(raiz, archivo)
                ruta_destino = os.path.splitext(ruta_origen)[0] + ".webp"
                try:
                    with Image.open(ruta_origen) as img:
                        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                            img = img.convert("RGB")
                        img.save(ruta_destino, "WEBP", quality=85)
                    os.remove(ruta_origen)
                    conteo_conversiones += 1
                except Exception as e:
                    print(f"⚠️ Error convirtiendo archivo suelto {archivo}: {e}")

    print(f"✨ Conversión global finalizada. {conteo_conversiones} imágenes sueltas pasaron a .webp")

    # 2. Procesar subcarpetas en Desarrollos aplicando el prefijo SEO
    if os.path.exists(RUTA_DESARROLLOS):
        for subcarpeta in os.listdir(RUTA_DESARROLLOS):
            ruta_subcarpeta = os.path.join(RUTA_DESARROLLOS, subcarpeta)
            if os.path.isdir(ruta_subcarpeta):
                print(f"🎯 Generando nombres indexables para Google en: {subcarpeta}")
                estandarizar_imagenes_desarrollo(ruta_subcarpeta, subcarpeta)
                
    print("\n🏆 ¡PROCESO COMPLETADO! Imágenes renombradas con Palabras Clave de alto valor SEO.")

if __name__ == "__main__":
    limpiar_y_convertir_global()