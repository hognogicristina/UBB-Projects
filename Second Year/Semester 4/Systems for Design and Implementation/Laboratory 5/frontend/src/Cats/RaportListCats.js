import React, { useState, useEffect } from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios'

function RaportListCats(props) {
    const [catData, setCatData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/cats_statistic/" + props.breed)
            .then(response => {
                setCatData(response.data.data)
                setIsLoading(false)
            })
    }, [props.breed])

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

    return (
        <>
            {catData.length === 0 ? (
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
                                <TableCell sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Owner</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Avg. Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {catData.map(cat => (
                                <TableRow key={cat.id}>
                                    <TableCell>{cat.name}</TableCell>
                                    <TableCell>{cat.age}</TableCell>
                                    <TableCell>{cat.color}</TableCell>
                                    <TableCell>{cat.weight}</TableCell>
                                    <TableCell>{cat.owner.firstName}</TableCell>
                                    <TableCell>{cat.avgAge}</TableCell>
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

export default RaportListCats
