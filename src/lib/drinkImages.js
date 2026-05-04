/**
 * drinkImages.js
 * Runtime image fetcher for branded drink cards.
 *
 * Images are fetched lazily from the Open Food Facts v2 API the first time
 * a card appears, then stored in a module-level Map so the same drink never
 * triggers a second network request.
 *
 * If the fetch fails (network error, 503, timeout, no match) the Map stores
 * null so the card silently stays on its emoji — gameplay is never blocked.
 *
 * Categories where no product photo exists are skipped entirely.
 */

// ── Module-level cache (survives re-renders, cleared on page reload) ─────────
const cache = new Map()    // name → url | null | 'pending'

// Categories with no packaged product to search for
const SKIP_CATS = new Set(['Cocktail', 'Mocktail'])

// Generic drink type names — too vague for a useful product image
const GENERIC = new Set([
  'Vodka','White Rum','Dark Rum','Spiced Rum','Tequila Blanco','Tequila Reposado',
  'Tequila Añejo','Mezcal','Bourbon','Rye Whiskey','Tennessee Whiskey','Irish Whiskey',
  'Scotch Whisky','Blended Scotch','Single Malt','Canadian Whisky','Japanese Whisky',
  'Cognac','Brandy','Pisco','Gin','London Dry Gin','Sloe Gin','Absinthe','Triple Sec',
  'Amaretto','Sambuca','Grappa','Sake','Soju','Shochu','Limoncello','Peach Schnapps',
  'Peppermint Schnapps','Baijiu',
  'Pale Ale','IPA','Stout','Lager','Chardonnay','Merlot','Rosé','Prosecco',
  'Cider','Champagne','Wheat Beer','Pinot Noir',
  'Orange Juice','Apple Juice','Cola','Lemonade','Ginger Ale','Root Beer',
  'Grape Juice','Pineapple Juice','Cranberry Juice','Sparkling Water',
  'Sports Drink','Energy Drink',
  'Espresso','Cappuccino','Latte','Chai Latte','Matcha Latte','Cold Brew','Bubble Tea',
  'Earl Grey','Americano','Green Tea','Iced Coffee','Flat White',
])

const UA = 'DrinkSortFrenzy/1.0 (Educational browser game; https://github.com/MNEAndrew/Drink-Sort-Frenzy)'

/**
 * Fetch an image URL for a drink from Open Food Facts.
 * Returns the URL string or null.  Never throws.
 */
async function fetchFromOFF(name) {
  const q   = encodeURIComponent(name)
  const url = `https://world.openfoodfacts.org/api/v2/search` +
              `?search_terms=${q}&page_size=5` +
              `&fields=product_name,image_front_url,image_url`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal:  AbortSignal.timeout(8_000),
    })
    if (!res.ok) return null
    const data = await res.json()
    for (const p of (data.products ?? [])) {
      const img = p.image_front_url || p.image_url
      if (img && /^https?:\/\//.test(img)) return img
    }
  } catch {
    // network error, timeout, or AbortError — return null
  }
  return null
}

/**
 * Get a cached image URL for a drink (or null if unavailable / not yet fetched).
 * Pass `onLoad` — a callback that will be called with the URL once it arrives,
 * so the component can setState without needing to await anything.
 *
 * Usage inside a component:
 *   const [img, setImg] = useState(null)
 *   useEffect(() => getDrinkImage(drink, setImg), [drink.name])
 *
 * Returns a cleanup function compatible with useEffect.
 */
export function getDrinkImage(drink, onLoad) {
  const { name, category, imageUrl } = drink

  // If baked-in data already has a URL, use it immediately (no network call)
  if (imageUrl) { onLoad(imageUrl); return }

  // Skip categories / generic names that won't yield useful product photos
  if (SKIP_CATS.has(category) || GENERIC.has(name)) return

  // Already cached
  if (cache.has(name)) {
    const cached = cache.get(name)
    if (cached && cached !== 'pending') onLoad(cached)
    return
  }

  // Mark as in-flight so parallel mounts of the same card don't double-fetch
  cache.set(name, 'pending')
  let cancelled = false

  fetchFromOFF(name).then(url => {
    cache.set(name, url)          // null on failure — prevents future retries
    if (!cancelled && url) onLoad(url)
  })

  // Cleanup: if the component unmounts before the fetch resolves, ignore result
  return () => { cancelled = true }
}
