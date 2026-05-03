// ============================================================
// GameScreen.jsx
// The main gameplay screen. Handles:
//   • Showing the current drink card
//   • Timer countdown (shorter at higher levels)
//   • Score / lives / level display
//   • Category buttons for sorting
//   • Feedback flash (✅ correct / ❌ wrong)
//   • Level-up announcement every 5 correct answers
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { DRINKS, CATEGORIES } from '../data/drinks'
import DrinkCard from './DrinkCard'

// ── Helpers ───────────────────────────────────────────────────

/** Returns a random drink that is different from the current one. */
function getRandomDrink(currentDrink) {
  let pick
  do {
    pick = DRINKS[Math.floor(Math.random() * DRINKS.length)]
  } while (pick === currentDrink)
  return pick
}

/**
 * Timer length in seconds based on current level.
 * Level 1 = 15 s, each level removes 1 s, minimum 5 s.
 */
function timerForLevel(level) {
  return Math.max(5, 15 - (level - 1))
}

// ── Component ─────────────────────────────────────────────────

function GameScreen({ onGameOver }) {

  // ── Game state ─────────────────────────────────────────────
  const [score,         setScore]         = useState(0)
  const [lives,         setLives]         = useState(3)
  const [level,         setLevel]         = useState(1)
  const [streak,        setStreak]        = useState(0)   // correct answers since last level-up
  const [currentDrink,  setCurrentDrink]  = useState(() => getRandomDrink(null))
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [timeLeft,      setTimeLeft]      = useState(() => timerForLevel(1))
  const [maxTime,       setMaxTime]       = useState(() => timerForLevel(1))
  const [feedback,      setFeedback]      = useState(null)  // 'correct' | 'wrong' | null
  const [levelUpMsg,    setLevelUpMsg]    = useState(false)
  const [paused,        setPaused]        = useState(false) // true during feedback delay

  // Refs let us read the latest state values inside setTimeout callbacks
  // without stale-closure bugs.
  const livesRef = useRef(lives)
  const scoreRef = useRef(score)
  const levelRef = useRef(level)
  const streakRef = useRef(streak)

  // Keep refs in sync with state on every render
  livesRef.current  = lives
  scoreRef.current  = score
  levelRef.current  = level
  streakRef.current = streak

  // ── Timer countdown ────────────────────────────────────────
  useEffect(() => {
    if (paused) return           // stop ticking during feedback
    if (timeLeft <= 0) {
      onTimerEnd()               // time ran out
      return
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timeLeft, paused])

  // ── Advance to the next drink card ────────────────────────
  function showNextDrink(newLevel) {
    const lvl   = newLevel ?? levelRef.current
    const drink = getRandomDrink(currentDrink)
    const t     = timerForLevel(lvl)
    setCurrentDrink(drink)
    setSelectedDrink(null)
    setFeedback(null)
    setTimeLeft(t)
    setMaxTime(t)
    setPaused(false)
  }

  // ── Time ran out ────────────────────────────────────────────
  function onTimerEnd() {
    setPaused(true)
    setFeedback('wrong')
    const newLives = livesRef.current - 1
    setLives(newLives)

    if (newLives <= 0) {
      setTimeout(() => onGameOver(scoreRef.current), 800)
      return
    }
    setTimeout(() => showNextDrink(), 900)
  }

  // ── Player picks a category ────────────────────────────────
  function handleCategoryClick(categoryId) {
    if (!selectedDrink) return   // no card selected yet
    if (paused) return           // mid-transition

    setPaused(true)              // freeze the timer during feedback

    const isCorrect = selectedDrink.category === categoryId

    if (isCorrect) {
      // ── Correct answer ──
      const pts      = 10 + (levelRef.current - 1) * 5   // bonus for higher levels
      const newScore = scoreRef.current + pts
      const newStreak = streakRef.current + 1

      setScore(newScore)
      setStreak(newStreak)
      setFeedback('correct')
      scoreRef.current  = newScore
      streakRef.current = newStreak

      // Every 5 correct answers → level up
      if (newStreak % 5 === 0) {
        const newLevel = levelRef.current + 1
        setLevel(newLevel)
        levelRef.current = newLevel
        setLevelUpMsg(true)
        setTimeout(() => setLevelUpMsg(false), 1500)
        setTimeout(() => showNextDrink(newLevel), 1000)
      } else {
        setTimeout(() => showNextDrink(), 900)
      }

    } else {
      // ── Wrong answer ──
      const newLives = livesRef.current - 1
      setLives(newLives)
      setFeedback('wrong')
      livesRef.current = newLives

      if (newLives <= 0) {
        setTimeout(() => onGameOver(scoreRef.current), 800)
        return
      }
      setTimeout(() => showNextDrink(), 900)
    }
  }

  // ── Timer bar colour: green → yellow → red ─────────────────
  const timerPct   = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0
  const timerColor =
    timerPct > 50 ? '#34d399' :
    timerPct > 25 ? '#fbbf24' :
                    '#ef4444'

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="screen game-screen">

      {/* ── HUD: score / lives / level ── */}
      <div className="hud">
        <div className="hud-item">
          <span className="hud-label">Score</span>
          <span className="hud-value">{score}</span>
        </div>
        <div className="hud-item hud-lives">
          <span className="hud-label">Lives</span>
          <span className="hud-value">
            {[0, 1, 2].map(i => (
              <span key={i} className={i < lives ? 'heart active' : 'heart lost'}>❤️</span>
            ))}
          </span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Level</span>
          <span className="hud-value">{level}</span>
        </div>
      </div>

      {/* ── Countdown timer bar ── */}
      <div className="timer-bar-wrap">
        <div
          className="timer-bar"
          style={{ width: `${timerPct}%`, background: timerColor }}
        />
        <span className="timer-text">{timeLeft}s</span>
      </div>

      {/* ── Level-up announcement (pops in from top) ── */}
      {levelUpMsg && (
        <div className="levelup-banner">⬆️ Level {level}! Faster now!</div>
      )}

      {/* ── Correct / wrong flash overlay ── */}
      {feedback && (
        <div className={`feedback-flash feedback-flash--${feedback}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
        </div>
      )}

      {/* ── Drink card (tap to select) ── */}
      <div className="card-area">
        <DrinkCard
          drink={currentDrink}
          isSelected={selectedDrink === currentDrink}
          onClick={() => !paused && setSelectedDrink(currentDrink)}
        />
      </div>

      {/* ── Category buttons ── */}
      <div className="category-buttons">
        <p className="category-prompt">
          {selectedDrink
            ? 'Where does this drink belong?'
            : '👆 Tap the card first, then pick a category'}
        </p>
        <div className="cat-btn-grid">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`btn cat-btn ${selectedDrink ? 'cat-btn--active' : ''}`}
              style={{ '--cat-color': cat.color }}
              onClick={() => handleCategoryClick(cat.id)}
              disabled={!selectedDrink || paused}
            >
              <span className="cat-btn-emoji">{cat.emoji}</span>
              <span className="cat-btn-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameScreen
