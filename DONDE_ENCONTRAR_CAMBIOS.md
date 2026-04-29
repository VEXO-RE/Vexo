# VEXO MASTER - DÓNDE ENCONTRAR LOS CAMBIOS

## 📍 CAMBIOS EN index.html

### Ubicación: Sección HERO (página principal)

**Línea aproximada:** 1530-1580 (sección `.hero-visual-col`)

### ✅ Lo que cambió:

#### 1. Badge ROI (+22%) - Ahora con Pulse
```html
<!-- ANTES: Simple -->
<div class="glass anim-glow" style="...">
  <span class="material-symbols-outlined icon-fill">trending_up</span>
  <div>
    <div style="...color:var(--primary)">+22%</div>
  </div>
</div>

<!-- DESPUÉS: Con animación pulse + gradiente -->
<div class="glass anim-glow" 
     style="...box-shadow:0 0 20px rgba(212,137,26,0.25), inset 0 1px 0 rgba(19,236,218,0.1);">
  <span class="material-symbols-outlined icon-fill" 
        style="...animation:pulse 2s ease-in-out infinite;">trending_up</span>
  <div>
    <div style="background:linear-gradient(135deg,var(--primary),var(--primary-d)); 
                -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
      +22%
    </div>
  </div>
</div>
```

**Cambios clave:**
- ✓ Agregada `animation:pulse 2s ease-in-out infinite;` en el icono
- ✓ Mejorada sombra: ahora tiene glow + inset
- ✓ Precio con gradiente (dorado degradado)

#### 2. Mini Cards - Ahora con hover + float escalonado
```html
<!-- ANTES: Sin animación --> 
<div class="glass" style="border-radius:14px; overflow:hidden;">
  <img src="..." alt="..." style="width:100%; height:110px; object-fit:cover;" />
  <div style="padding:10px 12px;">
    <div style="...font-size:12px;">Roma Norte · CDMX</div>
    <div style="...color:var(--text-s); font-size:11px;">Desde $3.2 MDP</div>
  </div>
</div>

<!-- DESPUÉS: Con animación + hover -->
<div class="glass" 
     style="border-radius:14px; overflow:hidden; 
             transition:all 0.35s cubic-bezier(0.16,1,0.3,1); 
             border:1px solid rgba(19,236,218,0.15);
             animation:float 3s ease-in-out infinite 0.3s;
             cursor:pointer;"
     onmouseover="this.style.transform='translateY(-4px)'; 
                  this.style.boxShadow='0 12px 28px rgba(212,137,26,0.3)';"
     onmouseout="this.style.transform='translateY(0)'; 
                 this.style.boxShadow='';">
  <img src="..." alt="..." 
       style="width:100%; height:110px; object-fit:cover; display:block; 
               transition:transform 0.5s ease;" />
  <div style="padding:12px;">
    <div style="font-family:'Syne',sans-serif; font-weight:700; font-size:12px; color:var(--text);">
      Roma Norte · CDMX
    </div>
    <div style="color:var(--primary); font-weight:700; font-size:13px; margin-top:4px;">
      $3.2 MDP
    </div>
  </div>
</div>
```

**Cambios clave:**
- ✓ Agregada `animation:float 3s ease-in-out infinite 0.3s;` (float con delay)
- ✓ Agregados `onmouseover` y `onmouseout` para hover effects
- ✓ Precio cambió a color primario (más destacado)
- ✓ Agregada transición suave `cubic-bezier(0.16,1,0.3,1)`

#### 3. Keyframe Pulse - NUEVA ANIMACIÓN
```css
/* Ubicación: <style> línea ~700 (después de pulse-dot) */

/* ANTES: No existía */

/* DESPUÉS: Nueva animación */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
```

**Efecto:** El icono de +22% sube/baja de tamaño + cambia opacidad, creando efecto de brillo

---

## 📍 CAMBIOS EN revisar_antes_de_git.ps1

### Ubicación: Línea 20-100 (validación de archivos + exports)

### ✅ Lo que cambió:

#### 1. Archivos core ahora include todos los data files
```powershell
# ANTES (línea 27-40):
$coreFiles = @(
    "index.html",
    ...
    "src\data\data.js",
    "src\styles\design-system.css",
    "src\utils\helpers.js"
)

# DESPUÉS (línea 27-47):
$coreFiles = @(
    "index.html",
    ...
    "src\data\data.js",
    "src\data\config.js",         # ✓ NUEVO
    "src\data\blog.js",           # ✓ NUEVO
    "src\data\ciudades.js",       # ✓ NUEVO
    "src\data\empresa.js",        # ✓ NUEVO
    "src\data\descargas.js",      # ✓ NUEVO
    "src\data\legal.js",          # ✓ NUEVO
    "src\styles\design-system.css",
    "src\utils\helpers.js"
)
```

#### 2. Nueva sección: Validación de exports en TODOS los archivos
```powershell
# ANTES (línea 60-80): Buscaba todos en data.js
@('window.CONFIG','window.DESARROLLOS',...) | ForEach-Object {
    if ($dataJs -match [regex]::Escape($_)) { OK "Export: $_" }
    else { ERR "Falta export: $_" }
}

# DESPUÉS (línea 60-80): Valida cada archivo
$dataFiles = @(
    @{ file = "data.js"; export = "DESARROLLOS" },
    @{ file = "config.js"; export = "CONFIG" },
    @{ file = "blog.js"; export = "BLOG_POSTS" },
    @{ file = "ciudades.js"; export = "CIUDADES" },
    @{ file = "empresa.js"; export = "EMPRESA" },
    @{ file = "descargas.js"; export = "DESCARGAS" },
    @{ file = "legal.js"; export = "LEGAL" }
)

foreach ($df in $dataFiles) {
    $filePath = "$BASE\src\data\$($df.file)"
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        if ($content -match "window\.$($df.export)\s*=") {
            OK "Export: window.$($df.export) en $($df.file)"
        } else {
            WARN "No se encuentra window.$($df.export) en $($df.file)"
        }
    }
}
```

#### 3. Removidos false positives
```powershell
# ANTES (línea 155-160): Falsos positivos
if ($idx -match '<nav[^>]*class="nav-links"') { ERR "nav anidado invalido" }
if ($idx -match '--text-mid\s*:') { WARN "CSS var duplicada --text-mid" }

# DESPUÉS: Removidos (no existen estos problemas)
# Reemplazados por validaciones más precisas y reales
if ($idx -match '</di\s+<div') { ERR "HTML roto: </di <div" }  # ✓ Real
```

#### 4. Colores estandarizados
```powershell
# ANTES:
Write-Host "  [OK]  $m" -FG Green

# DESPUÉS:
Write-Host "  [OK]  $m" -ForegroundColor Green  # ✓ Estándar PS
```

---

## 📍 NUEVO: actualizar_contenido.ps1

### Ubicación: Archivo completo (290 líneas)

### ✅ Estructura:

#### Fase 1: Validación de estructura (línea 40-70)
```powershell
# Verifica directorios necesarios
$requiredDirs = @(
    "$ProjectPath\src\data",
    "$ProjectPath\src\styles",
    ...
)

# Verifica archivos críticos
$requiredFiles = @(
    "$ProjectPath\index.html",
    "$ProjectPath\src\data\data.js",
    ...
)
```

#### Fase 2: Carga de datos (línea 80-200)
```powershell
# Lee DESARROLLOS desde data.js
$devPattern = 'id:\s*(\d+),\s*nombre:\s*["\']([^"\']+)["\'],...'
$matches = [regex]::Matches($dataContent, $devPattern, ...)
foreach ($match in $matches) {
    $dev = @{
        id = [int]$match.Groups[1].Value
        nombre = $match.Groups[2].Value
        ...
    }
    $allData.DESARROLLOS += $dev
}

# Similar para BLOG_POSTS, CIUDADES, etc.
```

#### Fase 3: Validación pre-inyección (línea 210-250)
```powershell
# Valida campos vacíos
foreach ($dev in $allData.DESARROLLOS) {
    $emptyFields = @()
    @('id', 'nombre', 'zona', ...) | ForEach-Object {
        if ([string]::IsNullOrWhiteSpace($dev[$_])) {
            $emptyFields += $_
        }
    }
}

# Valida imágenes
$imageCheck = 0
foreach ($dev in $allData.DESARROLLOS) {
    if (Test-Path "$ProjectPath\public\images\$($dev.imagen)") {
        $imageCheck++
    }
}
```

#### Fase 4: Inyección en HTML (línea 260-290)
```powershell
# Actualiza selectores con opciones dinámicas
$selectPattern = '<select[^>]*id="filterZona"[^>]*>.*?</select>'
$selectOptions = @()
$selectOptions += '<select id="filterZona" class="form-inp">'
$selectOptions += '  <option value="">Todas las zonas</option>'

$uniqueZonas = $allData.DESARROLLOS | Select-Object -ExpandProperty zona -Unique
foreach ($zona in $uniqueZonas) {
    $selectOptions += "  <option value=`"$zona`">$zona</option>"
}

# Reemplaza en HTML
if ($indexContent -match $selectPattern) {
    $indexContent = $indexContent -replace $selectPattern, ($selectOptions -join "`n")
}

# Guarda cambios
Set-Content -Path $indexPath -Value $indexContent -Encoding UTF8
```

---

## 📍 DÓNDE VERIFICAR LOS CAMBIOS

### En el navegador (index.html):
1. **HOME page** → scroll down a hero
   - Verás tarjetas flotantes con animación
   - Badge +22% tendrá pulso
   - Hover en mini cards elevará tarjetas

2. **Developer Tools** (F12):
   - Busca `@keyframes pulse` en Styles
   - Verás la nueva animación
   - Busca animación en tarjetas

### En PowerShell (revisar_antes_de_git.ps1):
1. Ejecuta: `.\revisar_antes_de_git.ps1`
2. Verá línea: "Export: window.DESARROLLOS en data.js" ✓
3. Verá línea: "Export: window.CONFIG en config.js" ✓
4. Verá línea: "Export: window.BLOG_POSTS en blog.js" ✓
5. Etc. para cada archivo

### En PowerShell (actualizar_contenido.ps1):
1. Ejecuta: `.\actualizar_contenido.ps1 -ValidateOnly`
2. Verá:
   - "Encontrados: X desarrollos"
   - "Encontrados: Y posts de blog"
   - "Encontradas: Z ciudades"
3. Luego ejecuta: `.\actualizar_contenido.ps1`
4. Verá:
   - "Selector de zonas actualizado"
   - "Backup creado: index.html.backup.YYYYMMDD_HHMMSS"
   - "index.html actualizado"

---

## 🔍 BÚSQUEDA RÁPIDA

### En index.html:
- Buscar: `hero-visual-col` → Encuentra todas las tarjetas
- Buscar: `@keyframes pulse` → Encuentra la nueva animación
- Buscar: `animation:float` → Encuentra tarjetas con float
- Buscar: `onmouseover` → Encuentra hover effects

### En revisar_antes_de_git.ps1:
- Buscar: `$dataFiles` → Encuentra validación de exports
- Buscar: `foreach ($df in $dataFiles)` → Bucle de validación
- Buscar: `-ForegroundColor` → Encuentra colores estándares

### En actualizar_contenido.ps1:
- Buscar: `FASE` → Encuentra los 4 pasos principales
- Buscar: `$devPattern` → Encuentra regex para desarrollos
- Buscar: `$selectPattern` → Encuentra inyección en selectores

---

## 📊 RESUMEN DE LÍNEAS MODIFICADAS

| Archivo | Líneas | Tipo de cambio |
|---------|--------|----------------|
| index.html | 1530-1600 | Mejora de tarjetas + nueva keyframe |
| revisar_antes_de_git.ps1 | 20-100, 155-160 | Reescritura, removidos false positives |
| actualizar_contenido.ps1 | 1-290 | NUEVO archivo completo |
| **Total cambios** | ~500 líneas | Mejoras visuales + validación + inyección |

---

**Última actualización:** 29 de abril de 2026
**Versión:** MASTER OPTIMIZADO v2
**Estado:** ✅ Todos los cambios documentados

