@echo off
chcp 65001 >nul
REM Aufnahme (mkv/mp4) einfach auf diese Datei ziehen.
if "%~1"=="" (
  echo Zieh deine Stream-Aufnahme auf diese Datei.
  pause
  exit /b
)
cd /d "%~dp0"
python clipper.py "%~1" --gpu
echo.
echo Fertig. Oeffne im Ordner clips_... die Datei freigabe.html
pause
