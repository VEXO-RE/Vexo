# VEXO MASTER - GUÍA DE EJECUCIÓN PASO A PASO

## 🎯 OBJETIVO FINAL
Que el sitio **inyecte correctamente todos los datos**, que **se visualicen en todas las páginas**, que **los buscadores funcionen**, y que **no tenga errores de HTML/JS**.

---

## ✅ PASO 1: VALIDAR ESTRUCTURA (5 minutos)

### Opción A: Validación gráfica (recomendado)
1. Abre una terminal PowerShell en la carpeta del proyecto
2. Ejecuta:
```powershell
.\revisar_antes_de_git.ps1
```

**Qué buscar:**
- ✓ Todos los `[OK]` en verde
- ✓ Máximo 2-3 `[!!]` (warnings)
- ✗ Cero `[XX]` (errores)

Si hay errores, corregirlos antes de continuar.

### Opción B: Test rápido
```bash
double-click test_vexo.bat
```

Esto ejecuta la validación automáticamente.

---

## ✅ PASO 2: INYECTAR DATOS (10 minutos)

### Primero: Validación sin cambios
```powershell
.\actualizar_contenido.ps1 -ValidateOnly
```

Esto muestra:
- Cuántos desarrollos se encontraron
- Cuántos posts de blog
- Cuántas ciudades
- Qué se inyectará

### Luego: Inyectar datos reales
```powershell
.\actualizar_contenido.ps1
```

**Qué hace:**
1. Lee todos los datos de `src/data/*.js`
2. Valida campos vacíos (avisa si hay)
3. Crea backup de `index.html` (con timestamp)
4. Inyecta datos en selectores de búsqueda
5. Guarda cambios

**Resultado:** index.html actualizado con datos ✓

---

## ✅ PASO 3: VERIFICAR EN NAVEGADOR (10 minutos)

### Abrir en navegador
1. Abre **index.html** en Chrome/Firefox
   - Click derecho → "Abrir con navegador"
   - O: arrastra index.html al navegador

### Verificar cada sección

#### 🏠 HOME (página principal)
- [ ] ¿Se ven las **tarjetas flotantes** con brillo?
- [ ] ¿Las tarjetas tienen **animación suave** (float)?
- [ ] ¿El badge de **+22%** tiene pulso?
- [ ] ¿El **buscador** funciona?
  - Selecciona ciudad → debe filtrar
  - Selecciona tipo → debe filtrar
- [ ] ¿Se ven los **stats** (26+, 2 ciudades)?

#### 🏢 DESARROLLOS
- [ ] ¿Se ven las **tarjetas de desarrollos**?
- [ ] ¿Se pueden **filtrar por zona**?
- [ ] ¿Se pueden **buscar por texto**?
- [ ] ¿Las **imágenes cargan**?
- [ ] ¿Al clickear una tarjeta abre **página de detalle**?

#### 📍 CIUDADES
- [ ] ¿Se ven tarjetas de **cada ciudad**?
- [ ] ¿Tienen **imágenes reales**?
- [ ] ¿Muestran **desarrollos de esa ciudad**?

#### 📰 BLOG
- [ ] ¿Se ven artículos **por ciudad**?
- [ ] ¿Tienen **imágenes reales**?
- [ ] ¿Al clickear abre el **artículo completo**?

#### 📥 DESCARGAS
- [ ] ¿Se ven **archivos descargables**?
- [ ] ¿Se pueden **descargar** (intentar uno)?
- [ ] ¿Tienen **categoría**?

#### 🗺️ MAPA
- [ ] ¿Se ve el **mapa** sin freezing?
- [ ] ¿Se ven **los puntos de interés**?
- [ ] ¿Funcionan los **filtros**?
- [ ] ¿Los **edificios 3D** se ven?

#### ☎️ CONTACTO
- [ ] ¿El **formulario** carga?
- [ ] ¿Se puede **rellenar y enviar**?

#### ✉️ CHAT
- [ ] ¿El **botón de chat** aparece abajo a la derecha?
- [ ] ¿Se abre al clickear?
- [ ] ¿Se pueden **enviar mensajes**?

#### 📱 WhatsApp
- [ ] ¿El **botón verde** (WhatsApp) aparece?
- [ ] ¿Abre WhatsApp al clickear?

---

## 🔧 PASO 4: DEPURACIÓN (Si hay problemas)

### Abrir consola del navegador
```
F12 → Console
```

### Errores comunes

#### ❌ "Undefined is not a function"
```javascript
// Significa que falta la carga de public/data.js
// Solución: Verificar que index.html tenga:
<script src="/data.js"></script>
```

#### ❌ "Cannot read property 'length' of undefined"
```javascript
// Algún array de datos no está definido
// Solución: Ejecutar actualizar_contenido.ps1 de nuevo para regenerar public/data.js
```

#### ❌ "Failed to load image"
```javascript
// Las imágenes no están en la ruta correcta
// Solución: Verificar que public/images/Desarrollos/ existe con las imágenes
```

#### ❌ Datos no aparecen en selectores
```javascript
// Solución: Ejecutar actualizar_contenido.ps1 (sin -ValidateOnly)
```

### Ver logs de ejecución
```powershell
# Ejecutar con verbose para ver qué está pasando
.\actualizar_contenido.ps1 -Verbose
```

---

## 📋 PASO 5: VALIDACIÓN FINAL (Antes de Git)

Cuando todo se vea bien:

```powershell
# 1. Validación final
.\revisar_antes_de_git.ps1

# 2. Si dice "LISTO para publicar":
.\publicar_git.ps1

# 3. Revisar cambios en GitHub
git status
git log --oneline -5
```

---

## 📊 CHECKLIST COMPLETO

### ✅ Estructura
- [ ] `index.html` existe y valida sin errores
- [ ] `mapa.html` existe
- [ ] `actualizar_contenido.ps1` existe
- [ ] `revisar_antes_de_git.ps1` existe

### ✅ Datos
- [ ] `src/data/data.js` tiene desarrollos
- [ ] `src/data/blog.js` tiene posts
- [ ] `src/data/ciudades.js` tiene ciudades
- [ ] `src/data/descargas.js` tiene archivos

### ✅ Imágenes
- [ ] `public/images/Desarrollos/` existe
- [ ] Hay imágenes en cada carpeta de desarrollo
- [ ] `public/images/` no supera 500MB (si supera, activar Git LFS)

### ✅ CSS y Animaciones
- [ ] Tarjetas flotantes se ven
- [ ] Animaciones son suaves (no choppy)
- [ ] Colores son correctos (dorado + verde agua)
- [ ] Hover effects funcionan

### ✅ Funcionalidad JavaScript
- [ ] Buscador filtra correctamente
- [ ] Click en cards abre detalles
- [ ] Chat funciona
- [ ] Formularios envían
- [ ] No hay errores en Console (F12)

### ✅ Responsive
- [ ] Se ve bien en desktop (1920px)
- [ ] Se ve bien en tablet (768px)
- [ ] Se ve bien en mobile (375px)
- [ ] Menú mobile abre/cierra

### ✅ SEO
- [ ] Title es correcto
- [ ] Meta description presente
- [ ] Open Graph tags presente
- [ ] Schema.org markup presente

### ✅ Seguridad
- [ ] `.env` existe localmente
- [ ] `.env` NO está en git (aparece en .gitignore)
- [ ] Secretos API no expuestos en código
- [ ] CORS configurado (si necesario)

---

## 🚀 COMANDOS RÁPIDOS

```powershell
# Validar todo
.\revisar_antes_de_git.ps1

# Inyectar datos (ver qué inyectará)
.\actualizar_contenido.ps1 -ValidateOnly

# Inyectar datos (ejecutar)
.\actualizar_contenido.ps1

# Publicar a Git
.\publicar_git.ps1

# Test rápido
.\test_vexo.bat

# Ver status de Git
git status

# Ver cambios
git diff index.html | more

# Ver logs
git log --oneline -10
```

---

## 📞 SOPORTE RÁPIDO

### El buscador no funciona
1. Abrir `index.html` en navegador
2. F12 → Console
3. Escribir: `window.DESARROLLOS`
4. Debe mostrar array de desarrollos
5. Si muestra `undefined`, ejecutar `actualizar_contenido.ps1`

### Las imágenes no cargan
1. Verificar que `public/images/` existe
2. Verificar que hay carpetas `1-nombre/`, `2-otro/`, etc.
3. Verificar que las imágenes tienen extensión `.webp` o `.jpg`
4. En index.html, los `src` deben tener ruta correcta

### El mapa se congela
1. Verificar que `mapa.html` carga MapLibre correctamente
2. Abrir `mapa.html` directamente en navegador
3. Si se congela, revisar console por errores

### Datos no se inyectan
1. Ejecutar `.\actualizar_contenido.ps1 -ValidateOnly`
2. Ver si muestra los datos que encuentra
3. Si muestra 0, verificar que `data.js` tiene formato correcto
4. Ejecutar `.\revisar_antes_de_git.ps1` para detalles

---

## 🎨 PERSONALIZACIÓN RÁPIDA

### Cambiar color dorado
En `index.html` <style>, busca:
```css
--primary: #d4891a;    /* Cambiar este color */
--primary-d: #e8a92a;  /* Cambiar este (más claro) */
--primary-deep: #8b4a12; /* Cambiar este (más oscuro) */
```

### Cambiar imágenes de tarjetas flotantes
En `index.html`, busca `hero-visual-col`:
```html
<img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80"
```
Reemplazar URL con imagen real del desarrollo.

### Agregar más desarrollos
1. Abrir `src/data/data.js`
2. Copiar un objeto desarrollo
3. Cambiar id, nombre, zona, imagen, precio
4. Ejecutar `actualizar_contenido.ps1`

---

## 🔍 VERIFICACIÓN DE CALIDAD

```powershell
# Script de prueba automatizado (crear nuevo archivo)
# test_full.ps1

param([string]$Base = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO")

# Test 1: HTML válido
$html = Get-Content "$Base\index.html" -Raw
Write-Host "$(if ($html -match '<html') {'✓'} else {'✗'}) HTML válido"

# Test 2: Scripts cargados
@('data.js', 'config.js', 'blog.js', 'ciudades.js') | ForEach-Object {
    Write-Host "$(if ($html -match $_) {'✓'} else {'✗'}) Script: $_"
}

# Test 3: Páginas presentes
@('page-home', 'page-desarrollos', 'page-blog', 'page-mapa', 'page-contacto') | ForEach-Object {
    Write-Host "$(if ($html -match "id=`"$_`"") {'✓'} else {'✗'}) Página: $_"
}

# Test 4: Datos cargables
@('DESARROLLOS', 'CIUDADES', 'BLOG_POSTS') | ForEach-Object {
    $data = Get-Content "$Base\src\data\*.js" -Raw | Where-Object { $_ -match "window\.$_" }
    Write-Host "$(if ($data) {'✓'} else {'✗'}) Datos: $_"
}
```

---

**Última actualización:** 29 de abril de 2026
**Versión:** MASTER OPTIMIZADO
**Estado:** ✅ Listo para ejecución

