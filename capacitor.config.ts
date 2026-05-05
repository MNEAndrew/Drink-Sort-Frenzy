import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  // Unique reverse-domain bundle identifier — change to match your Apple Developer account
  appId:   'com.mneandrew.drinksortfrenzy',
  appName: 'Sort Frenzy',

  // Vite outputs to /dist — Capacitor copies this into the native project
  webDir: 'dist',

  ios: {
    // Allow the app content to extend under the notch / Dynamic Island
    contentInset: 'automatic',
    // Scroll behaviour: disables the native rubber-band overscroll that looks
    // wrong for a game that fills the full screen
    scrollEnabled: false,
  },

  plugins: {
    // SplashScreen is not installed but leaving a stub here prevents CLI warnings
    // if you add it later.
  },
}

export default config
