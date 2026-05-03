// ============================================================
// App.jsx — Root component
// Screens: 'start' | 'game' | 'gameover' | 'leaderboard'
// Also owns high score (localStorage) and the submitted
// leaderboard entry id (so the Leaderboard can highlight it).
// ============================================================

import { useState } from 'react'
import StartScreen    from './components/StartScreen'
import GameScreen     from './components/GameScreen'
import GameOverScreen from './components/GameOverScreen'
import Leaderboard    from './components/Leaderboard'
import './App.css'

const HIGH_SCORE_KEY = 'drinkSortFrenzy_highScore'

function App() {
  const [screen,       setScreen]       = useState('start')
  const [lastScore,    setLastScore]    = useState(0)
  const [isNewHigh,    setIsNewHigh]    = useState(false)
  // id of the row the player just submitted — passed to Leaderboard so their
  // entry can be highlighted when they click "View Leaderboard"
  const [submittedId,  setSubmittedId]  = useState(null)
  // Which screen to return to when the player closes the Leaderboard
  const [lbReturnTo,   setLbReturnTo]  = useState('start')

  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10)
  )

  // ── Called by GameScreen when lives reach 0 ────────────────
  function handleGameOver(score) {
    setLastScore(score)
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem(HIGH_SCORE_KEY, String(score))
      setIsNewHigh(true)
    } else {
      setIsNewHigh(false)
    }
    setScreen('gameover')
  }

  // ── Open leaderboard (from gameover OR from start) ─────────
  function openLeaderboard(submittedRowId, returnTo = 'gameover') {
    setSubmittedId(submittedRowId)
    setLbReturnTo(returnTo)
    setScreen('leaderboard')
  }

  return (
    <div className="app-wrapper">
      {screen === 'start' && (
        <StartScreen
          highScore={highScore}
          onStart={() => setScreen('game')}
          onLeaderboard={() => openLeaderboard(null, 'start')}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          key={lastScore + '-' + Date.now()}
          onGameOver={handleGameOver}
        />
      )}

      {screen === 'gameover' && (
        <GameOverScreen
          score={lastScore}
          highScore={highScore}
          isNewHighScore={isNewHigh}
          onRestart={() => setScreen('game')}
          onHome={() => setScreen('start')}
          onLeaderboard={(id) => openLeaderboard(id, 'gameover')}
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
