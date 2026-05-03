// ============================================================
// DrinkCard.jsx
// Displays a single drink with its name and emoji.
// Clicking the card selects it so the player can then pick
// a category. A selected card gets a highlighted border.
// ============================================================

function DrinkCard({ drink, isSelected, onClick }) {
  return (
    <div
      className={`drink-card ${isSelected ? 'drink-card--selected' : ''}`}
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      {/* Big emoji for visual flair */}
      <div className="drink-card__emoji">{drink.emoji}</div>

      {/* Drink name */}
      <div className="drink-card__name">{drink.name}</div>

      {/* Optional subtle hint */}
      <div className="drink-card__hint">{drink.hint}</div>

      {/* Tap-to-select indicator */}
      {!isSelected && (
        <div className="drink-card__cta">Tap to select</div>
      )}
      {isSelected && (
        <div className="drink-card__cta selected-cta">Now pick a category ↓</div>
      )}
    </div>
  )
}

export default DrinkCard
