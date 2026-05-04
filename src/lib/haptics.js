/**
 * haptics.js — Haptic feedback for iOS (via Capacitor Haptics plugin)
 *
 * All functions are safe to call in a regular browser — they silently no-op
 * if Capacitor is not present or the Haptics plugin is unavailable.
 *
 * The @capacitor/haptics package is imported dynamically so it tree-shakes
 * out of the web bundle entirely (Vite will not include it if it's never
 * actually evaluated at runtime in the browser path).
 */

import { isNative } from './platform'

async function getHaptics() {
  if (!isNative()) return null
  try {
    return await import('@capacitor/haptics')
  } catch {
    return null
  }
}

/**
 * Light tap — used for UI button presses.
 */
export async function hapticTap() {
  const h = await getHaptics()
  if (!h) return
  try {
    await h.Haptics.impact({ style: h.ImpactStyle.Light })
  } catch {}
}

/**
 * Medium impact — used on a correct answer.
 */
export async function hapticCorrect() {
  const h = await getHaptics()
  if (!h) return
  try {
    await h.Haptics.impact({ style: h.ImpactStyle.Medium })
  } catch {}
}

/**
 * Heavy impact — used on a wrong answer or losing a life.
 */
export async function hapticWrong() {
  const h = await getHaptics()
  if (!h) return
  try {
    await h.Haptics.impact({ style: h.ImpactStyle.Heavy })
  } catch {}
}

/**
 * Success notification pattern — used on level-up.
 */
export async function hapticLevelUp() {
  const h = await getHaptics()
  if (!h) return
  try {
    await h.Haptics.notification({ type: h.NotificationType.Success })
  } catch {}
}
