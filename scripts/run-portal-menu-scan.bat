@echo off
cd /d "%~dp0scan-portal-menu"
if not exist .env (
  if exist ..\extract-portal-design\.env (
    echo Dung .env tu extract-portal-design
  ) else (
    copy /Y ..\extract-portal-design\.env.example .env
    echo Tao .env - dien PORTAL_USER / PORTAL_PASS
    notepad .env
    pause
  )
)
call npm install
call npx playwright install chromium
call npm run scan
pause
