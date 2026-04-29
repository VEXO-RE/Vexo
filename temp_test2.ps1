$idx = "dummy"
if ($idx -match '<script[^>]+src=[^>]*src/data/data\.js') { Write-Host "Script ok" } else { Write-Host "No script" }
if ($idx -match 'FUENTE UNICA:\s*src/data/data\.js') { Write-Host "Coment ok" } else { Write-Host "No coment" }
if ($idx -match 'design-system\.css') { Write-Host "CSS ok" } else { Write-Host "No css" }
if ($idx -match '</di\s+<div') { Write-Host "Broken" } else { Write-Host "No broken" }
