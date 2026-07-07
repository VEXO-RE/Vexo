import re, sys, os
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')

path = r'C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\data.js'
with open(path, 'r', encoding='utf-8-sig') as f:
    content = f.read()

print('=== ESTADO ACTUAL DE data.js ===')
print('Tamano archivo:', len(content), 'chars')

desarrollos = re.findall(r'id:\s*(\d+)', content)
print('Total IDs encontrados:', len(desarrollos), '| IDs:', desarrollos)

ciudades = re.findall(r'ciudad:\s*["\']([^"\']{2,40})["\']', content)
print('Ciudades:', Counter(ciudades))

tipos = re.findall(r'tipo:\s*["\']([^"\']+)["\']', content)
print('Tipos:', Counter(tipos))

print('Playa del Carmen presente:', 'Playa del Carmen' in content)
print('Gemini presente:', 'gemini' in content.lower())
print('Lotes presente:', 'lote' in content.lower())
print('CONFIG presente:', 'const CONFIG' in content or 'window.CONFIG' in content)
print('CIUDADES presente:', 'const CIUDADES' in content or 'window.CIUDADES' in content)
print('BLOG_POSTS presente:', 'BLOG_POSTS' in content)

# Ver variables exportadas al window
exports = re.findall(r'window\.(\w+)\s*=', content)
print('Exports window:', exports)

# Ultimas 20 lineas
lines = content.split('\n')
print('\n--- Ultimas 20 lineas ---')
for l in lines[-20:]:
    print(l)

# Ver estructura CONFIG
cfg_match = re.search(r'const CONFIG\s*=\s*\{[^}]{0,800}', content)
if cfg_match:
    print('\n--- CONFIG ---')
    print(cfg_match.group(0)[:500])
