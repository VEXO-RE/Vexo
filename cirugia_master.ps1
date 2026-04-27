$ROOT = Get-Location
$DATA_JS = "$ROOT\src\data\data.js"
$MAPA_HTML = "$ROOT\mapa.html"

Write-Host ">>> Iniciando cirugía de archivos en $ROOT..." -ForegroundColor Cyan

# 1. ARREGLAR DATA.JS (Inyectar los exports que faltan para que el HTML los lea)
if (Test-Path $DATA_JS) {
    $content = Get-Content $DATA_JS -Raw
    if ($content -notmatch "window\.DESARROLLOS = DESARROLLOS;") {
        $exports = @"

// --- EXPORTS INYECTADOS POR CIRUGÍA ---
window.CONFIG = typeof CONFIG !== 'undefined' ? CONFIG : {};
window.DESARROLLOS = typeof DESARROLLOS !== 'undefined' ? DESARROLLOS : [];
window.BLOG_POSTS = typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS : [];
window.CIUDADES = typeof CIUDADES !== 'undefined' ? CIUDADES : [];
window.EMPRESA = typeof EMPRESA !== 'undefined' ? EMPRESA : {};
window.DESCARGAS = typeof DESCARGAS !== 'undefined' ? DESCARGAS : [];
window.LEGAL = typeof LEGAL !== 'undefined' ? LEGAL : {};

window.getDesarrolloBySlug = function(s) { return window.DESARROLLOS.find(function(d){ return d.slug === s; }); };
"@
        Add-Content -Path $DATA_JS -Value $exports -Encoding UTF8
        Write-Host "[OK] Exports agregados a data.js" -ForegroundColor Green
    }
}

# 2. ARREGLAR MAPA.HTML (Eliminar el error CORS y conectar data.js directo)
if (Test-Path $MAPA_HTML) {
    $mapaContent = Get-Content $MAPA_HTML -Raw
    if ($mapaContent -notmatch 'src="src/data/data.js"') {
        $mapaContent = $mapaContent -replace '(?i)</head>', "<script src=`"src/data/data.js`"></script>`n</head>"
    }
    $mapaContent = $mapaContent -replace 'window\.parent\.DESARROLLOS', 'window.DESARROLLOS'
    $mapaContent = $mapaContent -replace 'window\.parent\.CONFIG', 'window.CONFIG'
    $mapaContent | Out-File -FilePath $MAPA_HTML -Encoding UTF8 -Force
    Write-Host "[OK] mapa.html parcheado (Error CORS eliminado)." -ForegroundColor Green
}

Write-Host ">>> Cirugía completa. Revisa tu index.html para borrar los <!DOCTYPE html> duplicados y listo." -ForegroundColor Yellow