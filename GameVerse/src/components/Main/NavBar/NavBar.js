import React from 'react'
import './NavBar.css'
import { useNavigate,Link} from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    
    return (
        <header>
            <div className="logo" onClick={() => {
                navigate('/')
            }}>
                <ion-icon name="game-controller"></ion-icon>
                <div style={{display:"block"}}>
                <p>GameVerse</p>
                </div>
                
            </div>
            <button onClick={() => {
                navigate('/leaderboard')
            }}
                type="button" id="btn">LEADERBOARD</button>
        </header>
    )
}

export default NavBar