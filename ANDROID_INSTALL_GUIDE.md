# CraftoApp - Android Device Installation Guide

## Status
✅ Metro Dev Server: Running on port 8081  
❌ Gradle Build: Java version compatibility issue (Gradle 7.6.3 requires Java 17+, your system has older Java)

## Solution: Manual APK Build via Android Studio OR Use ADB

### Option 1: Build via Android Studio (Recommended)

1. **Open Android Studio**
   - File → Open → Navigate to `C:\Users\Prince\Desktop\AI_Apps\craffto\CraftoApp\android`
   - Click OK

2. **Android Studio will:**
   - Auto-detect SDK and configure paths
   - Download required dependencies
   - Setup proper Java version

3. **Build the APK**
   - In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Wait for "Build Analyzer" window showing "Build completed successfully"

4. **Install on Device**
   - Connect your Android device via USB
   - Run → Run 'app'
   - Select your device from the list
   - Click OK

### Option 2: Command Line with Android Studio's Java

```bash
# Navigate to project
cd C:\Users\Prince\Desktop\AI_Apps\craffto\CraftoApp

# Start dev server (if not running)
npm start -- --port 8081

# In another terminal, set JAVA_HOME to Android Studio's JDK
setx JAVA_HOME "C:\Program Files\Android\Android Studio\jre"

# Build and install
npx react-native run-android
```

### Option 3: Manual Installation via ADB

If you have Android SDK installed:

```bash
# Start dev server
npm start -- --port 8081

# In another terminal
cd C:\Users\Prince\Desktop\AI_Apps\craffto\CraftoApp\android

# Build
gradlew assembleDebug

# Install on connected device
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Prerequisites

### Required:
- ✅ Node.js & npm
- ✅ React Native 0.76
- ❌ Java 17+ (you have older version)
- ❌ Android SDK (not configured)
- ❌ Android device or emulator

### How to Fix Java Issue:
1. Download & install Java 17+ from oracle.com
2. Or use Android Studio's bundled JDK (recommended)

## Recommended Next Steps

1. **Install Android Studio** (includes Java 17+, Android SDK, and emulators)
   - Download from: developer.android.com/studio
   - Install with default settings
   - Open your project in Android Studio

2. **Or install Java 17+** separately
   - Download from: oracle.com/java/technologies/downloads
   - Add to PATH
   - Run: `java -version` to verify

3. **Connect Android Device via USB**
   - Enable USB Debugging: Settings → Developer Options → USB Debugging → On
   - Connect to computer

4. **Run the app**
   ```bash
   npm start -- --port 8081
   npx react-native run-android
   ```

## Your App Features (Ready to Deploy)

✅ Religion-based image filtering  
✅ 43 total images (Hindu, Muslim, Sikh, Christian)  
✅ Tab-based navigation  
✅ Dark theme UI  
✅ Image grid and viewer modal  

## File Structure
```
CraftoApp/
├── App.tsx                      (Main app)
├── data.ts                      (Image data)
├── assets/images/               (All 43 images)
│   ├── hindu/                  (10 images)
│   ├── muslim/                 (10 images)
│   ├── christian/              (12 images)
│   └── sikh/                   (11 images)
└── android/                    (Android native code)
```

## Quick Commands Reference

| When | Command |
|------|---------|
| Start Dev Server | `npm start` |
| Build APK | `gradlew assembleDebug` (in android/) |
| Install to Device | `adb install -r app/build/outputs/apk/debug/app-debug.apk` |
| Open in Android Studio | Open `android/` folder in Android Studio |
| Check Environment | `npx react-native doctor` |

## Support

If you still encounter issues:
1. Ensure Android SDK is in the PATH
2. Set ANDROID_HOME environment variable
3. Install latest Java (17+)
4. Use Android Studio's built-in tools instead of command line

The JavaScript/TypeScript code is fully ready. Android Gradle build issues are purely environment setup related!
