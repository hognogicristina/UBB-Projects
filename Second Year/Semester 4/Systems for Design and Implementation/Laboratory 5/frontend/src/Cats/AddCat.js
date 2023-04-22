import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'

function AddCat() {
    const [cat, setCat] = useState({
        name: "",
        age: "",
        color: "",
        breed: "",
        weight: "",
        ownerId: "",
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
        fetch("http://localhost:8000/cats_add", {
            method: "POST",
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
            name: "",
            age: "",
            color: "",
            breed: "",
            weight: "",
            ownerId: "",
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
                Add Cat Section
            </Typography>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={cat.name}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Tom"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        value={cat.age}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 2"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="color"
                        name="color"
                        label="Color"
                        value={cat.color}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: black"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="breed"
                        name="breed"
                        label="Breed"
                        value={cat.breed}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Persian"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="weight"
                        name="weight"
                        label="Weight"
                        value={cat.weight}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 5"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="ownerId"
                        name="ownerId"
                        label="Owner"
                        value={cat.ownerId}
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
    )
}

export default AddCat