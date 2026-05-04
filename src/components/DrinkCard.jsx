// ============================================================
// DrinkCard.jsx — Draggable drink/champion card
//
// Visual priority for the card image:
//   1. drink.imageUrl  — static path you add to drinks.js manually
//                        e.g. imageUrl: "/drinks/coca-cola.png"
//   2. drink.image     — LoL champion portrait (local file, zoom trick)
//   3. drink.emoji     — always the instant fallback
//
// Add images by dropping files into public/drinks/ and setting
// imageUrl in the matching drink object in src/data/drinks.js.
// ============================================================

import { forwardRef, useState } from 'react'

const DrinkCard = forwardRef(function DrinkCard(
  { drink, isDragging, dragDelta, paused, onPointerDown, onPointerMove, onPointerUp },
  ref
) {
  // Track whether a product image failed to load so we can fall back to emoji
  const [imgError, setImgError] = useState(false)

  // Reset error state when the drink changes (new card)
  // Using key prop on the parent handles this — but the state reset here is
  // a safety net in case the same component instance gets a different drink.

  const transform = isDragging
    ? `translate(${dragDelta.x}px, calc(${dragDelta.y}px - 60px)) scale(0.45)`
    : 'translate(0px, 0px) scale(1)'

  // ── Choose which visual to show ───────────────────────────────────────────
  let visual

  if (drink.imageUrl && !imgError) {
    // Static product photo dropped into public/drinks/
    visual = (
      <img
        className="drink-card__product-img"
        src={drink.imageUrl}
        alt={drink.name}
        draggable={false}
        onError={() => setImgError(true)}
      />
    )
  } else if (drink.image) {
    // LoL champion portrait — background-image + 400% zoom because the source
    // PNGs have a large transparent canvas around the actual circular icon.
    visual = (
      <div
        className="drink-card__portrait"
        role="img"
        aria-label={drink.name}
        style={{ backgroundImage: `url(${drink.image})` }}
      />
    )
  } else {
    visual = <div className="drink-card__emoji">{drink.emoji}</div>
  }

  return (
    <div
      ref={ref}
      className={`drink-card ${isDragging ? 'drink-card--dragging' : ''} ${paused ? 'drink-card--paused' : ''}`}
      style={{
        transform,
        touchAction: 'none',
        userSelect:  'none',
        cursor: paused ? 'default' : isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {visual}

      <div className="drink-card__name">{drink.name}</div>
      <div className="drink-card__hint">{drink.hint}</div>

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
