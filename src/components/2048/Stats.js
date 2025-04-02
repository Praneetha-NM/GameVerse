import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../store/user'
import Loader from '../Loader/Loader'

const Stats = ({ score, loading }) => {
    const user = useUserStore((state) => state.user)
    const token = useUserStore(state => state.token)
    const getUser = useUserStore(state => state.getUser)
    const navigate = useNavigate()

    useEffect(() => {
        const updateScore = async () => {
            try {
                console.log("Token being sent:", token);
                console.log(atob(token.split(".")[1]));
                console.log(process.env.REACT_APP_BASE_URL);
                
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-score`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,  // ✅ Ensure token is correct
                    },
                    
                    body: JSON.stringify({ game: '2048', score }),
                });
        
                const resData = await res.json(); // ✅ Get response data
                console.log(resData)
                console.log("Response Status:", res.status);
                console.log("Response Data:", resData); // ✅ Log the error details
        
                await getUser(token);
        
                if (res.status === 200) {
                    navigate("/2048/rules");
                } else {
                    alert(`Could Not Save Scores: ${resData.message || "Unknown Error"}`); // ✅ Show error message
                }
            } catch (error) {
                console.error("Error updating score:", error);
            }
        };
        
    
        if (loading && typeof score === "number") {  // ✅ Ensure score is valid
            updateScore();
        }
    }, [loading, getUser, navigate, score, token]);
    

    if (loading)
        return <Loader />

    return (
        <div className='stats'>
            <h1>2048</h1>
            <h3>Name : {user.name}</h3>
            <h3>Score: {score}</h3>
            <h3>HighScore:{user.tzfe.highScore}</h3>
        </div>
    )
}

export default Stats