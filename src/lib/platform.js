/**
 * platform.js — Runtime platform detection
 *
 * Works in both browser (Vercel) and Capacitor (iOS) without any build-time
 * changes.  Capacitor injects a global `window.Capacitor` object when the
 * app runs inside a native shell; that object is absent in a plain browser.
 */

/**
 * Returns true when running inside a Capacitor native app (iOS, Android).
 * Returns false in a regular browser tab or Vercel deployment.
 */
export function isNative() {
  return !!(
    typeof window !== 'undefined' &&
    window.Capacitor?.isNativePlatform?.()
  )
}

/**
 * Returns the current platform string:
 *   'ios'     — running in Capacitor on an iPhone/iPad
 *   'android' — running in Capacitor on Android (future)
 *   'web'     — running in a browser (Vercel, localhost, etc.)
 */
export function getPlatform() {
  if (typeof window === 'undefined') return 'web'
  const cap = window.Capacitor
  if (!cap?.isNativePlatform?.()) return 'web'
  return cap.getPlatform?.() ?? 'web'
}
