// ============================================================
// GameOverScreen.jsx
// Shows the final score, whether a new high score was set,
// and buttons to play again or go back to the start screen.
// ============================================================

function GameOverScreen({ score, highScore, isNewHighScore, onRestart, onHome }) {
  return (
    <div className="screen gameover-screen">
      {/* ── Title ── */}
      <div className="gameover-title-wrap">
        <div className="gameover-emoji">😵</div>
        <h1 className="gameover-title">Game Over!</h1>
      </div>

      {/* ── Score display ── */}
      <div className="gameover-scores">
        <div className="gameover-score-card">
          <span className="score-label">Your Score</span>
          <span className="score-value">{score}</span>
        </div>

        <div className="gameover-score-card">
          <span className="score-label">Best Score</span>
          <span className="score-value">🏆 {highScore}</span>
        </div>
      </div>

      {/* ── New high score banner ── */}
      {isNewHighScore && (
        <div className="new-highscore-banner">
          🎉 New High Score! Amazing job!
        </div>
      )}

      {/* ── Motivational message ── */}
      <p className="gameover-message">
        {score === 0
          ? "Don't give up — you've got this! 💪"
          : score < 30
          ? 'Nice try! Keep sorting! 🍹'
          : score < 80
          ? 'Great effort! You\'re getting the hang of it! ✨'
          : 'Outstanding sorting skills! 🏆'}
      </p>

      {/* ── Action buttons ── */}
      <div className="gameover-buttons">
        <button className="btn btn-restart" onClick={onRestart}>
          🔄 Play Again
        </button>
        <button className="btn btn-home" onClick={onHome}>
          🏠 Main Menu
        </button>
      </div>
    </div>
  )
}

export default GameOverScreen
