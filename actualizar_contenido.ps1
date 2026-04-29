# ============================================================================
# VEXO ACTUALIZAR CONTENIDO - Script Maestro de Sincronización
# ============================================================================
# Propósito: Generar src/data/data.js a partir de los archivos fuente y validar
# Autor: VEXO Team
# Última actualización: 2026-04-29
# ============================================================================

param(
    [string]$ProjectPath = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO",
    [switch]$ValidateOnly,
    [switch]$Verbose
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step { param($m) Write-Host "╔════════════════════════════════════════════════════════" -ForegroundColor Cyan; Write-Host "║  $m" -ForegroundColor Cyan; Write-Host "╚════════════════════════════════════════════════════════" -ForegroundColor Cyan }
function Write-Info { param($m) Write-Host "  $m" -ForegroundColor Green }
function Write-Warn { param($m) Write-Host "  [WARN] $m" -ForegroundColor Yellow }
function Write-Err { param($m) Write-Host "  [ERROR] $m" -ForegroundColor Red }

Write-Host "";
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  VEXO ACTUALIZAR CONTENIDO - INICIO ANÁLISIS            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$requiredDirs = @(
    "$ProjectPath\src\data",
    "$ProjectPath\src\styles",
    "$ProjectPath\src\utils"
)

$requiredFiles = @(
    "$ProjectPath\index.html",
    "$ProjectPath\mapa.html",
    "$ProjectPath\src\styles\design-system.css"
)

$optionalFiles = @(
    "$ProjectPath\vexo-premium.css"
)

$missingDirs = @()
$missingFiles = @()
$missingOptional = @()

foreach ($dir in $requiredDirs) {
    if (-not (Test-Path $dir)) {
        $missingDirs += $dir
        Write-Warn "Directorio faltante: $dir"
    }
}

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
        Write-Warn "Archivo crítico faltante: $file"
    }
}

foreach ($file in $optionalFiles) {
    if (-not (Test-Path $file)) {
        $missingOptional += $file
        Write-Warn "Archivo opcional faltante: $file"
    }
}

if ($missingDirs.Count -gt 0 -or $missingFiles.Count -gt 0) {
    Write-Err "Estructura crítica incompleta. Abortando."
    exit 1
}

if ($missingOptional.Count -gt 0) {
    Write-Warn "Algunos archivos opcionales faltan, pero la generación de datos continuará."
}

Write-Info "Estructura base validada ✓"

$sourcePath = Join-Path $ProjectPath "src\data"
$dataFilePath = Join-Path $sourcePath "data.js"
$dataBakPath = Join-Path $sourcePath "data.js.bak"

$sourceFiles = @{
    CONFIG = "config.js"
    BLOG_POSTS = "blog.js"
    CIUDADES = "ciudades.js"
    EMPRESA = "empresa.js"
    DESCARGAS = "descargas.js"
    LEGAL = "legal.js"
}

$sourceContents = @{}
$errors = @()

Write-Host ""
Write-Step "FASE 1: Cargando archivos fuente" 

foreach ($key in $sourceFiles.Keys) {
    $filePath = Join-Path $sourcePath $sourceFiles[$key]
    if (-not (Test-Path $filePath)) {
        $errors += "Falta archivo fuente: $($sourceFiles[$key])"
        Write-Warn "Falta archivo fuente: $($sourceFiles[$key])"
        continue
    }
    try {
        $sourceContents[$key] = Get-Content $filePath -Raw -Encoding UTF8
        Write-Info "Fuente cargada: $($sourceFiles[$key])"
    } catch {
        $errors += "No se pudo leer $($sourceFiles[$key]): $_"
        Write-Err "No se pudo leer $($sourceFiles[$key]): $_"
    }
}

if ($errors.Count -gt 0) {
    Write-Err "No puedo continuar sin todos los archivos fuente de datos."
    $errors | ForEach-Object { Write-Err $_ }
    exit 1
}

if (-not (Test-Path $dataBakPath)) {
    Write-Err "No se encontró el archivo de respaldo: $dataBakPath"
    exit 1
}

$bakContent = Get-Content $dataBakPath -Raw -Encoding UTF8

function Extract-JsArrayBlock {
    param(
        [string]$Text,
        [string]$Identifier
    )

    $pattern = "const\s+" + [regex]::Escape($Identifier) + "\s*=\s*\["
    $match = [regex]::Match($Text, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $match.Success) { return $null }

    $pos = $match.Index + $match.Length
    $depth = 1
    $inSingle = $false
    $inDouble = $false
    $inTemplate = $false
    $escaped = $false

    while ($pos -lt $Text.Length) {
        $char = $Text[$pos]
        if ($escaped) {
            $escaped = $false
        } elseif ($char -eq '\\') {
            $escaped = $true
        } elseif (-not $inSingle -and -not $inDouble -and $char -eq '`') {
            $inTemplate = -not $inTemplate
        } elseif (-not $inSingle -and -not $inTemplate -and $char -eq '"') {
            $inDouble = -not $inDouble
        } elseif (-not $inDouble -and -not $inTemplate -and $char -eq "'") {
            $inSingle = -not $inSingle
        } elseif (-not $inSingle -and -not $inDouble -and -not $inTemplate) {
            if ($char -eq '[') { $depth++ }
            elseif ($char -eq ']') {
                $depth--
                if ($depth -eq 0) {
                    return $Text.Substring($match.Index, $pos - $match.Index + 1)
                }
            }
        }
        $pos++
    }
    return $null
}

$desarrollosBlock = Extract-JsArrayBlock -Text $bakContent -Identifier "DESARROLLOS"
if (-not $desarrollosBlock) {
    Write-Err "No se pudo extraer el bloque DESARROLLOS de data.js.bak"
    exit 1
}

$devCount = ([regex]::Matches($desarrollosBlock, 'id:\s*\d+')).Count
Write-Info "DESARROLLOS extraídos: $devCount"

# Build consolidated file content
$generated = @()
$generated += "// ============================================================"
$generated += "// src/data/data.js — Archivo consolidado generado por actualizar_contenido.ps1"
$generated += "// Fecha: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$generated += "// Origen: src/data/config.js, blog.js, ciudades.js, empresa.js, descargas.js, legal.js, data.js.bak"
$generated += "// ============================================================"
$generated += ""

foreach ($key in @('CONFIG','BLOG_POSTS','CIUDADES','EMPRESA','DESCARGAS','LEGAL')) {
    $generated += $sourceContents[$key]
    $generated += ""
}

$generated += "// ============================================================"
$generated += "// DESARROLLOS extraídos desde data.js.bak"
$generated += "// ============================================================"
$generated += $desarrollosBlock
$generated += ""
$generated += "function getDesarrolloBySlug(slug) {"
$generated += "  if (slug === null || slug === undefined) return null;"
$generated += "  var value = String(slug).toLowerCase();"
$generated += "  return DESARROLLOS.find(function (item) {"
$generated += "    return String(item.slug || '').toLowerCase() === value || String(item.id) === value;"
$generated += "  }) || null;"
$generated += "}"
$generated += ""
$generated += "function getDesarrolloById(id) {"
$generated += "  return getDesarrolloBySlug(id);"
$generated += "}"
$generated += ""
$generated += "function getImgPrincipal(dev) {"
$generated += "  if (!dev) return '';"
$generated += "  if (dev.foto_principal_url) return dev.foto_principal_url;"
$generated += "  if (Array.isArray(dev.imagenes) && dev.imagenes.length > 0) return dev.imagenes[0];"
$generated += "  return dev.imagen_fallback || 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80';"
$generated += "}"
$generated += ""
$generated += "window.CONFIG = CONFIG;"
$generated += "window.BLOG_POSTS = BLOG_POSTS;"
$generated += "window.CIUDADES = CIUDADES;"
$generated += "window.EMPRESA = EMPRESA;"
$generated += "window.DESCARGAS = DESCARGAS;"
$generated += "window.LEGAL = LEGAL;"
$generated += "window.DESARROLLOS = DESARROLLOS;"
$generated += "window.getDescargas = getDescargas;"
$generated += "window.getDesarrolloBySlug = getDesarrolloBySlug;"
$generated += "window.getDesarrolloById = getDesarrolloById;"
$generated += "window.getImgPrincipal = getImgPrincipal;"

if ($ValidateOnly) {
    Write-Info "Validación completada. No se escribió el archivo porque se usó -ValidateOnly."
    Write-Host ""
    Write-Info "Resumen:"
    Write-Info "  Archivos fuente cargados: $($sourceContents.Keys -join ', ')"
    Write-Info "  DESARROLLOS extraídos: $devCount"
    exit 0
}

if (Test-Path $dataFilePath) {
    $backupPath = "$dataFilePath.bak"
    Copy-Item -Path $dataFilePath -Destination $backupPath -Force
    Write-Info "Backup previo generado: $backupPath"
}

Set-Content -Path $dataFilePath -Value $generated -Encoding UTF8

Write-Host ""
Write-Info "Archivo consolidado generado correctamente: $dataFilePath"
Write-Info "Verifica index.html y recarga para asegurarte de que la información se visualiza correctamente."
