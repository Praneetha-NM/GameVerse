import React, { useContext, useEffect } from 'react';
import { BoardContext } from './Wordle';

const Letter = ({ letterPos, attemptVal }) => {
    const { board, correctWord, currentAttempt, setDisabledLetters } = useContext(BoardContext);
    const letter = board[attemptVal][letterPos];
    const correctWordArr = correctWord.toUpperCase().split('');
    
    // Count occurrences of each letter in the correct word
    const correctLetterCounts = {};
    correctWordArr.forEach(letter => {
        correctLetterCounts[letter] = (correctLetterCounts[letter] || 0) + 1;
    });

    // Track how many times this letter appears in the guess
    let guessedLetterCounts = {};
    for (let i = 0; i <= letterPos; i++) {
        let guessedLetter = board[attemptVal][i];
        if (guessedLetter) {
            guessedLetterCounts[guessedLetter] = (guessedLetterCounts[guessedLetter] || 0) + 1;
        }
    }

    const correct = correctWordArr[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWordArr.includes(letter);

    // Adjust yellow (almost) logic: Only turn yellow if the letter is not overused
    const letterState = (currentAttempt.attempt > attemptVal) &&
        (correct ? "correct" : (almost && guessedLetterCounts[letter] <= correctLetterCounts[letter]) ? "almost" : "error");

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currentAttempt.attempt]); // eslint-disable-line

    return (
        <div className='wordle-letter' id={letterState}>{letter}</div>
    );
}

export default Letter;
