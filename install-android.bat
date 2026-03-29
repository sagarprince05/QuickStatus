@echo off
cd /d C:\Users\Prince\Desktop\AI_Apps\craffto\CraftoApp

REM Start Metro dev server
echo.
echo ====================================
echo Starting Metro Dev Server...
echo ====================================
echo.
start "Metro Dev Server" cmd /k npm start -- --port 8081

REM Wait for server to start
timeout /t 5 /nobreak

REM Build and install APK
echo.
echo ====================================
echo Building and Installing APK...
echo ====================================
echo.
cd android
call gradlew.bat installDebug -PreactNativeDevServerPort=8081

REM Done
echo.
echo ====================================
echo Installation Complete!
echo ====================================
if exist "%cd%\..\..\..\app\src\main\AndroidManifest.xml" (
    echo App should be installing on your connected device...
)

pause
