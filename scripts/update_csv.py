import os
import pandas as pd

# Ruta al CSV maestro
csv_path = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\scripts\csv.csv"
images_root = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\images\Desarrollos"

# Cargar CSV (usa latin1 para evitar errores de codificación en Windows)
df = pd.read_csv(csv_path, encoding="latin1")

# Columnas a actualizar (BJ–BQ)
cols = [
    "foto_principal_url",
    "foto_2_url",
    "foto_3_url",
    "foto_4_url",
    "foto_5_url",
    "foto_modelo2_url",
    "foto_modelo3_url",
    "foto_modelo1_url"
]

# Función para construir la ruta relativa completa
def build_path(folder, filename):
    return f"images/Desarrollos/{os.path.basename(folder)}/{filename}"

for idx, row in df.iterrows():
    # Match por id o nombre de desarrollo
    desarrollo = str(row.get("nombre_desarrollo", row.get("id", ""))).strip().lower()
    if not desarrollo:
        continue

    # Buscar carpeta que contenga el id o nombre
    match_folder = None
    for folder in os.listdir(images_root):
        folder_lower = folder.lower()
        if desarrollo in folder_lower or str(row.get("id", "")).lower() in folder_lower:
            match_folder = os.path.join(images_root, folder)
            break

    if not match_folder or not os.path.isdir(match_folder):
        continue

    # Listar imágenes disponibles en la carpeta
    imgs = [f for f in os.listdir(match_folder) if f.endswith(".webp")]
    imgs.sort()

    # Detectar principal y modelos
    principal = next((f for f in imgs if "principal" in f), None)
    modelo1 = next((f for f in imgs if "modelo1" in f), None)
    modelo2 = next((f for f in imgs if "modelo2" in f), None)
    modelo3 = next((f for f in imgs if "modelo3" in f), None)

    # Asignar columnas con rutas completas
    df.at[idx, "foto_principal_url"] = build_path(match_folder, principal) if principal else (build_path(match_folder, imgs[0]) if imgs else "")
    df.at[idx, "foto_modelo1_url"] = build_path(match_folder, modelo1) if modelo1 else ""
    df.at[idx, "foto_modelo2_url"] = build_path(match_folder, modelo2) if modelo2 else ""
    df.at[idx, "foto_modelo3_url"] = build_path(match_folder, modelo3) if modelo3 else ""

    # Rellenar fotos adicionales sin repetir
    extras = [f for f in imgs if f not in [principal, modelo1, modelo2, modelo3]]
    for i, col in enumerate(["foto_2_url","foto_3_url","foto_4_url","foto_5_url"]):
        df.at[idx, col] = build_path(match_folder, extras[i]) if i < len(extras) else ""

# Guardar CSV actualizado
output_path = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\scripts\csv_actualizado.csv"
df.to_csv(output_path, index=False, encoding="latin1")
print(f"Archivo actualizado guardado en: {output_path}")
