// ============================================================
// Particles.jsx
// Renders a burst of animated confetti/spark particles that fly
// outward from the centre of the screen and fade out.
//
// Usage: mount the component with a unique key to trigger a burst.
// The parent manages an array of active bursts and removes each
// one after its CSS animation completes (~1.4 s).
//
// Particle shapes: ~60% circles (sparks), ~40% rectangles (confetti)
// ============================================================

// ── Presets ────────────────────────────────────────────────
// Each preset defines how intense the burst is.
export const BURST_PRESETS = {
  correct: {
    count: 18,
    colors: ['#34d399', '#ffd166', '#60a5fa', '#ffffff'],
    maxDist: 130,
    sizeRange: [5, 9],
  },
  combo3: {
    count: 26,
    colors: ['#ffd166', '#f97316', '#ff6b9d', '#ffffff'],
    maxDist: 170,
    sizeRange: [6, 11],
  },
  combo6: {
    count: 36,
    colors: ['#f97316', '#ef4444', '#ffd166', '#ff6b9d', '#fff'],
    maxDist: 220,
    sizeRange: [7, 13],
  },
  combo10: {
    count: 50,
    colors: ['#a78bfa', '#60a5fa', '#34d399', '#ffd166', '#ff6b9d', '#f97316', '#fff'],
    maxDist: 270,
    sizeRange: [8, 15],
  },
  combo15: {
    count: 65,
    colors: ['#ffd700', '#ffffff', '#a78bfa', '#ff6b9d', '#60a5fa', '#34d399', '#f97316'],
    maxDist: 320,
    sizeRange: [8, 17],
  },
  levelup: {
    count: 55,
    colors: ['#ffd166', '#ffffff', '#a78bfa', '#34d399', '#60a5fa', '#ff6b9d'],
    maxDist: 290,
    sizeRange: [7, 15],
  },
}

// ── Component ──────────────────────────────────────────────
// Because the parent gives us a unique `key`, this component
// re-mounts fresh for every new burst, re-running all animations.
function Particles({ type }) {
  const preset = BURST_PRESETS[type] ?? BURST_PRESETS.correct
  const { count, colors, maxDist, sizeRange } = preset

  // Generate all particle configs once (synchronous, no hooks needed)
  const particles = Array.from({ length: count }, (_, i) => {
    // Spread evenly around 360° with a little jitter so they don't form
    // a perfectly uniform ring
    const baseAngle  = (i / count) * 360
    const jitter     = (Math.random() - 0.5) * (360 / count * 0.8)
    const angle      = baseAngle + jitter
    const dist       = maxDist * (0.45 + Math.random() * 0.55)
    const [minS, maxS] = sizeRange
    const size       = minS + Math.random() * (maxS - minS)
    const color      = colors[Math.floor(Math.random() * colors.length)]
    // Convert polar → Cartesian for the final position
    const tx         = Math.cos((angle * Math.PI) / 180) * dist
    const ty         = Math.sin((angle * Math.PI) / 180) * dist
    const rot        = (Math.random() - 0.5) * 900   // spin while flying
    const duration   = 0.75 + Math.random() * 0.55
    const delay      = Math.random() * 0.14
    const isCircle   = Math.random() > 0.38

    return { i, size, color, tx, ty, rot, duration, delay, isCircle }
  })

  return (
    // Fixed overlay centred on the viewport — sits above everything
    <div className="particles-overlay" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.i}
          className="particle"
          style={{
            width:        p.size,
            height:       p.isCircle ? p.size : p.size * 0.45,
            background:   p.color,
            borderRadius: p.isCircle ? '50%' : '3px',
            // CSS custom properties picked up by the keyframe
            '--tx':       `${p.tx}px`,
            '--ty':       `${p.ty}px`,
            '--rot':      `${p.rot}deg`,
            animationDuration: `${p.duration}s`,
            animationDelay:    `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Particles
