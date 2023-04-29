import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'

function DeleteCat() {
    const [cat, setCat] = useState({
        id: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (event) => {
        const value = event.target.value
        setCat({
            ...cat,
            [event.target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")
        fetch("https://adopt-a-cat.onrender.com/cats_delete/" + cat.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false)
                setMessage(data.message)
            })

    }

    const handleReset = () => {
        setCat({
            id: "",
        })
    }

    const buttonStyles = {
        backgroundColor: 'transparent',
        color: '#7c487c',
        border: '2px solid #7c487c',
        margin: 1,
        '&:hover': {
            backgroundColor: '#e2c7f7d8',
            color: '7c487c',
        }
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

    return (
        <Box sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ ...h2Style }}>
                Delete Cat Section
            </Typography>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        fullWidth
                        id="id"
                        name="id"
                        label="ID"
                        value={cat.id}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 1"
                        sx={{ zIndex: 0 }}
                    />
                    {message && <Typography color="red">{message}</Typography>}
                    <Button type="submit" variant="contained" sx={{ ...buttonStyles }}>
                        Submit
                    </Button>
                    <Button variant="contained" sx={{ ...buttonStyles }} onClick={handleReset}>
                        Reset
                    </Button>
                    {isLoading && <Typography sx={{ color: "#777" }}>Loading...</Typography>}
                </ThemeProvider>
            </form>
        </Box>
    );
}

export default DeleteCat