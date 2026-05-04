// ============================================================
// leaderboard.js — All Supabase queries for the leaderboard
//
// Each mode has its own independent leaderboard (mode column).
// Scores also record the platform they were submitted from.
//
// Required one-time SQL migrations (run in Supabase SQL Editor):
//
//   -- Independent per-mode leaderboards
//   ALTER TABLE leaderboard
//     ADD COLUMN IF NOT EXISTS mode TEXT NOT NULL DEFAULT 'drinks';
//
//   -- Optional: track which platform submitted each score
//   ALTER TABLE leaderboard
//     ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'web';
//
// Both migrations are safe to run more than once (IF NOT EXISTS).
// ============================================================

import { supabase }     from './supabase'
import { getPlatform }  from './platform'

/** Fetch the top N scores for a given mode, ordered highest first. */
export async function getTopScores(mode = 'drinks', limit = 100) {
  if (!supabase) return { data: null, error: 'not_configured' }

  return supabase
    .from('leaderboard')
    .select('id, name, score, created_at')
    .eq('mode', mode)
    .order('score', { ascending: false })
    .limit(limit)
}

/**
 * Returns true when the given score would place in the top 100
 * for the specified mode.  Also returns true when fewer than 100
 * entries exist (the board isn't full yet).
 */
export async function qualifiesForTop100(score, mode = 'drinks') {
  if (!supabase) return false
  if (score <= 0) return false

  const { data } = await supabase
    .from('leaderboard')
    .select('score')
    .eq('mode', mode)
    .order('score', { ascending: false })
    .range(99, 99)

  if (!data || data.length === 0) return true
  return score > data[0].score
}

/**
 * Insert a new score entry.
 *
 * Includes:
 *   mode     — which game mode ('drinks' | 'lol')
 *   platform — where the score came from ('web' | 'ios')
 *
 * Falls back gracefully if either the `mode` or `platform` column doesn't
 * exist yet (Postgres error 42703 = undefined_column).  Once the migrations
 * above are applied, the full insert path is used automatically.
 *
 * Returns { data, error } from Supabase.
 */
export async function submitScore(name, score, mode = 'drinks') {
  if (!supabase) return { data: null, error: 'not_configured' }

  const trimmed  = name.trim().slice(0, 20)
  if (!trimmed)  return { data: null, error: 'empty_name' }

  const platform = getPlatform()   // 'web' | 'ios' | 'android'

  // ── Attempt 1: full insert with mode + platform ────────────────────────
  const r1 = await supabase
    .from('leaderboard')
    .insert([{ name: trimmed, score, mode, platform }])
    .select()
    .single()

  if (!r1.error) return r1

  // ── Attempt 2: missing platform column → try without it ───────────────
  if (r1.error.code === '42703') {
    const r2 = await supabase
      .from('leaderboard')
      .insert([{ name: trimmed, score, mode }])
      .select()
      .single()

    if (!r2.error) return r2

    // ── Attempt 3: missing mode column too → bare insert ────────────────
    if (r2.error.code === '42703') {
      return supabase
        .from('leaderboard')
        .insert([{ name: trimmed, score }])
        .select()
        .single()
    }

    return r2
  }

  return r1
}
