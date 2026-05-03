// ============================================================
// StartScreen.jsx
// Title screen — shows instructions, category legend, high
// score, a Start button, and a Leaderboard button.
// ============================================================

import { CATEGORIES } from '../data/drinks'

function StartScreen({ highScore, onStart, onLeaderboard }) {
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
          🏆 Best Score: <strong>{highScore.toLocaleString()}</strong>
        </div>
      )}

      {/* ── How to play ── */}
      <div className="how-to-play">
        <h2>How to Play</h2>
        <ol>
          <li>A drink card will appear on screen.</li>
          <li><strong>Drag</strong> the card to the correct category bucket.</li>
          <li>✅ Correct = points! ❌ Wrong = lose a life (❤️).</li>
          <li>Answer fast — leftover time adds bonus points.</li>
          <li>Every <strong>5 correct answers</strong> = level up (faster timer).</li>
          <li>Build a <strong>combo streak</strong> for score multipliers 🔥</li>
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

      {/* ── Buttons ── */}
      <button className="btn btn-start" onClick={onStart}>
        🚀 Start Game
      </button>

      <button className="btn btn-leaderboard-start" onClick={onLeaderboard}>
        🏆 Leaderboard
      </button>

      {/* Brand disclaimer */}
      <p className="brand-disclaimer">
        Brand names belong to their respective owners. Fan-made project — not affiliated with any beverage company.
      </p>
    </div>
  )
}

export default StartScreen
