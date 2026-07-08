@echo off
REM Gắn col-check + kiểm tra portal scripts (cần Python trong PATH)
cd /d "%~dp0.."
py -3 scripts\apply_portal_bridge.py 2>nul || python scripts\apply_portal_bridge.py
pause
