import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material"

function NewListCats(props) {
    const [cats, setCats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("https://adopt-a-cat.onrender.com/cats_filter/" + props.weight)
            .then((response) => response.json())
            .then((data) => {
                setCats(data.data)
                setIsLoading(false)
            })
    }, [props.weight])

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

    return (
        <>
            {cats === undefined ? (
                <Typography variant="body1" align="center" sx={{ ...pStyle }}>
                    No cats found.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="cat table">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Color</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Breed</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Owner</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cats && cats.map(cat => (
                                <TableRow key={cat.id}>
                                    <TableCell>{cat.name}</TableCell>
                                    <TableCell>{cat.age}</TableCell>
                                    <TableCell>{cat.color}</TableCell>
                                    <TableCell>{cat.breed}</TableCell>
                                    <TableCell>{cat.weight}</TableCell>
                                    <TableCell>{cat.description}</TableCell>
                                    <TableCell>{cat.ownerId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {isLoading && <Typography variant="body1" align="center" sx={{ color: "#777" }}>Loading...</Typography>}
        </>
    )
}

export default NewListCats