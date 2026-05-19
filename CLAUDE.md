# CLAUDE.md — VEXO Real Estate · Guía de trabajo para Claude

> **Última actualización:** Mayo 2026  
> **Proyecto:** Web_Bienes_Raices · SPA vanilla JS · Deploy en Vercel
> **Última actualización:** 19/05/2026  
---

## Reglas de trabajo

1. **No uses APIs externas** (Anthropic, OpenAI, etc.) para reparar archivos del proyecto.
   - Trabaja únicamente sobre los archivos locales del proyecto.
   - No consumas créditos ni tokens. Todo debe ejecutarse en local.

2. **No borres nada existente.** Agrega o corrige; nunca elimines sin confirmación explícita de Rosalia.

3. **Mantén el contexto del proyecto:**
   - SPA en vanilla JS, sin frameworks.
   - Navegación SPA y footer intactos en todas las páginas.
   - Hosting: Vercel · deploy vía `publicar_git.ps1`.
   - 26 desarrollos con coordenadas correctas (lat positivas, lng negativas).
   - Imágenes: `d.foto_principal_url` → `d.imagenes[0]` → `d.imagen_fallback`.
   - MapLibre GL 3.6.2 vía CDN unpkg · estilo Carto Dark Matter · edificios 3D.
   - Paleta "Parrot / Lujo Tropical" · fuentes Playfair Display + DM Sans.

---

## Correcciones aplicadas — Abril 2026

### index.html — 6 bugs corregidos

| # | Error | Corrección |
|---|-------|-----------|
| 1 | HTML roto `</di <div class="container"...>` en sección CTA | Cerrar `</div>` correctamente antes de abrir el siguiente `<div>` |
| 2 | `<nav class="nav-links">` anidado dentro de `<nav id="navbar">` — HTML inválido | Cambiado a `<div class="nav-links">` / `</div>` |
| 3 | Mapa loader (`vx-map-loader`) se ocultaba en `DOMContentLoaded` antes de que el usuario navegara al mapa | Quitado el `hide` prematuro · El loader ahora se oculta con `onload` del iframe |
| 4 | Variable CSS duplicada `--text-mid` (idéntica a `--text-m: #94a3b8`) | Eliminada `--text-mid` |
| 5 | Variable CSS huérfana `--on-surface-variant` — declarada en `:root` pero nunca usada | Eliminada |
| 6 | Doble render de página home al iniciar: `DOMContentLoaded` llamaba `renderPage("home")` Y `showPage()` también la llamaba internamente | `DOMContentLoaded` solo llama `renderPage("home")` directo, sin pasar por `showPage` |

### data.js — 3 bugs corregidos

| # | Error | Corrección |
|---|-------|-----------|
| 1 | **210 rutas de imagen duplicadas** en desarrollos ID 17-26 (CDMX + Mayakoba): `VEXO_WEB/Desarrollos/017-name/VEXO_WEB/Desarrollos/017/foto.webp` | Script Python regex eliminó el segmento duplicado · Todas las rutas apuntan correcto |
| 2 | **9 emojis dobles** `🤖 🤖` en campo `chatbot_knowledge` de los mismos desarrollos | Reemplazados por `🤖` simple |
| 3 | **4 campos `zona: ""`** vacíos en desarrollos CDMX — rompían los filtros del catálogo | Completados: Monumento 31 (Tabacalera) → `"Tabacalera"` · Blum → `"Santa Fe"` · Xaviera → `"Roma Norte"` · Cedro 2026 → `"Santa María la Ribera"` |

---

## Correcciones aplicadas — Mayo 2026

- `19/05/2026` — Ajuste en `vercel.json` para servir el sitio desde `public/` y reglas de rewrite aplicadas (commit `5dba6a4`).

### data.js — 2 bugs críticos corregidos

| # | Error | Corrección |
|---|-------|-----------|
| 1 | **Sintaxis inválida** `const DESARROLLOS : {` — causaba SyntaxError y rompía la carga del sitio | Cambiado a `const DESARROLLOS = [` para declarar array correctamente |
| 2 | **Redeclaración de variable** `const DESARROLLOS = [];` al final del archivo — sobrescribía el array con datos vacíos | Eliminada la redeclaración · El array mantiene sus 26 desarrollos |

### index.html — 1 bug crítico corregido

| # | Error | Corrección |
|---|-------|-----------|
| 1 | **Ruta incorrecta del script** `<script src="public/data.js"></script>` — causaba 404 en producción | Cambiado a `<script src="/data.js"></script>` para ruta absoluta desde raíz |

### vexo-magic.js — archivo agregado

| # | Acción | Detalles |
|---|--------|----------|
| 1 | **Archivo creado** `public/vexo-magic.js` | Script principal de la aplicación agregado al directorio public/ |

---

## Errores detectados — Mayo 2026

### 1. Página del mapa se congela (no carga)

**Síntoma:** La página `mapa.html` se queda cargando indefinidamente o se congela.

**Posibles causas:**
- Problemas con MapLibre GL JS (versión 3.6.2)
- Coordenadas inválidas en los datos
- Conflictos con el loader del mapa
- Problemas de rendimiento con muchos marcadores

**Soluciones posibles:**
1. **Verificar coordenadas:** Asegurar que todas las `lat` sean positivas y `lng` negativas
2. **Revisar MapLibre versión:** Confirmar que la CDN esté funcionando
3. **Optimizar marcadores:** Si hay muchos desarrollos, implementar clustering
4. **Debug del loader:** Verificar que `vx-map-loader` se oculte correctamente

### 2. No se ven imágenes reales del TSV, solo Unsplash

**Síntoma:** Las tarjetas muestran imágenes de Unsplash en lugar de las imágenes reales del proyecto.

**Causa probable:** Las rutas de imagen en `data.js` no apuntan correctamente a los archivos en `public/images/`.

**Soluciones:**
1. **Verificar rutas en data.js:** Las rutas deben ser relativas desde la raíz del sitio, ej: `/images/Desarrollos/001_alma-condos-2026/alma-condos-2026-foto-01.jpg`
2. **Confirmar existencia de archivos:** Verificar que las imágenes existan en `public/images/Desarrollos/`
3. **Revisar fallback:** Si `imagenes[0]` no existe, debe usar `imagen_fallback`
4. **Actualizar desde TSV:** Ejecutar `actualizar_contenido.ps1` para regenerar rutas correctas

---

$root = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO\public\images"

# Extensiones a convertir
$extensions = @("*.jpg", "*.jpeg", "*.png", "*.heic", "*.bmp")

# Crear lista de archivos
$files = Get-ChildItem -Path $root -Recurse -Include $extensions

foreach ($file in $files) {
    $webpPath = [System.IO.Path]::ChangeExtension($file.FullName, ".webp")

    # Si ya existe el .webp, saltar
    if (Test-Path $webpPath) {
        Write-Host "Ya existe: $webpPath — saltando"
        continue
    }

    Write-Host "Convirtiendo: $($file.FullName)"

    # Convertir usando ImageMagick (magick.exe debe estar instalado)
    magick "$($file.FullName)" -quality 85 "$webpPath"
}


**Nota:** El archivo `public/data.js` contiene TODOS los datos:
- CONFIG (Google Sheets, WhatsApp, redes sociales)
- DESARROLLOS (26 desarrollos)
- BLOG_POSTS (9 posts)
- CIUDADES (Merida, CDMX)
- EMPRESA (equipo, valores)
- LEGAL (privacidad, términos)

Los archivos en `src/data/` son **legacy** y no se usan.

### sendChat() — flujo cerrado a WhatsApp
```js
function sendChat(msg) {
  const url = `https://wa.me/5215527081749?text=${encodeURIComponent(msg)}`;
  setTimeout(() => { window.open(url, '_blank'); }, 800);
}
```

### Mapa iframe — siempre usar parseFloat en coordenadas
```js
map.flyTo({ center: [parseFloat(d.lng), parseFloat(d.lat)], zoom: 15 });
```

### Modelos — mostrar imagen si existe, texto si no
```js
const modelosHtml = (d.modelos || []).map(m => {
  const tieneImg = m.imagen && m.imagen.trim() !== '';
  return `<div class="glass rounded-xl p-4">
    ${tieneImg ? `<img src="${esc(m.imagen)}" class="w-full rounded-lg mb-3 object-cover" style="height:140px;" alt="${esc(m.nombre)}" loading="lazy"/>` : ''}
    <p class="font-display font-700 text-sm">${esc(m.nombre)}</p>
    ...
  </div>`;
}).join('');
```

---

## Estructura de public/data.js (consolidado)

**Ubicación:** `public/data.js`

| Variable | Descripción |
|----------|-------------|
| `CONFIG` | Google Sheets endpoint, WhatsApp, redes sociales |
| `DESARROLLOS` | Array de 26 desarrollos (IDs 1-11 Mérida, 12-25 CDMX, 26 Playa del Carmen) |
| `BLOG_POSTS` | Array de 9 posts (IDs 1-9) |
| `CIUDADES` | Objeto con keys `"merida"` y `"cdmx"` |
| `EMPRESA` | Datos de VEXO: equipo, valores, misión, visión |
| `DESCARGAS` | Links a PDFs / brochures |
| `LEGAL` | Textos de Aviso de Privacidad y Términos |

Todos expuestos como `window.XXX = XXX` al final del archivo.

### Regla de rutas de imagen
```
Ruta en data.js:   Desarrollos/{carpeta}/{nombre}.webp
Ruta en public/:   public/images/desarrollos/{nombre}.webp
```
El script `actualizar_contenido.ps1` hace la transformación automáticamente.  
**Nunca usar rutas absolutas con dominio en el JS.**

---

## Checklist antes de cada deploy

Antes de correr `publicar_git.ps1` siempre verificar:

- [ ] `revisar_antes_de_git.ps1` pasa al 100% en verde
- [ ] Mapa carga correctamente en `mapa.html` (marcadores visibles, 3D activo)
- [ ] Filtros del catálogo (`Mérida`, `CDMX`, `Departamentos`, `Lotes`) funcionan
- [ ] Formulario de contacto envía a Google Sheets (modo no-cors)
- [ ] Chatbot redirige a WhatsApp correctamente
- [ ] Imágenes de los 26 desarrollos cargan (sin rutas rotas 404)
- [ ] `zona` no está vacío en ningún desarrollo
- [ ] No hay `🤖 🤖` dobles en `chatbot_knowledge`
