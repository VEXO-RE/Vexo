# ================================================================
#  VEXO REAL ESTATE — actualizar_contenido.ps1 v4
#  Lee: G:\Mi unidad\vexo_desarrollos_master.gsheet (exportado como TSV)
#  Genera: src/data/data.js — ARCHIVO ÚNICO CONSOLIDADO
#  94 columnas del master — mapeo exacto
#  Encoding: UTF-8 | Fotos: .webp desde columna "imagenes" del CSV
# ================================================================

$BASE  = "C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO"
$GDIR  = "G:\Mi unidad"
$LOG   = "$BASE\scripts\sync_$(Get-Date -Format 'yyyyMMdd_HHmm').txt"
New-Item -ItemType Directory -Force "$BASE\scripts" | Out-Null

function OK   { param($m) Write-Host "  [OK] $m" -FG Green;  Add-Content $LOG "OK  $m" }
function ERR  { param($m) Write-Host "  [XX] $m" -FG Red;    Add-Content $LOG "ERR $m" }
function WARN { param($m) Write-Host "  [!!] $m" -FG Yellow; Add-Content $LOG "WRN $m" }
function INF  { param($m) Write-Host "  ... $m" -FG Cyan;    Add-Content $LOG "INF $m" }
function HDR  { param($m) Write-Host "`n  ==== $m ====" -FG Cyan }

"VEXO sync $(Get-Date)" | Out-File $LOG -Encoding UTF8

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║  VEXO RE — Sincronización desde Google Sheets v4    ║" -FG Cyan
Write-Host "  ║  Fuente: vexo_desarrollos_master.gsheet             ║" -FG Cyan
Write-Host "  ╚══════════════════════════════════════════════════════╝" -FG Cyan

# ── LOCALIZAR ARCHIVO DE DATOS ──────────────────────────────────────────
HDR "1. Localizar archivo master"

$dataFile = $null
$dataType = $null

$candidatos = @(
    @{p="$GDIR\vexo_desarrollos_master.tsv";  t="TSV"},
    @{p="$BASE\scripts\master.tsv";           t="TSV"},
    @{p="$BASE\scripts\vexo_master.tsv";      t="TSV"},
    @{p="$GDIR\vexo_desarrollos_master.csv";  t="CSV"},
    @{p="$BASE\vexo_desarrollos_master.csv";  t="CSV"},
    @{p="$BASE\scripts\master.csv";           t="CSV"}
)

foreach ($c in $candidatos) {
    if (Test-Path $c.p) { $dataFile = $c.p; $dataType = $c.t; break }
}

if (-not $dataFile) {
    Write-Host ""
    Write-Host "  NO SE ENCONTRO el archivo master." -FG Red
    Write-Host ""
    Write-Host "  INSTRUCCIONES:" -FG Yellow
    Write-Host "  1. Abre Google Sheets -> vexo_desarrollos_master" -FG White
    Write-Host "  2. Archivo -> Descargar -> TSV (valores separados por tabuladores)" -FG White
    Write-Host "  3. Guarda en: $GDIR\vexo_desarrollos_master.tsv" -FG Green
    Write-Host ""
    Write-Host "  Por que TSV y no CSV?" -FG Yellow
    Write-Host "  CSV = Latin-1 -> PowerShell lee como UTF-8 -> Merida se rompe" -FG DarkGray
    Write-Host "  TSV = UTF-8 puro -> sin problemas de encoding" -FG DarkGray
    Write-Host ""
    $ruta = Read-Host "  Ingresa la ruta del archivo (Enter para salir)"
    if ($ruta -and (Test-Path $ruta)) {
        $dataFile = $ruta
        $dataType = if ($ruta -match '\.tsv$') { "TSV" } else { "CSV" }
    } else {
        Read-Host "  Presiona Enter para cerrar"
        exit 1
    }
}
OK "Archivo encontrado: $dataFile ($dataType)"

# ── LEER DATOS ──────────────────────────────────────────────────────────
HDR "2. Leer y parsear datos"

$sep = if ($dataType -eq "TSV") { "`t" } else { "," }

# Leer bytes raw y re-interpretar segun encoding
$bytes = [System.IO.File]::ReadAllBytes($dataFile)

# Detectar BOM UTF-8
$enc = [System.Text.Encoding]::UTF8
if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    $rawText = [System.Text.Encoding]::UTF8.GetString($bytes, 3, $bytes.Length - 3)
    INF "Encoding detectado: UTF-8 con BOM"
} elseif ($dataType -eq "CSV") {
    # CSV de Sheets viene en Windows-1252 (Latin-1 extendido)
    $rawText = [System.Text.Encoding]::GetEncoding(1252).GetString($bytes)
    # Re-encodificar como UTF-8
    $bytes2 = [System.Text.Encoding]::GetEncoding(1252).GetBytes($rawText)
    $rawText = [System.Text.Encoding]::UTF8.GetString($bytes2)
    INF "Encoding detectado: Windows-1252 (CSV) -> convertido a UTF-8"
} else {
    $rawText = [System.Text.Encoding]::UTF8.GetString($bytes)
    INF "Encoding detectado: UTF-8 puro (TSV)"
}

# Reparar columna lng sin header (posicion 08 entre lat y url_maps)
$rawText = $rawText -replace 'coordenadas_lat,,url_maps','coordenadas_lat,coordenadas_lng,url_maps'

# Parsear CSV/TSV manualmente para manejar campos con comillas
$lines = $rawText -split "`r?`n" | Where-Object { $_.Trim() -ne '' }
$headers = $lines[0] -split $sep | ForEach-Object { $_.Trim().Trim('"') }

INF "Headers encontrados: $($headers.Count)"
INF "Filas de datos: $($lines.Count - 1)"

# ── FUNCIONES DE PROCESAMIENTO ──────────────────────────────────────────

function ParseRow {
    param($line, $sep, $headers)
    $parts = $line -split $sep
    $row = @{}
    for ($i = 0; $i -lt $headers.Count -and $i -lt $parts.Count; $i++) {
        $val = $parts[$i].Trim().Trim('"')
        $row[$headers[$i]] = $val
    }
    return $row
}

function CleanStr {
    param($s)
    if (-not $s) { return '' }
    # Reparar encoding roto (por si acaso llega CSV)
    $s = $s.Replace('MÃ©rida','Mérida').Replace('M?rida','Mérida').Replace('Mrida','Mérida')
    $s = $s.Replace('YucatÃ¡n','Yucatán').Replace('Yucat?n','Yucatán').Replace('Yucatn','Yucatán')
    $s = $s.Replace('TemozÃ³n','Temozón').Replace('Temoz?n','Temozón').Replace('Temozn','Temozón')
    $s = $s.Replace('caj?n','cajón').Replace('rec?maras','recámaras').Replace('bal?n','balcón')
    $s = $s.Replace('bal c?n','balcón').Replace('DzityÃ¡','Dzityá').Replace('Dzity?','Dzityá')
    $s = $s.Replace('?caro','Ícaro').Replace('Ã?caro','Ícaro')
    $s = $s.Replace('CuauhtÃ©moc','Cuauhtémoc').Replace('Cuauht?moc','Cuauhtémoc')
    $s = $s.Replace('?rea','área').Replace('?reas','áreas').Replace('caj?n','cajón')
    $s = $s.Replace('sal?n','salón').Replace('port?n','portón').Replace('dise?o','diseño')
    $s = $s.Replace('CoyoacÃ¡n','Coyoacán').Replace('Coyoac?n','Coyoacán')
    $s = $s.Replace('OrquÃ­dea','Orquídea').Replace('Orqu?dea','Orquídea')
    $s = $s.Replace('VÃ©rtice','Vértice').Replace('V?rtice','Vértice')
    $s = $s.Replace('pÃ©rgola','pérgola').Replace('p?rgola','pérgola')
    $s = $s.Replace('mÃ¡rmol','mármol').Replace('m?rmol','mármol')
    $s = $s.Replace('inversión','inversión').Replace('plus valía','plusvalía')
    # Limpiar "Consultar" y "Consultar Brochure" en campos URL
    if ($s -match '^Consultar') { return '' }
    # Limpiar "ultar" sobrante en URLs
    $s = $s -replace 'uQT2fMM6R5Pxv7G39ultar', 'uQT2fMM6R5Pxv7G39'
    $s = $s -replace '61577530904134ltar', '61577530904134'
    $s = $s -replace 'ltar$', ''
    # Limpiar comillas
    $s = $s.Replace('"',"'").Replace('\"',"'")
    return $s.Trim()
}

function CleanNum {
    param($s)
    if (-not $s) { return 0 }
    $n = ($s -replace '[^0-9.]','').Trim('.')
    if (-not $n) { return 0 }
    try { return [double]$n } catch { return 0 }
}

function CleanBool {
    param($s)
    if (-not $s) { return 'false' }
    if ($s.ToUpper() -in @('SI','YES','TRUE','1','S','X')) { return 'true' }
    return 'false'
}

function FixLng {
    param($s)
    $n = CleanNum $s
    # Longitud Mexico SIEMPRE negativa
    if ($n -gt 0 -and $n -lt 180) { return -$n }
    return $n
}

function JsStr {
    param($s)
    $s = CleanStr $s
    return $s.Replace('\','\\').Replace("'","\\'")
}

function DriveUrl {
    param($id)
    if (-not $id -or $id -match '^Consultar' -or $id.Length -lt 10) { return '' }
    return "https://drive.google.com/file/d/$id/view"
}

function ParseImagenes {
    param($raw, $row)
    # Primero usar el campo "imagenes" que ya tiene las rutas completas
    $im = $raw.Trim()
    if ($im.StartsWith('[')) {
        # Es un array JSON — extraer las rutas
        $rutas = [regex]::Matches($im, '"([^"]+\.webp)"') | ForEach-Object { $_.Groups[1].Value }
        if ($rutas.Count -gt 0) {
            return '"' + ($rutas -join '","') + '"'
        }
    }
    # Si no, construir desde foto_principal_url, foto_2_url, etc. con la ruta base del id
    $carpeta = "VEXO_WEB/Desarrollos/" + $row['id']
    $fotos = @()
    foreach ($n in @('foto_principal_url','foto_2_url','foto_3_url','foto_4_url','foto_5_url')) {
        $f = $row[$n]
        if ($f -and $f.Length -gt 4 -and $f -notmatch '^Consultar') {
            if ($f -match '^VEXO_WEB') {
                $fotos += $f
            } else {
                $fotos += "$carpeta/$f"
            }
        }
    }
    if ($fotos.Count -gt 0) { return '"' + ($fotos -join '","') + '"' }
    return '""'
}

function ParseModelos {
    param($row)
    $out = @()
    foreach ($n in @('1','2','3')) {
        $nombre = CleanStr $row["modelo_${n}_nombre"]
        if (-not $nombre -or $nombre -match '^Consultar') { continue }
        $tipo   = CleanStr $row["modelo_${n}_tipo"]
        $rec    = CleanNum $row["modelo_${n}_recamaras"]
        $ban    = CleanNum $row["modelo_${n}_banos"]
        $m2     = CleanNum $row["modelo_${n}_m2"]
        $precio = CleanNum $row["modelo_${n}_precio"]
        $desc   = JsStr   $row["modelo_${n}_descripcion"]
        $car    = JsStr   $row["modelo_${n}_caracteristicas"]
        # Foto del modelo
        $fmod   = CleanStr $row["foto_modelo${n}_url"]
        $fmodUrl = if ($fmod -and $fmod.Length -gt 4) {
            "VEXO_WEB/Desarrollos/" + $row['id'] + "/" + $fmod
        } else { '' }
        $out += "{nombre:'$(JsStr $nombre)',tipo:'$(JsStr $tipo)',recamaras:$rec,banos:$ban,m2:$m2,precio:$precio,descripcion:'$desc',caracteristicas:'$car',foto:'$(JsStr $fmodUrl)'}"
    }
    return "[" + ($out -join ",") + "]"
}

# ── PROCESAR FILAS Y GENERAR JS ─────────────────────────────────────────
HDR "3. Generar data.js"

$devs = @()
for ($ri = 1; $ri -lt $lines.Count; $ri++) {
    $line = $lines[$ri].Trim()
    if (-not $line) { continue }
    $row = ParseRow -line $line -sep $sep -headers $headers

    $rawId = $row['id']
    if (-not $rawId) { continue }

    # Obtener ID numérico del orden_home o posición
    $numId = $ri
    try { $numId = [int](CleanNum $row['orden_home']) } catch {}
    if ($numId -eq 0) { $numId = $ri }

    # Rutas de imágenes desde el campo "imagenes" del CSV
    $imgsJS = ParseImagenes -raw $row['imagenes'] -row $row

    # Foto principal (para la hero card)
    $foto1 = CleanStr $row['foto_principal_url']
    if ($foto1 -and $foto1.Length -gt 4) {
        $foto1 = "VEXO_WEB/Desarrollos/$rawId/$foto1"
    } else {
        # Extraer primera foto del array imagenes
        $match = [regex]::Match($row['imagenes'], '"(VEXO_WEB[^"]+\.webp)"')
        if ($match.Success) { $foto1 = $match.Groups[1].Value } else { $foto1 = '' }
    }

    # Foto 2 y 3
    $foto2 = CleanStr $row['foto_2_url']
    if ($foto2 -and $foto2.Length -gt 4) { $foto2 = "VEXO_WEB/Desarrollos/$rawId/$foto2" }
    $foto3 = CleanStr $row['foto_3_url']
    if ($foto3 -and $foto3.Length -gt 4) { $foto3 = "VEXO_WEB/Desarrollos/$rawId/$foto3" }

    # Coordenadas
    $lat = CleanNum $row['coordenadas_lat']
    $lng = FixLng   $row['coordenadas_lng']

    # Brochure
    $brochureUrl = DriveUrl $row['brochure_drive_id']

    # Slug
    $slug = CleanStr $row['url_slug']
    if (-not $slug) {
        $slug = (JsStr $row['nombre_desarrollo']) -replace '[^a-z0-9]','-' -replace '-+','-'
        $slug = $slug.ToLower().Trim('-')
    }

    # SEO
    $seoT = JsStr $row['seo_title']
    if (-not $seoT -or $seoT.Length -gt 65) {
        $seoT = (JsStr $row['nombre_desarrollo']) -replace 'Desarrollo ',''
        $seoT = "$seoT | VEXO Real Estate"
        if ($seoT.Length -gt 65) { $seoT = $seoT.Substring(0,62) + '...' }
    }
    $seoD = JsStr $row['seo_description']
    if ($seoD.Length -gt 155) { $seoD = $seoD.Substring(0,152) + '...' }

    # Calendario y URLs sociales (limpios)
    $cal = CleanStr $row['calendario_url']
    if (-not $cal -or $cal.Length -lt 5) { $cal = 'https://calendar.app.google/uQT2fMM6R5Pxv7G39' }
    $fb  = CleanStr $row['facebook_url']
    if (-not $fb -or $fb.Length -lt 5) { $fb = 'https://www.facebook.com/profile.php?id=61577530904134' }
    $ig  = CleanStr $row['instagram_url']
    if (-not $ig -or $ig.Length -lt 5) { $ig = 'https://www.instagram.com/vexo_bienesraices' }

    # chatbot_preguntas_frecuentes
    $chatbot = JsStr $row['chatbot_preguntas_frecuentes']
    $chatbotKnow = JsStr $row['chatbot_knowledge']

    # Disponibilidad
    $disp = CleanStr $row['disponibilidad']
    if (-not $disp -or $disp -match '^Consultar') { $disp = 'Disponible' }

    # Modelos
    $modelosJS = ParseModelos -row $row

    $nombre = (JsStr $row['nombre_desarrollo']) -replace 'Desarrollo ',''

    $bloque = @"
  {
    id:$numId, slug:'$(JsStr $slug)',
    nombre:'$nombre', nombre_corto:'$(JsStr $row['nombre_corto'])',
    ciudad:'$(JsStr $row['ciudad'])', estado:'$(JsStr $row['estado'])', zona:'$(JsStr $row['zona'])',
    direccion:'$(JsStr $row['direccion'])',
    tipo:'$(JsStr $row['tipo_desarrollo'])', estatus:'$(JsStr $row['estatus'])', fecha_entrega:'$(JsStr $row['fecha_entrega'])',
    desarrolladora:'$(JsStr $row['desarrolladora'])', arquitecto:'$(JsStr $row['arquitecto_despacho'])',
    niveles:$(CleanNum $row['niveles']), total_unidades:$(CleanNum $row['total_unidades']),
    destacado:$(CleanBool $row['destacado']), orden:$numId,
    precio_desde:$(CleanNum $row['precio_desde']), precio_hasta:$(CleanNum $row['precio_hasta']),
    moneda:'MXN', esquema_pago:'$(JsStr $row['esquema_pago'])',
    financiamiento:'$(JsStr $row['financiamiento'])',
    enganche_pct:$(CleanNum $row['enganche_pct']), mensualidades:'$(JsStr $row['mensualidades'])',
    slogan:'$(JsStr $row['slogan'])', badge:'$(JsStr $row['badge_web'])',
    descripcion_corta:'$(JsStr $row['descripcion_corta_web'])',
    descripcion_larga:'$(JsStr $row['descripcion_larga_web'])',
    descripcion_chatbot:'$(JsStr $row['descripcion_chatbot'])',
    amenidades:'$(JsStr $row['amenidades'])',
    acabados:'$(JsStr $row['acabados'])',
    estacionamiento:'$(JsStr $row['estacionamiento'])',
    mascotas:$(CleanBool $row['mascotas']), seguridad:'$(JsStr $row['seguridad'])',
    foto_principal_url:'$foto1',
    foto_2_url:'$foto2',
    foto_3_url:'$foto3',
    foto_modelo1_url:'$(if($row['foto_modelo1_url'] -and $row['foto_modelo1_url'].Length -gt 4){"VEXO_WEB/Desarrollos/$rawId/" + (CleanStr $row['foto_modelo1_url'])}else{""})',
    foto_modelo2_url:'$(if($row['foto_modelo2_url'] -and $row['foto_modelo2_url'].Length -gt 4){"VEXO_WEB/Desarrollos/$rawId/" + (CleanStr $row['foto_modelo2_url'])}else{""})',
    foto_modelo3_url:'$(if($row['foto_modelo3_url'] -and $row['foto_modelo3_url'].Length -gt 4){"VEXO_WEB/Desarrollos/$rawId/" + (CleanStr $row['foto_modelo3_url'])}else{""})',
    imagenes:[$imgsJS],
    imagen_fallback:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    brochure:'$(JsStr $brochureUrl)',
    video_url:'$(JsStr $row['video_youtube_url'])', tour360_url:'$(JsStr $row['tour360_url'])',
    lat:$lat, lng:$lng,
    url_maps:'$(JsStr $row['url_maps'])',
    modelos:$modelosJS,
    seo:{title:'$seoT',description:'$seoD',keywords:'$(JsStr $row['seo_keywords'])'},
    correo_ventas:'ventas@vexorealestate.com', whatsapp:'525527081749',
    instagram:'$ig', facebook:'$fb',
    calendario:'$cal',
    disponibilidad:'$disp',
    chatbot_preguntas:'$chatbot',
    chatbot_knowledge:'$chatbotKnow',
  },
"@
    $devs += $bloque.Trim()
    OK "  [$numId] $nombre ($rawId)"
}

INF "Total desarrollos procesados: $($devs.Count)"

# ── LEER ARCHIVOS DE DATOS ESTÁTICOS ────────────────────────────────────
HDR "4. Leer datos complementarios (blog, empresa, ciudades, descargas, legal)"

function ReadJsContent {
    param($path, $varName)
    if (-not (Test-Path $path)) { return $null }
    $c = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    # Extraer el contenido entre "const VARNAME = " y el último ";window."
    $match = [regex]::Match($c, "const $varName\s*=\s*([\s\S]+?);?\s*window\.$varName")
    if ($match.Success) { return $match.Groups[1].Value.TrimEnd(';').Trim() }
    # Fallback: extraer entre "const VARNAME =" y fin
    $match2 = [regex]::Match($c, "const $varName\s*=\s*([\s\S]+)")
    if ($match2.Success) { return $match2.Groups[1].Value.TrimEnd(';').Trim() }
    return $null
}

$blogContent     = ReadJsContent "$BASE\src\data\blog.js"     "BLOG_POSTS"
$empresaContent  = ReadJsContent "$BASE\src\data\empresa.js"  "EMPRESA"
$ciudadesContent = ReadJsContent "$BASE\src\data\ciudades.js" "CIUDADES"
$descargasContent= ReadJsContent "$BASE\src\data\descargas.js""DESCARGAS"
$legalContent    = ReadJsContent "$BASE\src\data\legal.js"    "LEGAL"

# Fallback desde data.js si los archivos individuales no existen
$dataJsPath = "$BASE\src\data\data.js"
if ($dataJsPath -and (Test-Path $dataJsPath)) {
    $dataJsOld = [System.IO.File]::ReadAllText($dataJsPath, [System.Text.Encoding]::UTF8)
    if (-not $blogContent) {
        $m = [regex]::Match($dataJsOld, "const BLOG_POSTS\s*=\s*([\s\S]+?);?\s*// \u2500")
        if ($m.Success) { $blogContent = $m.Groups[1].Value.TrimEnd(';').Trim() }
    }
    if (-not $ciudadesContent) {
        $m = [regex]::Match($dataJsOld, "const CIUDADES\s*=\s*([\s\S]+?);?\s*// \u2500")
        if ($m.Success) { $ciudadesContent = $m.Groups[1].Value.TrimEnd(';').Trim() }
    }
}

# ── CONSTRUIR data.js COMPLETO ──────────────────────────────────────────
HDR "5. Escribir data.js"

$configBlock = @"
const CONFIG = {
  agencia:{
    nombre:'VEXO REAL ESTATE',
    slogan:'Tu inversion, nuestra prioridad',
    descripcion:'Especialistas en desarrollos residenciales premium en Merida y Ciudad de Mexico.',
    anio_fundacion:2024,
  },
  contacto:{
    telefono:'+52 55 2708 1749',
    whatsapp:'525527081749',
    whatsapp_msg:'Hola, me interesa informacion sobre los desarrollos de VEXO Real Estate.',
    email_ventas:'ventas@vexorealestate.com',
    email_info:'contacto@vexorealestate.com',
    horario:'Lun-Vie 9:00-18:00 - Sab 9:00-14:00',
  },
  redes:{
    instagram:'https://www.instagram.com/vexo_bienesraices',
    facebook:'https://www.facebook.com/profile.php?id=61577530904134',
    youtube:'',tiktok:'',linkedin:'',
  },
  google:{
    sheets_endpoint:'https://script.google.com/a/macros/vexorealestate.com/s/AKfycbyYM5vWAZngH4_3651Jp4jmAfnZ80LSapGgzCq4mYmpY-bOHlnrpYcgfeLgYFSxNXJYWQ/exec',
    analytics_id:'G-JVN5VNZGEF',
    calendario_url:'https://calendar.app.google/uQT2fMM6R5Pxv7G39',
  },
  stats:[
    {valor:'26+',label:'Desarrollos activos',icono:'apartment'},
    {valor:'3',label:'Ciudades estrategicas',icono:'location_city'},
    {valor:'800+',label:'Unidades disponibles',icono:'keys'},
    {valor:'15%',label:'Plusvalia promedio anual',icono:'trending_up'},
  ],
};
"@

$devsBlock = "const DESARROLLOS = [`n" + ($devs -join "`n") + "`n];"

$blogBlock = if ($blogContent) {
    "const BLOG_POSTS = $blogContent;"
} else { "const BLOG_POSTS = [];" }

$ciudadesBlock = if ($ciudadesContent) {
    "const CIUDADES = $ciudadesContent;"
} else { "const CIUDADES = [];" }

$empresaBlock = if ($empresaContent) {
    "const EMPRESA = $empresaContent;"
} else { "const EMPRESA = {};" }

$descargasBlock = if ($descargasContent) {
    "const DESCARGAS = $descargasContent;"
} else { "const DESCARGAS = [];" }

$legalBlock = if ($legalContent) {
    "const LEGAL = $legalContent;"
} else { "const LEGAL = {};" }

$helpersBlock = @"
// ── HELPERS ───────────────────────────────────────────────────────────────────
function getDesarrollos(f){
  var l=[].concat(DESARROLLOS);
  if(!f)return l.sort(function(a,b){return a.orden-b.orden;});
  if(f.ciudad)l=l.filter(function(d){return d.ciudad===f.ciudad;});
  if(f.tipo)l=l.filter(function(d){return d.tipo&&d.tipo.toLowerCase().indexOf(f.tipo.toLowerCase())>-1;});
  if(f.destacado)l=l.filter(function(d){return d.destacado;});
  if(f.zona)l=l.filter(function(d){return d.zona===f.zona;});
  return l.sort(function(a,b){return a.orden-b.orden;});
}
function getDesarrolloBySlug(s){return DESARROLLOS.filter(function(d){return d.slug===s;})[0]||null;}
function getDesarrolloById(i){return DESARROLLOS.filter(function(d){return d.id===parseInt(i);})[0]||null;}
function getImgPrincipal(d){
  if(d.foto_principal_url&&d.foto_principal_url.length>5)return d.foto_principal_url;
  if(d.imagenes&&d.imagenes.length>0&&d.imagenes[0].length>5)return d.imagenes[0];
  return d.imagen_fallback||'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
}
window.CONFIG=CONFIG;
window.DESARROLLOS=DESARROLLOS;
window.BLOG_POSTS=BLOG_POSTS;
window.CIUDADES=CIUDADES;
window.EMPRESA=EMPRESA;
window.DESCARGAS=DESCARGAS;
window.LEGAL=LEGAL;
window.getDesarrollos=getDesarrollos;
window.getDesarrolloBySlug=getDesarrolloBySlug;
window.getDesarrolloById=getDesarrolloById;
window.getImgPrincipal=getImgPrincipal;
"@

$fullContent = @"
// ============================================================
//  data.js -- VEXO Real Estate -- ARCHIVO UNICO CONSOLIDADO
//  Generado: $(Get-Date -Format 'dd/MM/yyyy HH:mm')
//  Fuente: vexo_desarrollos_master ($dataType)
//  Desarrollos: $($devs.Count) | Encoding: UTF-8
//  NO EDITAR MANUALMENTE -- usar actualizar_contenido.ps1
// ============================================================

$configBlock

$devsBlock

$blogBlock

$ciudadesBlock

$empresaBlock

$descargasBlock

$legalBlock

$helpersBlock
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$BASE\src\data\data.js", $fullContent, $utf8NoBom)
OK "data.js escrito: $([math]::Round($fullContent.Length/1024,1))KB"

# ── VERIFICACIÓN ENCODING ────────────────────────────────────────────────
HDR "6. Verificacion encoding y datos"

$verify = [System.IO.File]::ReadAllText("$BASE\src\data\data.js", [System.Text.Encoding]::UTF8)
$badPatterns = @("MÃÂÃÂ","Mrida","Yucatn","Temozn","ultar","61577530904134ltar","MÃ©rida")
$encOK = $true
foreach ($pat in $badPatterns) {
    if ($verify.Contains($pat)) { ERR "Encoding roto: '$pat'"; $encOK = $false }
}
if ($encOK) { OK "Encoding limpio -- sin caracteres corruptos" }

# Verificar longitudes negativas
$posLng = [regex]::Matches($verify, "lng:\d{2,3}\.\d+")
if ($posLng.Count -gt 0) { ERR "Longitudes positivas: $($posLng.Count) casos" }
else { OK "Coordenadas: todas las longitudes son negativas" }

# Verificar foto_principal_url
$fotoCount = ([regex]::Matches($verify, "foto_principal_url:'VEXO_WEB")).Count
OK "foto_principal_url con ruta VEXO_WEB: $fotoCount desarrollos"

# Verificar DESARROLLOS
$devCount = ([regex]::Matches($verify, "id:\d+,")).Count
OK "DESARROLLOS en data.js: $devCount items"

# ── RESUMEN ──────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -FG Cyan
Write-Host "  ║   SINCRONIZACION COMPLETA                           ║" -FG Cyan
Write-Host "  ╠══════════════════════════════════════════════════════╣" -FG Cyan
Write-Host "  ║  Desarrollos: $($devs.Count) procesados                        ║" -FG Green
Write-Host "  ║  Encoding: $(if($encOK){'OK'}else{'REVISAR'})                               ║" -FG $(if($encOK){"Green"}else{"Red"})
Write-Host "  ╚══════════════════════════════════════════════════════╝" -FG Cyan
Write-Host ""
Write-Host "  Siguiente paso: .\publicar_git.ps1" -FG White
Write-Host "  Log: $LOG" -FG DarkGray
Write-Host ""
Add-Content $LOG "FIN: $(Get-Date) | $($devs.Count) devs | encOK=$encOK"
Read-Host "  Presiona Enter para cerrar"
