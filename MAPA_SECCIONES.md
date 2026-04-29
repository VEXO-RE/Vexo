# VEXO MASTER - MAPA VISUAL DE SECCIONES HTML

## ESTRUCTURA GENERAL DEL index.html

```
index.html
├── <head> - Metadatos, CSS, fuentes
│   ├── Meta tags SEO
│   ├── Open Graph (social media)
│   ├── Schema.org (JSON-LD)
│   ├── Link: design-system.css
│   ├── Link: vexo-premium.css
│   └── <style> - Estilos inline (variables CSS, animaciones)
│
├── <body>
│   ├── <nav id="navbar"> - Navegación principal
│   │   ├── Logo VEXO
│   │   ├── Links: Inicio, Desarrollos, Ciudades, Mapa, Nosotros, Blog, Descargas, Contacto
│   │   └── Botones: CTA (Agenda visita, Ver desarrollos)
│   │
│   ├── <div id="mob-menu"> - Menú mobile (oculto por defecto)
│   │
│   ├── ═══ PÁGINAS (tabs dinámicas) ═══
│   │
│   ├── <div id="page-home" class="page active">
│   │   ├── <section class="hero">
│   │   │   ├── Fondo de imagen
│   │   │   ├── Texto principal (h1, p)
│   │   │   ├── CTA buttons (Ver desarrollos, Agendar visita)
│   │   │   ├── Buscador (select ciudad + tipo + botón buscar)
│   │   │   │
│   │   │   └── TARJETAS FLOTANTES (hero-visual-col) ✨ MEJORADO
│   │   │       ├── Tarjeta grande: Imagen + overlays
│   │   │       ├── Badge ROI: +22% Plusvalía (con pulse)
│   │   │       ├── Mini card 1: Roma Norte, CDMX
│   │   │       └── Mini card 2: Temozón Norte, Mérida
│   │   │
│   │   ├── Stats bar (26+, 2 ciudades, +22%, 100%)
│   │   ├── Desarrollos destacados (grid-3)
│   │   └── Por qué elegirnos (2 columnas)
│   │
│   ├── <div id="page-desarrollos">
│   │   ├── Filtros: Zona, Tipo, Búsqueda
│   │   └── <div id="devsGrid" class="grid-3"> - Cards de desarrollos
│   │
│   ├── <div id="page-detalle">
│   │   ├── Imágenes del desarrollo
│   │   ├── Descripción completa
│   │   ├── Especificaciones
│   │   ├── Ubicación en mapa
│   │   ├── Galería
│   │   └── Formulario de contacto
│   │
│   ├── <div id="page-ciudades">
│   │   ├── <div id="ciudadesGrid"> - Cards por ciudad
│   │   │   ├── Mérida
│   │   │   ├── Ciudad de México
│   │   │   └── Otras ciudades
│   │   └── Cada card: imagen real + desarrollos
│   │
│   ├── <div id="page-nosotros">
│   │   ├── About us
│   │   ├── Team
│   │   ├── Valores
│   │   └── Contacto
│   │
│   ├── <div id="page-blog">
│   │   └── <div id="blogGrid"> - Articles por ciudad
│   │       ├── Mérida posts
│   │       ├── CDMX posts
│   │       └── Otros posts
│   │
│   ├── <div id="page-blog-post">
│   │   ├── Titular
│   │   ├── Imagen principal
│   │   ├── Contenido
│   │   └── Relacionados
│   │
│   ├── <div id="page-descargas">
│   │   └── <div id="descargasContainer"> - Archivos
│   │       ├── Brochures
│   │       ├── Presentaciones
│   │       └── Especificaciones técnicas
│   │
│   ├── <div id="page-mapa">
│   │   └── <iframe src="mapa.html"> - Mapa embebido
│   │
│   ├── <div id="page-contacto">
│   │   ├── Formulario
│   │   ├── Información de contacto
│   │   └── Mapa de ubicación
│   │
│   ├── <div id="chat-window"> - Chat flotante
│   ├── <button id="chat-btn"> - Botón chat
│   ├── <a id="wa-btn"> - Botón WhatsApp
│   └── <div id="cookie-banner"> - Banner de cookies
```

---

## MAPA DE INYECCIÓN DE DATOS

### Datos → HTML Renderizado

```
DESARROLLOS (data.js)
  ├─→ home-devs (grid-3)
  ├─→ devsGrid (grid-3, page-desarrollos)
  ├─→ filterZona (select options)
  ├─→ page-detalle (cuando se hace click)
  └─→ ciudadesGrid (como "Desarrollos disponibles")

CIUDADES (ciudades.js)
  ├─→ ciudadesGrid (grid, page-ciudades)
  ├─→ sh-ciudad (select options, home)
  └─→ Filtros por ciudad en blog

BLOG_POSTS (blog.js)
  ├─→ blogGrid (grid, page-blog)
  ├─→ page-blog-post (cuando se clickea un post)
  └─→ Agrupados por ciudad

DESCARGAS (descargas.js)
  ├─→ descargasContainer (page-descargas)
  └─→ Categorizado por tipo

EMPRESA (empresa.js)
  └─→ page-nosotros (About us, Team)

LEGAL (legal.js)
  └─→ Documentos en footer/legal
```

---

## FUNCIONES JAVASCRIPT CLAVE

### Navegación
- `showPage(pageName)` - Muestra/oculta páginas
- `toggleMenu()` - Abre/cierra menú mobile

### Búsqueda y Filtros
- `buscarDesarrollos()` - Filtra por ciudad + tipo
- `filterDevs(devs, zona, tipo)` - Lógica de filtrado
- `poblarSelectDesarrollos()` - Rellena selects

### Renderizado
- `renderPage()` - Renderiza página actual
- `renderDevsGrid()` - Muestra desarrollos
- `renderBlog()` - Muestra posts
- `devCard()` - HTML de card individual
- `blogCard()` - HTML de post individual

### Navegación de detalle
- `verDetalle(devId)` - Muestra detalle de desarrollo
- `verPost(postId)` - Muestra artículo de blog

### Chat y UI
- `toggleChat()` - Abre/cierra chat
- `sendChat()` - Envía mensaje
- `getChatReply()` - Obtiene respuesta

### Formularios
- `submitLead()` - Envía formulario de contacto

### Utility
- `toast(message)` - Muestra notificación
- `esc(html)` - Escapa HTML
- `initReveal()` - Inicia animaciones reveal

---

## COMPONENTES DINÁMICOS

### Grid de Desarrollos
```html
<div id="devsGrid" class="grid-3"></div>
```
Se llena con: `renderDevsGrid()` desde `window.DESARROLLOS`

**Card estructura:**
```html
<div class="dev-card" onclick="verDetalle(ID)">
  <div class="dev-img-wrap">
    <img src="IMAGEN" alt="NOMBRE">
    <div class="dev-badge">ETAPA</div>
    <div class="dev-city">ZONA</div>
  </div>
  <div class="dev-body">
    <div class="dev-zona">📍 UBICACION</div>
    <div class="dev-title">NOMBRE</div>
    <div class="dev-tags">TIPO, CIUDAD</div>
    <div class="dev-footer">
      <div class="dev-price">PRECIO</div>
    </div>
  </div>
</div>
```

### Grid de Blog
```html
<div id="blogGrid" class="grid-3"></div>
```
Se llena con: `renderBlog()` desde `window.BLOG_POSTS`

**Card estructura:**
```html
<div class="blog-card" onclick="verPost(ID)">
  <div class="blog-img-wrap">
    <img src="IMAGEN" alt="TITULO">
  </div>
  <div style="padding:20px">
    <div class="blog-cat">CIUDAD</div>
    <div>TITULO</div>
  </div>
</div>
```

### Selectores (Filtros)
```html
<select id="filterZona" class="form-inp">
  <option value="">Todas las zonas</option>
  <!-- Opciones de options inyectadas desde DESARROLLOS -->
</select>

<select id="sh-ciudad" aria-label="Filtrar por ciudad">
  <!-- Opciones de options inyectadas desde CIUDADES -->
</select>
```

---

## VARIABLES CSS (Variables Globales)

En `<style>`:
```css
:root {
  --primary: #d4891a;           /* Dorado principal */
  --primary-d: #e8a92a;         /* Dorado claro */
  --primary-deep: #8b4a12;      /* Dorado oscuro */
  --bg: #07120f;                /* Fondo muy oscuro */
  --bg2: #0a1a18;               /* Fondo oscuro */
  --bg3: #0f2320;               /* Fondo más claro */
  --glass: rgba(15, 35, 32, 0.72);
  --glass-b: rgba(19, 236, 218, 0.1);
  --text: #e2e8f0;              /* Texto principal */
  --text-m: #94a3b8;            /* Texto medio */
  --text-s: #64748b;            /* Texto secundario */
  --r: 12px;                    /* Border radius pequeño */
  --r2: 20px;                   /* Border radius grande */
  --border: rgba(19, 236, 218, 0.12);
}
```

---

## ANIMACIONES DISPONIBLES

```css
@keyframes fadeUp      /* Aparición de arriba hacia abajo */
@keyframes float       /* Movimiento flotante vertical (8px) */
@keyframes glow        /* Brillo dorado pulsante */
@keyframes pulse       /* Pulse de escala + opacidad (NUEVO) */
@keyframes shimmer     /* Efecto shimmer en texto */
@keyframes spin        /* Rotación 360° */
@keyframes pulse-dot   /* Opacidad pulsante */

Clases utilitarias:
.reveal              /* fadeUp + visible class */
.reveal-l            /* translateX desde -28px */
.reveal-r            /* translateX desde +28px */
.anim-float          /* Aplicación de float */
.anim-glow           /* Aplicación de glow */
```

---

## ARCHIVOS DE DATOS ESPERADOS

### data.js
```javascript
window.DESARROLLOS = [
  {
    id: 1,
    nombre: "...",
    zona: "...",
    ubicacion: "...",
    imagen: "VEXO_WEB/Desarrollos/1-nombre/imagen.webp",
    precio: "...",
    tipo: "Departamentos",
    etapa: "Preventa"
  },
  // ... más desarrollos
]
```

### config.js
```javascript
window.CONFIG = {
  empresa: "VEXO Real Estate",
  email: "ventas@vexorealestate.com",
  telefono: "+525527081749",
  // ... más config
}
```

### blog.js
```javascript
window.BLOG_POSTS = [
  {
    id: 1,
    titulo: "...",
    ciudad: "Mérida",
    imagen: "...",
    contenido: "..."
  },
  // ... más posts
]
```

### ciudades.js
```javascript
window.CIUDADES = [
  {
    id: 1,
    nombre: "Mérida",
    imagen: "...",
    descripcion: "..."
  },
  // ... más ciudades
]
```

### descargas.js
```javascript
window.DESCARGAS = [
  {
    id: 1,
    nombre: "...",
    archivo: "public/descargas/archivo.pdf",
    categoria: "Brochure"
  },
  // ... más descargas
]
```

---

## DIRECTORIOS DE IMÁGENES

```
public/
├── images/
│   └── Desarrollos/
│       ├── 1-nombre-desarrollo/
│       │   ├── imagen1.webp
│       │   ├── imagen2.webp
│       │   └── ...
│       ├── 2-otro-desarrollo/
│       │   └── ...
│       └── ...
└── descargas/
    ├── archivo1.pdf
    └── ...
```

---

**Actualizado:** 29 de abril de 2026
**Versión:** MASTER OPTIMIZADO v2
**Estado:** ✅ Listo para producción

