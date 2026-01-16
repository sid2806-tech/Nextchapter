@echo off
cd /d "%~dp0"
echo Starting NextChapter...
echo.
echo NOTE: Keep this window open. Close it to stop the server.
echo.
node "node_modules/vite/bin/vite.js"
pause
