// ============================================================
// StartScreen.jsx
// The first screen the player sees. Shows the game title,
// instructions, high score, and a Start button.
// ============================================================

import { CATEGORIES } from '../data/drinks'

function StartScreen({ highScore, onStart }) {
  return (
    <div className="screen start-screen">
      {/* ── Title ── */}
      <div className="start-title-wrap">
        <div className="start-emoji-row">🍹 🍸 ☕ 🥤 🍺</div>
        <h1 className="start-title">Drink Sort Frenzy</h1>
        <p className="start-tagline">Sort drinks before time runs out!</p>
      </div>

      {/* ── High score badge ── */}
      {highScore > 0 && (
        <div className="high-score-badge">
          🏆 Best Score: <strong>{highScore}</strong>
        </div>
      )}

      {/* ── How to play ── */}
      <div className="how-to-play">
        <h2>How to Play</h2>
        <ol>
          <li>A drink card will appear on screen.</li>
          <li>Tap the card to <strong>select</strong> it.</li>
          <li>Tap the correct <strong>category button</strong> to sort it.</li>
          <li>✅ Correct = points! ❌ Wrong = lose a life (❤️).</li>
          <li>Every <strong>5 correct answers</strong> you level up — it gets faster!</li>
        </ol>
      </div>

      {/* ── Category legend ── */}
      <div className="category-legend">
        <h2>Categories</h2>
        <div className="legend-grid">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="legend-item" style={{ borderColor: cat.color }}>
              <span className="legend-emoji">{cat.emoji}</span>
              <span className="legend-label">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Start button ── */}
      <button className="btn btn-start" onClick={onStart}>
        🚀 Start Game
      </button>
    </div>
  )
}

export default StartScreen
