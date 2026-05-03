// ============================================================
// StartScreen.jsx
// Title screen — shows mode-specific title, instructions,
// category/region legend, high score, and action buttons.
// ============================================================

function StartScreen({ mode, highScore, onStart, onLeaderboard, onChangeMode }) {
  const { categories, name, emoji, tagline, noun = 'category', disclaimer } = mode

  // Build a decorative emoji row from the first 5 category emojis
  const emojiRow = categories.slice(0, 5).map(c => c.emoji).join(' ')

  return (
    <div className="screen start-screen">

      {/* ── Title ── */}
      <div className="start-title-wrap">
        <div className="start-emoji-row">{emojiRow}</div>
        <h1 className="start-title">{name}</h1>
        <p className="start-tagline">{tagline}</p>
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
          <li>A card will appear on screen.</li>
          <li><strong>Drag</strong> it to the correct {noun} bucket.</li>
          <li>✅ Correct = points! ❌ Wrong = lose a life (❤️).</li>
          <li>Answer fast — leftover time adds bonus points.</li>
          <li>Every <strong>5 correct</strong> = level up (faster timer).</li>
          <li>Build a <strong>combo streak</strong> for score multipliers 🔥</li>
        </ol>
      </div>

      {/* ── Category / Region legend ── */}
      <div className="category-legend">
        <h2>{noun === 'region' ? 'Regions' : 'Categories'}</h2>
        <div className="legend-grid" style={{ '--bucket-count': categories.length }}>
          {categories.map(cat => (
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

      {onLeaderboard && (
        <button className="btn btn-leaderboard-start" onClick={onLeaderboard}>
          🏆 Leaderboard
        </button>
      )}

      <button className="btn btn-change-mode" onClick={onChangeMode}>
        🎮 Change Mode
      </button>

      {/* Disclaimer */}
      {disclaimer && (
        <p className="brand-disclaimer">{disclaimer}</p>
      )}
    </div>
  )
}

export default StartScreen
