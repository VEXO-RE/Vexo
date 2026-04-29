@echo off
REM ============================================================================
REM VEXO MASTER OPTIMIZADO - Test rápido de validación
REM Ejecutar con: test_vexo.bat
REM ============================================================================

setlocal enabledelayedexpansion

set BASE=C:\Users\HP-Home\Documents\Projectos_Rosalia\VEXO_MASTER_OPTIMIZADO

cls
echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║  VEXO MASTER - TEST RÁPIDO DE VALIDACIÓN              ║
echo  ║  2026-04-29                                            ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

REM Test 1: Archivos core
echo  [TEST 1] Verificando archivos core...
if exist "%BASE%\index.html" (
    echo    ✓ index.html
) else (
    echo    ✗ index.html FALTA
)

if exist "%BASE%\mapa.html" (
    echo    ✓ mapa.html
) else (
    echo    ✗ mapa.html FALTA
)

if exist "%BASE%\actualizar_contenido.ps1" (
    echo    ✓ actualizar_contenido.ps1
) else (
    echo    ✗ actualizar_contenido.ps1 FALTA
)

if exist "%BASE%\revisar_antes_de_git.ps1" (
    echo    ✓ revisar_antes_de_git.ps1
) else (
    echo    ✗ revisar_antes_de_git.ps1 FALTA
)

REM Test 2: Archivos de datos
echo.
echo  [TEST 2] Verificando archivos de datos...
if exist "%BASE%\src\data\data.js" (
    echo    ✓ data.js
) else (
    echo    ✗ data.js FALTA
)

if exist "%BASE%\src\data\config.js" (
    echo    ✓ config.js
) else (
    echo    ✗ config.js FALTA
)

if exist "%BASE%\src\data\blog.js" (
    echo    ✓ blog.js
) else (
    echo    ✗ blog.js FALTA
)

REM Test 3: Estilos
echo.
echo  [TEST 3] Verificando estilos...
if exist "%BASE%\src\styles\design-system.css" (
    echo    ✓ design-system.css
) else (
    echo    ✗ design-system.css FALTA
)

if exist "%BASE%\vexo-premium.css" (
    echo    ✓ vexo-premium.css
) else (
    echo    ✗ vexo-premium.css FALTA
)

REM Test 4: Ejecutar revisar_antes_de_git
echo.
echo  [TEST 4] Ejecutando validación completa...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%BASE%\revisar_antes_de_git.ps1"

echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║  TEST COMPLETADO                                       ║
echo  ║  Próximo paso: .\actualizar_contenido.ps1             ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

pause
