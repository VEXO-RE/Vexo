# VEXO Real Estate | SPA Inmobiliaria de Lujo

VEXO Real Estate es una Single Page Application (SPA) inmobiliaria enfocada en desarrollos premium en Mérida, Ciudad de México y Playa del Carmen. Todo el sitio corre desde `public/index.html` (una sola página, sin build step) más una página secundaria `public/mapa.html` que se carga dentro de un `<iframe>`.

> **Para reglas técnicas detalladas dirigidas a asistentes de IA (Claude, GPT, etc.) que vayan a modificar este proyecto, ver [`CLAUDE.md`](./CLAUDE.md).** Este README es la vista general para humanos; CLAUDE.md tiene el detalle verificado línea por línea.

## Arquitectura en una vista

- **Sin framework, sin build:** HTML5 + CSS3 + JavaScript vanilla. `package.json` no define ningún paso de compilación real.
- **Una sola fuente de datos:** `public/data.js` expone `window.DESARROLLOS`, `window.CONFIG` y helpers. Todo el catálogo (39 desarrollos: departamentos y lotes) sale de ahí.
- **Chatbot con IA real, sin exponer la key:** `public/chatbot.js` (front) llama a `/api/chat` (función serverless en `api/chat.js`), que es quien habla con Gemini usando una variable de entorno del lado del servidor.
- **Mapa 3D interactivo:** `public/mapa.html`, MapLibre GL vía CDN, con calculadora hipotecaria, filtros por tipo y puntos de interés por ciudad.
- **Deploy:** Vercel, auto-deploy desde GitHub push. El ruteo de `vercel.json` es crítico — ver advertencia abajo.

## ⚠️ Antes de tocar `vercel.json`

`vercel.json` decide qué archivos de `public/` se sirven tal cual (JS, CSS, imágenes, `mapa.html`) y qué rutas caen al catch-all de `index.html` (para el comportamiento de SPA). **Si agregas un archivo estático nuevo con una extensión que la regla de `routes` no cubre, Vercel lo va a servir como si fuera `index.html` en producción** — el navegador tronará con `Unexpected token '<'` al intentar ejecutarlo como JS. Esto ya pasó una vez con `theme.js`, `vexo-magic.js` y `sanity-check.js`. Antes de hacer push, correr `scripts\revisar_antes_de_git.ps1` — ahora valida esto automáticamente (ver más abajo).

## Estructura real del proyecto

```
VEXO_MASTER_OPTIMIZADO/
├── .env                     <- Secrets locales (API_KEY_GEMINI, SHEETS_ENDPOINT, etc.) — NUNCA a git
├── .env.local
├── package.json             <- Sin build real, solo @vercel/speed-insights
├── vercel.json               <- Ruteo de producción — ver advertencia arriba
├── api/
│   └── chat.js               <- Proxy seguro a Gemini (la key vive solo aquí, del lado servidor)
├── scripts/                  <- Automatización de datos y auditoría (no se sube a git)
│   ├── revisar_antes_de_git.ps1   <- Gate obligatorio antes de cualquier push
│   ├── publicar_git.ps1           <- Deploy a GitHub -> Vercel
│   ├── actualizar_contenido.ps1   <- Sync Google Sheets -> public/data.js
│   ├── generar-data.mjs
│   └── audit_data.py, audit_files.py, validar_index.py  <- utilidades de diagnóstico manual (no bloquean el push)
└── public/                   <- Todo lo que Vercel sirve
    ├── index.html            <- SPA completa (todas las páginas viven aquí como <div class="page">)
    ├── mapa.html              <- Mapa 3D, se carga en <iframe> desde index.html
    ├── data.js                <- window.DESARROLLOS (39 registros) + window.CONFIG
    ├── design-system.css      <- Design System v4 "Parrot Premium" — capa BASE (ver nota de paletas abajo)
    ├── theme.js                <- Preferencia de tema (localStorage)
    ├── vexo-magic.js           <- Animaciones (scroll reveal, ripple, partículas del hero)
    ├── sanity-check.js         <- Corrige en runtime inconsistencias de mayúsculas en `tipo`
    ├── chatbot.js               <- Front del chat con IA, llama a /api/chat
    ├── downloads/, fonts/, images/, videos/
    └── robots.txt, sitemap.xml
```

## Dos paletas de color activas (intencional)

`index.html` carga `design-system.css` primero y **después** define su propio `<style>` inline con una paleta oscura (`--primary:#d4891a`, `--bg:#07120f`, tipografía Syne + DM Sans). Como el `<style>` inline va después en la cascada, sus reglas ganan donde compiten. **El look oscuro con dorado que ves en el sitio en vivo viene del `<style>` inline de `index.html`, no de `design-system.css`.** Para cambiar colores del sitio principal, edita ahí. `mapa.html` tiene una tercera paleta totalmente independiente (marfil/dorado/azul marino) — es a propósito, no se unifica sin pedirlo explícitamente.

## Datos — `public/data.js`

- Ciudades válidas (con acento, tal como están en el archivo): **"Mérida"**, **"Ciudad de México"**, **"Playa del Carmen"**.
- Tipos válidos: **"Departamentos"**, **"Departamentos y Locales"**, **"Lotes"**.
- Campos que rompen el sitio si están vacíos: `id`, `slug`, `nombre`, `ciudad`, `zona`, `lat`/`lng` (si faltan, el desarrollo no aparece en el mapa aunque sí en el catálogo).
- **Gap conocido:** los 11 desarrollos tipo "Lotes" no traían `lat`/`lng` originalmente — se les asignaron coordenadas aproximadas a nivel de pueblo (Telchac Puerto / Santa Clara, Yucatán) pendientes de reemplazar por el pin exacto cuando esté disponible.
- `tour360_url` existe en el esquema y la UI del mapa ya está lista para mostrarlo, pero **ningún desarrollo tiene todavía una URL real** (todos dicen `"Consultar"`).

## Flujo de actualización de datos

```
1. Google Sheets (maestro)
       |
2. Descargar como TSV -> scripts/master.tsv (propiedades) / csv correspondiente (lotes)
       |
3. scripts\actualizar_contenido.ps1   -> genera/actualiza public/data.js
       |
4. scripts\revisar_antes_de_git.ps1   -> auditoría obligatoria (debe salir sin errores)
       |
5. scripts\publicar_git.ps1           -> deploy a Vercel vía GitHub
```

## Chatbot — cómo está armado

1. `public/chatbot.js` corre en el navegador. No contiene ninguna API key. Solo hace `fetch('/api/chat', ...)`.
2. `api/chat.js` (función serverless de Vercel) lee `process.env.GEMINI_API_KEY` o `process.env.API_KEY_GEMINI` (acepta ambos nombres) y es quien de verdad llama a Gemini.
3. **La variable debe existir en Vercel → Project Settings → Environment Variables.** El `.env` local no se usa en producción.
4. `chatbot.js` se carga en `index.html` **después** del script principal inline, porque sobreescribe `window.sendChat`.

Si alguna vez ves una API key escrita directamente en un archivo dentro de `public/`, es una fuga de seguridad — cualquiera puede verla en el código fuente del navegador. Rótala de inmediato en Google AI Studio / Cloud Console.

## Checklist pre-deploy

`scripts\revisar_antes_de_git.ps1` automatiza casi todo esto. Correrlo y que salga sin `[XX]` (errores) antes de cualquier `git push`.

- [ ] `index.html` y `mapa.html` tienen balance correcto de `<div>` (una etiqueta de cierre faltante anida páginas enteras y las oculta — ya pasó una vez con `page-mapa`)
- [ ] Cada extensión de archivo estático nuevo en `public/` está cubierta por `vercel.json`
- [ ] Ninguna API key en texto plano dentro de `public/`
- [ ] Cada `<label>` tiene `for=` apuntando a un `id` real, o envuelve directamente su `<input>`
- [ ] Ningún desarrollo con `zona: ""` o ciudad/tipo fuera de los valores válidos
- [ ] Todas las páginas de la SPA muestran contenido + su propio footer (no solo el footer)
- [ ] El mapa: marcadores de desarrollos y de puntos de interés visibles, ninguno se desfasa en hover
- [ ] Chatbot responde de verdad (prueba un mensaje, no solo que la ventana abre)
- [ ] Variable `GEMINI_API_KEY` / `API_KEY_GEMINI` configurada en Vercel, no solo en `.env` local

## Lo que NO va a Git

```
.env
.env.local
scripts/*.tsv, *.csv, *.xlsx
public/downloads/        (PDFs pesados -> Drive)
CLAUDE.md                (documentación interna para IA)
node_modules/
scripts/*.log
```

---

**Stack:** HTML5 + CSS3 + JS vanilla · MapLibre GL 3.6.2 (CDN) · Google Fonts (Syne, DM Sans, Playfair Display) · Material Symbols · Vercel (auto-deploy desde GitHub).
