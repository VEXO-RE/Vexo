# VEXO Real Estate — Web

> SPA vanilla JS · Hosting Vercel · Repo: https://github.com/VEXO-RE/Vexo.git
> Ultima actualizacion: 02/05/2026

---

## Stack

- **Frontend:** HTML5 + CSS3 + JavaScript vanilla (sin frameworks)
- **Mapa:** MapLibre GL 3.6.2 via CDN unpkg (gratuito, sin API key)
- **Estilo mapa:** Carto Dark Matter + edificios 3D fill-extrusion
- **Fuentes:** Playfair Display (display) + DM Sans (body) — Google Fonts
- **Iconos:** Material Symbols Outlined
- **Deploy:** Vercel (auto-deploy desde GitHub push)
- **Repo:** https://github.com/VEXO-RE/Vexo.git

---

## Desarrollos — 26 total

| Rango IDs | Ciudad |
|-----------|--------|
| 1 – 11 | Merida, Yucatan |
| 12 – 25 | Ciudad de Mexico |
| 26 | Playa del Carmen (Downtown Ciudad Mayakoba) |

### Coordenadas — critico para el mapa

| Ciudad | Latitud | Longitud |
|--------|---------|----------|
| Merida | ~21.xxx (positiva) | ~-89.xxx (NEGATIVA) |
| CDMX | ~19.xxx (positiva) | ~-99.xxx (NEGATIVA) |
| Playa del Carmen | ~20.xxx (positiva) | ~-87.xxx (NEGATIVA) |

---

## Imagenes

- **Origen master:** \C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\scripts\master.tsv\
- **En repo:** \public/images/Desarrollos/{carpeta}/{nombre}.webp\
- **Solo se sincronizan** las imagenes referenciadas en \scripts/master.tsv\
- **Total en repo:** 1624 imagenes
- Si supera 95MB -> activar Git LFS para la carpeta \public/images/Desarrollos/\

### Regla de fallback de imagen en tarjetas
\\\
foto_principal_url  ->  imagenes[0]  ->  imagen_fallback
\\\

---

## Flujo de actualizacion de datos

```
1. Google Sheets (gsheet master)
       |
2. Descargar como TSV (NO CSV) -> guardar como scripts/master.tsv
       |
3. ./actualizar_contenido.ps1   -> genera/actualiza public/data.js
       |
4. ./VEXO_MASTER_SYNC.ps1       -> sincroniza Drive -> repo limpio, actualiza docs
       |
5. ./revisar_antes_de_git.ps1   -> auditoria estricta (debe salir 100% verde)
       |
6. ./publicar_git.ps1           -> deploy a Vercel via GitHub
```

---

## Estructura de public/data.js (consolidado)

Todas las constantes se exponen como `window.XXX = XXX` al final del archivo.

| Variable global | Contenido |
|----------------|----------|
data.js — VEXO Real Estate
// Fuente única de datos. Cargado via <script src="/data.js"></script>
// Rutas de imagen: images/Desarrollos/{carpeta}/{archivo}.webp
// Brochures: downloads/brochures/{archivo}.pdf
// Actualizado: Mayo 2026

### Campos obligatorios por desarrollo (no dejar vacios)
- `id` — unico, numerico
- `slug` — unico, sin espacios ni mayusculas
- `nombre` / `nombre_corto`
- `ciudad` — exactamente "Merida", "Ciudad de Mexico" o "Playa del Carmen"
- `zona` — NO dejar "" (rompe los filtros del catalogo)
- `lat` / `lng` — lng SIEMPRE negativa
- `imagenes[]` — minimo 1 elemento
- `foto_principal_url` — ruta webp preferida

---

## Mapa (mapa.html)

- **Libreria:** MapLibre GL 3.6.2 via CDN unpkg
- **Estilo:** https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json
- **Edificios 3D:** fill-extrusion activado desde zoom 13
- **Ciudades en mapa:** Merida, CDMX y Playa del Carmen
- **20 Lugares de interes:** 10 en Merida + 10 en CDMX con imagen y datos
- **Filtros:** Todos | Merida | CDMX | Desarrollos VEXO | Lugares de interes
- **Popup:** imagen + categoria + descripcion + chips de datos + boton accion
- **Calculadora hipotecaria:** debajo del mapa en la SPA (index.html page-mapa)

---

## Design System — Paleta "Parrot / Lujo Tropical"

| Variable | Valor | Uso |
|----------|-------|-----|
| \--primary\ / \--yam\ | \#D4891A\ | Ambar dorado — acento principal |
| \--primary-d\ / \--dorado\ | \#E8A92A\ | Dorado claro — hover, highlights |
| \--grenadine\ | \#C85250\ | Coral rojo — alertas, enfasis |
| \--bg\ | \#0E1E28\ | Azul noche marina — fondo principal |
| \--bg-card\ | \#162B3A\ | Fondo de tarjetas |
| \--cream\ | \#F5EDD6\ | Texto principal |
| \--esmeralda\ | \#2E8B6E\ | Verde selva — acentos secundarios |
| \--teal\ | \#13ECDA\ | Cian — lugares de interes en mapa |

**Fuente display:** Playfair Display (serif)
**Fuente body:** DM Sans

---

## Scripts PowerShell

| Script | Funcion | Va a git |
|--------|---------|----------|
| `actualizar_contenido.ps1` | Genera `public/data.js` desde `master.tsv` | Si |
| `VEXO_MASTER_SYNC.ps1` | Sincroniza Drive -> repo limpio + actualiza docs | No |
| `revisar_antes_de_git.ps1` | Auditoria pre-deploy (debe pasar 100% verde) | Si |
| `publicar_git.ps1` | Deploy a GitHub + Vercel | Si |
| `publicar_en_vercel.ps1` | Deploy rapido alternativo | No |

**Regla de oro:** Nunca hacer `git add .` sin antes correr `revisar_antes_de_git.ps1` al 100% verde.

---

## Lo que NO va a Git

```
.env
scripts/master.tsv
*.csv / *.xlsx
public/downloads/     (PDFs pesados -> Drive)
VEXO_WEB/descargas/
Mapa-vexo/            (app React dev separada)
Proyectos/            (sandbox)
CLAUDE.md             (documentacion interna)
*.py                  (scripts Python internos)
publicar_en_vercel.ps1
VEXO_MASTER_SYNC.ps1
```

---

## Checklist pre-deploy

- [ ] `revisar_antes_de_git.ps1` → 100% verde
- [ ] `mapa.html` carga: marcadores visibles + edificios 3D + popups con imagen
- [ ] Filtros del catálogo funcionan (Mérida, CDMX, tipo)
- [ ] Calculadora hipotecaria: selector de desarrollo + cálculo correcto
- [ ] Modal de descarga captura lead antes de abrir PDF
- [ ] Formulario contacto envía a Google Sheets
- [ ] Chatbot redirige a WhatsApp
- [ ] Imágenes de los 26 desarrollos sin errores 404
- [ ] Ningún desarrollo con `zona: ""`
- [ ] `index.html` sin HTML inválido (nav anidado, tags rotos)
- [ ] Encoding UTF-8 limpio en `data.js` e `index.html`

---

