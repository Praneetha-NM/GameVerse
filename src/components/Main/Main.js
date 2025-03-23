import React from 'react'
import Hero from './Hero/Hero'
import NavBar from './NavBar/NavBar'
import './Main.css'
import bg from '../../assets/home/bg.png'
import Footer from './Footer/Footer'
import Games from './Games/Games'

import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import useUserStore from '../../store/user';

const Main = () => {
    const navigate = useNavigate();
    const { token, user, setUser, clearUser } = useUserStore(state => ({
        token: state.token,
        user: state.user,
        setUser: state.setUser,
        clearUser: state.clearUser
    }));


    // Fetch user details from the server if logged in
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user-detail`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data, token); // Store user details in Zustand
                } else {
                    console.error("Failed to fetch user details");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUser();
    }, [token, setUser]);

    // Logout function
    const handleLogout = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            clearUser(); // Clear Zustand state
            navigate('/'); // Redirect to home
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    return (
        <>
            <div className='container'
                style={{ background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${bg})`,color:'white' }}>
                <NavBar />
                {token ? (
                            <div className="user-info">
                                <span className="username">Hey, {user.name} 👋</span>
                                <span className="btn" onClick={handleLogout}> Want to Logout ?</span>
                            </div>
                        ) : (
                            <Link to="/login" className="btn">Click Here to Login</Link>
                        )}
                <Hero />
            </div>
            <div className="logo-section">
                <ion-icon name="game-controller"></ion-icon>
                <h1>The Game Zone</h1>
            </div>
            <Games />
            <Footer />
        </>
    )
}

export default Main