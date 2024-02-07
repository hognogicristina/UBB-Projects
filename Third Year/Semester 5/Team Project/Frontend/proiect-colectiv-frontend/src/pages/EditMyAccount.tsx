import React, {useState} from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {Jwt} from '../interfaces/Jwt.ts';
import {validateUsername, validatePasswd} from '../utils/validators';
import '../styles/GameModes.css';
import '../styles/MyAccount.css';

const API_URL = import.meta.env.VITE_API_URL;

export const EditMyAccount: React.FC = () => {
  const TOKEN = jwtDecode<Jwt>(localStorage.getItem('token')!);
  const USER_ID = TOKEN.nameid;
  const USER_USERNAME_URL = `${API_URL}/Users/UpdateUsername/${USER_ID}`;
  const USER_PASSWORD_URL = `${API_URL}/Users/UpdatePassword/${USER_ID}`;

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleUsernameSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateUsername(newUsername)) {
      setErrorMessage('Invalid username format.');
      return;
    }

    try {
      const requestData = {
        'Username': newUsername,
      };

      const response = await fetch(USER_USERNAME_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSuccessMessage('Username updated successfully.');
      } else {
        setErrorMessage('Failed to update username. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating the username.');
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const passwordValidationResult = validatePasswd(newPassword);
    if (typeof passwordValidationResult === 'string') {
      setErrorMessage(passwordValidationResult);
      return;
    }

    try {
      const requestData = {
        'Password': newPassword,
      }

      const response = await fetch(USER_PASSWORD_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSuccessMessage('Password updated successfully.');
      } else {
        setErrorMessage('Failed to update password. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div className="game-container">
      <Header/>
      <div className="game-main">
        <h1>Edit My Account</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-section">
          <h2>Change Username</h2>
          <form onSubmit={handleUsernameSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="newUsername"
                name="newUsername"
                placeholder="New Username"
                className="chalkduster-font"
                value={newUsername}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <button type="submit" className="small-button">Change Username</button>
          </form>
        </div>

        <div className="form-section">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                className="chalkduster-font"
                value={newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="small-button">Change Password</button>
          </form>
        </div>

        <Link to="/myaccount" className="back-button">
          Back to My Account
        </Link>
      </div>
    </div>
  );
}

export default EditMyAccount;
