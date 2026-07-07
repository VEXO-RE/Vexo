# Elimina espacios en blanco accidentales y normaliza finales de línea
$files = Get-ChildItem *.js, *.css
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content.Trim()
    Set-Content $file.FullName $content -Encoding UTF8
    Write-Host "Procesado: $($file.Name)"
}
Write-Host "Limpieza terminada. Verifica las rutas de tus imágenes." -ForegroundColor Green