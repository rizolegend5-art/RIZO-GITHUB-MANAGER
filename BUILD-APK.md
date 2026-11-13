# Android APK — RIZO GITHUB MANAGER

1. Upload the CONTENTS of this folder to a new GitHub repository.
2. Install Node.js 20 and run `npm install`.
3. Create an Expo account; run `npx eas-cli login` then `npx eas-cli build:configure`.
4. Put the real EAS project ID into GitHub Actions variable `EXPO_PUBLIC_EAS_PROJECT_ID`.
5. Put your Expo access token into GitHub Actions secret `EXPO_TOKEN`.
6. GitHub → Actions → Build RIZO Android APK → Run workflow.

The workflow starts an EAS preview APK build. APK availability is confirmed only after EAS reports the build completed. Firebase project config is prefilled in `src/firebase.ts`; Firebase Email/Password Auth and Realtime Database must be enabled.
