import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GameModes.css';
import '../styles/Game.css';
import Header from '../components/Header';

export const GameModes: React.FC = () => {
    return (
        <div className="game-container">
            <Header />
            <main className="game-main">
                <h1>Please select</h1><h1>the game mode:</h1>
                <div className="game-mode-buttons">
                    <Link to="/practice" className="game-mode-button">Practice</Link>
                    <Link to="/question-type" className="game-mode-button">Normal</Link>
                </div>
            </main>
        </div>
    );
};

export default GameModes;
