import pandas as pd
import json

# Función segura para convertir coordenadas
def safe_float(value):
    try:
        return float(value)
    except (ValueError, TypeError):
        return None

# Rutas de tus TSV
desarrollos_path = r"C:\Users\HP-Home\Downloads\vexo_desarrollos_master - vexo_desarrollos_master.tsv"
lotes_path = r"C:\Users\HP-Home\Downloads\Lotes y terrenos - Lotes.tsv"
output_path = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\data.generated.js"
log_file = r"C:\Users\HP-Home\Downloads\vexo_data.log"

log_messages = []

# 1️⃣ Leer desarrollos
df_dev = pd.read_csv(desarrollos_path, sep="\t")
df_dev = df_dev.drop(columns=[c for c in ["CN","og_image_drive_id"] if c in df_dev.columns], errors="ignore")

desarrollos = []
for _, row in df_dev.iterrows():
    desarrollos.append({
        "id": str(row.get("id", "")),
        "slug": str(row.get("url_slug", "")).strip(),
        "nombre": str(row.get("nombre_desarrollo", "")),
        "nombre_corto": str(row.get("nombre_corto", "")),
        "ciudad": str(row.get("ciudad", "")),
        "estado": str(row.get("estado", "")),
        "zona": str(row.get("zona", "")),
        "direccion": str(row.get("direccion", "")),
        "lat": safe_float(row.get("coordenadas_lat")),
        "lng": safe_float(row.get("coordenadas_lng")),
        "foto_principal_url": str(row.get("foto_principal_url", "")),
        "precio_desde": row.get("precio_desde", None),
        "precio_hasta": row.get("precio_hasta", None),
        "moneda": str(row.get("moneda", "")),
        "descripcion_corta_web": str(row.get("descripcion_corta_web", "")),
        "descripcion_larga_web": str(row.get("descripcion_larga_web", "")),
    })

log_messages.append(f"✅ Se generaron {len(desarrollos)} desarrollos desde TSV")
if len(desarrollos) == 26:
    log_messages.append("✅ Validación: hay exactamente 26 desarrollos")
else:
    log_messages.append(f"⚠️ Validación: hay {len(desarrollos)} desarrollos, se esperaban 26")

# 2️⃣ Leer lotes
df_lotes = pd.read_csv(lotes_path, sep="\t")
df_lotes = df_lotes.drop(columns=[c for c in ["CN","og_image_drive_id"] if c in df_lotes.columns], errors="ignore")

lotes = []
for _, row in df_lotes.iterrows():
    lotes.append({
        "id": str(row.get("id", "")),
        "nombre_desarrollo": str(row.get("nombre_desarrollo", "")),
        "nombre_corto": str(row.get("nombre_corto", "")),
        "ciudad": str(row.get("ciudad", "")),
        "estado": str(row.get("estado", "")),
        "zona": str(row.get("zona", "")),
        "direccion": str(row.get("direccion", "")),
        "lat": safe_float(row.get("coordenadas_lat")),
        "lng": safe_float(row.get("coordenadas_lng")),
        "tipo_desarrollo": "Lote",
        "modelo_1_tipo": "Lote",
        "modelo_2_tipo": "Lote",
        "foto_principal_url": str(row.get("foto_principal_url", "")),
        "precio_desde": row.get("precio_desde", None),
        "precio_hasta": row.get("precio_hasta", None),
        "moneda": str(row.get("moneda", "")),
        "descripcion_corta_web": str(row.get("descripcion_corta_web", "")),
        "descripcion_larga_web": str(row.get("descripcion_larga_web", "")),
    })

log_messages.append(f"✅ Se generaron {len(lotes)} lotes desde TSV")

# 3️⃣ Generar archivo final
with open(output_path, "w", encoding="utf-8") as f:
    f.write("const DESARROLLOS = " + json.dumps(desarrollos, ensure_ascii=False, indent=2) + ";\n")
    f.write("const LOTES = " + json.dumps(lotes, ensure_ascii=False, indent=2) + ";\n")
    f.write("window.DESARROLLOS = DESARROLLOS;\n")
    f.write("window.LOTES = LOTES;\n")

log_messages.append("✅ Archivo data.generated.js actualizado con DESARROLLOS + LOTES")

# 4️⃣ Guardar log
with open(log_file, "w", encoding="utf-8") as f:
    for dev in desarrollos:
        f.write(f"Desarrollo {dev['id']}: {dev['nombre']}\n")
    for lote in lotes:
        f.write(f"Lote {lote['id']}: {lote['nombre_desarrollo']}\n")
    for msg in log_messages:
        f.write(msg + "\n")

print("=== GENERACIÓN DATA VEXO ===")
for msg in log_messages:
    print(msg)
print(f"\nLog guardado en: {log_file}")
