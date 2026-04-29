# ============================================================================
# VEXO REAL ESTATE - revisar_antes_de_git.ps1
# Auditoría estricta pre-deploy (MEJORADA)
# Repo: https://github.com/VEXO-RE/Vexo.git
# ============================================================================

param(
    [switch]$NoPause
)

$BASE = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO"
$OK = 0; $WARN = 0; $ERR = 0

function OK   { param($m) Write-Host "  [OK]  $m" -ForegroundColor Green;  $script:OK++ }
function WARN { param($m) Write-Host "  [!!]  $m" -ForegroundColor Yellow; $script:WARN++ }
function ERR  { param($m) Write-Host "  [XX]  $m" -ForegroundColor Red;    $script:ERR++ }
function HDR  { param($m) Write-Host "`n  ==== $m ====" -ForegroundColor Cyan }

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║   VEXO RE - Validacion Pre-Git (MEJORADA)          ║" -ForegroundColor Cyan
Write-Host "  ╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Set-Location $BASE

HDR "1. Archivos core del proyecto"
$coreFiles = @(
    "index.html",
    "mapa.html",
    "vercel.json",
    "robots.txt",
    "sitemap.xml",
    "README.md",
    ".gitignore",
    "publicar_git.ps1",
    "revisar_antes_de_git.ps1",
    "actualizar_contenido.ps1",
    "src\data\data.js",
    "src\data\config.js",
    "src\data\blog.js",
    "src\data\ciudades.js",
    "src\data\empresa.js",
    "src\data\descargas.js",
    "src\data\legal.js",
    "src\data\data.js.bak",
    "src\styles\design-system.css",
    "src\utils\helpers.js"
)
foreach ($f in $coreFiles) {
    if (Test-Path "$BASE\$f") { OK $f }
    else { ERR "FALTA: $f" }
}

HDR "2. Verificacion exports en src/data"
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
        $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        if ($df.export -eq 'DESCARGAS') {
            if ($content -match 'window\.DESCARGAS\s*=' -or $content -match 'window\.getDescargas\s*=' -or $content -match 'function\s+getDescargas') {
                OK "Export: $($df.export) o getDescargas en $($df.file)"
            } else {
                WARN "No se encuentra window.$($df.export) ni getDescargas en $($df.file)"
            }
        } elseif ($content -match "window\.$($df.export)\s*=") {
            OK "Export: window.$($df.export) en $($df.file)"
        } else {
            WARN "No se encuentra window.$($df.export) en $($df.file)"
        }
    } else {
        WARN "Archivo faltante: $($df.file)"
    }
}

HDR "3. Verificacion src/data/data.js"
if (Test-Path "$BASE\src\data\data.js") {
    $dataJs = [System.IO.File]::ReadAllText("$BASE\src\data\data.js", [System.Text.Encoding]::UTF8)
    $requiredDataExports = @("DESARROLLOS","CONFIG","BLOG_POSTS","CIUDADES","EMPRESA","DESCARGAS","LEGAL")
    foreach ($export in $requiredDataExports) {
        if ($dataJs -match "window\.$export\s*=") { OK "data.js contiene window.$export" }
        else { ERR "data.js NO contiene window.$export" }
    }
    if ($dataJs -match 'function\s+getDesarrolloBySlug') { OK "getDesarrolloBySlug presente en data.js" } else { WARN "getDesarrolloBySlug no encontrado en data.js" }
    if ($dataJs -match 'function\s+getDesarrolloById') { OK "getDesarrolloById presente en data.js" } else { WARN "getDesarrolloById no encontrado en data.js" }
    if ($dataJs -match 'function\s+getImgPrincipal') { OK "getImgPrincipal presente en data.js" } else { WARN "getImgPrincipal no encontrado en data.js" }
    $devCount = ([regex]::Matches($dataJs,'id:\s*\d+')).Count
    if ($devCount -gt 0) { OK "DESARROLLOS en data.js: $devCount encontrados" } else { ERR "No se detectaron desarrollos en data.js" }
    if ($dataJs -match 'window\.DESARROLLOS\s*=\s*DESARROLLOS') { OK "Asignacion global DESARROLLOS correcta" } else { WARN "Asignacion global DESARROLLOS sospechosa" }
} else {
    ERR "FALTA: src/data/data.js"
}

HDR "4. Verificacion index.html"
if (Test-Path "$BASE\index.html") {
    $idx = [System.IO.File]::ReadAllText("$BASE\index.html", [System.Text.Encoding]::UTF8)
    @("page-home","page-desarrollos","page-detalle","page-ciudades","page-nosotros",
      "page-blog","page-blog-post","page-descargas","page-mapa","page-contacto",
      "page-privacidad","page-terminos","page-aviso-legal") | ForEach-Object {
        if ($idx.Contains($_)) { OK "Seccion: $_" } else { ERR "Falta seccion: $_" }
    }
    if ($idx.Contains('src/data/data.js')) { OK 'Script de datos: src/data/data.js referenciado' } else { ERR 'No se referencia src/data/data.js en index.html' }
    if ($idx.Contains('FUENTE UNICA: src/data/data.js')) { OK 'Comentario de fuente unica presente' } else { WARN 'Falta comentario de fuente unica en index.html' }
    if ($idx.Contains('design-system.css')) { OK 'design-system.css enlazado' } else { ERR 'Falta design-system.css' }
    $brokenHtmlNeedle = '</di ' + '<div'
    if ($idx.Contains($brokenHtmlNeedle)) { ERR 'HTML roto detectado' } else { OK 'Sin HTML roto evidente' }
    $badEnc2 = @("MÃÂÃÂ","Mrida","MÃ©rida","Ã©")
    $encBad2 = $badEnc2 | Where-Object { $idx.Contains($_) }
    if ($encBad2.Count -gt 0) { ERR "Encoding roto en index.html: $($encBad2 -join ', ')" } else { OK "index.html encoding UTF-8 limpio" }
} else {
    ERR "FALTA: index.html"
}

HDR "5. Verificacion mapa.html"
if (Test-Path "$BASE\mapa.html") {
    $mapa = [System.IO.File]::ReadAllText("$BASE\mapa.html", [System.Text.Encoding]::UTF8)
    if ($mapa.Contains('maplibre-gl@3.6.2')) { OK "MapLibre GL 3.6.2 cargado" } else { ERR "MapLibre GL version incorrecta" }
    if ($mapa.Contains('dark-matter-gl-style')) { OK "Estilo Carto Dark Matter" } else { ERR "Falta estilo Carto" }
    if ($mapa.Contains('LUGARES_INTERES')) { OK '20 lugares de interes incluidos' } else { WARN 'LUGARES_INTERES no encontrado' }
    $filterMapNeedle = 'function ' + 'filterMap'
    if ($mapa.Contains($filterMapNeedle)) { OK 'filterMap presente' } else { ERR 'Falta filterMap' }
    if ($mapa.Contains('fill-extrusion')) { OK 'Edificios 3D activados' } else { WARN 'Edificios 3D no detectados' }
    if ($mapa.Contains('lng:-8')) { OK "Longitudes negativas en mapa" } else { WARN "Verificar longitudes en mapa.html" }
} else {
    ERR "FALTA: mapa.html"
}

HDR "6. Seguridad"
if (Test-Path "$BASE\.gitignore") {
    $gi = Get-Content "$BASE\.gitignore" -Raw
    @(".env","*.csv","VEXO_WEB/descargas/","Mapa-vexo/","*.log","CLAUDE.md","publicar_en_vercel.ps1") | ForEach-Object {
        if ($gi -match [regex]::Escape($_)) { OK ".gitignore: $_" } else { WARN ".gitignore no excluye: $_" }
    }
}
if (Test-Path "$BASE\.env") {
    git ls-files --error-unmatch "$BASE\.env" > $null 2>&1
    if ($LASTEXITCODE -eq 0) { ERR ".env esta en git - eliminar ahora" } else { OK ".env existe local pero NO esta en git" }
}

HDR "7. Imagenes"
$imgDir = "$BASE\public\images\Desarrollos"
if (Test-Path $imgDir) {
    $imgFiles = Get-ChildItem $imgDir -Recurse -File -Include "*.webp","*.jpg","*.png"
    $imgMB = [math]::Round(($imgFiles | Measure-Object Length -Sum).Sum / 1MB, 1)
    OK "Imagenes: $($imgFiles.Count) archivos - ${imgMB}MB"
    if ($imgMB -gt 250) { ERR "Supera 250MB - activa Git LFS o reduce imagenes" }
    elseif ($imgMB -gt 95) { WARN "Imagenes: ${imgMB}MB - considera comprimir .webp o usar Git LFS" }
} else { WARN "No se encontraron imagenes en public\images\Desarrollos" }

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║   RESUMEN DE REVISION PRE-GIT                       ║" -ForegroundColor Cyan
Write-Host "  ╠══════════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "  ║  OK:       $OK" -ForegroundColor Green
Write-Host "  ║  WARNINGS: $WARN" -ForegroundColor Yellow
Write-Host "  ║  ERRORES:  $ERR" -ForegroundColor $(if($ERR -gt 0){"Red"}else{"Green"})
Write-Host "  ╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

if ($ERR -gt 0) {
    Write-Host "  STOP: Hay $ERR error(es) criticos que corregir antes del push." -ForegroundColor Red
} else {
    Write-Host "  LISTO para publicar. Ejecuta publicar_git.ps1" -ForegroundColor Green
}
Write-Host ""
if (-not $NoPause) { Read-Host "  Enter para cerrar" }
