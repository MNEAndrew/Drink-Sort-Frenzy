// ============================================================
// ModeSelectScreen.jsx
// Pick a game mode. Playable modes start the flow; roadmap
// entries show "Coming soon" and stay disabled.
// ============================================================

function ModeSelectScreen({ modes, onSelect }) {
  return (
    <div className="screen mode-select-screen">

      <div className="mode-select-header">
        <h1 className="mode-select-title">Sort Frenzy</h1>
        <p className="mode-select-sub">
          Pick a mode — more are on the way. Scroll for the full list.
        </p>
      </div>

      <div className="mode-cards">
        {modes.map(mode => (
          <button
            key={mode.id}
            type="button"
            disabled={mode.comingSoon}
            className={`mode-card${mode.comingSoon ? ' mode-card--soon' : ''}`}
            onClick={() => onSelect(mode)}
          >
            <div className="mode-card__emoji">
              {mode.iconSrc ? (
                <img
                  className="mode-card__mode-icon"
                  src={mode.iconSrc}
                  alt=""
                  draggable={false}
                />
              ) : (
                mode.emoji
              )}
            </div>
            <div className="mode-card__body">
              <h2 className="mode-card__name">
                {mode.name}
                {mode.comingSoon && (
                  <span className="mode-card__badge">Soon</span>
                )}
              </h2>
              <p className="mode-card__desc">{mode.description}</p>
              <div className="mode-card__cats">
                {mode.comingSoon ? (
                  <span className="mode-card__cat-pill mode-card__cat-more">Coming soon</span>
                ) : (
                  <>
                    {mode.categories.slice(0, 6).map(cat => (
                      <span
                        key={cat.id}
                        className="mode-card__cat-pill"
                        style={{
                          background: `${cat.color}33`,
                          borderColor: `${cat.color}88`,
                          color: cat.color,
                        }}
                      >
                        {cat.image
                          ? (
                            <img
                              className="mode-card__cat-icon"
                              src={cat.image}
                              alt=""
                              draggable={false}
                            />
                            )
                          : cat.emoji}{' '}
                        {cat.label}
                      </span>
                    ))}
                    {mode.categories.length > 6 && (
                      <span className="mode-card__cat-pill mode-card__cat-more">
                        +{mode.categories.length - 6} more
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="mode-card__arrow" aria-hidden>
              {mode.comingSoon ? '⋯' : '▶'}
            </div>
          </button>
        ))}
      </div>

    </div>
  )
}

export default ModeSelectScreen
