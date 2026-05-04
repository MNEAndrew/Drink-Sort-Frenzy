/**
 * fetch-drink-images.mjs
 * Queries Open Food Facts (v2 REST API) for a product image for every
 * brand-name drink in drinks.js.  Generic / cocktail names are skipped.
 *
 * Run:  node scripts/fetch-drink-images.mjs
 * Output: scripts/drink-images-result.json
 */

import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const { DRINKS } = await import('../src/data/drinks.js')

const __dir = dirname(fileURLToPath(import.meta.url))
const OUT   = join(__dir, 'drink-images-result.json')

// Load partial results if a previous run was interrupted
const results = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {}

const delay = ms => new Promise(r => setTimeout(r, ms))

const SKIP_CATEGORIES = new Set(['Cocktail', 'Mocktail'])

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

// OFF v2 REST search — handles 503 with exponential back-off
async function searchOFF(name, attempt = 0) {
  const q   = encodeURIComponent(name)
  // v2 search API is more stable under load than the old CGI endpoint
  const url = `https://world.openfoodfacts.org/api/v2/search?` +
              `search_terms=${q}&page_size=5&` +
              `fields=product_name,image_front_url,image_url`

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(10_000),
    })

    // Retry on 503 with back-off (max 3 attempts)
    if (res.status === 503) {
      if (attempt < 3) {
        const wait = 3_000 * (attempt + 1)
        process.stdout.write(`[503 retry ${attempt + 1} in ${wait / 1000}s] `)
        await delay(wait)
        return searchOFF(name, attempt + 1)
      }
      process.stdout.write('[503 gave up] ')
      return null
    }

    if (!res.ok) { process.stdout.write(`[HTTP ${res.status}] `); return null }

    const data = await res.json()
    for (const p of (data.products ?? [])) {
      const img = p.image_front_url || p.image_url
      if (img && /^https?:\/\//.test(img)) return img
    }
  } catch (e) {
    if (attempt < 2) {
      await delay(2_000)
      return searchOFF(name, attempt + 1)
    }
    process.stdout.write(`[err: ${e.message}] `)
  }
  return null
}

async function main() {
  let searched = 0, found = 0, skipped = 0, resumed = 0

  for (const drink of DRINKS) {
    const { name, category } = drink

    if (SKIP_CATEGORIES.has(category) || GENERIC.has(name)) {
      results[name] = results[name] ?? null
      skipped++
      continue
    }

    // Resume support: skip if already fetched in a prior run
    if (name in results) {
      resumed++
      if (results[name]) found++
      searched++
      continue
    }

    process.stdout.write(`[${searched + 1}] ${name} … `)
    const img = await searchOFF(name)
    results[name] = img ?? null
    searched++

    if (img) { found++; console.log('✓') }
    else       {         console.log('✗ not found') }

    // Save after every entry so a crash doesn't lose progress
    writeFileSync(OUT, JSON.stringify(results, null, 2), 'utf8')

    await delay(1_200)   // ~0.8 req/s — respectful to OFF servers
  }

  writeFileSync(OUT, JSON.stringify(results, null, 2), 'utf8')

  console.log(`\n── Summary ──────────────────────────────────────────────`)
  console.log(`  Searched : ${searched}  (${resumed} resumed from prior run)`)
  console.log(`  Found    : ${found}`)
  console.log(`  Not found: ${searched - found}`)
  console.log(`  Skipped  : ${skipped}`)
  console.log(`  Output   : ${OUT}`)
}

main().catch(console.error)
