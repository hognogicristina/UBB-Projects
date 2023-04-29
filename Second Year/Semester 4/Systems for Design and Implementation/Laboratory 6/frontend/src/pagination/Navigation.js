import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat } from '@fortawesome/free-solid-svg-icons'

function Navigation() {
    const navigate = useNavigate()

    const buttonStyles = {
        width: '100%',
        color: '#dbb3ee',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        borderRadius: '20px',
        border: '1px solid #dbb3ee',
        '&:hover': {
            bgcolor: '#e1b3c5',
            color: '#2f0d0d'
        }
    }

    const boxStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: 150,
        bgcolor: '#4c3750',
        borderRadius: '0px 10px 10px 0px',
        boxShadow: '0px 0px 10px hsla(309, 16%, 26%, 0.885)',
        flex: '0 0 auto',
        transition: 'width 0.3s ease',
        zIndex: 1,
        '&:hover': {
            width: 230,
        }
    }

    return (
        <Box sx={{ ...boxStyles }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ py: 1, justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faCat} className="mr-2" size="2x" color="#ee72d6b3" />
                <Typography variant="h6" fontWeight="bold" color="#ee72d6b3">
                    Meow
                </Typography>
            </Stack>
            <Stack direction="column" spacing={1} sx={{ p: 2, justifyContent: 'center' }}>
                <Button variant="text" sx={{ ...buttonStyles }} onClick={() => navigate('/')}>
                    Home
                </Button>
                <Button variant="text" sx={{ ...buttonStyles }} onClick={() => navigate('/cats')}>
                    Cats
                </Button>
                <Button variant="text" sx={{ ...buttonStyles }} onClick={() => navigate('/owners')}>
                    Owners
                </Button>
                <Button variant="text" sx={{ ...buttonStyles }} onClick={() => navigate('/foods')}>
                    Food
                </Button>
            </Stack>
        </Box>
    )
}

export default Navigation
