// ============================================================
// GameScreen.jsx
// Core gameplay with drag-and-drop sorting.
//
// Visual effects fired by this component:
//   Correct answer   → confetti particle burst
//   Combo milestone  → bigger burst + full-screen flash + milestone banner
//   Level up         → large burst + flash + level banner
//   Wrong / timeout  → screen shake + red flash
//
// Combo milestone tiers & messages:
//   combo 3  → 🔥  "ON FIRE!"        (tier 1)
//   combo 6  → 🔥🔥 "BLAZING!"       (tier 2)
//   combo 10 → ⚡   "UNSTOPPABLE!"   (tier 3, + shake)
//   combo 15+→ 💥   "GODLIKE!"       (tier 4, + shake, repeats every 5)
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { DRINKS, CATEGORIES } from '../data/drinks'
import DrinkCard from './DrinkCard'
import Particles from './Particles'

// ── Helpers ──────────────────────────────────────────────────

function getRandomDrink(current) {
  let pick
  do { pick = DRINKS[Math.floor(Math.random() * DRINKS.length)] }
  while (pick === current)
  return pick
}

function timerForLevel(level) {
  // −2 s every level, floor at 4 s
  // Level 1=15s  2=13s  3=11s  4=9s  5=7s  6=5s  7+=4s
  return Math.max(4, 15 - (level - 1) * 2)
}

function getComboInfo(combo) {
  if (combo >= 15) return { mult: 2.0,  flames: '🔥🔥🔥🔥', label: '×2.0' }
  if (combo >= 10) return { mult: 1.75, flames: '🔥🔥🔥',   label: '×1.75' }
  if (combo >= 6)  return { mult: 1.5,  flames: '🔥🔥',     label: '×1.5' }
  if (combo >= 3)  return { mult: 1.25, flames: '🔥',       label: '×1.25' }
  return                  { mult: 1.0,  flames: '',          label: '×1.0' }
}

/** Returns the milestone config if newCombo hits a trigger point, else null. */
function getMilestoneForCombo(newCombo) {
  if (newCombo === 3)                          return { text: '🔥 ON FIRE!',       tier: 1, burst: 'combo3'  }
  if (newCombo === 6)                          return { text: '🔥🔥 BLAZING!',     tier: 2, burst: 'combo6'  }
  if (newCombo === 10)                         return { text: '⚡ UNSTOPPABLE!',   tier: 3, burst: 'combo10' }
  if (newCombo >= 15 && newCombo % 5 === 0)    return { text: '💥 GODLIKE!',       tier: 4, burst: 'combo15' }
  return null
}

// ── Component ─────────────────────────────────────────────────

function GameScreen({ onGameOver }) {

  // ── Core game state ────────────────────────────────────────
  const [score,        setScore]        = useState(0)
  const [lives,        setLives]        = useState(3)
  const [level,        setLevel]        = useState(1)
  const [streak,       setStreak]       = useState(0)   // total correct → level-ups
  const [combo,        setCombo]        = useState(0)   // consecutive correct → multiplier
  const [currentDrink, setCurrentDrink] = useState(() => getRandomDrink(null))
  const [timeLeft,     setTimeLeft]     = useState(() => timerForLevel(1))
  const [maxTime,      setMaxTime]      = useState(() => timerForLevel(1))
  const [feedback,     setFeedback]     = useState(null)
  const [levelUpMsg,   setLevelUpMsg]   = useState(false)
  const [paused,       setPaused]       = useState(false)
  const [pointPop,     setPointPop]     = useState(null)  // { pts, mult, key }

  // ── Visual effects state ───────────────────────────────────
  // Array of active particle bursts — each removed after its animation ends
  const [bursts,     setBursts]     = useState([])  // [{ id, type }]
  // Array of active screen flashes — same pattern
  const [flashes,    setFlashes]    = useState([])  // [{ id, color, opacity }]
  // Combo milestone banner
  const [milestone,  setMilestone]  = useState(null) // { text, tier, key }
  // Screen shake: toggling this key forces the animation to restart
  const [shakeKey,   setShakeKey]   = useState(0)

  // ── Drag state ─────────────────────────────────────────────
  const [isDragging,  setIsDragging]  = useState(false)
  const [dragDelta,   setDragDelta]   = useState({ x: 0, y: 0 })
  const [hoveredCat,  setHoveredCat]  = useState(null)

  // ── Refs (stale-closure guard) ─────────────────────────────
  const livesRef      = useRef(lives)
  const scoreRef      = useRef(score)
  const levelRef      = useRef(level)
  const streakRef     = useRef(streak)
  const comboRef      = useRef(combo)
  const timeLeftRef   = useRef(timeLeft)
  const maxTimeRef    = useRef(maxTime)
  const hoveredCatRef  = useRef(null)
  const dragStartRef   = useRef({ x: 0, y: 0 })
  // The card's centre in screen coordinates at the moment dragging starts.
  // Used to keep the card centred on the pointer throughout the drag.
  const cardCenterRef  = useRef({ x: 0, y: 0 })
  const bucketRefs     = useRef({})
  const cardRef       = useRef(null)
  const gameScreenRef = useRef(null)

  livesRef.current    = lives
  scoreRef.current    = score
  levelRef.current    = level
  streakRef.current   = streak
  comboRef.current    = combo
  timeLeftRef.current = timeLeft
  maxTimeRef.current  = maxTime

  // ── Timer ──────────────────────────────────────────────────
  useEffect(() => {
    if (paused) return
    if (timeLeft <= 0) { onTimerEnd(); return }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timeLeft, paused])

  // ── Effect helpers ─────────────────────────────────────────

  /** Spawn a particle burst. Auto-removes after animation finishes. */
  function addBurst(type) {
    const id = Date.now() + Math.random()
    setBursts(prev => [...prev, { id, type }])
    setTimeout(() => setBursts(prev => prev.filter(b => b.id !== id)), 1500)
  }

  /**
   * Flash the entire screen with a coloured overlay.
   * @param {string} color  – CSS color value
   * @param {number} alpha  – peak opacity (0–1)
   */
  function addFlash(color, alpha = 0.35) {
    const id = Date.now() + Math.random()
    setFlashes(prev => [...prev, { id, color, alpha }])
    setTimeout(() => setFlashes(prev => prev.filter(f => f.id !== id)), 750)
  }

  /**
   * Shake the game screen element by briefly adding a CSS animation class.
   * We force a reflow between class removal and addition so the browser
   * always restarts the animation even if shaken back-to-back.
   */
  function triggerShake() {
    const el = gameScreenRef.current
    if (!el) return
    el.classList.remove('game-screen--shake')
    void el.offsetWidth          // force reflow
    el.classList.add('game-screen--shake')
    setTimeout(() => el.classList.remove('game-screen--shake'), 550)
  }

  /** Show a combo milestone banner and auto-hide it. */
  function showMilestone(text, tier) {
    setMilestone({ text, tier, key: Date.now() })
    setTimeout(() => setMilestone(null), 1900)
  }

  // ── Next drink ─────────────────────────────────────────────
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
    setCombo(0); comboRef.current = 0
    const newLives = livesRef.current - 1
    setLives(newLives); livesRef.current = newLives

    // Screen shake + red flash
    triggerShake()
    addFlash('#ef4444', 0.3)

    if (newLives <= 0) { setTimeout(() => onGameOver(scoreRef.current), 850); return }
    setTimeout(() => showNextDrink(), 1000)
  }

  // ── Scoring ────────────────────────────────────────────────
  function calcPoints(newCombo) {
    const timeRatio  = maxTimeRef.current > 0 ? timeLeftRef.current / maxTimeRef.current : 0
    const timePoints = Math.round(40 + 60 * timeRatio)
    const levelMult  = 1 + (levelRef.current - 1) * 0.1
    const { mult: comboMult } = getComboInfo(newCombo)
    return { pts: Math.round(timePoints * levelMult * comboMult), comboMult }
  }

  // ── Answer evaluation ──────────────────────────────────────
  function evaluate(categoryId) {
    if (paused || !categoryId) return
    setPaused(true)

    if (currentDrink.category === categoryId) {
      // ✅ Correct
      const newCombo  = comboRef.current + 1
      const newStreak = streakRef.current + 1
      const { pts, comboMult } = calcPoints(newCombo)
      const newScore  = scoreRef.current + pts

      setScore(newScore);   scoreRef.current  = newScore
      setStreak(newStreak); streakRef.current = newStreak
      setCombo(newCombo);   comboRef.current  = newCombo
      setFeedback('correct')
      setPointPop({ pts, comboMult, key: Date.now() })

      // ── Fire effects ──────────────────────────────────────
      const ms = getMilestoneForCombo(newCombo)
      if (ms) {
        // Combo milestone: big burst + flash + shake (tier 3+) + banner
        addBurst(ms.burst)
        showMilestone(ms.text, ms.tier)
        const flashColors = { 1: '#f97316', 2: '#ef4444', 3: '#a78bfa', 4: '#ffd700' }
        addFlash(flashColors[ms.tier] ?? '#ffd700', 0.28 + ms.tier * 0.04)
        if (ms.tier >= 3) triggerShake()
      } else {
        // Regular correct answer: small confetti
        addBurst('correct')
      }

      // ── Level-up every 5 correct answers ──────────────────
      if (newStreak % 5 === 0) {
        const newLevel = levelRef.current + 1
        setLevel(newLevel); levelRef.current = newLevel
        setLevelUpMsg(true)
        addBurst('levelup')
        addFlash('#60a5fa', 0.32)
        setTimeout(() => setLevelUpMsg(false), 1700)
        setTimeout(() => showNextDrink(newLevel), 1100)
      } else {
        setTimeout(() => showNextDrink(), 1000)
      }

    } else {
      // ❌ Wrong — reset combo, shake, red flash
      setCombo(0); comboRef.current = 0
      const newLives = livesRef.current - 1
      setLives(newLives); livesRef.current = newLives
      setFeedback('wrong')
      triggerShake()
      addFlash('#ef4444', 0.3)
      if (newLives <= 0) { setTimeout(() => onGameOver(scoreRef.current), 850); return }
      setTimeout(() => showNextDrink(), 1000)
    }
  }

  // ── Drag handlers ──────────────────────────────────────────
  function onPointerDown(e) {
    if (paused) return
    e.preventDefault()
    cardRef.current?.setPointerCapture(e.pointerId)

    // Record the card's centre so every pointer-move can translate the card
    // such that its centre stays exactly under the pointer.
    const rect = cardRef.current.getBoundingClientRect()
    cardCenterRef.current = {
      x: rect.left + rect.width  / 2,
      y: rect.top  + rect.height / 2,
    }

    // Set initial delta immediately so the card snaps to the pointer on the
    // very first frame with no visible jump.
    const initialDelta = {
      x: e.clientX - cardCenterRef.current.x,
      y: e.clientY - cardCenterRef.current.y,
    }
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
    setDragDelta(initialDelta)
  }

  function onPointerMove(e) {
    if (!isDragging) return
    // Keep the card centred on the pointer at all times
    setDragDelta({
      x: e.clientX - cardCenterRef.current.x,
      y: e.clientY - cardCenterRef.current.y,
    })
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
  const { flames, label: comboLabel } = getComboInfo(combo)
  const levelMultDisplay = (1 + (level - 1) * 0.1).toFixed(1)

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="screen game-screen" ref={gameScreenRef}>

      {/* ── Particle bursts (fixed, above everything) ── */}
      {bursts.map(b => <Particles key={b.id} type={b.type} />)}

      {/* ── Screen flash overlays ── */}
      {flashes.map(f => (
        <div
          key={f.id}
          className="screen-flash"
          style={{ background: f.color, '--flash-alpha': f.alpha }}
        />
      ))}

      {/* ── Combo milestone banner ── */}
      {milestone && (
        <div
          key={milestone.key}
          className={`milestone-banner milestone-banner--tier-${milestone.tier}`}
        >
          {milestone.text}
        </div>
      )}

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
          <span className="hud-sublabel">Lv.×{levelMultDisplay}</span>
        </div>
      </div>

      {/* ── Timer bar ── */}
      <div className="timer-bar-wrap">
        <div className="timer-bar" style={{ width: `${timerPct}%`, background: timerColor }} />
        <span className="timer-text">{timeLeft}s</span>
      </div>

      {/* ── Combo bar ── */}
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

      {/* ── Correct / wrong flash ── */}
      {feedback && (
        <div className={`feedback-flash feedback-flash--${feedback}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
        </div>
      )}

      {/* ── Drink card (draggable) ── */}
      <div className="card-area">
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
