$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir
$tsvPath = Join-Path $rootDir "scripts\master.tsv"
$jsPath = Join-Path $rootDir "src\data\data.js"
$imagesRoot = Join-Path $rootDir "public\images\Desarrollos"

Write-Host ">>> Sincronización Final VEXO - Modo Producción..." -ForegroundColor Cyan

function ConvertTo-Slug($text) {
    if ([string]::IsNullOrWhiteSpace($text)) { return "" }
    $s = $text.ToLower()
    $s = $s -replace '[áàäâ]', 'a' -replace '[éèëê]', 'e' -replace '[íìïî]', 'i' -replace '[óòöô]', 'o' -replace '[úùüû]', 'u' -replace '[ñ]', 'n'
    $s = $s -replace '[^a-z0-9\s-]', '' -replace '\s+', '-' -replace '-+', '-'
    return $s.Trim('-')
}

function Build-ImageManifest {
    $manifest = @{}
    if (-not (Test-Path $imagesRoot)) { return $manifest }
    Get-ChildItem -Path $imagesRoot -Recurse -File | ForEach-Object {
        $fileName = $_.Name.Trim()
        $filePath = $_.FullName.Replace('\\', '/').Replace('\\', '/')
        $filePath = $filePath -replace '(?i)^.*?/public/images/Desarrollos/', 'public/images/Desarrollos/'
        if (-not $manifest.ContainsKey($fileName)) {
            $manifest[$fileName] = @()
        }
        $manifest[$fileName] += $filePath
    }
    return $manifest
}

function Get-AssetPath($fileName, $manifest) {
    if ([string]::IsNullOrWhiteSpace($fileName)) { return $null }
    $key = $fileName.Trim() -replace '^.*/', ''
    if ($manifest.ContainsKey($key)) { return $manifest[$key][0] }
    $lowerKey = $key.ToLowerInvariant()
    foreach ($manifestKey in $manifest.Keys) {
        if ($manifestKey.ToLowerInvariant() -eq $lowerKey) { return $manifest[$manifestKey][0] }
    }
    return $null
}

function Normalize-ImageValue($value, $manifest) {
    if ($null -eq $value -or -not ($value -is [string])) { return $value }
    $str = $value.Trim()
    if ($str -eq '') { return $str }

    $str = $str -replace '\\', '/'
    $str = $str -replace 'VEXO_WEB/Desarrollos([\\/])', 'public/images/Desarrollos/'
    $str = $str -replace 'public/images[\\/][dD]esarrollos([\\/])', 'public/images/Desarrollos/'
    $str = $str -replace '(?i)^.*?/public/images/Desarrollos/', 'public/images/Desarrollos/'
    $str = $str -replace '/+', '/'

    if ($str -match '^public/images/Desarrollos/') {
        $parts = $str -split '/'
        if ($parts.Count -gt 0) {
            $fileName = $parts[-1]
            $asset = Get-AssetPath $fileName $manifest
            if ($asset) { return $asset }
        }
        return $str
    }

    $tokenRegex = '(?<![\/\\])([A-Za-z0-9_-]+?\.(?:jpe?g|png|gif|webp))'
    $result = $str
    $matches = [regex]::Matches($str, $tokenRegex)
    foreach ($match in $matches) {
        $token = $match.Groups[1].Value
        $asset = Get-AssetPath $token $manifest
        if ($asset) {
            $result = [regex]::Replace($result, [regex]::Escape($token), $asset)
        }
    }

    if ($result -ne $str) { return $result }
    if ($str -match '^[A-Za-z0-9_-]+\.(?:jpe?g|png|gif|webp)$') {
        return "public/images/Desarrollos/$str"
    }

    return $str
}

if (-not (Test-Path $tsvPath)) { Write-Host "[!] Error: No se encontro master.tsv"; Exit }

$imageManifest = Build-ImageManifest
$rawData = Import-Csv -Path $tsvPath -Delimiter "`t" -Encoding UTF8
$cleanData = @()

foreach ($row in $rawData) {
    # Ignorar filas vacias de Excel
    if ([string]::IsNullOrWhiteSpace($row.nombre_desarrollo)) { continue }

    $newRow = @{}
    
    foreach ($prop in $row.psobject.properties) {
        $val = $prop.value
        if ($null -ne $val -and $val -is [string]) {
            $val = Normalize-ImageValue $val $imageManifest
            $val = $val -replace 'ultar', ''
        }
        $newRow[$prop.name] = $val
    }

    # DATOS CLAUDE
    $newRow['id'] = $row.id
    $newRow['slug'] = ConvertTo-Slug "$($row.nombre_desarrollo)-$($row.ciudad)"
    # KEEP normalized values instead of overwriting with raw row data
    # $newRow['nombre'] already normalized
    # $newRow['nombre_corto'] already normalized
    # $newRow['ciudad'] already normalized
    # ... etc for all fields already normalized in the initial loop above
    
    # Only update calculated or special fields:
    $newRow['orden'] = if ($row.orden_home -match '^\d+$') { [int]$row.orden_home } else { 99 }
    
    $newRow['precio_desde'] = if ($newRow['precio_desde'] -match '^\d+$') { [int]$newRow['precio_desde'] } else { 0 }
    $newRow['precio_hasta'] = if ($newRow['precio_hasta'] -match '^\d+$') { [int]$newRow['precio_hasta'] } else { 0 }
    # Keep normalized moneda from initial loop, only set if empty
    if (-not $newRow['moneda']) { $newRow['moneda'] = "MXN" }

    $newRow['lat'] = if ([double]::TryParse($newRow['coordenadas_lat'], [ref]$null)) { [double]$newRow['coordenadas_lat'] } else { 0.0 }
    $newRow['lng'] = if ([double]::TryParse($newRow['coordenadas_lng'], [ref]$null)) { [double]$newRow['coordenadas_lng'] } else { 0.0 }

    $newRow['destacado'] = if ($row.destacado -eq '1' -or $row.destacado -match 'true') { $true } else { $false }
    $newRow['mascotas'] = if ($row.mascotas -match '(?i)si|true|1') { $true } else { $false }

    $imgs = @()
    if ($newRow['foto_principal_url']) { $imgs += $newRow['foto_principal_url'] }
    if ($newRow['foto_2_url']) { $imgs += $newRow['foto_2_url'] }
    if ($newRow['foto_3_url']) { $imgs += $newRow['foto_3_url'] }
    if ($newRow['foto_4_url']) { $imgs += $newRow['foto_4_url'] }
    if ($newRow['foto_5_url']) { $imgs += $newRow['foto_5_url'] }
    $newRow['imagenes'] = $imgs
    $newRow['imagen_fallback'] = if ($imgs.Count -gt 0) { $imgs[0] } else { "" }

    # FECHA EXCEL FIX (Con paréntesis agregados)
    if ($row.fecha_entrega -match '^\d{5}$') {
        $dateObj = ([datetime]"1899-12-30").AddDays([int]$row.fecha_entrega)
        $meses = @("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre")
        $newRow['fecha_entrega'] = "$($meses[$dateObj.Month - 1]) $($dateObj.Year)"
    }

    $modelos = @()
    for ($i = 1; $i -le 3; $i++) {
        $m_nombre = $row."modelo_$i`_nombre"
        if (-not [string]::IsNullOrWhiteSpace($m_nombre)) {
            $modelos += @{
                nombre = $m_nombre
                tipo = $row."modelo_$i`_tipo"
                recamaras = if ($row."modelo_$i`_recamaras" -match '^\d+$') { [int]$row."modelo_$i`_recamaras" } else { 0 }
                banos = if ($row."modelo_$i`_banos" -match '^[\d\.]+$') { [double]$row."modelo_$i`_banos" } else { 0 }
                m2 = if ($row."modelo_$i`_m2" -match '^[\d\.]+$') { [double]$row."modelo_$i`_m2" } else { 0 }
                precio = if ($row."modelo_$i`_precio" -match '^\d+$') { [int]$row."modelo_$i`_precio" } else { 0 }
                descripcion = $row."modelo_$i`_descripcion"
                caracteristicas = $row."modelo_$i`_caracteristicas"
            }
        }
    }
    $newRow['modelos'] = $modelos

    $cleanData += $newRow
}

$jsonString = $cleanData | ConvertTo-Json -Depth 10 -Compress
$jsContent = @"
// DATA MAESTRA CONSOLIDADA
window.DESARROLLOS = $jsonString;
"@

$jsContent | Out-File -FilePath $jsPath -Encoding UTF8 -Force
Write-Host "[OK] Base de datos limpia: $($cleanData.Count) desarrollos procesados." -ForegroundColor Green