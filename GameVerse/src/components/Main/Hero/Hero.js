import React from 'react'
import './Hero.css'

const Hero = ({username,handleLogout}) => {

    return (
        <div className="content-wrapper">
            <div className="content-desc">
                <h1>GAMEVERSE</h1>
                <div className="user-info" style={{marginBottom:'10px'}}>
                        <span className="username">Hey, {username} 👋</span>
                        <span className="btn2" onClick={handleLogout} style={{marginLeft:'60px',color:'black',padding:'6px 10px',backgroundColor:'#FEC53A'}}> Want to Logout ?</span>
                    </div>
                <p>Welcome to our <span> Ultimate </span> gaming destination! Whether you're into action, adventure, or strategy, we've got something for everyone ...</p>
                <p>Play and compete with other gamers on our leaderboard to see who reigns supreme . Ready to play? Let's go!</p>

                <a href="#games" id="btn2">PLAY NOW</a>
            </div>
        </div>
    )
}

export default Hero