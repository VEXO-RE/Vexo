import os

# Carpeta base de tu proyecto
base_dir = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public"
output_index = os.path.join(base_dir, "index_clean.html")
log_file = os.path.join(base_dir, "descargas_log.txt")

# Archivos a fusionar
archivos = [
    "design-system.css",
    "system.css",
    "vexo-magic.js",
    "theme.js",
    "chatbot.js",
    "sanity-check.js"
]

contenido = []
log = []

for archivo in archivos:
    ruta = os.path.join(base_dir, archivo)
    if os.path.exists(ruta):
        with open(ruta, "r", encoding="utf-8") as f:
            data = f.read()
            if archivo.endswith(".css"):
                contenido.append(f"\n<!-- {archivo} -->\n<style>\n{data}\n</style>\n")
            elif archivo.endswith(".js"):
                contenido.append(f"\n<!-- {archivo} -->\n<script>\n{data}\n</script>\n")
            log.append(f"✅ Extraído: {archivo} ({len(data.splitlines())} líneas)")
    else:
        log.append(f"⚠️ No encontrado: {archivo}")

# Crear nuevo index con los contenidos embebidos
with open(output_index, "w", encoding="utf-8") as f:
    f.write("<!DOCTYPE html>\n<html lang='es'>\n<head>\n<meta charset='UTF-8'>\n<title>Index Clean</title>\n")
    # Insertar CSS fusionado
    for bloque in contenido:
        if bloque.startswith("<!-- design-system.css") or bloque.startswith("<!-- system.css"):
            f.write(bloque)
    f.write("</head>\n<body>\n")
    f.write("<h1>Index Clean con CSS y JS fusionados</h1>\n")
    # Insertar JS fusionado
    for bloque in contenido:
        if bloque.startswith("<!-- vexo-magic.js") or bloque.startswith("<!-- theme.js") or bloque.startswith("<!-- chatbot.js") or bloque.startswith("<!-- sanity-check.js"):
            f.write(bloque)
    f.write("</body>\n</html>")

# Guardar log
with open(log_file, "w", encoding="utf-8") as f:
    f.write("=== LOG DE FUSIÓN ===\n")
    for l in log:
        f.write(l + "\n")

print("✅ Index limpio generado en:", output_index)
print("📄 Log guardado en:", log_file)
