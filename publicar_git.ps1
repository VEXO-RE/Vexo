# ================================================================
#  VEXO REAL ESTATE — publicar_git.ps1
#  Deploy definitivo a GitHub (auto-despliega en Vercel)
#  Generado automaticamente por VEXO_MASTER_SYNC.ps1
#  Fecha: 27/04/2026 16:40
#  Repo: https://github.com/VEXO-RE/Vexo.git
#
#  EJECUTAR: clic derecho -> Ejecutar con PowerShell
# ================================================================

$BASE = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO"
$REPO = "https://github.com/VEXO-RE/Vexo.git"
$LOG  = "$BASE\scripts\git_publish_$(Get-Date -Format 'yyyyMMdd_HHmm').log"
New-Item -ItemType Directory -Force "$BASE\scripts" | Out-Null

$OK = 0; $WARN = 0; $ERR = 0; $START = Get-Date

function OK   { param($m) Write-Host "  [OK]  $m" -FG Green;  $script:OK++;  Add-Content $LOG "OK   $m" }
function WARN { param($m) Write-Host "  [!!]  $m" -FG Yellow; $script:WARN++;Add-Content $LOG "WARN $m" }
function ERR  { param($m) Write-Host "  [XX]  $m" -FG Red;    $script:ERR++; Add-Content $LOG "ERR  $m" }
function HDR  { param($m) Write-Host "`n  ==== $m ====" -FG Cyan }

Write-Host ""
Write-Host "  ╔═══════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║  VEXO RE — Publicacion a GitHub + Vercel     ║" -FG Cyan
Write-Host "  ╚═══════════════════════════════════════════════╝" -FG Cyan
Write-Host ""

Set-Location $BASE

# 1. Verificar git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    ERR "Git no instalado — https://git-scm.com"
    Read-Host "Enter para salir"; exit 1
}
OK "Git: $(git --version)"

if (-not (Test-Path "$BASE\.git")) {
    git init; git remote add origin $REPO; git branch -M main
    OK "Repo inicializado"
} else {
    OK "Repo git existente"
}

# 2. Verificar archivos core
HDR "Verificar archivos core"
$coreOK = $true
@("public/index.html","mapa.html","src\data\data.js","vercel.json") | ForEach-Object {
    if (Test-Path "$BASE\$_") { OK $_ } else { ERR "FALTA: $_"; $coreOK = $false }
}
if (-not $coreOK) {
    ERR "Archivos core faltantes — corre VEXO_MASTER_SYNC.ps1 primero"
    Read-Host "Enter para salir"; exit 1
}

# 3. Verificar encoding data.js
HDR "Verificar encoding"
$dataJs = Get-Content "$BASE\src\data\data.js" -Raw -Encoding UTF8
$badPats = @("MÃÂÃÂ","Mrida","Yucatn","Temozn","MÃ©rida")
$encOK = $true
foreach ($p in $badPats) {
    if ($dataJs -and $dataJs.Contains($p)) { ERR "Encoding roto en data.js: '$p'"; $encOK = $false }
}
if ($encOK) { OK "data.js encoding UTF-8 limpio" }

# Verificar longitudes negativas
if ([regex]::IsMatch($dataJs,'lng:\s*\d{2,3}\.\d+')) {
    ERR "Longitudes POSITIVAS encontradas en data.js — deben ser negativas"
} else { OK "Coordenadas: longitudes negativas correctas" }

# 4. Resumen y confirmacion
HDR "Resumen"
$elapsed = [math]::Round(((Get-Date) - $START).TotalSeconds, 0)
Write-Host ""
Write-Host "  OK: $OK | Warnings: $WARN | Errores: $ERR | ${elapsed}s" -FG $(if($ERR -gt 0){"Red"}elseif($WARN -gt 0){"Yellow"}else{"Green"})
Write-Host ""

if ($ERR -gt 0) {
    Write-Host "  STOP — $ERR error(es) criticos. Corrige antes de continuar." -FG Red
    Read-Host "Enter para salir"; exit 1
}

$confirm = Read-Host "  Proceder con push a GitHub? [S/N]"
if ($confirm.ToUpper() -ne "S") { Write-Host "  Cancelado." -FG Yellow; exit 0 }

# 5. Git add exacto
HDR "Git add exacto"
git reset HEAD -- . 2>&1 | Out-Null

$items = @(
    "public/index.html",
    "mapa.html",
    "vercel.json",
    "robots.txt",
    "sitemap.xml",
    ".gitignore",
    "README.md",
    "cirugia_master.ps1",
    "src/",
    "public/",
    "tour-redes.html"
)
foreach ($item in $items) {
    $fp = "$BASE\$($item -replace '/','\')".TrimEnd('\')
    if (Test-Path $fp) { git add $item 2>&1 | Out-Null; OK "Agregado: $item" }
    else { WARN "No existe, saltando: $item" }
}

# Mostrar staging
Write-Host ""
$staged = git diff --cached --name-only
Write-Host "  En staging: $($staged.Count) archivos" -FG Cyan

# 6. Commit y push
HDR "Commit y push"
$devCount = ([regex]::Matches($dataJs, '^\s+id:\s+\d+,', 'Multiline')).Count
$commitMsg = "VEXO RE — $(Get-Date -Format 'dd/MMM/yyyy HH:mm') | $devCount desarrollos"

Write-Host "  Commit: $commitMsg" -FG White
git commit -m "$commitMsg" 2>&1 | ForEach-Object { Write-Host "  $_" -FG DarkGray }

if ($LASTEXITCODE -eq 0) {
    Write-Host "  Enviando a GitHub..." -FG Cyan
    git push origin main 2>&1 | ForEach-Object { Write-Host "  $_" -FG DarkGray }

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "  PUBLICADO CORRECTAMENTE" -FG Green
        Write-Host "  Vercel despliega en ~60 segundos" -FG Green
        Write-Host "  Preview:    https://vexo-re.vercel.app" -FG Cyan
        Write-Host "  Produccion: https://vexorealestate.com"  -FG Cyan
        Add-Content $LOG "RESULTADO: OK"
    } else {
        ERR "Error en push — verifica acceso al repo"
        Write-Host "  git remote -v  para confirmar remote" -FG Yellow
        Add-Content $LOG "RESULTADO: ERROR PUSH"
    }
} else {
    WARN "Sin cambios nuevos que commitear"
    Add-Content $LOG "RESULTADO: SIN CAMBIOS"
}

Write-Host ""
Write-Host "  Log: $LOG" -FG DarkGray
Read-Host "  Enter para cerrar"