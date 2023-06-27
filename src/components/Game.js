import "../components/Game.css"
import React from 'react'

const Game = ({endGame}) => {
  return (
    <div>   
        <h1>Game</h1>
            <p>jogo em andamento</p>
        <button onClick={endGame}>Clique</button>
    </div>
    
  )
}

export default Game;