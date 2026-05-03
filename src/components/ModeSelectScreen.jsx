// ============================================================
// ModeSelectScreen.jsx
// Shown before the start screen — lets the player pick a
// game mode. Each mode card shows the mode's name, emoji,
// a quick description, and a category preview row.
// ============================================================

function ModeSelectScreen({ modes, onSelect }) {
  return (
    <div className="screen mode-select-screen">

      <div className="mode-select-header">
        <h1 className="mode-select-title">🎮 Sort Frenzy</h1>
        <p className="mode-select-sub">Choose a game mode to start</p>
      </div>

      <div className="mode-cards">
        {modes.map(mode => (
          <button
            key={mode.id}
            className="mode-card"
            onClick={() => onSelect(mode)}
          >
            <div className="mode-card__emoji">{mode.emoji}</div>
            <div className="mode-card__body">
              <h2 className="mode-card__name">{mode.name}</h2>
              <p className="mode-card__desc">{mode.description}</p>
              <div className="mode-card__cats">
                {mode.categories.slice(0, 6).map(cat => (
                  <span
                    key={cat.id}
                    className="mode-card__cat-pill"
                    style={{ background: cat.color + '33', borderColor: cat.color + '88', color: cat.color }}
                  >
                    {cat.emoji} {cat.label}
                  </span>
                ))}
                {mode.categories.length > 6 && (
                  <span className="mode-card__cat-pill mode-card__cat-more">
                    +{mode.categories.length - 6} more
                  </span>
                )}
              </div>
            </div>
            <div className="mode-card__arrow">▶</div>
          </button>
        ))}
      </div>

    </div>
  )
}

export default ModeSelectScreen
