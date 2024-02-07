import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {Jwt} from '../interfaces/Jwt.ts';
import '../styles/GameModes.css';

const API_URL = import.meta.env.VITE_API_URL;

const getUserUsername = async (userUsernameUrl: string) => {
  const response = await fetch(userUsernameUrl);
  return await response.text();
};

const getMixedUserScore = async (userUrl: string) => {
  const response = await fetch(userUrl);
  return await response.json();
}

const getTextUserScore = async (userUrl: string) => {
  const response = await fetch(userUrl);
  return await response.json();
}

const getImageUserScore = async (userUrl: string) => {
  const response = await fetch(userUrl);
  return await response.json();
}

export const MyAccount: React.FC = () => {
  const TOKEN = jwtDecode<Jwt>(localStorage.getItem('token')!);
  const USER_ID = TOKEN.nameid;
  const USER_USERNAME_URL = `${API_URL}/Users/${USER_ID}`;

  const LEADERBOARD_URL = `${API_URL}/Leaderboard`;

  const [userUsername, setUserUsername] = useState('');
  const [userMixedScore, setUserMixedScore] = useState<number>(0);
  const [userTextScore, setUserTextScore] = useState<number>(0);
  const [userImageScore, setUserImageScore] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const userUsernameData = await getUserUsername(USER_USERNAME_URL);
      setUserUsername(userUsernameData);

      const userMixedScoreData = await getMixedUserScore(`${LEADERBOARD_URL}/mixed/${userUsernameData}`);
      setUserMixedScore(userMixedScoreData.score);

      const userTextScoreData = await getTextUserScore(`${LEADERBOARD_URL}/text/${userUsernameData}`);
      setUserTextScore(userTextScoreData.score);

      const userImageScoreData = await getImageUserScore(`${LEADERBOARD_URL}/photos/${userUsernameData}`);
      setUserImageScore(userImageScoreData.score);
    };

    fetchData();
  }, []);

  return (
    <div className="game-container">
      <Header/>
      <div className="game-main">
        <h1>Username: {userUsername}</h1>
        <h2>Mixed Score: {userMixedScore}</h2>
        <h2>Text Score: {userTextScore}</h2>
        <h2>Image Score: {userImageScore}</h2>
        <Link to="/gamemode" className="game-mode-button">Game Modes</Link>
        <Link to="/editmyaccount" className="game-mode-button">Edit Account</Link>
      </div>
    </div>
  );
};

export default MyAccount;
