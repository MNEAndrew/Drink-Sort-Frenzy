// ============================================================
// Leaderboard.jsx
// Shows the top 100 global scores for a specific game mode,
// fetched from Supabase. Subscribes to realtime inserts so
// the list updates live whenever a new score is submitted.
// ============================================================

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { getTopScores } from '../lib/leaderboard'

const MEDALS = ['🥇', '🥈', '🥉']

function Leaderboard({ onBack, highlightId, modeId = 'drinks', modeName = 'Sort Frenzy' }) {
  const [scores,    setScores]    = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [lastAdded, setLastAdded] = useState(null)

  // ── Fetch scores for this mode from Supabase ───────────────
  async function fetchScores() {
    setLoading(true)
    setError(null)
    const { data, error } = await getTopScores(modeId, 100)
    if (error && error !== 'not_configured') {
      setError('Could not load scores. Check your connection.')
    } else if (error === 'not_configured') {
      setError('Leaderboard not yet set up. See src/lib/supabase.js for instructions.')
    } else {
      setScores(data ?? [])
    }
    setLoading(false)
  }

  // ── Subscribe to realtime inserts (re-fetch on any insert) ─
  useEffect(() => {
    fetchScores()

    if (!supabase) return

    const channel = supabase
      .channel(`leaderboard-live-${modeId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leaderboard' },
        (payload) => {
          // Only update if the new entry is for this mode
          if (payload.new?.mode !== modeId) return
          setLastAdded(payload.new.id)
          fetchScores()
          setTimeout(() => setLastAdded(null), 2500)
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [modeId])

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="screen leaderboard-screen">

      {/* ── Header ── */}
      <div className="lb-header">
        <div className="lb-title-row">
          <span className="lb-trophy">🏆</span>
          <h1 className="lb-title">Top 100</h1>
        </div>
        <p className="lb-subtitle">{modeName} — live global leaderboard</p>
      </div>

      {/* ── Content ── */}
      <div className="lb-content">
        {loading && (
          <div className="lb-loading">
            <div className="lb-spinner" />
            <span>Loading scores…</span>
          </div>
        )}

        {!loading && error && (
          <div className="lb-error">{error}</div>
        )}

        {!loading && !error && scores.length === 0 && (
          <div className="lb-empty">
            No scores yet — be the first! 🏆
          </div>
        )}

        {!loading && !error && scores.length > 0 && (
          <div className="lb-list">
            <div className="lb-row lb-row--header">
              <span className="lb-rank">#</span>
              <span className="lb-name">Player</span>
              <span className="lb-score">Score</span>
            </div>

            {scores.map((entry, i) => {
              const isMe   = entry.id === highlightId
              const isNew  = entry.id === lastAdded
              const isTop3 = i < 3

              return (
                <div
                  key={entry.id}
                  className={[
                    'lb-row',
                    isTop3 ? `lb-row--top${i + 1}` : '',
                    isMe   ? 'lb-row--me'           : '',
                    isNew  ? 'lb-row--new'          : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span className="lb-rank">
                    {isTop3 ? MEDALS[i] : `#${i + 1}`}
                  </span>
                  <span className="lb-name">
                    {entry.name}
                    {isMe  && <span className="lb-you-badge"> YOU</span>}
                    {isNew && <span className="lb-new-badge"> NEW</span>}
                  </span>
                  <span className="lb-score">{entry.score.toLocaleString()}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="lb-footer">
        <button className="btn btn-home" onClick={onBack}>← Back</button>
        <button className="btn btn-refresh" onClick={fetchScores} disabled={loading}>
          {loading ? '…' : '🔄 Refresh'}
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
