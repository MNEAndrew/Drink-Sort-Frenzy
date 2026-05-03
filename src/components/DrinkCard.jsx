// ============================================================
// DrinkCard.jsx
// The drink card the player drags into a category bucket.
//
// Props:
//   drink        — the drink object { name, category, emoji, hint }
//   isDragging   — true while the player is dragging the card
//   dragDelta    — { x, y } offset in px from the card's resting position
//   paused       — true during answer feedback; disables dragging
//   onPointerDown / onPointerMove / onPointerUp  — drag handlers from GameScreen
//   ref          — forwarded so GameScreen can call setPointerCapture on the element
// ============================================================

import { forwardRef } from 'react'

const DrinkCard = forwardRef(function DrinkCard(
  { drink, isDragging, dragDelta, paused, onPointerDown, onPointerMove, onPointerUp },
  ref
) {
  // Visually move the card by the drag delta using CSS transform.
  // When isDragging becomes false the delta resets to {0,0} and
  // the CSS transition animates a smooth snap-back.
  // While dragging: shrink to ~45% so the card doesn't cover the buckets,
  // and shift it upward so it floats above the pointer rather than over the drop zones.
  const transform = isDragging
    ? `translate(${dragDelta.x}px, calc(${dragDelta.y}px - 60px)) scale(0.45)`
    : 'translate(0px, 0px) scale(1)'

  return (
    <div
      ref={ref}
      className={`drink-card ${isDragging ? 'drink-card--dragging' : ''} ${paused ? 'drink-card--paused' : ''}`}
      style={{
        transform,
        // Disable browser's native touch scroll/zoom while dragging
        touchAction: 'none',
        // Prevent text selection being triggered during drag
        userSelect: 'none',
        cursor: paused ? 'default' : isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      // Cancel drag if pointer leaves the captured area cleanly
      onPointerCancel={onPointerUp}
    >
      {/* Champion portrait OR emoji */}
      {drink.image ? (
        <img
          className="drink-card__portrait"
          src={drink.image}
          alt={drink.name}
          draggable={false}
        />
      ) : (
        <div className="drink-card__emoji">{drink.emoji}</div>
      )}

      {/* Name */}
      <div className="drink-card__name">{drink.name}</div>

      {/* Subtle hint text */}
      <div className="drink-card__hint">{drink.hint}</div>

      {/* Drag instruction (hidden while actively dragging) */}
      {!isDragging && !paused && (
        <div className="drink-card__cta">🖐 Drag to a bucket below</div>
      )}
      {isDragging && (
        <div className="drink-card__cta drag-cta">Drop it! 🎯</div>
      )}
    </div>
  )
})

export default DrinkCard
