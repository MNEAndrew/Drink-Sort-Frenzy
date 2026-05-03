// ============================================================
// App.jsx — Root component
// Screens: 'modes' | 'start' | 'game' | 'gameover' | 'leaderboard'
// ============================================================

import { useState } from 'react'
import ModeSelectScreen from './components/ModeSelectScreen'
import StartScreen      from './components/StartScreen'
import GameScreen       from './components/GameScreen'
import GameOverScreen   from './components/GameOverScreen'
import Leaderboard      from './components/Leaderboard'

import { CATEGORIES as DRINK_CATS, DRINKS }     from './data/drinks'
import { CATEGORIES as LOL_CATS,   ITEMS as LOL_ITEMS } from './data/lol'

import './App.css'

// ── Game modes registry ───────────────────────────────────────
const MODES = [
  {
    id:          'drinks',
    name:        'Drink Sort Frenzy',
    emoji:       '🍹',
    tagline:     'Sort drinks before time runs out!',
    description: 'Sort cocktails, coffees, beers, liquors & more into the right category!',
    noun:        'category',
    categories:  DRINK_CATS,
    items:       DRINKS,
    hasLeaderboard: true,
    disclaimer:  'Brand names belong to their respective owners. Fan-made project — not affiliated with any beverage company.',
  },
  {
    id:          'lol',
    name:        'LoL Region Sort',
    emoji:       '⚔️',
    tagline:     'Sort champions by their home region!',
    description: 'Do you know your LoL lore? Sort 140+ champions into their correct Runeterra region!',
    noun:        'region',
    categories:  LOL_CATS,
    items:       LOL_ITEMS,
    hasLeaderboard: false,
    disclaimer:  'All champion names belong to Riot Games. Fan-made project — not affiliated with Riot Games.',
  },
]

function App() {
  const [screen,      setScreen]      = useState('modes')
  const [activeMode,  setActiveMode]  = useState(null)
  const [lastScore,   setLastScore]   = useState(0)
  const [isNewHigh,   setIsNewHigh]   = useState(false)
  const [submittedId, setSubmittedId] = useState(null)
  const [lbReturnTo,  setLbReturnTo]  = useState('start')
  const [highScore,   setHighScore]   = useState(0)

  // ── Select a mode → go to start screen ───────────────────
  function handleSelectMode(mode) {
    const saved = parseInt(localStorage.getItem(`${mode.id}_highScore`) || '0', 10)
    setHighScore(saved)
    setActiveMode(mode)
    setScreen('start')
  }

  // ── Called by GameScreen when lives reach 0 ───────────────
  function handleGameOver(score) {
    setLastScore(score)
    const key = `${activeMode.id}_highScore`
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem(key, String(score))
      setIsNewHigh(true)
    } else {
      setIsNewHigh(false)
    }
    setScreen('gameover')
  }

  // ── Open leaderboard ─────────────────────────────────────
  function openLeaderboard(submittedRowId, returnTo = 'gameover') {
    setSubmittedId(submittedRowId)
    setLbReturnTo(returnTo)
    setScreen('leaderboard')
  }

  return (
    <div className="app-wrapper">

      {screen === 'modes' && (
        <ModeSelectScreen
          modes={MODES}
          onSelect={handleSelectMode}
        />
      )}

      {screen === 'start' && activeMode && (
        <StartScreen
          mode={activeMode}
          highScore={highScore}
          onStart={() => setScreen('game')}
          onLeaderboard={activeMode.hasLeaderboard
            ? () => openLeaderboard(null, 'start')
            : null}
          onChangeMode={() => setScreen('modes')}
        />
      )}

      {screen === 'game' && activeMode && (
        <GameScreen
          key={activeMode.id + '-' + lastScore + '-' + Date.now()}
          categories={activeMode.categories}
          items={activeMode.items}
          onGameOver={handleGameOver}
        />
      )}

      {screen === 'gameover' && activeMode && (
        <GameOverScreen
          score={lastScore}
          highScore={highScore}
          isNewHighScore={isNewHigh}
          onRestart={() => setScreen('game')}
          onHome={() => setScreen('start')}
          onLeaderboard={activeMode.hasLeaderboard
            ? (id) => openLeaderboard(id, 'gameover')
            : null}
        />
      )}

      {screen === 'leaderboard' && (
        <Leaderboard
          highlightId={submittedId}
          onBack={() => setScreen(lbReturnTo)}
        />
      )}

    </div>
  )
}

export default App
