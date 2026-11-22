@echo off
echo ==============================================================
echo Starting Aditya Pratap Singh Sisodia's Portfolio Web Server...
echo ==============================================================
echo.
echo Opening portfolio in your default browser at http://localhost:3000
echo Press Ctrl+C in this window anytime to stop the server.
echo.
start http://localhost:3000
python -m http.server 3000
pause

