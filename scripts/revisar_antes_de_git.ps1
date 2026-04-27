# ================================================================
#  VEXO REAL ESTATE — revisar_antes_de_git.ps1 v3
#  Revision profunda antes del push a GitHub
#  Verifica: archivos core, encoding, fotos, seguridad, SEO, URLs
# ================================================================

$BASE = "C:\Users\HP-Home\Documents\Projectos_Rosalia\Web_Bienes_Raices"
$LOG  = "$BASE\scripts\precheck_$(Get-Date -Format 'yyyyMMdd_HHmm').txt"
New-Item -ItemType Directory -Force "$BASE\scripts" | Out-Null

$OK = 0; $WARN = 0; $ERR = 0

function OK   { param($m) Write-Host "  [OK]  $m" -FG Green;  $script:OK++;  Add-Content $LOG "OK   $m" }
function WARN { param($m) Write-Host "  [!!]  $m" -FG Yellow; $script:WARN++;Add-Content $LOG "WARN $m" }
function ERR  { param($m) Write-Host "  [XX]  $m" -FG Red;    $script:ERR++; Add-Content $LOG "ERR  $m" }
function HDR  { param($m) Write-Host "`n  ==== $m ====" -FG Cyan; Add-Content $LOG "=== $m ===" }

"VEXO Pre-Git Check $(Get-Date)" | Out-File $LOG -Encoding UTF8

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║   VEXO RE -- Revision Pre-Git Completa              ║" -FG Cyan
Write-Host "  ╚══════════════════════════════════════════════════════╝" -FG Cyan

# ================================================================
#  1. ARCHIVOS CORE — deben existir en el repo
# ================================================================
HDR "1. Archivos core del proyecto"

$coreFiles = @(
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
    "src\data\data.js",
    "src\styles\design-system.css",
    "src\utils\helpers.js",
    "src\pages\home.js",
    "src\pages\blog.js",
    "src\pages\nosotros.js",
    "src\pages\contacto.js",
    "src\pages\descargas.js",
    "src\pages\ciudades.js",
    "src\pages\politicas.js",
    "src\components\ui\chatbot.js",
    "src\components\ui\calculadora.js",
    "src\components\ui\WhatsappBtn.js"
)

foreach ($f in $coreFiles) {
    if (Test-Path "$BASE\$f") { OK $f }
    else { ERR "FALTA: $f" }
}

# ================================================================
#  2. ARCHIVO UNICO data.js — verificacion profunda
# ================================================================
HDR "2. Verificacion data.js (archivo unico consolidado)"

$dataPath = "$BASE\src\data\data.js"
if (-not (Test-Path $dataPath)) {
    ERR "data.js no existe — ejecutar actualizar_contenido.ps1 primero"
} else {
    $data = [System.IO.File]::ReadAllText($dataPath, [System.Text.Encoding]::UTF8)
    $szKB = [math]::Round($data.Length / 1024, 1)

    # a) Encoding
    $badPatterns = @("MÃÂÃÂ","Mrida","Yucatn","Temozn","ultar","61577530904134ltar","MÃ©rida","CDXM")
    $encOK = $true
    foreach ($pat in $badPatterns) {
        if ($data.Contains($pat)) { ERR "Encoding roto en data.js: '$pat'"; $encOK = $false }
    }
    if ($encOK) { OK "data.js encoding limpio (${szKB}KB)" }

    # b) Acentos existen
    if ($data -match "Mérida") { OK "Acento Mérida: OK" } else { ERR "No se encontro 'Merida' con acento" }
    if ($data -match "Yucatán") { OK "Acento Yucatan: OK" } else { WARN "No se encontro 'Yucatan' con acento" }
    if ($data -match "Temozón") { OK "Acento Temozon: OK" } else { WARN "No se encontro 'Temozon' con acento" }

    # c) Longitudes negativas
    $posLng = [regex]::Matches($data, 'lng:\d{2,3}\.\d+')
    if ($posLng.Count -gt 0) { ERR "Longitudes POSITIVAS: $($posLng.Count) casos (deben ser negativas para Mexico)" }
    else { OK "Coordenadas: todas las longitudes son negativas" }

    # d) foto_principal_url usa rutas VEXO_WEB (no Unsplash)
    $fotosReal = ([regex]::Matches($data, "foto_principal_url:'VEXO_WEB")).Count
    $fotosUnsp = ([regex]::Matches($data, "foto_principal_url:'https://images.unsplash")).Count
    $fotoVacia = ([regex]::Matches($data, "foto_principal_url:''")).Count
    OK "foto_principal_url: $fotosReal reales VEXO_WEB | $fotosUnsp Unsplash | $fotoVacia vacías"
    if ($fotosReal -lt 10) { WARN "Menos de 10 fotos reales VEXO_WEB — revisar el CSV" }

    # e) Verificar que NO usa imagenes[0] — debe usar foto_principal_url en JS
    if ($data -match "imagenes\[0\]") { WARN "data.js aun usa imagenes[0] — prefer usar foto_principal_url" }

    # f) Calendar URLs correctas
    $calOK  = ([regex]::Matches($data, "calendario:'https://calendar.app.google/uQT2fMM6R5Pxv7G39'")).Count
    $calBad = ([regex]::Matches($data, "uQT2fMM6R5Pxv7G39ultar")).Count
    if ($calBad -gt 0) { ERR "URLs calendario corruptas: $calBad casos con 'ultar'" }
    else { OK "URLs calendario: $calOK correctas" }

    # g) Facebook URL correcta
    $fbBad = ([regex]::Matches($data, "61577530904134ltar")).Count
    if ($fbBad -gt 0) { ERR "URLs Facebook corruptas: $fbBad casos con 'ltar'" }
    else { OK "URLs Facebook correctas" }

    # h) Verificar variables globales exportadas
    foreach ($v in @("window.CONFIG","window.DESARROLLOS","window.BLOG_POSTS","window.CIUDADES","window.EMPRESA","window.DESCARGAS","window.getDesarrollos","window.getImgPrincipal")) {
        if ($data -match [regex]::Escape($v)) { OK "Export: $v" }
        else { ERR "Falta export: $v" }
    }

    # i) Contar desarrollos
    $devCount = ([regex]::Matches($data, "id:\d+, slug:")).Count
    OK "DESARROLLOS en data.js: $devCount (esperados: 26)"
    if ($devCount -ne 26) { WARN "Se esperaban 26 desarrollos, hay $devCount" }

    # j) No hay archivos individuales siendo cargados
    $indexHtml = [System.IO.File]::ReadAllText("$BASE\index.html", [System.Text.Encoding]::UTF8)
    $oldScripts = @("propiedades.js","blog.js","empresa.js","config.js","ciudades.js","descargas.js","legal.js","integraciones.js")
    foreach ($old in $oldScripts) {
        if ($indexHtml -match "src/data/$old") { ERR "index.html aun carga: src/data/$old -- eliminar" }
    }
    if ($indexHtml -match 'src="src/data/data\.js"') { OK "index.html carga src/data/data.js (correcto)" }
    else { ERR "index.html NO carga src/data/data.js" }
}

# ================================================================
#  3. IMAGENES FISICAS — .webp en carpetas VEXO_WEB
# ================================================================
HDR "3. Imagenes fisicas en VEXO_WEB/Desarrollos"

$imgTotal = 0; $imgWebp = 0; $imgOtras = 0; $imgSizeMB = 0

if (Test-Path "$BASE\VEXO_WEB\Desarrollos") {
    Get-ChildItem -Path "$BASE\VEXO_WEB\Desarrollos" -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        $imgTotal++
        if ($_.Extension -eq ".webp") { $imgWebp++ }
        elseif ($_.Extension -in @(".jpg",".jpeg",".png")) { $imgOtras++ }
        $imgSizeMB += $_.Length / 1MB
    }
    $imgSizeMB = [math]::Round($imgSizeMB, 1)
    OK "Imagenes: $imgTotal total ($imgWebp .webp | $imgOtras jpg/png) = ${imgSizeMB}MB"

    if ($imgSizeMB -gt 95) { ERR "SUPERA 100MB. Considera Git LFS o comprimir webp." }
    elseif ($imgSizeMB -gt 70) { WARN "Tamanio: ${imgSizeMB}MB. Cerca del limite." }
    else { OK "Tamanio ${imgSizeMB}MB: dentro del limite de 100MB para git" }

    # Verificar carpetas de los 26 desarrollos
    $carpetas = Get-ChildItem -Path "$BASE\VEXO_WEB\Desarrollos" -Directory -ErrorAction SilentlyContinue
    foreach ($c in $carpetas) {
        $webps = (Get-ChildItem $c.FullName -Filter "*.webp" -File).Count
        if ($webps -eq 0) { WARN "Sin .webp en: $($c.Name)" }
        else { OK "$($c.Name): $webps .webp" }
    }
} else {
    WARN "Carpeta VEXO_WEB/Desarrollos no encontrada"
}

# ================================================================
#  4. index.html — verificaciones del HTML
# ================================================================
HDR "4. Verificacion index.html"

$indexPath = "$BASE\index.html"
if (Test-Path $indexPath) {
    $idx = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

    # Secciones/paginas SPA
    $paginas = @("page-home","page-desarrollos","page-detalle","page-ciudades","page-nosotros","page-blog","page-blog-post","page-descargas","page-mapa","page-contacto")
    foreach ($p in $paginas) {
        if ($idx -match $p) { OK "Seccion: $p" }
        else { WARN "Seccion no encontrada: $p" }
    }

    # renderDevCard usa foto_principal_url
    if ($idx -match "foto_principal_url") { OK "renderDevCard usa foto_principal_url" }
    elseif ($idx -match "imagenes\[0\]") { WARN "renderDevCard aun usa imagenes[0] — actualizar a foto_principal_url" }

    # Mapa embebido
    if ($idx -match "mapa.html") { OK "Mapa embebido: iframe a mapa.html" }
    else { WARN "No se encontro referencia a mapa.html en el HTML" }

    # data.js como unico data script
    if ($idx -match 'src="src/data/data\.js"') { OK "data.js es el unico script de datos" }

    # Chatbot
    if ($idx -match "chatbot") { OK "Chatbot referenciado en HTML" }

    # CSS design-system
    if ($idx -match "design-system") { OK "design-system.css enlazado" }
    else { WARN "design-system.css no referenciado en index.html" }

} else { ERR "index.html no encontrado" }

# ================================================================
#  5. SEGURIDAD — no subir secretos
# ================================================================
HDR "5. Seguridad"

# .gitignore correcto
$giPath = "$BASE\.gitignore"
if (Test-Path $giPath) {
    $gi = [System.IO.File]::ReadAllText($giPath, [System.Text.Encoding]::UTF8)
    foreach ($item in @(".env","*.csv","*.xlsx","VEXO_WEB/descargas/","Mapa-vexo/","*.log")) {
        if ($gi -match [regex]::Escape($item)) { OK ".gitignore: $item" }
        else { WARN ".gitignore NO incluye: $item" }
    }
} else { ERR ".gitignore no encontrado" }

# .env no trackeado
if (Test-Path "$BASE\.env") {
    $git = git -C $BASE ls-files --error-unmatch ".env" 2>&1
    if ($LASTEXITCODE -eq 0) { ERR ".env esta siendo trackeado por git -- PELIGRO" }
    else { OK ".env existe localmente pero no en git (correcto)" }
}

# Tokens en archivos publicos
$secretPatterns = @("sk-ant-","AIzaSy","Bearer ey","Kbjx3LFjMCzOH56k","password.*=")
$pubFiles = Get-ChildItem "$BASE\src","$BASE\index.html","$BASE\mapa.html" -Include "*.js","*.html","*.css" -File -Recurse -ErrorAction SilentlyContinue
foreach ($sf in $pubFiles) {
    $ct = [System.IO.File]::ReadAllText($sf.FullName, [System.Text.Encoding]::UTF8)
    foreach ($pat in $secretPatterns) {
        if ($ct -match $pat) { ERR "Token/secreto en $($sf.Name): '$pat'" }
    }
}
OK "Sin tokens en archivos publicos"

# ================================================================
#  6. ARCHIVOS EXCLUIDOS — no deben ir a git
# ================================================================
HDR "6. Archivos que NO deben subirse a git"

$gitIgnoreCheck = @(
    @{f=".env";                          msg="Credenciales privadas"},
    @{f="vexo_desarrollos_master.csv";   msg="Datos crudos -- ir a Drive"},
    @{f="VEXO_WEB\descargas";            msg="PDFs grandes -- ir a Drive"},
    @{f="Mapa-vexo";                     msg="App React separada"},
    @{f="Proyectos";                     msg="Sandbox de pruebas"},
    @{f="CLAUDE.md";                     msg="Documentacion interna"},
    @{f="convertir_vexo.py";             msg="Script Python interno"},
    @{f="html";                          msg="Archivo suelto sin extension"}
)

foreach ($item in $gitIgnoreCheck) {
    $fp = "$BASE\$($item.f)"
    if (Test-Path $fp) {
        # Verificar que git lo ignora
        $tracked = git -C $BASE check-ignore -q "$($item.f)" 2>&1
        if ($LASTEXITCODE -eq 0) { OK "Git ignora: $($item.f) ($($item.msg))" }
        else { WARN "Git NO ignora: $($item.f) -- $($item.msg)" }
    } else { OK "No existe en repo: $($item.f)" }
}

# ================================================================
#  7. ARCHIVOS QUE SI VAN A GIT
# ================================================================
HDR "7. Mapa de archivos para git"

Write-Host ""
Write-Host "  INCLUIR en git:" -FG Green
$gitInclude = @(
    @{ruta="index.html";              desc="SPA principal"},
    @{ruta="mapa.html";               desc="Mapa 3D + calculadora"},
    @{ruta="tour-redes.html";         desc="Carrusel para redes sociales"},
    @{ruta="vercel.json";             desc="Config Vercel"},
    @{ruta="robots.txt";              desc="SEO"},
    @{ruta="sitemap.xml";             desc="SEO"},
    @{ruta=".gitignore";              desc="Exclusiones git"},
    @{ruta="README.md";               desc="Documentacion"},
    @{ruta="actualizar_contenido.ps1";desc="Sync Google Sheets"},
    @{ruta="revisar_antes_de_git.ps1";desc="Auditoria pre-git"},
    @{ruta="publicar_git.ps1";        desc="Deploy a GitHub"},
    @{ruta="src\data\data.js";        desc="ARCHIVO UNICO de datos"},
    @{ruta="src\styles\";             desc="Design system CSS"},
    @{ruta="src\pages\";              desc="Paginas SPA"},
    @{ruta="src\components\";         desc="Componentes UI"},
    @{ruta="src\utils\";              desc="Utilidades JS"},
    @{ruta="public\";                 desc="Favicon e imagenes publicas"},
    @{ruta="VEXO_WEB\Desarrollos\";   desc="Fotos .webp de desarrollos"}
)
foreach ($g in $gitInclude) {
    $ex = if (Test-Path "$BASE\$($g.ruta)") { "[OK]" } else { "[--]" }
    Write-Host "  $ex $($g.ruta.PadRight(32)) $($g.desc)" -FG Green
}

Write-Host ""
Write-Host "  EXCLUIR de git (quedan en Drive/local):" -FG Red
$gitExclude = @(
    ".env",
    "*.csv / *.xlsx",
    "VEXO_WEB/descargas/ (PDFs pesados)",
    "Mapa-vexo/ (app React dev)",
    "Proyectos/ (sandbox)",
    "scripts/*.log (logs de sincronizacion)",
    "*.py (scripts Python internos)",
    "CLAUDE.md (documentacion interna)"
)
foreach ($e in $gitExclude) { Write-Host "  -  $e" -FG Red }

# ================================================================
#  RESUMEN FINAL
# ================================================================
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
} elseif ($WARN -gt 0) {
    Write-Host "  OK con advertencias: puedes publicar pero revisa los [!!]." -FG Yellow
    Write-Host "  Siguiente: .\publicar_git.ps1" -FG White
} else {
    Write-Host "  TODO EN ORDEN. El proyecto esta listo para git push." -FG Green
    Write-Host "  Siguiente: .\publicar_git.ps1" -FG White
}

Write-Host ""
Write-Host "  Log: $LOG" -FG DarkGray
Add-Content $LOG "RESUMEN: OK=$OK WARN=$WARN ERR=$ERR"
Read-Host "  Presiona Enter para cerrar"
