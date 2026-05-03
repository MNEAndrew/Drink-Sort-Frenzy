// ============================================================
// leaderboard.js — All Supabase queries for the leaderboard
//
// Each mode has its own independent leaderboard.
// The `leaderboard` table needs a `mode` column:
//
//   ALTER TABLE leaderboard
//     ADD COLUMN IF NOT EXISTS mode TEXT NOT NULL DEFAULT 'drinks';
//
// Run this once in your Supabase SQL Editor.
// ============================================================

import { supabase } from './supabase'

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
 * for the specified mode. Also returns true when fewer than 100
 * entries exist for that mode.
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

  // No 100th entry yet → automatically qualifies
  if (!data || data.length === 0) return true

  return score > data[0].score
}

/**
 * Insert a new score entry for a given mode.
 * Returns { data, error } from Supabase.
 */
export async function submitScore(name, score, mode = 'drinks') {
  if (!supabase) return { data: null, error: 'not_configured' }

  const trimmed = name.trim().slice(0, 20)
  if (!trimmed) return { data: null, error: 'empty_name' }

  return supabase
    .from('leaderboard')
    .insert([{ name: trimmed, score, mode }])
    .select()
    .single()
}
