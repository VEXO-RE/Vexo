import sys, re
sys.stdout.reconfigure(encoding='utf-8')

# --- index.html ---
with open(r'C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\index.html', 'r', encoding='utf-8-sig') as f:
    idx = f.read()
    idx_lines = idx.split('\n')

print('=== index.html ===')
print('Total lineas:', len(idx_lines))

keywords = ['chatbot','gemini','lote','playa','tema','dark','color','css','script src','design']
for kw in keywords:
    matches = [(i+1, l.strip()) for i,l in enumerate(idx_lines) if kw.lower() in l.lower()]
    if matches:
        print(f'\n-- "{kw}" ({len(matches)} coincidencias) --')
        for ln, l in matches[:5]:
            print(f'  L{ln}: {l[:120]}')

# --- design-system.css (primeras 60 lineas) ---
with open(r'C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\design-system.css', 'r', encoding='utf-8-sig') as f:
    css_lines = f.readlines()
print('\n=== design-system.css ===')
print('Total lineas:', len(css_lines))
print('Primeras 60 lineas:')
for i, l in enumerate(css_lines[:60]):
    print(i+1, l.rstrip())

# --- vexo-magic.js info ---
with open(r'C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\vexo-magic.js', 'r', encoding='utf-8-sig') as f:
    magic = f.read()
print('\n=== vexo-magic.js ===')
print('Total lineas:', len(magic.split('\n')))
funcs = re.findall(r'function\s+(\w+)\s*\(', magic)
print('Funciones:', funcs[:30])
for kw in ['gemini','chatbot','lote','playa','Gemini','chat']:
    if kw.lower() in magic.lower():
        lines_match = [(i+1, l.strip()) for i,l in enumerate(magic.split('\n')) if kw.lower() in l.lower()]
        print(f'\n-- "{kw}" en vexo-magic.js ({len(lines_match)} coincidencias) --')
        for ln, l in lines_match[:4]:
            print(f'  L{ln}: {l[:120]}')
