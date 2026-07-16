# ================================================================
#  VEXO REAL ESTATE — revisar_antes_de_git.ps1 v4
#  Revision profunda antes del push a GitHub
#  Reescrito por completo: la v3 validaba una estructura src/pages/
#  que ya no existe (todo vive en public/ desde hace tiempo).
#  Esta version valida la estructura REAL y agrega checks nuevos
#  para bugs que ya ocurrieron una vez y no deben repetirse.
# ================================================================

$BASE = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO"
$LOG  = "$BASE\scripts\precheck_$(Get-Date -Format 'yyyyMMdd_HHmm').txt"
New-Item -ItemType Directory -Force "$BASE\scripts" | Out-Null

$OK = 0; $WARN = 0; $ERR = 0

function OK   { param($m) Write-Host "  [OK]  $m" -FG Green;  $script:OK++;  Add-Content $LOG "OK   $m" }
function WARN { param($m) Write-Host "  [!!]  $m" -FG Yellow; $script:WARN++;Add-Content $LOG "WARN $m" }
function ERR  { param($m) Write-Host "  [XX]  $m" -FG Red;    $script:ERR++; Add-Content $LOG "ERR  $m" }
function HDR  { param($m) Write-Host "`n  ==== $m ====" -FG Cyan; Add-Content $LOG "=== $m ===" }

"VEXO Pre-Git Check v4 $(Get-Date)" | Out-File $LOG -Encoding UTF8

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║   VEXO RE -- Revision Pre-Git Completa (v4)          ║" -FG Cyan
Write-Host "  ╚══════════════════════════════════════════════════════╝" -FG Cyan

# ================================================================
#  1. ARCHIVOS CORE — estructura REAL (public/, no src/pages)
# ================================================================
HDR "1. Archivos core del proyecto"

$coreFiles = @(
    "public\index.html",
    "public\mapa.html",
    "public\data.js",
    "public\design-system.css",
    "public\theme.js",
    "public\vexo-magic.js",
    "public\sanity-check.js",
    "public\chatbot.js",
    "api\chat.js",
    "vercel.json",
    "robots.txt",
    "sitemap.xml",
    ".gitignore",
    "README.md",
    "CLAUDE.md",
    "scripts\actualizar_contenido.ps1",
    "scripts\revisar_antes_de_git.ps1",
    "scripts\publicar_git.ps1"
)

foreach ($f in $coreFiles) {
    if (Test-Path "$BASE\$f") { OK $f }
    else { ERR "FALTA: $f" }
}

# ================================================================
#  2. public/data.js — integridad de datos
# ================================================================
HDR "2. Verificacion public/data.js"

$dataPath = "$BASE\public\data.js"
if (-not (Test-Path $dataPath)) {
    ERR "public/data.js no existe"
} else {
    $data = [System.IO.File]::ReadAllText($dataPath, [System.Text.Encoding]::UTF8)
    $szKB = [math]::Round($data.Length / 1024, 1)
    OK "public/data.js leido ($szKB KB)"

    # a) Encoding roto
    $badPatterns = @("MÃÂÃÂ","Mrida","Yucatn","Temozn","MÃ©rida","CDXM")
    $encOK = $true
    foreach ($pat in $badPatterns) {
        if ($data.Contains($pat)) { ERR "Encoding roto en data.js: '$pat'"; $encOK = $false }
    }
    if ($encOK) { OK "Encoding limpio (sin patrones de mojibake conocidos)" }

    # b) Ciudades permitidas (CON acento — asi estan realmente en el archivo)
    $ciudadesValidas = @("Mérida","Ciudad de México","Playa del Carmen")
    $ciudadesEncontradas = [regex]::Matches($data, '"ciudad":\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
    foreach ($c in $ciudadesEncontradas) {
        if ($ciudadesValidas -contains $c) { OK "Ciudad valida: $c" }
        else { ERR "Ciudad NO permitida encontrada en data.js: '$c' (validas: $($ciudadesValidas -join ', '))" }
    }

    # c) Tipos permitidos
    $tiposValidos = @("Departamentos","Departamentos y Locales","Lotes")
    $tiposEncontrados = [regex]::Matches($data, '"tipo":\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
    foreach ($t in $tiposEncontrados) {
        if ($tiposValidos -contains $t) { OK "Tipo valido: $t" }
        else { WARN "Tipo inusual en data.js: '$t' (revisar si es intencional)" }
    }

    # d) lat/lng nulos — CRITICO, esto es lo que oculto los 11 Lotes del mapa
    $nombresConLatNull = [regex]::Matches($data, '"nombre":\s*"([^"]+)"[^}]*?"lat":\s*null')
    if ($nombresConLatNull.Count -gt 0) {
        WARN "$($nombresConLatNull.Count) desarrollo(s) SIN lat/lng (no apareceran en el mapa):"
        foreach ($m in $nombresConLatNull) { WARN "  -> $($m.Groups[1].Value)" }
    } else {
        OK "Todos los desarrollos tienen lat/lng asignados"
    }

    # e) Longitudes positivas (deben ser negativas para Mexico)
    $posLng = [regex]::Matches($data, '"lng":\s*\d')
    if ($posLng.Count -gt 0) { ERR "Longitudes POSITIVAS encontradas: $($posLng.Count) casos (deben ser negativas)" }
    else { OK "Coordenadas: todas las longitudes son negativas o nulas" }

    # f) zona vacia
    $zonaVacia = [regex]::Matches($data, '"zona":\s*""')
    if ($zonaVacia.Count -gt 0) { ERR "$($zonaVacia.Count) desarrollo(s) con zona vacia -- rompe filtros del catalogo" }
    else { OK "Ningun desarrollo con zona vacia" }

    # g) Contar desarrollos totales
    $devCount = ([regex]::Matches($data, '"id":\s*\d+,')).Count
    OK "Desarrollos en data.js: $devCount"

    # h) tour360_url y brochure — informativo, no bloquea
    $con360 = ([regex]::Matches($data, '"tour360_url":\s*"https?://')).Count
    $conBrochure = ([regex]::Matches($data, '"brochure":\s*"https?://')).Count
    OK "Con tour 360 real: $con360 / $devCount | Con brochure real: $conBrochure / $devCount"
}

# ================================================================
#  3. index.html — HTML valido y orden de scripts
# ================================================================
HDR "3. Verificacion public/index.html"

$indexPath = "$BASE\public\index.html"
if (Test-Path $indexPath) {
    $idx = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

    # a) Balance de <div> — un cierre faltante anida paginas completas y las oculta.
    #    Ya paso una vez con page-mapa: Nosotros, Blog, Descargas, Contacto y Legales
    #    quedaron atrapados e invisibles por UN solo </div> faltante.
    $divsAbiertos = ([regex]::Matches($idx, '<div\b[^>]*(?<!/)>')).Count
    $divsCerrados = ([regex]::Matches($idx, '</div>')).Count
    if ($divsAbiertos -eq $divsCerrados) {
        OK "Balance de <div>: $divsAbiertos abiertos = $divsCerrados cerrados"
    } else {
        ERR "DESBALANCE de <div> en index.html: $divsAbiertos abiertos vs $divsCerrados cerrados -- revisar antes de subir, esto oculta paginas completas"
    }

    # b) Paginas SPA presentes
    $paginas = @("page-home","page-desarrollos","page-detalle","page-ciudades","page-mapa","page-nosotros","page-blog","page-blog-post","page-descargas","page-contacto","page-privacidad","page-terminos","page-aviso-legal")
    foreach ($p in $paginas) {
        if ($idx -match "id=`"$p`"") { OK "Seccion: $p" }
        else { WARN "Seccion no encontrada: $p" }
    }

    # c) Cada pagina tiene su propio footer-XXX (mecanismo correcto)
    $footers = @("footer-home","footer-devs","footer-detalle","footer-ciudades","footer-mapa","footer-nosotros","footer-blog","footer-blog-post","footer-descargas","footer-contacto")
    foreach ($fo in $footers) {
        if ($idx -match "id=`"$fo`"") { OK "Footer por pagina: $fo" }
        else { ERR "FALTA footer por pagina: $fo -- esa pagina se quedara sin footer" }
    }

    # d) REGRESION: no debe existir un contenedor de footer global fuera de .page
    #    (ya paso una vez, rompio el layout de todo el sitio menos Home)
    if ($idx -match "site-footer-container") {
        ERR "REGRESION DETECTADA: 'site-footer-container' encontrado -- este contenedor global rompe el layout, no debe existir. Usar solo los footer-XXX por pagina."
    } else {
        OK "Sin contenedor de footer global fuera de .page (correcto)"
    }

    # e) design-system.css enlazado ANTES del <style> inline (para que el inline gane la cascada)
    $posLink = $idx.IndexOf('href="design-system.css"')
    $posStyle = $idx.IndexOf("<style>")
    if ($posLink -gt -1 -and $posStyle -gt -1 -and $posLink -lt $posStyle) {
        OK "design-system.css enlazado antes del <style> inline (orden correcto)"
    } elseif ($posLink -eq -1) {
        WARN "design-system.css no esta enlazado en index.html"
    } else {
        WARN "design-system.css aparece DESPUES del <style> inline -- puede sobreescribir la paleta oscura del sitio"
    }

    # f) Orden de scripts: data.js -> sanity-check.js/theme.js/vexo-magic.js -> (script inline) -> chatbot.js
    $posData   = $idx.IndexOf('src="data.js"')
    $posSanity = $idx.IndexOf('src="sanity-check.js"')
    $posChatbot= $idx.IndexOf('src="chatbot.js"')
    $posInlineScriptEnd = $idx.LastIndexOf("</script>")
    if ($posData -gt -1 -and $posSanity -gt $posData) { OK "Orden de carga: data.js antes de sanity-check.js" }
    else { WARN "Verificar orden: sanity-check.js debe cargar despues de data.js" }
    if ($posChatbot -gt -1 -and $posChatbot -gt $posInlineScriptEnd - 20) {
        OK "chatbot.js se carga despues del script inline principal (correcto, necesario para pisar window.sendChat)"
    } elseif ($posChatbot -eq -1) {
        WARN "chatbot.js no esta enlazado en index.html"
    } else {
        ERR "chatbot.js parece cargar ANTES del script inline principal -- el script inline pisara window.sendChat y el chat con IA no funcionara"
    }

    # g) Mapa embebido
    if ($idx -match "mapa\.html") { OK "Mapa embebido: referencia a mapa.html encontrada" }
    else { WARN "No se encontro referencia a mapa.html" }

    # h) Accesibilidad basica: <label> sin for= y sin envolver un input directamente
    $labels = [regex]::Matches($idx, '<label\b[^>]*>')
    $labelsSinFor = 0
    foreach ($l in $labels) { if ($l.Value -notmatch 'for=') { $labelsSinFor++ } }
    if ($labelsSinFor -gt 0) {
        WARN "$labelsSinFor <label> sin atributo for= encontrados en index.html -- verificar que envuelvan su <input> o agregar for=/id="
    } else {
        OK "Todos los <label> en index.html tienen for="
    }

} else { ERR "index.html no encontrado" }

# ================================================================
#  4. mapa.html — HTML valido
# ================================================================
HDR "4. Verificacion public/mapa.html"

$mapaPath = "$BASE\public\mapa.html"
if (Test-Path $mapaPath) {
    $mapa = [System.IO.File]::ReadAllText($mapaPath, [System.Text.Encoding]::UTF8)

    $divsAbiertosM = ([regex]::Matches($mapa, '<div\b[^>]*(?<!/)>')).Count
    $divsCerradosM = ([regex]::Matches($mapa, '</div>')).Count
    if ($divsAbiertosM -eq $divsCerradosM) {
        OK "Balance de <div> en mapa.html: $divsAbiertosM = $divsCerradosM"
    } else {
        ERR "DESBALANCE de <div> en mapa.html: $divsAbiertosM abiertos vs $divsCerradosM cerrados"
    }

    $labelsM = [regex]::Matches($mapa, '<label\b[^>]*>')
    $labelsSinForM = 0
    foreach ($l in $labelsM) { if ($l.Value -notmatch 'for=') { $labelsSinForM++ } }
    if ($labelsSinForM -gt 0) { WARN "$labelsSinForM <label> sin for= en mapa.html" }
    else { OK "Todos los <label> en mapa.html tienen for=" }

    if ($mapa -match "irContacto|vxBrochure|vxTour360") { OK "Funciones de comunicacion con el padre (irContacto/vxBrochure/vxTour360) presentes" }
    else { WARN "No se encontraron las funciones esperadas de comunicacion con index.html" }

} else { ERR "mapa.html no encontrado" }

# ================================================================
#  5. vercel.json — cobertura de rutas para archivos estaticos
#     (esto fue un bug real: theme.js/vexo-magic.js/sanity-check.js
#     se servian como index.html en produccion por falta de ruta)
# ================================================================
HDR "5. Cobertura de rutas en vercel.json"

$vercelPath = "$BASE\vercel.json"
if (Test-Path $vercelPath) {
    $vjson = [System.IO.File]::ReadAllText($vercelPath, [System.Text.Encoding]::UTF8)

    $extensiones = Get-ChildItem "$BASE\public" -File -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -ne "index.html" } |
        ForEach-Object { $_.Extension.TrimStart(".").ToLower() } |
        Where-Object { $_ -ne "" } | Select-Object -Unique

    foreach ($ext in $extensiones) {
        if ($vjson -match [regex]::Escape($ext)) { OK "Extension '.$ext' cubierta en vercel.json routes" }
        else { ERR "Extension '.$ext' presente en public/ pero NO cubierta en vercel.json -- se servira como index.html en produccion" }
    }

    # Carpetas con ruta explicita esperada
    $carpetasPublic = Get-ChildItem "$BASE\public" -Directory -ErrorAction SilentlyContinue
    foreach ($carpeta in $carpetasPublic) {
        if ($vjson -match [regex]::Escape($carpeta.Name)) { OK "Carpeta public/$($carpeta.Name)/ referenciada en vercel.json" }
        else { WARN "Carpeta public/$($carpeta.Name)/ sin ruta explicita en vercel.json -- confirmar que la regla generica de extensiones la cubre" }
    }

    if ($vjson -match "public/index\.html") { OK "Catch-all a index.html presente (necesario para la SPA)" }
    else { ERR "No se encontro el catch-all a index.html -- rutas de la SPA se romperan" }

} else { ERR "vercel.json no encontrado" }

# ================================================================
#  6. SEGURIDAD — API keys expuestas y .env
# ================================================================
HDR "6. Seguridad"

# a) .gitignore correcto
$giPath = "$BASE\.gitignore"
if (Test-Path $giPath) {
    $gi = [System.IO.File]::ReadAllText($giPath, [System.Text.Encoding]::UTF8)
    foreach ($item in @(".env",".env.local","*.csv","*.xlsx","*.log")) {
        if ($gi -match [regex]::Escape($item)) { OK ".gitignore incluye: $item" }
        else { WARN ".gitignore NO incluye: $item" }
    }
} else { ERR ".gitignore no encontrado" }

# b) .env no trackeado por git
if (Test-Path "$BASE\.env") {
    $null = git -C $BASE ls-files --error-unmatch ".env" 2>&1
    if ($LASTEXITCODE -eq 0) { ERR ".env esta siendo trackeado por git -- PELIGRO, sacarlo del repo YA (git rm --cached .env)" }
    else { OK ".env existe localmente pero no esta en git (correcto)" }
}

# c) API keys en texto plano DENTRO de public/ (todo lo que el navegador puede leer)
#    Esto ya paso una vez: chatbot.js tenia una key de Gemini expuesta.
$secretPatterns = @("AIzaSy","sk-ant-","sk-proj-","Bearer ey","password\s*[:=]\s*[\"']")
$archivosPublicos = Get-ChildItem "$BASE\public" -Include "*.js","*.html","*.css" -File -Recurse -ErrorAction SilentlyContinue
$fugaEncontrada = $false
foreach ($sf in $archivosPublicos) {
    $ct = [System.IO.File]::ReadAllText($sf.FullName, [System.Text.Encoding]::UTF8)
    foreach ($pat in $secretPatterns) {
        if ($ct -match $pat) {
            ERR "POSIBLE API KEY EXPUESTA en public/$($sf.Name): patron '$pat' -- esto es visible para cualquier visitante del sitio. Rotar la key y mover la logica a api/chat.js"
            $fugaEncontrada = $true
        }
    }
}
if (-not $fugaEncontrada) { OK "Sin patrones de API key expuesta en archivos de public/" }

# d) api/chat.js debe leer la key de process.env, nunca hardcodeada
$chatApiPath = "$BASE\api\chat.js"
if (Test-Path $chatApiPath) {
    $chatApi = [System.IO.File]::ReadAllText($chatApiPath, [System.Text.Encoding]::UTF8)
    if ($chatApi -match "process\.env\.(GEMINI_API_KEY|API_KEY_GEMINI)") { OK "api/chat.js lee la key desde process.env (correcto)" }
    else { ERR "api/chat.js no parece leer la key desde una variable de entorno -- revisar" }
    foreach ($pat in $secretPatterns) {
        if ($chatApi -match $pat) { ERR "api/chat.js contiene un patron de secreto hardcodeado: '$pat'" }
    }
} else { ERR "api/chat.js no encontrado" }

# ================================================================
#  7. IMAGENES FISICAS
# ================================================================
HDR "7. Imagenes en public/images"

$imgTotal = 0; $imgWebp = 0; $imgOtras = 0; $imgSizeMB = 0
if (Test-Path "$BASE\public\images") {
    Get-ChildItem -Path "$BASE\public\images" -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        $imgTotal++
        if ($_.Extension -eq ".webp") { $imgWebp++ }
        elseif ($_.Extension -in @(".jpg",".jpeg",".png")) { $imgOtras++ }
        $imgSizeMB += $_.Length / 1MB
    }
    $imgSizeMB = [math]::Round($imgSizeMB, 1)
    OK "Imagenes: $imgTotal total ($imgWebp .webp | $imgOtras jpg/png) = ${imgSizeMB}MB"
    if ($imgSizeMB -gt 95) { ERR "SUPERA 95MB. Considera Git LFS o comprimir." }
    elseif ($imgSizeMB -gt 70) { WARN "Tamanio: ${imgSizeMB}MB. Cerca del limite." }
    else { OK "Tamanio ${imgSizeMB}MB: dentro del limite" }
} else { WARN "Carpeta public/images no encontrada" }

# ================================================================
#  RESUMEN FINAL
# ================================================================
Write-Host ""
Write-Host "  ------ RESUMEN PRE-GIT ------" -FG Cyan
Write-Host "  OK:       $OK" -FG Green
Write-Host "  WARNINGS: $WARN" -FG Yellow
$errColor = if ($ERR -gt 0) { "Red" } else { "Green" }
Write-Host "  ERRORES:  $ERR" -FG $errColor
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
