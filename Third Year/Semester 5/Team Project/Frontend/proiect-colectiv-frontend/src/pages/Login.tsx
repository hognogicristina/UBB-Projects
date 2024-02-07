import { Box, Button, TextField, Typography } from '@mui/material';
import background from '../../resources/background.png';
import HomeHeader from "../components/HomeHeader.tsx";
import '../styles/Header.css';
import '../styles/GameModes.css';
import React, { useState } from 'react';
import { IUser } from '../interfaces/User';
import { validateUsername, validatePasswd, PasswordError } from '../utils/validators';
import { Errors } from '../components/ErrorMessages';
import { NavigateFunction, useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL;
const REGISTER_ENDPOINT = `${API_URL}/Users/login`;

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, setErrors: React.Dispatch<React.SetStateAction<string[]>>, navigate: NavigateFunction): Promise<void> => {
    event.preventDefault();
    const errors: string[] = []
    const data = new FormData(event.currentTarget);
    const userName = data.get('username') as string;
    const password = data.get('password') as string;
    type SendToBERegister = Omit<IUser, "highScoreMixed" | "highScorePhotos" | "highScoreText" | "id">;
    const objToSend: SendToBERegister = {
        userName: userName,
        password: password,
    }
    const response = await fetch(REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(objToSend)
    })
    if (!response.ok) {
        const errResponse = await response.text();
        errors.push(errResponse);
    }
    if (errors.length > 0) {
        setErrors(errors);
        return;
    }

    const token = await response.json().then((data) => {
        return data.token;
    });
    localStorage.setItem('token', token);

    navigate('/gamemode');
}

export function Login() {
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();
    const handleFormSUbmit = (event: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(event, setErrors, navigate);
    }
    return (<>
        <Box style={{
            color: 'white',
        }}>
            <HomeHeader />

            <Box style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: "100vh",
                color: 'white',
                flexDirection: 'column',
            }}>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: 'transparent',
                    fontFamily: "'Chalkduster', sans-serif",
                }}>
                    <Typography variant="h2" style={{
                        marginBottom: '10px',
                        marginTop: '70px',
                        fontFamily: "'Chalkduster', sans-serif",
                    }}>
                        Login
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            height: '50vh',
                            maxWidth: '400px',

                            marginTop: '65px',
                            padding: '10px',
                            borderRadius: '12px',
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(8px)',
                            '& .MuiTextField-root': {
                                m: 1,
                                width: '100%',
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: 'Chalkduster, sans-serif',
                                color: '#a3a3a3'
                            },
                            '& .MuiInputLabel-root': {
                                fontFamily: 'Chalkduster, sans-serif',
                                color: '#a3a3a3'
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.5)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1976d2',
                                },
                            },
                            '& .MuiButton-root': {
                                mt: 3,
                                width: '100%',
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '10px 0',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                },
                            },
                        }}
                        autoComplete="off"
                        onSubmit={handleFormSUbmit}
                    >
                        <Typography variant="h5" style={{
                            marginBottom: '10px',
                            fontFamily: "'Chalkduster', sans-serif",
                            width: '550px'
                        }}>
                            Please insert your username:
                        </Typography>
                        <TextField

                            required
                            name='username'
                            label="Your username:"
                            variant="outlined"
                            style={{
                                marginBottom: '20px',
                                fontFamily: "'Chalkduster', sans-serif",
                                backgroundColor: '#e6e6e6',
                                width: '550px',
                                borderRadius: '10px',
                            }}
                        />
                        <Typography variant="h5" style={{
                            marginBottom: '10px',
                            marginTop: '10px',
                            fontFamily: "'Chalkduster', sans-serif",
                            width: '550px'
                        }}>
                            Please insert your password:
                        </Typography>
                        <TextField
                            required
                            name='password'
                            label="Your password:"
                            type="password"
                            variant="outlined"
                            style={{
                                marginBottom: '20px',
                                fontFamily: "'Chalkduster', sans-serif",
                                backgroundColor: '#e6e6e6',
                                width: '550px',
                                borderRadius: '10px',
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                width: '300px',
                                fontFamily: "'Chalkduster', sans-serif",
                                fontSize: '30px',
                                backgroundColor: '#1095e0',
                                borderRadius: '10px',
                                marginTop: '30px'
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                    <Errors errors={errors}></Errors>
                </Box>
            </Box>
        </Box>
    </>
    );
}