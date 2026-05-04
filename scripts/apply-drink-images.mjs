/**
 * apply-drink-images.mjs
 * Reads drink-images-result.json and injects `imageUrl` fields into drinks.js.
 * Safe to re-run — skips entries that already have imageUrl.
 *
 * Run:  node scripts/apply-drink-images.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dir    = dirname(fileURLToPath(import.meta.url))
const RESULTS  = join(__dir, 'drink-images-result.json')
const DRINKSJS = join(__dir, '../src/data/drinks.js')

const results = JSON.parse(readFileSync(RESULTS, 'utf8'))
const lines   = readFileSync(DRINKSJS, 'utf8').split('\n')

let applied = 0, skipped = 0

const updated = lines.map(line => {
  // Match lines that declare a drink object with a name field
  const m = line.match(/name:\s*"([^"]+)"/)
  if (!m) return line

  const name = m[1]
  const url  = results[name]

  if (!url)                        return line   // no image found for this drink
  if (line.includes('imageUrl'))   return line   // already patched

  // Insert imageUrl just before the closing }
  // Handles both:  ...hint: "..." },  and  ...hint: "..." }
  const patched = line.replace(/(\s*\}),?(\s*)$/, `, imageUrl: "${url}" },$2`)

  if (patched !== line) { applied++; return patched }

  skipped++
  return line
})

writeFileSync(DRINKSJS, updated.join('\n'), 'utf8')
console.log(`Applied: ${applied}  |  Already had URL / skipped: ${skipped}`)
