# Script: vercel-deploy.ps1
# Flujo completo: logout → login → limpiar token viejo → verificar cuenta → deploy

Write-Host "🚪 Cerrando sesión en Vercel..."
vercel logout

Write-Host "🔑 Iniciando sesión en Vercel..."
vercel login

Write-Host "🧹 Limpiando variable VERCEL_TOKEN antigua..."
setx VERCEL_TOKEN ""

Write-Host "👤 Verificando cuenta activa..."
vercel whoami

Write-Host "🚀 Lanzando deploy en producción..."
vercel --prod
