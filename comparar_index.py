import re

# Ruta de tu archivo index
index_path = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\BEXO_WEB\public\index.html"
log_file   = r"C:\Users\HP-Home\Documents\Projectos_Rosalia\BEXO_WEB\public\estructura_log.txt"

with open(index_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

estructura = []
inside_page = None
line_number = 0

for line in lines:
    line_number += 1
    # Detectar inicio de página
    match_inicio = re.search(r'<div[^>]*id="page-([^"]+)"', line)
    if match_inicio:
        page_id = match_inicio.group(1)
        inside_page = page_id
        estructura.append(f"▶ Inicio de página '{page_id}' en línea {line_number}")

    # Detectar cierre de página
    if "</div>" in line and inside_page:
        estructura.append(f"◀ Fin de página '{inside_page}' en línea {line_number}")
        inside_page = None

    # Detectar footer global
    if re.search(r'<footer[^>]*id="site-footer"', line):
        estructura.append(f"★ Footer global detectado en línea {line_number}")

    # Detectar footers internos
    match_footer = re.search(r'<div[^>]*id="footer-([^"]+)"', line)
    if match_footer:
        footer_id = match_footer.group(1)
        estructura.append(f"⚠ Footer interno '{footer_id}' en línea {line_number}")

# Guardar log
with open(log_file, "w", encoding="utf-8") as f:
    f.write("=== MAPA DE ESTRUCTURA INDEX.HTML ===\n")
    for e in estructura:
        f.write(e + "\n")

print("✅ Validación completada")
print(f"📄 Log guardado en: {log_file}")
