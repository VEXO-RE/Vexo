import pandas as pd
import json
import os

# Configuración
csv_path = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\scripts\csv.csv"
output_js_path = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\Lotes.js"

def generar_lotes_js():
    # Cargar CSV
    df = pd.read_csv(csv_path, encoding="latin1")
    
    # Supongamos que tus columnas de lotes tienen prefijos o nombres específicos
    # Aquí puedes ajustar si necesitas filtrar solo columnas específicas
    # Por ahora, convertimos todo el CSV si representa la lista de lotes
    data = df.to_dict(orient="records")
    
    # Formato para el archivo Lotes.js
    js_content = "/* Lotes.js — Inventario de Unidades VEXO */\n\n"
    js_content += "window.LOTES = " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n\n"
    js_content += "console.log('Lotes cargados:', window.LOTES.length);"

    with open(output_js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"ÉXITO: Lotes.js generado correctamente en {output_js_path}")

if __name__ == "__main__":
    generar_lotes_js()