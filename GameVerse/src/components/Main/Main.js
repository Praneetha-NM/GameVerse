import React from 'react'
import Hero from './Hero/Hero'
import NavBar from './NavBar/NavBar'
import './Main.css'
import bg from '../../assets/home/bg.png'
import bg2 from '../../assets/home/GAMEVERSE.jpg'
import Footer from './Footer/Footer'
import Games from './Games/Games'
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import useUserStore from '../../store/user';

const Main = () => {
    const navigate = useNavigate();
    const { token, user, setDetails, clearUser } = useUserStore(state => ({
        token: state.token,
        user: state.user,
        setDetails: state.setDetails, // ✅ Use setDetails instead of setUser
        clearUser: state.clearUser
    }));
    


    // Fetch user details from the server if logged in
    useEffect(() => {
        console.log("Current Token:", token);
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
                    setDetails({user:data, token}); // ✅ Use setDetails instead of setUser
                } else {
                    console.error("Failed to fetch user details");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUser();
    }, [token, setDetails]); // ✅ Use setDetails in dependencies


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
                {token ? (
                <>
                    <NavBar />
                    
                    <Hero username={user.name} handleLogout={handleLogout}/>
                    <div className="logo-section">
                        <ion-icon name="game-controller"></ion-icon>
                        <h1>The Game Zone</h1>
                    </div>
                    <Games />
                    <Footer />
                </> ) : (
                    <div style={{ background: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0)), url(${bg2})`,color:'white' ,backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}>
                        <div style={{marginTop :"160px"}}>
                        <Link to="/login" className="btn" style={{height : '100px'}}>Click Here to Login</Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Main