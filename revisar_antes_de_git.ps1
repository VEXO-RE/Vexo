# ================================================================
#  VEXO REAL ESTATE — revisar_antes_de_git.ps1
#  Auditoria estricta pre-deploy
#  Generado automaticamente por VEXO_MASTER_SYNC.ps1
#  Fecha: 27/04/2026 16:40
#  Repo: https://github.com/VEXO-RE/Vexo.git
# ================================================================

$BASE = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO"
$OK = 0; $WARN = 0; $ERR = 0

function OK   { param($m) Write-Host "  [OK]  $m" -FG Green;  $script:OK++ }
function WARN { param($m) Write-Host "  [!!]  $m" -FG Yellow; $script:WARN++ }
function ERR  { param($m) Write-Host "  [XX]  $m" -FG Red;    $script:ERR++ }
function HDR  { param($m) Write-Host "`n  ==== $m ====" -FG Cyan }

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║   VEXO RE -- Revision Pre-Git Completa              ║" -FG Cyan
Write-Host "  ╚══════════════════════════════════════════════════════╝" -FG Cyan

Set-Location $BASE

# 1. Archivos core
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
    "src\styles\design-system.css",
    "src\utils\helpers.js"
)
foreach ($f in $coreFiles) {
    if (Test-Path "$BASE\$f") { OK $f }
    else { ERR "FALTA: $f" }
}

# 2. Verificacion data.js
HDR "2. Verificacion data.js"
$dataJs = ""
if (Test-Path "$BASE\src\data\data.js") {
    $dataJs = [System.IO.File]::ReadAllText("$BASE\src\data\data.js", [System.Text.Encoding]::UTF8)

    # Encoding
    $badPats = @("MÃÂÃÂ","Mrida","Yucatn","Temozn","MÃ©rida","Ã©","CDXM")
    $encOK = $true
    foreach ($p in $badPats) {
        if ($dataJs.Contains($p)) { ERR "Encoding roto en data.js: '$p'"; $encOK = $false }
    }
    if ($encOK) { OK "Encoding limpio en data.js" }

    # Acentos correctos
    if ($dataJs -match "Mérida") { OK "Acento Merida: OK" } else { ERR "Falta acento en Merida" }
    if ($dataJs -match "Yucatán") { OK "Acento Yucatan: OK" } else { WARN "Falta acento en Yucatan" }

    # Longitudes negativas
    if ([regex]::IsMatch($dataJs,'lng:\s*\d{2,3}\.\d+')) { ERR "Longitudes POSITIVAS encontradas" }
    else { OK "Coordenadas: todas las longitudes son negativas" }

    # Rutas imagen sin duplicados
    $dupRutas = ([regex]::Matches($dataJs,'VEXO_WEB/Desarrollos/\d+-[^/]+/VEXO_WEB')).Count
    if ($dupRutas -gt 0) { ERR "Rutas duplicadas en imagenes: $dupRutas casos" }
    else { OK "Rutas de imagen sin duplicados" }

    # Exports
    @('window.CONFIG','window.DESARROLLOS','window.BLOG_POSTS','window.CIUDADES','window.EMPRESA','window.DESCARGAS','window.LEGAL') | ForEach-Object {
        if ($dataJs -match [regex]::Escape($_)) { OK "Export: $_" }
        else { ERR "Falta export: $_" }
    }

    # Contar desarrollos
    $devCount = ([regex]::Matches($dataJs,'^\s+id:\s+\d+,','Multiline')).Count
    OK "DESARROLLOS en data.js: $devCount (esperados: 26)"
    if ($devCount -lt 20) { WARN "Se esperaban 26 desarrollos, hay $devCount" }

    # Zona vacias
    $zonaEmpty = ([regex]::Matches($dataJs,'zona:\s*""')).Count
    if ($zonaEmpty -gt 0) { WARN "Campos zona vacios: $zonaEmpty (pueden romper filtros)" }
    else { OK "Todos los campos zona tienen valor" }

    # URL calendario corruptas (solo patron URL, no palabra 'Consultar')
    $calBad = ([regex]::Matches($dataJs,'uQT2fMM6R5Pxv7G39ultar')).Count
    if ($calBad -gt 0) { ERR "URLs calendario corruptas: $calBad casos" }
    else { OK "URLs calendario: correctas" }
}

# 3. Verificacion index.html
HDR "3. Verificacion index.html"
if (Test-Path "$BASE\index.html") {
    $idx = [System.IO.File]::ReadAllText("$BASE\index.html", [System.Text.Encoding]::UTF8)

    @("page-home","page-desarrollos","page-detalle","page-ciudades","page-nosotros",
      "page-blog","page-blog-post","page-descargas","page-mapa","page-contacto") | ForEach-Object {
        if ($idx -match $_) { OK "Seccion: $_" } else { ERR "Falta seccion: $_" }
    }

    if ($idx -match 'mapa\.html') { OK "Mapa embebido: iframe a mapa.html" } else { ERR "Falta iframe de mapa.html" }
    if ($idx -match 'src/data/data\.js') { OK "data.js es el script de datos" } else { ERR "Falta carga de data.js" }
    if ($idx -match 'design-system\.css') { OK "design-system.css enlazado" } else { WARN "design-system.css no enlazado" }

    # Checks Abril 2026
    if ($idx -match '<nav[^>]*class="nav-links"') { ERR "nav anidado invalido detectado" } else { OK "Sin nav anidado invalido" }
    if ($idx -match '</di\s+<div') { ERR "HTML roto </di <div detectado" } else { OK "Sin HTML roto" }
    if ($idx -match '--text-mid\s*:') { WARN "CSS var duplicada --text-mid detectada" } else { OK "Sin CSS vars duplicadas" }

    # Encoding
    $badEnc2 = @("MÃÂÃÂ","Mrida","MÃ©rida","Ã©")
    $encBad2 = $badEnc2 | Where-Object { $idx.Contains($_) }
    if ($encBad2.Count -gt 0) { ERR "Encoding roto en index.html: $($encBad2 -join ', ')" }
    else { OK "index.html encoding UTF-8 limpio" }
}

# 4. Verificacion mapa.html
HDR "4. Verificacion mapa.html"
if (Test-Path "$BASE\mapa.html") {
    $mapa = [System.IO.File]::ReadAllText("$BASE\mapa.html", [System.Text.Encoding]::UTF8)
    if ($mapa -match 'maplibre-gl@3\.6\.2') { OK "MapLibre GL 3.6.2 cargado" } else { ERR "MapLibre GL version incorrecta" }
    if ($mapa -match 'dark-matter-gl-style') { OK "Estilo Carto Dark Matter" } else { ERR "Falta estilo Carto" }
    if ($mapa -match 'LUGARES_INTERES') { OK "20 lugares de interes incluidos" } else { WARN "LUGARES_INTERES no encontrado" }
    if ($mapa -match 'function filterMap') { OK "filterMap() presente" } else { ERR "Falta filterMap()" }
    if ($mapa -match 'fill-extrusion') { OK "Edificios 3D activados" } else { WARN "Edificios 3D no detectados" }
    if ($mapa -match 'lng:-8') { OK "Longitudes negativas en mapa" } else { WARN "Verificar longitudes en mapa.html" }
} else {
    ERR "FALTA: mapa.html"
}

# 5. Seguridad
HDR "5. Seguridad"
if (Test-Path "$BASE\.gitignore") {
    $gi = Get-Content "$BASE\.gitignore" -Raw
    @(".env","*.csv","VEXO_WEB/descargas/","Mapa-vexo/","*.log","CLAUDE.md","publicar_en_vercel.ps1") | ForEach-Object {
        if ($gi -match [regex]::Escape($_)) { OK ".gitignore: $_" }
        else { WARN ".gitignore no excluye: $_" }
    }
}
if (Test-Path "$BASE\.env") {
    $tracked = git ls-files --error-unmatch "$BASE\.env" 2>&1
    if ($LASTEXITCODE -eq 0) { ERR ".env esta en git — eliminar ahora" }
    else { OK ".env existe local pero NO esta en git" }
}

# 6. Imagenes
HDR "6. Imagenes"
$imgDir = "$BASE\public\images\Desarrollos"
if (Test-Path $imgDir) {
    $imgFiles = Get-ChildItem $imgDir -Recurse -File -Include "*.webp","*.jpg","*.png"
    $imgMB = [math]::Round(($imgFiles | Measure-Object Length -Sum).Sum / 1MB, 1)
    OK "Imagenes: $($imgFiles.Count) archivos — ${imgMB}MB"
    if ($imgMB -gt 95) { ERR "Supera 95MB — activa Git LFS o reduce imagenes" }
    elseif ($imgMB -gt 60) { WARN "Imagenes: ${imgMB}MB — considera comprimir .webp" }
} else { WARN "No se encontraron imagenes en public\images\Desarrollos" }

# Resumen
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║   RESUMEN DE REVISION PRE-GIT                       ║" -FG Cyan
Write-Host "  ╠══════════════════════════════════════════════════════╣" -FG Cyan
Write-Host "  ║  OK:       $OK" -FG Green
Write-Host "  ║  WARNINGS: $WARN" -FG Yellow
Write-Host "  ║  ERRORES:  $ERR" -FG $(if($ERR -gt 0){"Red"}else{"Green"})
Write-Host "  ╚══════════════════════════════════════════════════════╝" -FG Cyan
Write-Host ""

if ($ERR -gt 0) {
    Write-Host "  STOP: Hay $ERR error(es) criticos que corregir antes del push." -FG Red
} else {
    Write-Host "  LISTO para publicar. Ejecuta publicar_git.ps1" -FG Green
}
Write-Host ""
Read-Host "  Enter para cerrar"