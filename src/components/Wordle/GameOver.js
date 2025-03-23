import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../store/user'
import Loader from '../Loader/Loader'
import { BoardContext } from './Wordle'

const GameOver = () => {
    const { gameOver, correctWord, currentAttempt } = useContext(BoardContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const token = useUserStore(state => state.token)
    const getUser = useUserStore(state => state.getUser)

    useEffect(() => {
        const updateScore = async () => {
            console.log("🔹 Sending token:", token); // Debugging
            console.log(process.env.REACT_APP_BASE_URL);
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-score`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });
    
                if (res.status === 403) {
                    console.error("❌ Forbidden: Invalid Token");
                    alert("Session expired. Please log in again.");
                    navigate("/login");
                    return;
                }
    
                if (res.ok) {
                    getUser(token);
                    navigate("/wordle");
                } else {
                    console.error("❌ Error updating score:", await res.text());
                    alert("Could not save scores.");
                }
            } catch (error) {
                console.error("❌ Network error:", error);
                alert("Network error. Try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        if (data !== null) updateScore();
    }, [data]);
    
    
    if (loading)
        return <Loader />

    return (
        <div className='gameOver'>
            <h1>{gameOver.guessedWord ? "Guessed Correctly" : " You Failed To Guess The Word Correctly"}</h1>
            <h2>Correct Word: {correctWord.toUpperCase()}</h2>
            {gameOver.guessedWord && (
                <h2>You guessed in {currentAttempt.attempt} attempts</h2>
            )}
            <h2 className='continue' onClick={() => {
                setData({ game: 'WDLE', score: currentAttempt.attempt })
                setLoading(true)
            }}> Click here To Continue</h2>
        </div>
    )
}

export default GameOver