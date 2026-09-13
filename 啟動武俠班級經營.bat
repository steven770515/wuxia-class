@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo 找不到 node，請先安裝 Node.js 再試一次（https://nodejs.org 選 LTS 版本）
    pause
    exit /b 1
)

echo 宗門啟示錄 啟動中...
start "" node server.js
timeout /t 1 /nobreak >nul
start "" http://localhost:8765

echo.
echo 遊戲已經在瀏覽器打開了。關掉這個黑色視窗遊戲就會結束。
echo 這個視窗不要關，關掉伺服器就停了。
pause >nul
