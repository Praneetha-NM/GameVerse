import React, { useState, createContext, useEffect } from 'react'
import { boardDefault } from '../../utils/Wordle'
import Board from './Board'
import KeyBoard from './KeyBoard'
import './Wordle.css'
import GameOver from './GameOver'
import wordBank from '../../utils/WordBank.txt'

export const BoardContext = createContext()

const Wordle = () => {
    const [board, setBoard] = useState(boardDefault)
    const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0 })
    const [wordSet, setWordSet] = useState(new Set())
    const [disabledLetters, setDisabledLetters] = useState([])
    const [gameOver, setGameOver] = useState({
        gameOver: false,
        guessedWord: false
    })
    const [correctWord, setCorrectWord] = useState("");

    useEffect(() => {
        fetch(wordBank)
          .then(response => response.text())
          .then(text => {
            const wordArray = text.split(/\r?\n/).map(word => word.trim().toLowerCase());
            const wordSet = new Set(wordArray);
            setWordSet(wordSet);
      
            // Pick a random word
            const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
            setCorrectWord(randomWord);
      
            console.log("Word Set Loaded:", wordSet);
            console.log("Selected Random Word:", randomWord);
          })
          .catch(error => console.error("Error loading wordbank.txt:", error));
      }, []);
      

    return (
        <div className='wordle'>
            <nav className='wordle-nav'>
                <h1>Wordle</h1>
            </nav>
            <BoardContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, correctWord, wordSet, setDisabledLetters, disabledLetters, gameOver, setGameOver }}>
                <div className='wordle-game'>
                    <Board />
                    {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
                </div>
            </BoardContext.Provider>
        </div>
    )
}

export default Wordle