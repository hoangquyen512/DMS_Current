@echo off
cd /d "%~dp0extract-portal-design"
if not exist .env (
  echo Tao file .env tu .env.example va dien PORTAL_USER / PORTAL_PASS
  copy /Y .env.example .env
  notepad .env
  pause
)
call npm install
call npx playwright install chromium
call npm run extract
pause
