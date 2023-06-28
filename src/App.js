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

  const [palavra, setPalavra] = useState(""); //picked word
  const [categoria, setCategoria] = useState(""); //picked category
  const [letras, setLetras] = useState([]); //letters

  const [letrasUsadas, setLetrasUsadas] = useState([]); //guessed letters
  const [letrasErradas, setLetrasErradas]  = useState([]); //wrong letters
  const [chances, setChances] = useState(3);
  const [score, setScore] = useState(0);

console.log(words);

  const categoriaAleatoria = useCallback (() =>{
    //pegando as chaves do objeto
    const categories = Object.keys(words);

    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    //palavra
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return{category, word};
  
  }, [words])


  const startGame = useCallback (() =>{
    //escolehr categoria aleatoria

    //limpa
    clearEstadosLetras();
   
    const {category, word} = categoriaAleatoria();
    console.log(word, category);

    //soletar palavra
    let letrasPalavra = word.split("");

    letrasPalavra = letrasPalavra.map((e)=> e.toLowerCase());

    //estados    
    setCategoria(category);
    setPalavra(word);
    setLetras(letrasPalavra);

    setGameStage(stages[1].name);
  }, [categoriaAleatoria]);

  const verifyLetter = (letra) =>{

    const letrasLowerCase = letra.toLowerCase();

    if (letrasUsadas.includes(letrasLowerCase) || letrasErradas.includes(letrasLowerCase)){
      return;
    }

    if(letras.includes(letrasLowerCase)){
      setLetrasUsadas((actualLetrasUsadas) =>[
        ...actualLetrasUsadas,
        letra,
      ]);
    }else{
      setLetrasErradas((actualLetrasErradas) =>[
        ...actualLetrasErradas,
        letrasLowerCase,
      ]);

      setChances((actualChances) => actualChances -1);
    }
  };

  const retry = () =>{

    setChances(3);
    setScore(0);
    setGameStage(stages[0].name);
  };

  const clearEstadosLetras = () =>{
    setLetrasUsadas([]);
    setLetrasErradas([]);
  }

//derrota
  useEffect(() => {
    if(chances === 0){
      clearEstadosLetras();
      setGameStage(stages[2].name);
    }


  }, [chances]);

//condição de vitoria

  useEffect(()=>{
    const letrasUnicas = [...new Set(letras)];

    //vitoria
    if(letrasUsadas.length === letrasUnicas.length){
      //adiciona pontos
      setScore((actualScore) => (actualScore +=100));
      //restart
      startGame();
    }
  }, [letrasUsadas, letras, startGame]);

  console.log(letrasErradas);
  console.log( letrasUsadas);



  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame = {startGame}/>}
      {gameStage === 'game' && 
      <Game  verifyLetter = {verifyLetter}
      palavras = {palavra}
      letras = {letras}
      categoria = {categoria}
      letrasUsadas = {letrasUsadas}
      letrasErradas = {letrasErradas}
      chances = {chances}
      score ={score}
      />}
      {gameStage === 'end' && <GameOver score = {score} retry={retry}/>}
    </div>
  );
}

export default App;
