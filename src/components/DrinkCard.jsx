// ============================================================
// DrinkCard.jsx — Draggable drink/champion card
//
// Visual priority:
//   1. Open Food Facts product photo  (fetched at runtime, cached)
//   2. LoL champion portrait          (local file, background-image zoom)
//   3. Emoji                          (always the instant fallback)
// ============================================================

import { forwardRef, useState, useEffect } from 'react'
import { getDrinkImage } from '../lib/drinkImages'

// ── DrinkCard ─────────────────────────────────────────────────────────────────
const DrinkCard = forwardRef(function DrinkCard(
  { drink, isDragging, dragDelta, paused, onPointerDown, onPointerMove, onPointerUp },
  ref
) {
  // ── Product image state ───────────────────────────────────────────────────
  // Starts as null (shows emoji) then fills in when the OFF fetch resolves.
  // The module-level cache in drinkImages.js ensures the same drink only
  // ever triggers one network request per page load.
  const [productImg, setProductImg] = useState(null)
  const [imgError,   setImgError]   = useState(false)

  useEffect(() => {
    setProductImg(null)
    setImgError(false)
    // getDrinkImage returns a cleanup fn — pass it straight to useEffect
    return getDrinkImage(drink, setProductImg)
  }, [drink.name])   // re-run when the card changes to a different drink

  // ── Drag transform ────────────────────────────────────────────────────────
  const transform = isDragging
    ? `translate(${dragDelta.x}px, calc(${dragDelta.y}px - 60px)) scale(0.45)`
    : 'translate(0px, 0px) scale(1)'

  // ── Decide which visual to render ─────────────────────────────────────────
  let visual
  if (productImg && !imgError) {
    // OFF product image — object-fit: contain so the label fits cleanly
    visual = (
      <img
        className="drink-card__product-img"
        src={productImg}
        alt={drink.name}
        draggable={false}
        onError={() => setImgError(true)}
      />
    )
  } else if (drink.image) {
    // LoL champion portrait (local file).  Uses background-image + 400% zoom
    // because the source PNGs have a large transparent canvas around the icon.
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
