//css
import './App.css';
//react
import {useCallback, useEffect, useState} from 'react'
//data
import { wordList } from './data/word';
//components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';


const stages =[
  {id:1, name:'start'},
  {id:2, name:'game'},
  {id:3, name:'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [palavra, setPalavra] = useState("");
  const [categoria, setCategoria] = useState("");
  const [letras, setLetras] = useState([]);

  //console.clear();
  console.log(words);

  const categoriaAleatoria = () =>{
    //pegando as chaves do objeto
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random * Object.keys(categories).length)];
    console.log(category);
  }

  const startGame = () =>{
    //escolehr categoria aleatoria
    categoriaAleatoria();


    setGameStage(stages[1].name);
  }

  const verifyLetter = () =>{
      
  }

  const endGame = () =>{
    setGameStage(stages[2].name);
  }

  const retry = () =>{
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame = {startGame}/>}
      {gameStage === 'game' && <Game  endGame = {endGame}/>}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
