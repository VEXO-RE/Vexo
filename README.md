# VEXO Real Estate | SPA & Lujo Tropical

VEXO Real Estate es una Single Page Application (SPA) de alto rendimiento enfocada en el sector inmobiliario premium. El proyecto cubre el mercado en Mérida, Ciudad de México y Playa del Carmen.

## 🚀 Arquitectura y Nuevas Características

*   **Ruta de Proyecto Única:** Todo el entorno de desarrollo y producción está autocontenido en `C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO`. No existen dependencias externas fuera de esta carpeta.
*   **Fuente de Datos Consolidada (Propiedades + Lotes):** La información se extrae de dos archivos TSV separados. El script los unifica primero en un archivo de validación `data.generated.js` y, una vez aprobado, se traslada a `public/data.js` para alimentar la SPA.
*   **Chatbot Inteligente:** Interfaz de usuario (UI) del chatbot finalizada. Preparada para la integración del motor de inteligencia artificial mediante la API de Gemini.
*   **UI Avanzada:** Sistema de diseño v3 ("Parrot") con soporte completo para Modo Oscuro, correos automatizados vía EmailJS y un catálogo que incluye filtrado mixto para departamentos y lotes de inversión.

1. MANDAMIENTOS PARA LA IA (Reglas inviolables)
Directorio: Solo interactuar con C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO.

DOM Prohibido: NO cambies los IDs, clases o jerarquía estructural de index.html. Son el ancla del sistema de renderizado.

Scripts: Cualquier lógica de interfaz debe ser inyectada globalmente mediante window.func = ... al final del index.html.

2. Flujo de Renderizado (Orden Obligatorio)
Para evitar ReferenceError y fallos en animaciones:

Carga de Datos: data.js debe cargarse primero para exponer window.DESARROLLOS.

Motor Visual: vexo-magic.js inicializa el DOM.

Inyección: App.js (o script de inyección) renderiza contenido.

Post-Render: Obligatorio llamar a window.vxMagic.initCards() y window.vxMagic.refreshReveal() tras cada inyección dinámica de HTML.

3. Estructura de Datos (Integridad)
Rutas: images/Desarrollos/{carpeta}/{archivo}.webp.

Ciudad: Valores permitidos: "Merida", "Ciudad de Mexico", "Playa del Carmen".

4. Checklist de Seguridad pre-push (Automatizado)
Antes de confirmar cualquier cambio, la IA debe validar:

[ ] ¿El cambio afecta la carga de window.DESARROLLOS?

[ ] ¿Se mantiene el orden de carga data.js -> vexo-magic.js?

[ ] ¿El nuevo código sigue usando las variables CSS del Design System (--primary, --bg, etc.)?

## 📁 Estructura del Proyecto

VEXO_MASTER_OPTIMIZADO/
├── .env                       <-- Clave privada GEMINI_API_KEY (Ignorado en Git)
├── .env.local                 <-- Configuraciones locales de desarrollo
├── package.json               <-- Configuración de dependencias Node/Express
├── vercel.json                <-- Configuración de enrutamiento Serverless para Vercel
├── api/
│   └── chat.js                <-- Backend seguro (Santiago Asesor Nivel Dios)
├── brochures_origen/          <-- Carpeta local donde pegas tus PDFs de la nube
├── scripts/
│   └── optimizar_y_convertir.py <-- TU ÚNICO SCRIPT OPERATIVO DE ASSETS
├── src/
│   └── components/
│       └── ui/
│           └── calculadora.js <-- Componente autónomo con inyector CSS
└── public/
    ├── index.html             <-- Interfaz de la web (Estructura)
    ├── data.js                <-- Tu Master unificado limpio (Proyectos 1 al 33)
    ├── chatbot.js             <-- Controlador front-end del chat seguro
    ├── downloads/
    │   └── brochures/         <-- PDFs finales limpios (ej: mareta-lotes-telchac-puerto.pdf)
    └── images/
        └── Desarrollos/       <-- Carpetas exactas (ej: 022-xaviera-departamentos, 027-...)

## 🛠 Instalación y Despliegue

1.  Asegúrate de trabajar exclusivamente dentro del directorio raíz del proyecto.
2.  Ejecuta `generar-data.mjs` para procesar los archivos TSV y generar el consolidado de datos.
3.  Valida la información en la interfaz.
4.  Ejecuta el script `publicar_git.ps1` para sincronizar con el repositorio y realizar el despliegue automático en Vercel (con soporte de preview y confirmación).

## Stack

- **Frontend:** HTML5 + CSS3 + JavaScript vanilla (sin frameworks)
- **Mapa:** MapLibre GL 3.6.2 via CDN unpkg (gratuito, sin API key)
- **Estilo mapa:** Carto Dark Matter + edificios 3D fill-extrusion
- **Fuentes:** Playfair Display (display) + DM Sans (body) — Google Fonts
- **Iconos:** Material Symbols Outlined
- **Deploy:** Vercel (auto-deploy desde GitHub push)
- **Repo:** https://github.com/VEXO-RE/Vexo.git

---

## Desarrollos y Lotes

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

## Flujo de actualizacion de datos propiedades y lotes

```
1. Google Sheets (gsheet master)
       |
2. Descargar como TSV (NO CSV) -> guardar como scripts/master.tsv para propiedades y csv.csv para Lotes
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
- **Lugares de interes:**  en Merida  en CDMX y Playa del Carmen con imagen y datos
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

