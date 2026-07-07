$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir
$tsvPath = Join-Path $rootDir "scripts\master.tsv"
$templatePath = Join-Path $rootDir "public\data.generated.js"
$outputPath = $templatePath
$publicDataPath = Join-Path $rootDir "public\data.js"

function Parse-Number($value) {
    if ([string]::IsNullOrWhiteSpace($value)) { return 0 }
    $value = $value -replace "[^0-9\.-]", ""
    $result = 0.0
    [double]::TryParse($value, [ref]$result) | Out-Null
    return $result
}

function Parse-Bool($value) {
    if ([string]::IsNullOrWhiteSpace($value)) { return $false }
    return $value.Trim().ToLowerInvariant() -in @('si','sí','yes','true','1')
}

function Normalize-RelativePath($path) {
    if ([string]::IsNullOrWhiteSpace($path)) { return "" }
    $normalized = $path.Trim() -replace '\\', '/'
    $normalized = $normalized -replace '^public/', ''
    $normalized = $normalized -replace '^/', ''
    $normalized = $normalized -replace 'VEXO_WEB/Desarrollos/', 'images/Desarrollos/'
    $normalized = $normalized -replace 'images/Desarrollos/Desarrollos/', 'images/Desarrollos/'
    return $normalized
}

function Normalize-Longitude($value) {
    $lng = Parse-Number $value
    if ($lng -gt 0 -and $lng -lt 180) { return -[math]::Abs($lng) }
    return $lng
}

function Parse-ImageArray($value) {
    if ([string]::IsNullOrWhiteSpace($value)) { return @() }
    $text = $value.Trim()
    $items = @()
    if ($text.StartsWith('[') -and $text.EndsWith(']')) {
        try {
            $items = ConvertFrom-Json $text
        } catch {
            $matches = [regex]::Matches($text, '"([^"]+)"')
            foreach ($m in $matches) { $items += $m.Groups[1].Value }
        }
    } elseif ($text.Contains(',')) {
        $items = $text -split ',' | ForEach-Object { $_.Trim() }
    } else {
        $items = @($text)
    }
    return $items | ForEach-Object { Normalize-RelativePath $_ } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique
}

function Normalize-Slug($slug, $name) {
    if (-not [string]::IsNullOrWhiteSpace($slug)) { return $slug.Trim() }
    if ([string]::IsNullOrWhiteSpace($name)) { return "" }
    $value = $name.Trim().ToLowerInvariant()
    $value = $value -replace '[^a-z0-9\s-]', ''
    $value = $value -replace '\s+', '-'
    return $value.Trim('-')
}

function Parse-Modelos($row) {
    $modelos = @()
    for ($i = 1; $i -le 3; $i++) {
        $nombre = $row["modelo_${i}_nombre"]
        $tipo = $row["modelo_${i}_tipo"]
        if (-not [string]::IsNullOrWhiteSpace($nombre) -or -not [string]::IsNullOrWhiteSpace($tipo)) {
            $modelo = [ordered]@{
                nombre = $nombre
                tipo = $tipo
                recamaras = Parse-Number $row["modelo_${i}_recamaras"]
                banos = Parse-Number $row["modelo_${i}_banos"]
                m2 = Parse-Number $row["modelo_${i}_m2"]
                precio = Parse-Number $row["modelo_${i}_precio"]
                descripcion = $row["modelo_${i}_descripcion"]
                foto = Normalize-RelativePath $row["foto_modelo${i}_url"]
                video_youtube_url = $row.video_youtube_url
                tour360_url = $row.tour360_url
            }
            $modelos += $modelo
        }
    }
    return $modelos
}

Write-Host '>>> Actualización de data.generated.js desde TSV maestro...' -ForegroundColor Cyan

if (-not (Test-Path $tsvPath)) {
    Write-Host "ERROR: No se encuentra el TSV maestro en $tsvPath" -ForegroundColor Red
    exit 1
}

$raw = Get-Content -Path $tsvPath -Raw -Encoding UTF8
$lines = $raw -split "`r?`n"
$headers = $lines[0] -split "`t"
$rows = $lines[1..($lines.Length - 1)] | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

$desarrollos = @()
$counter = 1
foreach ($line in $rows) {
    $cols = $line -split "`t"
    $row = @{}
    for ($i = 0; $i -lt $headers.Length; $i++) {
        $key = $headers[$i].Trim()
        $value = if ($i -lt $cols.Length) { $cols[$i].Trim() } else { "" }
        $row[$key] = $value
    }

    $imagenes = Parse-ImageArray $row.imagenes
    if ($imagenes.Count -eq 0) {
        $imagenes = @(
            Normalize-RelativePath $row.foto_principal_url,
            Normalize-RelativePath $row.foto_2_url,
            Normalize-RelativePath $row.foto_3_url,
            Normalize-RelativePath $row.foto_4_url,
            Normalize-RelativePath $row.foto_5_url
        ) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique
    }

    $desarrollo = [ordered]@{
        id = $counter
        original_id = $row.id
        slug = Normalize-Slug $row.url_slug $row.nombre_corto
        url_slug = $row.url_slug
        nombre = $row.nombre_desarrollo
        nombre_corto = $row.nombre_corto
        ciudad = $row.ciudad
        estado = $row.estado
        zona = $row.zona
        direccion = $row.direccion
        lat = Parse-Number $row.coordenadas_lat
        lng = Normalize-Longitude $row.coordenadas_lng
        url_maps = $row.url_maps
        iframe_maps = $row.iframe_maps
        tipo = $row.tipo_desarrollo
        estatus = $row.estatus
        fecha_entrega = $row.fecha_entrega
        desarrolladora = $row.desarrolladora
        arquitecto = $row.arquitecto_despacho
        niveles = Parse-Number $row.niveles
        total_unidades = Parse-Number $row.total_unidades
        descripcion_corta = $row.descripcion_corta_web
        descripcion_larga = $row.descripcion_larga_web
        descripcion_chatbot = $row.descripcion_chatbot
        slogan = $row.slogan
        badge_web = $row.badge_web
        destacado = Parse-Bool $row.destacado
        orden_home = Parse-Number $row.orden_home
        precio_desde = Parse-Number $row.precio_desde
        precio_hasta = Parse-Number $row.precio_hasta
        moneda = $row.moneda
        esquema_pago = $row.esquema_pago
        financiamiento = $row.financiamiento
        enganche_pct = Parse-Number $row.enganche_pct
        mensualidades = $row.mensualidades
        amenidades = $row.amenidades
        acabados = $row.acabados
        estacionamiento = $row.estacionamiento
        mantenimiento_aprox = $row.mantenimiento_aprox
        mascotas = Parse-Bool $row.mascotas
        seguridad = $row.seguridad
        foto_principal_url = Normalize-RelativePath $row.foto_principal_url
        foto_2_url = Normalize-RelativePath $row.foto_2_url
        foto_3_url = Normalize-RelativePath $row.foto_3_url
        foto_4_url = Normalize-RelativePath $row.foto_4_url
        foto_5_url = Normalize-RelativePath $row.foto_5_url
        foto_modelo1_url = Normalize-RelativePath $row.foto_modelo1_url
        foto_modelo2_url = Normalize-RelativePath $row.foto_modelo2_url
        foto_modelo3_url = Normalize-RelativePath $row.foto_modelo3_url
        video_youtube_url = $row.video_youtube_url
        tour360_url = $row.tour360_url
        brochure_drive_id = $row.brochure_drive_id
        brochure = if (-not [string]::IsNullOrWhiteSpace($row.brochure_drive_id)) { "https://drive.google.com/file/d/$($row.brochure_drive_id)/view?usp=drive_link" } else { "" }
        seo_title = $row.seo_title
        seo_description = $row.seo_description
        seo_keywords = $row.seo_keywords
        schema_type = $row.schema_type
        og_image_drive_id = $row.og_image_drive_id
        chatbot_preguntas_frecuentes = $row.chatbot_preguntas_frecuentes
        correo_ventas = $row.correo_ventas
        correo_info = $row.correo_info
        whatsapp_numero = $row.whatsapp_numero
        instagram_url = $row.instagram_url
        facebook_url = $row.facebook_url
        calendario_url = $row.calendario_url
        disponibilidad = $row.disponibilidad
        chatbot_knowledge = $row.chatbot_knowledge
        schema_script = $row.schema_script
        image_sequence = $row.image_sequence
        video_bg_url = $row.video_bg_url
        notas_internas = $row.notas_internas
        imagen_fallback = Normalize-RelativePath $row.foto_principal_url
        imagenes = $imagenes
        modelos = Parse-Modelos $row
    }

    $desarrollos += $desarrollo
    $counter++
}

$jsonDesarrollos = $desarrollos | ConvertTo-Json -Depth 12 -Compress

if (-not (Test-Path $templatePath)) {
    Write-Host "ERROR: no se encuentra la plantilla base $templatePath" -ForegroundColor Red
    exit 1
}

$template = Get-Content -Path $templatePath -Raw -Encoding UTF8
$pattern = '[\r\n]*const DESARROLLOS = \[.*?\];'
$replacement = "`r`nconst DESARROLLOS = $jsonDesarrollos;`r`n"
$newContent = [regex]::Replace($template, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)

if ($newContent -eq $template) {
    Write-Host "ERROR: No se reemplazó la sección DESARROLLOS en $templatePath" -ForegroundColor Red
    exit 1
}

Set-Content -Path $outputPath -Value $newContent -Encoding UTF8
Write-Host "[OK] data.generated.js actualizado con $($desarrollos.Count) desarrollos." -ForegroundColor Green

if (Test-Path $publicDataPath) {
    Set-Content -Path $publicDataPath -Value $newContent -Encoding UTF8
    Write-Host "[OK] public/data.js sincronizado con data.generated.js" -ForegroundColor Green
} else {
    Write-Host "WARN: public/data.js no existe, solo se actualizó data.generated.js" -ForegroundColor Yellow
}
