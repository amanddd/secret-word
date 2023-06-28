import "../components/Game.css";
import React from 'react';
import {useState, useRef} from 'react';

const Game = ({
    verifyLetter,
    palavra,
    letras,
    categoria,
    letrasUsadas,
    letrasErradas,
    chances,
    score
}) => {

    const [letra, setLetter] = useState("");
    const letraInputRef = useRef(null);

    const submit = (e) =>{
        e.preventDefault();

        verifyLetter(letra);

        setLetter("");

        letraInputRef.current.focus();
    }

  return (
    <div className="game">
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <h1>Advinhe a palavra</h1>
        <h3 className="tip">
            Dica sobre a palavra: <span>Dica: {categoria}</span>
        </h3>
        <p>Você ainda tem {chances} tentativas</p>
        <div className="wordContainer">
            {letras.map((letra, i) =>(
                letrasUsadas.includes(letra) ?(
                <span key={i} className="letter">{letra}</span>
                ) :
                (
                    <span key={i} className="blankSquare"></span>
                )
            ))}    

        </div>
        <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra: </p>
            <form onSubmit={submit}>
                <input type="text" name="letra" maxLength={1} required value={letra} onChange={(e) => setLetter(e.target.value)} ref={letraInputRef} />
                <button>Jogar</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            {letrasErradas.map((letras, i) =>(
                    <span key={i}>{letras}, </span>
                ))}
        </div>
    </div>
  )
}

export default Game;