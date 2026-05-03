// ============================================================
// App.jsx — Root component
// Controls which screen is shown: 'start' | 'game' | 'gameover'
// Also manages the high score via localStorage.
// ============================================================

import { useState } from 'react'
import StartScreen   from './components/StartScreen'
import GameScreen    from './components/GameScreen'
import GameOverScreen from './components/GameOverScreen'
import './App.css'

// Key used to store the high score in the browser's localStorage
const HIGH_SCORE_KEY = 'drinkSortFrenzy_highScore'

function App() {
  // Which screen to show
  const [screen, setScreen] = useState('start')   // 'start' | 'game' | 'gameover'

  // The score the player just achieved (passed from GameScreen to GameOverScreen)
  const [lastScore, setLastScore] = useState(0)

  // Was the last score a new personal best?
  const [isNewHighScore, setIsNewHighScore] = useState(false)

  // Read high score from localStorage (returns 0 if never played)
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10)
  )

  // ── Called by GameScreen when the player runs out of lives ──
  function handleGameOver(score) {
    setLastScore(score)

    if (score > highScore) {
      // New personal best!
      setHighScore(score)
      localStorage.setItem(HIGH_SCORE_KEY, String(score))
      setIsNewHighScore(true)
    } else {
      setIsNewHighScore(false)
    }

    setScreen('gameover')
  }

  // ── Called by GameOverScreen "Play Again" button ─────────
  function handleRestart() {
    setScreen('game')
  }

  // ── Called by GameOverScreen "Main Menu" button ──────────
  function handleHome() {
    setScreen('start')
  }

  // ── Render the right screen ──────────────────────────────
  return (
    <div className="app-wrapper">
      {screen === 'start' && (
        <StartScreen
          highScore={highScore}
          onStart={() => setScreen('game')}
        />
      )}

      {screen === 'game' && (
        /*
          Key prop forces a full re-mount every time the player
          starts a new game, resetting all game state cleanly.
        */
        <GameScreen
          key={lastScore + '-' + Date.now()}
          onGameOver={handleGameOver}
        />
      )}

      {screen === 'gameover' && (
        <GameOverScreen
          score={lastScore}
          highScore={highScore}
          isNewHighScore={isNewHighScore}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </div>
  )
}

export default App
