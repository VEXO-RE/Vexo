# Guía Técnica para IA — VEXO Real Estate

Última revisión a fondo: sesión de julio 2026 (Claude), tras auditar en vivo cada archivo mencionado aquí contra el estado real en disco. Todo lo que dice este documento fue verificado leyendo el código, no asumido.

## 1. Reglas de entorno (estricto)

- **Directorio único:** todo el trabajo ocurre en `C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO`. No inventar rutas fuera de aquí.
- **DOM prohibido de romper:** no cambiar los `id`, clases o jerarquía de `<div class="page">` en `index.html`. Son el ancla del sistema de renderizado (`showPage()`, `renderPage()`).
- **Archivos que sí se editan directamente cuando hace falta:** `public/index.html`, `public/mapa.html`, `public/data.js`, `public/chatbot.js`, `public/theme.js`, `public/vexo-magic.js`, `public/sanity-check.js`, `public/design-system.css`, `api/chat.js`, `vercel.json`. La restricción antigua de "solo index.html y vexo-magic.js" ya no aplica — el proyecto creció y varios bugs reales vivían en `mapa.html`, `data.js` y `vercel.json`.
- **Antes de editar HTML con muchos `<div>` anidados (especialmente `mapa.html` y las secciones `<div class="page">` de `index.html`):** contar aperturas/cierres o usar un script de balance de tags antes de dar por buena una edición. Un solo `</div>` faltante en `page-mapa` dejó **todas** las páginas siguientes (Nosotros, Blog, Descargas, Contacto, Legales) anidadas dentro de él e invisibles — costó una sesión completa de debugging encontrarlo.

## 2. Estructura real del proyecto (verificada)

```
VEXO_MASTER_OPTIMIZADO/
├── .env                        <- Secrets locales (GEMINI/API_KEY_GEMINI, SHEETS_ENDPOINT, GA_MEASUREMENT_ID, VERCEL_TOKEN). NO se sube a Git.
├── .env.local
├── package.json                <- Sin scripts de build reales (sitio estático). Solo dependencia: @vercel/speed-insights.
├── vercel.json                 <- CRÍTICO, ver sección 5.
├── api/
│   └── chat.js                 <- Proxy seguro a Gemini (ver sección 6).
├── scripts/                    <- Automatización de datos (Node/PowerShell/Python), no se sube a Git.
│   ├── generar-data.mjs
│   ├── actualizar_contenido.ps1
│   ├── revisar_antes_de_git.ps1
│   ├── publicar_git.ps1
│   ├── Generar_data_js.py / Generar_lotes_js.py
│   └── ...auditorías varias (audit_data.py, audit_files.py, validar_index.py)
└── public/                     <- Todo lo que Vercel debe servir como estático.
    ├── index.html              <- SPA completa (todas las páginas son <div class="page"> dentro de un solo archivo).
    ├── data.js                 <- window.DESARROLLOS, window.CONFIG, etc. (ver sección 4).
    ├── design-system.css       <- Design System v4 "Parrot Premium" (ver sección 3 — es SECUNDARIO).
    ├── theme.js                <- Detecta/guarda preferencia de tema en localStorage. Inofensivo, sin dependencias.
    ├── vexo-magic.js           <- Animaciones (reveal on scroll, ripple en botones, hero particles). IIFE aislada, no pisa funciones globales del index.
    ├── sanity-check.js         <- Corrige en runtime el bug de mayúsculas/minúsculas en el campo `tipo` (Lotes vs lotes) y pone fallbacks si `window.DESARROLLOS` no cargó.
    ├── chatbot.js               <- Front del chat con IA (ver sección 6). Debe cargarse DESPUÉS del script inline principal.
    ├── mapa.html                <- Página del mapa 3D, se carga en un <iframe> dentro de index.html (page-mapa). Es un documento HTML independiente con su propio <style>.
    ├── downloads/               <- PDFs (brochures), si existen localmente.
    ├── fonts/, images/, videos/
    └── robots.txt, sitemap.xml
```

Carpetas que el CLAUDE.md anterior mencionaba (`brochures_origen/`, `Mapa-vexo/`, `src/components/ui/calculadora.js`) **no se encontraron** en el directorio real al momento de esta revisión. Si existieron, ya no están o cambiaron de ubicación — no asumir que existen sin comprobarlo primero.

## 3. Sistema de diseño real (dos capas, no una)

Hay **dos** hojas de estilo activas al mismo tiempo en `index.html`, y es intencional:

1. `design-system.css` (v4 "Parrot Premium") — se enlaza vía `<link>` **antes** del `<style>` inline. Define un set de tokens propio: `--yam:#c37a12`, `--dorado:#e0b048`, `--grenadine:#c85250`, `--cream:#fbf2d9`, fondo claro `--bg:#f7f1e3`. Aporta componentes que el `<style>` inline no cubre (badges, toggles, animaciones, ciertas cards).
2. El `<style>` inline dentro de `index.html` — define su **propia** paleta oscura: `--primary:#d4891a`, `--bg:#07120f`, `--bg2:#0a1a18`, tipografía Syne (headings) + DM Sans (body). Como se carga **después** del `<link>`, sus reglas ganan en cualquier selector que coincida con ambas hojas (mismo nivel de especificidad, orden de cascada).

**Regla práctica:** el look-and-feel oscuro con acentos dorados que ves en el sitio en vivo viene del `<style>` inline, no de `design-system.css`. Si vas a tocar colores/tipografía del sitio principal, edita el `<style>` de `index.html`. `design-system.css` solo se toca si se quiere rediseñar la base compartida o si se detecta que algo se ve "roto" por un selector que solo existe ahí.

`mapa.html` tiene su **tercer** sistema de diseño, totalmente independiente y autocontenido (paleta marfil/dorado/azul marino: `--yam:#c17f24`, `--navy:#1e2d45`, fondo `--bg:#faf8f4`). No comparte variables con las otras dos hojas — es querido así, no lo unifiques sin que Rosalia lo pida explícitamente (ya se evaluó mezclarlo y se descartó por riesgo de romper la vista).

## 4. `data.js` — estructura de `window.DESARROLLOS`

39 desarrollos actualmente. Campos reales confirmados en el archivo (lista completa, no parcial):

`id, original_id, slug, url_slug, nombre, nombre_corto, ciudad, estado, zona, direccion, lat, lng, url_maps, iframe_maps, tipo, estatus, fecha_entrega, desarrolladora, arquitecto, niveles, total_unidades, descripcion_corta, descripcion_larga, descripcion_chatbot, chatbot_knowledge, chatbot_preguntas_frecuentes, slogan, badge_web, destacado, orden_home, precio_desde, precio_hasta, moneda, esquema_pago, financiamiento, enganche_pct, mensualidades, amenidades, acabados, estacionamiento, mantenimiento_aprox, mascotas, seguridad, foto_principal_url, foto_2_url..foto_5_url, foto_modelo1_url..foto_modelo3_url, imagenes, imagen_fallback, image_sequence, sin_imagenes_pendiente, video_youtube_url, video_bg_url, tour360_url, brochure, brochure_drive_id, og_image_drive_id, instagram_url, facebook_url, whatsapp_numero, correo_info, correo_ventas, calendario_url, modelos, seo_title, seo_description, seo_keywords, schema_type, schema_script, notas_internas`

Valores reales de `ciudad` (con acentos, así están en el archivo — el CLAUDE.md anterior decía "Merida" sin tilde, es incorrecto): **"Mérida"**, **"Ciudad de México"**, **"Playa del Carmen"**.

Valores reales de `tipo`: **"Departamentos"**, **"Departamentos y Locales"**, **"Lotes"**.

### ⚠️ Gap de datos conocido — coordenadas de "Lotes"
Los 11 desarrollos con `tipo: "Lotes"` (Hacienda San Eduardo, San Roque, Santa Clara Ecovillage, Puerto Telchac, Mareta by Puerto Telchac, Custò Terrenos Beachfront, Hacienda Terraviva, Ciudad Deportiva Terraviva, Cumbres de la Hacienda, Gran Hacienda Terraviva, Terramarket) **no tenían `lat`/`lng`** — por eso nunca aparecían en el mapa aunque el filtro "Lotes" funcionaba bien. Se les asignaron coordenadas **aproximadas a nivel de pueblo** (Telchac Puerto ≈ 21.34,-89.26 / Santa Clara ≈ 21.37,-89.01), obtenidas por búsqueda web, no por GPS real del lote. **Pendiente:** Rosalia debe reemplazarlas con coordenadas exactas cuando las tenga (el registro "PUERTO TELCHAC" ya trae un link de Google Maps guardado en `url_maps` que se puede abrir para sacar el pin exacto).

### `tour360_url` — listo pero sin datos reales
El campo existe en los 39 registros, pero **todos** tienen el valor placeholder `"Consultar"`, ninguno tiene una URL real todavía. El botón "Ver recorrido 360°" en el popup del mapa (`mapa.html`, función `buildDevPopup`) ya está programado para aparecer automáticamente en cuanto un desarrollo tenga una URL que empiece con `http` en `tour360_url` — no requiere tocar código, solo llenar el dato.

### `brochure` — 26 de 39 tienen link real
Son URLs de Google Drive. Los 11 "Lotes" no tienen brochure todavía (coincide con que tampoco tienen coordenadas — son los desarrollos más nuevos/menos documentados del catálogo).

## 5. `vercel.json` — el archivo más peligroso del proyecto si se edita mal

**Lección de esta sesión:** el `routes` de `vercel.json` tenía reglas explícitas solo para `/images/` y `/data.js`. Todo lo demás caía en el catch-all `"/(.*)": "public/index.html"` — incluyendo `.js`, `.css` y hasta `mapa.html`. Resultado: en producción, pedir `theme.js` devolvía el HTML de `index.html`, y el navegador tronaba con `Uncaught SyntaxError: Unexpected token '<'`. **No era un bug de código, era ruteo.**

Estado actual (ya corregido): hay una regla que sirve como estático cualquier archivo con extensión `.js .css .json .xml .txt .webp .png .jpg .jpeg .gif .svg .ico .woff .woff2 .ttf .otf .pdf .mp4`, más rutas explícitas para `/images/`, `/fonts/`, `/videos/`, `/downloads/`, `/mapa.html` y `/tour-redes.html`. El catch-all a `index.html` sigue al final para las rutas de la SPA sin extensión.

**Regla para el futuro: cualquier archivo estático nuevo que se agregue a `public/` (otro `.js`, otro `.html`, otra carpeta de assets) necesita que su extensión ya esté cubierta por la regla regex, o si es una carpeta nueva, necesita su propia línea en `routes` — si no, Vercel lo servirá como `index.html` y fallará en silencio (funciona en local con `file://`, falla solo en producción).**

## 6. Chatbot con IA — arquitectura de seguridad

- `public/chatbot.js` (front, corre en el navegador) **nunca** debe contener una API key. Llama por `fetch` a `/api/chat`.
- `api/chat.js` (función serverless de Vercel) es quien de verdad habla con Gemini, usando `process.env.GEMINI_API_KEY || process.env.API_KEY_GEMINI` (acepta ambos nombres — el `.env` local usa `API_KEY_GEMINI`).
- **Para que funcione en producción**, la variable debe existir en Vercel → Project Settings → Environment Variables. El `.env` local **no** se sube ni se lee en producción.
- `chatbot.js` se carga en `index.html` **después** del `<script>` inline principal (no antes), porque sobreescribe `window.sendChat` — si cargara antes, la función de reglas del script principal la pisaría al final.
- **Incidente de seguridad ya resuelto:** la versión anterior de `chatbot.js` tenía una API key de Gemini escrita en texto plano y expuesta públicamente (el archivo vive en `public/`, así que cualquiera podía verla en el código fuente). Si esa key sigue activa, debe rotarse en Google AI Studio / Cloud Console — Claude no puede hacer eso, es una acción manual de Rosalia.

## 7. `mapa.html` — notas operativas

- Vive en un `<iframe>` dentro de `index.html` (página Mapa). Se comunica con el padre vía `window.parent.showPage()` y `window.parent.abrirModalDescarga()` — si esas funciones cambian de nombre en `index.html`, hay que actualizar `mapa.html` también.
- Librería: MapLibre GL 3.6.2 (CDN unpkg, sin API key).
- **Estilo por defecto es CLARO** (`voyager-gl-style`), no oscuro. El estilo oscuro (`dark-matter-gl-style`) solo se activa con el botón de "vista satélite".
- Filtros reales de la sidebar: **Todos | Deptos | Lotes | Destacados | Preventa** (no "Todos | Mérida | CDMX..." como decía la versión anterior de este documento — el cambio de ciudad es un control aparte, los city-tabs).
- Los markers de desarrollos y los de puntos de interés (POIs) usan un patrón de "ancla más grande que el elemento visual" (`el` 56×56 o 38×38 conteniendo un `inner` más chico que se anima en hover) — **es intencional y obligatorio**. Si el hover anima directamente el elemento que MapLibre usa como ancla del marcador, el pin se desfasa de su coordenada real cada vez que el mouse pasa encima, y se vuelve imposible de clickear con precisión. Ya pasó una vez con los POIs — no repetir el error al agregar nuevos tipos de marcador.
- El array `POIS` es manual (no viene de `data.js`). Antes de agregar un punto de interés nuevo, verificar coordenadas reales (búsqueda web), no inventarlas.

## 8. Footer — un solo mecanismo válido

Cada página (`<div class="page" id="page-XXX">`) tiene su propio `<div id="footer-XXX"></div>` como hijo directo, y `renderPage()` los llena a todos con el mismo `footerHTML()` la primera vez que se renderiza. **Este es el único mecanismo correcto.** En esta sesión existió brevemente un `<div id="site-footer-container">` "global" colocado como hermano de los `.page` (fuera de todos ellos) — como no tenía la clase `.page`, quedaba visible sin importar qué página estuviera activa, y rompía el layout de todo el sitio excepto Home. Se eliminó. **No reintroducir un contenedor de footer global fuera de la estructura de páginas.**

## 9. Checklist pre-deploy (actualizado)

- [ ] `scripts/revisar_antes_de_git.ps1` → 100% verde
- [ ] Balance de `<div>` verificado si se tocó `index.html` o `mapa.html` (ver sección 1)
- [ ] Todas las páginas muestran contenido Y footer (no solo footer) — probar Home, Desarrollos, Ciudades, Mapa, Nosotros, Blog, Descargas, Contacto, Legales
- [ ] Si se agregó un archivo estático nuevo a `public/`, `vercel.json` lo cubre (ver sección 5)
- [ ] Mapa: marcadores de desarrollos Y de POIs visibles, ninguno se desfasa en hover, filtros Deptos/Lotes/Destacados/Preventa funcionan
- [ ] Chatbot: prueba real de mensaje, confirma que `/api/chat` responde (no solo que la UI abre)
- [ ] Botón "Brochure" en popups del mapa abre el modal de captura de lead (`abrirModalDescarga` en el padre)
- [ ] Formulario de contacto y descarga envían a Google Sheets / EmailJS
- [ ] Ningún desarrollo con `zona: ""` o `lat`/`lng` nulos sin justificación documentada
- [ ] Encoding UTF-8 limpio en `data.js` e `index.html`
- [ ] Variable `GEMINI_API_KEY` (o `API_KEY_GEMINI`) configurada en Vercel → Environment Variables, no solo en `.env` local

## 10. Lo que NO va a Git

```
.env
.env.local
scripts/*.tsv, *.csv, *.xlsx
public/downloads/        (PDFs pesados -> Drive)
CLAUDE.md                (documentación interna)
*.py sueltos en la raíz (scripts internos de auditoría)
node_modules/
```

---
**Stack confirmado:** HTML5 + CSS3 + JavaScript vanilla, sin frameworks ni build step (`package.json` no define build real). MapLibre GL 3.6.2 vía CDN. Fuentes Google (Syne + DM Sans + Playfair Display + Material Symbols). Deploy en Vercel con auto-deploy desde GitHub push.
