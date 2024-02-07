import { Box, Button, Typography } from '@mui/material';
import background from '/resources/background_2.png';
import Header from '../components/Header';
import '../styles/Header.css';
import '../styles/GameModes.css';
import { useNavigate } from 'react-router-dom';

type QuestionTypeProps = {
    gameMode: string
}

export function QuestionTypes({gameMode}: QuestionTypeProps){
    const navigate = useNavigate();

    const handleButtonClick = (questionType: string) => {
        
    };

    return <>
    <Box style={{
        color: 'white'
        }}>
            <Header />

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
                    <Typography variant="h3" style={{ 
                        textAlign: 'center',
                        marginBottom: '10px' , 
                        marginTop: '120px', 
                        fontFamily: "'Chalkduster', sans-serif",
                        }}>
                        Please select <br />the question types
                    </Typography>

                    <Box style={{
                        marginTop: '20px',
                        flexDirection: 'row'
                    }}>
                        <Button
                            onClick={() => handleButtonClick('text')}
                            type="submit"
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                width: '350px',
                                height: '100px',
                                fontFamily: "'Chalkduster', sans-serif",
                                fontSize: '40px',
                                backgroundColor: '#1095e0',
                                borderRadius: '10px',
                                marginTop: '30px',
                                marginRight: '25px'
                            }}
                        >
                            Text
                        </Button>

                        <Button
                            onClick={() => handleButtonClick('images')}
                            type="submit"
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                width: '350px',
                                height: '100px',
                                fontFamily: "'Chalkduster', sans-serif",
                                fontSize: '40px',
                                backgroundColor: '#1095e0',
                                borderRadius: '10px',
                                marginTop: '30px',
                                marginLeft: '25px'
                            }}
                        >
                            Images
                        </Button>

                    </Box>


                    <Button
                            onClick={() => handleButtonClick('mixed')}
                            type="submit"
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                width: '350px',
                                height: '100px',
                                fontFamily: "'Chalkduster', sans-serif",
                                fontSize: '40px',
                                backgroundColor: '#1095e0',
                                borderRadius: '10px',
                                marginTop: '50px'
                            }}
                        >
                            Mixed
                    </Button>

                </Box>
            </Box>
    </Box>
    </>
}