// ============================================================
// GameOverScreen.jsx
// Shows final score, handles leaderboard qualification check,
// name entry, and submission.
// ============================================================

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { qualifiesForTop100, submitScore } from '../lib/leaderboard'

// Submission states
const STATE = {
  CHECKING:   'checking',   // checking if score qualifies
  QUALIFIES:  'qualifies',  // shows name-entry form
  SUBMITTING: 'submitting', // waiting for Supabase insert
  SUBMITTED:  'submitted',  // success
  NO_QUALIFY: 'no_qualify', // score didn't make top 100
  UNAVAIL:    'unavail',    // Supabase not configured
}

function GameOverScreen({ score, highScore, isNewHighScore, onRestart, onHome, onLeaderboard }) {
  const [submitState, setSubmitState] = useState(
    (supabase && onLeaderboard) ? STATE.CHECKING : STATE.UNAVAIL
  )
  const [playerName, setPlayerName] = useState('')
  const [nameError,  setNameError]  = useState('')
  const [submittedId, setSubmittedId] = useState(null)  // id of the inserted row

  // ── Check qualification on mount ──────────────────────────
  useEffect(() => {
    if (!supabase || !onLeaderboard || score <= 0) {
      setSubmitState((!supabase || !onLeaderboard) ? STATE.UNAVAIL : STATE.NO_QUALIFY)
      return
    }

    qualifiesForTop100(score).then(qualifies => {
      setSubmitState(qualifies ? STATE.QUALIFIES : STATE.NO_QUALIFY)
    })
  }, [score])

  // ── Handle name submission ─────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = playerName.trim()
    if (!trimmed) { setNameError('Please enter a name.'); return }
    if (trimmed.length > 20) { setNameError('Max 20 characters.'); return }

    setNameError('')
    setSubmitState(STATE.SUBMITTING)

    const { data, error } = await submitScore(trimmed, score)

    if (error) {
      setNameError('Submission failed — please try again.')
      setSubmitState(STATE.QUALIFIES)
    } else {
      setSubmittedId(data?.id ?? null)
      setSubmitState(STATE.SUBMITTED)
    }
  }

  // ── Motivational message ───────────────────────────────────
  const message =
    score === 0  ? "Don't give up — you've got this! 💪" :
    score < 30   ? 'Nice try! Keep sorting! 🍹' :
    score < 80   ? "Great effort! You're getting the hang of it! ✨" :
                   'Outstanding sorting skills! 🏆'

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="screen gameover-screen">

      {/* ── Title ── */}
      <div className="gameover-title-wrap">
        <div className="gameover-emoji">😵</div>
        <h1 className="gameover-title">Game Over!</h1>
      </div>

      {/* ── Score cards ── */}
      <div className="gameover-scores">
        <div className="gameover-score-card">
          <span className="score-label">Your Score</span>
          <span className="score-value">{score.toLocaleString()}</span>
        </div>
        <div className="gameover-score-card">
          <span className="score-label">Best Score</span>
          <span className="score-value">🏆 {highScore.toLocaleString()}</span>
        </div>
      </div>

      {/* ── New high score ── */}
      {isNewHighScore && (
        <div className="new-highscore-banner">🎉 New Personal Best!</div>
      )}

      <p className="gameover-message">{message}</p>

      {/* ── Play again / home ── */}
      <div className="gameover-buttons">
        <button className="btn btn-restart" onClick={onRestart}>🔄 Play Again</button>
        <button className="btn btn-home"    onClick={onHome}>🏠 Menu</button>
      </div>

      {/* ── Leaderboard section (below the action buttons) ── */}
      <div className="lb-submit-box">

        {submitState === STATE.CHECKING && (
          <div className="lb-checking">
            <div className="lb-spinner" />
            <span>Checking leaderboard…</span>
          </div>
        )}

        {submitState === STATE.UNAVAIL && (
          <p className="lb-unavail">
            🔌 Live leaderboard not configured yet.
          </p>
        )}

        {submitState === STATE.NO_QUALIFY && score > 0 && (
          <p className="lb-no-qualify">
            You didn't crack the top 100 this time — keep trying! 💪
          </p>
        )}

        {submitState === STATE.QUALIFIES && (
          <div className="lb-qualify-section">
            <p className="lb-qualify-msg">🎉 You qualify for the Top 100!</p>
            <form className="lb-name-form" onSubmit={handleSubmit}>
              <input
                className="lb-name-input"
                type="text"
                placeholder="Enter your name (max 20 chars)"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                maxLength={20}
                autoFocus
              />
              {nameError && <p className="lb-name-error">{nameError}</p>}
              <button className="btn btn-submit-score" type="submit">
                🏆 Submit Score
              </button>
            </form>
          </div>
        )}

        {submitState === STATE.SUBMITTING && (
          <div className="lb-checking">
            <div className="lb-spinner" />
            <span>Submitting…</span>
          </div>
        )}

        {submitState === STATE.SUBMITTED && (
          <div className="lb-submitted">
            <p>✅ Score submitted! You're on the board.</p>
            <button
              className="btn btn-view-lb"
              onClick={() => onLeaderboard(submittedId)}
            >
              🏆 View Leaderboard
            </button>
          </div>
        )}
      </div>

      {/* ── Leaderboard button (only when leaderboard is available) ── */}
      {onLeaderboard && (submitState === STATE.NO_QUALIFY || submitState === STATE.UNAVAIL) && (
        <button className="btn btn-view-lb" onClick={() => onLeaderboard(null)}>
          🏆 View Leaderboard
        </button>
      )}

    </div>
  )
}

export default GameOverScreen
