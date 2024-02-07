import { Box, Button, TextField, Typography } from '@mui/material';
import background from '../../resources/background.png';
import Header from '../components/Header';
import '../styles/Header.css';import React, {useState, useEffect} from 'react';
import { Question, Answer } from '../interfaces/Question';
import { shufleArray } from '../utils/shuffleArr';



const BASE_API_URL = import.meta.env.VITE_API_URL;
const QUESTION_ENDPOINTS: string[] = [
    `${BASE_API_URL}/Questions/randomPersonSumary`, 
    `${BASE_API_URL}/Questions/randomPersonImage`
]

export const PracticeGame: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
    const [hasAnswered, setHasAnswered] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    const fetchQuestions = async (): Promise<void> => {
        setIsLoading(true);
        setSelectedAnswer(null);
        setAnswers([]);
        setImageUrl('');
        setHasAnswered(false);
        const randomPosition = Math.floor(Math.random() * QUESTION_ENDPOINTS.length);
        console.log(`random pos is ${randomPosition}`)
        const randomEndpoint = QUESTION_ENDPOINTS[randomPosition];
        const attemptFetch = async (): Promise<void> => {
            try {
                const response = await fetch(randomEndpoint, {
                    method: 'POST'
                }); 
                if(!response.ok) {
                    throw new Error("ups");
                }
                const data: Question = await response.json();
                const allAnswers: Answer[] = [];
                if(randomPosition === 1) {
                    setImageUrl(data.summary);
                }
                allAnswers.push({answer: data.name, isCorrect: true});
                data.otherPeople.forEach((otherPerson) => {
                    allAnswers.push({answer: otherPerson, isCorrect: false});
                })
                setCurrentQuestion(data);
                shufleArray(allAnswers);
                setAnswers(allAnswers);
            } catch(error) {
                await attemptFetch();
            }
        }
        await attemptFetch();
        setIsLoading(false);
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleAnswer = (answer: Answer): void => {
        setSelectedAnswer(answer);
        setHasAnswered(true);
        if(answer.isCorrect) {
            console.log('bravo');
        }
        else {
            console.log('no');
            
        }
        setTimeout(() => {
            fetchQuestions();
        }, 2000);
    }

    if(isLoading) {
        return <h1>is loading..</h1>
    }


    const renderAnswers = (answers: Answer[]) => {
        return answers.map((answer, index) => {
            let style = {
                textTransform: 'none',
                width: '350px',
                height: '100px',
                fontFamily: "'Chalkduster', sans-serif",
                fontSize: '25px',
                backgroundColor: '#1095e0',
                borderRadius: '10px',
                marginTop: '20px',
                marginRight: '10px',
                marginLeft: '10px',
                color: 'white',
                padding: '10px 0',
                border: '3px solid transparent' 
            };

            if (hasAnswered) {
                if (answer.isCorrect) {
                    style.border = '3px solid green'; 
                } else {
                    style.border = '3px solid red'; 
                }
            }

            return (
                <Button
                    key={`answer-${index}`}
                    onClick={() => handleAnswer(answer)}
                    style={style}
                    variant='contained'
                    disabled={hasAnswered}
                >
                    {answer.answer}
                </Button>
            );
        });
    };
    

    const imageStyle = {
        width: '250px',  
        height: '350px', 
        objectFit: 'cover' 
    };

    return (<>
    <Box style={{
            color: 'white',
            
        }}>
            <Header />

            <Box style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: "100vh",
                color: 'white',
                flexDirection: 'column',
            }}>
                <Box style ={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                    paddingTop: '100px'
                }}>
                     <Box style={{
                        width: '800px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '60px',
                        height: '50vh',
                        backgroundColor: 'transparent',
                        fontFamily: "'Chalkduster', sans-serif",
                    }}>
                        <div style={{textAlign: "center"}}>
                            {currentQuestion && (
                                <>
                                    {imageUrl && (
                                        <img 
                                            src={imageUrl} 
                                            alt={currentQuestion.name} 
                                            style={imageStyle}
                                        />
                                    )}
                                    {!imageUrl && <h2>{currentQuestion.summary}</h2>}
                                    <div>{renderAnswers(answers)}</div>
                                </>
                            )}
                        </div>

                    </Box>

                </Box>

            </Box>

        </Box>
    </>
        
    )
};

export default PracticeGame;