import React, { useState } from "react"
import { Box, Typography, TextField } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import GetOneCat from "./GetOneCat"

function OneCat() {
    const [id, setId] = useState("")

    const handleChange = (event) => {
        var value = event.target.value
        setId(value)
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#d04c7d7a",
            },
        },
    })

    const h2Style = {
        fontSize: '1.6rem',
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
        <Box sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ ...h2Style }}>
                Get One Cat
            </Typography>
            <form onSubmit={(event) => event.preventDefault()}>
                <Typography variant="body1" sx={{ margin: "1rem 0", ...pStyle }}>
                    Enter the id of the cat you want to get.
                </Typography>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        fullWidth
                        id="id"
                        name="id"
                        label="ID"
                        value={id}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 1"
                        sx={{ zIndex: 0 }}
                    />
                </ThemeProvider>
            </form>
            {id && <GetOneCat id={id} />}
        </Box>
    )
}

export default OneCat