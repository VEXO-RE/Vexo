# =================================================================
# SCRIPT DE SINCRONIZACIÓN VEXO: DRIVE (G:) -> LOCAL (C:)
# =================================================================

# 1. Definición de Rutas
$rutaDrive = "G:\Mi unidad\VEXO_MASTER_OPTIMIZADO"
$rutaLocal = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO"

# 2. Lista de archivos críticos actualizados
$archivos = @("index.html", "mapa.html", "vercel.json", "src\data\data.js")

Write-Host "--- Iniciando Sincronización VEXO ---" -ForegroundColor Cyan

foreach ($relPath in $archivos) {
    $origen = Join-Path $rutaDrive $relPath
    $destino = Join-Path $rutaLocal $relPath
    $destinoDir = Split-Path $destino

    if (Test-Path $origen) {
        # Asegurar que el directorio de destino existe (especialmente para src\data)
        if (!(Test-Path $destinoDir)) {
            New-Item -ItemType Directory -Path $destinoDir -Force | Out-Null
        }

        # Copiar y sobrescribir
        Copy-Item -Path $origen -Destination $destino -Force
        Write-Host "[OK] Sincronizado: $relPath" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] No se encontró en Drive: $relPath" -ForegroundColor Red
    }
}

Write-Host "--- Sincronización Completada ---" -ForegroundColor Cyan
Write-Host "Listo para ejecutar Git Push." -ForegroundColor Yellow