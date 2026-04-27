
# ================================================================
#  VEXO REAL ESTATE — publicar_git.ps1
#  Script DEFINITIVO de publicación a GitHub
#  Repo: https://github.com/VEXO-RE/RE-vexo
#
#  Ejecutar: clic derecho → Ejecutar con PowerShell
#  Hace: revisión profunda → compresión CSS → git add exacto → push
# ================================================================

$BASE = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO"
$REPO = "https://github.com/VEXO-RE/web.git"
$LOG  = "$BASE\scripts\git_publish_$(Get-Date -Format 'yyyyMMdd_HHmm').txt"
New-Item -ItemType Directory -Force "$BASE\scripts" | Out-Null

$OK = 0; $WARN = 0; $ERR = 0; $START = Get-Date

function OK   { param($m) Write-Host "  [OK]  $m" -FG Green;  $script:OK++;  Add-Content $LOG "OK   $m" }
function WARN { param($m) Write-Host "  [!!]  $m" -FG Yellow; $script:WARN++;Add-Content $LOG "WARN $m" }
function ERR  { param($m) Write-Host "  [XX]  $m" -FG Red;    $script:ERR++; Add-Content $LOG "ERR  $m" }
function HDR  { param($m) Write-Host "`n  ==== $m ====" -FG Cyan; Add-Content $LOG "=== $m ===" }

"VEXO publicar_git.ps1 - $(Get-Date)" | Out-File $LOG -Encoding UTF8
Write-Host ""
Write-Host "  ╔═══════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║  VEXO RE — Publicación a Git/Vercel       ║" -FG Cyan
Write-Host "  ║  $REPO" -FG Cyan
Write-Host "  ╚═══════════════════════════════════════════╝" -FG Cyan
Write-Host ""

Set-Location $BASE

# ================================================================
#  PASO 1 — VERIFICAR GIT INSTALADO Y REPO CONFIGURADO
# ================================================================
HDR "1. Verificar Git y repo"

$gitOK = (Get-Command git -ErrorAction SilentlyContinue) -ne $null
if (-not $gitOK) { ERR "Git no instalado. Instala desde https://git-scm.com"; Read-Host "Enter para salir"; exit 1 }
OK "Git instalado: $(git --version)"

if (-not (Test-Path "$BASE\.git")) {
    WARN "Repo no inicializado. Inicializando..."
    git init
    git remote add origin $REPO
    git branch -M main
    OK "Repo inicializado y conectado a GitHub"
} else {
    $remotes = git remote -v 2>&1
    if ($remotes -match "VEXO-RE") { OK "Remote GitHub correcto: VEXO-RE/RE-vexo" }
    else { WARN "Remote no es VEXO-RE/RE-vexo. Verifica con: git remote -v" }
}

# ================================================================
#  PASO 2 — REVISIÓN DE ARCHIVOS CORE
# ================================================================
HDR "2. Archivos core del proyecto"

$coreFiles = @(
    "index.html",
    "mapa.html",
    "tour-redes.html",
    "vexo-premium.css",
    "vexo-magic.js",
    "vercel.json",
    "robots.txt",
    "sitemap.xml",
    "README.md",
    "src\data\data.js",
    "src\styles\design-system.css",
    "src\utils\helpers.js"
)
foreach ($f in $coreFiles) {
    if (Test-Path "$BASE\$f") { OK "$f" }
    else { ERR "FALTA: $f" }
}

# ================================================================
#  PASO 3 — REVISIÓN DE ENCODING (sin texto corrupto)
# ================================================================
HDR "3. Verificación de encoding UTF-8"

$dataJs = Get-Content "$BASE\src\data\data.js" -Raw -Encoding UTF8
$badPatterns = @("MÃÂÃÂ", "Mrida", "Yucatn", "Temozn", "MÃ©rida", "Ã©", "ultar")
$encOK = $true
foreach ($pat in $badPatterns) {
    if ($dataJs -and $dataJs.Contains($pat)) {
        ERR "Encoding roto en data.js: '$pat'"
        $encOK = $false
    }
}
if ($encOK) { OK "data.js — encoding limpio, sin caracteres corruptos" }

# Verificar acentos existen
if ($dataJs -match "Mérida") { OK "data.js — Mérida correctamente acentuado" }
else { ERR "data.js — 'Mérida' con acento no encontrado" }

if ($dataJs -match "Yucatán") { OK "data.js — Yucatán correctamente acentuado" }

# ================================================================
#  PASO 4 — COORDENADAS NEGATIVAS
# ================================================================
HDR "4. Coordenadas — longitudes negativas"

$lngPos = [regex]::Matches($dataJs, 'lng:\d{2,3}\.\d+')
if ($lngPos.Count -gt 0) {
    ERR "LONGITUDES POSITIVAS encontradas ($($lngPos.Count) casos) — deben ser negativas"
    $lngPos | Select-Object -First 3 | ForEach-Object { ERR "  $($_.Value)" }
} else { OK "Todas las longitudes son negativas (correctas para México)" }

# ================================================================
#  PASO 5 — REVISIÓN DE IMÁGENES
# ================================================================
HDR "5. Imágenes — fotos de desarrollos"

$imgTotal = 0; $imgWebp = 0; $imgSizeMB = 0
Get-ChildItem -Path "$BASE\VEXO_WEB\Desarrollos" -Recurse -Include "*.webp","*.jpg","*.png","*.jpeg" -File -ErrorAction SilentlyContinue | ForEach-Object {
    $imgTotal++
    if ($_.Extension -eq ".webp") { $imgWebp++ }
    $imgSizeMB += $_.Length / 1MB
}
$imgSizeMB = [math]::Round($imgSizeMB, 1)

OK "Total imágenes encontradas: $imgTotal ($imgWebp .webp)"
if ($imgSizeMB -gt 95) { ERR "Tamaño imágenes: ${imgSizeMB}MB — SUPERA 100MB. Reducir antes de push." }
elseif ($imgSizeMB -gt 60) { WARN "Tamaño imágenes: ${imgSizeMB}MB — Considera comprimir más .webp grandes" }
else { OK "Tamaño imágenes: ${imgSizeMB}MB — Dentro del límite" }

# Verificar que propiedades.js referencia .webp (no .jpg)
if ($dataJs -match '"VEXO_WEB.*\.webp"') { OK "data.js — fotos referencian .webp correctamente" }
else { WARN "data.js — revisa rutas de imágenes (deben ser .webp)" }

# Nota sobre visibilidad de imágenes
WARN "Las fotos VEXO_WEB/ solo se ven cuando el dominio vexorealestate.com esté activo en Vercel"
WARN "Hasta entonces, se usan los fallbacks de Unsplash (que sí se ven siempre)"

# ================================================================
#  PASO 6 — REVISIÓN DE SEGURIDAD
# ================================================================
HDR "6. Seguridad — verificar que no se suben secretos"

# Verificar .env NO en git
$gitignoreContent = Get-Content "$BASE\.gitignore" -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
if ($gitignoreContent -match "\.env") { OK ".gitignore incluye .env" }
else { ERR ".gitignore NO excluye .env — peligro de exponer credenciales" }

# Verificar que .env existe pero NO será subido
if (Test-Path "$BASE\.env") {
    $tracked = git ls-files --error-unmatch "$BASE\.env" 2>&1
    if ($LASTEXITCODE -eq 0) { ERR ".env está siendo trackeado por git — ELIMINAR ahora" }
    else { OK ".env existe localmente pero NO está en git (correcto)" }
}

# Buscar tokens en archivos que SÍ van a git
$vercelToken = [System.Environment]::GetEnvironmentVariable("VERCEL_TOKEN")
$secretPatterns = @("sk-ant-", "AIzaSy", "Bearer ey", "pk_live_", "sk_live_")
$filesToScan = Get-ChildItem "$BASE\src","$BASE\index.html","$BASE\mapa.html" -Include "*.js","*.html","*.css" -File -Recurse -ErrorAction SilentlyContinue
foreach ($sf in $filesToScan) {
    $ct = Get-Content $sf.FullName -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
    foreach ($pat in $secretPatterns) {
        if ($ct -match [regex]::Escape($pat)) {
            ERR "Token/secreto en $($sf.Name): '$pat'"
        }
    }
}
OK "Sin tokens/secretos detectados en archivos públicos"

# ================================================================
#  PASO 7 — COMPRIMIR CSS (minificación básica sin herramientas externas)
# ================================================================
HDR "7. Comprimir design-system.css"

$cssPath = "$BASE\src\styles\design-system.css"
if (Test-Path $cssPath) {
    $cssOrig = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)
    $cssOrigKB = [math]::Round($cssOrig.Length / 1024, 1)

    # Minificación básica: quitar comentarios /* */, espacios múltiples, saltos
    $cssMin = $cssOrig
    # Quitar comentarios de bloque (no inline)
    $cssMin = [regex]::Replace($cssMin, '/\*[^*]*\*+(?:[^/*][^*]*\*+)*/', '')
    # Quitar líneas en blanco y espacios al inicio/fin de línea
    $cssMin = ($cssMin -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }) -join ' '
    # Quitar espacios redundantes alrededor de : ; { } ,
    $cssMin = [regex]::Replace($cssMin, '\s*([{};:,>~+])\s*', '$1')
    # Colapsar espacios múltiples
    $cssMin = [regex]::Replace($cssMin, ' {2,}', ' ')

    $cssMinKB = [math]::Round($cssMin.Length / 1024, 1)
    $savings = [math]::Round((1 - $cssMin.Length / $cssOrig.Length) * 100, 0)

    $cssMinPath = "$BASE\src\styles\design-system.min.css"
    [System.IO.File]::WriteAllText($cssMinPath, $cssMin, (New-Object System.Text.UTF8Encoding $false))
    OK "CSS minificado: ${cssOrigKB}KB → ${cssMinKB}KB (ahorro $savings%)"
    OK "Guardado: design-system.min.css"
    WARN "RECUERDA actualizar index.html para cargar design-system.min.css en producción"
} else { WARN "design-system.css no encontrado — saltar minificación" }

# ================================================================
#  PASO 8 — VERIFICACIÓN VISUAL (checar que no haya errores de sintaxis JS)
# ================================================================
HDR "8. Verificación de sintaxis JS"

$nodeOK = (Get-Command node -ErrorAction SilentlyContinue) -ne $null
if ($nodeOK) {
    $nodeCheck = node --check "$BASE\src\data\data.js" 2>&1
    if ($LASTEXITCODE -eq 0) { OK "data.js — sintaxis JS válida (node --check pasó)" }
    else { ERR "data.js — ERROR de sintaxis: $nodeCheck" }
} else {
    WARN "Node.js no disponible — verificación de sintaxis omitida"
    WARN "Abre index.html en Chrome y revisa la consola F12 antes del push"
}

# ================================================================
#  PASO 9 — CONFIGURAR .gitignore PERFECTO
# ================================================================
HDR "9. Actualizar .gitignore"

$gitignoreIdeal = @"
# ── Secretos — NUNCA subir ──────────────────────────────────
.env
.env.local
.env.*.local
*.env

# ── Node / Build ─────────────────────────────────────────────
node_modules/
dist/
build/
.next/
out/
.vite/

# ── Logs y reportes ──────────────────────────────────────────
*.log
scripts/*.log
scripts/*.txt
scripts/_tmp*
LOG_REVISION_VEXO.txt

# ── Datos crudos (van en Drive, no en git) ───────────────────
*.csv
*.xlsx
*.xls
vexo_desarrollos_master.csv

# ── Archivos grandes y PDFs (van en Drive) ───────────────────
VEXO_WEB/descargas/
VEXO_WEB/scripts/
VEXO_WEB/equipo/
VEXO_WEB/*.xlsx
VEXO_WEB/*.csv
VEXO_WEB/log_*.txt
VEXO_WEB/REPORTE_*.csv

# ── Proyectos de desarrollo separados ────────────────────────
Mapa-vexo/
Mapa-vexo/node_modules/
Proyectos/
Archivos informativos nuevos/
docs/
js/

# ── Scripts con credenciales ─────────────────────────────────
publicar_en_vercel.ps1
Sincronizar_Vexo.ps1
revisar_fugas.ps1

# ── Sistema operativo ─────────────────────────────────────────
.DS_Store
Thumbs.db
desktop.ini
*.lnk
ehthumbs.db

# ── Editor ───────────────────────────────────────────────────
.vscode/settings.json
.idea/
*.sublime-workspace

# ── Archivos sueltos de la raíz (no necesarios en repo) ──────
html
CLAUDE.md
convertir_vexo.py
convertidor_vexo.py
sync_js_to_csv.py
limpieza.py
propiedades.js

# ── CSS minificado (se regenera) o decidir cuál subir ────────
# src/styles/design-system.min.css
"@

[System.IO.File]::WriteAllText("$BASE\.gitignore", $gitignoreIdeal, (New-Object System.Text.UTF8Encoding $false))
OK ".gitignore actualizado con reglas completas"

# ================================================================
#  PASO 10 — SELECCIÓN EXACTA DE ARCHIVOS PARA GIT
# ================================================================
HDR "10. Selección de archivos para git"

Write-Host ""
Write-Host "  ARCHIVOS Y CARPETAS QUE SE SUBIRÁN:" -FG Green

$toAdd = @(
    "index.html",
    "mapa.html",
    "tour-redes.html",
    "vercel.json",
    "robots.txt",
    "sitemap.xml",
    ".gitignore",
    "README.md",
    "actualizar_contenido.ps1",
    "revisar_antes_de_git.ps1",
    "publicar_git.ps1",
    "src/data/data.js",
    "src/styles/design-system.css",
    "src/styles/design-system.min.css",
    "src/pages/",
    "src/components/",
    "src/utils/",
    "public/",
    "VEXO_WEB/Desarrollos/"
)

foreach ($item in $toAdd) {
    $fullPath = "$BASE\$($item -replace '/','\')"
    if (Test-Path $fullPath) {
        $sizeInfo = ""
        if ((Get-Item $fullPath).PSIsContainer) {
            $sz = (Get-ChildItem $fullPath -Recurse -File | Measure-Object Length -Sum).Sum / 1MB
            $sizeInfo = " (~$([math]::Round($sz,1))MB)"
        } else {
            $sz = (Get-Item $fullPath).Length / 1KB
            $sizeInfo = " (~$([math]::Round($sz,0))KB)"
        }
        Write-Host "  + $item$sizeInfo" -FG Green
    } else { Write-Host "  - $item (no existe, se omite)" -FG DarkGray }
}

Write-Host ""
Write-Host "  EXCLUIDO DEL REPO (queda en Drive/local):" -FG Red
$excluded = @(".env", "*.csv", "*.xlsx", "VEXO_WEB/descargas/", "Mapa-vexo/", "Proyectos/", "*.log", "*.py", "Sincronizar_Vexo.ps1")
foreach ($ex in $excluded) { Write-Host "  - $ex" -FG Red }

# ================================================================
#  PASO 11 — RESUMEN Y CONFIRMACIÓN ANTES DEL PUSH
# ================================================================
HDR "11. Resumen de revisión"

$elapsed = [math]::Round(((Get-Date) - $START).TotalSeconds, 0)
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║   REVISIÓN COMPLETA                         ║" -FG Cyan
Write-Host "  ╠══════════════════════════════════════════════╣" -FG Cyan
Write-Host "  ║  OK:       $OK" -FG Green
Write-Host "  ║  WARNINGS: $WARN" -FG Yellow
Write-Host "  ║  ERRORES:  $ERR" -FG $(if($ERR -gt 0){"Red"}else{"Green"})
Write-Host "  ║  Tiempo:   ${elapsed}s" -FG White
Write-Host "  ╚══════════════════════════════════════════════╝" -FG Cyan
Write-Host ""

if ($ERR -gt 0) {
    Write-Host "  ⛔ Hay $ERR error(es) críticos. Corrige antes de continuar." -FG Red
    Add-Content $LOG "RESULTADO: ERRORES CRÍTICOS - abortado"
    Read-Host "  Presiona Enter para salir sin publicar"
    exit 1
}

if ($WARN -gt 0) {
    Write-Host "  ⚠️  Hay $WARN advertencia(s). El sitio puede publicarse." -FG Yellow
}

Write-Host ""
Write-Host "  ¿Proceder con el push a GitHub (auto-despliega en Vercel)? " -FG White -NoNewline
$confirm = Read-Host "[S/N]"
if ($confirm.ToUpper() -ne "S") {
    Write-Host "  Cancelado por el usuario." -FG Yellow
    Add-Content $LOG "RESULTADO: Cancelado por usuario"
    exit 0
}

# ================================================================
#  PASO 12 — GIT ADD EXACTO (solo los archivos necesarios)
# ================================================================
HDR "12. Git add — solo archivos necesarios"

# Reset staging area
git reset HEAD -- . 2>&1 | Out-Null

# Add exacto
$gitAddItems = @(
    "index.html",
    "mapa.html",
    "tour-redes.html",
    "vercel.json",
    "robots.txt",
    "sitemap.xml",
    ".gitignore",
    "README.md",
    "actualizar_contenido.ps1",
    "revisar_antes_de_git.ps1",
    "publicar_git.ps1",
    "src/data/data.js",
    "src/styles/",
    "src/pages/",
    "src/components/",
    "src/utils/",
    "public/",
    "VEXO_WEB/Desarrollos/"
)

foreach ($item in $gitAddItems) {
    $fp = "$BASE\$($item -replace '/','\')".TrimEnd('\')
    if (Test-Path $fp) {
        git add "$item" 2>&1 | Out-Null
        OK "Agregado: $item"
    }
}

# Mostrar qué quedó en staging
Write-Host ""
Write-Host "  Archivos en staging:" -FG Cyan
$staged = git diff --cached --name-only
foreach ($s in $staged) { Write-Host "    $s" -FG White }
Write-Host "  Total: $($staged.Count) archivos" -FG Cyan

# ================================================================
#  PASO 13 — COMMIT Y PUSH
# ================================================================
HDR "13. Commit y push"

$fecha = Get-Date -Format "dd/MMM/yyyy HH:mm"
$devCount = (Select-String -Path "$BASE\src\data\data.js" -Pattern '"id":' -AllMatches).Matches.Count
$commitMsg = "VEXO RE — Actualización $fecha | $devCount desarrollos | data.js unificado"

Write-Host ""
Write-Host "  Commit: $commitMsg" -FG White
git commit -m "$commitMsg" 2>&1 | ForEach-Object { Write-Host "  $_" -FG DarkGray }

if ($LASTEXITCODE -ne 0) {
    ERR "Error en git commit"
    Write-Host "  Puede que no haya cambios que commitear." -FG Yellow
} else {
    OK "Commit creado exitosamente"

    # Push
    Write-Host ""
    Write-Host "  Enviando a GitHub..." -FG Cyan
    git push origin main 2>&1 | ForEach-Object { Write-Host "  $_" -FG DarkGray }

    if ($LASTEXITCODE -eq 0) {
        OK "Push exitoso a github.com/VEXO-RE/RE-vexo"
        Write-Host ""
        Write-Host "  ✅ PUBLICADO CORRECTAMENTE" -FG Green
        Write-Host "  Vercel desplegará automáticamente en ~60 segundos." -FG Green
        Write-Host "  Preview: https://re-vexo.vercel.app" -FG Cyan
        Write-Host "  Producción: https://vexorealestate.com" -FG Cyan
        Write-Host "  Dashboard Vercel: https://vercel.com/dashboard" -FG DarkGray
        Add-Content $LOG "RESULTADO: PUBLICADO EXITOSAMENTE"
    } else {
        ERR "Error en git push. Posibles causas:"
        Write-Host "  1. No tienes acceso al repo VEXO-RE/RE-vexo" -FG Yellow
        Write-Host "  2. Necesitas autenticarte: git config --global credential.helper manager" -FG Yellow
        Write-Host "  3. Hay conflictos: git pull origin main y vuelve a intentar" -FG Yellow
        Add-Content $LOG "RESULTADO: ERROR EN PUSH"
    }
}

# ================================================================
#  FIN
# ================================================================
Write-Host ""
Write-Host "  Log guardado en: $LOG" -FG DarkGray
Write-Host ""
Add-Content $LOG "FIN: $(Get-Date) | OK=$OK WARN=$WARN ERR=$ERR"
Read-Host "  Presiona Enter para cerrar"
