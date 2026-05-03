// ============================================================
// GameScreen.jsx
// Core gameplay. The player drags the drink card and drops it
// onto the correct category bucket at the bottom.
//
// Drag mechanic uses the Pointer Events API, which works on
// both mouse and touch screens without any extra library.
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { DRINKS, CATEGORIES } from '../data/drinks'
import DrinkCard from './DrinkCard'

// ── Helpers ───────────────────────────────────────────────────

/** Returns a random drink different from the last one shown. */
function getRandomDrink(current) {
  let pick
  do { pick = DRINKS[Math.floor(Math.random() * DRINKS.length)] }
  while (pick === current)
  return pick
}

/** Timer length in seconds. Decreases by 1 each level, min 5 s. */
function timerForLevel(level) {
  return Math.max(5, 15 - (level - 1))
}

// ── Component ─────────────────────────────────────────────────

function GameScreen({ onGameOver }) {

  // ── Game state ─────────────────────────────────────────────
  const [score,        setScore]        = useState(0)
  const [lives,        setLives]        = useState(3)
  const [level,        setLevel]        = useState(1)
  const [streak,       setStreak]       = useState(0)
  const [currentDrink, setCurrentDrink] = useState(() => getRandomDrink(null))
  const [timeLeft,     setTimeLeft]     = useState(() => timerForLevel(1))
  const [maxTime,      setMaxTime]      = useState(() => timerForLevel(1))
  const [feedback,     setFeedback]     = useState(null)   // 'correct' | 'wrong' | null
  const [levelUpMsg,   setLevelUpMsg]   = useState(false)
  const [paused,       setPaused]       = useState(false)

  // ── Drag state ─────────────────────────────────────────────
  // dragDelta: how far the card has moved from its resting position (px)
  const [isDragging,   setIsDragging]   = useState(false)
  const [dragDelta,    setDragDelta]    = useState({ x: 0, y: 0 })
  // Which bucket (category id) the card is currently hovering over
  const [hoveredCat,   setHoveredCat]   = useState(null)

  // ── Refs ───────────────────────────────────────────────────
  // Refs hold values that need to be read inside callbacks without
  // triggering re-renders or causing stale-closure bugs.
  const livesRef       = useRef(lives)
  const scoreRef       = useRef(score)
  const levelRef       = useRef(level)
  const streakRef      = useRef(streak)
  const hoveredCatRef  = useRef(null)       // mirrors hoveredCat for onPointerUp
  const dragStartRef   = useRef({ x: 0, y: 0 }) // pointer position when drag began
  const bucketRefs     = useRef({})         // { categoryId: DOM element }
  const cardRef        = useRef(null)

  // Keep refs in sync with state
  livesRef.current  = lives
  scoreRef.current  = score
  levelRef.current  = level
  streakRef.current = streak

  // ── Timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (paused) return
    if (timeLeft <= 0) { onTimerEnd(); return }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timeLeft, paused])

  // ── Advance to next drink card ─────────────────────────────
  function showNextDrink(newLevel) {
    const lvl   = newLevel ?? levelRef.current
    const drink = getRandomDrink(currentDrink)
    const t     = timerForLevel(lvl)
    setCurrentDrink(drink)
    setFeedback(null)
    setTimeLeft(t)
    setMaxTime(t)
    setPaused(false)
    // Reset drag state
    setIsDragging(false)
    setDragDelta({ x: 0, y: 0 })
    setHoveredCat(null)
    hoveredCatRef.current = null
  }

  // ── Timer ran out ──────────────────────────────────────────
  function onTimerEnd() {
    setPaused(true)
    setFeedback('wrong')
    const newLives = livesRef.current - 1
    setLives(newLives)
    livesRef.current = newLives
    if (newLives <= 0) { setTimeout(() => onGameOver(scoreRef.current), 800); return }
    setTimeout(() => showNextDrink(), 950)
  }

  // ── Answer evaluation ──────────────────────────────────────
  function evaluate(categoryId) {
    if (paused || !categoryId) return
    setPaused(true)

    if (currentDrink.category === categoryId) {
      // ✅ Correct
      const pts       = 10 + (levelRef.current - 1) * 5
      const newScore  = scoreRef.current + pts
      const newStreak = streakRef.current + 1
      setScore(newScore);  scoreRef.current  = newScore
      setStreak(newStreak); streakRef.current = newStreak
      setFeedback('correct')

      if (newStreak % 5 === 0) {
        const newLevel = levelRef.current + 1
        setLevel(newLevel); levelRef.current = newLevel
        setLevelUpMsg(true)
        setTimeout(() => setLevelUpMsg(false), 1500)
        setTimeout(() => showNextDrink(newLevel), 1000)
      } else {
        setTimeout(() => showNextDrink(), 950)
      }
    } else {
      // ❌ Wrong
      const newLives = livesRef.current - 1
      setLives(newLives); livesRef.current = newLives
      setFeedback('wrong')
      if (newLives <= 0) { setTimeout(() => onGameOver(scoreRef.current), 800); return }
      setTimeout(() => showNextDrink(), 950)
    }
  }

  // ── Drag: pointer down ─────────────────────────────────────
  function onPointerDown(e) {
    if (paused) return
    e.preventDefault()
    // Capture the pointer so move/up events keep firing on this element
    // even when the finger/cursor moves over other elements.
    cardRef.current?.setPointerCapture(e.pointerId)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
    setDragDelta({ x: 0, y: 0 })
  }

  // ── Drag: pointer move ─────────────────────────────────────
  function onPointerMove(e) {
    if (!isDragging) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    setDragDelta({ x: dx, y: dy })

    // Check if the pointer (centre of drag) is over any bucket
    const px = e.clientX
    const py = e.clientY
    let hit = null
    for (const [catId, el] of Object.entries(bucketRefs.current)) {
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
        hit = catId
        break
      }
    }
    hoveredCatRef.current = hit
    setHoveredCat(hit)
  }

  // ── Drag: pointer up (the drop!) ───────────────────────────
  function onPointerUp(e) {
    if (!isDragging) return
    const dropped = hoveredCatRef.current

    setIsDragging(false)
    setDragDelta({ x: 0, y: 0 })   // card snaps back if no bucket was hit
    setHoveredCat(null)
    hoveredCatRef.current = null

    evaluate(dropped)              // null = missed, will do nothing
  }

  // ── Timer bar colour (green → yellow → red) ────────────────
  const timerPct   = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0
  const timerColor = timerPct > 50 ? '#34d399' : timerPct > 25 ? '#fbbf24' : '#ef4444'

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="screen game-screen">

      {/* ── HUD ── */}
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

      {/* ── Timer bar ── */}
      <div className="timer-bar-wrap">
        <div className="timer-bar" style={{ width: `${timerPct}%`, background: timerColor }} />
        <span className="timer-text">{timeLeft}s</span>
      </div>

      {/* ── Level-up announcement ── */}
      {levelUpMsg && (
        <div className="levelup-banner">⬆️ Level {level}! Faster now!</div>
      )}

      {/* ── Correct / wrong flash ── */}
      {feedback && (
        <div className={`feedback-flash feedback-flash--${feedback}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
        </div>
      )}

      {/* ── Drink card (draggable) ── */}
      <div className="card-area">
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
          {CATEGORIES.map(cat => {
            const isHovered = hoveredCat === cat.id
            return (
              <div
                key={cat.id}
                className={`bucket ${isHovered ? 'bucket--hovered' : ''}`}
                style={{ '--cat-color': cat.color }}
                ref={el => { bucketRefs.current[cat.id] = el }}
              >
                {/* Bucket opening (top rim) */}
                <div className="bucket__rim" />
                {/* Bucket body */}
                <div className="bucket__body">
                  <span className="bucket__emoji">{cat.emoji}</span>
                  <span className="bucket__label">{cat.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GameScreen
