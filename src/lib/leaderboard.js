// ============================================================
// leaderboard.js — All Supabase queries for the leaderboard
// ============================================================

import { supabase } from './supabase'

/** Fetch the top N scores ordered highest first. */
export async function getTopScores(limit = 100) {
  if (!supabase) return { data: null, error: 'not_configured' }

  return supabase
    .from('leaderboard')
    .select('id, name, score, created_at')
    .order('score', { ascending: false })
    .limit(limit)
}

/**
 * Returns true when the given score would place in the top 100.
 * Also returns true when fewer than 100 entries exist.
 */
export async function qualifiesForTop100(score) {
  if (!supabase) return false
  if (score <= 0) return false

  // Fetch the score at rank 100 (0-indexed → range 99,99)
  const { data } = await supabase
    .from('leaderboard')
    .select('score')
    .order('score', { ascending: false })
    .range(99, 99)

  // No 100th entry yet → automatically qualifies
  if (!data || data.length === 0) return true

  return score > data[0].score
}

/**
 * Insert a new score entry.
 * Returns { data, error } from Supabase.
 */
export async function submitScore(name, score) {
  if (!supabase) return { data: null, error: 'not_configured' }

  const trimmed = name.trim().slice(0, 20)
  if (!trimmed) return { data: null, error: 'empty_name' }

  return supabase
    .from('leaderboard')
    .insert([{ name: trimmed, score }])
    .select()
    .single()
}
