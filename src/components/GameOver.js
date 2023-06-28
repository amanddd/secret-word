import "../components/GameOver.css"
import React from 'react'

const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <h2> Sua pontuação foi: <span>{score}</span> </h2>
        <button onClick={retry}>Retry</button>
    </div>
  )
}

export default GameOver