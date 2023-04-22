import React from 'react'
import { Box, Typography } from '@mui/material'

function Home() {
    const h1Style = {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '1rem 0',
        backgroundImage: 'linear-gradient(45deg, #ff6b6b, #ff0080)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
    }

    const h2Style = {
        fontSize: '2.0rem',
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: '0.1rem',
        marginBottom: '1rem',
        borderBottom: '3px solid #f36',
        paddingBottom: '0.5rem',
        textShadow: '1px 1px #eee'
    }

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ ...h1Style }}>
                Welcome to MEOW!
            </Typography>
            <Typography sx={{ ...h2Style }}>
                The "Adopt a Cat" app for your next fluffy friend.
            </Typography>
            <Typography sx={{ ...pStyle }}>
                This is my SDI project in my 4th semester at UBB in Cluj-Napoca.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src="https://e3.365dm.com/22/07/1600x900/skynews-cats-pet_5846440.jpg?20220726201324"
                    alt=""
                />
            </Box>
        </Box>
    )
}

export default Home
