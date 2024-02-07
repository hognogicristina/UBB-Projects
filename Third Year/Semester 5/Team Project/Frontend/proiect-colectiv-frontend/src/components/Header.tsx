import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const navigateToGame = (path: string) => {
    navigate(path);
  };

  return (
    <header className="game-header">
      <div className="header-title">MioriticMinds</div>
      <nav>
        <ul>
          <li onClick={() => navigateToGame('/')}>Home</li>
          <li onClick={() => navigateToGame('/leaderboard/mixed')}>Leaderboard</li>
          <li onClick={() => navigateToGame('/myaccount')}>My Account</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
