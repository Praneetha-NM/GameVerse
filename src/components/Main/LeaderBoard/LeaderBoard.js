import React, { useState, useEffect } from 'react';
import Loader from '../../Loader/Loader';
import NavBar from '../NavBar/NavBar';
import './LeaderBoard.css';
import one from '../../../assets/home/first.jpg';
import two from '../../../assets/home/second.jpg';
import three from '../../../assets/home/third.jpg';
import useUserStore from '../../../store/user';

const LeaderBoard = () => {
    const [data, setData] = useState(null);
    const user = useUserStore(state => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/scores`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch leaderboard data");
                }

                const res_data = await res.json();
                setData(res_data);
                console.log("Fetched Leaderboard Data:", data);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
                setData([]); 
            } finally {
                setLoading(false);
            }
        };

        getData();
    },[]);

    if (loading) return <Loader />;

    return (
        <div>
            <NavBar />
            <h1 className='leader-board-title'>LeaderBoard</h1>
            <div className="leaderboard">
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Profile Picture</td>
                            <td>Player</td>
                            <td>Score</td>
                            <td>Average</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>You</td>
                            <td><img src={user.imageUrl} alt="User" /></td>
                            <td><p>{user.name}</p></td>
                            <td>{user.total}</td>
                            <td>{user.total / 5}</td>
                        </tr>
                        <br /><br />
                        {data?.[0] && (
                            <tr>
                                <td id="winner">1</td>
                                <td><img src={data[0].imageUrl} alt="Winner"></img></td>
                                <td><img src={one} alt="First" /><p>{data[0].name}</p></td>
                                <td>{data[0].total}</td>
                                <td>{data[0].total / 5}</td>
                            </tr>
                        )}
                        {data?.[1] && (
                            <tr>
                                <td id="runner-up">2</td>
                                <td>{data[1].imageUrl ? <img src={data[1].imageUrl} alt="Second Runner-Up" /> : "No Image"}</td>
                                <td><img src={two} alt="Second" /><p>{data[1].name}</p></td>
                                <td>{data[1].total}</td>
                                <td>{data[1].total / 5}</td>
                            </tr>
                        )}
                        {data?.[2] && (
                            <tr>
                                <td id="second-runner-up">3</td>
                                <td>{data[2].imageUrl ? <img src={data[2].imageUrl} alt="Third Runner-Up" /> : "No Image"}</td>
                                <td><img src={three} alt="Third" /><p>{data[2].name}</p></td>
                                <td>{data[2].total}</td>
                                <td>{data[2].total / 5}</td>
                            </tr>
                        )}
                        {Array.isArray(data) && data.slice(3).map((d, idx) => (
                            <tr key={idx + 3}>
                                <td>{idx + 4}</td>
                                <td>{d.imageUrl ? <img src={d.imageUrl} alt="User" /> : "No Image"}</td>
                                <td><p>{d.name || "Unknown"}</p></td>
                                <td>{d.total || 0}</td>
                                <td>{d.total ? d.total / 5 : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderBoard;
