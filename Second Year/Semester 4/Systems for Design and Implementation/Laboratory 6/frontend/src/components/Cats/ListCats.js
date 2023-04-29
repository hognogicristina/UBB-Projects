import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'

const StyledTable = styled(Table)({
    borderCollapse: 'collapse',
    width: '100%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
})

const StyledTableCell = styled(TableCell)({
    padding: 8,
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
})

const StyledTableHeadCell = styled(StyledTableCell)({
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
})

const StyledTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
})

function ListCats() {
    const [cats, setCats] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        fetch("https://adopt-a-cat.onrender.com/cats")
            .then((response) => response.json())
            .then((data) => {
                setCats(data.data)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <Typography sx={{ color: "#777" }}>Loading...</Typography>
    }

    return (
        <TableContainer>
            <StyledTable>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableHeadCell>ID</StyledTableHeadCell>
                        <StyledTableHeadCell>Name</StyledTableHeadCell>
                        <StyledTableHeadCell>Age</StyledTableHeadCell>
                        <StyledTableHeadCell>Color</StyledTableHeadCell>
                        <StyledTableHeadCell>Breed</StyledTableHeadCell>
                        <StyledTableHeadCell>Weight</StyledTableHeadCell>
                        <StyledTableHeadCell>Description</StyledTableHeadCell>
                        <StyledTableHeadCell>Owner</StyledTableHeadCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {cats.map((cat) => {
                        return (
                            <StyledTableRow key={cat.id}>
                                <StyledTableCell>{cat.id}</StyledTableCell>
                                <StyledTableCell>{cat.name}</StyledTableCell>
                                <StyledTableCell>{cat.age}</StyledTableCell>
                                <StyledTableCell>{cat.color}</StyledTableCell>
                                <StyledTableCell>{cat.breed}</StyledTableCell>
                                <StyledTableCell>{cat.weight}</StyledTableCell>
                                <StyledTableCell>{cat.description}</StyledTableCell>
                                <StyledTableCell>{cat.ownerId}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </StyledTable>
        </TableContainer>
    )
}

export default ListCats  