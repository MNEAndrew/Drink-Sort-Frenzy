// ============================================================
// GameScreen.jsx
// Core gameplay with drag-and-drop sorting into category buckets.
//
// ── Scoring formula ────────────────────────────────────────
//   timePoints  = 40–100  (how fast you answered; faster = more)
//   levelMult   = 1.0 + (level-1) × 0.1   (every level adds +10%)
//   comboMult   = 1.0 / 1.25 / 1.5 / 1.75 / 2.0
//                 (combo tier based on consecutive correct answers)
//   finalPts    = round(timePoints × levelMult × comboMult)
//
// ── Combo tiers ────────────────────────────────────────────
//   0–2  correct in a row → ×1.0
//   3–5                   → ×1.25  🔥
//   6–9                   → ×1.5   🔥🔥
//   10–14                 → ×1.75  🔥🔥🔥
//   15+                   → ×2.0   🔥🔥🔥🔥
//
// Combo resets to 0 on any wrong answer or timeout.
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { DRINKS, CATEGORIES } from '../data/drinks'
import DrinkCard from './DrinkCard'

// ── Helpers ───────────────────────────────────────────────────

function getRandomDrink(current) {
  let pick
  do { pick = DRINKS[Math.floor(Math.random() * DRINKS.length)] }
  while (pick === current)
  return pick
}

function timerForLevel(level) {
  return Math.max(5, 15 - (level - 1))
}

/**
 * Returns the combo multiplier and flame label for a given combo count.
 *   e.g. getComboInfo(7) → { mult: 1.5, flames: '🔥🔥', label: '×1.5' }
 */
function getComboInfo(combo) {
  if (combo >= 15) return { mult: 2.0,  flames: '🔥🔥🔥🔥', label: '×2.0' }
  if (combo >= 10) return { mult: 1.75, flames: '🔥🔥🔥',   label: '×1.75' }
  if (combo >= 6)  return { mult: 1.5,  flames: '🔥🔥',     label: '×1.5' }
  if (combo >= 3)  return { mult: 1.25, flames: '🔥',       label: '×1.25' }
  return                  { mult: 1.0,  flames: '',          label: '×1.0' }
}

// ── Component ─────────────────────────────────────────────────

function GameScreen({ onGameOver }) {

  // ── Core game state ────────────────────────────────────────
  const [score,        setScore]        = useState(0)
  const [lives,        setLives]        = useState(3)
  const [level,        setLevel]        = useState(1)
  // streak: total correct answers — used to trigger level-ups every 5
  const [streak,       setStreak]       = useState(0)
  // combo: consecutive correct answers — resets on wrong/timeout, drives multiplier
  const [combo,        setCombo]        = useState(0)
  const [currentDrink, setCurrentDrink] = useState(() => getRandomDrink(null))
  const [timeLeft,     setTimeLeft]     = useState(() => timerForLevel(1))
  const [maxTime,      setMaxTime]      = useState(() => timerForLevel(1))
  const [feedback,     setFeedback]     = useState(null)
  const [levelUpMsg,   setLevelUpMsg]   = useState(false)
  const [paused,       setPaused]       = useState(false)
  // pointPop: drives the floating "+N pts" popup after a correct answer
  const [pointPop,     setPointPop]     = useState(null)  // { pts, mult, key }

  // ── Drag state ─────────────────────────────────────────────
  const [isDragging,   setIsDragging]   = useState(false)
  const [dragDelta,    setDragDelta]    = useState({ x: 0, y: 0 })
  const [hoveredCat,   setHoveredCat]   = useState(null)

  // ── Refs (prevent stale-closure bugs in callbacks / setTimeout) ─
  const livesRef      = useRef(lives)
  const scoreRef      = useRef(score)
  const levelRef      = useRef(level)
  const streakRef     = useRef(streak)
  const comboRef      = useRef(combo)
  const timeLeftRef   = useRef(timeLeft)
  const maxTimeRef    = useRef(maxTime)
  const hoveredCatRef = useRef(null)
  const dragStartRef  = useRef({ x: 0, y: 0 })
  const bucketRefs    = useRef({})
  const cardRef       = useRef(null)

  // Keep all refs in sync with state every render
  livesRef.current    = lives
  scoreRef.current    = score
  levelRef.current    = level
  streakRef.current   = streak
  comboRef.current    = combo
  timeLeftRef.current = timeLeft
  maxTimeRef.current  = maxTime

  // ── Timer countdown ────────────────────────────────────────
  useEffect(() => {
    if (paused) return
    if (timeLeft <= 0) { onTimerEnd(); return }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timeLeft, paused])

  // ── Advance to next drink ──────────────────────────────────
  function showNextDrink(newLevel) {
    const lvl = newLevel ?? levelRef.current
    const t   = timerForLevel(lvl)
    setCurrentDrink(getRandomDrink(currentDrink))
    setFeedback(null)
    setTimeLeft(t)
    setMaxTime(t)
    setPaused(false)
    setIsDragging(false)
    setDragDelta({ x: 0, y: 0 })
    setHoveredCat(null)
    hoveredCatRef.current = null
  }

  // ── Timer ran out ──────────────────────────────────────────
  function onTimerEnd() {
    setPaused(true)
    setFeedback('wrong')
    setCombo(0); comboRef.current = 0     // reset combo on timeout
    const newLives = livesRef.current - 1
    setLives(newLives); livesRef.current = newLives
    if (newLives <= 0) { setTimeout(() => onGameOver(scoreRef.current), 800); return }
    setTimeout(() => showNextDrink(), 950)
  }

  // ── Calculate points for a correct answer ─────────────────
  function calcPoints() {
    // Time ratio: 1.0 = answered instantly, 0.0 = last second
    const timeRatio  = maxTimeRef.current > 0
      ? timeLeftRef.current / maxTimeRef.current
      : 0
    // Base: 40 pts minimum, up to 100 for very fast answers
    const timePoints = Math.round(40 + 60 * timeRatio)

    // Level multiplier: +10% per level above 1
    const levelMult  = 1 + (levelRef.current - 1) * 0.1

    // Combo multiplier based on the NEW combo count (after incrementing)
    const newCombo   = comboRef.current + 1
    const { mult: comboMult } = getComboInfo(newCombo)

    const pts = Math.round(timePoints * levelMult * comboMult)
    return { pts, comboMult, newCombo }
  }

  // ── Evaluate dropped answer ────────────────────────────────
  function evaluate(categoryId) {
    if (paused || !categoryId) return
    setPaused(true)

    if (currentDrink.category === categoryId) {
      // ✅ Correct answer
      const { pts, comboMult, newCombo } = calcPoints()
      const newScore  = scoreRef.current + pts
      const newStreak = streakRef.current + 1

      setScore(newScore);    scoreRef.current  = newScore
      setStreak(newStreak);  streakRef.current = newStreak
      setCombo(newCombo);    comboRef.current  = newCombo
      setFeedback('correct')
      // Trigger the floating "+N pts" popup (unique key forces remount/re-animation)
      setPointPop({ pts, comboMult, key: Date.now() })

      // Level-up every 5 correct answers
      if (newStreak % 5 === 0) {
        const newLevel = levelRef.current + 1
        setLevel(newLevel); levelRef.current = newLevel
        setLevelUpMsg(true)
        setTimeout(() => setLevelUpMsg(false), 1600)
        setTimeout(() => showNextDrink(newLevel), 1050)
      } else {
        setTimeout(() => showNextDrink(), 950)
      }
    } else {
      // ❌ Wrong answer — combo resets
      setCombo(0); comboRef.current = 0
      const newLives = livesRef.current - 1
      setLives(newLives); livesRef.current = newLives
      setFeedback('wrong')
      if (newLives <= 0) { setTimeout(() => onGameOver(scoreRef.current), 800); return }
      setTimeout(() => showNextDrink(), 950)
    }
  }

  // ── Drag handlers ──────────────────────────────────────────
  function onPointerDown(e) {
    if (paused) return
    e.preventDefault()
    cardRef.current?.setPointerCapture(e.pointerId)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
    setDragDelta({ x: 0, y: 0 })
  }

  function onPointerMove(e) {
    if (!isDragging) return
    setDragDelta({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    })
    // Detect which bucket the pointer is over
    let hit = null
    for (const [catId, el] of Object.entries(bucketRefs.current)) {
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom) {
        hit = catId; break
      }
    }
    hoveredCatRef.current = hit
    setHoveredCat(hit)
  }

  function onPointerUp(e) {
    if (!isDragging) return
    const dropped = hoveredCatRef.current
    setIsDragging(false)
    setDragDelta({ x: 0, y: 0 })
    setHoveredCat(null)
    hoveredCatRef.current = null
    evaluate(dropped)
  }

  // ── Derived display values ─────────────────────────────────
  const timerPct   = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0
  const timerColor = timerPct > 50 ? '#34d399' : timerPct > 25 ? '#fbbf24' : '#ef4444'

  const { mult: currentComboMult, flames, label: comboLabel } = getComboInfo(combo)
  const levelMultDisplay = (1 + (level - 1) * 0.1).toFixed(1)

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
          {/* Show the level multiplier under the level number */}
          <span className="hud-value">{level}</span>
          <span className="hud-sublabel">Lv.×{levelMultDisplay}</span>
        </div>
      </div>

      {/* ── Timer bar ── */}
      <div className="timer-bar-wrap">
        <div className="timer-bar" style={{ width: `${timerPct}%`, background: timerColor }} />
        <span className="timer-text">{timeLeft}s</span>
      </div>

      {/* ── Combo streak bar (only visible when combo ≥ 1) ── */}
      <div className={`combo-bar ${combo > 0 ? 'combo-bar--active' : ''}`}>
        {combo > 0 ? (
          <>
            <span className="combo-flames">{flames || '🔥'}</span>
            <span className="combo-text">
              <strong>{combo}</strong> combo&nbsp;&nbsp;
              <span className="combo-mult">{comboLabel}</span>
            </span>
          </>
        ) : (
          <span className="combo-idle">Start a combo for bonus multipliers!</span>
        )}
      </div>

      {/* ── Level-up banner ── */}
      {levelUpMsg && (
        <div className="levelup-banner">⬆️ Level {level}! ×{levelMultDisplay} now!</div>
      )}

      {/* ── Correct / wrong flash overlay ── */}
      {feedback && (
        <div className={`feedback-flash feedback-flash--${feedback}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
        </div>
      )}

      {/* ── Drink card (draggable) ── */}
      <div className="card-area">
        {/* Floating "+N pts" popup — key forces re-animation each correct answer */}
        {pointPop && (
          <div key={pointPop.key} className="point-pop">
            +{pointPop.pts}
            {pointPop.comboMult > 1 && (
              <span className="point-pop__mult">×{pointPop.comboMult.toFixed(2)}</span>
            )}
          </div>
        )}

        <DrinkCard
          ref={cardRef}
          drink={currentDrink}
          isDragging={isDragging}
          dragDelta={dragDelta}
          paused={paused}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      </div>

      {/* ── Drop-zone buckets ── */}
      <div className="buckets-section">
        <p className="buckets-prompt">
          {isDragging ? '🎯 Drop it in the right bucket!' : '👆 Drag the card to a category'}
        </p>
        <div className="buckets-row">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className={`bucket ${hoveredCat === cat.id ? 'bucket--hovered' : ''}`}
              style={{ '--cat-color': cat.color }}
              ref={el => { bucketRefs.current[cat.id] = el }}
            >
              <div className="bucket__rim" />
              <div className="bucket__body">
                <span className="bucket__emoji">{cat.emoji}</span>
                <span className="bucket__label">{cat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameScreen
