// ============================================================
// modes.js — All Sort Frenzy game modes (live + roadmap)
//
// Playable modes include categories + items from /data.
// Roadmap entries set comingSoon: true (no dataset yet).
// ============================================================

import { CATEGORIES as DRINK_CATS, DRINKS } from './data/drinks'
import { CATEGORIES as LOL_CATS, ITEMS as LOL_ITEMS } from './data/lol'

function soon(p) {
  return {
    ...p,
    comingSoon: true,
    hasLeaderboard: false,
    hasAlcohol: false,
    disclaimer: null,
  }
}

export const MODES = [
  {
    id: 'drinks',
    name: 'Beverages',
    emoji: '🍹',
    tagline: 'Sort drinks before time runs out!',
    description: 'Cocktails, coffee, beer, liquor & more — match each drink to its category.',
    noun: 'category',
    categories: DRINK_CATS,
    items: DRINKS,
    hasLeaderboard: true,
    hasAlcohol: true,
    disclaimer:
      'Brand names belong to their respective owners. Fan-made project — not affiliated with any beverage company.',
  },
  {
    id: 'lol',
    name: 'Runeterra regions',
    emoji: '⚔️',
    tagline: 'Sort champions by home region!',
    description: 'LoL lore sprint: place 140+ champions into the right region.',
    noun: 'region',
    categories: LOL_CATS,
    items: LOL_ITEMS,
    hasLeaderboard: true,
    hasAlcohol: false,
    disclaimer:
      'All champion names belong to Riot Games. Fan-made project — not affiliated with Riot Games.',
  },
  soon({
    id: 'snacks',
    name: 'Snack attack',
    emoji: '🍿',
    tagline: 'Sweet vs salty vs spicy.',
    description: 'Sort pantry snacks into taste buckets — chips, candy, bars & more.',
  }),
  soon({
    id: 'breakfast',
    name: 'Breakfast rush',
    emoji: '🥞',
    tagline: 'Morning menu mayhem.',
    description: 'Pancakes, cereal, smoothies — sort the most important meal.',
  }),
  soon({
    id: 'fast-food',
    name: 'Drive-thru dash',
    emoji: '🍔',
    tagline: 'Burgers, tacos, chicken — pick the lane.',
    description: 'Sort menu items by chain style or food type.',
  }),
  soon({
    id: 'desserts',
    name: 'Dessert derby',
    emoji: '🍰',
    tagline: 'Cakes, pies, frozen treats.',
    description: 'Ice cream, bakery goods, candy — all the sugar, sorted.',
  }),
  soon({
    id: 'instruments',
    name: 'Band practice',
    emoji: '🎸',
    tagline: 'Strings, keys, brass & beats.',
    description: 'Sort instruments into the right family before the show starts.',
  }),
  soon({
    id: 'sports',
    name: 'Sports night',
    emoji: '⚽',
    tagline: 'Court, field, rink or track?',
    description: 'Sort athletes and gear by how the game is played.',
  }),
  soon({
    id: 'space',
    name: 'Cosmic sort',
    emoji: '🪐',
    tagline: 'Planets, moons, and deep sky objects.',
    description: 'Astronomy quick-fire: rocky worlds, gas giants, and beyond.',
  }),
  soon({
    id: 'dogs',
    name: 'Good boys & girls',
    emoji: '🐕',
    tagline: 'Herding, sporting, toy & more.',
    description: 'Sort dog breeds by AKC-style groups — speed and accuracy count.',
  }),
  soon({
    id: 'movies',
    name: 'Matinee mix-up',
    emoji: '🎬',
    tagline: 'Action, comedy, horror, animation.',
    description: 'Sort films and tropes by genre before the credits roll.',
  }),
  soon({
    id: 'holidays',
    name: 'Holiday hustle',
    emoji: '🎃',
    tagline: 'Which celebration does it belong to?',
    description: 'Decorations, foods, and traditions — match them to the right holiday.',
  }),
  soon({
    id: 'emojis',
    name: 'Emoji express',
    emoji: '😀',
    tagline: 'Faces, food, travel & symbols.',
    description: 'Sort Unicode chaos into tidy emoji categories.',
  }),
  soon({
    id: 'colors',
    name: 'Color wheel',
    emoji: '🎨',
    tagline: 'Warm, cool, neon, earth.',
    description: 'Name a hue and drop it into the right palette bucket.',
  }),
  soon({
    id: 'science',
    name: 'Lab leak',
    emoji: '🧪',
    tagline: 'Biology, chemistry, physics, earth science.',
    description: 'Sort facts and gear into the right branch of science class.',
  }),
  soon({
    id: 'travel',
    name: 'Terminal transfer',
    emoji: '✈️',
    tagline: 'Continents, landmarks, trip types.',
    description: 'Sort destinations and travel vibes around the globe.',
  }),
  soon({
    id: 'retro-games',
    name: '16-bit sort',
    emoji: '🕹️',
    tagline: 'Arcade, platformer, RPG, puzzle.',
    description: 'Classic video-game genres — no quarters required.',
  }),
]
