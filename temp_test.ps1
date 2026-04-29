$idx = "dummy"
if ($idx -match '<script[^>]+src=[^>]*src/data/data\.js') { Write-Host ok } else { Write-Host fail }
