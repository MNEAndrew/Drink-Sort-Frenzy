# Drink Sort Frenzy 🍹

A fast-paced drink-sorting party game available as:

- **Web app** — deployed on Vercel
- **iOS app** — built with Capacitor from the same React/Vite codebase

A shared Supabase leaderboard tracks scores from both platforms.

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 18 + | `node --version` |
| npm | 9 + | bundled with Node |
| Xcode | 15 + | macOS only, required for iOS build |
| CocoaPods | 1.14 + | `sudo gem install cocoapods` |

---

## Environment variables

Create a `.env.local` file in the project root (never commit this file):

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5...
```

Vite bakes these into the bundle at **build time**, so the same values work for
both the Vercel deployment and the Capacitor iOS app.

On Vercel, add the same two variables under **Project → Settings → Environment Variables**.

---

## Supabase leaderboard migrations

Run these once in your **Supabase SQL Editor** (`https://supabase.com/dashboard/project/<ref>/sql`):

```sql
-- Separate leaderboard per game mode
ALTER TABLE leaderboard
  ADD COLUMN IF NOT EXISTS mode TEXT NOT NULL DEFAULT 'drinks';

-- (Optional) Track which platform submitted each score
ALTER TABLE leaderboard
  ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'web';
```

Both are safe to re-run (`IF NOT EXISTS`).

---

## Web (Vercel)

```bash
# Install dependencies
npm install

# Local dev server
npm run dev

# Production build (Vercel runs this automatically on push)
npm run build
```

Push to GitHub → Vercel auto-deploys.

---

## iOS (Capacitor)

> **Note:** iOS builds must be done on a Mac with Xcode installed.

### First-time setup

```bash
# 1. Build the Vite app
npm run build

# 2. Add the iOS platform (creates the ios/ Xcode project — run once)
npx cap add ios

# 3. Install CocoaPods dependencies (run inside the ios/App folder)
cd ios/App && pod install && cd ../..

# 4. Sync the web bundle into the native project
npx cap sync ios

# 5. Open the project in Xcode
npx cap open ios
```

Inside Xcode:
1. Select your target device or simulator
2. Set your **Team** (Apple Developer account) under *Signing & Capabilities*
3. Press **▶ Run**

### After every code change

```bash
npm run build        # rebuild the Vite bundle
npx cap sync ios     # copy new bundle into the native project
npx cap open ios     # (optional) open Xcode to run / archive
```

### Publishing to the App Store

1. In Xcode select **Product → Archive**
2. In the Organizer, click **Distribute App → App Store Connect**
3. Follow the guided workflow to upload to App Store Connect
4. Submit for review from [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

---

## Project structure

```
drink-sort-frenzy/
├── capacitor.config.ts   ← Capacitor configuration
├── index.html            ← viewport-fit=cover for iPhone notch
├── vite.config.js        ← Vite build config
├── src/
│   ├── App.jsx           ← Root component, mode registry
│   ├── App.css           ← Global styles + safe-area vars
│   ├── components/
│   │   ├── GameScreen.jsx     ← Gameplay + haptic feedback
│   │   ├── StartScreen.jsx    ← Start screen + alcohol warning
│   │   └── ...
│   ├── data/
│   │   ├── drinks.js     ← Drink card dataset
│   │   └── lol.js        ← LoL champion dataset
│   └── lib/
│       ├── platform.js   ← isNative() / getPlatform()
│       ├── haptics.js    ← Capacitor Haptics (no-op in browser)
│       ├── leaderboard.js← Supabase queries (mode + platform fields)
│       ├── supabase.js   ← Supabase client init
│       └── drinkImages.js← Open Food Facts runtime image fetcher
└── ios/                  ← Generated Xcode project (do not edit manually)
```

---

## How platform detection works

`src/lib/platform.js` checks `window.Capacitor?.isNativePlatform()`:

- Returns `'ios'` when running inside Capacitor on iPhone/iPad
- Returns `'web'` in any browser (Vercel, localhost, Safari)

This value is automatically included in leaderboard score submissions so you
can filter the leaderboard by platform if desired.

## Haptic feedback

`src/lib/haptics.js` uses the `@capacitor/haptics` plugin:

- **Correct answer** → medium impact
- **Wrong answer** → heavy impact  
- **Level up** → success notification pattern

All haptic functions silently no-op in the browser, so no error handling is needed.

---

## Disclaimer

Brand names used in this game belong to their respective owners.
This project is fan-made and not affiliated with any beverage company or Riot Games.
